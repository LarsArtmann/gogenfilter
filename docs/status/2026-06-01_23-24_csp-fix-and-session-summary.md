# Status Report — 2026-06-01 23:24

**Generated:** 2026-06-01 23:24 CEST
**Last commit:** `a7dcafd` — fix(website): resolve CSP violations with Astro built-in CSP hash generation
**Since last report (22:46):** CSP properly fixed (was incomplete), deployed to production
**Latest tag:** `v3.0.2`
**Overall health:** HEALTHY & STABLE — CSP violations eliminated on production

---

## Executive Summary

The previous CSP "fix" was incomplete. It moved 4 custom scripts to external files but missed the 6 inline scripts that Starlight injects on every docs page (ThemeProvider, ThemeSelect, Search, SidebarPersister×2, Tabs). The real fix: enable Astro v6's built-in CSP system which auto-computes SHA-256 hashes for ALL inline scripts at build time and emits per-page `<meta>` tags. Firebase header CSP removed to avoid conflicts. Website deployed and serving correctly. CI green across all workflows.

---

## Session Work Summary (2026-06-01 13:27 → 23:24)

### Complete Session Timeline

| Time | What | Status |
|------|------|--------|
| ~13:27 | Dependents page + CSP "fix" (prior session) | Done (CSP incomplete) |
| ~22:12 | Status report written | Done |
| ~22:20 | 8 maintenance items (lint fix, TODO_LIST, ROADMAP, FEATURES, CTA, archival, docs) | Done |
| ~22:46 | Deep audit + status report | Done |
| ~23:00 | User reported CSP violations still happening | Discovered root cause |
| ~23:15 | Astro v6 CSP enabled, Firebase CSP removed, Permissions-Policy fixed | Done |
| ~23:22 | Website built, verified, deployed to Firebase | Done, CI green |

### 1. CSP Fix — For Real This Time (DONE)

**Root cause of original failure**: Firebase `script-src 'self'` header blocked ALL inline scripts. The prior "fix" (`0aef07d`) only moved 4 custom scripts (`theme-init.js`, `header.js`, `copy-code.js`, `animations.js`) to external files. It missed:

- **Starlight ThemeProvider** — inline theme init script (FOUC prevention)
- **Starlight ThemeSelect** — inline theme picker sync
- **Starlight Search** — inline keyboard shortcut detection
- **Starlight SidebarPersister** — 2 inline scripts (state + scroll restore)
- **Starlight Tabs** — inline synced tab restore
- **JSON-LD** — inline `application/ld+json` on landing page (not executed as JS, but still flagged)

**Solution**: Enable Astro v6 built-in CSP (`security.csp` in `astro.config.mjs`):
- Astro auto-computes SHA-256 hashes for all inline scripts at build time
- Emits `<meta http-equiv="content-security-policy">` per page with correct hashes
- 17 script hashes + 4 style hashes per page
- Removed CSP from Firebase headers (no conflict between `<meta>` and HTTP header CSP)
- Removed `interest-cohort=()` from Permissions-Policy (was causing browser warning)

### 2. Maintenance Sweep (DONE)

8 items completed:
- Fixed `goconst` lint (extracted `sqlcDBContent` constant)
- Created `TODO_LIST.md`
- Created `ROADMAP.md`
- Updated `FEATURES.md`
- Added "Who Uses gogenfilter" CTA to landing page
- Archived 9 old status reports
- Documented Lighthouse CI token requirement
- Updated AGENTS.md

### 3. Deep Audit (DONE)

Comprehensive audit of types, tests, dependencies, linters, accessibility, and DOMAIN_LANGUAGE.md. Key findings documented below.

---

## a) FULLY DONE

### Core Library

| Metric | Value |
|--------|-------|
| Source files | 7 |
| Test files | 22 |
| Tests passing | 160 |
| Code coverage | 99.8% |
| Race detector | Clean |
| `go vet` | Clean |
| Lint issues | 0 |
| Benchmarks | 22 passing |
| Dependencies | 2 production + 2 test |

### Website

| Feature | Status | Details |
|---------|--------|---------|
| Landing page | DONE | Hero, features, generators, sections, animations |
| Documentation (17 pages) | DONE | All content complete and synced |
| Dependents page | DONE | Build-time GitHub code search |
| CSP compliance | DONE | Astro v6 built-in CSP with auto-hashing |
| OG images | DONE | Dynamic generation per page |
| Firebase deployment | DONE | Security headers (non-CSP), redirects, cache |
| SEO | DONE | JSON-LD, OG meta, canonical, sitemap |
| Search (PageFind) | DONE | 20 pages indexed |
| Dark/light theme | DONE | No-flash init, toggle persistence |
| "Who Uses" CTA | DONE | Cross-promotion in CTASection |

### CI/CD

| Workflow | Status | Details |
|----------|--------|---------|
| Go CI | DONE | vet → test (race + 98%) → lint → vulncheck → dedup |
| Website CI | DONE | typecheck → build → validation → deploy |
| Benchmarks | DONE | gh-pages storage with thresholds |
| Release | DONE | Tag-triggered with auto pre-release |
| Lighthouse | PARTIAL | Config exists, token not configured (documented) |

### Security

| Aspect | Status | Details |
|--------|--------|---------|
| CSP | DONE | Astro `<meta>` tags with auto-computed SHA-256 hashes per page |
| HSTS | DONE | 2-year max-age, includeSubDomains, preload |
| X-Frame-Options | DONE | DENY |
| X-Content-Type-Options | DONE | nosniff |
| Referrer-Policy | DONE | strict-origin-when-cross-origin |
| Permissions-Policy | DONE | Camera, mic, geolocation disabled |
| Cross-Origin policies | DONE | CORP: same-origin, COOP: same-origin |

### Documentation

| Item | Status |
|------|--------|
| `TODO_LIST.md` | DONE |
| `ROADMAP.md` | DONE |
| `FEATURES.md` | DONE (updated 2026-06-01) |
| `docs/DOMAIN_LANGUAGE.md` | DONE (already current) |
| `AGENTS.md` | DONE (CSP architecture documented) |
| `README.md` | DONE |
| `CHANGELOG.md` | DONE |

---

## b) PARTIALLY DONE

| Item | Status | What's missing |
|------|--------|----------------|
| Lighthouse CI | CONFIG EXISTS, DOCUMENTED | `LHCI_GITHUB_APP_TOKEN` not configured. Accessibility assertions fail on live site. Workflow documented with header comment. |
| Website accessibility | MOSTLY GOOD | 3 minor issues: decorative dots missing `aria-hidden`, dependents table missing `<caption>`, star header missing `aria-label` |
| DOMAIN_LANGUAGE.md | MOSTLY COMPLETE | 9 exported symbols not documented (DetectReasonReader, FilterPathsDetailed, 11 Is*Generated, AllFilterOptions/AllGeneratorOptions/AllFilterReasons, MatchPattern, *FS variants, WithFS, ErrorCoder, sentinel errors) |
| Firebase Node.js deprecation | NOTED | `FirebaseExtended/action-hosting-deploy@v0` runs on Node.js 20 (deprecated June 16, 2026). Needs `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` or action update. |

---

## c) NOT STARTED

| Item | Priority | Effort | Notes |
|------|----------|--------|-------|
| Fix 3 a11y issues | HIGH | 5 min | aria-hidden, table caption, star header |
| Extract `SQLCOperation` typed constants | MEDIUM | 15 min | Magic strings in sqlc.go |
| Update DOMAIN_LANGUAGE.md (9 missing exports) | MEDIUM | 30 min | Completeness |
| Resolve 4 npm Dependabot alerts | LOW | 10 min | Transitive website deps only |
| Lighthouse accessibility fixes | MEDIUM | 1-2 hrs | color-contrast, label issues |
| Configure or remove Lighthouse CI | MEDIUM | 15 min | Token or removal |
| Website performance audit | MEDIUM | 1 hr | Establish baselines |
| Test dependents page with real data | LOW | 30 min | Verify table rendering |
| Fix Firebase Node.js 20 deprecation | LOW | 10 min | Force Node 24 or update action |
| Cache `IsValid()` lookups | LOW | 10 min | Package-level `validOptions` map |
| Review `docs/planning/` for stale content | LOW | 30 min | May contain outdated info |

---

## d) TOTALLY FUCKED UP!

**Nothing is broken.** The CSP fix is deployed and working. The core library is pristine.

**Annoyances remaining:**

- Lighthouse CI dead weight (documented but not actionable without token)
- 4 npm Dependabot alerts (transitive deps, no production impact)
- `SQLCConfigError.Operation` uses untyped magic strings
- `IsValid()` allocates on every call
- Firebase deploy action uses deprecated Node.js 20
- 9 exported symbols missing from DOMAIN_LANGUAGE.md

**Session mistake acknowledged:**

The first CSP "fix" (`0aef07d`) was incomplete. It addressed the symptom (4 custom inline scripts) without understanding the full scope (Starlight framework injects 6 more). The second fix (`a7dcafd`) uses Astro's built-in CSP to handle ALL inline scripts automatically, including future additions.

---

## e) WHAT WE SHOULD IMPROVE!

### Immediate (< 30 min total)

1. **Fix 3 a11y issues** — `aria-hidden` on decorative dots, `<caption>` on dependents table, `aria-label` on star header. Lighthouse score improvement, trivial effort.
2. **Extract `SQLCOperation` typed constants** — Stronger types, prevent typos in `sqlc.go`
3. **Update DOMAIN_LANGUAGE.md** — Add 9 missing exported symbols
4. **Fix Firebase Node.js 20 deprecation** — Add env var or update action before June 16

### Short-term (this week)

5. **Resolve npm Dependabot alerts** — `npm audit fix` or overrides
6. **Lighthouse accessibility fixes** — Fix color-contrast and label issues
7. **Configure or remove Lighthouse CI** — Install GitHub App or delete workflow
8. **Website performance audit** — Establish Lighthouse baselines
9. **Test dependents page with real data** — Verify rendering

### Strategic (requires decision)

10. **Define v3 maintenance mode vs v4** — The #1 unanswered question
11. **Evaluate golangci-lint plugin opportunity** — Natural ecosystem fit
12. **Design custom detector registration API** — Community extensibility

---

## f) Top #25 Things We Should Get Done Next

### Tier 1: Immediate (< 30 min each)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Fix 3 a11y issues (aria-hidden, caption, star label) | High | 5 min |
| 2 | Fix Firebase Node.js 20 deprecation warning | Medium | 10 min |
| 3 | Extract `SQLCOperation` typed constants | Medium | 15 min |
| 4 | Update DOMAIN_LANGUAGE.md (9 missing exports) | Medium | 30 min |
| 5 | Resolve npm Dependabot alerts | Low | 10 min |

### Tier 2: Short-term (this week)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 6 | Lighthouse accessibility fixes (color-contrast, labels) | Medium | 1-2 hrs |
| 7 | Configure or remove Lighthouse CI | Medium | 15 min |
| 8 | Website performance audit + baselines | Medium | 1 hr |
| 9 | Test dependents page with real data | Medium | 30 min |
| 10 | Cache `IsValid()` lookups in package-level map | Low | 10 min |
| 11 | Add `exhaustruct` exclusions for error types | Low | 5 min |
| 12 | Add `notFilteredResult()` helper to reduce detection.go duplication | Low | 10 min |

### Tier 3: Medium-term (this month)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 13 | Review `docs/planning/` for stale content | Low | 30 min |
| 14 | Add dependents page to stale reference CI check | Low | 10 min |
| 15 | Extract `optionSet` type for cleaner map usage | Low | 15 min |
| 16 | Consider deprecating `FilterPaths([]bool)` | Low | 30 min |
| 17 | Add fuzz test for `DetectReasonReader` | Low | 15 min |
| 18 | Add CODE_OF_CONDUCT.md to website nav | Low | 10 min |
| 19 | Verify `GITHUB_TOKEN` works in CI for dependents page | Medium | 15 min |

### Tier 4: Strategic (requires product decision)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 20 | Define v3 maintenance mode vs v4 scope | High | Decision |
| 21 | Evaluate golangci-lint plugin opportunity | High | Research |
| 22 | Design custom detector registration API | High | Design |
| 23 | Community feedback collection setup | Medium | Setup |
| 24 | Supply chain hardening (sigstore, SLSA, SBOM) | Medium | 2-3 hrs |
| 25 | WASM build feasibility | Low | Research |

---

## g) Top #1 Question I Cannot Figure Out Myself

**Is gogenfilter v3 "done" — entering maintenance mode — or is there a v4 vision with expanded scope?**

Same question as every previous report. The `TODO_LIST.md` and `ROADMAP.md` now exist and present both options. Every Tier 4 item (golangci-lint plugin, custom detector API, WASM, supply chain) is blocked until this is answered. The library is complete, tested, documented, deployed. The `ROADMAP.md` frames this as the fundamental decision point.

---

## Architecture Notes

### CSP Architecture (current)

```
Astro build (astro.config.mjs: security.csp)
  → Computes SHA-256 hashes for ALL inline scripts
  → Emits <meta http-equiv="content-security-policy"> per page
  → 17 script hashes + 4 style hashes per page

Firebase (firebase.json headers)
  → HSTS, X-Frame-Options, X-Content-Type-Options, etc.
  → NO Content-Security-Policy header (Astro owns CSP)

Browser receives:
  → Security headers from Firebase (non-CSP)
  → CSP <meta> tag from HTML (with page-specific hashes)
  → All inline scripts match their hashes → allowed
  → External scripts in /js/ → allowed via 'self'
```

### Type Safety Opportunities

| Current | Proposed | Benefit |
|---------|----------|---------|
| `SQLCConfigError.Operation string` | `SQLCOperation` typed constants | Compile-time checking |
| `IsValid()` per-call allocation | Package-level `validOptions` map | Zero allocation |
| Raw `map[FilterOption]struct{}` | `type optionSet` with methods | Cleaner encapsulation |
| `FilterPaths() ([]bool, error)` | Deprecate for `FilterPathsDetailed()` | Eliminate weakest API |

---

## CI Status

| Workflow | Run ID | Status | Commit |
|----------|--------|--------|--------|
| Go CI | — | SKIPPED | No Go files changed |
| Website | 26782858245 | ✅ SUCCESS | `a7dcafd` |
| Benchmark | — | SKIPPED | No Go files changed |
| Lighthouse | 26782858286 | 🔄 RUNNING | `a7dcafd` |

---

## Metrics Summary

| Metric | Value | Change since 22:46 |
|--------|-------|-------------------|
| Go version | 1.26.3 | — |
| Latest tag | v3.0.2 | — |
| Source files | 7 | — |
| Test files | 22 | — |
| Tests passing | 160 | — |
| Code coverage | 99.8% | — |
| Race detector | Clean | — |
| Lint issues | 0 | — |
| Website pages | 20 | — |
| CSP violations on production | 0 | **ALL FIXED** |
| CSP approach | Astro `<meta>` + SHA-256 hashes | **NEW** (was Firebase header) |
| Status reports (active) | 3 | — |
| Status reports (archived) | 23 | — |
| Open issues | 0 | — |
| Open PRs | 0 | — |
