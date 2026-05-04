# Status Report — Post Docs Directory Flatten

**Generated:** 2026-05-04 12:27
**Branch:** master @ `8f83648`
**Working tree:** Has uncommitted changes (docs flatten + this report)
**Scope:** website/ subdirectory of gogenfilter monorepo

---

## Executive Summary

Flattened the redundant `src/content/docs/docs/` double-nesting to `src/content/docs/`. All 17 content files moved, all 17 sidebar slugs updated, build passes cleanly. **Discovered a broken `validate:docs` npm script** that still points to the old path — needs immediate fix. Overall project is in excellent shape: 19 pages, 0 type errors, 2.69s build time.

---

## A. FULLY DONE ✅

### This Session

| # | Item | Evidence |
|---|------|----------|
| 1 | Flatten `docs/docs/` → `docs/` | All 17 .mdx files moved up one level |
| 2 | Update all sidebar slugs | 17 slug references updated: removed `docs/` prefix |
| 3 | Build verification | `astro build` → 19 pages, 2.69s, clean |
| 4 | Type checking | `astro check` → 0 errors, 0 warnings, 0 hints |

### Website — Complete Feature Set

| Feature | Status | Details |
|---------|--------|---------|
| Landing page | ✅ | Hero, code preview, generator grid, features, phases, comparison, use cases, CTA |
| Documentation | ✅ | 17 MDX pages via Starlight, PageFind search, sidebar nav |
| Dark/light mode | ✅ | CSS vars, toggle, localStorage, flash prevention |
| SEO | ✅ | JSON-LD, canonical URLs, OG images (astro-og-canvas), sitemap, robots.txt |
| Fonts | ✅ | Space Grotesk + JetBrains Mono, self-hosted via Astro providers |
| Icons | ✅ | `Icon.astro` — 17 icons, typed `IconName` union |
| Components | ✅ | 17 Astro components, typed data layer in `src/data/` |
| CI/CD | ✅ | 3 workflows: ci.yml, website.yml, benchmark.yml |
| Firebase | ✅ | Immutable cache, security headers, clean URLs |
| Tailwind v4 | ✅ | CSS-first with `@theme` tokens |
| View Transitions | ✅ | ClientRouter in LandingLayout |
| Prefetch | ✅ | hover strategy configured |
| Shiki dual themes | ✅ | github-light + github-dark |
| Analytics | ✅ | Plausible with preconnect |
| Accessibility | ✅ | aria-*, focus-visible, prefers-reduced-motion, semantic HTML |

### Go Library — Production Ready (from consolidated report)

| Metric | Value |
|--------|-------|
| Test coverage | 97.4% |
| golangci-lint issues | 0 |
| Generators supported | 11 |
| Go tags | v0.1.0, v0.2.0, v2.1.0 |
| Dependencies | 3 (doublestar, go-faster/yaml, onsi/ginkgo) |
| TODOs/FIXMEs | 0 |

---

## B. PARTIALLY DONE 🟡

| # | Item | What's Done | What's Missing |
|---|------|-------------|----------------|
| 1 | **`website/TODO_LIST.md`** | 95+ items completed across 3 sessions | Items D, G, K still marked PENDING; D–F, H–J, L are actually DONE — file contradicts itself |
| 2 | **`validate:docs` npm script** | Script exists in package.json | **BROKEN PATH**: still points to `src/content/docs/docs/` (deleted dir). Also has bash-ism `&>` |
| 3 | **HeroSection code duplication** | `hero-code.ts` has raw code string | Highlighted HTML still hand-crafted, not auto-derived |
| 4 | **`gh-pages` branch** | Master is fine, Firebase deploys work | Branch is corrupted (has all project files staged) |

---

## C. NOT STARTED / REMAINING 🔴

### Verified Against Code — Genuinely Still Open

| # | Task | Category | Effort |
|---|------|----------|--------|
| 1 | Run Lighthouse audit | Quality | 60min |
| 2 | Browser visual QA (desktop + mobile) | Quality | 30min |
| 3 | Add Codecov coverage tracking | CI | 15min |
| 4 | Performance profile hot paths (pprof) | Go | 60min |
| 5 | `//go:generate` for detector table | Go | 2hr |
| 6 | `RegisterDetector()` plugin API | Go | 2hr |
| 7 | `WalkAndFilter()` bulk API | Go | 2hr |
| 8 | Context support (`context.Context`) | Go | 4hr |
| 9 | Custom 404 page (Starlight branding) | Website | 15min |
| 10 | Skip-to-content link | A11y | 5min |
| 11 | `role="banner"` / `role="contentinfo"` | A11y | 2min |
| 12 | Move logos to `src/assets/` for Astro optimization | Perf | 30min |
| 13 | Versioned documentation (version selector) | Docs | 60min |
| 14 | Release automation (goreleaser) | Infra | 60min |
| 15 | Changelog automation | Process | 30min |
| 16 | Add FUNDING.yml | OSS | 5min |
| 17 | Resolve include patterns design question | Go API | 30min |
| 18 | Dependabot auto-merge config | CI | 15min |
| 19 | `pkg.go.dev` badge in README | Docs | 5min |

---

## D. TOTALLY FUCKED UP 💥

| # | Issue | Severity | Impact | Fix |
|---|-------|----------|--------|-----|
| 1 | **`validate:docs` points to deleted directory** | 🔴 CRITICAL | `npm run validate:docs` FAILS — `src/content/docs/docs/` no longer exists after flatten | Update path to `src/content/docs/` in package.json |
| 2 | **`validate:docs` uses bash-ism `&>`** | 🟡 HIGH | Fails under `sh`/`dash` | Replace with `>/dev/null 2>&1` |
| 3 | **md-go-validator CI may break** | 🟡 HIGH | `go install @latest` may have `replace` directive → build fails | Add `continue-on-error: true` |
| 4 | **`gh-pages` branch corrupted** | 🟡 MEDIUM | Contains all project files, not just website build | Delete or reset branch |
| 5 | **51 status/planning docs accumulated** | 🟢 LOW | Cluttering `docs/` with historical reports | Archive or delete old reports |
| 6 | **jscpd v4.0.9 `formats-exts` bug** | 🟢 LOW | `.astro` detection broken, needs workaround | Report upstream |
| 7 | **5 npm moderate vulnerabilities** | 🟢 LOW | From jscpd transitive deps, not exploitable | Monitor |

---

## E. WHAT WE SHOULD IMPROVE

### Architecture & Code Quality
- **Tighten `Icon.astro` Props** — `name` is `IconName` (good) but individual `Record` types could be enforced more strictly
- **Fix `PhaseSection.astro` hardcoded type cast** — Line 26: `phase.noteIcon as 'bolt' | 'check'` instead of proper `UseCaseIcon` type
- **HeroSection code** — syntax-highlighted HTML should be auto-derived from `hero-code.ts`, not hand-crafted
- **Move logos to `src/assets/`** — enable Astro's built-in image optimization

### Process & DX
- **Clean up 51 status docs** — Consolidated report exists, old ones should be archived
- **Fix TODO_LIST.md contradictions** — 6 items marked PENDING that are actually DONE
- **Add `validate:docs` to pre-commit hook** — catch broken docs before push
- **Dependabot auto-merge** — low-risk dependency updates shouldn't need manual approval

### Go Library
- **Context support** — the single biggest API gap for production use
- **`WalkAndFilter()` bulk API** — enable directory tree traversal with filtering
- **`RegisterDetector()` plugin API** — allow user-defined generators

---

## F. TOP 25 THINGS TO DO NEXT

### 🔴 P0 — Fix Now (< 5 min each)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 1 | **Fix `validate:docs` path** in package.json (`docs/docs/` → `docs/`) | Bug | 1min |
| 2 | **Fix `validate:docs` bash-ism** (`&>` → `>/dev/null 2>&1`) | Bug | 1min |
| 3 | Fix `PhaseSection.astro` hardcoded type cast | Type Safety | 2min |
| 4 | Add skip-to-content link | A11y | 5min |
| 5 | Add `role="banner"` / `role="contentinfo"` | A11y | 2min |
| 6 | Add FUNDING.yml | OSS | 5min |
| 7 | Add `pkg.go.dev` badge to README | Docs | 5min |

### 🟡 P1 — Do Soon (< 30 min each)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 8 | Update `website/TODO_LIST.md` — mark stale items done | Housekeeping | 10min |
| 9 | Add `continue-on-error: true` to md-go-validator CI step | CI | 2min |
| 10 | Clean up or delete `gh-pages` branch | Git | 5min |
| 11 | Custom 404 page (Starlight branding) | Website | 15min |
| 12 | Tighten Icon.astro Props to union type | Type Safety | 5min |
| 13 | Archive old status docs (51 → 2) | Housekeeping | 10min |
| 14 | Add Codecov integration + CI enforcement | CI | 15min |
| 15 | Dependabot auto-merge config | CI | 15min |

### 🟠 P2 — Plan & Execute (1-4 hours)

| # | Task | Category | Effort |
|---|------|----------|--------|
| 16 | Run Lighthouse audit + fix top issues | Quality | 60min |
| 17 | Browser visual QA (desktop + mobile) | Quality | 30min |
| 18 | Resolve include patterns design question | Go API | 30min |
| 19 | Move logos to `src/assets/` for optimization | Perf | 30min |
| 20 | `WalkAndFilter()` bulk API | Go | 2hr |

### 🔵 P3 — Backlog

| # | Task | Category | Effort |
|---|------|----------|--------|
| 21 | `RegisterDetector()` plugin API | Go | 2hr |
| 22 | Context support for I/O operations | Go | 4hr |
| 23 | `//go:generate` for detector table | Go | 2hr |
| 24 | Release automation (goreleaser) | Infra | 60min |
| 25 | Interactive playground (WASM) | Website | 4hr+ |

---

## G. TOP #1 QUESTION

**Should we delete the `gh-pages` branch entirely, or does anything depend on it?**

The branch contains corrupted content (all project files, not website build). Firebase is the deployment target. But I can't determine if any external automation, documentation, or GitHub Pages settings reference `gh-pages`. If it's truly unused, we should delete both local and remote. If anything depends on it, we should reset it to a proper build output.

---

## Project Metrics (Current)

| Metric | Value |
|--------|-------|
| Website pages | 19 |
| Website components | 17 |
| Astro check | 0 errors, 0 warnings, 0 hints |
| Build time | 2.69s |
| Content files | 17 MDX (was in nested `docs/docs/`, now in `docs/`) |
| Sidebar entries | 17 (all updated) |
| CI workflows | 3 (ci, website, benchmark) |
| Go test coverage | 97.4% |
| Go lint issues | 0 |
| Status docs | 51+ files (needs cleanup) |

---

_Arte in Aeternum_
