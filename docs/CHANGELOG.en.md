# Historical release notes

[Current changelog](../CHANGELOG.md) · [Overview](../README.en.md)

These English notes preserve the earlier translations. The main changelog contains the consolidated version history.

## 0.3.4 (2026-09-27)

Preserves given/family name boundaries and compound surnames in BibTeX. Corporate authors are protected with braces instead of being parsed as personal names.

Validation host: Harness `0.2.0-rc.1` built from official sources (commit `407e65c8`) with Node `24.16.0` on 2026-09-28. All 25 plugin tests pass in an isolated environment; all 18 plugins mount together in one host registering 5 tools, with tool schemas and health-check contracts passing. No live ports or external services were exercised in this round.
