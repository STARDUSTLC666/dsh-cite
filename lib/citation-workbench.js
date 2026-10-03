import { randomUUID } from 'node:crypto';
import { lookupDoi } from './crossref.js';
import { buildBibtex, buildCitation, readStyle } from './format.js';
import { parseCitationInput } from './citation-parser.js';
import { CitationStore } from './citation-store.js';
import { LibraryConflict, candidateKey, citationId, normalizeWork, readImportInput, readSelection, workWarnings } from './citation-model.js';
import { englishCitationError } from './citation-errors.js';
const message = (e) => (e instanceof Error ? e.message : String(e)).slice(0, 1800);
const summary = (state) => ({ revision: state.revision, entries: state.entries.map(e => ({ ...e, warnings: workWarnings(e.work) })), sources: state.sources.map(({ text: _text, ...s }) => s) });
const emptyField = (v) => v === '' || v === 0 || v === undefined || (Array.isArray(v) && !v.length);
function equivalent(a, b) { return typeof a === 'string' && typeof b === 'string' ? a.normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase() === b.normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase() : JSON.stringify(a) === JSON.stringify(b); }
function mergeWork(local, incoming) {
    const work = structuredClone(local), filled = [], conflicts = [];
    for (const key of Object.keys(work)) {
        if (key === 'doi' || emptyField(incoming[key]))
            continue;
        // 'other' is an import placeholder, rather than a bibliographic classification.
        if (emptyField(work[key]) || key === 'type' && work.type === 'other') {
            work[key] = incoming[key];
            filled.push(key);
        }
        else if (!equivalent(work[key], incoming[key]))
            conflicts.push({ field: key, local: work[key], crossref: incoming[key] });
    }
    return { work, filled, conflicts };
}
const fetchCrossref = async (url, init) => {
    const response = await fetch(url, { ...init, redirect: 'error' });
    if (!response.ok || !response.body)
        return response;
    const reader = response.body.getReader(), chunks = [];
    let bytes = 0;
    try {
        while (true) {
            init?.signal?.throwIfAborted();
            const item = await reader.read();
            if (item.done)
                break;
            bytes += item.value.length;
            if (bytes > 2 * 1024 * 1024)
                throw new Error('Crossref 记录超过 2 MiB，请检查该 DOI。');
            chunks.push(item.value);
        }
    }
    finally {
        await reader.cancel().catch(() => { });
    }
    return new Response(Buffer.concat(chunks), { status: response.status, headers: { 'content-type': 'application/json' } });
};
export class CitationWorkbench {
    cfg;
    fetchImpl;
    route = '/api/dsh-cite/library';
    store;
    previews = new Map();
    jobs = new Map();
    lifetime = new AbortController();
    parsing = false;
    constructor(cfg, root, fetchImpl = fetchCrossref) {
        this.cfg = cfg;
        this.fetchImpl = fetchImpl;
        this.store = new CitationStore(root);
    }
    live() { this.lifetime.signal.throwIfAborted(); }
    async list() { this.live(); return { ...summary(await this.store.read()), jobs: [...this.jobs.values()].map(j => structuredClone(j.view)) }; }
    async preview(raw, signal) {
        this.live();
        if (this.parsing)
            throw new Error('正在解析上一批输入，请稍后重试。');
        const input = readImportInput(raw), state = await this.store.read();
        this.parsing = true;
        let rows;
        try {
            rows = await parseCitationInput(input, signal ? AbortSignal.any([signal, this.lifetime.signal]) : this.lifetime.signal);
        }
        finally {
            this.parsing = false;
        }
        const dois = new Set(), candidates = new Set(), libraryDois = new Set(state.entries.filter(e => e.work.doi).map(e => e.work.doi.toLowerCase())), libraryKeys = new Set(state.entries.map(e => candidateKey(e.work)).filter(Boolean));
        for (const row of rows) {
            if (!row.work) {
                row.selectedDefault = false;
                if (row.error)
                    row.errorEn = englishCitationError(row.error);
                continue;
            }
            const doi = row.work.doi, fingerprint = candidateKey(row.work);
            if (doi) {
                if (libraryDois.has(doi))
                    row.duplicate = 'library';
                else if (dois.has(doi))
                    row.duplicate = 'batch';
                dois.add(doi);
            }
            else if (fingerprint && (candidates.has(fingerprint) || libraryKeys.has(fingerprint)))
                row.candidate = true;
            if (fingerprint)
                candidates.add(fingerprint);
            if (row.key.length > 160)
                row.warnings.push('long_citation_key');
            row.selectedDefault = !row.duplicate && !row.candidate;
        }
        for (const [id, p] of this.previews)
            if (Date.now() - p.createdAt > 600000)
                this.previews.delete(id);
        if (this.previews.size >= 10)
            this.previews.delete(this.previews.keys().next().value);
        const p = { id: randomUUID(), revision: state.revision, input, rows, createdAt: Date.now() };
        this.previews.set(p.id, p);
        return { id: p.id, revision: p.revision, label: input.label, rows: structuredClone(rows), expiresInSeconds: 600 };
    }
    async import(id, selection) {
        this.live();
        const p = this.previews.get(citationId(id));
        if (!p || Date.now() - p.createdAt > 600000)
            throw new Error('预览已过期或 DSH 已重启。原输入仍保留，请重新预览。');
        if (!Array.isArray(selection) || !selection.length || selection.length > 100 || selection.some(i => !Number.isInteger(i) || i < 0 || i >= p.rows.length) || new Set(selection).size !== selection.length)
            throw new Error('请选择 1–100 个有效预览条目。');
        const state = await this.store.import(p.revision, p.input, selection.map(i => p.rows[i]));
        this.previews.delete(p.id);
        return summary(state);
    }
    async enrich(rawIds, revision) {
        this.live();
        if ([...this.jobs.values()].some(j => j.view.state === 'running'))
            throw new Error('已有补全任务运行中，请等待或取消。');
        const ids = readSelection(rawIds), state = await this.store.read();
        if (state.revision !== revision)
            throw new LibraryConflict('文献库已更新，请刷新后重新选择。');
        const entries = ids.map(id => { const entry = state.entries.find(e => e.id === id); if (!entry)
            throw new Error('选择中包含不存在的文献，请刷新。'); return entry; });
        const job = { controller: new AbortController(), view: { id: randomUUID(), state: 'running', total: entries.length, completed: 0, saved: 0, results: [] } };
        if (this.jobs.size >= 10)
            this.jobs.delete(this.jobs.keys().next().value);
        this.jobs.set(job.view.id, job);
        void this.runEnrichment(job, state.revision, entries);
        return structuredClone(job.view);
    }
    async runEnrichment(job, revision, entries) {
        const signal = AbortSignal.any([job.controller.signal, this.lifetime.signal]), patches = new Map();
        let next = 0;
        try {
            await Promise.all(Array.from({ length: Math.min(2, entries.length) }, async () => {
                while (next < entries.length) {
                    signal.throwIfAborted();
                    const e = entries[next++];
                    try {
                        if (!e.work.doi)
                            throw new Error('此条目没有 DOI，无法从 Crossref 补全。');
                        const incoming = normalizeWork(await lookupDoi(e.work.doi, this.cfg, this.fetchImpl, signal));
                        signal.throwIfAborted();
                        if (incoming.doi !== e.work.doi.toLowerCase())
                            throw new Error('Crossref 返回的 DOI 不匹配，已保留本地记录。');
                        const merged = mergeWork(e.work, incoming);
                        patches.set(e.id, merged);
                        job.view.results.push({ id: e.id, doi: e.work.doi, ok: true, filled: merged.filled, conflicts: merged.conflicts });
                    }
                    catch (e2) {
                        signal.throwIfAborted();
                        const error = message(e2);
                        job.view.results.push({ id: e.id, doi: e.work.doi, ok: false, error, errorEn: englishCitationError(error) });
                    }
                    job.view.completed++;
                }
            }));
            signal.throwIfAborted();
            if (patches.size)
                await this.store.edit(revision, state => {
                    signal.throwIfAborted();
                    for (const e of state.entries) {
                        const patch = patches.get(e.id);
                        if (patch) {
                            e.work = patch.work;
                            e.updatedAt = new Date().toISOString();
                            e.crossref = { doi: e.work.doi, fetchedAt: e.updatedAt, filled: patch.filled, conflicts: patch.conflicts };
                        }
                    }
                }, signal);
            job.view.saved = patches.size;
            job.view.state = 'done';
        }
        catch (e) {
            job.view.state = signal.aborted ? 'cancelled' : 'failed';
            job.view.conflict = e instanceof LibraryConflict;
            job.view.message = signal.aborted ? '已取消；本次补全没有写入文献库。' : message(e);
            job.view.messageEn = englishCitationError(job.view.message);
        }
    }
    job(id) { this.live(); const j = this.jobs.get(citationId(id)); if (!j)
        throw new Error('任务不存在或 DSH 已重启。文献仍保留，请刷新。'); return structuredClone(j.view); }
    cancel(id) { this.live(); const j = this.jobs.get(citationId(id)); if (!j)
        throw new Error('任务不存在。'); if (j.view.state === 'running')
        j.controller.abort(); return structuredClone(j.view); }
    dispose() { this.lifetime.abort(new Error('插件已卸载。')); for (const j of this.jobs.values())
        j.controller.abort(); }
    async export(kind, style, lang, rawIds) {
        this.live();
        const state = await this.store.read(), ids = rawIds === undefined ? undefined : readSelection(rawIds);
        const entries = ids ? ids.map(id => { const e = state.entries.find(e => e.id === id); if (!e)
            throw new Error('所选文献已不存在，请刷新。'); return e; }) : state.entries;
        if (kind === 'backup') {
            if (ids)
                throw new Error('完整备份包含全库及原始来源，请不要附带条目选择。');
            return { filename: 'cite-library.json', type: 'application/json; charset=utf-8', content: JSON.stringify(state, null, 2) };
        }
        if (!entries.length)
            throw new Error('文献库为空，请先导入。');
        if (kind === 'references')
            return { filename: 'references-' + readStyle(style) + '.txt', type: 'text/plain; charset=utf-8', content: entries.map((e, i) => `[${i + 1}] ` + buildCitation(e.work, readStyle(style), lang === 'en' ? 'en' : 'zh')).join('\n\n') + '\n' };
        if (kind !== 'bibtex')
            throw new Error('导出类型只能是 bibtex / references / backup。');
        const keys = new Map(), used = new Set();
        for (const e of state.entries) {
            const base = e.bibKey.replace(/[^A-Za-z0-9_.:\/-]+/g, '_').replace(/^_+|_+$/g, '') || 'work';
            let key = base;
            let n = 0;
            while (used.has(key))
                key = base + '-' + e.id.slice(0, 8) + (n++ ? '-' + n : '');
            used.add(key);
            keys.set(e.id, key);
        }
        return { filename: 'references.bib', type: 'application/x-bibtex; charset=utf-8', content: entries.map(e => buildBibtex(e.work, keys.get(e.id))).join('\n\n') + '\n' };
    }
    async dispatch(value, signal) {
        this.live();
        if (!value || typeof value !== 'object')
            throw new Error('操作参数无效。');
        const v = value;
        switch (v.action) {
            case 'list': return this.list();
            case 'preview': return this.preview({ kind: v.kind, text: v.text, label: v.label }, signal);
            case 'import': return this.import(v.preview, v.selection);
            case 'enrich': return this.enrich(v.ids, v.revision);
            case 'job': return this.job(v.job);
            case 'cancel': return this.cancel(v.job);
            case 'export': return this.export(v.kind, v.style, v.lang, v.ids);
            default: throw new Error('操作无效。');
        }
    }
    async fetch(request) {
        try {
            const url = new URL(request.url), origin = request.headers.get('origin'), site = request.headers.get('sec-fetch-site'), desktop = origin === 'dsh-app://app';
            if (site && !['same-origin', 'none'].includes(site) && !desktop)
                return Response.json({ ok: false, message: '请从 DSH 页面操作。' }, { status: 403 });
            if (origin && !desktop) {
                const source = new URL(origin);
                if (!['http:', 'https:'].includes(source.protocol) || source.host !== (request.headers.get('host') || url.host))
                    return Response.json({ ok: false, message: '请从 DSH 页面操作。' }, { status: 403 });
            }
            if (request.method === 'GET') {
                const ids = url.searchParams.get('ids'), data = await this.export(url.searchParams.get('kind'), url.searchParams.get('style'), url.searchParams.get('lang'), ids ? ids.split(',') : undefined);
                return new Response(data.content, { headers: { 'content-type': data.type, 'content-disposition': `attachment; filename="${data.filename}"`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
            }
            if (request.method !== 'POST')
                return new Response(null, { status: 405 });
            if (request.headers.get('x-dsh-cite') !== '1')
                return Response.json({ ok: false, message: '操作来源无效。' }, { status: 403 });
            if (!request.headers.get('content-type')?.startsWith('application/json'))
                throw new Error('请求格式无效。');
            const text = await request.text();
            if (Buffer.byteLength(text) > 2 * 1024 * 1024)
                throw new Error('请求超过容量限制，请拆分输入。');
            return Response.json({ ok: true, value: await this.dispatch(JSON.parse(text), request.signal) }, { headers: { 'cache-control': 'no-store' } });
        }
        catch (e) {
            return Response.json({ ok: false, message: message(e), messageEn: englishCitationError(message(e)) }, { status: e instanceof LibraryConflict ? 409 : 400, headers: { 'cache-control': 'no-store' } });
        }
    }
}
export function buildBatchTool(workbench) {
    return {
        name: 'cite_batch', description: '本地文献库：显式 preview 解析 DOI 列表/BibTeX（不联网），import 选择预览条目保存，list 读取，enrich 才联网从 Crossref 补空字段且保留冲突原值，job/cancel 查进度或取消，export 导出基本引文/BibTeX/完整原始来源备份。单批最多100条、库最多500条；不得捏造缺失数据。',
        parameters: { type: 'object', properties: { action: { type: 'string', enum: ['list', 'preview', 'import', 'enrich', 'job', 'cancel', 'export'] }, kind: { type: 'string', enum: ['doi', 'bibtex', 'references', 'backup'] }, text: { type: 'string', description: 'DOI 每行一条；或 BibTeX 文本，最大256KiB。' }, label: { type: 'string' }, preview: { type: 'string' }, selection: { type: 'array', items: { type: 'integer' }, description: 'preview 返回的零起始 index（1–100个）。' }, ids: { type: 'array', items: { type: 'string' }, description: '已保存文献 id（1–100个）。' }, revision: { type: 'integer' }, job: { type: 'string' }, style: { type: 'string', enum: ['gb-t-7714', 'apa', 'mla', 'chicago'] }, lang: { type: 'string', enum: ['zh', 'en'] } }, required: ['action'] },
        output: { schema: { type: 'object', additionalProperties: true }, render(_args, value) { return [{ type: 'text', text: JSON.stringify(value, null, 2) }]; } },
        async execute(args, exec) { const signal = typeof exec === 'object' && exec && exec.signal instanceof AbortSignal ? exec.signal : undefined; signal?.throwIfAborted(); return workbench.dispatch(args, signal); }, timeoutMs: 15000,
    };
}
