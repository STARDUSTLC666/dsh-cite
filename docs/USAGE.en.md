# dsh-cite usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Current improvements

DOIs with balanced parentheses can be queried directly. Transport or parsing timeouts are explicit, and cancellation stops waiting. Offline library import and external Crossref lookup are verified separately.

## Citation workbench

1. Open **Settings → Cite**. Paste one DOI per line, paste BibTeX, or upload a `.bib` file.
2. Choose **Local preview** and review missing fields and duplicate warnings. Exact DOI duplicates cannot be selected. Possible duplicates without DOIs start unselected; review them before opting in.
3. **Save selected**. Input survives closing settings, but save it before reloading the browser. Uploading does not modify the original file.
4. Select saved entries and explicitly request **Crossref online enrichment**. Only empty fields are filled; existing values stay intact and differences appear under **Metadata and sources**. Select failed entries to retry. Cancelling prevents this job's enrichment from being written.
5. Switch the basic citation style or preview an individual reference in its details. BibTeX / reference downloads include selected entries, or the whole library when none are selected. Full backups always include the whole library and original input.

The UI follows DSH's Chinese / English preference. Bibliographic content stays in its original language and shares one library. The four existing styles are basic templates; check institution, journal and document-type requirements separately.

Limits: 256 KiB / 100 entries per batch, 500 saved entries, five seconds for local parsing. Data lives in `DSH_HOME/data/dsh-cite/library.json`. Revision checks prevent stale previews from overwriting concurrent edits. On a conflict, retain input, refresh and preview again. Invalid library files are preserved rather than silently reset.

Local BibTeX parsing uses Citation.js, including macros, nested braces, literal institutional authors and compound surnames. The workbench maps common fields. Unmapped custom fields remain in the backup's original source text; generated BibTeX is not a verbatim round trip. JSON backups currently provide inspection and preservation, without a one-click restore UI.

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `cite_lookup` | Look up metadata by DOI or bibliographic query | `doi` or `query`; `limit` 1-10, default 5 |
| `cite_format` | Generate a basic formatted citation | `doi`; `style`: gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | Generate a BibTeX entry | `doi`; `key` optional |
| `cite_check` | Extract DOIs from text and validate them | `text`; `maxChecks` 1-50, default 10 |
| `cite_health` | Self-check: probe Crossref connectivity and report latency | none |
| `cite_batch` | Local library shared with the settings page | `action`: list / preview / import / enrich / job / cancel / export |

`preview` accepts `kind: doi / bibtex`, `text` and optional `label`, returning a preview ID and zero-based row indices. `import` accepts that `preview` and a `selection` array. `enrich` accepts saved entry `ids` and the current `revision`, returning a job ID; use `job` / `cancel` to inspect or cancel it. `export` accepts `kind: bibtex / references / backup`, optional `style` / `lang`, and optional entry `ids`; full backups cannot be scoped to a selection.

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

## License

MIT (see [LICENSE](../LICENSE))
