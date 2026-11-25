import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { createRequire, syncBuiltinESMExports } from 'node:module'
import { CitationWorkbench, resolveConfig } from '../lib/index.js'

const root = fileURLToPath(new URL('../.test-data/', import.meta.url))
await mkdir(root, { recursive: true })
const cfg = resolveConfig({ timeoutMs: 2000 })
const workerThreads = createRequire(import.meta.url)('node:worker_threads')

function countWorkers() {
  const Worker = workerThreads.Worker
  let started = 0
  workerThreads.Worker = class extends Worker { constructor(...args) { started++; super(...args) } }
  syncBuiltinESMExports()
  return { get started() { return started }, restore() { workerThreads.Worker = Worker; syncBuiltinESMExports() } }
}

async function workbench(t) {
  const dir = await mkdtemp(join(root, 'concurrent-'))
  const w = new CitationWorkbench(cfg, dir, async (_url, init) => new Promise((_resolve, reject) => {
    const cancel = () => reject(init.signal.reason)
    if (init.signal.aborted) cancel()
    else init.signal.addEventListener('abort', cancel, { once: true })
  }))
  t.after(async () => { w.dispose(); await rm(dir, { recursive: true, force: true }) })
  return w
}

function holdReads(w) {
  const read = w.store.read.bind(w.store)
  let release, reads = 0
  const gate = new Promise(resolve => { release = resolve })
  w.store.read = async () => { reads++; await gate; return read() }
  return { release, get reads() { return reads } }
}

async function savedEntry(w) {
  const preview = await w.preview({ kind: 'doi', text: '10.1000/concurrent' })
  return w.import(preview.id, [0])
}

test('Preview reserves its parser slot before awaiting the library read', async t => {
  const w = await workbench(t), held = holdReads(w)
  const settled = Promise.allSettled([
    w.preview({ kind: 'doi', text: '10.1000/first' }),
    w.preview({ kind: 'doi', text: '10.1000/second' }),
  ])
  held.release()
  const results = await settled
  assert.equal(held.reads, 1, 'the concurrent request must not even start another library read')
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1)
  assert.match(results.find(result => result.status === 'rejected').reason.message, /正在解析/)
})

test('Enrichment reserves its job slot before awaiting the library read', async t => {
  const w = await workbench(t), state = await savedEntry(w), held = holdReads(w)
  const settled = Promise.allSettled([
    w.enrich([state.entries[0].id], state.revision),
    w.enrich([state.entries[0].id], state.revision),
  ])
  held.release()
  const results = await settled
  assert.equal(held.reads, 1, 'the concurrent request must not start a second enrichment')
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1)
  assert.match(results.find(result => result.status === 'rejected').reason.message, /已有补全/)
})

test('Disposal while enrichment awaits its library read cannot register a late job', async t => {
  const w = await workbench(t), state = await savedEntry(w), held = holdReads(w)
  const starting = w.enrich([state.entries[0].id], state.revision)
  w.dispose()
  held.release()
  await assert.rejects(starting, /插件已卸载/)
})

test('Disposal while preview awaits its library read starts no parser worker', async t => {
  const w = await workbench(t), held = holdReads(w), workers = countWorkers()
  try {
    const starting = w.preview({ kind: 'doi', text: '10.1000/disposed' })
    w.dispose()
    held.release()
    await assert.rejects(starting, /插件已卸载/)
    assert.equal(workers.started, 0)
  } finally { workers.restore() }
})

test('Cancellation while preview awaits its library read starts no parser worker and releases its slot', async t => {
  const w = await workbench(t), held = holdReads(w), workers = countWorkers(), controller = new AbortController()
  const reason = new Error('Request cancelled while reading')
  try {
    const starting = w.preview({ kind: 'doi', text: '10.1000/cancelled' }, controller.signal)
    controller.abort(reason)
    held.release()
    await assert.rejects(starting, error => error === reason)
    assert.equal(workers.started, 0)
  } finally { workers.restore() }
  const preview = await w.preview({ kind: 'doi', text: '10.1000/retry-after-cancel' })
  assert.equal(preview.rows[0].work.doi, '10.1000/retry-after-cancel')
})

test('Failed library reads release parser and enrichment reservations for retry', async t => {
  const w = await workbench(t), read = w.store.read.bind(w.store)
  w.store.read = async () => { throw new Error('Controlled read failure') }
  await assert.rejects(w.preview({ kind: 'doi', text: '10.1000/retry' }), /Controlled read failure/)
  w.store.read = read
  const state = await savedEntry(w)
  w.store.read = async () => { throw new Error('Controlled read failure') }
  await assert.rejects(w.enrich([state.entries[0].id], state.revision), /Controlled read failure/)
  w.store.read = read
  const job = await w.enrich([state.entries[0].id], state.revision)
  assert.equal(job.state, 'running')
})
