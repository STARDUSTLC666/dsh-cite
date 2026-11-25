import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { CitationStore } from '../lib/citation-store.js'

test('citation store rejects an external file substituted at the open boundary', async t => {
  const root = await fs.mkdtemp(path.join(import.meta.dirname, '.citation-store-race-'))
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  const store = new CitationStore(root)
  const external = path.join(path.dirname(root), path.basename(root) + '-outside.json')
  await fs.writeFile(store.file, JSON.stringify({ version: 1, revision: 0, entries: [], sources: [] }))
  await fs.writeFile(external, JSON.stringify({ version: 1, revision: 0, entries: [], sources: [] }))

  const originalOpen = fs.open
  let replaced = false
  fs.open = async (file, ...args) => {
    if (!replaced && path.resolve(String(file)) === store.file) {
      replaced = true
      await fs.rename(store.file, store.file + '.checked')
      if (process.platform === 'win32') await fs.link(external, store.file)
      else await fs.symlink(external, store.file)
    }
    return originalOpen.call(fs, file, ...args)
  }
  try {
    await assert.rejects(store.read(), /更换/)
    assert.equal(replaced, true)
  } finally {
    fs.open = originalOpen
    await fs.rm(external, { force: true })
  }
})

test('citation store bounds a file growing after its opened metadata check and closes its handle', async t => {
  const root = await fs.mkdtemp(path.join(import.meta.dirname, '.citation-store-growth-'))
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  const store = new CitationStore(root)
  await fs.writeFile(store.file, JSON.stringify({ version: 1, revision: 0, entries: [], sources: [] }))
  const originalOpen = fs.open
  let grown = false, closed = false, bytesRead = 0
  fs.open = async (...args) => {
    const handle = await originalOpen.apply(fs, args)
    if (path.resolve(String(args[0])) === store.file) {
      const read = handle.read.bind(handle), close = handle.close.bind(handle)
      handle.read = async (...readArgs) => {
        if (!grown) { grown = true; await fs.appendFile(store.file, Buffer.alloc(8 * 1024 * 1024 + 1, 32)) }
        const result = await read(...readArgs)
        bytesRead += result.bytesRead
        return result
      }
      handle.close = async () => { closed = true; return close() }
    }
    return handle
  }
  try {
    await assert.rejects(store.read(), /过大/)
    assert.equal(grown, true)
    assert.equal(closed, true)
    assert.ok(bytesRead <= 8 * 1024 * 1024 + 1)
  } finally {
    fs.open = originalOpen
  }
})
