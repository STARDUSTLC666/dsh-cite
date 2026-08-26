import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const pkg = require('../package.json')

test('manifest 字段完整', () => {
  assert.equal(pkg.name, 'dsh-cite')
  assert.equal(pkg.version, '0.3.0')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(pkg.files.includes('lib'))
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
})

test('cordis patch 插入 cite 行', () => {
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.match(patch, /id: cite/)
  assert.match(patch, /name: 'dsh-cite'/)
})
