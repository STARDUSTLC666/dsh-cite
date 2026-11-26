import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, writeFile, access, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { CitationWorkbench, CitationStore, LibraryConflict, parseCitationInput, resolveConfig, buildBatchTool, buildCitation } from '../lib/index.js'
import { englishCitationError } from '../lib/citation-errors.js'

const root = fileURLToPath(new URL('../.test-data/', import.meta.url))
await mkdir(root, { recursive: true })
const cfg = resolveConfig({ timeoutMs: 2000 })
async function workbench(t, fetcher = async () => { assert.fail('This operation must not contact the network.') }) {
  const dir = await mkdtemp(join(root, 'case-'))
  const w = new CitationWorkbench(cfg, dir, fetcher)
  t.after(async () => {
    w.dispose()
    await rm(dir, { recursive: true, force: true })
  })
  return w
}
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
test('Workbench DOI check uses the guarded browser route and leaves the library untouched', async t => {
  const seen = []
  const w = await workbench(t, async input => {
    const doi = decodeURIComponent(new URL(input).pathname.slice('/works/'.length))
    seen.push(doi)
    return doi === '10.1000/found' ? payload(doi) : new Response(null, { status: 404 })
  })
  const body = JSON.stringify({ action: 'check', text: 'Draft text: 10.1000/found, 10.1000/missing and 10.1000/found.' })
  const send = headers => w.fetch(new Request('http://127.0.0.1/api/dsh-cite/library', {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body,
  }))
  assert.equal((await send({})).status, 403)
  assert.deepEqual(seen, [])
  const response = await send({ 'x-dsh-cite': '1' })
  assert.equal(response.status, 200)
  const { value } = await response.json()
  assert.equal(value.count, 2)
  assert.deepEqual(value.results.map(row => [row.doi, row.ok]), [['10.1000/found', true], ['10.1000/missing', false]])
  assert.equal(value.results[0].title, 'Provider title')
  assert.match(value.results[1].errorEn, /DOI not found in Crossref/)
  assert.deepEqual(seen, ['10.1000/found', '10.1000/missing'])
  assert.equal((await w.list()).revision, 0)
  await assert.rejects(access(w.store.file))
})
test('Tool cancellation before parsing performs no network request or file write', async t => {
  const w = await workbench(t), controller = new AbortController(); controller.abort(new Error('Stop now'))
  await assert.rejects(buildBatchTool(w).execute({ action: 'preview', kind: 'doi', text: '10.1000/a' }, { signal: controller.signal }), /Stop now/)
  await assert.rejects(access(w.store.file)); w.dispose(); await assert.rejects(w.list(), /卸载/)
})
test('Exported records with multiple publisher names can be imported again', async t => {
  const w = await workbench(t), text = '@article{one,title={Export sample},author={Smith, Jane},journal={Reference Review},publisher={Springer Science and Business Media LLC},doi={10.1000/roundtrip},year={2024}}'
  const state = await save(w, text, 'bibtex')
  assert.equal(state.entries[0].work.publisher, 'Springer Science and Business Media LLC')
  const exported = await w.export('bibtex')
  const rows = await parseCitationInput({ kind: 'bibtex', text: exported.content })
  assert.equal(rows.length, 1); assert.equal(rows[0].error, undefined)
  assert.deepEqual(rows[0].work, state.entries[0].work)
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
test('operation: remove deletes by id or citekey atomically, prunes orphaned sources, and allows re-import', async t => {
  const w = await workbench(t), tool = buildBatchTool(w)
  const batch1 = '@article{alpha2024,title={Alpha study},author={Li, Mei},year={2024},doi={10.1000/alpha}}\n@article{beta2025,title={Beta study},author={Chen, Kai},year={2025},doi={10.1000/beta}}'
  const s1 = await save(w, batch1, 'bibtex')
  assert.equal(s1.entries.length, 2); assert.equal(s1.sources.length, 1)

  const r1 = await tool.execute({ operation: 'remove', citekey: '@alpha2024', expectedRevision: s1.revision }, {})
  assert.equal(r1.removed, 1); assert.equal(r1.entries.length, 1); assert.equal(r1.entries[0].bibKey, 'beta2025')
  assert.equal(r1.sources.length, 1, 'source stays while beta2025 still references it')

  const rePreview = await w.preview({ kind: 'doi', text: '10.1000/alpha' })
  assert.equal(rePreview.rows[0].duplicate, undefined, 'removed DOI can be imported again without false library duplicate')

  const r2 = await w.dispatch({ operation: 'remove', id: r1.entries[0].id, expectedRevision: r1.revision })
  assert.equal(r2.removed, 1); assert.equal(r2.entries.length, 0); assert.equal(r2.sources.length, 0, 'orphaned source is pruned once its last entry is removed')
  const persisted = JSON.parse(await readFile(w.store.file, 'utf8'))
  assert.equal(persisted.entries.length, 0); assert.equal(persisted.sources.length, 0); assert.equal(persisted.revision, r2.revision)
})
test('operation: remove guards against stale expectedRevision (HTTP 409) and ambiguous citekeys', async t => {
  const w = await workbench(t)
  const dupText = '@misc{sharedkey,title={First paper},author={Wang, Lin},year={2023}}\n@misc{sharedkey,title={Second paper},author={Zhao, Qi},year={2024}}'
  const state = await save(w, dupText, 'bibtex')
  const beforeDisk = await readFile(w.store.file, 'utf8')

  await assert.rejects(w.dispatch({ operation: 'remove', citekey: 'sharedkey', expectedRevision: state.revision }), /多条文献/)
  await assert.rejects(w.dispatch({ operation: 'remove', id: state.entries[0].id }), /修订号/)

  const staleRes = await w.fetch(new Request('http://dsh.internal/api/dsh-cite/library', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' },
    body: JSON.stringify({ operation: 'remove', id: state.entries[0].id, expectedRevision: state.revision + 9 }),
  }))
  assert.equal(staleRes.status, 409)
  const staleJson = await staleRes.json()
  assert.equal(staleJson.ok, false)
  assert.match(staleJson.message, /另一窗口更新/)
  assert.match(staleJson.messageEn, /nothing was removed/i)
  assert.equal(await readFile(w.store.file, 'utf8'), beforeDisk)
})
test('action: update edits metadata atomically with revision conflict & duplicate DOI checks', async t => {
  const w = await workbench(t)
  const bib = '@article{alpha2024,title={Alpha Paper},author={Smith, Jane},journal={Nature},year={2024},doi={10.1000/alpha}}\n@article{beta2025,title={Beta Paper},author={Chen, Wei},journal={Science},year={2025},doi={10.1000/beta}}'
  const s1 = await save(w, bib, 'bibtex')
  const target = s1.entries[0]

  const updated = await w.dispatch({
    action: 'update',
    id: target.id,
    expectedRevision: s1.revision,
    bibKey: 'alpha2026',
    work: { title: 'Alpha Paper Revised', year: 2026, containerTitle: 'Nature Methods' },
  })
  assert.equal(updated.revision, s1.revision + 1)
  const after = updated.entries.find(e => e.id === target.id)
  assert.equal(after.bibKey, 'alpha2026')
  assert.equal(after.work.title, 'Alpha Paper Revised')
  assert.equal(after.work.year, 2026)
  assert.equal(after.work.containerTitle, 'Nature Methods')
  assert.equal(after.work.doi, '10.1000/alpha')

  // Duplicate DOI check against sibling entry
  await assert.rejects(w.dispatch({
    action: 'update',
    id: target.id,
    expectedRevision: updated.revision,
    work: { doi: '10.1000/beta' },
  }), /该 DOI 已存在于另一条文献/)

  // Stale expectedRevision returns HTTP 409
  const staleRes = await w.fetch(new Request('http://dsh.internal/api/dsh-cite/library', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' },
    body: JSON.stringify({ action: 'update', id: target.id, expectedRevision: s1.revision, work: { title: 'Stale' } }),
  }))
  assert.equal(staleRes.status, 409)
  const staleJson = await staleRes.json()
  assert.match(staleJson.messageEn, /metadata edits were not saved/i)
})
test('action: source fetches raw import text on demand while summary() omits text', async t => {
  const w = await workbench(t)
  const bib = '@article{raw2026,title={Raw Source Verification},author={Lin, Wei},year={2026},doi={10.1000/raw2026}}'
  const s1 = await save(w, bib, 'bibtex')
  const s2 = await save(w, '10.1000/raw-doi', 'doi')
  const listed = await w.list()
  assert.equal(listed.sources.length, 2)
  assert.equal(listed.sources[0].text, undefined, 'summary() must stay lightweight and omit source.text')
  assert.equal(listed.sources[1].text, undefined)

  const singleRes = await w.fetch(new Request('http://dsh.internal/api/dsh-cite/library', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' },
    body: JSON.stringify({ action: 'source', id: s1.sources[0].id }),
  }))
  assert.equal(singleRes.status, 200)
  const singleJson = await singleRes.json()
  assert.equal(singleJson.ok, true)
  assert.equal(singleJson.value.source.id, s1.sources[0].id)
  assert.equal(singleJson.value.source.text, bib)
  assert.equal(singleJson.value.sources.length, 1)

  const multi = await w.dispatch({ action: 'source', ids: [s1.sources[0].id, s2.sources[1].id] })
  assert.equal(multi.sources.length, 2)
  assert.equal(multi.sources[0].text, bib)
  assert.equal(multi.sources[1].text, '10.1000/raw-doi')

  const missingRes = await w.fetch(new Request('http://dsh.internal/api/dsh-cite/library', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-dsh-cite': '1' },
    body: JSON.stringify({ action: 'source', id: '00000000-0000-4000-8000-000000000000' }),
  }))
  assert.equal(missingRes.status, 400)
  const missingJson = await missingRes.json()
  assert.equal(missingJson.ok, false)
  assert.match(missingJson.messageEn, /original source is no longer available/i)
})

test('cite_batch schema exposes update and source actions and executes them end-to-end', async t => {
  const w = await workbench(t), tool = buildBatchTool(w)
  assert.ok(tool.parameters.properties.action.enum.includes('update'))
  assert.ok(tool.parameters.properties.action.enum.includes('source'))
  assert.ok(tool.parameters.properties.operation.enum.includes('update'))
  assert.ok(tool.parameters.properties.operation.enum.includes('source'))
  assert.ok(tool.parameters.properties.work)
  assert.ok(tool.parameters.properties.bibKey)

  const bib = '@article{k2024,title={Original},author={Lin, Wei},year={2024},doi={10.1000/tool-test}}'
  const s1 = await save(w, bib, 'bibtex')
  const updated = await tool.execute({
    action: 'update',
    id: s1.entries[0].id,
    expectedRevision: s1.revision,
    bibKey: 'k2026',
    work: { title: 'Updated via tool', isbn: '978-0-12-345678-9' },
  }, {})
  assert.equal(updated.entries[0].bibKey, 'k2026')
  assert.equal(updated.entries[0].work.title, 'Updated via tool')
  assert.equal(updated.entries[0].work.isbn, '978-0-12-345678-9')

  const fetchedSource = await tool.execute({ action: 'source', sourceId: s1.sources[0].id }, {})
  assert.equal(fetchedSource.source.text, bib)
})

test('action: update prunes resolved Crossref conflicts and clears stale crossref metadata when DOI changes', async t => {
  const w = await workbench(t, async url => payload(decodeURIComponent(url.split('/').at(-1))))
  const s1 = await save(w, '@article{local,title={Local Title},publisher={Local Pub},doi={10.1000/conf}}', 'bibtex')
  const j = await finish(w, (await w.enrich([s1.entries[0].id], s1.revision)).id)
  assert.equal(j.state, 'done')
  const enriched = await w.list()
  assert.equal(enriched.entries[0].crossref.conflicts.length, 2)

  // Accepting Crossref's title removes only the title conflict and keeps publisher conflict
  const afterTitle = await w.dispatch({
    action: 'update',
    id: enriched.entries[0].id,
    expectedRevision: enriched.revision,
    work: { title: 'Provider title' },
  })
  assert.equal(afterTitle.entries[0].crossref.conflicts.length, 1)
  assert.equal(afterTitle.entries[0].crossref.conflicts[0].field, 'publisher')

  // Updating publisher to a different local value updates conflict.local
  const afterPub = await w.dispatch({
    action: 'update',
    id: enriched.entries[0].id,
    expectedRevision: afterTitle.revision,
    work: { publisher: 'Edited Local Pub' },
  })
  assert.equal(afterPub.entries[0].crossref.conflicts[0].local, 'Edited Local Pub')

  // Changing DOI clears stale crossref record
  const afterDoi = await w.dispatch({
    action: 'update',
    id: enriched.entries[0].id,
    expectedRevision: afterPub.revision,
    work: { doi: '10.1000/different-doi' },
  })
  assert.equal(afterDoi.entries[0].crossref, undefined)
})

test('englishCitationError translates duplicate-DOI metadata edits and security/limit errors accurately', async t => {
  assert.equal(englishCitationError('该 DOI 已存在于另一条文献中。'), 'Another reference in the library already uses this DOI.')
  assert.match(englishCitationError('文献库文件在读取期间已更换，原文件已保留。'), /changed while being read/i)
  assert.match(englishCitationError('文献库目录不能是符号链接。'), /symbolic link/i)
  assert.match(englishCitationError('Crossref 响应超过 2 MiB 大小上限，请缩小查询范围。'), /2 MiB/i)
  assert.match(englishCitationError('作者列表无效或超过 2000 人。'), /2000/)
  assert.match(englishCitationError('单个文献字段过长，请拆分或检查原始数据。'), /too long/i)
  assert.match(englishCitationError('来源名称过长。'), /160/)
  assert.match(englishCitationError('文献、预览或任务编号无效。'), /Invalid reference, preview, or job ID/i)

  const w = await workbench(t)
  const p = await w.preview({ kind: 'doi', text: 'https://doi.org/10.1038/nature14539\nDOI: 10.1145/3368089.3409749\nnot-a-doi' })
  assert.equal(p.rows[0].key, '10.1038/nature14539')
  assert.equal(p.rows[1].key, '10.1145/3368089.3409749')
  assert.equal(p.rows[2].key, 'not-a-doi')
})
