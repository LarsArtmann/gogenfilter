# Comprehensive Project Status — 2025-04-05 07:15

## Executive Summary

gogenfilter is a Go library for detecting and filtering auto-generated code files.
The codebase is **healthy**: 91.4% test coverage, 0 lint issues, all tests pass with race detector.
However, there are meaningful architectural improvements available around type design, API surface, and performance.

---

## A) FULLY DONE

| Item | Detail |
|------|--------|
| Build compiles | `go build ./...` — clean |
| Tests pass (race) | `go test -count=1 -race ./...` — all green |
| Linter clean | `golangci-lint run` — 0 issues |
| Coverage | 91.4% of statements |
| Dead code removal | `pkg/errors/` removed, `hasGeneratedMarker`/`isGeneratedBy` inlined |
| Redundant `stringer` interface | Removed, types implement `fmt.Stringer` implicitly |
| `fileExists` bug fixed | `project.go` was calling undefined function |
| SQLC false positive bug fixed | `user_models.go` was incorrectly matched (used `Contains` instead of `==`) |
| Pattern matching rewritten | Proper `**` wildcard support, recursive segment matching |
| `modernize` lint fixes | `slices.Contains`, `slices.ContainsFunc` throughout |
| `err113` lint fixes | Test errors now wrap sentinel errors (`os.ErrPermission`, `os.ErrNotExist`) |
| `funlen` lint fixes | `TestMatchPattern`, `TestFindProjectRoot` split |
| `gci` formatting | Auto-fixed |
| Metrics docs fixed | `Record` comment, `TotalFiltered` simplified |
| New tests added | Error types, empty content, `DetectGenerated` with I/O, SQLC false positives, `**` patterns |

## B) PARTIALLY DONE

| Item | Status | What Remains |
|------|--------|--------------|
| API surface cleanup | Exports audited | `GetMetrics` is dead (0% coverage), `Metrics.Record` should be unexported, `DetectGenerated` is a redundant public wrapper |
| Type consolidation | Identified patterns | `contentCheck`/`filenameCheck` share fields, `matchesAnySuffix`/`matchesAnyContains` nearly identical |

## C) NOT STARTED

See section E and F below — these are the identified improvements not yet attempted.

## D) TOTALLY FUCKED UP

Nothing. No regressions, no broken state, no half-finished refactors.

---

## E) WHAT WE SHOULD IMPROVE

### Architecture / Type Model

1. **`FilterOption` and `FilterReason` are parallel string types** — They duplicate values (`FilterSQLC` = `"sqlc"`, `ReasonSQLC` = `"sqlc"`). If someone adds a new detector, they must update both. Consider a single `Generator` type with an `Option()` and `Reason()` method, or at least derive `FilterReason` from `FilterOption`.

2. **`contentCheck` and `filenameCheck` should be unified** — Both have `option FilterOption` + `reason FilterReason`. A single `detector` struct with optional filename/content check functions would eliminate the parallel arrays in `detection.go`.

3. **`MetricsMixin` exposes mutable map** — `FilteredByReason map[FilterReason]int` is public. If someone gets `Metrics` directly (not via `GetStats`), they can mutate internal state. Make it private with accessor methods.

4. **`detectGeneratedReason` does I/O** — It calls `os.ReadFile` internally, making it hard to test without real files. The content-based checks already accept `(filePath, content string)`. The I/O should be the caller's responsibility.

5. **`SQLCConfig`, `SQLCEngine`, `SQLCGenConfig`, `SQLCGoConfig` all exported** — These are YAML deserialization structs with no public consumers outside this package. Unexport them.

### Performance

6. **`sqlcFilePatterns()`, `sqlcCodePatterns()`, `contentChecks()`, `filenameChecks()`, `allSpecificOptions()` allocate on every call** — These return fresh slices. They should be package-level `var` (they're constant data). Called per-file during filtering.

7. **`os.ReadFile` called even when caller already has content** — `detectGeneratedReason` always reads from disk. No way to pass content in. For tools that already read the file, this is redundant I/O.

### API Design

8. **`Filter.options` uses `map[FilterOption]bool`** — A `set` would be more idiomatic. Or at minimum, callers must construct maps manually. Consider accepting `...FilterOption` variadic and building the set internally.

9. **`DetectGenerated` is a one-line wrapper over `detectGeneratedReason`** — Export the real function or remove the wrapper. Currently both exist: public API uses the wrapper, internal code uses the private version.

10. **`GetMetrics` returns `*Metrics` — 0% coverage, never called** — Dead code. Remove it, or provide a use case for it.

11. **`Filter` has no `IsEnabled()` accessor** — `enabled` field is private with no getter. Users can't check filter state.

12. **`Filter.WithIncludePatterns` appends, doesn't replace** — Named "With" implies setting, but it appends. This is a subtle API contract issue.

### Test Quality

13. **`shouldFilterWithIncludes` has 0% coverage** — The include-pattern code path is never tested with actual filtering logic.

14. **`GetMetrics` has 0% coverage** — Dead export, no test.

15. **`IsTemplGenerated` has 62.5% coverage** — Missing a test for the `Render(ctx context.Context, w io.Writer) error` code path.

16. **`HasSQLCContent` has 80% coverage** — Missing coverage for the `"sqlc " && "versions:"` path.

### Code Organization

17. **`fileExists` is in `project.go` but also used by `sqlc.go`** — Should be in a shared utility file or moved to where it's most relevant.

18. **`matchesAnySuffix` and `matchesAnyContains` are nearly identical** — A generic `matchAnyWith(fn)` would consolidate them.

19. **`SQLCConfigError` construction repeated 5 times** — A `newSQLCConfigError(op, cause)` helper would reduce boilerplate.

### Dependencies

20. **`github.com/go-faster/yaml` is the only external dep** — Consider if `gopkg.in/yaml.v3` (stdlib-adjacent) would be more appropriate, or if the performance of go-faster/yaml is needed.

### Missing Features / Robustness

21. **No `io/fs` support** — Everything works with OS paths. Can't filter from a virtual filesystem or embed. Would need `DetectGeneratedFS(fs fs.FS, path string)`.

22. **No concurrent safety on `Filter`** — `ShouldFilter` reads `options`, `enabled`, `patterns` without synchronization. If someone shares a `Filter` across goroutines and calls `WithIncludePatterns` concurrently, it races.

23. **`MatchPattern` doesn't handle `?` single-char wildcard** — `filepath.Match` supports `?` but our segment matcher doesn't.

24. **No way to add custom generators** — Users can't register new detector functions. Must modify the library.

25. **`FindSQLCConfigs` uses `filepath.Walk` which follows symlinks** — Could cause infinite loops with circular symlinks.

---

## F) TOP 25 THINGS TO DO NEXT

Sorted by: **Impact × (1 / Work)** — highest value first.

| # | Task | Impact | Work | File(s) | Notes |
|---|------|--------|------|---------|-------|
| 1 | Remove dead `GetMetrics()` export | High | Tiny | `filter.go` | 0% coverage, never called |
| 2 | Unexport `Metrics.Record()` | Medium | Tiny | `metrics.go` | Only called internally |
| 3 | Make table functions return `var` not `func` | Medium | Small | `detection.go` | Eliminates per-call allocation |
| 4 | Add test for `shouldFilterWithIncludes` (0% coverage) | High | Small | `gogenfilter_test.go` | Untested code path |
| 5 | Unify `contentCheck`/`filenameCheck` into single `detector` type | High | Small | `detection.go` | Eliminates parallel arrays |
| 6 | Remove redundant `DetectGenerated` wrapper, export `DetectGeneratedReason` | Medium | Small | `detection.go` | Clean public API |
| 7 | Add `IsEnabled()` method to `Filter` | Low | Tiny | `filter.go` | Missing accessor |
| 8 | Unexport `SQLCConfig`/`SQLCEngine`/`SQLCGenConfig`/`SQLCGoConfig` | Medium | Small | `sqlc.go` | No external consumers |
| 9 | Extract `fileExists` to shared utility file | Low | Tiny | new `utils.go` | Cross-file dependency |
| 10 | Consolidate `matchesAnySuffix`/`matchesAnyContains` | Low | Tiny | `detection.go` | Near-duplicate |
| 11 | Add `newSQLCConfigError` helper | Low | Tiny | `sqlc.go` | 5 repeated constructions |
| 12 | Add test for `IsTemplGenerated` Render path (62.5% → 100%) | Medium | Small | `gogenfilter_test.go` | Coverage gap |
| 13 | Add test for `HasSQLCContent` versions path (80% → 100%) | Medium | Small | `gogenfilter_test.go` | Coverage gap |
| 14 | Move I/O out of `detectGeneratedReason` — accept content | High | Medium | `detection.go` | Testability + performance |
| 15 | Derive `FilterReason` from `FilterOption` automatically | High | Medium | `types.go` | Eliminates parallel constant maintenance |
| 16 | Add `FilterOption` validation (reject unknown values) | Medium | Small | `filter.go` | Defensive programming |
| 17 | Document `WithIncludePatterns` appends (doesn't replace) | Low | Tiny | `filter.go` | API contract clarity |
| 18 | Make `MetricsMixin.FilteredByReason` private with accessor | Medium | Medium | `metrics.go` | Encapsulation |
| 19 | Add `io/fs.FS` support for `DetectGenerated` | High | Medium | new `detect_fs.go` | Enables embedded/virtual FS |
| 20 | Add mutex to `Filter` for concurrent safety | Medium | Small | `filter.go` | Prevent data races |
| 21 | Add custom generator registration API | High | Medium | new `registry.go` | Extensibility |
| 22 | Evaluate `gopkg.in/yaml.v3` vs `go-faster/yaml` | Low | Small | `go.mod` | Dependency philosophy |
| 23 | Handle `?` wildcard in `matchSegments` | Low | Small | `pattern.go` | Completeness |
| 24 | Use `filepath.WalkDir` instead of `filepath.Walk` in sqlc | Low | Tiny | `sqlc.go` | Slightly less allocation |
| 25 | Add `CHANGELOG.md` entry for all changes made today | Medium | Tiny | `CHANGELOG.md` | Documentation |

---

## G) TOP #1 QUESTION

**Should `FilterOption` and `FilterReason` be unified into a single type?**

Currently there are 7 `FilterOption` constants and 10 `FilterReason` constants (3 extra: `IncludePattern`, `ExcludePattern`, `NotFiltered`). They share the same underlying string values for the generator-specific ones.

Options:
- **A)** Single `Generator` type with `.Option()` / `.Reason()` — cleanest but breaks API
- **B)** Derive `FilterReason` from `FilterOption` via a method — backward compatible
- **C)** Keep parallel types but generate one from the other via `go:generate` — maintainability without runtime coupling

I'm leaning **B** but it affects the public API surface. Decision needed before implementation.

---

## Verification

```
$ go build ./...                              # ✅ Clean
$ go test -count=1 -race ./...                # ✅ All pass
$ golangci-lint run                           # ✅ 0 issues
$ go test -coverprofile=cov.out ./...         # ✅ 91.4% coverage
```
