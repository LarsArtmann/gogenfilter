# Analysis: `.gitignore`-Aware File Filtering for gogenfilter

**Date:** 2026-05-27
**Updated:** 2026-05-27 (three iterations of thinking)
**Status:** Open — awaiting decision on implementation path

---

## What It Means

Adding `.gitignore` awareness to gogenfilter means: when a caller opts in, the filter checks whether a file path matches `.gitignore` rules in the directory hierarchy. If matched, the file is filtered with a new `ReasonGitignore`.

---

## Round 1 — Initial Analysis

### PROs

| # | Argument | Weight |
|---|----------|--------|
| 1 | **Eliminates intent duplication** | High |
|   | Projects already express "skip these files" in `.gitignore`. Reusing it means users don't duplicate exclude patterns in filter config. | |
| 2 | **Zero-config correctness** | High |
|   | A linter using gogenfilter would automatically skip `/vendor/`, build artifacts, generated files not yet covered, IDE files — no manual patterns. | |
| 3 | **Git-native semantics** | Medium |
|   | Handles directory-level patterns, negation (`!`), glob precedence, and nested `.gitignore` files correctly. Far more powerful than manual glob patterns. | |
| 4 | **Aligns with user expectations** | Medium |
|   | "Of course it shouldn't analyze files ignored by git." Natural mental model. | |
| 5 | **Composable with existing options** | Low |
|   | Becomes one more functional option alongside `WithIncludePatterns`/`WithExcludePatterns`. Clean additive API. | |

### CONs

| # | Argument | Weight |
|---|----------|--------|
| 1 | **Dependency burden** | **Critical** |
|   | Requires a gitignore parsing library. The best option, `go-git/v6/plumbing/format/gitignore`, is part of an alpha release (`v6.0.0-alpha.4`). Adding it pulls ~20+ transitive deps. Current production deps: `doublestar/v4` (1 dep), `go-faster/yaml` (~5 deps). This is a 4x dependency explosion for one feature. | |
| 2 | **Scope creep — fundamental** | **Critical** |
|   | gogenfilter's purpose is "detect and filter *auto-generated* Go code." `.gitignore` is about "files git shouldn't track" — a much broader category that includes non-generated files (build artifacts, secrets, IDE configs). This blurs the library's identity from "generated code detector" to "general file filterer." | |
| 3 | **I/O amplification in hot path** | High |
|   | For every file filtered, `.gitignore` awareness requires walking up the directory tree, checking for `.gitignore` files, and parsing them. Currently `Filter()` does zero I/O until content-based detection needs it. Adding `.gitignore` adds filesystem I/O to the hot path. | |
| 4 | **Performance requires caching** | High |
|   | Without a `.gitignore` cache, `FilterPaths([]string{1000 files})` becomes pathological (O(n×depth) file I/O). A cache adds complexity: invalidation, thread-safety, scope boundaries. | |
| 5 | **Already solvable by caller** | Medium |
|   | `WithExcludePatterns("vendor/**", "**/testdata/**", "website/**")` handles 80%+ of cases. For the remaining 20%, callers can pre-filter with any gitignore library and pass the reduced list to gogenfilter. | |
| 6 | **Unstable dependency** | Medium |
|   | `go-git/v6` has no stable release. Pinning to alpha software in a library consumed by others is risky. `sabhiram/go-gitignore` exists but is unmaintained (2021). | |

### Initial Recommendation: Option B — Document the pattern

Delivered: website guide (`guides/gitignore-pre-filtering.mdx`), code example (`ExampleWithExcludePatterns_vendorAndTestdata`), FEATURES.md section, AGENTS.md gotcha entry.

---

## Round 2 — API Design Correction

**Challenge:** The initial proposal used `WithRespectGitignore()` as a separate `FilterConfig`. This is architecturally inconsistent.

### Why `WithRespectGitignore()` was wrong

`FilterOption` currently means "which code generator to detect." Every option maps 1:1 to a `detector` in the table with `matchFilename`/`checkContent`. `.gitignore` doesn't detect generated code — it detects gitignored paths. So it doesn't fit the `detector` abstraction.

### Why `FilterGitignore` as a `FilterOption` is right

From the **user's** perspective, `FilterOption` means "what should cause this file to be filtered." Users don't care about internal detector tables. They think:

```go
// Clean — one config mechanism, one concept
gogenfilter.WithFilterOptions(gogenfilter.FilterAll, gogenfilter.FilterGitignore)

// vs. previous proposal — two different config mechanisms for the same task
gogenfilter.WithFilterOptions(gogenfilter.FilterAll),
gogenfilter.WithRespectGitignore(),
```

`FilterGitignore` doesn't need a `detector` entry. It's a **pre-detection filter** — like `WithExcludePatterns` but powered by gitignore rules instead of manual globs. The pipeline becomes:

1. Pattern check (include/exclude) → `ReasonOutsideScope` / `ReasonExcludePattern`
2. **Gitignore check** → `ReasonGitignore` *(new)*
3. Generator detection → `ReasonSQLC` / `ReasonTempl` / ...

The `FilterOption` becomes "reasons a file should be filtered" — a broader but more useful concept than "which generator to detect."

### API sketch

```go
// New constants
FilterGitignore FilterOption = "gitignore"
ReasonGitignore FilterReason = "gitignore"

// Usage — identical to every other option
f, _ := gogenfilter.NewFilter(
    gogenfilter.WithFilterOptions(gogenfilter.FilterAll),
)
// FilterAll expands to all detectors including FilterGitignore

// Or selective
f, _ := gogenfilter.NewFilter(
    gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC, gogenfilter.FilterGitignore),
)
```

`FilterAll` expands to include `FilterGitignore`. This is the correct user model: "filter everything I don't want to analyze."

---

## Round 3 — Modularization Analysis & Final Options

**Challenge:** Can we isolate the gitignore dependency behind a sub-module with its own `go.mod`?

### Why go-modularize doesn't apply

Applied the `go-modularize` skill's "When NOT to Modularize" scoring:

| Signal | Weight | Applies? |
|--------|--------|----------|
| Small project | High | **YES** — 1 package, ~8400 lines |
| Single developer | Medium | YES |
| No external consumers | Medium | Partial — published library |
| All packages change together | High | **YES** — single `package gogenfilter` |
| Prototype | High | No |

**Score: 2 High + 1 Medium → "Consider partial modularization only."**

gogenfilter is a **single-package Go library**. There are no packages to split — everything lives in `package gogenfilter` at the root. A sub-module with its own `go.mod` would:

1. Be a different import path (`github.com/LarsArtmann/gogenfilter/v3/gitignore`)
2. Not compose with `WithFilterOptions(FilterAll, FilterGitignore)` — `FilterOption` is a type in the root module
3. Require a plugin/extension system that's vastly overengineered for this use case
4. Violate "Do one thing well" — the sub-module would be 1-2 files

The dependency isolation goal (gitignore users don't pay for go-git) is real, but modularization is the wrong solution.

### The real decision: write it ourselves vs. accept the dep

| | **Option A: Minimal parser** | **Option B: go-git dep** |
|---|---|---|
| **Effort** | 4-6h (parser + tests) | ~1h (integration) |
| **New deps** | **Zero** | **+20 transitive** (go-git v6 alpha) |
| **Correctness** | 95% of `.gitignore` spec | 100% |
| **Maintenance** | We own it — full control | Upstream risk (alpha, breaking changes) |
| **Fits `FilterOption`** | Yes | Yes |
| **Performance** | Cacheable, no external allocations | Same |
| **API** | `FilterGitignore` as `FilterOption` | `FilterGitignore` as `FilterOption` |

#### What "95% of gitignore spec" means

The `.gitignore` spec has these features. A minimal parser would handle the marked ones:

| Feature | Covered? | Notes |
|---------|----------|-------|
| Blank lines | ✅ | Skip |
| `# comments` | ✅ | Skip |
| `*.ext` glob | ✅ | Standard glob via `doublestar` (already a dep) |
| `**/` recursive glob | ✅ | Already have `doublestar` |
| `!` negation | ✅ | Essential — un-ignoring vendor files is common |
| `/`-anchored patterns | ✅ | `/*.go` vs `*.go` semantics |
| Trailing `/` (dir-only) | ✅ | `build/` matches dirs only |
| Nested `.gitignore` files | ✅ | Walk up tree, merge rules |
| `.git/info/exclude` | ⚠️ | Optional — low priority |
| Global gitignore (`~/.gitignore`) | ❌ | Not worth the complexity |
| `\` escaping | ⚠️ | Edge case for filenames with `#`, `!` |

#### Why Option A wins

1. **Zero dependency cost.** gogenfilter's value proposition includes "minimal dependency footprint." Production deps go from 2 → 2, not 2 → 22.
2. **`doublestar` already covers the hard part.** The core of gitignore matching is glob matching — we already depend on `doublestar/v4`. The parser itself is ~200 lines of line-by-line rule interpretation.
3. **No alpha dependency risk.** `go-git/v6` has no stable release. A library consumed by other libraries should not pin to alpha software.
4. **Full control.** If the gitignore spec evolves or we find edge cases, we fix them without waiting for upstream.
5. **The 5% gap doesn't matter.** Global gitignore (`~/.gitignore`) and `\` escaping are rarely used in Go projects. The patterns that matter are `vendor/`, `node_modules/`, `*.pb.go`, `build/` — all covered.

---

## Updated Option Matrix

| Option | Description | Effort | Risk | Benefit |
|--------|-------------|--------|------|---------|
| ~~A. Full implementation~~ | ~~Add `WithRespectGitignore()`, dependency, cache~~ | ~~18-24h~~ | ~~High~~ | ~~Superseded by D~~ |
| **B. Document the pattern** | Docs recipe for composition with external gitignore lib | 2-3h | None | Already delivered ✅ |
| ~~C. Reject~~ | ~~Close as out of scope~~ | ~~0h~~ | ~~None~~ | ~~Superseded by D~~ |
| **D. Implement with minimal parser** | `FilterGitignore` as `FilterOption`, custom parser, zero new deps | 4-6h | Low | Native support, clean API, zero dep cost |

---

## Current Recommendation: Option D (Conditional)

**If** we decide `.gitignore` awareness belongs in gogenfilter (the scope creep concern from Round 1 still applies), then **Option D** is the right implementation path:

1. **`gitignore.go`** — minimal parser (~200 lines)
   - `gitignoreRule` struct: `pattern string`, `negated bool`, `dirOnly bool`, `anchored bool`
   - `parseGitignore(r io.Reader) ([]gitignoreRule, error)`
   - `matchGitignore(path string, isDir bool, rules []gitignoreRule) bool`
   - `loadGitignoreRules(fsys fs.FS, filePath string) ([]gitignoreRule, error)` — walks up tree
2. **`gitignore_test.go`** — comprehensive tests with `fstest.MapFS`
3. **`types.go`** — add `FilterGitignore` and `ReasonGitignore`
4. **`detection.go`** — gitignore check in the pipeline (pre-detection phase)
5. **`errors.go`** — `CodeGitignoreParse` error code
6. **`filter.go`** — gitignore rule cache on `Filter` struct, populated when `FilterGitignore` is enabled

### Open Question

The scope creep concern from Round 1 remains the deciding factor:

> gogenfilter's purpose is "detect and filter *auto-generated* Go code." `.gitignore` is about "files git shouldn't track."

**Counterargument:** Users of the library — linters, static analysis tools — already treat "skip gitignored files" as a core requirement. They'll implement it themselves if we don't. Providing it natively with `FilterGitignore` as an opt-in `FilterOption` (not enabled unless explicitly requested or part of `FilterAll`) keeps the library focused while solving a real user need.

**Decision needed:** Is "filter gitignored files" within gogenfilter's scope?

---

## Decision Log

| Date | Round | Decision | Rationale |
|------|-------|----------|-----------|
| 2026-05-27 | 1 | Chose Option B (document pattern) | Dependency cost, scope creep, already solvable by caller |
| 2026-05-27 | 2 | Corrected API: `FilterGitignore` not `WithRespectGitignore()` | `FilterOption` is "what causes filtering," not "which generator." User's mental model wins. |
| 2026-05-27 | 3 | Rejected sub-module modularization; proposed Option D (minimal parser) | Single-package library, sub-module can't compose with `FilterOption`, zero-dep parser eliminates dependency concern |
