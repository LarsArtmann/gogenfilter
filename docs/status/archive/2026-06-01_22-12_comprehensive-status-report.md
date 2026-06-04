# Status Report — 2026-06-01 22:12

**Generated:** 2026-06-01 22:12 CEST
**Last commit:** `4e99ea2` — feat(website): add "Who Uses gogenfilter" page with build-time GitHub dependents discovery
**Since last report (13:27):** 2 major features completed (dependents page + CSP fix), both committed
**Latest tag:** `v3.0.2`
**Overall health:** HEALTHY & STABLE

---

## Executive Summary

gogenfilter v3 is a mature, production-ready Go library. This session delivered two major website improvements: a dynamic "Who Uses gogenfilter" page (build-time GitHub code search) and a critical CSP security fix that moved all 4 inline scripts to external files. The core library remains unchanged and pristine.

---

## Session Work Summary (2026-06-01 13:27 → 22:12)

### 1. Dependents Page (NEW)

Created `website/src/pages/dependents.astro` — a StarlightPage that:

- Queries GitHub code search API at build time for `"LarsArtmann/gogenfilter" language:Go`
- Deduplicates results by repository, sorts by star count
- Uses `GITHUB_TOKEN` when available (auto-set in CI), falls back gracefully
- Shows "Last updated" timestamp from build time
- Displays total file matches and unique repository count
- Graceful empty state with CTA
- Added to Community sidebar in `astro.config.mjs`

### 2. CSP Security Fix (FIXED)

The landing page had 4 `<script is:inline>` blocks that were blocked by Firebase's `script-src 'self'` CSP, breaking theme toggle, nav menu, copy button, and scroll animations. Fixed by moving all scripts to `public/js/`:

| Script             | Old                                                   | New File                                    |
| ------------------ | ----------------------------------------------------- | ------------------------------------------- |
| Theme init         | `<script is:inline>` in `<head>`                      | `public/js/theme-init.js`                   |
| Theme toggle + nav | `<script is:inline>` in Header.astro                  | `public/js/header.js`                       |
| Copy button        | `<script is:inline define:vars>` in HeroSection.astro | `public/js/copy-code.js` + `data-code` attr |
| Scroll animations  | `<script is:inline>` in index.astro                   | `public/js/animations.js`                   |

All 4 now use `<script is:inline src="/js/...">` which loads as external same-origin resources — fully CSP-compliant with `script-src 'self'`. No `unsafe-inline` needed.

---

## a) FULLY DONE

### Core Library

Same as previous report — all 7 source files stable, 99.8% coverage, 160 tests passing, race detector clean.

### Website

| Feature                  | Status | Details                                                               |
| ------------------------ | ------ | --------------------------------------------------------------------- |
| Landing page             | DONE   | Hero, features, generators, sections, animations — now CSP-compliant  |
| Documentation (17 pages) | DONE   | All content complete and synced                                       |
| Dependents page          | DONE   | Build-time GitHub code search, dynamic table with stars + description |
| OG images                | DONE   | Dynamic generation per page                                           |
| Firebase deployment      | DONE   | CSP headers, redirects, cache policies                                |
| SEO                      | DONE   | JSON-LD, OG meta, canonical, sitemap                                  |
| Search (PageFind)        | DONE   | 20 pages indexed                                                      |
| Dark/light theme         | DONE   | No-flash init, toggle persistence, system preference sync             |
| CSP compliance           | DONE   | All scripts external, strict `script-src 'self'`                      |

### CI/CD

| Workflow   | Status  | Details                                                      |
| ---------- | ------- | ------------------------------------------------------------ |
| Go CI      | DONE    | vet → test (race + 98% threshold) → lint → vulncheck → dedup |
| Website CI | DONE    | typecheck → build → validation → deploy to Firebase          |
| Benchmarks | DONE    | gh-pages storage with thresholds                             |
| Release    | DONE    | Tag-triggered with auto pre-release                          |
| Lighthouse | PARTIAL | Config exists, token not configured (not new this session)   |

### Security

| Aspect                 | Status | Details                                                                                               |
| ---------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| CSP                    | DONE   | Strict headers: `script-src 'self'`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data: blob:` |
| HSTS                   | DONE   | 2-year max-age, includeSubDomains, preload                                                            |
| X-Frame-Options        | DONE   | DENY                                                                                                  |
| X-Content-Type-Options | DONE   | nosniff                                                                                               |
| Referrer-Policy        | DONE   | strict-origin-when-cross-origin                                                                       |
| Permissions-Policy     | DONE   | Camera, mic, geolocation disabled                                                                     |
| Cross-Origin policies  | DONE   | CORP: same-origin, COOP: same-origin                                                                  |

---

## b) PARTIALLY DONE

| Item                      | Status                        | What's missing                                                                                                                                |
| ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Lighthouse CI             | CONFIG EXISTS, NOT FUNCTIONAL | `LHCI_GITHUB_APP_TOKEN` secret not configured. Accessibility assertions also fail on live site (color-contrast, label-content-name-mismatch). |
| `TODO_LIST.md`            | DOES NOT EXIST                | Identified in previous reports. Still not created.                                                                                            |
| `ROADMAP.md`              | DOES NOT EXIST                | Identified in previous reports. Still not created.                                                                                            |
| `docs/DOMAIN_LANGUAGE.md` | EXISTS, MAY BE STALE          | Last updated 2026-05-04. May not reflect `FilterDetailed`, trace support, or dependents page.                                                 |

---

## c) NOT STARTED

| Item                                      | Priority | Notes                                                  |
| ----------------------------------------- | -------- | ------------------------------------------------------ |
| Fix `goconst` lint warning                | LOW      | 3x repeated string in `example_test.go`. 2-min fix.    |
| Resolve Dependabot npm alerts (4)         | LOW      | All in website transitive deps, not Go production code |
| Lighthouse accessibility fixes            | MEDIUM   | color-contrast and label issues on root page           |
| Create `TODO_LIST.md`                     | MEDIUM   | Third report identifying this gap                      |
| Create `ROADMAP.md`                       | MEDIUM   | Third report identifying this gap                      |
| Update `docs/DOMAIN_LANGUAGE.md`          | LOW      | Add trace/FilterDetailed, dependents page concept      |
| Add `dependents.astro` to CI path filters | LOW      | Ensure website CI runs when dependents page changes    |
| Test dependents page with real dependents | LOW      | Currently returns empty (no public dependents)         |
| Add "Who Uses" link to landing page CTA   | LOW      | Cross-promote the dependents page                      |
| Website performance audit                 | MEDIUM   | Establish Lighthouse score baselines                   |

---

## d) TOTALLY FUCKED UP!

Nothing is broken. This session eliminated the one active issue (CSP violations).

**Annoyances remaining:**

- Lighthouse CI dead weight — runs but produces no actionable status checks
- 4 npm Dependabot alerts — noise, no production impact
- `TODO_LIST.md` and `ROADMAP.md` still don't exist after being flagged in 3 consecutive status reports
- `goconst` lint warning — 2 minutes to fix, still outstanding
- 12 archived status reports in `docs/status/` — could benefit from a "current only" convention

---

## e) WHAT WE SHOULD IMPROVE!

### Immediate (< 30 min)

1. **Fix `goconst` lint** — extract repeated string in `example_test.go` to constant
2. **Create `TODO_LIST.md`** — stop identifying this as a gap and actually do it
3. **Create `ROADMAP.md`** — even a minimal "maintenance mode vs v4" decision would be valuable
4. **Configure or remove Lighthouse CI** — dead CI is worse than no CI
5. **Resolve npm Dependabot alerts** — `npm audit fix` or add override

### Short-term (this week)

6. **Lighthouse accessibility fixes** — fix root page color-contrast and label-content-name-mismatch, then configure token
7. **Update `FEATURES.md`** — add dependents page, update date
8. **Update `docs/DOMAIN_LANGUAGE.md`** — add FilterDetailed, trace, dependents concepts
9. **Add dependents page to CI path filters** — `website.yml` triggers
10. **Add "Who Uses" CTA on landing page** — cross-link the dependents page
11. **Archive old status reports** — keep last 3, move rest to `archive/`

### Medium-term (this month)

12. **Website performance audit** — establish Lighthouse baselines, optimize if needed
13. **Test dependents page with real dependents** — verify it renders correctly when repos exist
14. **Add dependents page to sitemap/navigation validation** — CI stale reference check
15. **Review and consolidate `docs/planning/`** — some docs may be outdated

### Strategic (requires decision)

16. **Define v3 maintenance mode vs v4 vision** — this is still the #1 unanswered question
17. **`golangci-lint` plugin exploration** — natural consumer of gogenfilter
18. **Custom detector registration API** — community extensibility

---

## f) Top #25 Things We Should Get Done Next

### Tier 1: Immediate (next session)

| #   | Task                              | Impact | Effort | Session context                    |
| --- | --------------------------------- | ------ | ------ | ---------------------------------- |
| 1   | Create `TODO_LIST.md`             | High   | 30 min | Flagged 3 times, just do it        |
| 2   | Create `ROADMAP.md`               | High   | 30 min | Flagged 3 times, strategic clarity |
| 3   | Fix `goconst` lint                | Low    | 2 min  | Persistent warning                 |
| 4   | Resolve npm Dependabot alerts     | Low    | 10 min | Alert noise reduction              |
| 5   | Configure or remove Lighthouse CI | Medium | 15 min | Dead CI cleanup                    |

### Tier 2: Short-term (this week)

| #   | Task                                              | Impact | Effort  |
| --- | ------------------------------------------------- | ------ | ------- |
| 6   | Lighthouse accessibility fixes                    | Medium | 1-2 hrs |
| 7   | Update `FEATURES.md` with dependents page         | Low    | 10 min  |
| 8   | Update `docs/DOMAIN_LANGUAGE.md`                  | Low    | 30 min  |
| 9   | Add dependents page to website CI path filters    | Low    | 5 min   |
| 10  | Add "Who Uses" CTA on landing page                | Low    | 15 min  |
| 11  | Archive old status reports (keep last 3)          | Low    | 5 min   |
| 12  | Add `dependents.astro` import to `/v3` validation | Low    | 5 min   |

### Tier 3: Medium-term (this month)

| #   | Task                                                  | Impact | Effort |
| --- | ----------------------------------------------------- | ------ | ------ |
| 13  | Website performance audit + baseline                  | Medium | 1 hr   |
| 14  | Test dependents page with real data                   | Medium | 30 min |
| 15  | Add dependents to stale reference checks              | Low    | 10 min |
| 16  | Review `docs/planning/` consolidation                 | Low    | 30 min |
| 17  | Add `CODE_OF_CONDUCT.md` to website nav               | Low    | 10 min |
| 18  | Verify `GITHUB_TOKEN` works in CI for dependents page | Medium | 15 min |
| 19  | Add CSP hash generation docs to AGENTS.md             | Low    | 10 min |

### Tier 4: Strategic (requires product decision)

| #   | Task                                        | Impact | Effort   |
| --- | ------------------------------------------- | ------ | -------- |
| 20  | Define v3 maintenance mode vs v4 scope      | High   | Decision |
| 21  | Evaluate `golangci-lint` plugin opportunity | High   | Research |
| 22  | Design custom detector registration API     | High   | Design   |
| 23  | Community feedback collection setup         | Medium | Setup    |
| 24  | WASM build feasibility                      | Low    | Research |
| 25  | Security / supply chain hardening audit     | Medium | 2-3 hrs  |

---

## g) Top #1 Question I Cannot Figure Out Myself

**Is gogenfilter v3 "done" — entering maintenance mode — or is there a v4 vision with expanded scope?**

This single decision determines the entire strategic direction. Every item in Tier 4 (and some in Tier 3) is blocked until it's answered. The library is complete, tested, documented, and deployed. Without a decision, we're either:

- Under-maintaining a finished product (risk: stagnation)
- Over-engineering a maintenance-only project (risk: unnecessary complexity)

The `TODO_LIST.md` and `ROADMAP.md` we keep flagging but not creating would literally contain the answer to this question. That's why it's the #1 blocker.

---

## Metrics Summary

| Metric                | Value                 | Change since 13:27        |
| --------------------- | --------------------- | ------------------------- |
| Go version            | 1.26.3                | —                         |
| Latest tag            | v3.0.2                | —                         |
| Source files          | 7                     | —                         |
| Test files            | 22                    | —                         |
| Total lines (all .go) | 8,435                 | —                         |
| Tests passing         | 160                   | —                         |
| Code coverage         | 99.8%                 | —                         |
| Race detector         | Clean                 | —                         |
| `go vet`              | Clean                 | —                         |
| Benchmarks            | 22 passing            | —                         |
| Dependencies          | 2 production + 2 test | —                         |
| Website pages         | 20                    | **+1** (dependents)       |
| Website JS files      | 4 (all CSP-compliant) | **+4** (external scripts) |
| CSP inline violations | 0                     | **-4** (fixed)            |
| CI workflows          | 5                     | —                         |
| Open issues           | 0                     | —                         |
| Open PRs              | 0                     | —                         |
| Dependabot alerts     | 4 (npm transitive)    | —                         |
| Lint issues           | 1 (`goconst`)         | —                         |
