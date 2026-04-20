# gogenfilter — Comprehensive API Review & Project Status

**Date:** 2026-04-17 13:41
**Session Focus:** Full API audit — GOOD/BAD/UGLY analysis with actionable improvements
**Test Status:** ALL PASS (93.1% coverage, race detector clean)

---

## A. Fully Done

### Core Library (Production-Ready)

- **Two-phase detection engine** (`detection.go`): Filename-first (zero I/O) → content-based. Table-driven `detectors` slice is clean, ordered, extensible.
- **7 generator detectors**: sqlc, templ, go-enum, protobuf, mockgen, stringer, generic fallback. All with filename + content heuristics.
- **Phantom type system** (`phantom.go`): `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked` — strong compile-time domain separation.
- **Error system** (`errors.go`): Branded `[gogenfilter:...]` prefix, sentinel errors with `errors.Is`/`errors.As`, `ErrorCode()` programmatic matching, `Help()` user guidance, proper `Unwrap()` chains.
- **fs.FS abstraction**: `WithFS()`, `FindSQLCConfigsFS`, `GetSQLOutputDirsFS`, `parseSQLCConfigFS` — full testability via `fstest.MapFS`.
- **Thread-safe metrics** (`metrics.go`): `sync.RWMutex`, snapshot cloning, `FilteredBy()`, `TotalFiltered()`, `String()` formatting.
- **Pattern matching** (`pattern.go`): `*`, `**`, `?` glob support with sentinel-based doublestar expansion. Cross-platform path normalization.
- **SQLC config discovery** (`sqlc.go`): Walk directories, parse YAML, extract output dirs. Parent directory search. Dot-dir/vendor/node_modules skipping.
- **Project root finder** (`project.go`): Marker-based upward search with depth limit. Proper error codes.

### Test Suite (Comprehensive)

- **Unit tests**: Every exported function covered. Table-driven throughout.
- **Fuzz tests** (`fuzz_test.go`): `FuzzMatchPattern`, `FuzzDetectReason` with seed corpora.
- **Property-based tests** (`property_test.go`): Idempotency, disabled filter, include/exclude pattern invariants via `testing/quick`.
- **Benchmarks** (`bench_test.go`): `ShouldFilter`, `DetectReason`, all `Is*Generated` functions, `MatchPattern` variants.
- **Example tests** (`example_test.go`): 9 runnable examples covering `NewFilter`, `DetectReason`, `MatchPattern`, `IsValid`, `AllFilter*`.
- **93.1% statement coverage**, race detector clean.

### Documentation & Tooling

- **README.md**: Installation, quick start, detection functions, filter options, patterns, SQLC config, metrics, filter reasons. Markdown tables.
- **AGENTS.md**: Project-specific commands, testing patterns, linting config.
- **Justfile**: test, test-race, lint, coverage, coverage-html, structure-lint, fmt, tidy, build, clean, ci, linecounts.
- **golangci-lint** configured.

---

## B. Partially Done

- **Test package convention**: `example_test.go` uses external test package (`gogenfilter_test`), but all other test files use internal package (`gogenfilter`) — inconsistent. The `testpackage` linter warns about this. Internal tests were chosen to access unexported fields for assertion, which is pragmatic but couples tests to implementation.
- **Linter configuration**: `depguard` warnings for `go-faster/yaml` import — the rule should either allow it or the dependency should be documented as an intentional exception.
- **TODO_LIST.md**: Exists but is dated (2026-04-15). Several items completed, several new items from this review not yet tracked.

---

## C. Not Started

These are the actionable improvements identified in this API audit:

1. **`DetectReason` should accept `...FilterOption` variadic** instead of `map[FilterOption]bool` — currently every caller must hand-construct a map.
2. **Replace positional `bool` in `NewFilter(enabled bool, opts)`** with functional options or a cleaner API — `true`/`false` at call sites is unreadable.
3. **Thread-safety of `Filter` struct** — `ShouldFilter` reads/writes `options`, `includePatterns`, `excludePatterns` without synchronization. If shared across goroutines, this is a data race.
4. **Remove dead `Label` phantom type** (`phantom.go:20`) — defined but never used anywhere.
5. **Rename `matchAnyWith`** to `anyMatch` or `containsFunc` — current name is misleading.
6. **Unify `detectReason` (private) and `DetectReason` (public)** — near-identical logic with different signatures, clear DRY violation.
7. **Remove `stringFrom[T ~string]` generic** — overengineered for a simple `string()` conversion used 4 times.
8. **Make `MetricsMixin.filteredByReason` consistently exported or fully internal** — half-exported pattern is confusing.
9. **`FilterOption.Reason()` coupling** — relies on FilterOption and FilterReason sharing identical string values. Adding one without the other silently creates invalid values.
10. **`ShouldFilter` silently swallows I/O errors** — `fs.ReadFile` failure returns `ReasonNotFiltered`, indistinguishable from "not generated".
11. **`FilterAll` silently expands** — no way to query back that "all" was the original intent.

---

## D. Totally Fucked Up

Nothing is broken. All tests pass, race detector clean, 93.1% coverage, `go vet` clean.

The closest to "fucked up" is the **thread-safety issue** (#3 above): if a consumer creates a `Filter` and calls `ShouldFilter` from multiple goroutines (e.g., a parallel linter), they'll get a data race on `f.options` map reads. The metrics are thread-safe, but the filter itself is not. This is a latent bug waiting to bite.

---

## E. What We Should Improve (Priority-Ordered)

### HIGH — API Design (Breaking Changes, Do Before v1.0)

| #   | Issue                                                                 | File               | Impact                        |
| --- | --------------------------------------------------------------------- | ------------------ | ----------------------------- |
| 1   | `DetectReason` takes `map[FilterOption]bool`                          | `detection.go:193` | Every caller must build a map |
| 2   | `NewFilter(true, opts)` positional bool                               | `filter.go:22`     | Unreadable at call site       |
| 3   | Filter not thread-safe                                                | `filter.go:84-168` | Latent data race              |
| 4   | `WithIncludePatterns`/`WithExcludePatterns` mutate after construction | `filter.go:63-69`  | Unsafe if shared              |

### MEDIUM — Code Quality (Non-Breaking)

| #   | Issue                                     | File                   | Impact                  |
| --- | ----------------------------------------- | ---------------------- | ----------------------- |
| 5   | Dead `Label` phantom type                 | `phantom.go:20`        | Dead code               |
| 6   | `matchAnyWith` misleading name            | `detection.go:82`      | Readability             |
| 7   | `MetricsMixin` half-exported field        | `metrics.go:12-15`     | Confusing API           |
| 8   | `stringFrom[T ~string]` overengineered    | `types.go:15`          | Unnecessary abstraction |
| 9   | `detectReason`/`DetectReason` duplication | `detection.go:193,207` | DRY violation           |
| 10  | `FilterOption.Reason()` silent coupling   | `types.go:27`          | Fragile                 |

### LOW — Polish

| #   | Issue                                     | File                   | Impact                  |
| --- | ----------------------------------------- | ---------------------- | ----------------------- |
| 11  | I/O errors silently become "not filtered" | `detection.go:217-219` | Silent failures         |
| 12  | `FilterAll` expansion not queryable       | `filter.go:33-38`      | Lost intent             |
| 13  | Inconsistent test package convention      | `*_test.go`            | testpackage linter      |
| 14  | depguard config needs yaml exception      | `.golangci.yaml`       | False-positive warnings |

---

## F. Top 25 Things to Do Next

### Phase 1: API Cleanup (Pre-v1.0 Breaking Changes)

1. **Refactor `DetectReason` to accept variadic `...FilterOption`** — add `DetectReason(filePath, content string, opts ...FilterOption)` that builds the map internally. Keep old signature as deprecated wrapper.
2. **Replace `NewFilter(enabled bool, opts)` with functional options** — `NewFilter(opts ...FilterOption)` with `Enabled()` and `Disabled()` option constructors, or `NewFilter(opts []FilterOption, options ...FilterConfig)`.
3. **Make `Filter` immutable after construction** — move `WithIncludePatterns`/`WithExcludePatterns`/`WithFS` into the constructor. Return new instances instead of mutating. This fixes thread-safety.
4. **Add `FilterOption.IsValid()` enforcement in `NewFilter`** — reject unknown options early.
5. **Remove dead `Label` phantom type** from `phantom.go`.

### Phase 2: Code Quality

6. **Rename `matchAnyWith` → `anyMatch`** in `detection.go`.
7. **Remove `stringFrom[T ~string]` generic** — use plain `string()` conversions.
8. **Unify `detectReason` and `DetectReason`** — extract shared core, differ only in content source.
9. **Make `MetricsMixin.filteredByReason` consistently exported** — either `FilteredByReason` or keep unexported but add clear doc.
10. **Add `FilterReasons() []FilterReason` method to `Filter`** — return which reasons are being filtered, preserving `FilterAll` intent.
11. **Consider returning `(FilterReason, error)` from `ShouldFilter`** — distinguish "not generated" from "couldn't read file".
12. **Fix depguard config** to allow `go-faster/yaml` in `sqlc.go`.

### Phase 3: Test Improvements

13. **Migrate internal tests to external test package** — use `gogenfilter_test` everywhere except where explicitly testing unexported helpers. Add exported assertion methods where needed.
14. **Add integration tests with real-world generated files** — check in actual sqlc/templ/protobuf output as testdata.
15. **Add concurrent `ShouldFilter` test** — verify thread-safety after refactor.
16. **Add `ShouldFilter` edge case tests** — empty path, path with spaces, unicode filenames, very long filenames.
17. **Add `Filter.String()` tests** — verify all code paths of the String method.
18. **Test SQLC config v1 format** — current tests only cover v2.

### Phase 4: Detection Engine

19. **Add detector for `oapi-codegen`** — increasingly common in Go API projects.
20. **Add detector for `deepcopy-gen`** — Kubernetes ecosystem.
21. **Add detector for `wire`** (google/wire dependency injection).
22. **Add detector for `moq`** — popular Go mocking tool.
23. **Support `//go:build ignore` as a filter option** — files with this tag are often generated scaffolding.

### Phase 5: Project Infrastructure

24. **Add GitHub Actions CI** — test, race, lint, coverage on push/PR.
25. **Update TODO_LIST.md** — reflect all items from this review, mark completed items.

---

## G. Top #1 Question I Cannot Figure Out Myself

**Should this library target v1.0 API stability, or is it still in "iterate freely" mode?**

The current API has several design choices that would be breaking to fix (positional `bool` in `NewFilter`, `map[FilterOption]bool` in `DetectReason`, mutable `With*` methods). If we're pre-v1.0, we should fix all of them in one coordinated breaking-change pass. If we're post-v1.0, we need a v2 migration plan with deprecated wrappers.

The `go.mod` says `v0.0.0` implicitly (no version tag), and there's no `CHANGELOG.md` entries for a v1.0 release. I'd recommend we treat this as pre-v1.0 and do the breaking changes now — but that's the owner's call.

---

## Metrics Summary

| Metric                  | Value                |
| ----------------------- | -------------------- |
| Source files            | 9 (`.go`, non-test)  |
| Test files              | 14 (`*_test.go`)     |
| Total lines             | 5,031                |
| Source lines (non-test) | ~1,661               |
| Test lines              | ~3,370               |
| Test-to-source ratio    | 2.0x                 |
| Statement coverage      | 93.1%                |
| Race detector           | Clean                |
| `go vet`                | Clean                |
| External dependencies   | 1 (`go-faster/yaml`) |
| Exported types          | 16                   |
| Exported functions      | 42                   |
| Sentinel errors         | 7                    |
| Phantom types           | 5 (1 unused)         |
| Generator detectors     | 7                    |

---

_Generated by comprehensive API audit session — 2026-04-17_
