import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../templates/dsh-style-switcher.js', import.meta.url), 'utf8')
const moduleSource = `${source}\nexport { resolveHostPrimitives };`
const { resolveHostPrimitives } = await import('data:text/javascript;base64,' + Buffer.from(moduleSource).toString('base64'))

test('keeps primitive types stable while detecting host lifecycle changes', () => {
  const React = { createElement() {} }
  const original = { Menu() {}, Modal() {} }
  const replacement = { Menu() {}, Modal() {} }
  let host = null
  const requireHost = () => {
    if (!host) throw new Error('not mounted')
    return host
  }
  const fallback = resolveHostPrimitives(React, requireHost)
  assert.equal(resolveHostPrimitives(React, requireHost).Modal, fallback.Modal)
  host = original
  const mounted = resolveHostPrimitives(React, requireHost)
  assert.equal(mounted.isFallback, false, 'discovers a late host using the same loader')
  assert.equal(resolveHostPrimitives(React, requireHost).Modal, mounted.Modal)
  host = replacement
  const replaced = resolveHostPrimitives(React, requireHost)
  assert.notEqual(replaced.Modal, mounted.Modal)
  assert.equal(resolveHostPrimitives(React, requireHost).Menu, replaced.Menu)
  host = null
  for (const key of ['Modal', 'Menu', 'Input']) {
    assert.equal(resolveHostPrimitives(React, requireHost)[key], fallback[key], key)
  }
})
