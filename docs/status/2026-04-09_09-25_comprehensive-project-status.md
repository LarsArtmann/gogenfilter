# gogenfilter — Comprehensive Project Status Report

**Date:** 2026-04-09 09:25
**Branch:** `master` (up to date with `origin/master`)
**Coverage:** 90.0% | **Tests:** ALL PASSING | **Lint:** 0 issues | **Vet:** 0 issues
**Go:** 1.26.0 darwin/arm64
**Total Source Lines:** 3,407 across 21 Go files

---

## A) FULLY DONE

### Core Library (8 source files)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| detection.go | 248 | Complete | 7 detectors, two-phase detection, table-driven |
| filter.go | 174 | Complete | Filter struct, include/exclude patterns, String() |
| types.go | 126 | Complete | FilterOption, FilterReason, IsValid, All*, package doc |
| sqlc.go | 194 | Complete | SQLC config discovery, YAML parsing, WalkDir |
| metrics.go | 131 | Complete | Thread-safe metrics, snapshots, String() |
| pattern.go | 79 | Complete | Glob matching with ** support |
| project.go | 50 | Complete | Project root discovery |
| errors.go | 41 | Complete | Typed errors with Unwrap |

### Test Suite (13 test files)

| File | Lines | Status |
|------|-------|--------|
| detection_test.go | 335 | Complete — detector priority tests, 2-phase tests |
| helpers_test.go | 302 | Complete — generic boolTestCase[T], table helpers |
| sqlc_test.go | 300 | Complete |
| testdata_test.go | 297 | Complete |
| filter_test.go | 267 | Complete |
| types_test.go | 144 | Complete |
| project_test.go | 118 | Complete |
| bench_test.go | 117 | Complete — MatchPattern, ShouldFilter, DetectReason, Is*Generated |
| pattern_test.go | 106 | Complete |
| property_test.go | 97 | Complete — 4 property tests with testing/quick |
| example_test.go | 95 | Complete — 9 runnable Go examples |
| fuzz_test.go | 70 | Complete — FuzzMatchPattern, FuzzDetectReason |
| errors_test.go | 67 | Complete |
| metrics_test.go | 49 | Complete |

### Infrastructure

| Item | Status |
|------|--------|
| Justfile (test, lint, coverage, ci, fmt, tidy) | Complete |
| golangci-lint v2 (80+ linters) | Complete |
| CHANGELOG.md (Keep a Changelog format) | Complete |
| README.md (full API docs, examples) | Complete |
| TODO_LIST.md (prioritized backlog) | Complete |
| AGENTS.md (project instructions) | Complete |
| go-structure-linter config | Complete |

---

## B) PARTIALLY DONE

Nothing. All work is either fully complete or not started.

---

## C) NOT STARTED

### HIGH Priority

| # | Item | Effort | Why Important |
|---|------|--------|---------------|
| 1 | **`io/fs.FS` abstraction** — Accept `fs.FS` instead of direct `os.ReadFile`/`filepath.WalkDir` | Medium | Enables in-memory testing, `embed.FS`, custom FS. Core architectural gap. |
| 2 | Replace `slog.Warn` with configurable logging or return warnings | Medium | Library code should never impose logging on consumers |
| 3 | Resolve include patterns bypassing generated-code detection | High | Design decision needed — current behavior is semantically misleading |
| 4 | GitHub Actions CI workflow | Medium | No CI exists. All testing is local. |

### MEDIUM Priority

| # | Item | Effort |
|---|------|--------|
| 5 | Remove/document `!needsContentCheck` dead branch in DetectReason | Small |
| 6 | Explicit FilterReason <-> FilterOption mapping (break shared-string coupling) | Medium |
| 7 | Expand detector list (oapi-codegen, deepcopy-gen, protoc-gen-go-grpc) | Large |
| 8 | Replace `\x00` sentinel with cleaner expansion in pattern.go | Small |
| 9 | Update CHANGELOG.md with all recent session work | Small |

### LOW Priority

| # | Item | Effort |
|---|------|--------|
| 10 | Document API stability guarantees | Small |
| 11 | Consider `//go:generate` for detector table generation | Medium |
| 12 | Create CONTRIBUTING.md | Small |
| 13 | Add Codecov or similar coverage tracking | Medium |
| 14 | Test against real-world generated files (integration tests) | Medium |
| 15 | Performance profile hot paths | Medium |
| 16 | Add FilteredBy() examples to example_test.go | Small |
| 17 | Add Metrics usage examples | Small |

---

## D) TOTALLY FUCKED UP

### 1. No `io/fs.FS` abstraction — stdlib filesystem interfaces completely ignored

- **Impact:** The library hardcodes `os.ReadFile` and `filepath.WalkDir` everywhere. This is the single biggest architectural gap relative to Go stdlib conventions.
- **Files:** `detection.go:206` (`os.ReadFile`), `sqlc.go:89` (`filepath.WalkDir`), `sqlc.go:143` (`os.ReadFile`), `project.go:10` (`os.Stat`)
- **What we're missing:**
  - `fs.FS` interface for pluggable filesystem
  - `fs.ReadFileFS` for reading files from any FS
  - `fs.WalkDir` for walking any FS
  - `testing/fstest.MapFS` for zero-temp-dir testing
  - `embed.FS` compatibility
  - `os.DirFS(".")` as the default for backward compatibility
- **Why it matters:** Go 1.16+ introduced `io/fs` specifically for this pattern. Every well-designed Go library that reads files should accept `fs.FS`. This is the **#1 thing preventing maximum stdlib usage**.

### 2. `slog.Warn` in library code forces logging on all consumers

- **File:** `sqlc.go:169`
- Library code should **never** impose logging. No way to suppress or redirect.
- **Fix:** Accept `*slog.Logger` parameter, or return warnings in result struct.

### 3. FilterOption/FilterReason shared-string antipattern

- **File:** `types.go`
- Both types are `string` sharing values (e.g., `FilterSQLC = "sqlc" = ReasonSQLC`). But `FilterReason` has 3 extra values with no `FilterOption` counterpart. Invisible coupling.

### 4. Include patterns bypass generated-code detection entirely

- **File:** `filter.go:116-126`
- When `includePatterns` are set, `shouldFilterWithIncludes` runs exclusively. Generated-code detection is never reached. Semantically misleading reasons.

### 5. `\x00` sentinel in pattern matching

- **File:** `pattern.go:38-39`
- `expandDoublestar` uses null byte as sentinel for `**`. Practically safe but theoretically impure.

---

## E) WHAT WE SHOULD IMPROVE

### Stdlib Usage (THE BIG ONE — answering the original question)

**Current stdlib imports:** `os`, `path/filepath`, `slices`, `strings`, `fmt`, `sort`, `sync`, `maps`, `log/slog`, `testing`, `testing/quick`

**What we're NOT using but SHOULD be:**

1. **`io/fs` package** — The biggest gap. Go 1.16+ provides:
   - `fs.FS` interface — pluggable filesystem abstraction
   - `fs.ReadFileFS` — extended FS with `ReadFile` method
   - `fs.WalkDir` — walk any FS (not just OS filesystem)
   - `fs.DirEntry` — already used indirectly, should use directly
   - `fs.FileInfo` — should use instead of raw `os.Stat`
   - `os.DirFS(root)` — converts OS path to `fs.FS`

2. **`testing/fstest`** — For test-only filesystem:
   - `fstest.MapFS` — in-memory filesystem for testing (eliminates temp dir dependency)
   - `fstest.TestFS` — validate custom FS implementations

3. **`embed.FS`** — Should be usable as input to config discovery

4. **`strings.Cut`** (Go 1.18+) — Could replace some `strings.Contains` + split patterns

5. **`errors.Is/As`** patterns — Our error types have `Unwrap()` but no sentinel errors for `errors.Is` matching

6. **`iter` package** (Go 1.23+) — Could use iterator patterns for file walking results

### Architecture

7. **Extract `FilterReason` <-> `FilterOption` relationship** into explicit mapping
8. **Make logging configurable** — accept `*slog.Logger` or return warnings
9. **Consider `fs.FS`** for file reading in `detectReason` — enables in-memory testing

### Testing

10. **No CI** — All testing is local. GitHub Actions would catch regressions.
11. **Temp-dir-dependent tests** — `project_test.go` and `sqlc_test.go` create temp dirs. Could use `fstest.MapFS` with `fs.FS` abstraction.
12. **Coverage dropped from 98.4% to 90.0%** — new code (String() methods, new tests) may have uncovered branches. `FilterStats.String()` shows 0.0%.

### API Surface

13. **`String()` on `FilterStats`** — exists but not covered by tests (0.0% coverage)
14. **Detector extensibility** — No way for users to add custom detectors without forking

---

## F) Top 25 Things to Do Next

| Priority | # | Item | Impact | Effort | Category |
|----------|---|------|--------|--------|----------|
| **P0** | 1 | **Add `fs.FS` abstraction** — Accept `fs.FS` in Filter/SQLC/project functions, default to `os.DirFS` | Critical | M | Architecture |
| **P0** | 2 | **Add `fs.FS` tests with `fstest.MapFS`** — Replace temp-dir-dependent tests | Critical | M | Testing |
| **P0** | 3 | **Test `FilterStats.String()`** — 0.0% coverage on an exported method | High | S | Testing |
| **P1** | 4 | **Replace `slog.Warn`** with return value or configurable logger | High | M | Architecture |
| **P1** | 5 | **GitHub Actions CI** workflow (test + lint + coverage) | High | M | CI/CD |
| **P1** | 6 | **Resolve include patterns bypass** — design doc + implementation | High | L | Architecture |
| **P1** | 7 | **Remove/document `!needsContentCheck` dead branch** | Medium | S | Code health |
| **P1** | 8 | **Explicit `FilterReason` <-> `FilterOption` mapping** | Medium | M | Architecture |
| **P2** | 9 | **Expand detector list** (oapi-codegen, deepcopy-gen, protoc-gen-go-grpc) | Medium | L | Features |
| **P2** | 10 | **Replace `\x00` sentinel** with cleaner pattern expansion | Low | S | Code health |
| **P2** | 11 | **Update CHANGELOG.md** with session work | Low | S | Documentation |
| **P2** | 12 | **Add `FilteredBy()` examples** to example_test.go | Low | S | Documentation |
| **P2** | 13 | **Add Metrics usage examples** to example_test.go | Low | S | Documentation |
| **P2** | 14 | **Use `strings.Cut`** where applicable (Go 1.18+ stdlib optimization) | Low | S | Code quality |
| **P2** | 15 | **Add property-based tests** for MatchPattern invariants | Medium | M | Testing |
| **P3** | 16 | **Performance profile** hot paths with real workloads | Low | M | Performance |
| **P3** | 17 | **Document API stability guarantees** | Low | S | Documentation |
| **P3** | 18 | **Add Codecov** or similar coverage tracking | Low | M | CI/CD |
| **P3** | 19 | **Test against real-world generated files** (integration tests) | Medium | M | Testing |
| **P3** | 20 | **Add `go vet` and `staticcheck`** to CI beyond golangci-lint | Low | S | CI/CD |
| **P4** | 21 | **Create CONTRIBUTING.md** | Low | S | Documentation |
| **P4** | 22 | **Consider `//go:generate`** for detector table generation | Low | M | Code health |
| **P4** | 23 | **Evaluate `filepath.WalkDir`** — already uses it, mark TODO as done | Low | XS | Cleanup |
| **P4** | 24 | **Mark stale TODOs** in TODO_LIST.md as completed/wontfix | Low | XS | Cleanup |
| **P4** | 25 | **Add detector extensibility API** — `RegisterDetector` function | Low | M | API |

---

## G) Top #1 Question I Cannot Resolve Myself

**Should the `io/fs.FS` abstraction be a breaking change or additive?**

The library currently has two tiers of file I/O:

1. **Public API (zero I/O):** `DetectReason(path, content, options)` — consumer provides content, no filesystem access needed. This is already clean.
2. **Internal/Semi-public API (disk I/O):** `detectReason(path, options)` reads from disk. `FindSQLCConfigs(paths)`, `GetSQLOutputDirs(paths)`, `FindProjectRoot(path, markers)` — all read from disk.

The question: **How to add `fs.FS` support?**

**Option A (Breaking):** Change all I/O functions to accept `fs.FS` as first parameter. `FindSQLCConfigs(fsys fs.FS, paths []string)`. Clean but breaks all consumers.

**Option B (Additive):** Add new `*FS` variants alongside existing functions. `FindSQLCConfigsFS(fsys fs.FS, paths []string)`. Backward compatible but doubles the API surface.

**Option C (Method on Filter):** `Filter` gets an `fs.FS` field set via `WithFS(fsys fs.FS)`. Default is `os.DirFS(".")`. Only `ShouldFilter` path changes. Config discovery stays as-is.

This is a product/API design decision. Option C seems cleanest for the `Filter` use case, but doesn't help `FindSQLCConfigs`/`GetSQLOutputDirs`/`FindProjectRoot` which are standalone functions.

---

## Stdlib Usage Audit

### Currently Used

| Package | Functions/Types Used | Could Use More? |
|---------|---------------------|-----------------|
| `os` | `ReadFile`, `Stat`, `DirEntry` (indirect) | Yes — `os.DirFS` |
| `path/filepath` | `Base`, `Match`, `WalkDir`, `Join`, `Dir`, `Abs`, `SkipDir`, `ToSlash`, `Separator`, `Clean` | No — fully utilized |
| `slices` | `Contains`, `ContainsFunc` | No |
| `strings` | `Contains`, `HasSuffix`, `HasPrefix`, `Join`, `Split`, `ReplaceAll` | Yes — `Cut`, `CutPrefix`, `CutSuffix` (1.20+) |
| `fmt` | `Sprintf`, `Errorf`, `Println` | No |
| `sort` | `Strings` | No |
| `sync` | `RWMutex` | No |
| `maps` | `Clone` | No |
| `log/slog` | `Warn` | Should be removed (library shouldn't log) |
| `testing` | `T`, `B`, `F` | No |
| `testing/quick` | `Check` | No |

### NOT Used But Should Be

| Package | What | Why |
|---------|------|-----|
| `io/fs` | `fs.FS`, `fs.ReadFileFS`, `fs.WalkDir`, `fs.DirEntry`, `fs.FileInfo` | Pluggable filesystem, testability, embed.FS compatibility |
| `testing/fstest` | `fstest.MapFS`, `fstest.TestFS` | In-memory test filesystem, eliminate temp dir dependency |
| `os` | `os.DirFS(root)` | Convert OS path to `fs.FS` for default parameter |
| `strings` | `Cut`, `CutPrefix`, `CutSuffix` | Cleaner than Contains+Split patterns (Go 1.20+) |
| `errors` | Sentinel errors for `errors.Is` matching | Better error handling patterns |

### Assessment

**Score: 6/10 for stdlib usage.**

The library uses stdlib well for string/path manipulation but **completely ignores the `io/fs` ecosystem** which is the most important stdlib abstraction for any library that reads files. This is the single biggest improvement opportunity.

---

_Report generated at 2026-04-09 09:25. Project status: HEALTHY — 90% coverage, all tests passing, zero lint issues. Primary improvement: `io/fs.FS` abstraction._
