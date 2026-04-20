# TODO List

**Generated:** 2026-04-08
**Updated:** 2026-04-20
**Files Processed:** 26

## 🟡 MEDIUM Priority

- [ ] Resolve include patterns bypassing generated-code detection design issue (source: filter.go:72)
- [ ] Performance profile and optimize hot paths (source: 2026-04-08_23-06_comprehensive-project-status.md:F.23)
- [ ] Document API stability guarantees / Go module lifecycle (source: 2026-04-08_23-06_comprehensive-project-status.md:F.19)
- [ ] Consider //go:generate for detector table generation (source: 2026-04-08_23-06_comprehensive-project-status.md:F.24)
- [ ] Add Codecov or similar coverage tracking (source: 2026-04-08_23-06_comprehensive-project-status.md:F.21)
- [ ] Evaluate filepath.WalkDir vs current approach for project scanning (source: 2026-04-08_23-06_comprehensive-project-status.md:F.25)
- [ ] Tag v0.1.0 release

## 🟢 LOW Priority

_(all items below are nice-to-haves for post-v0.1.0)_

## ✅ Completed

- [x] Unexport `Validatable` interface → `validatable` in `types.go`
- [x] Remove `sqlcConfigError()` bridge function — all callers use `newSQLCConfigError` with phantom types
- [x] Add phantom type `String()` methods and tests → `phantom.go`, `phantom_test.go`
- [x] Cache SQLC filename patterns as package-level var → `detection.go`
- [x] Document `FilterOption.Reason()` string-value invariant → `types.go`
- [x] Document `!needsContentCheck` branch as I/O optimization guard → `detection.go`
- [x] Document include patterns "restrict scope" semantics → `filter.go` godoc, `README.md`
- [x] Add examples for ShouldFilter, WithFS, WithIncludePatterns, Metrics, MustShouldFilter, DetectReasonReader → `example_test.go`
- [x] Unexport `Metrics.filteredFiles` to prevent data race → `metrics.go`
- [x] Remove stale slog references from sqlc.go godoc
- [x] Update CHANGELOG.md with session work under [Unreleased]
- [x] Consider io/fs.FS abstraction for testability → `WithFS()`, `FindSQLCConfigsFS`, `GetSQLOutputDirsFS`
- [x] Add String() method to FilterStats for debugging → `metrics.go`
- [x] Add String() method to Filter for debugging filter state → `filter.go`
- [x] Add benchmark tests for MatchPattern, ShouldFilter, DetectReason → `bench_test.go`
- [x] Add fuzz tests for FuzzMatchPattern and FuzzDetectReason → `fuzz_test.go`
- [x] Add property-based tests for pattern matching invariants → `property_test.go`
- [x] Replace \x00 sentinel with cleaner expansion in pattern matching → `doublestarSentinel` constant in `pattern.go`
- [x] Test Stringer vs Generic detector priority when both enabled via FilterAll → implicit in detector ordering, explicit comment at `detection.go:19`
- [x] Add GitHub Actions CI workflow for test, lint, and coverage → `.github/workflows/ci.yml`
- [x] Extract FilterReason ↔ FilterOption relationship into explicit mapping → `detector.reason` field in `detection.go`
- [x] Expand detector list → oapi-codegen, deepcopy-gen, wire, moq added to `detection.go`
- [x] Functional options API → `NewFilter(Enabled(), WithFilterOptions(FilterAll), ...)`
- [x] ShouldFilter returns `(bool, error)` for I/O failures → `filter.go`
- [x] Add MustShouldFilter convenience method → `filter.go`
- [x] Add concurrent ShouldFilter thread-safety test → `filter_test.go`
- [x] Add ShouldFilter edge case tests (empty path, unicode, spaces, long names) → `filter_test.go`
- [x] Add Filter.String() comprehensive tests → `filter_test.go`
- [x] Add FilterReasons() method → `filter.go`
- [x] Add FilterOption.IsValid() enforcement in NewFilter → `filter.go`
- [x] Fix leaky fs.FS abstraction (remove os.ReadFile fallback) → `detection.go`
- [x] Fix README metrics bug (TotalFilesChecked) → `README.md`
- [x] Replace map[FilterOption]bool with map[FilterOption]struct{} → `filter.go`
- [x] Derive IsValid() from AllFilterOptions/AllFilterReasons → `types.go`
- [x] Derive AllErrorCodes()/helpText from single errorCodeDefs table → `errors.go`
- [x] Consolidate sqlc patterns into consuming functions → `detection.go`
- [x] Consolidate WithFilterOptions FilterAll expansion with optionsMap → `filter.go`
- [x] Fix benchmarks to use fstest.MapFS → `bench_test.go`
- [x] Add io.Reader detection API (DetectReasonReader) → `detection.go`
- [x] Remove slog dependency from library → `sqlc.go`
- [x] Add error code derivation tests → `errors_test.go`
- [x] Add integration test fixtures from real tools → `testdata/`, `integration_test.go`
- [x] Replace slog.Warn with configurable logger or return warnings → removed entirely
- [x] Add package-level Go doc for godoc.org readiness → `types.go`
- [x] Test against real-world generated files for integration testing → `testdata/`
- [x] Document `**` pattern matching syntax in README
- [x] Add `go test -race` to CI
- [x] Add coverage threshold to CI (95%)
- [x] Add `golangci-lint` to CI
- [x] Add `//nolint` comments for known false-positive linter warnings (testpackage, depguard)
- [x] Replace hand-rolled glob matching with doublestar/v4 → `pattern.go`
- [x] Configure golangci-lint v2 with proper test-file exclusions (testpackage, funlen, gocognit, cyclop) → `.golangci.yaml`
- [x] Remove all unused `//nolint` directives from test files → 15 `*_test.go` files
- [x] Fix CHANGELOG contradictions with current codebase → `CHANGELOG.md`
- [x] Replace proprietary LICENSE with MIT to match README → `LICENSE`
- [x] Replace `extraReasonsCount` magic number with named `nonDetectorReasons` const → `types.go`
- [x] Evaluate sqlc error constructor consolidation — kept named wrappers for readability → `sqlc.go`
- [x] Document MetricsMixin.filteredByReason encapsulation design → `metrics.go`
- [x] Add .editorconfig for consistent formatting
- [x] Add BenchmarkDetectReasonReader → `bench_test.go`
- [x] Add MatchPattern edge case tests → `pattern_test.go`
- [x] Fix all golangci-lint warnings (zero remaining)
