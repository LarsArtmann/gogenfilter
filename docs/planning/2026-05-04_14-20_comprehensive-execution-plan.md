# Comprehensive Execution Plan — gogenfilter

**Date:** 2026-05-04 14:20 CEST
**Scope:** All remaining work — commits, tests, lint, docs, website, BDD coverage
**Rule:** Every task ≤ 12 min. Sorted by Impact × Customer Value ÷ Effort.

---

## Current State

| Metric                 | Value                                   |
| ---------------------- | --------------------------------------- |
| BDD specs              | 110 passing                             |
| Coverage               | 95.9%                                   |
| Lint                   | 0 issues                                |
| Race detector          | clean                                   |
| Unstaged files         | 21 (API refactor from previous session) |
| Committed this session | 1 (d4afae8 — BDD suite)                 |
| Coverage gaps          | 12 functions < 100%                     |
| Test files             | 23 total, 2 use ginkgo                  |

---

## TASK TABLE (Sorted by Impact × Customer Value ÷ Effort)

| #   | Task                                                                              | Category    | Est. | Impact | Value | Effort | Depends |
| --- | --------------------------------------------------------------------------------- | ----------- | ---- | ------ | ----- | ------ | ------- |
| 1   | Commit unstaged website/API-refactor changes                                      | commit      | 5m   | HIGH   | HIGH  | LOW    | —       |
| 2   | Run website build + typecheck after lint --fix                                    | verify      | 5m   | HIGH   | HIGH  | LOW    | #1      |
| 3   | Update status report with lint fixes                                              | docs        | 3m   | MED    | LOW   | LOW    | #1      |
| 4   | Commit lint fixes (filter.go exhaustruct restructure)                             | commit      | 3m   | MED    | MED   | LOW    | —       |
| 5   | Add BDD test: `NewFilter` nil guard behavior                                      | bdd         | 8m   | HIGH   | HIGH  | LOW    | —       |
| 6   | Add BDD test: `detectReasonFromMap` multi-option priority                         | bdd         | 10m  | HIGH   | HIGH  | MED    | —       |
| 7   | Add BDD test: `MatchPattern` error-return path (invalid pattern)                  | bdd         | 6m   | MED    | MED   | LOW    | —       |
| 8   | Add BDD test: `FindProjectRoot` positive case                                     | bdd         | 8m   | MED    | MED   | LOW    | —       |
| 9   | Add BDD test: `FilterConfigError.Error()` with Cause                              | bdd         | 5m   | MED    | LOW   | LOW    | —       |
| 10  | Add BDD test: `FilterConfigError.Unwrap()`                                        | bdd         | 5m   | MED    | LOW   | LOW    | —       |
| 11  | Add BDD test: `SQLCConfigError.Error()` without ConfigPath                        | bdd         | 5m   | MED    | LOW   | LOW    | —       |
| 12  | Add BDD test: `FilterString()` with includes/excludes                             | bdd         | 6m   | MED    | MED   | LOW    | —       |
| 13  | Add BDD test: `Filter` concurrent usage (thread safety)                           | bdd         | 10m  | HIGH   | MED   | MED    | —       |
| 14  | Add BDD test: SQLC v2 config parse (valid YAML)                                   | bdd         | 10m  | HIGH   | HIGH  | MED    | —       |
| 15  | Add BDD test: SQLC v1→v2 config conversion                                        | bdd         | 12m  | HIGH   | HIGH  | MED    | —       |
| 16  | Add BDD test: SQLC invalid YAML → SQLCConfigError                                 | bdd         | 8m   | MED    | MED   | LOW    | —       |
| 17  | Add BDD test: `GetSQLOutputDirs` extracts Go output dirs                          | bdd         | 12m  | MED    | MED   | MED    | —       |
| 18  | Add BDD test: `Filter` with both include AND exclude patterns                     | bdd         | 8m   | MED    | MED   | LOW    | —       |
| 19  | Add BDD test: `Filter` with multiple exclude patterns                             | bdd         | 6m   | MED    | MED   | LOW    | —       |
| 20  | Add BDD test: `IsSQLCGenerated` with `.sql.go` suffix only (no content)           | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 21  | Add BDD test: `FilterReason.IsValid()` for all reasons                            | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 22  | Add BDD test: `errors.As` on `SQLCConfigError`                                    | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 23  | Add BDD test: `ProjectRootError.Help()` returns non-empty                         | bdd         | 3m   | LOW    | LOW   | LOW    | —       |
| 24  | Add BDD test: disabled filter `String()` = "Filter(disabled)"                     | bdd         | 3m   | LOW    | LOW   | LOW    | —       |
| 25  | Migrate `filter_edge_test.go` cases to BDD format                                 | bdd         | 12m  | MED    | MED   | MED    | —       |
| 26  | Migrate `filter_concurrent_test.go` to BDD format                                 | bdd         | 10m  | MED    | MED   | MED    | —       |
| 27  | Fix indentation inconsistency in quick-start.mdx code blocks                      | fix         | 8m   | MED    | MED   | LOW    | —       |
| 28  | Fix indentation in HeroSection.astro (tabs vs spaces)                             | fix         | 5m   | LOW    | LOW   | LOW    | —       |
| 29  | Add `//nolint:exhaustruct` to `SQLCConfigError` in errors_test.go                 | lint        | 3m   | LOW    | LOW   | LOW    | —       |
| 30  | Run `go test -race -count=1 -coverprofile` and verify ≥95%                        | verify      | 3m   | HIGH   | MED   | LOW    | #5-26   |
| 31  | Run `golangci-lint run ./...` and verify 0 issues                                 | verify      | 3m   | HIGH   | MED   | LOW    | #29     |
| 32  | Run website `npm run build` and verify clean build                                | verify      | 5m   | HIGH   | MED   | LOW    | #2, #27 |
| 33  | Run website `npx astro check` typecheck                                           | verify      | 5m   | HIGH   | MED   | LOW    | #32     |
| 34  | Run website `npx html-validate 'dist/**/*.html'`                                  | verify      | 5m   | MED    | MED   | LOW    | #32     |
| 35  | Update AGENTS.md with BDD test patterns found                                     | docs        | 10m  | MED    | MED   | MED    | #5      |
| 36  | Update TODO_LIST.md — mark BDD as complete                                        | docs        | 3m   | LOW    | LOW   | LOW    | —       |
| 37  | Update FEATURES.md — note BDD test coverage                                       | docs        | 5m   | LOW    | LOW   | LOW    | —       |
| 38  | Check if `ExampleAllErrorCodes` runs in CI (the "why 7 vs 8" question)            | investigate | 8m   | MED    | MED   | MED    | —       |
| 39  | Add BDD test: `GetStats()` after filter disabled (edge case)                      | bdd         | 3m   | LOW    | LOW   | LOW    | —       |
| 40  | Add BDD test: `FilteredFiles()` returns defensive copy                            | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 41  | Add BDD test: `DetectReason` with no options enabled → always NotFiltered         | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 42  | Add BDD test: `WithIncludePatterns` + `WithFilterOptions` → enabled               | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 43  | Add BDD test: `WithExcludePatterns` alone → enabled                               | bdd         | 3m   | LOW    | LOW   | LOW    | —       |
| 44  | Increase `detectReasonFromMap` coverage to ≥95%                                   | coverage    | 12m  | MED    | MED   | MED    | #6      |
| 45  | Increase `NewFilter` coverage to ≥90%                                             | coverage    | 10m  | MED    | MED   | MED    | #5      |
| 46  | Increase `FindProjectRoot` coverage to ≥98%                                       | coverage    | 10m  | LOW    | MED   | MED    | #8      |
| 47  | Increase `MatchPattern` coverage to ≥95%                                          | coverage    | 8m   | LOW    | LOW   | LOW    | #7      |
| 48  | Add BDD test: `IsTemplGenerated` filename + content combo                         | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 49  | Add BDD test: `IsProtobufGenerated` `.pb.go` without content marker → NotFiltered | bdd         | 5m   | LOW    | LOW   | LOW    | —       |
| 50  | Final full verification: lint + test + coverage + build                           | verify      | 8m   | HIGH   | HIGH  | LOW    | ALL     |

---

## DEPENDENCY GRAPH (critical path)

```
Phase 1 — Commit & Verify (15 min)
  #1 → #2 → #3
  #4

Phase 2 — BDD Tests — Core (50 min)
  #5 → #6 → #7 → #8
  #9, #10, #11 → parallel
  #12 → #18, #19
  #13 → #25, #26

Phase 3 — BDD Tests — SQLC (30 min)
  #14 → #15 → #16 → #17

Phase 4 — BDD Tests — Polish (20 min)
  #20, #21, #22, #23, #24, #39, #40, #41, #42, #43
  #27, #28, #29

Phase 5 — Coverage Push (30 min)
  #44, #45, #46, #47

Phase 6 — Docs & Verification (30 min)
  #30, #31, #32, #33, #34
  #35, #36, #37, #38
  #50
```

---

## ESTIMATED TOTAL

| Phase                        | Duration     | Tasks        |
| ---------------------------- | ------------ | ------------ |
| Phase 1: Commit & Verify     | 15 min       | 4            |
| Phase 2: BDD Core            | 50 min       | 12           |
| Phase 3: BDD SQLC            | 30 min       | 4            |
| Phase 4: BDD Polish          | 20 min       | 12           |
| Phase 5: Coverage Push       | 30 min       | 4            |
| Phase 6: Docs & Verification | 30 min       | 9            |
| **TOTAL**                    | **~175 min** | **50 tasks** |

---

## COVERAGE GAPS (functions < 100%)

| Function                               | Current | Target | Task |
| -------------------------------------- | ------- | ------ | ---- |
| `FilterConfigError.Error()` (w/ Cause) | 0%      | 100%   | #9   |
| `FilterConfigError.Unwrap()`           | 0%      | 100%   | #10  |
| `FilterConfigError.Is()`               | 75%     | 100%   | #10  |
| `NewFilter` (nil config path)          | 76.9%   | 90%    | #5   |
| `detectReasonFromMap`                  | 83.3%   | 95%    | #6   |
| `GetSQLOutputDirs`                     | 80%     | 90%    | #17  |
| `FindSQLCConfigsFS`                    | 81.8%   | 90%    | —    |
| `parseV1AsV2`                          | 88.9%   | 95%    | #15  |
| `unmarshalSQLCConfig`                  | 91.7%   | 95%    | #16  |
| `GetSQLOutputDirsFS`                   | 90%     | 95%    | —    |
| `FindProjectRoot`                      | 92.9%   | 98%    | #8   |
| `MatchPattern`                         | 92.3%   | 95%    | #7   |

---

## NOTES

- Tasks are atomic — each can be started and completed within 12 min
- "Impact" = how much it improves library quality / user trust
- "Value" = how much a customer cares about this working
- "Effort" = wall-clock time for one focused engineer
- Phase order should be respected (don't BDD before committing)
- Unstaged changes include lint `--fix` auto-formatting from the previous session — they're safe to commit as-is
