import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCitation, buildBibtex, readStyle } from '../lib/format.js'
import { extractDois, lookupDoi } from '../lib/crossref.js'
import { buildCiteTools, resolveConfig } from '../lib/index.js'
import { apply } from '../lib/index.js'

const work = {"doi":"10.1038/nature12345","type":"journal-article","title":"Deep learning for citation","authors":[{"given":"Ada","family":"Lovelace","name":""},{"given":"Grace","family":"Hopper","name":""}],"containerTitle":"Nature","publisher":"Nature Publishing","year":2024,"volume":"600","issue":"12","page":"1-9","url":"https://doi.org/10.1038/nature12345","isbn":""};
const crossrefMessage = {"message":{"DOI":"10.1038/nature12345","type":"journal-article","title":["Deep learning for citation"],"author":[{"given":"Ada","family":"Lovelace"},{"given":"Grace","family":"Hopper"}],"container-title":["Nature"],"publisher":"Nature Publishing","volume":"600","issue":"12","page":"1-9","URL":"https://doi.org/10.1038/nature12345","issued":{"date-parts":[[2024]]}}};

const cfg = resolveConfig({ timeoutMs: 3000 })
function fakeFetch() {
  const calls = []
  const fn = async (url) => {
    calls.push(url)
    if (url.includes('10.1038')) return new Response(JSON.stringify(crossrefMessage), { status: 200, headers: { 'content-type': 'application/json' } })
    if (url.includes('query.bibliographic=')) {
      return new Response(JSON.stringify({ message: { items: [crossrefMessage.message] } }), { status: 200, headers: { 'content-type': 'application/json' } })
    }
    return new Response(JSON.stringify({ message: {} }), { status: 404 })
  }
  return { fn, calls }
}

test('GB/T 7714 引文格式', () => {
  const citation = buildCitation(work, 'gb-t-7714')
  assert.match(citation, /Lovelace Ada, Hopper Grace/)
  assert.match(citation, /Deep learning for citation\[J\]/)
  assert.match(citation, /Nature, 2024, 600\(12\): 1-9/)
})

test('APA / MLA / Chicago 引文格式', () => {
  assert.match(buildCitation(work, 'apa'), /Lovelace, A\.\, & Hopper, G\. \(2024\)/)
  assert.match(buildCitation(work, 'mla'), /Lovelace, Ada, and Grace Hopper/)
  assert.match(buildCitation(work, 'chicago'), /Lovelace Ada, Hopper Grace, "Deep learning for citation", Nature/)
})

test('BibTeX 生成', () => {
  const bib = buildBibtex(work)
  assert.match(bib, /@article\{lovelace2024deep/)
  assert.match(bib, /journal=\{Nature\}/)
  assert.match(bib, /doi=\{10\.1038\/nature12345\}/)
})

test('BibTeX 自定义 key 清洗非法字符', () => {
  assert.match(buildBibtex(work, 'my key, v2'), /@article\{my_key_v2,/)
  assert.match(buildBibtex(work, '   '), /@article\{lovelace2024deep/)
})

test('readStyle 默认与非法值', () => {
  assert.equal(readStyle(undefined), 'gb-t-7714')
  assert.throws(() => readStyle('harvard'), /style 只支持/)
})

test('extractDois 去重与清洗', () => {
  const dois = extractDois('See https://doi.org/10.1000/xyz and 10.1000/XYZ. Also 10.1000/abc.')
  assert.deepEqual(dois, ['10.1000/xyz', '10.1000/abc'])
})

test('lookupDoi 校验格式并解析 Crossref', async () => {
  const { fn } = fakeFetch()
  const result = await lookupDoi('https://doi.org/10.1038/nature12345', cfg, fn)
  assert.equal(result.title, 'Deep learning for citation')
  assert.equal(result.year, 2024)
})

test('cite_lookup 按 DOI 与 query 检索', async () => {
  const { fn, calls } = fakeFetch()
  const tools = buildCiteTools(cfg, fn)
  const byDoi = await tools.find(t => t.name === 'cite_lookup').execute({ doi: '10.1038/nature12345' }, {})
  assert.equal(byDoi.count, 1)
  const byQuery = await tools.find(t => t.name === 'cite_lookup').execute({ query: 'Deep learning citation', limit: 3 }, {})
  assert.equal(byQuery.works.length, 1)
  const byDoiText = await tools.find(t => t.name === 'cite_lookup').execute({ query: 'See https://doi.org/10.1038/nature12345 for details' }, {})
  assert.equal(byDoiText.count, 1)
  assert.equal(byDoiText.matchedDoi, '10.1038/nature12345')
  assert.ok(calls.some((url) => url.includes('10.1038%2Fnature12345')))
})

test('cite_format 输出四种格式', async () => {
  const { fn } = fakeFetch()
  const tool = buildCiteTools(cfg, fn).find(t => t.name === 'cite_format')
  for (const style of ['gb-t-7714', 'apa', 'mla', 'chicago']) {
    const value = await tool.execute({ doi: '10.1038/nature12345', style }, {})
    assert.equal(value.style, style)
    assert.ok(value.citation.length > 10)
  }
})

test('cite_bibtex 生成条目', async () => {
  const { fn } = fakeFetch()
  const tool = buildCiteTools(cfg, fn).find(t => t.name === 'cite_bibtex')
  const value = await tool.execute({ doi: '10.1038/nature12345' }, {})
  assert.match(value.bibtex, /@article/)
})

test('cite_check 提取并校验 DOI', async () => {
  const { fn } = fakeFetch()
  const tool = buildCiteTools(cfg, fn).find(t => t.name === 'cite_check')
  const value = await tool.execute({ text: 'A 10.1038/nature12345 B 10.1000/missing', maxChecks: 5 }, {})
  assert.equal(value.count, 2)
  assert.equal(value.results[0].ok, true)
  assert.equal(value.results[1].ok, false)
})

test('apply 注册 4 个工具且 dispose 清理', () => {
  const names = []
  const listeners = {}
  const ctx = { tools: { register(def) { names.push(def.name); return () => names.splice(names.indexOf(def.name), 1) } }, on(e, l) { listeners[e] = l } }
  apply(ctx, {})
  assert.deepEqual(names, ['cite_lookup', 'cite_format', 'cite_bibtex', 'cite_check'])
  listeners.dispose()
  assert.deepEqual(names, [])
})

test('每个工具 parameters 是 JSON Schema', () => {
  const tools = buildCiteTools(cfg)
  for (const tool of tools) {
    assert.equal(tool.parameters.type, 'object')
    assert.equal(typeof tool.output.render, 'function')
    assert.equal(tool.output.schema.additionalProperties, true)
  }
})
