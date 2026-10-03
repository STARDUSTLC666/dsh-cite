import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, writeFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { CitationWorkbench, CitationStore, LibraryConflict, parseCitationInput, resolveConfig, buildBatchTool, buildCitation } from '../lib/index.js'
import { englishCitationError } from '../lib/citation-errors.js'

const root = fileURLToPath(new URL('../.test-data/', import.meta.url))
await mkdir(root, { recursive: true })
const cfg = resolveConfig({ timeoutMs: 2000 })
async function workbench(t, fetcher = async () => { assert.fail('This operation must not contact the network.') }) { const w = new CitationWorkbench(cfg, await mkdtemp(join(root, 'case-')), fetcher); t.after(() => w.dispose()); return w }
async function finish(w, id) { for (let i = 0; i < 250; i++) { const j = w.job(id); if (j.state !== 'running') return j; await new Promise(r => setTimeout(r, 10)) } assert.fail('Enrichment did not settle') }
async function save(w, text, kind = 'doi') { const p = await w.preview({ kind, text, label: 'Original source' }); return w.import(p.id, p.rows.filter(r => r.selectedDefault).map(r => r.index)) }
const payload = (doi, extra = {}) => new Response(JSON.stringify({ message: { DOI: doi, type: 'journal-article', title: ['Provider title'], author: [{ family: 'Smith', given: 'Jane' }], issued: { 'date-parts': [[2024]] }, 'container-title': ['Journal'], publisher: 'Publisher', ...extra } }))

test('BibTeX handles braces, LaTeX, surname particles, organizations and incomplete records offline', async t => {
  const w = await workbench(t), text = String.raw`@string{journal = "Reference Review"}
@article{accent, title={Nested {Braces} and \textit{art}}, author={de la Cruz, Ana and {World Health Organization}}, year={2020}, journal=journal, doi={10.1000/ABC}, note={Keep this unmapped field}}
@misc{partial, title={Only a title}}`
  const p = await w.preview({ kind: 'bibtex', text, label: 'file.bib' })
  assert.equal(p.rows.length, 2); assert.equal(p.rows[0].work.doi, '10.1000/abc')
  assert.match(p.rows[0].work.title, /Braces.*art/); assert.doesNotMatch(p.rows[0].work.title, /<[^>]*>/)
  assert.equal(p.rows[0].work.authors[0].family, 'de la Cruz'); assert.equal(p.rows[0].work.authors[1].name, 'World Health Organization')
  assert.equal(p.rows[0].work.containerTitle, 'Reference Review'); assert.ok(p.rows[1].warnings.includes('missing_authors'))
  await w.import(p.id, [0, 1]); const backup = JSON.parse((await w.export('backup')).content)
  assert.equal(backup.sources[0].text, text); assert.equal(backup.entries.length, 2)
  const bib = (await w.export('bibtex')).content; assert.match(bib, /de la Cruz, Ana/); assert.match(bib, /\{World Health Organization\}/)
})
test('DOI normalization skips exact duplicates and invalid lines without touching the source', async t => {
  const w = await workbench(t), text = '10.1000/ABC\nhttps://doi.org/10.1000/abc\nnot-a-doi'
  const p = await w.preview({ kind: 'doi', text }); assert.equal(p.rows[1].duplicate, 'batch'); assert.equal(p.rows[2].work, null)
  await assert.rejects(w.import(p.id, [1]), /重复/)
  assert.equal((await w.list()).revision, 0)
  const state = await w.import(p.id, [0]); assert.equal(state.entries.length, 1)
  const again = await w.preview({ kind: 'doi', text: 'DOI: 10.1000/ABC' }); assert.equal(again.rows[0].duplicate, 'library'); assert.equal(again.rows[0].selectedDefault, false)
  assert.equal(JSON.parse((await w.export('backup')).content).sources[0].text, text)
})
test('Possible duplicates without DOI require a choice; export keys stay unique and stable', async t => {
  const w = await workbench(t), text = '@misc{same,title={A shared title},author={Li, Ming},year={2023}}\n@misc{same,title={A shared title},author={Li, Ming},year={2023}}'
  const p = await w.preview({ kind: 'bibtex', text }); assert.equal(p.rows[1].candidate, true); assert.equal(p.rows[1].selectedDefault, false)
  const state = await w.import(p.id, [0, 1]); assert.equal(state.entries.length, 2)
  const all = (await w.export('bibtex')).content, keys = [...all.matchAll(/@\w+\{([^,]+),/g)].map(m => m[1]); assert.equal(new Set(keys).size, 2)
  assert.ok((await w.export('bibtex', undefined, undefined, [state.entries[1].id])).content.includes(keys[1]))
})
test('Malformed syntax and bounded inputs never save a partial batch', async t => {
  const w = await workbench(t)
  await assert.rejects(w.preview({ kind: 'bibtex', text: '@article{x,title={unclosed}' }), /解析失败/)
  await assert.rejects(w.preview({ kind: 'bibtex', text: 'https://example.com' }), /没有找到/)
  await assert.rejects(w.preview({ kind: 'doi', text: 'x'.repeat(256 * 1024 + 1) }), /256/)
  await assert.rejects(w.preview({ kind: 'doi', text: Array.from({ length: 101 }, (_, i) => '10.1000/' + i).join('\n') }), /100/)
  assert.equal((await w.list()).entries.length, 0); await assert.rejects(access(w.store.file))
})
test('Two windows cannot overwrite one another when saving the same revision', async t => {
  const a = await workbench(t), b = new CitationWorkbench(cfg, a.store.root), p1 = await a.preview({ kind: 'doi', text: '10.1000/a' }), p2 = await b.preview({ kind: 'doi', text: '10.1000/b' })
  t.after(() => b.dispose())
  const settled = await Promise.allSettled([a.import(p1.id, [0]), b.import(p2.id, [0])]); assert.equal(settled.filter(r => r.status === 'fulfilled').length, 1)
  assert.ok(settled.find(r => r.status === 'rejected').reason instanceof LibraryConflict); assert.equal((await a.list()).entries.length, 1)
})
test('Crossref fills empty fields, keeps local conflicts and allows retry after a 404', async t => {
  let allowMissing = false, active = 0, peak = 0
  const w = await workbench(t, async url => { active++; peak = Math.max(peak, active); await new Promise(r => setTimeout(r, 20)); active--; const doi = decodeURIComponent(url.split('/').at(-1)); if (doi.endsWith('/missing') && !allowMissing) return new Response('', { status: 404 }); return payload(doi) })
  const state = await save(w, '@article{local,title={My corrected title},doi={10.1000/first}}\n@article{later,doi={10.1000/missing}}', 'bibtex')
  const j = await finish(w, (await w.enrich(state.entries.map(e => e.id), state.revision)).id)
  assert.equal(j.state, 'done'); assert.equal(j.saved, 1); assert.equal(j.results.filter(r => !r.ok).length, 1); assert.ok(peak <= 2)
  const after = await w.list(); assert.equal(after.entries[0].work.title, 'My corrected title'); assert.equal(after.entries[0].work.year, 2024)
  assert.ok(after.entries[0].crossref.conflicts.some(c => c.field === 'title')); assert.equal(after.entries[1].work.year, 0)
  allowMissing = true; const retry = await finish(w, (await w.enrich([after.entries[1].id], after.revision)).id); assert.equal(retry.saved, 1); assert.equal((await w.list()).entries[1].work.title, 'Provider title')
})
test('Cancelled enrichment and aborted commits preserve the saved library', async t => {
  let started
  const ready = new Promise(r => { started = r })
  const w = await workbench(t, async (_url, init) => new Promise((_resolve, reject) => { started(); init.signal.addEventListener('abort', () => reject(init.signal.reason), { once: true }) }))
  const state = await save(w, '10.1000/a'), before = await readFile(w.store.file, 'utf8'), j = await w.enrich([state.entries[0].id], state.revision)
  await ready; w.cancel(j.id); assert.equal((await finish(w, j.id)).state, 'cancelled'); assert.equal(await readFile(w.store.file, 'utf8'), before)
  const controller = new AbortController(); await assert.rejects(w.store.edit(state.revision, s => { s.entries[0].work.title = 'Must not persist'; controller.abort() }, controller.signal)); assert.equal(await readFile(w.store.file, 'utf8'), before)
})
test('A library changed during lookup is retained without merging stale results', async t => {
  let release, started
  const ready = new Promise(r => { started = r }), wait = new Promise(r => { release = r })
  const w = await workbench(t, async url => { started(); await wait; return payload(decodeURIComponent(url.split('/').at(-1))) }), state = await save(w, '10.1000/a'), j = await w.enrich([state.entries[0].id], state.revision)
  await ready; await w.store.edit(state.revision, s => { s.entries[0].work.title = 'Edited elsewhere' }); release()
  const result = await finish(w, j.id); assert.equal(result.state, 'failed'); assert.equal(result.conflict, true); assert.equal((await w.list()).entries[0].work.title, 'Edited elsewhere'); assert.equal((await w.list()).entries[0].work.year, 0)
})
test('A mismatching provider DOI is rejected, preserving local metadata', async t => {
  const w = await workbench(t, async () => payload('10.1000/different')), state = await save(w, '10.1000/a'), j = await finish(w, (await w.enrich([state.entries[0].id], state.revision)).id)
  assert.equal(j.saved, 0); assert.match(j.results[0].error, /不匹配/); assert.equal((await w.list()).revision, state.revision)
})
test('Four style exports are offline and full backup always retains every source', async t => {
  const w = await workbench(t), state = await save(w, '@article{one,title={Style example},author={Smith, Jane},year={2024},journal={Reference Review}}', 'bibtex'), contents = []
  for (const style of ['gb-t-7714', 'apa', 'mla', 'chicago']) { const out = await w.export('references', style, 'en'); assert.match(out.content, /Style example/); contents.push(out.content) }
  assert.equal(new Set(contents).size, 4); await assert.rejects(w.export('backup', undefined, undefined, [state.entries[0].id]), /完整备份/)
})
test('Corrupt files are preserved; reads cannot silently reset the library', async t => {
  const w = await workbench(t), broken = '{ unparseable data'
  await writeFile(w.store.file, broken); await assert.rejects(w.list(), /原文件已保留/); assert.equal(await readFile(w.store.file, 'utf8'), broken)
})
test('Carrier origin checks and Desktop origin support guard every mutation', async t => {
  const w = await workbench(t), request = (headers = {}) => new Request('http://dsh.internal/api/dsh-cite/library', { method: 'POST', headers: { 'content-type': 'application/json', 'x-dsh-cite': '1', ...headers }, body: JSON.stringify({ action: 'list' }) })
  assert.equal((await w.fetch(request({ origin: 'https://other.example', 'sec-fetch-site': 'cross-site' }))).status, 403)
  assert.equal((await w.fetch(request({ 'x-dsh-cite': '' }))).status, 403)
  assert.equal((await w.fetch(request({ origin: 'http://127.0.0.1:62041', host: '127.0.0.1:62041', 'sec-fetch-site': 'same-origin' }))).status, 200)
  assert.equal((await w.fetch(request({ origin: 'dsh-app://app', 'sec-fetch-site': 'cross-site' }))).status, 200)
})
test('Tool cancellation before parsing performs no network request or file write', async t => {
  const w = await workbench(t), controller = new AbortController(); controller.abort(new Error('Stop now'))
  await assert.rejects(buildBatchTool(w).execute({ action: 'preview', kind: 'doi', text: '10.1000/a' }, { signal: controller.signal }), /Stop now/)
  await assert.rejects(access(w.store.file)); w.dispose(); await assert.rejects(w.list(), /卸载/)
})
test('Literal authors and compound surnames retain their boundaries in citation text', async () => {
  const rows = await parseCitationInput({ kind: 'bibtex', text: '@report{group,title={Group report},author={{World Health Organization}},year={2024}}\n@article{person,title={Name example},author={de la Cruz, Maria and van der Waals, Johannes},year={2025}}' })
  const institution = rows[0].work, people = rows[1].work
  for (const style of ['gb-t-7714', 'apa', 'mla', 'chicago']) {
    assert.match(buildCitation(institution, style, 'en'), /^World Health Organization/)
    assert.doesNotMatch(buildCitation(institution, style, 'en'), /World, Health/)
  }
  assert.match(buildCitation(people, 'mla', 'en'), /^de la Cruz, Maria, and Johannes van der Waals\./)
  assert.match(buildCitation(people, 'chicago', 'en'), /^Maria de la Cruz, Johannes van der Waals,/)
})
test('English error responses and missing-data placeholders do not change bibliographic content', async t => {
  const w = await workbench(t), p = await w.preview({ kind: 'doi', text: 'Invalid DOI' })
  assert.match(p.rows[0].errorEn, /Invalid DOI/); assert.doesNotMatch(p.rows[0].errorEn, /[\u3400-\u9fff]/)
  const r = await w.fetch(new Request('http://dsh.internal/api/dsh-cite/library', { method: 'POST', headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' }, body: JSON.stringify({ action: 'preview', kind: 'doi', text: '' }) }))
  const data = await r.json(); assert.match(data.message, /粘贴/); assert.match(data.messageEn, /Paste DOI/)
  assert.equal(englishCitationError('此条目没有 DOI，无法从 Crossref 补全。'), 'This entry has no DOI and cannot be enriched through Crossref.')
  const rows = await parseCitationInput({ kind: 'doi', text: '10.1000/a' }), work = rows[0].work
  assert.match(buildCitation(work, 'gb-t-7714', 'en'), /Anonymous.*Untitled/); assert.match(buildCitation(work, 'gb-t-7714', 'zh'), /佚名/); assert.equal(work.title, '')
  const withAuthors = { ...work, title: '原始中文标题', authors: Array.from({ length: 4 }, (_, i) => ({ family: 'Name' + i, given: '', name: '' })) }
  assert.match(buildCitation(withAuthors, 'gb-t-7714', 'en'), /et al\. 原始中文标题/); assert.doesNotMatch(buildCitation(withAuthors, 'gb-t-7714', 'en'), /et al\.\./)
})
