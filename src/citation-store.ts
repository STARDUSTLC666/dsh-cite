import { randomUUID } from 'node:crypto'
import { constants, type Stats } from 'node:fs'
import fs from 'node:fs/promises'
import { mkdir, writeFile, rename, lstat, unlink } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import lockfile from 'proper-lockfile'
import { LibraryConflict, MAX_LIBRARY, MAX_BATCH, MAX_INPUT_BYTES, citationId, normalizeWork, readImportInput, type CitationLibrary, type ImportInput, type ImportRow, type LibraryEntry } from './citation-model.js'

const MAX_FILE = 8 * 1024 * 1024
const empty = (): CitationLibrary => ({ version: 1, revision: 0, entries: [], sources: [] })
function validTime(v: unknown): boolean { return typeof v === 'string' && Number.isFinite(Date.parse(v)) }
function sameFile(left: Stats, right: Stats): boolean { return left.dev === right.dev && left.ino === right.ino }

async function readBounded(file: string, expected: Stats): Promise<string> {
  const failChanged = () => new Error('文献库文件在读取期间已更换，原文件已保留。')
  const failLarge = () => new Error('文献库文件无效或过大，原文件已保留。')
  if (!expected.isFile() || expected.isSymbolicLink() || expected.size > MAX_FILE) throw failLarge()
  const flags = constants.O_RDONLY | (process.platform === 'win32' ? 0 : constants.O_NOFOLLOW ?? 0)
  let handle
  try { handle = await fs.open(file, flags) } catch { throw failChanged() }
  try {
    const opened = await handle.stat()
    let current: Stats
    try { current = await fs.lstat(file) } catch { throw failChanged() }
    if (!opened.isFile() || !sameFile(expected, opened) || !current.isFile() || current.isSymbolicLink() || !sameFile(opened, current)) throw failChanged()
    if (opened.size > MAX_FILE) throw failLarge()
    const chunks: Buffer[] = []
    let size = 0
    for (;;) {
      const buffer = Buffer.allocUnsafe(Math.min(64 * 1024, MAX_FILE + 1 - size))
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, null)
      if (bytesRead === 0) return Buffer.concat(chunks, size).toString('utf8')
      size += bytesRead
      if (size > MAX_FILE) throw failLarge()
      chunks.push(buffer.subarray(0, bytesRead))
    }
  } finally {
    await handle.close()
  }
}

export class CitationStore {
  readonly root: string
  readonly file: string
  constructor(root?: string) { this.root = resolve(root || join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'data/dsh-cite')); this.file = join(this.root, 'library.json') }
  private async init(): Promise<void> { await mkdir(this.root, { recursive: true, mode: 0o700 }); if ((await lstat(this.root)).isSymbolicLink()) throw new Error('文献库目录不能是符号链接。') }
  async read(): Promise<CitationLibrary> {
    await this.init()
    let info: Stats
    try { info = await lstat(this.file) } catch (error: any) { if (error.code === 'ENOENT') return empty(); throw error }
    const text = await readBounded(this.file, info)
    try {
      const v = JSON.parse(text) as CitationLibrary
      if (v.version !== 1 || !Number.isInteger(v.revision) || v.revision < 0 || !Array.isArray(v.entries) || v.entries.length > MAX_LIBRARY || !Array.isArray(v.sources) || v.sources.length > MAX_LIBRARY) throw new Error('结构不符')
      const sourceIds = new Set<string>(), entryIds = new Set<string>(), dois = new Set<string>()
      for (const s of v.sources) { citationId(s.id); readImportInput(s); if (!validTime(s.createdAt) || sourceIds.has(s.id)) throw new Error('来源记录无效'); sourceIds.add(s.id) }
      for (const e of v.entries) {
        citationId(e.id); normalizeWork(e.work)
        if (entryIds.has(e.id) || !Array.isArray(e.sourceIds) || !e.sourceIds.length || e.sourceIds.some(id => !sourceIds.has(id)) || typeof e.bibKey !== 'string' || e.bibKey.length > 160 || !validTime(e.createdAt) || !validTime(e.updatedAt)) throw new Error('条目记录无效')
        if (e.work.doi && dois.has(e.work.doi.toLowerCase())) throw new Error('重复 DOI')
        if (e.work.doi) dois.add(e.work.doi.toLowerCase())
        if (e.crossref && (typeof e.crossref.doi !== 'string' || !validTime(e.crossref.fetchedAt) || !Array.isArray(e.crossref.filled) || !Array.isArray(e.crossref.conflicts))) throw new Error('补全记录无效')
        entryIds.add(e.id)
      }
      return v
    } catch (e) { throw new Error('文献库记录损坏，原文件已保留，请先备份再检查。' + (e instanceof Error ? e.message : '')) }
  }
  async edit(revision: unknown, mutate: (library: CitationLibrary) => void, signal?: AbortSignal): Promise<CitationLibrary> {
    if (typeof revision !== 'number' || !Number.isInteger(revision) || revision < 0) throw new Error('请提供当前文献库修订号。')
    await this.init()
    const unlock = await lockfile.lock(this.root, { retries: { retries: 20, minTimeout: 25, maxTimeout: 100 } })
    const temp = join(this.root, randomUUID() + '.tmp')
    try {
      const state = await this.read()
      signal?.throwIfAborted()
      if (state.revision !== revision) throw new LibraryConflict('文献库已在另一窗口更新。你的输入仍保留，请重新预览后保存。')
      mutate(state); state.revision++
      const bytes = JSON.stringify(state, null, 2)
      if (Buffer.byteLength(bytes) > MAX_FILE) throw new Error('文献库超过 8 MiB，请先备份；本次没有保存。')
      signal?.throwIfAborted()
      await writeFile(temp, bytes, { flag: 'wx', mode: 0o600 }); signal?.throwIfAborted(); await rename(temp, this.file)
      return state
    } finally { await unlink(temp).catch(() => {}); await unlock() }
  }
  async import(revision: number, input: ImportInput, rows: ImportRow[]): Promise<CitationLibrary> {
    readImportInput(input)
    if (!rows.length || rows.length > MAX_BATCH) throw new Error('请选择 1–100 条可导入文献。')
    return this.edit(revision, state => {
      if (state.entries.length + rows.length > MAX_LIBRARY || state.sources.length >= MAX_LIBRARY) throw new Error('文献库最多保存 500 条和 500 次来源，请先备份。')
      const sourceBytes = state.sources.reduce((n, s) => n + Buffer.byteLength(s.text), 0)
      if (sourceBytes + Buffer.byteLength(input.text) > MAX_FILE - MAX_INPUT_BYTES) throw new Error('原始来源已接近容量限制，请先备份。')
      const source = { ...input, id: randomUUID(), createdAt: new Date().toISOString() }, seen = new Set(state.entries.filter(e => e.work.doi).map(e => e.work.doi.toLowerCase()))
      const entries: LibraryEntry[] = rows.map(r => { if (!r.work || r.error || r.duplicate) throw new Error('选择包含错误或精确重复条目，请重新预览。'); const work = normalizeWork(r.work); if (work.doi && seen.has(work.doi)) throw new LibraryConflict('DOI 已存在，请重新预览。'); if (work.doi) seen.add(work.doi); return { id: randomUUID(), work, bibKey: r.key.length <= 160 ? r.key : 'work', sourceIds: [source.id], createdAt: source.createdAt, updatedAt: source.createdAt } })
      state.sources.push(source); state.entries.push(...entries)
    })
  }
}
