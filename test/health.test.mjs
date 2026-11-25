import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCiteTools, resolveConfig } from '../lib/index.js'

const cfg = resolveConfig({ timeoutMs: 3000 })

test('cite_health Crossref 可达时 ok=true 且报告延迟', async () => {
  const fetchFn = async () => new Response('{"status":"ok"}', { status: 200 })
  const health = buildCiteTools(cfg, fetchFn).find(t => t.name === 'cite_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.match(String(value.checks[0].detail), /HTTP 200/)
})

test('cite_health 网络失败时 ok=false 且有指引', async () => {
  const fetchFn = async () => { throw new Error('fetch failed') }
  const health = buildCiteTools(cfg, fetchFn).find(t => t.name === 'cite_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  assert.match(String(value.checks[0].detail), /fetch failed/)
})

test('cite_health releases successful and failed response bodies', async () => {
  const cancelled = []
  const fetchFn = async (_url, init) => {
    const status = cancelled.length === 0 ? 200 : 503
    return new Response(new ReadableStream({
      start(controller) { controller.enqueue(new Uint8Array([1])) },
      cancel() { cancelled.push(status) },
    }), { status })
  }
  const health = buildCiteTools(cfg, fetchFn).find(t => t.name === 'cite_health')
  assert.equal((await health.execute({})).ok, true)
  assert.equal((await health.execute({})).ok, false)
  assert.deepEqual(cancelled, [200, 503])
})
