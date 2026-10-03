import { parentPort, workerData } from 'node:worker_threads'
import { Cite, type CSL } from '@citation-js/core'
import '@citation-js/plugin-bibtex'
import { assertDoi, type Work } from './crossref.js'
import { MAX_BATCH, normalizeWork, workWarnings, type ImportRow } from './citation-model.js'

const types: Record<string, string> = { 'article-journal': 'journal-article', book: 'book', chapter: 'book-chapter', 'paper-conference': 'proceedings-article', thesis: 'dissertation', report: 'report', dataset: 'dataset', patent: 'patent', standard: 'standard' }
function workOf(csl: CSL): Work {
  return normalizeWork({
    doi: csl.DOI, type: types[csl.type] || 'other', title: csl.title,
    authors: (csl.author || []).map(a => { const family = [a['non-dropping-particle'], a.family, a.suffix].filter(Boolean).join(' '); const given = [a.given, a['dropping-particle']].filter(Boolean).join(' '); return a.literal || !given ? { name: a.literal || family, family: '', given: '' } : { name: '', family, given } }),
    containerTitle: csl['container-title'], publisher: csl.publisher, year: Number(csl.issued?.['date-parts']?.[0]?.[0] || 0), language: csl.language, volume: csl.volume, issue: csl.issue, page: csl.page, url: csl.URL, isbn: csl.ISBN,
  })
}
try {
  const { kind, text } = workerData as { kind: string; text: string }
  let records: Array<{ key: string; getWork(): Work }>
  if (kind === 'doi') {
    const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
    records = lines.map(line => ({ key: line, getWork: () => normalizeWork({ doi: assertDoi(line), url: 'https://doi.org/' + assertDoi(line).toLowerCase() }) }))
  } else {
    // Force the local parser. Incomplete metadata is allowed; malformed syntax is not.
    const data = new Cite(text, { forceType: '@bibtex/text', generateGraph: false, maxChainLength: 10, strict: false, target: '@csl/list+object' }).data
    records = data.map(csl => ({ key: String(csl['citation-key'] || csl.id || ''), getWork: () => workOf(csl) }))
  }
  if (!records.length) throw new Error('没有找到可导入的文献。DOI 每行一条；BibTeX 应以 @article、@book 等条目开头。')
  if (records.length > MAX_BATCH) throw new Error('单批不能超过 100 条，请拆分导入；没有保存任何条目。')
  const rows: ImportRow[] = records.map((row, index) => { try { const work = row.getWork(); return { index, key: row.key, work, warnings: workWarnings(work) } } catch (e) { return { index, key: row.key, work: null, warnings: [], error: e instanceof Error ? e.message : String(e) } } })
  parentPort!.postMessage({ ok: true, rows })
} catch (e) { parentPort!.postMessage({ ok: false, message: e instanceof Error ? e.message : String(e) }) }
