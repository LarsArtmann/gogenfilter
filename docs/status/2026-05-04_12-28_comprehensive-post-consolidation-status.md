# Comprehensive Status Report — 2026-05-04 12:28

**Generated:** 2026-05-04 12:28
**Branch:** master @ `c41bcb6` (2 commits ahead of origin)
**Working tree:** Dirty (README.md broken table row; untracked website status doc)
**Prior report:** `docs/status/2026-05-04_CONSOLIDATED-status.md` @ `44598dd`
**Purpose:** Post-consolidation audit — what changed since the consolidated report, new findings, refreshed priorities

---

## Executive Summary

gogenfilter remains a production-ready Go library (v2.1.0, 97.4% coverage, 0 lint issues, 0 code duplication). Since the consolidated report at 12:06, three commits landed (mockgen URL fix, docs directory flattening, status report). The library has one architectural gap: the **detection layer leaks unbranded `error`** — `detectReasonFS` and `DetectReasonReader` return `fmt.Errorf` instead of a typed `DetectionError`. The website has a **broken README table** (stringer row merged onto mockgen line). Otherwise everything is solid.

---

## A. FULLY DONE ✅

### Go Library — Production Ready

| Item                                      | Evidence                                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 11 generator detectors + generic fallback | sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic  |
| Two-phase detection                       | Filename (zero I/O) → content (reads file)                                                         |
| Functional options API                    | `NewFilter(WithFilterOptions(FilterAll))` — immutable after construction                           |
| 97.4% test coverage                       | 23 test files, 97.4% of statements                                                                 |
| Branded error system                      | `[gogenfilter:<code>]` prefix, 7 sentinel errors, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` |
| Phantom types (5)                         | `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`                        |
| `fs.FS` abstraction                       | `WithFS()` option; tests use `fstest.MapFS`                                                        |
| Thread-safe metrics                       | `FilteredFiles()`, `FilteredBy()` accessors, `sync.RWMutex`                                        |
| Pattern matching                          | `**` glob via doublestar/v4                                                                        |
| SQLC config discovery                     | v1 + v2 YAML, `FindSQLCConfigs`, `GetSQLOutputDirs` (OS + fs.FS variants)                          |
| golangci-lint                             | 0 issues, strict depguard (3 allowed deps)                                                         |
| Race detector                             | `go test -race ./...` passes clean                                                                 |
| Benchmarks                                | ShouldFilter 70ns (enabled), 1.5ns (disabled), 0 allocs hot paths                                  |
| Code duplication                          | `art-dupl --semantic -t 15` → 0 clone groups                                                       |
| Go vet                                    | Clean                                                                                              |
| Go tags                                   | v0.1.0, v0.2.0, v2.1.0                                                                             |
| Zero TODOs/FIXMEs in production code      | `grep -rn 'TODO\|FIXME' --include='*.go'` → none                                                   |
| BDD tests (ginkgo)                        | 38 specs in `bdd_test.go`                                                                          |
| Fuzz + property tests                     | `fuzz_test.go`, `property_test.go`                                                                 |
| 12+ runnable examples                     | `example_test.go`                                                                                  |
| Concurrent safety tests                   | 100-goroutine `ShouldFilter`                                                                       |

### Website — Production Deployed

| Item                          | Evidence                                                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20 HTML pages                 | Landing + 17 docs + 404 + OG endpoint                                                                                                                                      |
| 17 Astro components           | Header, Footer, Logo, Icon, Section, SectionHeader, Card, CodeBlock, HeroSection, PhaseSection, ComparisonSection, UseCasesSection, CTASection, FeatureGrid, GeneratorGrid |
| Tailwind v4 + dark/light mode | CSS vars, toggle, localStorage, flash prevention                                                                                                                           |
| SEO                           | JSON-LD, canonical URLs, OG images, sitemap, robots.txt                                                                                                                    |
| Analytics                     | Plausible with preconnect                                                                                                                                                  |
| Firebase Hosting              | Security headers, immutable cache, clean URLs                                                                                                                              |
| HTML validation               | `html-validate` enforced in CI                                                                                                                                             |
| Doc validation                | `md-go-validator` in CI                                                                                                                                                    |
| Build                         | 0 errors, 0 warnings, 19 pages in 2.74s                                                                                                                                    |
| Docs flattened                | `content/docs/docs/` → `content/docs/` (commit `8f83648`)                                                                                                                  |
| Mockgen URL fixed             | Points to active `uber-go/mock` repo (commit `c41bcb6`)                                                                                                                    |

### CI/CD — Three Workflows

| Workflow        | Path Filter                                              | Key Steps                                                               |
| --------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| `ci.yml`        | `*.go`, `go.mod`, `go.sum`, `testdata/**`, `.golangci.*` | vet → test (race + 95% threshold) → lint                                |
| `website.yml`   | `website/**`                                             | astro check → build → md-go-validator → html-validate → Firebase deploy |
| `benchmark.yml` | `*.go`, `go.mod`, `go.sum`                               | benchmarks with historical tracking, 150% alert / 300% hard-fail        |

### CI Quality Gates

| Gate                        | Status                  |
| --------------------------- | ----------------------- |
| `go vet`                    | ✅ Clean                |
| `go test -race`             | ✅ Passes               |
| Coverage ≥ 95%              | ✅ 97.4%                |
| `golangci-lint`             | ✅ 0 issues             |
| `art-dupl --semantic -t 15` | ✅ 0 clone groups       |
| `astro check`               | ✅ 0 errors, 0 warnings |
| `html-validate`             | ✅ Passes               |
| `md-go-validator`           | ✅ 40/40 code blocks    |

---

## B. PARTIALLY DONE 🟡

| #   | Item                                | What's Done                                                                                       | What's Missing                                                                                                                                                                                                                                      |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Detection layer error branding**  | `ProjectRootError` and `SQLCConfigError` are fully branded with sentinel errors, codes, help text | `detectReasonFS` (detection.go:302) and `DetectReasonReader` (detection.go:243) return plain `fmt.Errorf` — the only unbranded errors in the library. `ShouldFilter` propagates them as plain `error`. A `DetectionError` type would close the gap. |
| 2   | **`website/TODO_LIST.md` is stale** | 6 items (D–L) marked PENDING                                                                      | All 6 are actually DONE except G (move logos to assets) and K (tighten Icon props). Item C contradicts itself.                                                                                                                                      |
| 3   | **`gh-pages` branch**               | Master deploys to Firebase fine                                                                   | `gh-pages` is corrupted (all project files). Unknown if anything references it.                                                                                                                                                                     |

---

## C. NOT STARTED 🔴

### Verified Against Code — Genuinely Still Open

| #   | Task                                                         | Category | Effort | Source                   |
| --- | ------------------------------------------------------------ | -------- | ------ | ------------------------ |
| 1   | Add `DetectionError` branded type for detection I/O failures | Go       | 60min  | Error audit this session |
| 2   | Run Lighthouse audit + fix top issues                        | Quality  | 60min  | All reports              |
| 3   | Browser visual QA (desktop + mobile)                         | Quality  | 30min  | All reports              |
| 4   | Add Codecov integration                                      | CI       | 15min  | TODO_LIST #3             |
| 5   | Performance profile hot paths (pprof)                        | Go       | 60min  | TODO_LIST #2             |
| 6   | `//go:generate` for detector table                           | Go       | 2hr    | TODO_LIST #4             |
| 7   | `RegisterDetector()` plugin API                              | Go       | 2hr    | TODO_LIST #5             |
| 8   | `WalkAndFilter()` bulk API                                   | Go       | 2hr    | TODO_LIST #6             |
| 9   | Context support (`context.Context`)                          | Go       | 4hr    | Prior report             |
| 10  | Custom 404 page (Starlight branding)                         | Website  | 15min  | TODO_LIST #11            |
| 11  | Skip-to-content link                                         | A11y     | 5min   | Multiple reports         |
| 12  | `role="banner"` / `role="contentinfo"`                       | A11y     | 2min   | Prior report             |
| 13  | Move logos to `src/assets/`                                  | Perf     | 30min  | Multiple reports         |
| 14  | Source real brand logos                                      | Visual   | 30min  | Multiple reports         |
| 15  | Versioned documentation (version selector)                   | Docs     | 60min  | Prior report             |
| 16  | Release automation (goreleaser)                              | Infra    | 60min  | Prior report             |
| 17  | Add FUNDING.yml                                              | OSS      | 5min   | Prior report             |
| 18  | Resolve include patterns design question                     | Go API   | 30min  | TODO_LIST #1             |
| 19  | Dependabot auto-merge config                                 | CI       | 15min  | Prior report             |
| 20  | `pkg.go.dev` badge in README                                 | Docs     | 5min   | Prior report             |

---

## D. TOTALLY FUCKED UP 💥

| #   | Issue                                        | Severity  | Details                                                                                                                              |
| --- | -------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| 1   | **README.md table is broken**                | 🔴 HIGH   | The stringer row got merged onto the mockgen line in a broken edit. Line now reads: `mockgen ... content                             | [stringer](https://...)               | Content marker | ` — two table rows collapsed into one. This is visible on GitHub and pkg.go.dev. |
| 2   | **2 unpushed commits**                       | 🟡 MEDIUM | Branch is 2 commits ahead of origin (`c41bcb6` vs origin at `99f5da0`). The mockgen URL fix and docs flatten haven't reached remote. |
| 3   | **md-go-validator CI fragility**             | 🟡 MEDIUM | `go install @latest` depends on published tag not having `replace` directive. If it leaks, all website CI/CD breaks.                 |
| 4   | **`validate:docs` npm script portability**   | 🟢 LOW    | Uses `&>/dev/null` (bash-ism). Local-dev only.                                                                                       |
| 5   | **jscpd v4 formats-exts bug**                | 🟢 LOW    | Workaround in place (dedup.sh). Not reported upstream.                                                                               |
| 6   | **`gh-pages` branch corrupted**              | 🟢 LOW    | Unused but messy.                                                                                                                    |
| 7   | **5 npm moderate vulnerabilities**           | 🟢 LOW    | From jscpd transitive deps.                                                                                                          |
| 8   | **`PhaseSection.astro` hardcoded type cast** | 🟢 LOW    | Line 26: `phase.noteIcon as 'bolt'                                                                                                   | 'check'`instead of`UseCaseIcon` type. |

---

## E. WHAT WE SHOULD IMPROVE

### Architecture

1. **Add `DetectionError` branded type** — The detection I/O path (`detectReasonFS`, `DetectReasonReader`) is the only place that leaks `fmt.Errorf`. A `DetectionError` with `CodeDetectionRead`, sentinel `ErrDetectionRead`, and phantom `FilePath` type would make the branded error story 100% complete. This is a small, surgical change following the exact pattern of `ProjectRootError` / `SQLCConfigError`.

2. **Coverage gap functions** — Two functions below 90%:
   - `detectReasonFromMap` — 83.3% (one branch uncovered)
   - `SQLCConfigError.Error` — 85.7% (one formatting branch uncovered)

3. **`ShouldFilter` return type** — Currently returns `(bool, error)` with plain `error`. Once `DetectionError` exists, the error is always branded but the signature stays idiomatic Go. Callers can use `errors.As` to extract structured info.

### Website

4. **Fix the broken README table** — One-line fix, blocks good first impression on GitHub.
5. **Update `website/TODO_LIST.md`** — 6 of 8 items are done but still marked PENDING.
6. **Stale status docs** — 51 status files across `docs/status/` and `website/docs/status/`. Most superseded by consolidated report.

### Process

7. **Push the 2 unpushed commits** — Mockgen URL fix and docs flatten are local-only.
8. **`continue-on-error` on md-go-validator step** — Safety net for CI fragility.

---

## F. TOP 25 THINGS TO DO NEXT

Sorted by impact × effort (Pareto principle):

### 🔴 HIGH Impact, LOW Effort (Do Now — Under 15min each)

| #   | Task                                                      | Category     | Effort |
| --- | --------------------------------------------------------- | ------------ | ------ |
| 1   | Fix broken README table (stringer row collapsed)          | Docs         | 1min   |
| 2   | Push 2 unpushed commits to origin                         | Git          | 1min   |
| 3   | Update `website/TODO_LIST.md` — mark D–L done             | Housekeeping | 10min  |
| 4   | Clean up or delete `gh-pages` branch                      | Git          | 5min   |
| 5   | Fix `validate:docs` npm script (`&>` → `>/dev/null 2>&1`) | Bug          | 2min   |
| 6   | Add `continue-on-error: true` to md-go-validator CI step  | CI           | 2min   |
| 7   | Add FUNDING.yml                                           | OSS          | 5min   |
| 8   | Add skip-to-content link                                  | A11y         | 5min   |
| 9   | Add `role="banner"` / `role="contentinfo"`                | A11y         | 2min   |
| 10  | Add `pkg.go.dev` badge to README                          | Docs         | 5min   |

### 🟡 HIGH Impact, MEDIUM Effort (Plan This Week)

| #   | Task                                                | Category | Effort |
| --- | --------------------------------------------------- | -------- | ------ |
| 11  | Add `DetectionError` branded type for detection I/O | Go       | 60min  |
| 12  | Run Lighthouse audit + fix top issues               | Quality  | 60min  |
| 13  | Browser visual QA (desktop + mobile)                | Quality  | 30min  |
| 14  | Add Codecov integration + CI enforcement            | CI       | 15min  |
| 15  | Resolve include patterns design question            | Go API   | 30min  |
| 16  | Custom 404 page (Starlight branding)                | Website  | 15min  |

### 🟢 MEDIUM Impact, LOW-MEDIUM Effort (Plan Soon)

| #   | Task                                                                                     | Category    | Effort |
| --- | ---------------------------------------------------------------------------------------- | ----------- | ------ |
| 17  | Cover the 2 functions below 90% (`detectReasonFromMap` 83%, `SQLCConfigError.Error` 86%) | Testing     | 30min  |
| 18  | Fix `PhaseSection.astro` type cast                                                       | Type Safety | 2min   |
| 19  | Tighten Icon.astro Props to union type                                                   | Type Safety | 5min   |
| 20  | Report jscpd formats-exts bug upstream                                                   | Community   | 15min  |

### 🔵 LOWER Impact, LARGER Effort (Backlog)

| #   | Task                            | Category | Effort |
| --- | ------------------------------- | -------- | ------ |
| 21  | `RegisterDetector()` plugin API | Go       | 2hr    |
| 22  | `WalkAndFilter()` bulk API      | Go       | 2hr    |
| 23  | Performance profiling (pprof)   | Go       | 60min  |
| 24  | Release automation (goreleaser) | Infra    | 60min  |
| 25  | Versioned documentation         | Docs     | 60min  |

---

## G. TOP #1 OPEN QUESTION

**Should `ShouldFilter` return `(bool, *DetectionError)` instead of `(bool, error)`?**

The current signature uses plain `error` for idiomatic Go — most callers just check `if err != nil`. But `FindProjectRoot` returns `(string, *ProjectRootError)` and `FindSQLCConfigs` returns `(map[string]string, *SQLCConfigError)` — both use concrete typed returns. Adding `DetectionError` creates a third typed error, and the question is whether `ShouldFilter` should follow the same concrete-return pattern or stay with the `error` interface.

Arguments for concrete: consistent with the rest of the API, compiler-enforced error handling.
Arguments for `error`: `ShouldFilter` is the highest-level API entry point; callers shouldn't need to know about internal error types; `errors.As` works either way.

This is a design decision only the project owner can make.

---

## Project Metrics (Verified 2026-05-04 12:28)

| Metric                       | Value                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Go production files          | 11 (filter, detection, types, pattern, sqlc, errors, project, metrics, phantom + 2 CI configs) |
| Go test files                | 23                                                                                             |
| Total Go LOC                 | 6,956 (prod: ~1,908, test: ~5,048)                                                             |
| Test coverage                | 97.4%                                                                                          |
| Functions below 90% coverage | 2 (`detectReasonFromMap` 83%, `SQLCConfigError.Error` 86%)                                     |
| golangci-lint issues         | 0                                                                                              |
| Code duplication             | 0 clone groups                                                                                 |
| Race detector                | Clean                                                                                          |
| Generators supported         | 11                                                                                             |
| Go module tags               | v0.1.0, v0.2.0, v2.1.0                                                                         |
| Direct dependencies          | 4 (doublestar, go-faster/yaml, ginkgo, gomega)                                                 |
| Website pages                | 20                                                                                             |
| Website components           | 17                                                                                             |
| Website build time           | 2.74s                                                                                          |
| Astro check                  | 0 errors, 0 warnings                                                                           |
| CI workflows                 | 3 (ci, website, benchmark)                                                                     |
| Uncommitted changes          | 1 broken file (README.md) + 1 untracked                                                        |
| Unpushed commits             | 2                                                                                              |

---

_Arte in Aeternum_
