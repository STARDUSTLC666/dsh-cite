[简体中文](README.md) · **English**

# Cite

> **Arrange papers on a Spatial Citation Constellation, verify DOIs via Crossref, resolve metadata diffs in 1 click, and copy or export submission-ready citations.**

Offline-first citation workbench and **6 AI agent tools** for DeepSeek Harness (`>=0.2.2-rc.3`): pairs a pointer-draggable, wheel-zoomable **Spatial Citation Constellation** and **Floating Zettelkasten Card HUD** with a 1-click sortable 3-pane **List** view, **5 citation styles × 14 document types**, and 13 bright themes × 8 fonts (style-matched by default).

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![CI](https://github.com/STARDUSTLC666/dsh-cite/actions/workflows/ci.yml/badge.svg)](https://github.com/STARDUSTLC666/dsh-cite/actions/workflows/ci.yml) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-total-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/STARDUSTLC666/dsh-cite/blob/master/LICENSE)

**[Features](#features) · [Screenshots](#screenshots) · [AI Agent Tools](#ai-agent-tools) · [Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-light.svg" alt="Arrange papers on a Citation Constellation, enrich via Crossref, and export · workflow illustration" width="100%">
</picture>

## Features

| Pillar | Capabilities |
| :--- | :--- |
| **Spatial Citation Constellation** | Deterministic non-overlapping starfield with live curved SVG filaments for shared authors, venues, eras (±2y) & status clusters (with relationship tooltips and density capping so 500-paper libraries stay fast); drag nodes, wheel-zoom, auto-center search matches, or toggle to sortable 3-pane **List** view in 1 click |
| **Zettelkasten Index Card HUD** | Live `GB/T 7714` / `APA` / `IEEE` / `MLA` / `Chicago` preview across 14 academic work types (journal, conference, book, book chapter, dissertation, report, standard, patent, dataset & more), 1-click Copy citation & BibTeX (with `@incollection` / `@proceedings` / `isbn`), Crossref enrich & full atomic metadata editing (with ISBN/language, strict year validation & draft-preserving 409 refresh) |
| **Offline Import Preview & Dedup** | Paste DOIs / BibTeX or **drag-and-drop `.bib` files** into a bounded offline worker to detect library duplicates, batch duplicates, possible title collisions & missing fields; includes **Select all valid / Deselect all** and a 1-click sample starter |
| **Crossref DOI Check & Diff Resolution** | Concurrently verifies up to 50 unique manuscript DOIs; sends valid DOIs straight to Import preview and offers 1-click **Copy failed DOIs** for manuscript fixes; enrichment fills empty fields only and surfaces a diff table with 1-click per-field **Use** resolution |
| **1-Click Copy, Export & Full Backup** | Pre-export missing-field health checks scoped to Entire library or Selected entries, 1-click **Copy all** for formatted references & BibTeX alongside `.txt` / `.bib` downloads, full `.json` backups retaining all unmapped raw sources, and on-demand **Raw source** inspection |
| **6 Agent Tools & Synced Themes** | Registers 6 model tools (with full `cite_batch` `update` / `source` / `remove` atomic parity), 4-step `? Tour` spotlight onboarding, and **13 refreshed bright styles (including Mint, Glass, Aqua Crystal & Mica Fluent) × 8 font pairings** (style-matched by default) |

## Screenshots

[![Spatial Citation Constellation showing draggable paper nodes, live SVG filaments, floating control capsule, and Zettelkasten index card HUD](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/screenshots/library-en.jpg)](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/screenshots/library-en.jpg)

| Import preview and deduplication | DOI check |
| --- | --- |
| [![Import preview flags DOIs already in the library or repeated in the batch](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/screenshots/import-en.jpg)](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/screenshots/import-en.jpg) | [![Crossref lookup results for public DOIs](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/screenshots/doi-check-en.jpg)](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/screenshots/doi-check-en.jpg) |

*Captured with `dsh-cite` Spatial Citation Constellation running in Harness Web `0.2.2-rc.3`.*

## AI Agent Tools

<details open>
<summary>Expand: 6 registered model tools & offline/safety boundaries</summary>

| Tool | Purpose | Network / Boundary |
| :--- | :--- | :--- |
| `cite_lookup` | Exact DOI lookup or bibliographic query against Crossref | Crossref REST API (no API key, 2 MiB bounded stream) |
| `cite_format` | Format `gb-t-7714` / `apa` / `ieee` / `mla` / `chicago` citations by DOI | Crossref REST API, supports `zh` / `en` |
| `cite_bibtex` | Generate sanitized, LaTeX-escaped BibTeX entries by DOI | Crossref REST API, preserves org authors & compound surnames |
| `cite_check` | Extract and validate up to 50 unique DOIs concurrently in order | Read-only; sends extracted DOIs only, never mutates the library |
| `cite_health` | Probe Crossref API reachability and latency | Minimal probe; releases response bodies immediately |
| `cite_batch` | Manage the local library (`list` / `source` / `preview` / `import` / `enrich` / `update` / `remove` / `job` / `cancel` / `export`) | Offline except explicit `enrich`; file-locked with HTTP 409 revision guards |

- **Privacy & resource limits**: Local parsing runs in a bounded worker thread (5s timeout, 64 MiB heap limit); max `256 KiB` / `100` entries per batch, `500` entries / `8 MiB` library file. Never uploads `.bib` files, raw sources, or the full library.

</details>

## Install

Open **Plugins** in the DSH desktop app and install `dsh-cite`, or use the CLI:

```bash
dsh plugin --profile desktop add dsh-cite
```

For the web profile, replace `desktop` with `web` and restart DSH. Requires DSH `>=0.2.2-rc.3` (Node `^22.19.0 || >=24.0.0`).

## Start using it

1. **Check a draft or load a sample**: Open **Reference library**; paste manuscript DOIs into **DOI check** to send valid matches straight to Import preview (and copy failed DOIs in 1 click), or drag-and-drop a `.bib` file / click **Fill sample BibTeX / DOI** in **Import**.
2. **Explore the Constellation**: Drag paper nodes freely, zoom with the mouse wheel, or click `◎` to center the active paper; search or filter from the top-left capsule, or switch to sortable **List** view in 1 click for multi-select batch actions.
3. **Enrich, resolve diffs & edit**: Click a node to spotlight its `✦` neighborhood, then click **Enrich from Crossref**, **Edit metadata** (including ISBN, language & year validation), **Raw source**, or safe **Remove** on the Zettelkasten card. Apply any individual Crossref field diff in 1 click from the List inspector.
4. **Copy & back up**: Switch across 5 citation styles for single-entry copy, or open **Export** to inspect missing fields, click **Copy all** for references / BibTeX, or download `.bib`, `.txt`, and full `.json` source backups.

### Ready-to-copy prompts

- **Verify & import**: `Verify this paper’s DOI and metadata, then import it into my citation library`
- **GB/T 7714 list**: `Read my local citation library (cite_batch list) and format a clean GB/T 7714 bibliography, noting any missing fields.`
- **APA check**: `Read my local citation library (cite_batch list), format the bibliography in APA style, and check year, volume, and page completeness.`
- **Audit manuscript DOIs**: `Use cite_check to verify every DOI in this reference list and flag any invalid or unresolvable entries.`

## Before you start

- Import, deduplication, editing, formatting, and backups all run offline; only explicit Crossref lookup/check/enrichment requests contact Crossref (no API key required).
- Citation templates cover common academic formats across 14 work types; always verify venue-specific rules before final submission.
- Full configuration (`timeoutMs` / `userAgent` / `hideWorkbench`), tool schemas, and troubleshooting: [full reference](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md) and [usage guide](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/USAGE.en.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. Active edits and modals pause installation safely, and Suite-managed components update with their bundle.

## Documentation & feedback

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md) · [Workbench & source guide](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/WORKBENCH.md) · [Release notes](https://github.com/STARDUSTLC666/dsh-cite/blob/master/CHANGELOG.md) · [Validation history](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/VALIDATION.md)
- Stars, [Issues](https://github.com/STARDUSTLC666/dsh-cite/issues), and [PRs](https://github.com/STARDUSTLC666/dsh-cite/pulls) are welcome (strip credentials first).

## License

[MIT](https://github.com/STARDUSTLC666/dsh-cite/blob/master/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
