# dsh-cite

[中文](README.md)

Look up DOI metadata and produce citations or BibTeX entries.

[![npm](https://img.shields.io/npm/v/dsh-cite)](https://www.npmjs.com/package/dsh-cite) [![downloads](https://img.shields.io/npm/dm/dsh-cite)](https://www.npmjs.com/package/dsh-cite)

## What it does

- Resolve a DOI or search bibliographic metadata.
- Format GB/T 7714, APA, MLA or Chicago citations.
- Export BibTeX and validate DOIs found in text.

## Install

In DSH Desktop, install `dsh-cite` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-cite
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

Ask: “Format these DOIs as APA references and export BibTeX.”

## Requirements and configuration

Metadata queries use Crossref and require network access. No separate API key is required.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-cite/issues)

## License

[MIT](LICENSE)
