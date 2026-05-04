# Status Report — 2026-05-04 15:36

_Post-v3.0.0 release snapshot — project audit and current state_

---

## a) FULLY DONE

| # | Area | Details |
|---|------|---------|
| 1 | **v3.0.0 released** | `caa2e86` — Breaking: error-returning API, `ShouldFilter`→`Filter`, `MustFilter` removed |
| 2 | **175 BDD specs** | `bdd_test.go` (110) + `bdd_extended_test.go` (65) — ginkgo-based |
| 3 | **Coverage gap tests** | `coverage_test.go` (322 lines) — targets 9 functions below 100% |
| 4 | **Library nil-guard fix** | `filter.go:109` — prevents panic on `(nil, error)` from `WithFilterOptions` |
| 5 | **Stale test fixes** | All test files migrated to `(FilterConfig, error)` + `(*Filter, error)` returns |
| 6 | **Website docs v3 migration** | 10 files updated to error-returning API with `if err != nil` |
| 7 | **Go tests** | `go test ./...` — PASS |
| 8 | **Go lint** | `golangci-lint run` — 0 issues |
| 9 | **Website build** | 19 pages, 0 errors |
| 10 | **HTML validation** | `html-validate` — 0 errors |
| 11 | **CI hardened** | Lighthouse CI, dependabot bumps, sparse checkout, dedup step |
| 12 | **Firebase hosting** | 301 redirect, 10 security headers (HSTS, COOP, CORP, etc.) |
| 13 | **Sections.astro** | 4 section-component pairs consolidated into 1 loop |
| 14 | **jscpd bug documented** | `website/docs/bugs/` — formats-exts doesn't detect `.astro` |

---

## b) PARTIALLY DONE

| # | Area | What's Done | What's Missing |
|---|------|-------------|----------------|
| 1 | **Website docs accuracy** | 10 files updated for v3 API | 4 code snippets still use v2 patterns (see d) |
| 2 | **Coverage** | 97.3%+ (coverage_test.go committed) | Exact new % unknown — need `go test -coverprofile` |
| 3 | **Status report archiving** | 3 website docs archived | 26+ files in `docs/status/` need cleanup |

---

## c) NOT STARTED

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 1 | Fix 4 stale v2 code snippets in docs | HIGH | 10 min |
| 2 | Verify CI runs Example tests | HIGH | 5 min |
| 3 | Archive old `docs/status/` files | MEDIUM | 10 min |
| 4 | Update AGENTS.md with v3 API patterns | MEDIUM | 15 min |
| 5 | Push coverage to ≥98% | MEDIUM | 30 min |
| 6 | Migrate edge/concurrent tests to BDD | LOW | 50 min |
| 7 | `RegisterDetector()` API | LOW | 60 min |
| 8 | `WalkAndFilter()` bulk API | LOW | 30 min |
| 9 | Single-source changelog | LOW | 60 min |
| 10 | API reference auto-generation | LOW | 120 min |

---

## d) TOTALLY FUCKED UP

**4 website doc snippets still use v2 API:**

| # | File | Line | Issue |
|---|------|------|-------|
| 1 | `quick-start.mdx` | 86 | `f := gogenfilter.NewFilter()` — missing error return |
| 2 | `metrics.mdx` | 72 | `f := gogenfilter.NewFilter()` — missing error return |
| 3 | `filter-options.mdx` | 27 | `gogenfilter.WithFilterOptions(FilterAll)` — not capturing `(FilterConfig, error)` |
| 4 | `filter-options.mdx` | 30-34 | `gogenfilter.WithFilterOptions(...)` — same issue |

These compile-fail on v3.0.0. Users copy-pasting from docs will get type errors.

---

## e) WHAT WE SHOULD IMPROVE

### Critical
1. **Fix the 4 stale v2 snippets** — These will confuse every new user until fixed

### Architecture
2. **`MetricsMixin` unexport** — Implementation detail exposed publicly
3. **`RegisterDetector()` API** — Allow custom detectors without forking
4. **`WalkAndFilter()` bulk API** — Walk directory and filter all files in one call

### Documentation
5. **Single-source changelog** — `CHANGELOG.md` and `website/changelog.mdx` drift repeatedly
6. **Auto-generate API reference** — 21 symbols were missing before; will happen again
7. **Document detector ordering** — "first match wins" behavior is tested but not documented

### Testing
8. **Verify CI runs Example tests** — `ExampleAllErrorCodes` stale count (7→8) may have passed CI silently
9. **Exact-count metrics tests** — Current tests use `>= N`; exact counts verify determinism

---

## f) TOP 25 THINGS TO DO NEXT

| Rank | Task | Impact | Effort | Category |
|------|------|--------|--------|----------|
| 1 | Fix 4 stale v2 code snippets in website docs | HIGH | 10 min | Docs |
| 2 | Verify CI runs Example tests (`go test -v -run Example`) | HIGH | 5 min | CI |
| 3 | Run `go test -coverprofile` to get exact coverage % | MED | 5 min | Testing |
| 4 | Archive old `docs/status/` (26 files) | MED | 10 min | Maintenance |
| 5 | Update AGENTS.md with v3 API patterns | MED | 15 min | Memory |
| 6 | Document detector ordering in public API docs | MED | 15 min | Docs |
| 7 | Fix website code block indentation (tabs vs spaces) | MED | 10 min | Docs |
| 8 | Add `ginkgo --fail-fast` to CI | MED | 5 min | CI |
| 9 | Codecov integration | MED | 15 min | CI |
| 10 | Push coverage to ≥98% | MED | 30 min | Testing |
| 11 | Add exact-count metrics BDD tests | LOW | 15 min | Testing |
| 12 | Migrate edge case tests to BDD format | LOW | 30 min | Testing |
| 13 | Migrate concurrent tests to BDD format | LOW | 20 min | Testing |
| 14 | SQLC v1 config BDD tests | LOW | 45 min | Testing |
| 15 | SQLC v2 config BDD tests | LOW | 30 min | Testing |
| 16 | Performance profile hot paths | LOW | 30 min | Perf |
| 17 | `RegisterDetector()` API | LOW | 60 min | Feature |
| 18 | `WalkAndFilter()` bulk API | LOW | 30 min | Feature |
| 19 | Single-source changelog script | LOW | 60 min | Automation |
| 20 | API reference auto-generation | LOW | 120 min | Automation |
| 21 | `//go:generate` for detector table | LOW | 45 min | Codegen |
| 22 | Re-run benchmarks on Go 1.26 | LOW | 15 min | Data |
| 23 | Resolve include patterns design question | LOW | 30 min | Design |
| 24 | Benchmark BDD suite performance | LOW | 10 min | Perf |
| 25 | Lighthouse audit | LOW | 30 min | Perf |

---

## g) TOP #1 QUESTION I CANNOT FIGURE OUT MYSELF

**Why did `ExampleAllErrorCodes` pass CI with a stale count?**

Commit `c4021b2` added `CodeInvalidFilterOption` to `errorCodeDefs` (8 entries) but the example output said `7`. This means either:
1. Example tests aren't verified in CI (`go test ./...` should run them)
2. The example was updated in a later commit that I can't see
3. CI was silently passing with a failing example (Go doesn't fail on wrong example output by default?)

If option 3, we need `go test -v` or explicit example verification in CI.

---

## Current State

```
Branch:   master (1 commit ahead of origin)
Tests:    PASS
Lint:     0 issues
Website:  19 pages built, 0 errors
HTML:     0 validation errors
Untracked: none
Modified:  none
```

---

_Generated: 2026-05-04 15:36_
