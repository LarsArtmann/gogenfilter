# TODO List

**Generated:** 2026-04-08
**Updated:** 2026-04-17
**Files Processed:** 26

## 🟡 MEDIUM Priority

- [ ] Update CHANGELOG.md with session work under [Unreleased] (source: 2026-04-08_23-06_comprehensive-project-status.md:F.7)
- [ ] Resolve include patterns bypassing generated-code detection design issue (source: filter.go:72)
- [ ] Performance profile and optimize hot paths (source: 2026-04-08_23-06_comprehensive-project-status.md:F.23)
- [ ] Document `**` pattern matching syntax in README
- [ ] Add `go test -race` to CI
- [ ] Add coverage threshold to CI
- [ ] Add `golangci-lint` to CI
- [ ] Add `//nolint` comments for known false-positive linter warnings (testpackage, depguard)
- [ ] Export or unexport `MetricsMixin.filteredByReason` consistently

## 🟢 LOW Priority

- [ ] Remove or document !needsContentCheck dead branch in DetectReason (source: detection.go:188)
- [ ] Document API stability guarantees / Go module lifecycle (source: 2026-04-08_23-06_comprehensive-project-status.md:F.19)
- [ ] Consider //go:generate for detector table generation (source: 2026-04-08_23-06_comprehensive-project-status.md:F.24)
- [ ] Add FilteredBy() examples to example_test.go (source: 2026-04-08_23-06_comprehensive-project-status.md:F.15)
- [ ] Add Metrics usage examples (source: 2026-04-08_23-06_comprehensive-project-status.md:F.16)
- [ ] Add Codecov or similar coverage tracking (source: 2026-04-08_23-06_comprehensive-project-status.md:F.21)
- [ ] Evaluate filepath.WalkDir vs current approach for project scanning (source: 2026-04-08_23-06_comprehensive-project-status.md:F.25)
- [ ] Tag v0.1.0 release

## ✅ Completed

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
- [x] Add package-level Go doc for godoc.org readiness → `doc.go`
- [x] Test against real-world generated files for integration testing → `testdata/`
