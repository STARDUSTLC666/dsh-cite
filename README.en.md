# dsh-cite

## 0.3.5 update (2026-09-27)

Preserves given/family name boundaries and compound surnames in BibTeX. Corporate authors are protected with braces instead of being parsed as personal names.

Validation host: Harness `0.2.0-rc.1` built from official sources (commit `407e65c8`) with Node `24.16.0` on 2026-09-28. All 25 plugin tests pass in an isolated environment; all 18 plugins mount together in one host registering 5 tools, with tool schemas and health-check contracts passing. No live ports or external services were exercised in this round.

![npm](https://img.shields.io/npm/v/dsh-cite) ![downloads](https://img.shields.io/npm/dm/dsh-cite) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-cite) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-cite?style=social)

> Give it a DOI, get a proper citation — GB/T 7714 / APA / MLA / Chicago / BibTeX.

A DeepSeek Harness plugin for bibliographic references: query Crossref and format citations. Five tools (including the `cite_health` self-check), zero runtime dependencies.

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `cite_lookup` | Look up metadata by DOI or bibliographic query | `doi` or `query`; `limit` 1-10, default 5 |
| `cite_format` | Generate a formatted citation | `doi`; `style`: gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | Generate a BibTeX entry | `doi`; `key` optional |
| `cite_check` | Extract DOIs from text and validate them | `text`; `maxChecks` 1-50, default 10 |
| `cite_health` | Self-check: probe Crossref connectivity and report latency | none |

## Compatibility

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

MIT (see [LICENSE](LICENSE))
