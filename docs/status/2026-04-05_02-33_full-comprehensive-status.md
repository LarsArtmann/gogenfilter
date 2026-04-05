# gogenfilter — Comprehensive Status Report

**Date:** 2026-04-05 02:33  
**Branch:** `master` (up to date with `origin/master`)  
**Working Tree:** Clean  
**Go Version:** `go1.26.1 darwin/arm64`  
**Test Coverage:** 88.7%  
**Tests:** All passing (0.69s)

---

## A) FULLY DONE ✅

| Item | Details |
|------|---------|
| Core detection engine | 7 generator types: sqlc, templ, go-enum, protobuf, mockgen, stringer, generic |
| Two-phase detection | Filename-based (zero I/O) → content-based (reads file). Correctly ordered |
| Filter API | `Filter` struct with options, include/exclude patterns, metrics integration |
| Metrics system | `Metrics` with RWMutex, `FilterStats` snapshot, nil-safe methods |
| SQLC config parsing | `FindSQLCConfigs`, `ParseSQLCConfig`, `GetSQLOutputDirs` — full YAML parsing via `go-faster/yaml` |
| Project root finder | `FindProjectRoot` with upward marker search, depth limit, typed errors |
| Pattern matching | `MatchPattern` with path-prefix and filename glob support |
| Typed errors | `ProjectRootError` and `SQLCConfigError` with `Error()` + `Unwrap()` |
| Test suite | 974-line main test file + 348-line SQLC test file, table-driven, benchmarks |
| golangci-lint v2 config | `.golangci.yml` committed and working (minus known SIGSEGV on generics in test) |
| Git history clean | All prior work committed, no uncommitted changes |
| README | Usage documentation with examples |

## B) PARTIALLY DONE ⚠️

| Item | What's Done | What's Missing |
|------|-------------|----------------|
| Test coverage | 88.7% overall | 4 functions at 0%: `DetectGenerated`, `GetMetrics`, `matchesIncludePatterns`, `shouldFilterWithIncludes`. `MatchPattern` at 80%. `HasSQLCContent` at 80% |
| Lint compliance | `go vet` clean | golangci-lint v2 SIGSEGV on `sqlc_test.go` generics (known upstream bug, not our issue). 41 LSP warnings about `t.Parallel`, variable names, etc. |
| Error types | `ProjectRootError` and `SQLCConfigError` work | `BaseError`, `New()`, `Wrap()` are dead code (never called). Package name `errors` collides with stdlib |

## C) NOT STARTED ❌

1. **Flatten `pkg/errors/` into root package** — Move `ProjectRootError` + `SQLCConfigError` to root, delete `pkg/errors/`, eliminate stdlib name collision
2. **Remove `MetricsMixin` anti-pattern** — Inline `TotalFilesChecked` and `FilteredByReason` into `Metrics` and `FilterStats` directly
3. **Name anonymous check table structs** — Extract `contentCheck` and `filenameCheck` named types from `detection.go`
4. **Fix `MatchPattern` prefix bug** — `strings.Contains` at `pattern.go:18` matches `myvendor/file.go` against `vendor/*` (false positive)
5. **Add tests for 0% covered functions** — `DetectGenerated`, `GetMetrics`, `shouldFilterWithIncludes`, `matchesIncludePatterns`
6. **Add `IsTemplGenerated` edge case test** — `_templ.go` file without templ content → should return `false`
7. **Add `errors_test.go`** — No tests exist for `ProjectRootError` or `SQLCConfigError`
8. **Split 974-line `gogenfilter_test.go`** into focused files — `filter_test.go`, `detection_test.go`, `metrics_test.go`
9. **Fix test parallelism warnings** — Add `t.Parallel()` to top-level tests per tparallel linter

## D) TOTALLY FUCKED UP 💥

| Issue | Severity | Details |
|-------|----------|---------|
| `go test -race` toolchain mismatch | **HIGH** | `go1.26.1` in `go.mod` but `go tool` reports `go1.26.0`. `GOTOOLCHAIN=auto` downloads `go1.26.1` toolchain but the local `go tool` binary is `go1.26.0`. The `-race` flag uses the local tool version which doesn't match. Regular `go test` works because it uses the downloaded toolchain. **Root cause:** Nix-installed Go is `go1.26.0` but `go.mod` says `go 1.26.1`. |
| `pkg/errors` name collision | **MEDIUM** | Package `errors` forces consumers to alias (`pkgerrors "github.com/LarsArtmann/gogenfilter/pkg/errors"`). Dead code (`BaseError`, `New`, `Wrap`) ships in the API surface |
| `MatchPattern` false positives | **MEDIUM** | Path `myvendor/file.go` matches pattern `vendor/*` because `strings.Contains(path, "vendor/")` is true. Should use path-boundary check |
| gopls phantom errors | **LOW** | LSP reports "os not in std" errors. Compilation works fine. Caused by gopls toolchain confusion. Not a code bug. |

## E) WHAT WE SHOULD IMPROVE

### Architecture
- **`pkg/errors` subpackage adds complexity for 2 error types.** Moving them to root package eliminates import aliasing, dead code, and the stdlib name collision
- **`MetricsMixin` is unidiomatic Go.** A "mixin" with 2 fields shared by 2 types is over-engineering. Direct field embedding is simpler and more readable
- **Anonymous struct tables in `detection.go`** hurt godoc readability. Named types self-document the table schema

### Code Quality
- **`BaseError` + `New()` + `Wrap()` are dead code** — 24 lines never called, tested, or referenced. They ship in the public API
- **`MatchPattern` has a correctness bug** — `strings.Contains` should be path-boundary-aware
- **4 functions at 0% coverage** — `DetectGenerated` (public wrapper), `GetMetrics`, `shouldFilterWithIncludes`, `matchesIncludePatterns`
- **974-line test file** should be split by concern

### Dependencies
- Only external dep is `github.com/go-faster/yaml` — good, minimal
- No opportunity to replace with stdlib (`encoding/yaml` doesn't exist in Go)
- Could consider `gobwas/glob` for more robust pattern matching, but `filepath.Match` + prefix check is sufficient for current use

### Type Model
- `FilterOption` and `FilterReason` are both `string` types with overlapping constants (e.g., `FilterSQLC = "sqlc"` and `ReasonSQLC = "sqlc"`). Consider if a single enum or a mapping function would reduce duplication
- `MetricsMixin` → just inline the fields
- `Filter` struct has unexported fields but exported methods — fine for Go, but `GetStats()` returns `FilterStats` which embeds `MetricsMixin` (leaky abstraction)

## F) TOP 25 THINGS TO DO NEXT

Sorted by **impact × urgency / work**:

| # | Task | Impact | Work | Priority |
|---|------|--------|------|----------|
| 1 | Fix `go.mod` toolchain: change `go 1.26.1` → `go 1.26.0` to match installed `go tool` | HIGH | TRIVIAL | P0 |
| 2 | Flatten `pkg/errors/` into root: move `ProjectRootError` + `SQLCConfigError`, delete dead `BaseError`/`New`/`Wrap` | HIGH | LOW | P0 |
| 3 | Fix `MatchPattern` bug: `strings.Contains` → path-boundary check | HIGH | TRIVIAL | P0 |
| 4 | Add `errors_test.go` for `ProjectRootError` + `SQLCConfigError` | MEDIUM | LOW | P1 |
| 5 | Add test for `DetectGenerated` (0% → 100%) | MEDIUM | LOW | P1 |
| 6 | Add test for `GetMetrics` (0% → 100%) | MEDIUM | LOW | P1 |
| 7 | Add test for `shouldFilterWithIncludes` + `matchesIncludePatterns` (0% → 100%) | MEDIUM | LOW | P1 |
| 8 | Add `IsTemplGenerated` edge case test (62.5% → 100%) | MEDIUM | TRIVIAL | P1 |
| 9 | Remove `MetricsMixin`, inline fields into `Metrics` + `FilterStats` | MEDIUM | LOW | P2 |
| 10 | Name `contentCheck` + `filenameCheck` types in `detection.go` | LOW | TRIVIAL | P2 |
| 11 | Split `gogenfilter_test.go` into focused test files | LOW | MEDIUM | P3 |
| 12 | Fix `t.Parallel` warnings in test functions | LOW | LOW | P3 |
| 13 | Fix `varnamelen` warnings (`f` → `filter`) | LOW | TRIVIAL | P3 |
| 14 | Add `String()` validation to `FilterOption` — reject unknown options | LOW | LOW | P3 |
| 15 | Add `Errors()` or `As()` helper for error type detection | LOW | LOW | P3 |
| 16 | Consider `FilterOption` → `FilterReason` mapping function instead of duplicate string constants | MEDIUM | MEDIUM | P3 |
| 17 | Add integration test: walk real Go project tree, detect generated files | MEDIUM | MEDIUM | P4 |
| 18 | Add fuzz tests for `MatchPattern` | MEDIUM | MEDIUM | P4 |
| 19 | Add `Example*` test functions for godoc | LOW | LOW | P4 |
| 20 | Benchmark `DetectGenerated` end-to-end (currently only sub-functions) | LOW | LOW | P4 |
| 21 | Consider `io.Reader` instead of `string` for content params (streaming) | LOW | HIGH | P5 |
| 22 | Add `//go:generate` for stringer on `FilterOption`/`FilterReason` | LOW | LOW | P5 |
| 23 | CI pipeline (GitHub Actions) with test + vet + lint | MEDIUM | MEDIUM | P5 |
| 24 | Add `CHANGELOG.md` | LOW | LOW | P5 |
| 25 | API review: should `Filter` be an interface for mockability? | LOW | HIGH | P5 |

## G) TOP #1 QUESTION

**The `go.mod` toolchain mismatch is the only real blocker.**

The installed Go toolchain reports as `go1.26.0` (via `/run/current-system/sw/bin/go` — Nix-installed), but `go.mod` says `go 1.26.1`. This causes:
- `go test -race` → SIGSEGV/toolchain crash
- `go tool cover` → "compile: version go1.26.1 does not match go tool version go1.26.0"
- Regular `go test ./...` works because `GOTOOLCHAIN=auto` downloads the `go1.26.1` toolchain

**Question:** Should I downgrade `go.mod` to `go 1.26.0` to match your Nix-installed Go, or upgrade your local Go to `1.26.1`? The former is a one-line fix. The latter requires updating your Nix config. I recommend downgrading `go.mod` → `go 1.26.0` since that's what your system provides.

---

## Files Inventory

| File | Lines | Purpose |
|------|-------|---------|
| `types.go` | 80 | `FilterOption`, `FilterReason`, constants |
| `detection.go` | 232 | All `Is*Generated` functions, check tables, `detectGeneratedReason` |
| `filter.go` | 149 | `Filter` struct, `ShouldFilter`, include/exclude logic |
| `metrics.go` | 102 | `MetricsMixin`, `Metrics`, `FilterStats`, nil-safe methods |
| `pattern.go` | 29 | `MatchPattern` (glob + prefix) |
| `project.go` | 46 | `FindProjectRoot` (upward marker search) |
| `sqlc.go` | 185 | SQLC config types, parsing, directory walking |
| `pkg/errors/errors.go` | 79 | `BaseError` (DEAD), `ProjectRootError`, `SQLCConfigError` |
| `gogenfilter_test.go` | 974 | Main test file (all non-SQLC tests) |
| `sqlc_test.go` | 348 | SQLC-specific tests |
| `go.mod` | 16 | Module definition, `go 1.26.1` |
| `.golangci.yml` | ~50 | Linter configuration |
| `README.md` | 169 | Usage documentation |
| **Total** | **~2,500** | |
