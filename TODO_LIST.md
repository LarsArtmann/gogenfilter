# TODO List

**Generated:** 2026-04-08
**Files Processed:** 26

## 🟡 MEDIUM Priority

- [ ] Replace slog.Warn with configurable logger or return warnings (source: sqlc.go:168)
- [ ] Update CHANGELOG.md with session work under [Unreleased] (source: 2026-04-08_23-06_comprehensive-project-status.md:F.7)
- [ ] Resolve include patterns bypassing generated-code detection design issue (source: filter.go:72)
- [ ] Performance profile and optimize hot paths (source: 2026-04-08_23-06_comprehensive-project-status.md:F.23)

## 🟢 LOW Priority

- [ ] Remove or document !needsContentCheck dead branch in DetectReason (source: detection.go:188)
- [ ] Consider io/fs.FS abstraction for testability (source: 2026-04-08_23-06_comprehensive-project-status.md:F.13)
- [ ] Document API stability guarantees / Go module lifecycle (source: 2026-04-08_23-06_comprehensive-project-status.md:F.19)
- [ ] Consider //go:generate for detector table generation (source: 2026-04-08_23-06_comprehensive-project-status.md:F.24)

## ⚪ Unknown Priority

- [ ] Test Stringer vs Generic detector priority when both enabled via FilterAll (source: 2026-04-08_23-06_comprehensive-project-status.md:C.1)
- [ ] Add GitHub Actions CI workflow for test, lint, and coverage (source: 2026-04-08_23-06_comprehensive-project-status.md:F.3)
- [ ] Add String() method to FilterStats for debugging (source: 2026-04-08_23-06_comprehensive-project-status.md:E.10)
- [ ] Add String() method to Filter for debugging filter state (source: 2026-04-08_23-06_comprehensive-project-status.md:E.10)
- [ ] Add benchmark tests for MatchPattern, ShouldFilter, DetectReason (source: 2026-04-08_23-06_comprehensive-project-status.md:F.9)
- [ ] Add fuzz tests for FuzzMatchPattern and FuzzDetectReason (source: 2026-04-08_23-06_comprehensive-project-status.md:F.10)
- [ ] Add package-level Go doc for godoc.org readiness (source: 2026-04-08_23-06_comprehensive-project-status.md:F.6)
- [ ] Add property-based tests for pattern matching invariants (source: 2026-04-08_23-06_comprehensive-project-status.md:F.14)
- [ ] Create CONTRIBUTING.md for external contributors (source: 2026-04-08_23-06_comprehensive-project-status.md:F.17)
- [ ] Extract FilterReason ↔ FilterOption relationship into explicit mapping (source: types.go)
- [ ] Expand detector list to include oapi-codegen, deepcopy-gen, protoc-gen-go-grpc (source: 2026-04-08_23-06_comprehensive-project-status.md:F.12)
- [ ] Replace \x00 sentinel with cleaner expansion in pattern matching (source: pattern.go:38)
- [ ] Add FilteredBy() examples to example_test.go (source: 2026-04-08_23-06_comprehensive-project-status.md:F.15)
- [ ] Add Metrics usage examples (source: 2026-04-08_23-06_comprehensive-project-status.md:F.16)
- [ ] Add go vet and staticcheck to CI beyond golangci-lint (source: 2026-04-08_23-06_comprehensive-project-status.md:F.18)
- [ ] Add Codecov or similar coverage tracking (source: 2026-04-08_23-06_comprehensive-project-status.md:F.21)
- [ ] Test against real-world generated files for integration testing (source: 2026-04-08_23-06_comprehensive-project-status.md:F.22)
- [ ] Evaluate filepath.WalkDir vs current approach for project scanning (source: 2026-04-08_23-06_comprehensive-project-status.md:F.25)
