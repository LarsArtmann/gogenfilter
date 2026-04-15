# TODO List

**Generated:** 2026-04-08
**Updated:** 2026-04-15
**Files Processed:** 26

## 🟡 MEDIUM Priority

- [ ] Replace slog.Warn with configurable logger or return warnings (source: sqlc.go)
- [ ] Update CHANGELOG.md with session work under [Unreleased] (source: 2026-04-08_23-06_comprehensive-project-status.md:F.7)
- [ ] Resolve include patterns bypassing generated-code detection design issue (source: filter.go:72)
- [ ] Performance profile and optimize hot paths (source: 2026-04-08_23-06_comprehensive-project-status.md:F.23)

## 🟢 LOW Priority

- [ ] Remove or document !needsContentCheck dead branch in DetectReason (source: detection.go:188)
- [ ] Document API stability guarantees / Go module lifecycle (source: 2026-04-08_23-06_comprehensive-project-status.md:F.19)
- [ ] Consider //go:generate for detector table generation (source: 2026-04-08_23-06_comprehensive-project-status.md:F.24)

## ⚪ Unknown Priority

- [ ] Add GitHub Actions CI workflow for test, lint, and coverage (source: 2026-04-08_23-06_comprehensive-project-status.md:F.3)
- [ ] Add package-level Go doc for godoc.org readiness (source: 2026-04-08_23-06_comprehensive-project-status.md:F.6)
- [ ] Create CONTRIBUTING.md for external contributors (source: 2026-04-08_23-06_comprehensive-project-status.md:F.17)
- [ ] Extract FilterReason ↔ FilterOption relationship into explicit mapping (source: types.go)
- [ ] Expand detector list to include oapi-codegen, deepcopy-gen, protoc-gen-go-grpc (source: 2026-04-08_23-06_comprehensive-project-status.md:F.12)
- [ ] Add FilteredBy() examples to example_test.go (source: 2026-04-08_23-06_comprehensive-project-status.md:F.15)
- [ ] Add Metrics usage examples (source: 2026-04-08_23-06_comprehensive-project-status.md:F.16)
- [ ] Add go vet and staticcheck to CI beyond golangci-lint (source: 2026-04-08_23-06_comprehensive-project-status.md:F.18)
- [ ] Add Codecov or similar coverage tracking (source: 2026-04-08_23-06_comprehensive-project-status.md:F.21)
- [ ] Test against real-world generated files for integration testing (source: 2026-04-08_23-06_comprehensive-project-status.md:F.22)
- [ ] Evaluate filepath.WalkDir vs current approach for project scanning (source: 2026-04-08_23-06_comprehensive-project-status.md:F.25)

## ✅ Completed

- [x] Consider io/fs.FS abstraction for testability → `WithFS()`, `FindSQLCConfigsFS`, `GetSQLOutputDirsFS`
- [x] Add String() method to FilterStats for debugging → `metrics.go`
- [x] Add String() method to Filter for debugging filter state → `filter.go`
- [x] Add benchmark tests for MatchPattern, ShouldFilter, DetectReason → `bench_test.go`
- [x] Add fuzz tests for FuzzMatchPattern and FuzzDetectReason → `fuzz_test.go`
- [x] Add property-based tests for pattern matching invariants → `property_test.go`
- [x] Replace \x00 sentinel with cleaner expansion in pattern matching → `doublestarSentinel` constant in `pattern.go`
- [x] Test Stringer vs Generic detector priority when both enabled via FilterAll → implicit in detector ordering, explicit comment at `detection.go:19`
