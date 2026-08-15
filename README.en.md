# dsh-cite

> Give it a DOI, get a proper citation — GB/T 7714 / APA / MLA / Chicago / BibTeX.

A DeepSeek Harness plugin for bibliographic references: query Crossref and format citations. Four tools, zero runtime dependencies.

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `cite_lookup` | Look up metadata by DOI or bibliographic query | `doi` or `query`; `limit` 1-10, default 5 |
| `cite_format` | Generate a formatted citation | `doi`; `style`: gb-t-7714 / apa / mla / chicago |
| `cite_bibtex` | Generate a BibTeX entry | `doi`; `key` optional |
| `cite_check` | Extract DOIs from text and validate them | `text`; `maxChecks` 1-50, default 10 |

## Install

```bash
dsh plugin --profile web add dsh-cite
```

MIT
