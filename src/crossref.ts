/**
 * Crossref REST API 适配：按 DOI 查询 / 题录检索，统一归一化为 Work。
 *
 * @module dsh-cite/crossref
 */

import { type ResolvedCiteConfig } from './config.js'

export interface CiteAuthor {
  given: string
  family: string
  name: string
}

export interface Work {
  doi: string
  type: string
  title: string
  authors: CiteAuthor[]
  containerTitle: string
  publisher: string
  year: number
  language: string
  volume: string
  issue: string
  page: string
  url: string
  isbn: string
}

export type FetchLike = (url: string, init?: { headers?: Record<string, string>; signal?: AbortSignal }) => Promise<Response>

const CROSSREF_API = 'https://api.crossref.org/works/'
const DOI_PATTERN = /^10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$/i

export function assertDoi(value: string): string {
  const doi = value.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '')
  if (!DOI_PATTERN.test(doi)) throw new Error('DOI 格式不正确：' + value + '（示例：10.1038/nature12345）。')
  return doi
}

function firstText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return firstText(value[0])
  return ''
}

function firstNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (Array.isArray(value)) return firstNumber(value[0])
  return 0
}

function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function normalizeAuthor(raw: unknown): CiteAuthor | null {
  const rec = record(raw)
  const family = typeof rec.family === 'string' ? rec.family.trim() : ''
  const given = typeof rec.given === 'string' ? rec.given.trim() : ''
  const name = typeof rec.name === 'string' ? rec.name.trim() : ''
  if (family === '' && given === '' && name === '') return null
  return { given, family, name }
}

function normalizeWork(raw: Record<string, unknown>): Work {
  const authorsRaw = Array.isArray(raw.author) ? raw.author : []
  const authors = authorsRaw.map(normalizeAuthor).filter((item): item is CiteAuthor => item !== null)
  const issued = record(raw.issued)
  const dateParts = Array.isArray(issued['date-parts']) ? issued['date-parts'] : []
  const year = firstNumber(Array.isArray(dateParts[0]) ? (dateParts[0] as unknown[])[0] : raw.year)
  const doi = typeof raw.DOI === 'string' ? raw.DOI.trim() : ''
  return {
    doi,
    type: typeof raw.type === 'string' ? raw.type : 'other',
    title: firstText(raw.title),
    authors,
    containerTitle: firstText(raw['container-title']),
    publisher: typeof raw.publisher === 'string' ? raw.publisher.trim() : '',
    year: year || 0,
    language: typeof raw.language === 'string' ? raw.language.trim().toLowerCase() : '',
    volume: typeof raw.volume === 'string' ? raw.volume.trim() : '',
    issue: typeof raw.issue === 'string' ? raw.issue.trim() : '',
    page: typeof raw.page === 'string' ? raw.page.trim() : '',
    url: typeof raw.URL === 'string' ? raw.URL.trim() : (doi !== '' ? 'https://doi.org/' + doi : ''),
    isbn: firstText(raw.ISBN),
  }
}

function makeHeaders(cfg: ResolvedCiteConfig): Record<string, string> {
  return { 'user-agent': cfg.userAgent, accept: 'application/json' }
}

function requestSignal(timeoutMs: number, signal?: AbortSignal): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(timeoutMs)
  return signal === undefined ? timeoutSignal : AbortSignal.any([signal, timeoutSignal])
}

function withAbort<T>(value: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason)
    signal.addEventListener('abort', abort, { once: true })
    value.then(result => { signal.removeEventListener('abort', abort); resolve(result) }, error => { signal.removeEventListener('abort', abort); reject(error) })
    if (signal.aborted) abort()
  })
}

/** 按 DOI 查询 Crossref 并归一化。 */
export async function lookupDoi(doi: string, cfg: ResolvedCiteConfig, fetchImpl?: FetchLike, signal?: AbortSignal): Promise<Work> {
  const clean = assertDoi(doi)
  signal?.throwIfAborted()
  const deadline = requestSignal(cfg.timeoutMs, signal)
  const fetcher = fetchImpl ?? (globalThis.fetch as unknown as FetchLike)
  let response: Response
  try {
    response = await withAbort(fetcher(CROSSREF_API + encodeURIComponent(clean), {
      headers: makeHeaders(cfg),
      signal: deadline,
    }), deadline)
  } catch (error) {
    signal?.throwIfAborted()
    if (deadline.aborted) throw new Error('Crossref 请求超时，请稍后重试；本地文献已保留。')
    const code = error instanceof Error && typeof (error.cause as any)?.code === 'string' && /^[A-Z0-9_]+$/.test((error.cause as any).code) ? ' (' + (error.cause as any).code + ')' : ''
    throw new Error('Crossref 请求失败：' + (error instanceof Error ? error.message : String(error)) + code)
  }
  if (!response.ok) {
    if (response.status === 404) throw new Error('DOI 在 Crossref 中不存在：' + clean)
    throw new Error('Crossref 返回 HTTP ' + response.status + '，无法完成查询。')
  }
  let payload: unknown
  try {
    payload = await withAbort(response.json(), deadline)
  } catch {
    signal?.throwIfAborted()
    if (deadline.aborted) throw new Error('Crossref 响应读取超时，请稍后重试；本地文献已保留。')
    throw new Error('Crossref 响应不是合法 JSON。')
  }
  const message = record(payload).message
  if (typeof message !== 'object' || message === null) throw new Error('Crossref 响应缺少 message 字段。')
  const work = normalizeWork(message as Record<string, unknown>)
  if (work.doi === '') work.doi = clean
  return work
}

/** 按题录文本检索 Crossref，返回归一化结果。 */
export async function searchWorks(query: string, limit: number, cfg: ResolvedCiteConfig, fetchImpl?: FetchLike, signal?: AbortSignal): Promise<Work[]> {
  const q = query.trim()
  signal?.throwIfAborted()
  const deadline = requestSignal(cfg.timeoutMs, signal)
  if (q === '') throw new Error('检索词不能为空。')
  const url = CROSSREF_API + '?query.bibliographic=' + encodeURIComponent(q) + '&rows=' + String(limit)
  const fetcher = fetchImpl ?? (globalThis.fetch as unknown as FetchLike)
  let response: Response
  try {
    response = await withAbort(fetcher(url, {
      headers: makeHeaders(cfg),
      signal: deadline,
    }), deadline)
  } catch (error) {
    signal?.throwIfAborted()
    if (deadline.aborted) throw new Error('Crossref 请求超时，请稍后重试；本地文献已保留。')
    throw new Error('Crossref 检索失败：' + (error instanceof Error ? error.message : String(error)))
  }
  if (!response.ok) throw new Error('Crossref 返回 HTTP ' + response.status + '，无法完成检索。')
  let payload: unknown
  try {
    payload = await withAbort(response.json(), deadline)
  } catch {
    signal?.throwIfAborted()
    if (deadline.aborted) throw new Error('Crossref 响应读取超时，请稍后重试；本地文献已保留。')
    throw new Error('Crossref 响应不是合法 JSON。')
  }
  const items = record(payload).message
  const list = Array.isArray(items) ? items : (typeof items === 'object' && items !== null ? record(items).items : [])
  if (!Array.isArray(list)) return []
  return list.map((item) => normalizeWork(record(item)))
}

/** 从任意文本里提取 DOI。 */
export function extractDois(text: string): string[] {
  const pattern = /\b10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+/gi
  const seen = new Set<string>()
  const result: string[] = []
  for (const match of text.match(pattern) ?? []) {
    let clean = match.replace(/[.,;:\]}'">]+$/, '').trim()
    while (clean.endsWith(')') && (clean.match(/\)/g)?.length ?? 0) > (clean.match(/\(/g)?.length ?? 0)) clean = clean.slice(0, -1)
    if (seen.has(clean.toLowerCase())) continue
    seen.add(clean.toLowerCase())
    result.push(clean)
  }
  return result
}
