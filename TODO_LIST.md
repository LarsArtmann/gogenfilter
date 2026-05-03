# TODO List

**Generated:** 2026-05-03
**Updated:** 2026-05-03
**Files Processed:** All .md files in docs/ + TODO_LIST.md + CHANGELOG.md + README.md + FEATURES.md
**Verified Against:** Actual source code (all .go files)

## 🔴 HIGH Priority

| #   | Task                                                                                               | Source                                  | Effort |
| --- | -------------------------------------------------------------------------------------------------- | --------------------------------------- | ------ |
| 1   | Tag v0.1.0 release                                                                                 | TODO_LIST.md, planning/2026-04-08_21-26 | 5min   |
| 2   | Resolve include patterns design question — confirm "restrict scope" is the intended final behavior | TODO_LIST.md                            | 30min  |

## 🟡 MEDIUM Priority

| #   | Task                                                                                                                                                                                                                                                                          | Source                 | Effort |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ |
| 3   | Performance profile and optimize hot paths                                                                                                                                                                                                                                    | TODO_LIST.md           | 30min  |
| 4   | Add Codecov or similar coverage tracking                                                                                                                                                                                                                                      | TODO_LIST.md           | 15min  |
| 5   | Document API stability guarantees / Go module lifecycle                                                                                                                                                                                                                       | TODO_LIST.md           | 15min  |
| 6   | Consider `//go:generate` for detector table generation                                                                                                                                                                                                                        | TODO_LIST.md           | 45min  |
| 7   | Add `RegisterDetector()` API for custom detectors without forking                                                                                                                                                                                                             | status docs            | 60min  |
| 8   | Add `WalkAndFilter(dir string) map[string]FilterReason` bulk API                                                                                                                                                                                                              | code review 2026-05-03 | 30min  |
| 9   | Expose filtered file paths in FilterStats for debugging                                                                                                                                                                                                                       | code review 2026-05-03 | 15min  |
| 10  | Document undocumented public APIs in README (DetectReasonReader, MustShouldFilter, IsEnabled, FilterReasons, String methods, FindSQLCConfigsFS, GetSQLOutputDirsFS, FindProjectRoot, AllFilterOptions, AllFilterReasons, AllErrorCodes, CodeHelp, error types, phantom types) | README audit           | 30min  |
| 11  | Add BDD/ginkgo tests for user-facing behaviors                                                                                                                                                                                                                                | code review 2026-05-03 | 60min  |

## 🟢 LOW Priority

| #   | Task                                                              | Source      | Effort |
| --- | ----------------------------------------------------------------- | ----------- | ------ |
| 12  | Add `*.gen.go` filename heuristic for oapi-codegen detector       | code review | 10min  |
| 13  | Performance: Error() allocation optimization with strings.Builder | status docs | 15min  |
| 14  | Consider renaming ReasonIncludePattern to ReasonNotInScope        | status docs | 10min  |
| 15  | Cross-platform path testing (Windows-style paths)                 | status docs | 15min  |
| 16  | Test SQLC config v1 format (current tests only cover v2)          | status docs | 15min  |
| 17  | Add error handling examples (errors.Is, ErrorCode(), Help())      | status docs | 15min  |
| 18  | Benchmark CodeHelp() lookup                                       | status docs | 5min   |
| 19  | Add `go test -bench` to CI                                        | status docs | 10min  |

## Website (Separate Concern)

| #   | Task                                    | Source      | Effort |
| --- | --------------------------------------- | ----------- | ------ |
| 20  | Run Lighthouse audit and fix issues     | status docs | 60min  |
| 21  | Self-host Google Fonts                  | status docs | 30min  |
| 22  | Add analytics (Plausible/Umami)         | status docs | 30min  |
| 23  | Add custom 404 page                     | status docs | 30min  |
| 24  | Fix Starlight logo (PNG instead of SVG) | status docs | 15min  |

## ✅ Completed (2026-05-03 Verification)

All items below verified as DONE by reading actual source code:

- [x] Two-phase detection (filename then content) — `detection.go`
- [x] Functional options API — `filter.go` NewFilter
- [x] Filter immutable after construction — `filter.go`
- [x] FilterAll expansion via optionsMap — `filter.go`, `detection.go`
- [x] ShouldFilter returns (bool, error) — `filter.go:137`
- [x] MustShouldFilter panic-on-error variant — `filter.go:153`
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
- [x] Concurrent tests — `filter_concurrent_test.go`
- [x] Edge case tests — `filter_edge_test.go`
- [x] Integration tests with real fixtures — `integration_test.go`, `testdata/`
- [x] Runnable examples (12) — `example_test.go`
- [x] Generic test helpers — `helpers_test.go`
- [x] Filter.String() tests — `filter_test.go`
- [x] BDD tests with ginkgo — `bdd_test.go`
- [x] GitHub Actions CI (test, race, lint, coverage) — `.github/workflows/ci.yml`
- [x] golangci-lint v2 configured — `.golangci.yaml`
- [x] Coverage threshold 95% — CI workflow
- [x] Package-level godoc — `types.go`
- [x] CHANGELOG.md updated — comprehensive [Unreleased] section
- [x] .editorconfig added
- [x] Architecture diagrams created — `docs/architecture-understanding/`
- [x] Features audit completed — `FEATURES.md`
