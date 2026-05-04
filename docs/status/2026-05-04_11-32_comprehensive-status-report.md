# Comprehensive Status Report — 2026-05-04 11:32

**Session:** 4 (reflect + execute)
**Author:** Crush (GLM-5.1)
**Trigger:** User requested full status update

---

## a) FULLY DONE

### Core Library (97.6% coverage, all tests pass)

- Two-phase detection engine (filename → content) — `detection.go`
- Table-driven detector system — 11 generators, `[]detector` slice
- Functional options API — `NewFilter(WithFilterOptions(FilterAll))` (implicit enable/disable)
- Immutable `Filter` after construction
- `FilterAll` expansion via `optionsMap`
- `ShouldFilter` returns `(bool, error)`, `MustFilter` panics on error
- `IsEnabled()` derived from options/patterns (no `enabled bool` field)
- `FilterReasons()`, `String()` on Filter and FilterStats
- Include patterns (restrict-scope semantics) — documented in godoc + README
- Exclude patterns — documented in README
- Pattern matching via `doublestar/v4` — `MatchPattern()`
- `DetectReason` (zero-I/O) + `DetectReasonReader` (io.Reader)
- 11 individual `Is*Generated` functions
- `FilteredFiles(reason) []string` on FilterStats — defensive copy
- `FilteredBy(reason) int` on FilterStats

### SQLC Config Discovery

- V1 config support — `parseV1AsV2()` converts v1 `packages[].path` → v2 format
- V2 config support — full parsing of `sql[].gen.go.out`, `sql[].gen.json.out`, `sql[].codegen[].out`
- OS filesystem + `fs.FS` abstraction variants
- Error handling with branded errors and phantom types

### Error System

- 7 error codes + sentinel errors — `errorCodeDefs` single source of truth
- `CodeEqual[T]` generic, `ErrorCoder`/`Helper` interfaces
- `CodeHelp()`, `AllErrorCodes()` derived from table
- Phantom types (5): `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`

### Metrics

- Thread-safe with `sync.RWMutex`
- `MetricsMixin` encapsulation (unexported fields)
- Nil-safe throughout
- `FilteredFiles()` + `FilteredBy()` + `TotalFiltered()` accessors

### Testing

- Table-driven tests, `t.Parallel()` throughout
- Fuzz tests, property-based tests, benchmark tests
- BDD tests with ginkgo (38 specs)
- Concurrent tests, edge case tests
- Integration tests with real fixtures (`testdata/`)
- Runnable examples (19)
- Generic test helpers in `helpers_test.go`

### CI/CD

- GitHub Actions: test (race), vet, lint (golangci-lint v2), coverage (95% threshold), bench
- Separate Go CI + Website CI workflows with path filters
- Dependabot for Go, npm, GitHub Actions
- `.node-version` for local dev consistency
- HTML validation enforced in website CI

### Website

- Astro v6 + Starlight docs site
- Self-hosted Google Fonts, Plausible analytics
- Benchmarks guide with real performance data
- Firebase Hosting deployment
- All `Enabled()`/`Disabled()` references removed from docs

---

## b) PARTIALLY DONE

### Coverage Gaps

| Function | Coverage | Issue |
|----------|----------|-------|
| `detectReasonFromMap` | 83.3% | Some branches untested |
| `SQLCConfigError.Error()` | 85.7% | `ConfigPath=""` + `Cause=nil` branch untested |
| `MatchPattern` | 92.3% | Some edge cases untested |
| `FindProjectRoot` | 92.9% | Error path untested |
| `unmarshalSQLCConfig` | 84.2% | `version:""` + unsupported version branches |
| `parseV1AsV2` | 81.8% | Empty packages branch |
| `GetSQLOutputDirs` | 0.0% | Previously tested but test removed? |
| `FindSQLCConfigsFS` | 0.0% | Previously tested but test removed? |
| `parseSQLCConfigFS` | 0.0% | Previously tested but test removed? |
| `GetSQLOutputDirsFS` | 0.0% | Previously tested but test removed? |
| `FilteredBy()` | 0.0% | Test regression — was tested before |

### TODO_LIST.md

- **Stale completed items** — Line references drifted (ShouldFilter at 125 not 137, etc.)
- **Stale "SQLC v1 returns zero dirs"** — Actually now converts v1→v2 properly via `parseV1AsV2()`
- **Still references "Enabled()" in completed section** — Should note the removal

### CHANGELOG.md

- Missing entries for: implicit enable/disable refactor, SQLC v1→v2 conversion, JSON/codegen output dir support, website docs cleanup

---

## c) NOT STARTED

From TODO_LIST.md:

| # | Task | Priority |
|---|------|----------|
| 1 | Resolve include patterns design question | HIGH |
| 2 | Performance profile and optimize hot paths | MEDIUM |
| 3 | Add Codecov or similar coverage tracking | MEDIUM |
| 4 | Consider `//go:generate` for detector table generation | MEDIUM |
| 5 | Add `RegisterDetector()` API for custom detectors | MEDIUM |
| 6 | Add `WalkAndFilter(dir string)` bulk API | MEDIUM |
| 10 | Run Lighthouse audit and fix issues | WEBSITE |
| 11 | Add custom 404 page | WEBSITE |

---

## d) TOTALLY FUCKED UP

### 1. Four FS-variant functions at 0% coverage

`GetSQLOutputDirs`, `FindSQLCConfigsFS`, `parseSQLCConfigFS`, `GetSQLOutputDirsFS` — all at 0.0%. These were tested before (sqlc_test.go had `TestParseSQLCConfigFS_NonExistent_ErrorCode`, `TestGetSQLOutputDirsFS_InvalidYAML_ErrorCode`). Either tests were removed or the coverage tool isn't picking them up.

### 2. `FilteredBy()` at 0% coverage

This was tested in `metrics_test.go` previously. Possible test regression.

### 3. TODO_LIST completed section has stale info

- Line references drifted significantly (6+ items wrong)
- "SQLC v1 returns zero dirs" — actually now converts v1→v2
- Completed section says "v0.1.0 tag" but we're at v2.1.0 now

### 4. Uncommitted changes in working tree

3 files modified but not committed:
- `docs/planning/2026-05-04_historical-benchmarks-integration.md`
- `docs/research/2026-05-04_sqlc-config-parsing-comparison.md`
- `website/src/content/docs/docs/guides/benchmarks.mdx`

### 5. AGENTS.md potentially stale

Needs updating with:
- SQLC v1 support (parseV1AsV2)
- JSON/codegen output dir support
- Implicit enable/disable (no Enabled/Disabled)

---

## e) WHAT WE SHOULD IMPROVE

### Architecture

1. **`FilteredBy()` has 0% coverage** — likely a test regression from the `MetricsMixin` refactor. Need to verify.
2. **FS-variant functions at 0%** — Need to investigate if tests were removed or just not running.
3. **`detectReasonFromMap` at 83.3%** — The function has branches for "no enabled content checkers" that may not be exercised.
4. **No `WalkAndFilter` bulk API** — Users must loop `ShouldFilter` manually. This is the most requested feature for linter integration.

### Type Models

5. **`FilterOption` and `FilterReason` are separate string types with an implicit coupling** — `FilterOption.Reason()` does a raw type conversion `FilterReason(o)`. If someone adds a FilterOption without the matching FilterReason, there's no compile-time error. The `detectors` table enforces this at init time but a generics-based pairing could make it compile-time.
6. **`ErrorCode` could use an enum-like pattern** — Currently just a string. Could use `fmt.Stringer` + `isErrorCode()` marker interface for exhaustiveness checking.
7. **Phantom types provide no compile-time behavior** — They're just named strings. Consider if they actually prevent misuse or just add verbosity.

### Library Usage

8. **`slices.Contains` for `IsValid()`** — Linear scan on every call. For 12 options this is fine, but a `map[FilterOption]struct{}` would be O(1). Could use `x/exp/maps` or just a package-level set.
9. **`fmt.Sprintf` in `Filter.String()`** — Called on every `String()` invocation. Could pre-compute in `NewFilter` since Filter is immutable.

### Documentation

10. **CHANGELOG missing recent entries** — Implicit enable/disable refactor, SQLC v1 support, JSON/codegen output dirs.
11. **TODO_LIST stale** — Needs full refresh with correct line numbers and current status.

---

## f) Top #25 Things to Get Done Next

Sorted by impact × effort (Pareto):

| # | Task | Impact | Effort | Category |
|---|------|--------|--------|----------|
| 1 | Investigate 0% coverage functions — are tests gone or broken? | HIGH | 15min | Regression |
| 2 | Fix `FilteredBy()` 0% coverage | HIGH | 10min | Regression |
| 3 | Write status report, commit, push | HIGH | 10min | Process |
| 4 | Commit 3 orphaned working-tree files | MED | 5min | Housekeeping |
| 5 | Update TODO_LIST.md — fix stale line refs and v1 SQLC info | MED | 15min | Docs |
| 6 | Update CHANGELOG.md with recent session changes | MED | 15min | Docs |
| 7 | Update AGENTS.md with v1 SQLC + implicit enable | MED | 10min | Docs |
| 8 | Add coverage for `unmarshalSQLCConfig` unsupported version branch | MED | 10min | Testing |
| 9 | Add coverage for `parseV1AsV2` empty packages branch | MED | 10min | Testing |
| 10 | Add coverage for `SQLCConfigError.Error()` ConfigPath="" + Cause=nil | MED | 10min | Testing |
| 11 | Add coverage for `detectReasonFromMap` uncovered branches | MED | 10min | Testing |
| 12 | Resolve include patterns design question (TODO #1) | MED | 30min | Design |
| 13 | Update README to remove any stale Enabled()/Disabled() references | MED | 10min | Docs |
| 14 | Check if `example_test.go` output comments are still accurate | MED | 15min | Testing |
| 15 | Run `golangci-lint run` and fix any issues | MED | 10min | Quality |
| 16 | Add `WalkAndFilter` bulk API (TODO #6) | MED | 30min | Feature |
| 17 | Add Codecov to CI (TODO #3) | LOW | 15min | CI |
| 18 | Pre-compute `Filter.String()` in NewFilter | LOW | 15min | Perf |
| 19 | Replace `slices.Contains` in IsValid with map lookup | LOW | 10min | Perf |
| 20 | Performance profile hot paths (TODO #2) | LOW | 30min | Perf |
| 21 | Website: Run Lighthouse audit (TODO #10) | LOW | 60min | Website |
| 22 | Website: Add custom 404 page (TODO #11) | LOW | 30min | Website |
| 23 | Consider `//go:generate` for detector table (TODO #4) | LOW | 45min | Architect |
| 24 | Add `RegisterDetector()` API (TODO #5) | LOW | 60min | Feature |
| 25 | Consider compile-time FilterOption/Reason pairing | LOW | 60min | Architect |

---

## g) Top #1 Question

**The FS-variant SQLC functions (`GetSQLOutputDirs`, `FindSQLCConfigsFS`, `parseSQLCConfigFS`, `GetSQLOutputDirsFS`) show 0% coverage but previously had tests. Did a previous session remove these tests, or is the coverage tool not picking them up? I need to investigate the test files before I can fix this.**
