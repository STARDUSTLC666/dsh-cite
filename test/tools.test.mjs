import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCitation, buildBibtex, readStyle } from '../lib/format.js'
import { extractDois, lookupDoi } from '../lib/crossref.js'
import { buildCiteTools, resolveConfig } from '../lib/index.js'
import { apply } from '../lib/index.js'

const work = {"doi":"10.1038/nature12345","type":"journal-article","title":"Deep learning for citation","authors":[{"given":"Ada","family":"Lovelace","name":""},{"given":"Grace","family":"Hopper","name":""}],"containerTitle":"Nature","publisher":"Nature Publishing","year":2024,"volume":"600","issue":"12","page":"1-9","url":"https://doi.org/10.1038/nature12345","isbn":""};
const crossrefMessage = {"message":{"DOI":"10.1038/nature12345","type":"journal-article","title":["Deep learning for citation"],"author":[{"given":"Ada","family":"Lovelace"},{"given":"Grace","family":"Hopper"}],"container-title":["Nature"],"publisher":"Nature Publishing","volume":"600","issue":"12","page":"1-9","URL":"https://doi.org/10.1038/nature12345","language":"en","issued":{"date-parts":[[2024]]}}};

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

test('APA / IEEE / MLA / Chicago 引文格式', () => {
  assert.match(buildCitation(work, 'apa'), /Lovelace, A\.\, & Hopper, G\. \(2024\)/)
  assert.match(buildCitation(work, 'ieee'), /A\. Lovelace, and G\. Hopper, "Deep learning for citation," Nature, vol\. 600, no\. 12, pp\. 1-9, 2024\. doi: 10\.1038\/nature12345\./)
  assert.match(buildCitation(work, 'mla'), /Lovelace, Ada, and Grace Hopper/)
  assert.match(buildCitation(work, 'chicago'), /Ada Lovelace, Grace Hopper, "Deep learning for citation", Nature/)
})

test('BibTeX 生成', () => {
  const bib = buildBibtex(work)
  assert.match(bib, /@article\{lovelace2024deep/)
  assert.match(bib, /journal=\{Nature\}/)
  assert.match(bib, /doi=\{10\.1038\/nature12345\}/)
  assert.match(bib, /author=\{Lovelace, Ada and Hopper, Grace\}/)
})

test('BibTeX 自定义 key 清洗非法字符', () => {
  assert.match(buildBibtex(work, 'my key, v2'), /@article\{my_key_v2,/)
  assert.match(buildBibtex(work, '   '), /@article\{lovelace2024deep/)
})

test('BibTeX 自动生成 key：机构作者与含空格姓氏', () => {
  const org = { ...work, authors: [{ given: '', family: '', name: 'World Health Organization' }] }
  assert.match(buildBibtex(org), /@\w+\{world_health_organization2024deep,/)
  assert.match(buildBibtex(org), /author=\{\{World Health Organization\}\}/)
  const spaced = { ...work, authors: [{ given: 'Ludwig', family: 'van der Berg', name: '' }] }
  const keyLine = buildBibtex(spaced).split('\n')[0]
  assert.equal(keyLine, '@article{van_der_berg2024deep,')
  assert.match(buildBibtex(spaced), /author=\{van der Berg, Ludwig\}/)
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
  assert.equal(result.language, 'en')
})

test('lookupDoi 兼容旧式 dx.doi.org 链接', async () => {
  const { fn, calls } = fakeFetch()
  const result = await lookupDoi('http://dx.doi.org/10.1038/nature12345', cfg, fn)
  assert.equal(result.doi, '10.1038/nature12345')
  assert.ok(calls[0].includes('10.1038%2Fnature12345'))
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

test('cite_format 输出五种格式（含 IEEE）', async () => {
  const { fn } = fakeFetch()
  const tool = buildCiteTools(cfg, fn).find(t => t.name === 'cite_format')
  for (const style of ['gb-t-7714', 'apa', 'ieee', 'mla', 'chicago']) {
    const value = await tool.execute({ doi: '10.1038/nature12345', style }, {})
    assert.equal(value.style, style)
    assert.ok(value.citation.length > 10)
  }
})

test('多文献类型（会议论文、图书章节、专著、学位论文、报告、标准、专利）五种引文与 BibTeX 格式', () => {
  const chapter = {
    doi: '10.1000/chap-1', type: 'book-chapter', title: 'Spatial Libraries',
    authors: [{ given: 'Lin', family: 'Chen', name: '' }],
    containerTitle: 'Handbook of Knowledge Tools', publisher: 'Academic Press',
    year: 2026, language: 'en', volume: '', issue: '', page: '45-68', url: 'https://doi.org/10.1000/chap-1', isbn: '978-0-12-345678-9',
  }
  assert.equal(buildCitation(chapter, 'gb-t-7714', 'zh'), 'Chen Lin. Spatial Libraries[M]//Handbook of Knowledge Tools. Academic Press, 2026: 45-68.')
  assert.match(buildCitation(chapter, 'apa', 'en'), /In Handbook of Knowledge Tools \(pp\. 45-68\)\. Academic Press\. https:\/\/doi\.org\/10\.1000\/chap-1/)
  assert.match(buildCitation(chapter, 'ieee', 'en'), /in Handbook of Knowledge Tools, pp\. 45-68, 2026\. doi: 10\.1000\/chap-1\./)
  const chapBib = buildBibtex(chapter)
  assert.match(chapBib, /^@incollection\{/)
  assert.match(chapBib, /booktitle=\{Handbook of Knowledge Tools\}/)
  assert.match(chapBib, /isbn=\{978-0-12-345678-9\}/)

  const conf = {
    doi: '10.1000/conf-1', type: 'proceedings-article', title: 'Fast Indexing',
    authors: [{ given: 'Wei', family: 'Li', name: '' }],
    containerTitle: 'Proceedings of SIGIR', publisher: 'ACM',
    year: 2025, language: 'en', volume: '', issue: '', page: '101-110', url: '', isbn: '',
  }
  assert.equal(buildCitation(conf, 'gb-t-7714', 'zh'), 'Li Wei. Fast Indexing[C]//Proceedings of SIGIR. ACM, 2025: 101-110.')
  assert.match(buildCitation(conf, 'apa', 'en'), /In Proceedings of SIGIR \(pp\. 101-110\)\. ACM\. https:\/\/doi\.org\/10\.1000\/conf-1/)

  const thesis = {
    doi: '', type: 'dissertation', title: 'Neural Citations',
    authors: [{ given: 'Mei', family: 'Zhou', name: '' }],
    containerTitle: '', publisher: 'Tsinghua University',
    year: 2024, language: 'zh', volume: '', issue: '', page: '', url: 'https://example.org/thesis', isbn: '',
  }
  assert.equal(buildCitation(thesis, 'gb-t-7714', 'zh'), 'Zhou Mei. Neural Citations[D]. Tsinghua University, 2024.')
  assert.doesNotMatch(buildCitation(thesis, 'gb-t-7714', 'zh'), /引用日期/)
  assert.match(buildCitation(thesis, 'mla', 'en'), /Tsinghua University, 2024\. https:\/\/example\.org\/thesis/)
  assert.match(buildCitation(thesis, 'chicago', 'en'), /\(Tsinghua University, 2024\)\. https:\/\/example\.org\/thesis/)

  const proc = { ...conf, type: 'proceedings', containerTitle: '', page: '' }
  assert.match(buildBibtex(proc), /^@proceedings\{/)
  assert.equal(buildCitation(proc, 'gb-t-7714', 'zh'), 'Li Wei. Fast Indexing[C]. ACM, 2025.')

  const unsafeBib = buildBibtex({ ...work, volume: '12{a}', issue: '3%4', page: '10_12' })
  assert.match(unsafeBib, /volume=\{12\\\{a\\\}\}/)
  assert.match(unsafeBib, /number=\{3\\%4\}/)
  assert.match(unsafeBib, /pages=\{10\\_12\}/)

  // CSL standard type aliases (paper-conference, article-journal, chapter, thesis) & empty-container / whitespace-title edge cases
  const cslConf = { ...conf, type: 'paper-conference' }
  assert.equal(buildCitation(cslConf, 'gb-t-7714', 'zh'), 'Li Wei. Fast Indexing[C]//Proceedings of SIGIR. ACM, 2025: 101-110.')
  assert.match(buildBibtex(cslConf), /^@inproceedings\{/)
  const cslJournalNoVenue = { ...work, type: 'article-journal', containerTitle: '', title: '   ' }
  assert.match(buildCitation(cslJournalNoVenue, 'gb-t-7714', 'en'), /\(Untitled\)\[J\]\. 2024, 600\(12\): 1-9\.$/)
  assert.doesNotMatch(buildCitation(cslJournalNoVenue, 'gb-t-7714', 'en'), /cited|引用日期/)
  assert.match(buildBibtex({ ...chapter, type: 'chapter' }), /^@incollection\{/)
  assert.match(buildBibtex({ ...thesis, type: 'thesis' }), /^@phdthesis\{/)
})

test('lookupDoi 兼容 www.doi.org 链接', async () => {
  const { fn, calls } = fakeFetch()
  const result = await lookupDoi('https://www.doi.org/10.1038/nature12345', cfg, fn)
  assert.equal(result.doi, '10.1038/nature12345')
  assert.ok(calls[0].includes('10.1038%2Fnature12345'))
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

test('cite_check 并发校验且保持顺序', async () => {
  let active = 0
  let maxActive = 0
  const fn = async () => {
    active += 1
    maxActive = Math.max(maxActive, active)
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 10))
    active -= 1
    return new Response(JSON.stringify(crossrefMessage), { status: 200, headers: { 'content-type': 'application/json' } })
  }
  const tool = buildCiteTools(cfg, fn).find(t => t.name === 'cite_check')
  const textInput = ['10.1000/a', '10.1000/b', '10.1000/c', '10.1000/d', '10.1000/e', '10.1000/f'].join(' ')
  const value = await tool.execute({ text: textInput, maxChecks: 6 }, {})
  assert.equal(value.count, 6)
  assert.deepEqual(value.results.map((item) => item.doi), ['10.1000/a', '10.1000/b', '10.1000/c', '10.1000/d', '10.1000/e', '10.1000/f'])
  assert.ok(maxActive <= 3, 'maxActive=' + maxActive)
  assert.ok(maxActive > 1, 'expected parallel checks, maxActive=' + maxActive)
})

test('apply 注册 6 个工具（含 cite_health / cite_batch）且 dispose 清理', () => {
  const names = []
  const listeners = {}
  const ctx = { tools: { register(def) { names.push(def.name); return () => names.splice(names.indexOf(def.name), 1) } }, on(e, l) { listeners[e] = l } }
  apply(ctx, {})
  assert.deepEqual(names, ['cite_lookup', 'cite_format', 'cite_bibtex', 'cite_check', 'cite_health', 'cite_batch'])
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
