import test from 'node:test'
import assert from 'node:assert/strict'
import { parseCitationInput, buildBibtex, resolveConfig } from '../lib/index.js'
import { lookupDoi, assertDoi } from '../lib/crossref.js'
import { normalizeWork } from '../lib/citation-model.js'

const legacyDoi = '10.1002/(SICI)1097-0258(19980815/30)17:15/16<1661::AID-SIM968>3.0.CO;2-2'
test('BibTeX URL survives export and import with underscores, query parameters, fragment and tilde', async () => {
  const url = 'https://example.org/~li/data_set?x=1&y=2#sec'
  const rows = await parseCitationInput({ kind: 'bibtex', text: '@misc{sample,title={Example},url={' + url + '}}' })
  assert.equal(rows[0].work.url, url)
  const exported = buildBibtex(rows[0].work)
  assert.ok(exported.includes('url={' + url + '}'))
  const imported = await parseCitationInput({ kind: 'bibtex', text: exported })
  assert.equal(imported[0].work.url, url)
})
test('comparison symbols and SICI DOI are preserved in BibTeX and DOI-list imports', async () => {
  const title = 'Effect of x < 5 and y > 3 on z'
  const rows = await parseCitationInput({ kind: 'bibtex', text: '@article{sample,title={' + title + '},doi={' + legacyDoi + '}}' })
  assert.equal(rows[0].error, undefined)
  assert.equal(rows[0].work.title, title)
  assert.equal(rows[0].work.doi, legacyDoi.toLowerCase())
  const list = await parseCitationInput({ kind: 'doi', text: legacyDoi })
  assert.equal(list[0].error, undefined)
  assert.equal(list[0].work.doi, legacyDoi.toLowerCase())
  assert.equal(assertDoi(legacyDoi), legacyDoi)
  assert.equal(normalizeWork({ title: 'Vector<T> and value < limit' }).title, 'Vector<T> and value < limit')
})
test('Crossref JATS formatting is removed at the adapter without deleting mathematical comparisons', async () => {
  const work = await lookupDoi(legacyDoi, resolveConfig({}), async () => new Response(JSON.stringify({ message: {
    DOI: legacyDoi, title: ['<jats:title>Effect of <jats:italic>x</jats:italic> < 5 and y > 3</jats:title>'],
  } })))
  assert.equal(work.title, 'Effect of x < 5 and y > 3')
  assert.equal(work.doi, legacyDoi)
})
