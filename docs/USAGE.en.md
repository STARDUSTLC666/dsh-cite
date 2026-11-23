# dsh-cite usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Identifier fidelity

BibTeX import/export retains URLs and DOIs. Mathematical comparisons are not treated as arbitrary HTML. Known Crossref JATS formatting is handled separately from raw identifiers.

## Current improvements

DOIs with balanced parentheses can be queried directly. Transport or parsing timeouts are explicit, and cancellation stops waiting. Offline library import and external Crossref lookup are verified separately.

## Citation workbench

1. Open **Reference library** in the sidebar (or **Settings → Cite**) to land on the default **Spatial Citation Constellation** canvas; switch between **Constellation** and the classic 3-pane **List** view anytime via the topbar or floating capsule toggle.
2. Open **Import** to paste DOIs, paste BibTeX, upload a `.bib` file, or click **Fill sample BibTeX / DOI**. Choose **Local preview** to review duplicates and missing fields offline, then **Save selected**. Uploading does not modify the original file.
3. On the **Spatial Citation Constellation**, drag any orbital node freely across the dot-matrix starfield while curved SVG filaments track shared authors, venues, eras (±2y), and Crossref clusters in real time. Use the top-left **Floating Control Capsule** to switch citation styles (`GB/T 7714`, `APA`, `IEEE`, `MLA`, `Chicago`), highlight search matches, or filter by metadata status.
4. Click any node to spotlight its `✦` neighborhood, then use the bottom-right **Floating Zettelkasten Card** for 1-click **Copy citation**, **Copy BibTeX**, **Enrich from Crossref** (fills empty fields only and surfaces conflicts), **Edit metadata** (atomic revision-checked updates with duplicate-DOI guards), **Raw source**, or **Remove**. Switch to **List** view whenever you want multi-select batch enrichment or removal.
5. Open **Export** to inspect pre-export checks (entire library vs. selected entries, missing title/author/year counts) and download BibTeX, formatted references, or a full JSON backup with original sources.

The UI follows DSH's Chinese / English preference. Bibliographic content stays in its original language and shares one library. The five built-in styles (`GB/T 7714`, `APA`, `IEEE`, `MLA`, `Chicago`) are basic templates; check institution, journal and document-type requirements separately.

Limits: 256 KiB / 100 entries per batch, 500 saved entries, five seconds for local parsing. Data lives in `DSH_HOME/data/dsh-cite/library.json`. Revision checks prevent stale previews from overwriting concurrent edits. On a conflict, retain input, refresh and preview again. Invalid library files are preserved rather than silently reset.

Local BibTeX parsing uses Citation.js, including macros, nested braces, literal institutional authors and compound surnames. The workbench maps common fields. Unmapped custom fields remain in the backup's original source text; generated BibTeX is not a verbatim round trip. JSON backups currently provide inspection and preservation, without a one-click restore UI.

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `cite_lookup` | Look up metadata by DOI or bibliographic query | `doi` or `query`; `limit` 1-10, default 5 |
| `cite_format` | Generate a basic formatted citation | `doi`; `style`: gb-t-7714 / apa / ieee / mla / chicago |
| `cite_bibtex` | Generate a BibTeX entry | `doi`; `key` optional |
| `cite_check` | Extract DOIs from text and validate them | `text`; `maxChecks` 1-50, default 10 |
| `cite_health` | Self-check: probe Crossref connectivity and report latency | none |
| `cite_batch` | Local library shared with the settings page | `action` (or `operation`): list / preview / import / enrich / remove / job / cancel / export |

`preview` accepts `kind: doi / bibtex`, `text` and optional `label`, returning a preview ID and zero-based row indices. `import` accepts that `preview` and a `selection` array. `enrich` accepts saved entry `ids` and the current `revision`, returning a job ID; use `job` / `cancel` to inspect or cancel it. `remove` deletes entries atomically by `id`, unique `citekey`, or `ids` with `expectedRevision` conflict protection. `export` accepts `kind: bibtex / references / backup`, optional `style` / `lang`, and optional entry `ids`; full backups cannot be scoped to a selection.

## Network and data

Import, deduplication, formatting and backups work offline. Explicit enrichment sends selected DOIs to Crossref. Existing lookup, search and health tools also contact Crossref. The plugin does not upload BibTeX files, original source text or the entire library. No separate API key is needed.

No VPN or proxy is required by the plugin. Online queries depend on whether your network can reach Crossref; failures preserve saved data and can be retried later. The plugin and its new Citation.js / proper-lockfile dependencies are MIT licensed.

## Install

```bash
dsh plugin --profile web add dsh-cite
```

## Uninstall

```bash
dsh plugin --profile web remove dsh-cite
```

Then restart the web service. To clean up fully, also remove the plugin entry from your profile `cordis.patch.yml` if you overrode it.

## Configuration

```yaml
- id: cite
  name: 'dsh-cite'
  config:
    timeoutMs: 15000      # Crossref request timeout in ms (default 15000; or DSH_CITE_TIMEOUT_MS)
    # userAgent: ''       # Custom User-Agent (contact email recommended; or DSH_CITE_USER_AGENT)
    hideWorkbench: false  # Set to true to hide the sidebar Reference library entry (keeps Settings & tools)
```

## License

MIT (see [LICENSE](../LICENSE))
