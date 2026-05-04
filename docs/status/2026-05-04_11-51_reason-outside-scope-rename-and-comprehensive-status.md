# Comprehensive Status Report

**Date:** 2026-05-04 11:51
**Scope:** Full project — Go library + Website + CI/CD + Documentation

---

## Executive Summary

**gogenfilter** is a Go library for detecting and filtering auto-generated code files. The project is in v0.x with 11 generators supported, 97.4% test coverage, clean lint, zero race conditions, and a production-ready Astro website.

**Overall health: STRONG.** Core library is solid, well-tested, well-documented. The gaps are in documentation accuracy (README examples, stale counts) and one design question (include+exclude composition).

---

## a) FULLY DONE ✅

### Core Library (Production-Grade)

| Area                   | Status      | Details                                                                                           |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| 11-generator detection | ✅ Complete | sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic |
| Two-phase detection    | ✅ Complete | Filename-based (zero I/O) → content-based                                                         |
| Functional options API | ✅ Complete | `NewFilter(WithFilterOptions(FilterAll))`                                                         |
| Filter immutability    | ✅ Complete | Immutable after construction                                                                      |
| Pattern matching       | ✅ Complete | `**` glob via doublestar/v4, include/exclude patterns                                             |
| SQLC config discovery  | ✅ Complete | v1 + v2 YAML, JSON, codegen configs, fs.FS abstraction                                            |
| Branded error system   | ✅ Complete | 7 error codes, sentinel errors, `CodeEqual[T]`, `Help()`                                          |
| Phantom types          | ✅ Complete | 5 phantom types for type-safe API boundaries                                                      |
| Thread-safe metrics    | ✅ Complete | RWMutex, snapshot API, nil-safe                                                                   |
| Project root discovery | ✅ Complete | Configurable markers, depth limit                                                                 |

### Testing (97.4% coverage)

| Type                    | Count                                           | Status |
| ----------------------- | ----------------------------------------------- | ------ |
| Table-driven unit tests | ~200+ test cases                                | ✅     |
| BDD tests (ginkgo)      | 38 specs, all passing                           | ✅     |
| Integration tests       | Real generated files via `//go::embed testdata` | ✅     |
| Fuzz tests              | `FuzzMatchPattern`, `FuzzDetectReason`          | ✅     |
| Property tests          | `testing/quick` invariants                      | ✅     |
| Benchmark tests         | 23 benchmarks, all hot paths covered            | ✅     |
| Concurrent tests        | 100-goroutine stress test                       | ✅     |
| Runnable examples       | 19 `Example*` functions                         | ✅     |
| Edge case tests         | Empty path, unicode, long names, nil FS         | ✅     |

### CI/CD

| Pipeline                   | Status        | Details                                                                  |
| -------------------------- | ------------- | ------------------------------------------------------------------------ |
| Go CI (`ci.yml`)           | ✅ Hardened   | vet → test -race (95% threshold) → bench → golangci-lint                 |
| Website CI (`website.yml`) | ✅ Hardened   | astro check → build → doc validation → HTML validation → Firebase deploy |
| Dependabot                 | ✅ Active     | Weekly: Go modules, npm, GitHub Actions                                  |
| Concurrency groups         | ✅ Configured | Cancel in-progress runs on same branch                                   |

### Website

| Component                                       | Status |
| ----------------------------------------------- | ------ |
| Astro v6 + Starlight docs                       | ✅     |
| Landing page with hero, features, code examples | ✅     |
| PageFind search                                 | ✅     |
| Dark/light theme                                | ✅     |
| Firebase Hosting config                         | ✅     |
| Generator logos (SVG/PNG)                       | ✅     |
| SEO (canonical, JSON-LD, OG meta)               | ✅     |
| Analytics (Plausible)                           | ✅     |

### Code Quality

| Metric                             | Result   |
| ---------------------------------- | -------- |
| `go test ./... -race`              | PASS     |
| `go vet ./...`                     | PASS     |
| `golangci-lint run`                | 0 issues |
| Test coverage                      | 97.4%    |
| TODO/FIXME/HACK comments in source | 0        |
| Hardcoded secrets                  | 0        |

### Benchmarks (Key Numbers)

| Benchmark                 | ns/op | allocs |
| ------------------------- | ----- | ------ |
| ShouldFilter (enabled)    | 73ns  | 0      |
| ShouldFilter (disabled)   | 1.5ns | 0      |
| DetectGenerated           | 11ns  | 0      |
| MatchPattern (doublestar) | 71ns  | 0      |

---

## b) PARTIALLY DONE 🔶

### 1. Include + Exclude Pattern Composition

**What:** When `WithIncludePatterns` is set, `ShouldFilter` takes the include-only path (`shouldFilterWithIncludes`) and **never checks exclude patterns**. But the README shows them used together (lines 94-99).

**Status:** Both features work individually. The composition is the gap:

- Include patterns alone → ✅ works
- Exclude patterns alone → ✅ works
- Include + Exclude together → ❌ exclude silently ignored

**This is either:**

- A design bug (exclude should still apply within the included scope)
- Intentional but the README example is misleading

**Evidence:** Zero tests combine both options. No example combines both. Website docs show them individually.

### 2. Website Flake Integration

**What:** `website/flake.nix` exists but has uncommitted changes (deleted `.jscpd.json`, new `scripts/` dir).

**Status:** Functional but dirty working tree.

---

## c) NOT STARTED ⬜

| #   | Task                                                | Priority | Effort |
| --- | --------------------------------------------------- | -------- | ------ |
| 1   | Resolve include/exclude composition design question | HIGH     | 30min  |
| 2   | Performance profile hot paths                       | MEDIUM   | 30min  |
| 3   | Add Codecov or coverage tracking                    | MEDIUM   | 15min  |
| 4   | Consider `//go:generate` for detector table         | MEDIUM   | 45min  |
| 5   | `RegisterDetector()` API for custom detectors       | MEDIUM   | 60min  |
| 6   | `WalkAndFilter()` bulk API                          | MEDIUM   | 30min  |
| 7   | Website Lighthouse audit                            | LOW      | 60min  |
| 8   | Website custom 404 page                             | LOW      | 30min  |
| 9   | SQLC config discovery docs on website               | LOW      | 30min  |
| 10  | Combined include+exclude example in website docs    | LOW      | 15min  |

---

## d) TOTALLY FUCKED UP 💥

### 1. README SQLC API Examples Won't Compile

**File:** `README.md` lines 231-237

```go
gogenfilter.FindSQLCConfigs(".")            // WRONG — expects []string, returns map[string]string
gogenfilter.FindSQLCConfigsFS(fsys, ".")    // WRONG — expects []string, returns map[string]string
gogenfilter.GetSQLOutputDirs(".")           // WRONG — expects []string
gogenfilter.GetSQLOutputDirsFS(fsys, ".")   // WRONG — expects []string
```

**Actual signatures:**

```go
func FindSQLCConfigs(paths []string) (map[string]*SQLCConfig, *SQLCConfigError)
func FindSQLCConfigsFS(fsys fs.FS, paths []string) (map[string]*SQLCConfig, *SQLCConfigError)
func GetSQLOutputDirs(paths []string) ([]string, *SQLCConfigError)
func GetSQLOutputDirsFS(fsys fs.FS, paths []string) ([]string, *SQLCConfigError)
```

Wrong parameter types AND wrong return types. Users copying from README will get compiler errors.

### 2. `sqlc.go` Doc Says "3 Levels" But Code Allows 10

**File:** `sqlc.go:119` says `up to 3 levels up` but calls `FindProjectRoot` which uses `maxProjectRootDepth = 10`.

### 3. FEATURES.md Says 12 Examples — Actual Count Is 19

**File:** `FEATURES.md:121` — `12 Example* functions` should be `19`.

---

## e) WHAT WE SHOULD IMPROVE 🎯

### Critical (User-Facing Bugs)

1. **Fix README SQLC API signatures** — wrong param/return types, code won't compile
2. **Fix sqlc.go doc** — "3 levels" vs actual 10 levels mismatch
3. **Fix FEATURES.md example count** — 12 vs 19

### Design Decisions

4. **Include+exclude composition** — Decide: should exclude work within include scope? Then implement. Or document the limitation and fix the README example.
5. **TODO_LIST.md #9 is stale** — says "Won't do — ReasonIncludePattern rename" but we just renamed it to `ReasonOutsideScope`. Update the list.

### API Polish

6. **SQLC config discovery API not on website** — Only documented in README. Should have website docs page.
7. **No combined include+exclude example** — Neither in examples, tests, nor website.
8. **12 exported interface methods missing godoc** — `String()`, `Error()`, `Unwrap()` implementations. Idiomatic but strict lint may flag.

### Infrastructure

9. **CI path filter includes stale `.golangci.yml`** — Only `.golangci.yaml` exists.
10. **`FilteredFiles()` double-clones** — Already cloned in `GetStats()`, then cloned again in `FilteredFiles()`. Minor allocation waste.

### Documentation Debt

11. **34 status report files in `docs/status/`** — 34 markdown files accumulated. Consider archiving older ones.
12. **Website `docs/status/` has 13 status files** — Should these be in the final deploy?

---

## f) Top #25 Things to Do Next

### Tier 1: Fix Broken Things (Do First)

| #   | Task                                                              | Effort | Impact                     |
| --- | ----------------------------------------------------------------- | ------ | -------------------------- |
| 1   | Fix README SQLC API signatures (won't compile)                    | 10min  | HIGH — users will hit this |
| 2   | Fix sqlc.go "3 levels" doc → document actual behavior             | 5min   | HIGH — misleading          |
| 3   | Fix FEATURES.md example count (12 → 19)                           | 2min   | LOW — but wrong            |
| 4   | Update TODO_LIST.md #9 — ReasonIncludePattern rename is DONE      | 5min   | MED — stale                |
| 5   | Decide include+exclude composition design question                | 30min  | HIGH — design gap          |
| 6   | Fix README include+exclude example if composition isn't supported | 10min  | HIGH — misleading          |

### Tier 2: Close Gaps

| #   | Task                                                               | Effort | Impact |
| --- | ------------------------------------------------------------------ | ------ | ------ |
| 7   | Add test for include+exclude together (whichever design is chosen) | 15min  | MED    |
| 8   | Add combined include+exclude example in example_test.go            | 10min  | MED    |
| 9   | Add SQLC config discovery docs page on website                     | 30min  | MED    |
| 10  | Remove stale `.golangci.yml` from CI path filters                  | 5min   | LOW    |
| 11  | Add Codecov or coverage tracking badge                             | 15min  | LOW    |
| 12  | Website Lighthouse audit                                           | 60min  | MED    |
| 13  | Website custom 404 page                                            | 30min  | LOW    |

### Tier 3: Nice-to-Have Improvements

| #   | Task                                                    | Effort | Impact |
| --- | ------------------------------------------------------- | ------ | ------ |
| 14  | Performance profile hot paths                           | 30min  | LOW    |
| 15  | `WalkAndFilter()` bulk API                              | 30min  | MED    |
| 16  | `RegisterDetector()` custom detector API                | 60min  | MED    |
| 17  | `//go:generate` for detector table                      | 45min  | LOW    |
| 18  | Eliminate FilteredFiles() double-clone                  | 10min  | LOW    |
| 19  | Add godoc to 12 exported interface methods              | 15min  | LOW    |
| 20  | Archive old status reports (>7 days)                    | 10min  | LOW    |
| 21  | Clean up website/docs/status/ from deployment           | 5min   | LOW    |
| 22  | Add browser visual QA                                   | 30min  | LOW    |
| 23  | Website: prefetch, View Transitions, image optimization | 60min  | LOW    |
| 24  | Add `.gitattributes` linguist-generated for testdata/   | 5min   | LOW    |
| 25  | Consider v0.3.0 tag after fixes                         | 5min   | MED    |

---

## g) Top #1 Question I Cannot Answer Myself

**Should include patterns and exclude patterns compose?**

When both are set, what should happen?

- **Option A:** Include defines scope → exclude removes from that scope. A file matching both an include and exclude pattern gets filtered (exclude wins). This is the intuitive behavior the README example implies.
- **Option B:** Include is a strict whitelist. Exclude only applies when include is NOT set. This is the current behavior. Simpler to implement but surprising.

This is a product/design decision that affects the core API contract. The code currently does Option B. The README implies Option A. One of them is wrong.
