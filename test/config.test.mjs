import test from 'node:test'
import assert from 'node:assert/strict'
import { CITE_TIMEOUT_ENV, CITE_USER_AGENT_ENV, resolveConfig } from '../lib/index.js'

test('DSH_CITE_TIMEOUT_MS / DSH_CITE_USER_AGENT 环境变量回退', () => {
  const cfg = resolveConfig({}, { [CITE_TIMEOUT_ENV]: ' 25000 ', [CITE_USER_AGENT_ENV]: ' my-agent ' })
  assert.equal(cfg.timeoutMs, 25000)
  assert.equal(cfg.userAgent, 'my-agent')
})

test('显式配置优先于环境变量，非法环境值报错', () => {
  assert.equal(resolveConfig({ timeoutMs: 3000 }, { [CITE_TIMEOUT_ENV]: '25000' }).timeoutMs, 3000)
  assert.throws(() => resolveConfig({}, { [CITE_TIMEOUT_ENV]: 'abc' }), /DSH_CITE_TIMEOUT_MS/)
})
