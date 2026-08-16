/**
 * 四个面向模型的参考文献工具：
 * cite_lookup / cite_format / cite_bibtex / cite_check。
 *
 * @module dsh-cite/tools
 */

import { optionalInteger, optionalString, requiredString, type ResolvedCiteConfig } from './config.js'
import { extractDois, lookupDoi, searchWorks, type FetchLike, type Work } from './crossref.js'
import { buildBibtex, buildCitation, readStyle } from './format.js'

export interface ContentBlock {
  type: 'text'
  text: string
}

export interface CiteToolDefinition {
  name: string
  description: string
  parameters: { type: 'object'; properties: Record<string, unknown>; required?: string[] }
  output: {
    schema: Record<string, unknown>
    render(args: unknown, value: unknown): ContentBlock[]
  }
  execute(args: unknown, exec: unknown): Promise<unknown>
  timeoutMs?: number
}

function compileParameters(spec: Record<string, any>): { type: 'object'; properties: Record<string, unknown>; required?: string[] } {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    if (prop?.enum !== undefined) node.enum = prop.enum
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
}

const authorSchema = {
  type: 'object',
  properties: { given: { type: 'string' }, family: { type: 'string' }, name: { type: 'string' } },
  additionalProperties: true,
}

const workSchema = {
  type: 'object',
  properties: {
    doi: { type: 'string' },
    type: { type: 'string' },
    title: { type: 'string' },
    authors: { type: 'array', items: authorSchema },
    containerTitle: { type: 'string' },
    publisher: { type: 'string' },
    year: { type: 'integer' },
    language: { type: 'string' },
    volume: { type: 'string' },
    issue: { type: 'string' },
    page: { type: 'string' },
    url: { type: 'string' },
    isbn: { type: 'string' },
  },
  additionalProperties: true,
}

const lookupSchema = {
  type: 'object',
  properties: { count: { type: 'integer' }, works: { type: 'array', items: workSchema } },
  additionalProperties: true,
}

const formatSchema = {
  type: 'object',
  properties: { doi: { type: 'string' }, style: { type: 'string' }, citation: { type: 'string' }, work: workSchema },
  additionalProperties: true,
}

const bibtexSchema = {
  type: 'object',
  properties: { doi: { type: 'string' }, key: { type: 'string' }, bibtex: { type: 'string' } },
  additionalProperties: true,
}

const checkItemSchema = {
  type: 'object',
  properties: { doi: { type: 'string' }, ok: { type: 'boolean' }, title: { type: 'string' }, url: { type: 'string' }, error: { type: 'string' } },
  additionalProperties: true,
}

const checkSchema = {
  type: 'object',
  properties: { count: { type: 'integer' }, results: { type: 'array', items: checkItemSchema } },
  additionalProperties: true,
}

function workLabel(work: Work): string {
  const title = work.title !== '' ? work.title : '(无标题)'
  return title + '（' + (work.year > 0 ? work.year + ', ' : '') + (work.containerTitle !== '' ? work.containerTitle : work.publisher) + '）'
}

export function buildCiteTools(cfg: ResolvedCiteConfig, fetchImpl?: FetchLike): CiteToolDefinition[] {
  const citeLookup: CiteToolDefinition = {
    name: 'cite_lookup',
    description: '查询文献元数据：给 DOI 精确查询，或给题录文本（标题/作者/刊名）到 Crossref 检索。返回归一化后的作者、标题、期刊、年份、卷期页、DOI 等信息。',
    parameters: compileParameters({
      doi: { type: 'string', description: 'DOI（可选；与 query 至少给一个，例如 10.1038/nature12345）。' },
      query: { type: 'string', description: '题录检索文本（可选；与 doi 至少给一个）。' },
      limit: { type: 'integer', description: 'query 检索返回条数 1-10（默认 5）。' },
    }),
    output: { schema: lookupSchema, render: (_args, value) => {
      const rec = (value ?? {}) as Record<string, unknown>
      const works = Array.isArray(rec.works) ? rec.works as Work[] : []
      return [{ type: 'text', text: works.map((work, index) => (index + 1) + '. ' + workLabel(work)).join('\n') }]
    } },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const doi = optionalString(args, 'doi')
      const query = optionalString(args, 'query')
      if (doi === undefined && query === undefined) throw new Error('cite_lookup 需要 doi 或 query 参数（至少一个）。')
      if (doi !== undefined) {
        const work = await lookupDoi(doi, cfg, fetchImpl)
        return { count: 1, works: [work] }
      }
      const queryDoi = extractDois(query!)[0]
      if (queryDoi !== undefined) {
        const work = await lookupDoi(queryDoi, cfg, fetchImpl)
        return { count: 1, works: [work], matchedDoi: queryDoi }
      }
      const limit = optionalInteger(args, 'limit', '返回条数', 1, 10, 5)
      const works = await searchWorks(query!, limit, cfg, fetchImpl)
      if (works.length === 0) throw new Error('Crossref 没有找到匹配文献，请尝试更精确的标题/作者。')
      return { count: works.length, works }
    },
    timeoutMs: cfg.timeoutMs + 2000,
  }

  const citeFormat: CiteToolDefinition = {
    name: 'cite_format',
    description: '按 DOI 生成规范参考文献条目。style 支持 gb-t-7714（默认，中国论文标准）、apa、mla、chicago；lang 为 zh 或 en（影响电子文献引用日期措辞）。',
    parameters: compileParameters({
      doi: { type: 'string', required: true, description: '文献 DOI（必填）。' },
      style: { type: 'string', enum: ['gb-t-7714', 'apa', 'mla', 'chicago'], description: '引用格式（默认 gb-t-7714）。' },
      lang: { type: 'string', enum: ['zh', 'en'], description: '语言（默认 zh）。' },
    }),
    output: { schema: formatSchema, render: (_args, value) => {
      const rec = (value ?? {}) as Record<string, unknown>
      return [{ type: 'text', text: typeof rec.citation === 'string' ? rec.citation : '' }]
    } },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const doi = requiredString(args, 'doi', 'DOI')
      const style = readStyle(args.style)
      const lang = args.lang === 'en' ? 'en' : 'zh'
      const work = await lookupDoi(doi, cfg, fetchImpl)
      const citation = buildCitation(work, style, lang)
      return { doi: work.doi || doi, style, citation, work }
    },
    timeoutMs: cfg.timeoutMs + 2000,
  }

  const citeBibtex: CiteToolDefinition = {
    name: 'cite_bibtex',
    description: '按 DOI 生成 BibTeX 条目。key 可选，缺省用第一作者 + 年份 + 标题首词生成。',
    parameters: compileParameters({
      doi: { type: 'string', required: true, description: '文献 DOI（必填）。' },
      key: { type: 'string', description: 'BibTeX 引用键（可选）。' },
    }),
    output: { schema: bibtexSchema, render: (_args, value) => {
      const rec = (value ?? {}) as Record<string, unknown>
      return [{ type: 'text', text: typeof rec.bibtex === 'string' ? rec.bibtex : '' }]
    } },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const doi = requiredString(args, 'doi', 'DOI')
      const key = optionalString(args, 'key')
      const work = await lookupDoi(doi, cfg, fetchImpl)
      const bibtex = buildBibtex(work, key)
      return { doi: work.doi || doi, key, bibtex }
    },
    timeoutMs: cfg.timeoutMs + 2000,
  }

  const citeCheck: CiteToolDefinition = {
    name: 'cite_check',
    description: '从一段文本中提取所有 DOI 并逐个到 Crossref 校验是否存在，返回每个 DOI 的状态与标题。用于检查参考文献清单里的 DOI 是否有效。',
    parameters: compileParameters({
      text: { type: 'string', required: true, description: '要检查的文本（参考文献列表或任意含 DOI 的文本）。' },
      maxChecks: { type: 'integer', description: '最多校验多少个 DOI，1-50（默认 10）。' },
    }),
    output: { schema: checkSchema, render: (_args, value) => {
      const rec = (value ?? {}) as Record<string, unknown>
      const results = Array.isArray(rec.results) ? rec.results : []
      return [{ type: 'text', text: 'DOI 校验：' + results.map((item) => {
        const row = (item ?? {}) as Record<string, unknown>
        return (row.ok === true ? '✅' : '❌') + ' ' + row.doi + (typeof row.title === 'string' && row.title !== '' ? ' — ' + row.title : '')
      }).join('\n') }]
    } },
    async execute(rawArgs: unknown) {
      const args = (rawArgs ?? {}) as Record<string, unknown>
      const text = requiredString(args, 'text', '待检查文本')
      const maxChecks = optionalInteger(args, 'maxChecks', '校验数量', 1, 50, 10)
      const dois = extractDois(text).slice(0, maxChecks)
      const results: Array<Record<string, unknown>> = []
      for (const doi of dois) {
        try {
          const work = await lookupDoi(doi, cfg, fetchImpl)
          results.push({ doi, ok: true, title: work.title, url: work.url })
        } catch (error) {
          results.push({ doi, ok: false, title: '', url: '', error: error instanceof Error ? error.message : String(error) })
        }
      }
      return { count: results.length, results }
    },
    timeoutMs: cfg.timeoutMs * 3 + 5000,
  }

  return [citeLookup, citeFormat, citeBibtex, citeCheck]
}
