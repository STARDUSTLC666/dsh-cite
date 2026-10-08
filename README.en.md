# dsh-cite

[中文](README.md)

![dsh-cite whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/assets/cover-whale-girl.png)

Organize DOI lists or BibTeX into a reviewable local library, then export references and BibTeX.

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-cite/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-cite/pulls).

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

Open **Settings → Cite**, paste DOIs or upload a `.bib` file, choose **Local preview**, review the entries and **Save selected**. Select saved entries and explicitly request online enrichment when needed. UI text follows DSH's Chinese / English setting; bibliographic content stays in its original language.

Or ask the agent: “Preview these DOIs locally first. Save the entries I select, then export APA references and BibTeX.”

## Requirements and configuration

Local import, deduplication, library access and formatting work offline. Online enrichment and existing lookup tools query Crossref and require network access, with no separate API key. Limits: 256 KiB / 100 entries per batch, 500 saved entries.

Citation output uses the plugin's basic templates; check institution or journal requirements before submission. BibTeX exports contain mapped fields. The full backup preserves original input containing fields not mapped into the workbench.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-cite/issues)

## License

[MIT](LICENSE)
