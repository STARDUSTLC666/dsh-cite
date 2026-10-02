# dsh-cite usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `cite_lookup` | Look up metadata by DOI or bibliographic query | `doi` or `query`; `limit` 1-10, default 5 |
| `cite_format` | Generate a formatted citation | `doi`; `style`: gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | Generate a BibTeX entry | `doi`; `key` optional |
| `cite_check` | Extract DOIs from text and validate them | `text`; `maxChecks` 1-50, default 10 |
| `cite_health` | Self-check: probe Crossref connectivity and report latency | none |

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
