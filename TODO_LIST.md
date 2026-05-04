# TODO List

**Generated:** 2026-05-03
**Updated:** 2026-05-04 (BDD suite complete — 175 specs, 97.3% coverage)

## ✅ COMPLETED

| #   | Task                                                                                          | Completed |
| --- | --------------------------------------------------------------------------------------------- | --------- |
| 10  | Add comprehensive BDD test suite (175 specs across bdd_test.go + bdd_extended_test.go)        | 2026-05-04 |
| 11  | Fix nil-pointer panic in NewFilter when WithFilterOptions returns (nil, error)                 | 2026-05-04 |
| 12  | Fix stale test counts (7→8 error codes) in errors_test.go and example_test.go                 | 2026-05-04 |
| 13  | Update all test files to handle error-returning API (property_test.go, bench_test.go, etc.)    | 2026-05-04 |
| 14  | Update all website docs and code examples for new error-returning API                         | 2026-05-04 |

## 🔴 HIGH Priority

| #   | Task                                                                                               | Source    | Effort |
| --- | -------------------------------------------------------------------------------------------------- | --------- | ------ |
| 1   | Resolve include patterns design question — confirm "restrict scope" is the intended final behavior | TODO_LIST | 30min  |

## 🟡 MEDIUM Priority

| #   | Task                                                              | Source      | Effort |
| --- | ----------------------------------------------------------------- | ----------- | ------ |
| 2   | Performance profile and optimize hot paths                        | TODO_LIST   | 30min  |
| 3   | Add Codecov or similar coverage tracking                          | TODO_LIST   | 15min  |
| 4   | Consider `//go:generate` for detector table generation            | TODO_LIST   | 45min  |
| 5   | Add `RegisterDetector()` API for custom detectors without forking | status docs | 60min  |
| 6   | Add `WalkAndFilter(dir string) map[string]FilterReason` bulk API  | code review | 30min  |

## 🟢 LOW Priority

| #   | Task                                                              | Source      | Effort | Status                                   |
| --- | ----------------------------------------------------------------- | ----------- | ------ | ---------------------------------------- |
| 7   | Add `*.gen.go` filename heuristic for oapi-codegen detector       | code review | 10min  | **Won't do** — false positive risk       |
| 8   | Performance: Error() allocation optimization with strings.Builder | status docs | 15min  | **Won't do** — 228ns cold path           |
| 9   | Consider renaming ReasonIncludePattern to ReasonNotInScope        | status docs | 10min  | **Won't do** — breaking rename, cosmetic |

## Website (Separate Concern)

| #   | Task                                | Source      | Effort |
| --- | ----------------------------------- | ----------- | ------ |
| 10  | Run Lighthouse audit and fix issues | status docs | 60min  |
| 11  | Add custom 404 page                 | status docs | 30min  |

## ✅ Completed

All items below verified as DONE by reading actual source code:

- [x] **Tag v0.1.0 release** — tags v0.1.0, v0.2.0, v2.1.0 all exist
- [x] **Expose filtered file paths in FilterStats** — `FilteredFiles(reason) []string` in `metrics.go`
- [x] **SQLC config v1 format tested** — verifies v1 parses but returns zero output dirs (`sqlc_test.go`)
- [x] **Cross-platform path testing** — forward slash and backslash detection (`pattern_test.go`)
- [x] **BDD/ginkgo tests for user-facing behaviors** — `bdd_test.go` (38 specs)

- [x] Two-phase detection (filename then content) — `detection.go`
- [x] Functional options API — `filter.go` NewFilter
- [x] Filter immutable after construction — `filter.go`
- [x] FilterAll expansion via optionsMap — `filter.go`, `detection.go`
- [x] ShouldFilter returns (bool, error) — `filter.go:137`
- [x] MustFilter panic-on-error variant — `filter.go:153`
- [x] MustFilter panic path tested — `filter_edge_test.go`
- [x] Filter.IsEnabled() — `filter.go:119`
- [x] Filter.FilterReasons() — `filter.go:125`
- [x] Filter.String() — `filter.go:256`
- [x] FilterStats.String() — `metrics.go:119`
- [x] map[FilterOption]struct{} replaces bool — `filter.go`
- [x] Include patterns restrict-scope semantics documented — `filter.go` godoc, README
- [x] Exclude patterns documented — README
- [x] Pattern matching with doublestar/v4 — `pattern.go`
- [x] DetectReason variadic FilterOption — `detection.go:232`
- [x] DetectReasonReader from io.Reader — `detection.go:240`
- [x] Individual Is\*Generated functions (11) — `detection.go`
- [x] MatchesSQLCFilename — `detection.go`
- [x] HasSQLCContent / HasSQLCCodePatterns — `detection.go`
- [x] SQLC config discovery (OS + fs.FS) — `sqlc.go`
- [x] Detector table with explicit option/reason pairing — `detection.go`
- [x] AllFilterOptions derived from table — `types.go`
- [x] AllFilterReasons derived from table — `types.go`
- [x] FilterOption.IsValid derived from table — `types.go`
- [x] FilterReason.IsValid derived from table — `types.go`
- [x] FilterOption.Reason() — `types.go`
- [x] Phantom types (5) with String() — `phantom.go`
- [x] Branded errors [gogenfilter:code] — `errors.go`
- [x] 7 error codes + sentinel errors — `errors.go`
- [x] errorCodeDefs single source of truth — `errors.go`
- [x] CodeEqual[T] generic — `errors.go`
- [x] ErrorCoder / Helper interfaces — `errors.go`
- [x] SQLC error constructors with phantom types — `sqlc.go`
- [x] Thread-safe metrics with RWMutex — `metrics.go`
- [x] MetricsMixin encapsulation (unexported filteredByReason) — `metrics.go`
- [x] Nil-safe metrics — `metrics.go`
- [x] FindProjectRoot with depth limit — `project.go`
- [x] slog dependency removed entirely — verified no imports
- [x] sqlcConfigError bridge removed — verified
- [x] Validatable renamed to validatable — `types.go`
- [x] Label phantom type removed — verified
- [x] sqlcFilenamePatterns package-level var — `detection.go:61`
- [x] needsContentCheck guard documented — `detection.go`
- [x] Table-driven tests throughout — all \_test.go files
- [x] Parallel tests (t.Parallel) — all \_test.go files
- [x] Fuzz tests — `fuzz_test.go`
- [x] Property-based tests — `property_test.go`
- [x] Benchmark tests — `bench_test.go`, `errors_bench_test.go`
- [x] Benchmark CodeHelp() — `errors_bench_test.go` (4.9ns, zero alloc)
- [x] Concurrent tests — `filter_concurrent_test.go`
- [x] Edge case tests — `filter_edge_test.go`
- [x] Integration tests with real fixtures — `integration_test.go`, `testdata/`
- [x] Runnable examples (19) — `example_test.go`
- [x] Error handling examples (errors.Is, ErrorCode, Help, CodeHelp, AllErrorCodes) — `example_test.go`
- [x] Generic test helpers — `helpers_test.go`
- [x] Filter.String() tests — `filter_test.go`
- [x] BDD tests with ginkgo — `bdd_test.go`
- [x] Self-host Google Fonts — Astro font provider in `astro.config.mjs`
- [x] Analytics (Plausible) — `LandingLayout.astro` with preconnect
- [x] Starlight logo is SVG throughout — `Logo.astro`, `public/logo.svg`
- [x] GitHub Actions CI (test, race, lint, coverage, bench) — `.github/workflows/ci.yml`
- [x] Benchmarks run in CI — `ci.yml` bench step
- [x] golangci-lint v2 configured — `.golangci.yaml`
- [x] Coverage threshold 95% — CI workflow
- [x] Package-level godoc — `types.go`
- [x] CHANGELOG.md updated — comprehensive [Unreleased] section
- [x] Public API documented in README (Filter API, error handling, SQLC discovery, DetectReasonReader)
- [x] API stability statement in README (pre-v1.0.0 policy)
- [x] .editorconfig added
- [x] Architecture diagrams created — `docs/architecture-understanding/`
- [x] Features audit completed — `FEATURES.md`
