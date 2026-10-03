import { assertDoi } from './crossref.js';
export const MAX_INPUT_BYTES = 256 * 1024;
export const MAX_BATCH = 100;
export const MAX_LIBRARY = 500;
/** Never render provider/BibTeX markup as HTML. Keep the original source separately. */
export function plainText(value) {
    if (value === undefined || value === null)
        return '';
    if (typeof value !== 'string' && typeof value !== 'number')
        throw new Error('文献字段不是文本。');
    const text = String(value);
    if (text.length > 16384)
        throw new Error('单个文献字段过长，请拆分或检查原始数据。');
    return text.replace(/<[^>]*>/g, '').replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, token => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ' }[token]))
        .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => { const n = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code); return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : '�'; })
        .replace(/\s+/g, ' ').trim();
}
export function normalizeWork(value) {
    if (!value || typeof value !== 'object')
        throw new Error('文献记录无效。');
    const raw = value, authors = raw.authors ?? [];
    if (!Array.isArray(authors) || authors.length > 2000)
        throw new Error('作者列表无效或超过 2000 人。');
    const work = {
        doi: plainText(raw.doi), type: plainText(raw.type) || 'other', title: plainText(raw.title),
        authors: authors.map(a => { if (!a || typeof a !== 'object')
            throw new Error('作者记录无效。'); return { given: plainText(a.given), family: plainText(a.family), name: plainText(a.name) }; }).filter(a => a.given || a.family || a.name),
        containerTitle: plainText(raw.containerTitle), publisher: plainText(raw.publisher), year: typeof raw.year === 'number' && Number.isInteger(raw.year) && raw.year > 0 && raw.year <= 9999 ? raw.year : 0,
        language: plainText(raw.language), volume: plainText(raw.volume), issue: plainText(raw.issue), page: plainText(raw.page), url: plainText(raw.url), isbn: plainText(raw.isbn),
    };
    if (work.doi)
        work.doi = assertDoi(work.doi).toLowerCase();
    return work;
}
export function workWarnings(work) {
    return [!work.title && 'missing_title', !work.authors.length && 'missing_authors', !work.year && 'missing_year', !work.doi && 'missing_doi'].filter((v) => !!v);
}
export function candidateKey(work) {
    if (!work.title)
        return '';
    const author = work.authors[0], name = author ? author.name || [author.family, author.given].join(' ') : '';
    const norm = (s) => s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
    return [norm(work.title), work.year, norm(name)].join('|');
}
export function readImportInput(value) {
    if (!value || typeof value !== 'object')
        throw new Error('请提供 DOI 列表或 BibTeX 文本。');
    const v = value;
    if (!['doi', 'bibtex'].includes(String(v.kind)))
        throw new Error('输入类型只能是 doi 或 bibtex。');
    if (typeof v.text !== 'string' || !v.text.trim())
        throw new Error('请先粘贴 DOI / BibTeX，或选择 .bib 文件。');
    if (Buffer.byteLength(v.text) > MAX_INPUT_BYTES)
        throw new Error('单次输入不能超过 256 KiB，请拆分导入。');
    const label = typeof v.label === 'string' ? v.label.replace(/^.*[\\/]/, '').trim() : '';
    if (label.length > 160)
        throw new Error('来源名称过长。');
    return { kind: v.kind, text: v.text, label: label || (v.kind === 'doi' ? 'DOI list' : 'BibTeX') };
}
export function citationId(value) {
    if (typeof value !== 'string' || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/.test(value))
        throw new Error('文献、预览或任务编号无效。');
    return value;
}
export function readSelection(value, max = MAX_BATCH) {
    if (!Array.isArray(value) || !value.length || value.length > max)
        throw new Error(`请选择 1–${max} 条文献。`);
    const ids = value.map(citationId);
    if (new Set(ids).size !== ids.length)
        throw new Error('文献选择中不能有重复编号。');
    return ids;
}
export class LibraryConflict extends Error {
    status = 409;
}
