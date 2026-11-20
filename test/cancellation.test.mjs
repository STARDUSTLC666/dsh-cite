import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildCiteTools, extractDois, lookupDoi, searchWorks, resolveConfig } from '../lib/index.js'

const cfg = resolveConfig({ timeoutMs: 1000 })

test('Crossref cancellation retains the caller reason instead of reporting a lookup error', async () => {
  const controller = new AbortController()
  const reason = new Error('stop Crossref lookup')
  const fetcher = async (_url, init) => {
    assert.equal(init.signal.aborted, false)
    controller.abort(reason)
    assert.equal(init.signal.reason, reason)
    throw new Error('transport aborted')
  }
  await assert.rejects(lookupDoi('10.1000/test', cfg, fetcher, controller.signal), (error) => error === reason)
})

test('pre-aborted DOI validation starts no concurrent lookups', async () => {
  const reason = new Error('stop validation')
  const tools = buildCiteTools(cfg, async () => { assert.fail('no network after cancellation') })
  const check = tools.find((tool) => tool.name === 'cite_check')
  await assert.rejects(check.execute({ text: '10.1000/test 10.1000/other' }, { signal: AbortSignal.abort(reason) }), (error) => error === reason)
})

test('Crossref response body cancellation and timeout remain effective', async () => {
  const controller = new AbortController(), reason = new Error('stop reading body')
  const pending = lookupDoi('10.1000/test', cfg, async () => ({ ok: true,
    json: () => new Promise(resolve => setTimeout(() => resolve({ message: {} }), 100)) }), controller.signal)
  setTimeout(() => controller.abort(reason), 10)
  await assert.rejects(pending, error => error === reason)
  await assert.rejects(searchWorks('query', 2, { ...cfg, timeoutMs: 20 }, async () => ({ ok: true,
    json: () => new Promise(resolve => setTimeout(() => resolve({ message: { items: [] } }), 100)) })), /响应读取超时/)
})

test('extractDois retains balanced DOI parentheses and removes surrounding prose punctuation', () => {
  assert.deepEqual(extractDois('DOI: 10.1000/article(2020). See (10.1000/other(2021)).'), ['10.1000/article(2020)', '10.1000/other(2021)'])
})

test('Crossref HTTP errors release unread response bodies without hiding the status', async () => {
  for (const operation of [
    fetcher => lookupDoi('10.1000/test', cfg, fetcher),
    fetcher => searchWorks('query', 2, cfg, fetcher),
  ]) {
    for (const status of [404, 429, 503]) {
      let cancelled = false
      const body = new ReadableStream({
        start(controller) { controller.enqueue(new TextEncoder().encode('unread error details')) },
        cancel() { cancelled = true; throw new Error('body cleanup failed') },
      })
      await assert.rejects(operation(async () => new Response(body, { status })),
        status === 404 ? /不存在|HTTP 404/ : new RegExp('HTTP ' + status))
      assert.equal(cancelled, true, 'unread HTTP ' + status + ' body must be cancelled')
    }
  }
})

test('Crossref tool queries stop oversized declared and streamed responses before JSON parsing', async () => {
  for (const operation of [fetcher => lookupDoi('10.1000/test', cfg, fetcher), fetcher => searchWorks('query', 2, cfg, fetcher)]) {
    let cancelled = false, parsed = false
    const declared = new Response(new ReadableStream({ cancel() { cancelled = true } }), { headers: { 'content-length': String(3 * 1024 * 1024) } })
    declared.json = async () => { parsed = true; return { message: {} } }
    await assert.rejects(operation(async () => declared), /2 MiB|响应.*过大|大小上限/)
    assert.equal(parsed, false); assert.equal(cancelled, true)
    let chunks = 0, streamCancelled = false
    const response = new Response(new ReadableStream({ pull(controller) { chunks++; controller.enqueue(new Uint8Array(128 * 1024).fill(32)) }, cancel() { streamCancelled = true } }))
    await assert.rejects(operation(async () => response), /2 MiB|响应.*过大|大小上限/)
    assert.ok(chunks <= 19, 'reading must stop close to the byte limit')
    assert.equal(streamCancelled, true)
  }
})

test('bounded Crossref streams preserve UTF-8 and release a stalled body on caller cancellation', async () => {
  const message = { DOI: '10.1000/test', title: ['跨分块的中文标题'], author: [{ family: '测试' }] }
  const bytes = new TextEncoder().encode(JSON.stringify({ message }))
  const stream = new ReadableStream({ start(controller) { for (const byte of bytes) controller.enqueue(Uint8Array.of(byte)); controller.close() } })
  const result = await lookupDoi('10.1000/test', cfg, async () => new Response(stream))
  assert.equal(result.title, '跨分块的中文标题')
  let cancelled = false, entered
  const started = new Promise(resolve => { entered = resolve })
  const controller = new AbortController(), reason = new Error('stop stalled Crossref stream')
  const stalled = new Response(new ReadableStream({ pull() { return new Promise(() => {}) }, cancel() { cancelled = true } }))
  const getReader = stalled.body.getReader.bind(stalled.body)
  stalled.body.getReader = () => { const reader = getReader(); entered(); return reader }
  const pending = lookupDoi('10.1000/test', cfg, async () => stalled, controller.signal)
  const rejected = assert.rejects(pending, error => error === reason)
  await started; controller.abort(reason); await rejected
  assert.equal(cancelled, true)
})

test('Crossref cancellation releases a response arriving after an uncooperative transport', async () => {
  for (const operation of [
    (fetcher, signal) => lookupDoi('10.1000/test', cfg, fetcher, signal),
    (fetcher, signal) => searchWorks('query', 2, cfg, fetcher, signal),
  ]) {
    let release, cancelled = false
    const pendingResponse = new Promise(resolve => { release = resolve })
    const controller = new AbortController(), reason = new Error('stop pending response')
    const pending = operation(() => pendingResponse, controller.signal)
    const rejected = assert.rejects(pending, error => error === reason)
    controller.abort(reason); await rejected
    release(new Response(new ReadableStream({ cancel() { cancelled = true } })))
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(cancelled, true)
  }
})
