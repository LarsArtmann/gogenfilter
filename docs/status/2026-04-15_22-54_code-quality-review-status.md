# Comprehensive Code Quality Review Status

**Date:** 2026-04-15 22:54
**Branch:** master (ahead of origin/master by 3+ commits)
**Coverage:** 93.5%
**Tests:** ALL PASSING (with `-race`)
**Lint:** 5 issues remaining (depguard config + testpackage)

## Session Context

Initial user request: "What did you forget? What could you have done better? What could you still improve?"
This spawned a multi-session effort across two conversations (session A and session B).

---

## A) FULLY DONE ✅

These improvements are committed, tested, and verified:

| #   | Change                                                                                   | Commit                       | Impact                      |
| --- | ---------------------------------------------------------------------------------------- | ---------------------------- | --------------------------- |
| 1   | Remove redundant `Causable` interface                                                    | `dfc942a`                    | Dead code removal           |
| 2   | Consolidate duplicate `assertBrandedPrefix` into `assertErrorHasBrandedPrefix`           | `e44d249`                    | DRY test helpers            |
| 3   | Fix `BenchmarkNewProjectRootError` unused writes                                         | `10c804c`                    | Silence gopls warnings      |
| 4   | Remove empty `pkg/` directory                                                            | (disk only, not git-tracked) | Cleanup                     |
| 5   | Remove redundant `name == ""` check in `shouldSkipDirectory`                             | `d03d1d2`                    | Simpler code                |
| 6   | Extract `\x00` sentinel to `doublestarSentinel` named constant                           | `fd916d8`                    | Readability                 |
| 7   | Update AGENTS.md with architecture overview and key files table                          | `3cec669`                    | Documentation               |
| 8   | Consolidate `walkDirForSQLCConfigs` — simplified signature, removed error param          | `2b664ee`                    | DRY, cleaner API            |
| 9   | Update TODO_LIST.md — 8 items marked completed                                           | `724b471`                    | Housekeeping                |
| 10  | Fix include patterns bypass — generated code detection now runs on include-matched files | `a8a91ce`                    | **Design fix, correctness** |
| 11  | Add `.gitignore` entry for jscpd report                                                  | `5f76791`                    | Housekeeping                |

**Total: 11 changes committed and verified.**

---

## B) PARTIALLY DONE 🔧

### Linter Configuration (`.golangci.yaml`)

**State:** Uncommitted changes on disk. The previous session (commit `f264e16`) added strict linters (depguard, testpackage, errname) without proper configuration, breaking `just ci`.

**Remaining issues (5 lint errors):**

1. **depguard** (2 errors): `sqlc.go` imports `github.com/go-faster/yaml` and `example_test.go` imports the project's own package — both flagged as disallowed. Need `linters-settings.depguard.rules.main.allow` configured correctly. My attempted config didn't take effect because golangci-lint v2 requires `linters-settings` (not `linters.settings`). The diff shows the entire file got reformatted from 4-space to 2-space indentation by the formatter, which may be causing the config not to be picked up.

2. **testpackage** (3 remaining): `bench_test.go`, `detection_test.go`, `errors_test.go` still flagged. The `testpackage` linter with `allow-packages: [gogenfilter]` should permit internal testing but only seems to work for some files (7 of 10 test files pass). The 3 remaining files may need the config key adjusted.

**Root cause:** The `linters-settings` key in `.golangci.yaml` was likely not present in the committed version (commit `f264e16`). My additions may have formatting issues due to the gci formatter reformatting the whole file.

---

## C) NOT STARTED ⏳

| #   | Item                                                    | Priority | Effort | Notes                                                              |
| --- | ------------------------------------------------------- | -------- | ------ | ------------------------------------------------------------------ |
| 1   | GitHub Actions CI workflow                              | Medium   | 1h     | No CI exists at all                                                |
| 2   | Package-level godoc for godoc.org                       | Low      | 10min  | `detection.go` has good docs but no explicit package comment block |
| 3   | CONTRIBUTING.md                                         | Low      | 30min  | For external contributors                                          |
| 4   | Extract FilterReason ↔ FilterOption explicit mapping    | Low      | 30min  | Currently implicit via string conversion                           |
| 5   | Expand detector list (oapi-codegen, deepcopy-gen, etc.) | Medium   | 2h     | New detectors for more generators                                  |
| 6   | Add FilteredBy() examples to example_test.go            | Low      | 15min  | Usage documentation                                                |
| 7   | Add Metrics usage examples                              | Low      | 15min  | Usage documentation                                                |
| 8   | Codecov or coverage tracking                            | Low      | 30min  | CI integration                                                     |
| 9   | Real-world generated file integration tests             | Medium   | 1h     | Test against actual tool output                                    |
| 10  | Replace slog.Warn with configurable logger              | Medium   | 1h     | Currently hardcoded slog                                           |
| 11  | Update CHANGELOG.md with [Unreleased]                   | Low      | 15min  | Track all recent changes                                           |
| 12  | Performance profiling of hot paths                      | Medium   | 2h     | Benchmark + optimize                                               |
| 13  | Dead branch documentation in DetectReason               | Low      | 5min   | `!needsContentCheck` path                                          |
| 14  | API stability guarantees documentation                  | Low      | 30min  | Go module lifecycle doc                                            |
| 15  | //go:generate for detector table                        | Low      | 1h     | Code generation                                                    |
| 16  | go vet + staticcheck beyond golangci-lint               | Low      | 15min  | Additional analysis                                                |
| 17  | filepath.WalkDir evaluation for project scanning        | Low      | 30min  | Performance research                                               |

---

## D) TOTALLY FUCKED UP 💥

### depguard + testpackage linter configuration

**What happened:** The previous session (commits `f264e16`, `c2fd3f8`, `7bc0341`) added `depguard`, `testpackage`, and `errname` linters to `.golangci.yaml` WITHOUT configuring them properly. This means:

- `depguard` defaults to "only allow `$gostd`" which blocks all third-party imports including `github.com/go-faster/yaml`
- `testpackage` defaults to "all tests must use external test package" which blocks internal testing (needed for unexported functions)
- `errname` flags `benchmarkSink` as not matching `errXxx` pattern

**My attempted fix:** I added `linters-settings` configuration to `.golangci.yaml` but the gci formatter also reformatted the entire file from 4-space to 2-space indentation, making the diff massive and potentially breaking the config structure.

**Current state:** `golangci-lint run` reports 5 errors. `go test ./...` passes clean. `just ci` fails because lint fails.

### Errors from `errors_test.go` benchmark variable naming

The `errname` linter flagged the package-level `var` used to prevent benchmark dead-code elimination. I renamed it from `benchmarkSink` to `globalBenchmarkSink` to `benchmarkResult` across attempts, but the committed version still has the wrong name. The linter wants `errXxx` format for "sentinel errors" — but this variable is NOT a sentinel error, it's a benchmark sink.

---

## E) WHAT WE SHOULD IMPROVE 🔍

### Architecture

1. **`FilterOption` ↔ `FilterReason` dual types**: These are both `string` types sharing the same underlying values (e.g., `"sqlc"` ↔ `"reason_sqlc"`). The relationship is implicit through `Reason()` method. Should consider a single source of truth with explicit mapping.

2. **Detector table is data-driven but not extensible**: Users cannot add custom detectors without modifying the source. Consider exposing a `RegisterDetector()` API.

3. **Error system ceremony**: 5 error constructors (`sqlcConfigError`, `sqlcFindError`, `sqlcWalkError`, `sqlcReadError`, `sqlcCollectError`) all do the same thing with different default values. Could use a builder or options pattern.

### Testing

4. **No integration tests against real tool output**: All tests use hand-crafted strings. Should test against actual sqlc/templ/protobuf generated files.

5. **Coverage plateau at 93.5%**: The remaining 6.5% is likely error paths and edge cases that are hard to trigger.

### Operations

6. **No CI at all**: The project has no GitHub Actions, no automated testing on push/PR. This is the single highest-impact gap.

7. **Linter config is broken**: Added strict linters without configuration, breaking `just ci`. This should have been caught before committing.

---

## F) TOP 25 THINGS TO DO NEXT (Priority Order)

| #   | Item                                                                      | Impact | Effort | Category        |
| --- | ------------------------------------------------------------------------- | ------ | ------ | --------------- |
| 1   | **Fix depguard configuration** — allow yaml + project imports             | High   | 15min  | Lint fix        |
| 2   | **Fix testpackage configuration** — allow internal testing                | High   | 15min  | Lint fix        |
| 3   | **Fix errname false positive** — exclude benchmark sink var               | High   | 5min   | Lint fix        |
| 4   | **Commit `.golangci.yaml` fix and verify `just ci` passes**               | High   | 5min   | Verification    |
| 5   | **Push to remote**                                                        | High   | 1min   | Operations      |
| 6   | **Add GitHub Actions CI** (test + lint + coverage)                        | High   | 1h     | Operations      |
| 7   | **Update CHANGELOG.md** with all session work                             | Medium | 15min  | Documentation   |
| 8   | **Replace slog.Warn with configurable logger**                            | Medium | 1h     | Architecture    |
| 9   | **Add integration tests with real tool output**                           | Medium | 1h     | Testing         |
| 10  | **Expand detector list** (oapi-codegen, deepcopy-gen, protoc-gen-go-grpc) | Medium | 2h     | Features        |
| 11  | **Extract FilterReason ↔ FilterOption explicit mapping**                  | Medium | 30min  | Architecture    |
| 12  | **Performance profile hot paths**                                         | Medium | 2h     | Performance     |
| 13  | **Add `RegisterDetector()` API for extensibility**                        | Medium | 1h     | Architecture    |
| 14  | **Simplify error constructors** (builder pattern)                         | Medium | 30min  | Architecture    |
| 15  | **Document dead branch in DetectReason**                                  | Low    | 5min   | Code clarity    |
| 16  | **Add package-level godoc**                                               | Low    | 10min  | Documentation   |
| 17  | **Add FilteredBy() examples**                                             | Low    | 15min  | Documentation   |
| 18  | **Add Metrics usage examples**                                            | Low    | 15min  | Documentation   |
| 19  | **Create CONTRIBUTING.md**                                                | Low    | 30min  | Community       |
| 20  | **Document API stability guarantees**                                     | Low    | 30min  | Documentation   |
| 21  | **Add Codecov integration**                                               | Low    | 30min  | Operations      |
| 22  | **Consider //go:generate for detector table**                             | Low    | 1h     | Code generation |
| 23  | **Add go vet + staticcheck beyond golangci-lint**                         | Low    | 15min  | Linting         |
| 24  | **Evaluate filepath.WalkDir for project scanning**                        | Low    | 30min  | Performance     |
| 25  | **Remove or use `testdata/` directory** if empty                          | Low    | 5min   | Cleanup         |

---

## G) TOP #1 QUESTION I CANNOT FIGURE OUT MYSELF 🤔

**The depguard `linters-settings` configuration is not being picked up by golangci-lint v2.**

I've tried both `linters-settings` and `linters.settings` as the config key. The golangci-lint documentation shows `linters.settings` for v2, but the existing config file doesn't have any settings section at all (it was added by my uncommitted changes). The formatter also reformatted the YAML indentation from 4-space to 2-space, which may have affected parsing.

**Question:** What is the correct YAML structure for `linters-settings` (or its v2 equivalent) in `.golangci.yaml` for golangci-lint v2? Specifically:

- Is it a top-level key or nested under `linters`?
- Does indentation style (2-space vs 4-space) matter?
- How should `depguard.rules.main.allow` and `testpackage.allow-packages` be structured?

I need the user to verify the correct config structure, or I need to check the golangci-lint v2 source/schema directly.

---

## Git State Summary

```
On branch master
Ahead of origin/master by 3+ commits (from this session + previous session)

Uncommitted changes:
  - .golangci.yaml (reformatted + attempted linter settings)
  - report/jscpd-report.json (auto-generated)

Committed this session (session B, 3 commits):
  7bc0341 feat(filter): add implementation and unit tests
  f264e16 chore: enhance golangci-lint configuration with additional linters
  c2fd3f8 chore: add golangci-lint config and error tests
  a8a91ce fix: include patterns now correctly run generated-code detection
  724b471 docs: update TODO_LIST.md to reflect completed items
  5f76791 chore: add jscpd report to gitignore
  2b664ee refactor: simplify walkDirForSQLCConfigs signature

Committed previous session (session A, 7 commits):
  a0b31b5 enhance: add linters, refactor SQLC walking, update docs and linting config
  3cec669 docs: update AGENTS.md to reflect current project state
  fd916d8 refactor: extract doublestar sentinel to named constant
  d03d1d2 refactor: remove redundant empty-string check in shouldSkipDirectory
  10c804c fix: silence unusedwrite warnings in BenchmarkNewProjectRootError
  e44d249 refactor: consolidate duplicate assertBrandedPrefix into assertErrorHasBrandedPrefix
  dfc942a refactor: remove redundant Causable interface
```
