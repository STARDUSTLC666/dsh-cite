[简体中文](README.md) · **English**

# Cite

**Turn scattered DOIs and BibTeX into a reference library.**

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-downloads.svg)](https://www.npmjs.com/package/dsh-cite) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-cite-total-downloads.svg)](https://www.npmjs.com/package/dsh-cite)

**[Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-cite/master/docs/assets/intro/workflow-en-light.svg" alt="Turn scattered DOIs and BibTeX into a reference library. · workflow illustration" width="100%">
</picture>

## Features

- Inspect duplicates and missing fields before saving.
- Explicitly enrich through Crossref and inspect differences.
- Export reference text, BibTeX or a full backup with sources.

## Install

Open **Plugins** in the DSH desktop app and install `dsh-cite`. If the CLI is available:

```bash
dsh plugin --profile desktop add dsh-cite
```

For the web profile, replace `desktop` with `web`. Restart that DSH profile after installation. The package’s DSH requirement is `>=0.2.1-rc.3`.

## Start using it

1. Open Citations in the sidebar and prepare DOI entries or a BibTeX file.
2. Preview the import locally; inspect entries, duplicates and fields before saving selected references.
3. Select entries and explicitly request Crossref enrichment when needed, then review the returned fields.
4. Select references, export a bibliography or BibTeX, and download a library backup when needed.

Example request：

> Look up these DOI records and highlight fields I should verify.

## Before you start

Enrichment requires Crossref access; verify bibliographic fields and citation formatting before delivery.

Configuration, detailed tools and troubleshooting: [full reference](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. You choose whether to install and when to restart. Suite-managed components update with their bundle. [Update behavior](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md).

## Documentation

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/REFERENCE.en.md)
- [Release notes](https://github.com/STARDUSTLC666/dsh-cite/blob/master/CHANGELOG.md)
- [Validation scope and history](https://github.com/STARDUSTLC666/dsh-cite/blob/master/docs/VALIDATION.md)

## Feedback and contributions

If the plugin helps, a Star makes it easier for others to discover. Report problems or suggest improvements in [Issues](https://github.com/STARDUSTLC666/dsh-cite/issues); code and documentation [PRs](https://github.com/STARDUSTLC666/dsh-cite/pulls) are welcome. Include versions and reproduction steps, and remove credentials from reports.

## License

[MIT](https://github.com/STARDUSTLC666/dsh-cite/blob/master/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
