# dsh-cite

## 0.3.4 update (2026-09-27)

Preserves given/family name boundaries and compound surnames in BibTeX. Corporate authors are protected with braces instead of being parsed as personal names.

Validation host: Harness 0.1.7-rc.2 built from official sources, retaining the local tool-scheduler fix. Build and automated checks pass; interactive coverage and external-service limits are recorded in this release round.

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

Verified with official `@deepseek-ai/dsh@0.1.5-rc.1` and Node `24.16.0` on 2026-09-11: all 18 components load alongside Modlens, with passing tool-schema, skill-registration and offline read-only invocation checks. Uses the `cordis.patch.yml` + `dsh.bundle.patch` bundle model. Node requirements match this Harness release: 22.19 or later within 22.x, or 24 or later. Live external-service workflows require separate configuration and validation.

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
