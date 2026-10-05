# Historical release notes

[Current changelog](../CHANGELOG.md) · [Overview](../README.en.md)

These English notes preserve the earlier translations. The main changelog contains the consolidated version history.

## 0.4.2 (2026-10-05)

- Preserve balanced parentheses inside DOIs while removing surrounding prose punctuation. Crossref response parsing respects cancellation and timeouts.

## 0.4.1 (2026-10-03)

Fixes re-importing exported BibTeX containing publisher lists. Publisher names and original sources remain intact. All 41 Windows tests and re-importing the actual browser download pass.

## 0.4.0 (2026-10-03)

Adds a Chinese / English citation workbench and `cite_batch` for offline DOI / BibTeX preview, selective import, duplicate review, search and basic citation exports. Explicit Crossref enrichment fills empty fields, retains local differences and supports progress, cancellation and retry. Original input is preserved in full backups; revision checks protect concurrent changes. The existing five tools remain available.

Official RC2 / alpha SDK checks, Windows tests and visible browser flows pass. Native desktop interaction with this new workbench remains unverified; see the [validation record](VALIDATION.md).

## 0.3.4 (2026-09-27)

Preserves given/family name boundaries and compound surnames in BibTeX. Corporate authors are protected with braces instead of being parsed as personal names.

Validation host: Harness `0.2.0-rc.1` built from official sources (commit `407e65c8`) with Node `24.16.0` on 2026-09-28. All 25 plugin tests pass in an isolated environment; all 18 plugins mount together in one host registering 5 tools, with tool schemas and health-check contracts passing. No live ports or external services were exercised in this round.
