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
