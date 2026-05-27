# Analysis: `.gitignore`-Aware File Filtering for gogenfilter

**Date:** 2026-05-27
**Author:** Crush Reflection Mode

## What It Means

Adding `.gitignore` awareness to gogenfilter means: when a caller opts in, the filter checks whether a file path matches `.gitignore` rules in the directory hierarchy. If matched, the file is filtered with a new `ReasonGitignore`.

Example API:
```go
f, _ := gogenfilter.NewFilter(
    gogenfilter.WithFilterOptions(gogenfilter.FilterAll),
    gogenfilter.WithRespectGitignore(),
)
filtered, err := f.Filter("vendor/github.com/foo/bar.go") // true, ReasonGitignore
```

---

## PROs

| # | Argument | Weight |
|---|----------|--------|
| 1 | **Eliminates intent duplication** | High |
|    | Projects already express "skip these files" in `.gitignore`. Reusing it means users don't duplicate exclude patterns in filter config. | |
| 2 | **Zero-config correctness** | High |
|    | A linter using gogenfilter would automatically skip `/vendor/`, build artifacts, generated files not yet covered, IDE files — no manual patterns. | |
| 3 | **Git-native semantics** | Medium |
|    | Handles directory-level patterns, negation (`!`), glob precedence, and nested `.gitignore` files correctly. Far more powerful than manual glob patterns. | |
| 4 | **Aligns with user expectations** | Medium |
|    | "Of course it shouldn't analyze files ignored by git." Natural mental model. | |
| 5 | **Composable with existing options** | Low |
|    | Becomes one more functional option alongside `WithIncludePatterns`/`WithExcludePatterns`. Clean additive API. | |

---

## CONs

| # | Argument | Weight |
|---|----------|--------|
| 1 | **Dependency burden** | **Critical** |
|    | Requires a gitignore parsing library. The best option, `go-git/v6/plumbing/format/gitignore`, is part of an alpha release (`v6.0.0-alpha.4`). Adding it pulls ~20+ transitive deps. Current production deps: `doublestar/v4` (1 dep), `go-faster/yaml` (~5 deps). This is a 4x dependency explosion for one feature. | |
| 2 | **Scope creep — fundamental** | **Critical** |
|    | gogenfilter's purpose is "detect and filter *auto-generated* Go code." `.gitignore` is about "files git shouldn't track" — a much broader category that includes non-generated files (build artifacts, secrets, IDE configs). This blurs the library's identity from "generated code detector" to "general file filterer." | |
| 3 | **I/O amplification in hot path** | High |
|    | For every file filtered, `.gitignore` awareness requires walking up the directory tree, checking for `.gitignore` files, and parsing them. Currently `Filter()` does zero I/O until content-based detection needs it. Adding `.gitignore` adds filesystem I/O to the hot path. | |
| 4 | **Performance requires caching** | High |
|    | Without a `.gitignore` cache, `FilterPaths([]string{1000 files})` becomes pathological (O(n×depth) file I/O). A cache adds complexity: invalidation, thread-safety, scope boundaries. | |
| 5 | **Already solvable by caller** | Medium |
|    | `WithExcludePatterns("vendor/**", "**/testdata/**", "website/**")` handles 80%+ of cases. For the remaining 20%, callers can pre-filter with any gitignore library and pass the reduced list to gogenfilter. | |
| 6 | **Unstable dependency** | Medium |
|    | `go-git/v6` has no stable release. Pinning to alpha software in a library consumed by others is risky. `sabhiram/go-gitignore` exists but is unmaintained (2021). | |

---

## Effort Estimate

| Phase | Hours | Notes |
|-------|-------|-------|
| Dependency evaluation & add | 1 | Choose between alpha go-git v6, unmaintained sabhiram, or custom parser |
| Gitignore discovery logic | 3-4 | Walk tree up from file path, parse `.gitignore`, handle `.git/info/exclude`, global gitignore |
| Caching layer | 2-3 | Dir → parsed rules cache, thread-safe, FS-agnostic for `WithFS` |
| Filter API integration | 2-3 | New `WithRespectGitignore()` option, `ReasonGitignore`, `Trace` messages |
| Error type expansion | 1 | New error codes for gitignore parse/read failures |
| Test coverage (comprehensive) | 5-6 | Nested `.gitignore`, negation, precedence, global, malformed, cache, FS variants |
| Benchmark + regression | 2-3 | Ensure hot path doesn't regress, cache effectiveness |
| Documentation + website | 2-3 | FEATURES.md, API docs, Starlight docs, changelog |
| **Total** | **18-24 hours** | Conservative estimate for production-grade implementation |

---

## Option Matrix

| Option | Description | Effort | Risk | Benefit |
|--------|-------------|--------|------|---------|
| **A. Full implementation** | Add `WithRespectGitignore()`, dependency, cache, tests, docs | 18-24h | **High** (alpha dep, scope creep, perf) | Complete feature |
| **B. Document the pattern** | Add a docs recipe showing how to pre-filter with go-git before gogenfilter | 2-3h | **None** | Users can DIY, zero maint burden |
| **C. Reject** | Close as out of scope | 0h | **None** | Library stays focused |

---

## Recommendation: Option B

**Why not A:**
1. The cost-to-benefit ratio is poor. 18-24 hours, alpha dependency, performance complexity, and scope dilution — for a feature that overlaps with `WithExcludePatterns` and can be handled upstream.
2. `.gitignore` filtering is conceptually a *pre-processing* concern. The Unix way: compose tools. Caller uses a gitignore library to build a whitelist, then passes to gogenfilter for generated-code detection.
3. gogenfilter's identity is "generated Go code detector." Adding general file filtering blurs that identity.

**Why B over C:**
Users *will* want this integration. A documented recipe in the guides tells them how to compose gogenfilter with any gitignore library. This adds value without adding code.

---

## Implementation Sketch (If User Overrides to A)

If the decision is to implement, the path would be:

1. **Dependency:** Pin `sabhiram/go-gitignore` (simpler API, no transitive deps despite maintenance status) or write a minimal parser from the [gitignore spec](https://git-scm.com/docs/gitignore).
2. **New file `gitignore.go`:**
   - `GitignoreMatcher` struct with `[]gitignore.Pattern` cache
   - `loadGitignoreForPath(fsys fs.FS, path string)` — walks up tree, reads `.gitignore` files
   - `IsIgnoredByGitignore(fsys fs.FS, path string) (bool, error)`
3. **Filter API:**
   - `WithRespectGitignore() FilterConfig`
   - Add `respectGitignore bool` to `Filter` struct
   - New `ReasonGitignore FilterReason = "gitignore"`
   - New `CodeGitignoreParse ErrorCode` in errors.go
4. **Integration point:** In `shouldFilterDetailedByPattern`, before detection, if `respectGitignore` is true, check gitignore rules.
5. **Tests:** `gitignore_test.go` with `fstest.MapFS` for FS-agnostic testing.
6. **Performance:** Cache `.gitignore` rules by directory path. Invalidate on `Filter` instance boundaries (Filter is immutable).
