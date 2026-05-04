# Consolidated Status Report — 2026-05-04

**Generated:** 2026-05-04 (end-of-day consolidation)
**Source:** 13 status reports from `website/docs/status/` + 19 from `docs/status/` (all dated 2026-05-04)
**Branch:** master @ `44598dd` (up to date with origin)
**Working tree:** Clean
**Purpose:** Single authoritative status replacing all 32 prior reports

---

## Executive Summary

gogenfilter is a production-ready Go library (v2.1.0 tagged, 97.4% coverage, 0 lint issues) with a deployed website (20 pages, Firebase Hosting). The project has no ship-blocking bugs. Open work falls into three categories: **manual verification** (Lighthouse, visual QA), **API evolution** (WalkAndFilter, RegisterDetector, context support), and **stale TODO lists** (many items marked pending are actually done).

---

## A. FULLY DONE ✅

### Go Library — Production Ready

| Item | Evidence |
|------|----------|
| 11 generator detectors + generic fallback | sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic |
| Two-phase detection | Filename (zero I/O) → content (reads file) |
| Functional options API | `NewFilter(WithFilterOptions(FilterAll))` — immutable after construction |
| 97.4% test coverage | 23 test files: unit, integration, BDD (ginkgo), fuzz, property, benchmarks |
| Branded error system | `[gogenfilter:<code>]` prefix, 7 sentinel errors, `errors.Is`/`errors.As`, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` generic |
| Phantom types | `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked` |
| `fs.FS` abstraction | `WithFS()` option; tests use `fstest.MapFS` |
| Thread-safe metrics | `FilteredFiles()`, `FilteredBy()` accessors |
| Pattern matching | `**` glob via doublestar/v4 |
| SQLC config discovery | v1 + v2 YAML parsing, `FindSQLCConfigs`, `GetSQLOutputDirs` |
| Error wrapping | All `fmt.Errorf` calls use `%w` consistently |
| golangci-lint | 0 issues, 70+ linters, strict depguard (3 allowed deps) |
| Benchmarks | ShouldFilter 72ns (enabled), 1.5ns (disabled), 0 allocs on hot paths |
| Go tags | `v0.1.0`, `v0.2.0`, `v2.1.0` |
| Zero TODOs/FIXMEs | `grep -rn TODO\|FIXME --include='*.go'` → NONE |

### Website — Production Deployed

| Item | Evidence |
|------|----------|
| 20 HTML pages | Landing + 17 docs + 404 + OG endpoint |
| 17 Astro components | Header, Footer, Logo, Icon, Section, SectionHeader, Card, CodeBlock, HeroSection, PhaseSection, ComparisonSection, UseCasesSection, CTASection, FeatureGrid, GeneratorGrid |
| Typed data layer | `config.ts`, `generators.ts`, `features.ts`, `sections.ts`, `types.ts`, `hero-code.ts` |
| Tailwind v4 | CSS-first `@import "tailwindcss"` with `@theme` tokens, 14+ custom colors |
| Dark/light mode | Full CSS vars, toggle in Header, localStorage persistence, flash prevention |
| Self-hosted fonts | Space Grotesk + JetBrains Mono via Astro providers (no CDN) |
| Icon system | `Icon.astro` with 17 icons, typed `IconName` union |
| Card + Section components | Multi-variant, used consistently across all grids |
| GeneratorGrid | Uses `Card.astro` for all 11 generator cards |
| SectionHeader | Extracted from 6 components, single source of truth |
| SEO | JSON-LD SoftwareApplication schema, canonical URLs, OG images, sitemap, robots.txt with sitemap ref |
| Analytics | Plausible with preconnect + dns-prefetch |
| Firebase Hosting | Immutable cache (1yr), security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy), clean URLs |
| Accessibility | aria-expanded, aria-controls, aria-label, aria-hidden, focus-visible global styles, prefers-reduced-motion (CSS + JS), semantic HTML |
| Copy button | Dual-method fallback (clipboard API + execCommand), aria-label |
| Brand logos | 11 logos: sqlc.png + moq.png (official), 9 SVGs (custom), all with proper alt text |
| View Transitions | `ClientRouter` imported in LandingLayout |
| Prefetch | Enabled in astro.config.mjs (hover strategy) |
| Shiki dual themes | github-light + github-dark configured |
| HTML validation | `html-validate` enforced in CI (not suppressed) |
| Doc validation | `md-go-validator` in CI, 40/40 code blocks valid |
| Deduplication | jscpd configured, 0 clones at min-lines=3 |
| Build | 0 errors, 0 warnings, 2 hints (deprecated execCommand + script define:vars) |

### CI/CD — Three Workflows

| Workflow | Path Filter | Coverage |
|----------|-------------|----------|
| `ci.yml` | `*.go`, `go.mod`, `go.sum`, `testdata/**`, `.golangci.*` | go vet → test (95% threshold) → lint |
| `website.yml` | `website/**` | astro check → build → md-go-validator → html-validate → Firebase deploy |
| `benchmark.yml` | `*.go`, `go.mod`, `go.sum` | benchmarks with historical tracking, 150% alert / 300% hard-fail |

---

## B. PARTIALLY DONE 🟡

| # | Item | What's Done | What's Missing |
|---|------|-------------|----------------|
| 1 | **website/TODO_LIST.md is stale** | 6 items (D–L) marked PENDING | All 6 are actually DONE (verified in code): prefetch, data-astro-prefetch, View Transitions, Shiki themes, og:image, security headers, robots.txt sitemap |
| 2 | **HeroSection code duplication** | `hero-code.ts` extracts the raw code string | The syntax-highlighted HTML is still hand-crafted separately — not auto-derived from `hero-code.ts` |
| 3 | **`gh-pages` branch** | Master is fine, site deploys to Firebase | `gh-pages` branch is corrupted (has all project files staged). Unknown if any automation depends on it |

---

## C. NOT STARTED / REMAINING WORK 🔴

### Verified Against Code — Genuinely Still Open

| # | Task | Category | Effort | Source |
|---|------|----------|--------|--------|
| 1 | **Run Lighthouse audit** | Quality | 60min | All reports |
| 2 | **Browser visual QA (desktop + mobile)** | Quality | 30min | All reports |
| 3 | **Add Codecov coverage tracking** | CI | 15min | TODO_LIST #3 |
| 4 | **Performance profile hot paths (pprof)** | Go | 60min | TODO_LIST #2 |
| 5 | **`//go:generate` for detector table** | Go | 2hr | TODO_LIST #4 |
| 6 | **`RegisterDetector()` plugin API** | Go | 2hr | TODO_LIST #5 |
| 7 | **`WalkAndFilter()` bulk API** | Go | 2hr | TODO_LIST #6 |
| 8 | **Context support (`context.Context`)** | Go | 4hr | 12:06 report |
| 9 | **Custom 404 page (Starlight branding)** | Website | 15min | TODO_LIST #11 |
| 10 | **Skip-to-content link** | A11y | 5min | Multiple reports |
| 11 | **`role="banner"` / `role="contentinfo"`** | A11y | 2min | 10:28 report |
| 12 | **Move logos to `src/assets/` for Astro optimization** | Perf | 30min | Multiple reports |
| 13 | **Source real brand logos** | Visual | 30min | Multiple reports |
| 14 | **Versioned documentation (version selector)** | Docs | 60min | 12:06 report |
| 15 | **Release automation (goreleaser)** | Infra | 60min | 12:06 report |
| 16 | **Changelog automation** | Process | 30min | 12:06 report |
| 17 | **Add FUNDING.yml** | OSS | 5min | Multiple reports |
| 18 | **Resolve include patterns design question** | Go API | 30min | TODO_LIST #1 |
| 19 | **Dependabot auto-merge config** | CI | 15min | 12:06 report |
| 20 | **`pkg.go.dev` badge in README** | Docs | 5min | 12:06 report |

### Items From Reports Now Resolved (not in the list above)

These appeared as TODOs in earlier reports but are **confirmed DONE** in code:

- ~~Fix scroll animations (`.fade-in` → `[data-animate]`)~~ ✅ Fixed
- ~~Dead CSS in global.css~~ ✅ Removed (780→61 lines)
- ~~Dead generator CSS classes~~ ✅ Removed
- ~~Icon.astro not wired~~ ✅ Imported by 7 components
- ~~Section.astro unused~~ ✅ Used 6 times in index.astro
- ~~GeneratorGrid not using Card~~ ✅ Uses Card.astro
- ~~Hardcoded '11' in LandingLayout~~ ✅ Uses `generatorCount`
- ~~Light/dark mode~~ ✅ Full implementation
- ~~Canonical URLs~~ ✅ In LandingLayout
- ~~JSON-LD structured data~~ ✅ SoftwareApplication schema
- ~~OG images~~ ✅ astro-og-canvas + meta tags
- ~~focus-visible styles~~ ✅ Global rules
- ~~prefers-reduced-motion~~ ✅ CSS + JS
- ~~SectionHeader extraction~~ ✅ Used by 6 components
- ~~Plausible analytics~~ ✅ In LandingLayout
- ~~Security headers in firebase.json~~ ✅ 3 headers
- ~~robots.txt sitemap reference~~ ✅ Present
- ~~View Transitions~~ ✅ ClientRouter
- ~~Prefetch~~ ✅ hover strategy
- ~~Shiki dual themes~~ ✅ github-light + github-dark
- ~~CodeBlock unused `lang` prop~~ ✅ Removed
- ~~Emoji in UseCases~~ ✅ Replaced with SVG icons
- ~~Non-clickable generic card~~ ✅ border-dashed
- ~~`MustShouldFilter` → `MustFilter` rename~~ ✅ Done
- ~~`ReasonIncludePattern` → `ReasonOutsideScope` rename~~ ✅ Done
- ~~FEATURES.md "Dark theme only"~~ ✅ Now says "Light/Dark themes: FULLY_FUNCTIONAL"
- ~~installation.mdx wrong API~~ ✅ Fixed
- ~~benchmarks.mdx MDX escape~~ ✅ Fixed
- ~~errors.mdx completeness~~ ✅ Full sentinel error list + Helper interface
- ~~Copy button null-pointer~~ ✅ Guard + fallback
- ~~v0.1.0 tag~~ ✅ Tagged (plus v0.2.0, v2.1.0)

---

## D. KNOWN ISSUES 💥

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 1 | **md-go-validator `go install` may fail in CI** | 🔴 HIGH | `go install @latest` depends on whether md-go-validator's published version still has the `replace github.com/larsartmann/go-output => ../go-output` directive. If it does, CI fails. Currently working (presumably a clean version was tagged). **Mitigation needed**: either make the step `continue-on-error: true` or switch to clone + build. |
| 2 | **`validate:docs` npm script portability** | 🟡 MEDIUM | Uses `&>/dev/null` (bash-ism) which fails under `sh`/`dash`. Local-dev only (CI uses separate steps). Fix: use `>/dev/null 2>&1`. |
| 3 | **jscpd v4.0.9 `formats-exts` bug** | 🟡 MEDIUM | `formats-exts` config is broken for `.astro` files. Workaround: `scripts/dedup.sh` copies to temp `.html` files. Not reported upstream. |
| 4 | **`gh-pages` branch corrupted** | 🟡 MEDIUM | Contains all project files instead of website build. Site deploys to Firebase, so this branch appears unused. Decision needed: delete or reset. |
| 5 | **2 Astro hints** | 🟢 LOW | `document.execCommand` deprecated warning + `define:vars` treated as `is:inline`. Non-blocking. |
| 6 | **5 npm moderate vulnerabilities** | 🟢 LOW | From jscpd transitive deps. Not directly exploitable in a static site. |
| 7 | **`PhaseSection.astro` hardcoded type cast** | 🟢 LOW | Line 26: `phase.noteIcon as 'bolt' | 'check'` instead of using `UseCaseIcon` type. |

---

## E. STALE TODO LISTS — NEED UPDATING

### `website/TODO_LIST.md`

Items D–L are listed as PENDING but are all **DONE** (verified in code):

| ID | Task | Actual Status |
|----|------|---------------|
| D | Enable prefetch in astro.config.mjs | ✅ DONE |
| E | Add `data-astro-prefetch` to nav links | ✅ DONE |
| F | Add View Transitions (ClientRouter) | ✅ DONE |
| G | Move logos to `src/assets/` | 🔲 Still open |
| H | Configure Shiki dual themes | ✅ DONE |
| I | Add `og:image` meta to landing | ✅ DONE |
| J | Add security headers to firebase.json | ✅ DONE |
| K | Tighten Icon.astro Props | 🔲 Still open |
| L | Enhance robots.txt with sitemap | ✅ DONE |

Also item C ("Source real brand logos") contradicts itself — #97-102 marked DONE but C still listed as pending.

### `TODO_LIST.md` (root)

All 8 items are genuinely still open. No stale entries.

---

## F. TOP 25 THINGS TO DO NEXT

Sorted by impact × effort (Pareto principle):

### 🔴 HIGH Impact, LOW Effort (Do Now)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 1 | Fix `website/TODO_LIST.md` — mark D–L done, reconcile contradictions | Housekeeping | 10min |
| 2 | Clean up or delete `gh-pages` branch | Git | 5min |
| 3 | Fix `validate:docs` npm script (`&>` → `>/dev/null 2>&1`) | Bug | 2min |
| 4 | Add `continue-on-error: true` to md-go-validator CI step (safety net) | CI | 2min |
| 5 | Add FUNDING.yml | OSS | 5min |
| 6 | Add skip-to-content link | A11y | 5min |
| 7 | Add `role="banner"` / `role="contentinfo"` | A11y | 2min |
| 8 | Add `pkg.go.dev` badge to README | Docs | 5min |
| 9 | Report jscpd formats-exts bug upstream | Community | 15min |

### 🟡 HIGH Impact, MEDIUM Effort (Plan Soon)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 10 | Run Lighthouse audit + fix top issues | Quality | 60min |
| 11 | Browser visual QA (desktop + mobile) | Quality | 30min |
| 12 | Add Codecov integration + CI enforcement | CI | 15min |
| 13 | `WalkAndFilter()` bulk API | Go | 2hr |
| 14 | `RegisterDetector()` plugin API | Go | 2hr |
| 15 | Context support for I/O operations | Go | 4hr |

### 🟢 MEDIUM Impact, LOW Effort (Quick Wins)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 16 | Resolve include patterns design question | Go API | 30min |
| 17 | Custom 404 page (Starlight branding) | Website | 15min |
| 18 | Fix `PhaseSection.astro` type cast | Type Safety | 2min |
| 19 | Tighten Icon.astro Props to union type | Type Safety | 5min |
| 20 | `//go:generate` for detector table derivation | Go | 2hr |

### 🔵 LOW Impact, Various Effort (Backlog)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 21 | Performance profiling (pprof) | Go | 60min |
| 22 | Release automation (goreleaser) | Infra | 60min |
| 23 | Versioned documentation | Docs | 60min |
| 24 | Move logos to `src/assets/` for optimization | Perf | 30min |
| 25 | Interactive playground (WASM) | Website | 4hr+ |

---

## G. TOP #1 OPEN QUESTION

**Is the md-go-validator CI step reliable?**

`go install github.com/larsartmann/md-go-validator@latest` depends on the published tag not having the `replace github.com/larsartmann/go-output => ../go-output` directive. If `go-output` is ever not published or the replace directive leaks into a tag, **all website CI/CD breaks**. The safe fix is to make the step `continue-on-error: true` or switch to a clone + build approach.

---

## Project Metrics (Verified)

| Metric | Value |
|--------|-------|
| Go source files | 25 `.go` (prod) |
| Go test files | 23 |
| Test coverage | 97.4% |
| golangci-lint issues | 0 |
| Generators supported | 11 |
| Go module tags | v0.1.0, v0.2.0, v2.1.0 |
| Dependencies (direct) | 3 (doublestar, go-faster/yaml, onsi/ginkgo) |
| Website pages | 20 |
| Website components | 17 |
| Astro check | 0 errors, 0 warnings, 2 hints |
| Build time | 2.56s |
| CI workflows | 3 (ci, website, benchmark) |
| Status docs total | 51 files (13 in website/docs/status/, 19 in docs/status/, rest older) |
| Uncommitted changes | 0 |
| Unpushed commits | 0 |

---

## What This Report Replaces

All 13 files in `website/docs/status/2026-05-04_*.md` and all 19 files in `docs/status/2026-05-04_*.md` are superseded by this document. They can be archived or deleted.

---

_Arte in Aeternum_
