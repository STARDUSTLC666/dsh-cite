> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-cite

[中文](../README.md)

![dsh-cite whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/assets/cover-whale-girl.png)

Turn DOI lists or BibTeX into a reviewable local library. Preview imports, remove duplicates, enrich metadata with Crossref and export citations or BibTeX, retaining original sources for verification.

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-total-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-cite/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-cite/pulls).

Open the workbench from the native DSH sidebar. See the [workbench guide](WORKBENCH.md) for configuration and operating boundaries.

## What it does

- Paste DOI lists or upload `.bib` files. Preview locally before choosing entries to save, with duplicate and missing-field warnings.
- Explicitly enrich empty fields through Crossref. Keep existing values, inspect differences and retry failed entries.
- Switch between basic GB/T 7714, APA, MLA and Chicago formats; download BibTeX, reference text or a full backup with original sources.
- Existing DOI lookup, bibliographic search and DOI-checking tools remain available.

## Install

In DSH Desktop, install `dsh-cite` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-cite
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

1. Open Citations in the sidebar and prepare DOI entries or a BibTeX file.
2. Preview the import locally; inspect entries, duplicates and fields before saving selected references.
3. Select entries and explicitly request Crossref enrichment when needed, then review the returned fields.
4. Select references, export a bibliography or BibTeX, and download a library backup when needed.

## Requirements and configuration

Local import, deduplication, library access and formatting work offline. Online enrichment and existing lookup tools query Crossref and require network access, with no separate API key. Limits: 256 KiB / 100 entries per batch, 500 saved entries.

Citation output uses the plugin's basic templates; check institution or journal requirements before submission. BibTeX exports contain mapped fields. The full backup preserves original input containing fields not mapped into the workbench.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-cite/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE)
