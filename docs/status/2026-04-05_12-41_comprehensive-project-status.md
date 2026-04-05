# Comprehensive Project Status Report

**Date:** 2026-04-05 12:41 CEST
**Branch:** `master` (8 commits ahead of `origin/master`)
**Coverage:** 91.4% | **Linter:** 0 issues | **Tests:** All passing with race detector

---

## a) FULLY DONE (Committed)

### This Session (8 commits)

| # | Commit | Description |
|---|--------|-------------|
| 1 | `43ce330` | Remove dead `GetMetrics()` export from `Filter` |
| 2 | `20209f6` | Unexport `Metrics.Record()` → `record()` |
| 3 | `8bef14b` | Convert table lookup functions to package-level `var` (eliminates per-call heap alloc) |
| 4 | `0b22d6b` | Consolidate `matchesAnySuffix`/`matchesAnyContains` into generic `matchAnyWith` |
| 5 | `61af93d` | Add `newSQLCConfigError` helper + specialized error constructors, `filepath.Walk` → `filepath.WalkDir` |
| 6 | `97cdda5` | Unify `contentCheck` + `filenameCheck` into single `detector` struct |
| 7 | `feac3fd` | Unexport SQLC config types and `ParseSQLCConfig` |
| 8 | `999d19d` + `0bf0b7b` | Replace `DetectGenerated` with `DetectReason` (public, zero-I/O) + `detectReason` (internal, reads disk) |

### Prior Sessions (Pre-existing)

- Full `slices` package adoption replacing manual loops
- Comprehensive test suite with property-based tests and benchmarks
- Pattern matching with `**` glob support
- Project root discovery with marker files
- SQLC config parsing with YAML support
- Custom error types (`ProjectRootError`, `SQLCConfigError`)
- Strict golangci-lint v2 compliance

---

## b) PARTIALLY DONE

### `FilterOption` / `FilterReason` Duplication
- **Status:** Analyzed but not implemented
- **Problem:** `FilterSQLC = "sqlc"` and `ReasonSQLC = "sqlc"` duplicate the same string values. 7 pairs of constants maintain identical values.
- **Options considered:** A) Single type, B) Method on FilterOption returning FilterReason, C) Code generation
- **Decision needed:** Which approach to take

---

## c) NOT STARTED

The following items from the improvement plan have not been touched:

1. Derive `FilterReason` from `FilterOption`
2. Make `MetricsMixin.FilteredByReason` private
3. Add test for `shouldFilterWithIncludes` (0% coverage)
4. Add tests for `IsTemplGenerated` Render path and `HasSQLCContent` versions path
5. Add `IsEnabled()` accessor to `Filter`
6. Handle `?` wildcard in `matchSegments`
7. Write `CHANGELOG.md`
8. Final push to origin

---

## d) TOTALLY FUCKED UP

Nothing. All changes compile, pass tests with race detector, and pass the linter.

**Known false positive:** gopls reports `undefined: fileExists` and `unused import: os` in `project.go` — these are STALE diagnostics. `go build` succeeds. The function exists at `project.go:9-16`.

---

## e) WHAT WE SHOULD IMPROVE

### Architecture

1. **`FilterOption`/`FilterReason` dual types** — 7 pairs of identical string constants is a maintenance burden. One change without the other = silent bugs. Should derive one from the other.

2. **Exported individual detector functions** — `IsSQLCGenerated`, `IsTemplGenerated`, `IsProtobufGenerated`, etc. are all exported but primarily consumed internally via the `detector` table. External consumers could use `DetectReason` instead. These functions duplicate the logic already encoded in the `detectors` table.

3. **`Metrics` exported but only used via `Filter`** — `NewMetrics()`, `RecordChecked()`, `RecordFiltered()` are exported but only called from within `Filter` methods. The `Metrics` type could be entirely unexported with only `FilterStats` and `GetStats()` as the public API.

4. **`FilterStats` exposes `MetricsMixin` embed** — `FilteredByReason` map is directly accessible, but there's no typed accessor. Consumers iterate a `map[FilterReason]int` without helper methods.

5. **`fileExists` in `project.go`** — Uses `os.Stat` + nil check. Could be `return err == nil` since `stat` is never nil when `err == nil`.

### Coverage Gaps

| Function | Coverage | Issue |
|----------|----------|-------|
| `shouldFilterWithIncludes` | 0.0% | No test exercises include patterns |
| `IsTemplGenerated` | 62.5% | Render path untested |
| `HasSQLCContent` | 80.0% | `versions:` branch untested |
| `DetectReason` (public) | 80.0% | Early-return path with no content check needed |
| `ShouldFilter` | 83.3% | Include patterns branch |
| `GetSQLOutputDirs` | 81.2% | Multiple configs warning path |
| `GetStats` | 66.7% | Nil metrics branch |
| `matchSegments` | 89.5% | `?` wildcard not tested |

### Code Quality

6. **`matchesMockgenFilename` uses `strings.Contains`** — `mock_` anywhere in filename matches (e.g., `remove_mock_data.go`). The content check phase catches false positives, but filename matching alone could misclassify.

7. **`ProjectRootError` and `SQLCConfigError` duplicate structure** — Both have `Cause error`, `Error()`, `Unwrap()`. Could share a base type, but the tradeoff is clarity vs DRY.

8. **`shouldSkipDirectory` is SQLC-specific** — But named generically. Lives in `sqlc.go` which is correct, but the name implies general utility.

---

## f) Top #25 Things to Do Next

Sorted by impact/work ratio (highest first):

### High Impact, Low Work (Quick Wins)

| # | Item | Est. Lines | Impact |
|---|------|-----------|--------|
| 1 | Add test for `shouldFilterWithIncludes` | ~30 | 0% → ~100% coverage for dead-looking code |
| 2 | Simplify `fileExists` to `return err == nil` | 3 | Removes dead nil check |
| 3 | Make `MetricsMixin.FilteredByReason` private + add `FilteredBy(reason) int` accessor | ~15 | Better encapsulation, typed API |
| 4 | Add `IsEnabled() bool` accessor to `Filter` | 3 | Common query need |
| 5 | Add test for `IsTemplGenerated` Render path | ~10 | 62.5% → 100% |
| 6 | Add test for `HasSQLCContent` versions path | ~10 | 80% → 100% |
| 7 | Add test for `GetStats` nil metrics branch | ~8 | 66.7% → 100% |

### Medium Impact, Medium Work (Architecture)

| # | Item | Est. Lines | Impact |
|---|------|-----------|--------|
| 8 | Derive `FilterReason` from `FilterOption` via method | ~20 | Eliminates 7 constant pairs, single source of truth |
| 9 | Unexport `Metrics` type entirely, keep `FilterStats`/`GetStats()` | ~30 | Cleaner public API surface |
| 10 | Handle `?` wildcard in `matchSegments` | ~15 | Complete glob support |
| 11 | Make `matchesMockgenFilename` suffix-only for `mock_` prefix | ~5 | Reduce false positives |
| 12 | Consider unexporting individual `Is*Generated` functions | ~50 | Reduce API surface, `DetectReason` covers use case |
| 13 | Add `FilteredByReason` map accessor to `FilterStats` | ~10 | Better consumer ergonomics |
| 14 | Extract `shouldSkipDirectory` to a configurable skip list | ~15 | Extensibility for other tools |

### Lower Impact, Higher Work (Polish)

| # | Item | Est. Lines | Impact |
|---|------|-----------|--------|
| 15 | Write `CHANGELOG.md` | ~100 | Project documentation |
| 16 | Add `FilterOption.IsValid()` validation | ~10 | Defensive programming |
| 17 | Add `errors.Is` support for `ProjectRootError`/`SQLCConfigError` with sentinel errors | ~30 | Better error handling for consumers |
| 18 | Add `FilterOptions` type alias for `[]FilterOption` with `All()` helper | ~15 | Ergonomic API |
| 19 | Consider `iter.Seq` for `FindSQLCConfigs` (Go 1.26+ iterators) | ~20 | Modern Go patterns |
| 20 | Add fuzz tests for `MatchPattern` | ~30 | Robustness |
| 21 | Add integration test: end-to-end filter with real project structure | ~50 | Confidence |
| 22 | Benchmark full `ShouldFilter` pipeline | ~15 | Performance baseline |
| 23 | Consider `sync.Once` for SQLC config discovery | ~10 | Avoid redundant walks |
| 24 | Add `WithLogger` option to `Filter` for structured logging | ~20 | Observability |
| 25 | Final cleanup: `go mod tidy`, verify all docs current, push | ~10 | Ship readiness |

---

## g) Top #1 Question I Cannot Figure Out Myself

**Should the individual `Is*Generated` functions remain exported?**

Currently exported: `IsSQLCGenerated`, `IsTemplGenerated`, `IsGoEnumGenerated`, `IsProtobufGenerated`, `IsMockgenGenerated`, `IsStringerGenerated`, `IsGenericGenerated`.

**Arguments for keeping:**
- They're useful for consumers who want to check a single generator
- They provide a lower-level API than `DetectReason`
- Breaking change to remove them

**Arguments for unexporting:**
- `DetectReason(path, content, options)` already covers all use cases
- The `detectors` table encodes the same logic — two sources of truth
- Smaller public API surface = easier to maintain and evolve

**My recommendation:** Keep them exported but document that `DetectReason` is the preferred high-level API. The individual functions serve as building blocks and their signatures (filePath + content) are clean. Removing them is a breaking change without sufficient justification.

**Your call:** Do you want to shrink the API surface, or keep the granular functions?

---

## Current File Inventory

| File | Lines | Purpose |
|------|-------|---------|
| `types.go` | 79 | Core types: `FilterOption`, `FilterReason`, constants |
| `detection.go` | 245 | Generator detection, `detector` table, `DetectReason` API |
| `filter.go` | 134 | `Filter` struct, include/exclude patterns, `ShouldFilter` |
| `metrics.go` | 101 | `Metrics`, `FilterStats`, `MetricsMixin` |
| `pattern.go` | 79 | `MatchPattern`, glob `**` support |
| `project.go` | 53 | `FindProjectRoot`, project marker search |
| `sqlc.go` | 194 | SQLC config discovery and parsing |
| `errors.go` | 41 | `ProjectRootError`, `SQLCConfigError` |
| `gogenfilter_test.go` | ~1280 | Main test file |
| `sqlc_test.go` | 367 | SQLC-specific tests |

**Total source:** ~926 lines (excluding tests)
**Total tests:** ~1647 lines
**Test-to-source ratio:** 1.78x

---

_Generated with Crush — 2026-04-05_
