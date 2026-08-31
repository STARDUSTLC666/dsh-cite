# dsh-cite

![npm](https://img.shields.io/npm/v/dsh-cite) ![downloads](https://img.shields.io/npm/dm/dsh-cite) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-cite) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-cite?style=social)

> Give it a DOI, get a proper citation — GB/T 7714 / APA / MLA / Chicago / BibTeX.

A DeepSeek Harness plugin for bibliographic references: query Crossref and format citations. Four tools, zero runtime dependencies.

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `cite_lookup` | Look up metadata by DOI or bibliographic query | `doi` or `query`; `limit` 1-10, default 5 |
| `cite_format` | Generate a formatted citation | `doi`; `style`: gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | Generate a BibTeX entry | `doi`; `key` optional |
| `cite_check` | Extract DOIs from text and validate them | `text`; `maxChecks` 1-50, default 10 |

## Compatibility

Verified against `@deepseek-ai/dsh@0.1.2-alpha.2` on 2026-08-31. Built for the cordis patch-bundle plugin model (`cordis.patch.yml` + `dsh.bundle.patch`). No runtime imports of `@deepseek-ai/*` internals.

## Install

```bash
dsh plugin --profile web add dsh-cite
```

MIT

## Uninstall

```bash
dsh plugin --profile web remove dsh-cite
```

Then restart the web service. To clean up fully, also remove the plugin entry from your profile `cordis.patch.yml` if you overrode it.

## License

MIT (see [LICENSE](LICENSE))
