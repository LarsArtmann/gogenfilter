# TODO List

**Updated:** 2026-06-11
**Status:** Active

## In Progress

None.

## Completed (v3.2.0)

- [x] **Add 7 new generator detectors** — mockery, ent, gqlgen, easyjson, msgp, counterfeiter, go-swagger (18 total, up from 11)
- [x] **Add `DetectReasonFile` / `DetectReasonFileFS`** — Two-phase detection in one call
- [x] **Add `FilterWithContent` / `FilterDetailedWithContent`** — Avoid double I/O for callers with pre-read content
- [x] **Add `ScanProject`** — Walk `fs.FS`, detect all generated files, return structured `ScanResult`
- [x] **Add `ExclusionPattern()` on `FilterReason`** — Regex patterns for generators with consistent filenames
- [x] **Update documentation** — AGENTS.md, FEATURES.md, CHANGELOG.md, README.md, website docs
- [x] **Update ROADMAP.md** — Restructured into ranked v4 candidates with deprioritized items

## Pending

### CI/CD

- [ ] **Configure or remove Lighthouse CI** — `LHCI_GITHUB_APP_TOKEN` not configured; workflow runs but produces no status checks. Either install the [Lighthouse CI GitHub App](https://github.com/apps/lighthouse-ci), add the token as a repo secret, or remove the workflow entirely. _Priority: MEDIUM | Effort: 15 min_
- [ ] **Resolve npm Dependabot alerts** — All 4 alerts now have overrides in `package.json` (`brace-expansion@5.0.6`, `devalue@5.8.1`, `yaml@2.8.3`, `vite@7.3.2`). 5 Dependabot PRs (#17-#21) open for dep bumps — all pass Website CI, fail Lighthouse CI (token not configured). _Priority: LOW | Effort: merge PRs_

### Website

- [ ] **Fix Lighthouse accessibility failures** — `color-contrast` and `label-content-name-mismatch` on root page; `redirects` on `/docs`. Fix CSS contrast ratios and ARIA labels, then re-run Lighthouse to confirm. Dependents page a11y (caption, star labels) fixed 2026-06-02. _Priority: MEDIUM | Effort: 1-2 hrs_
- [ ] **Add "Who Uses gogenfilter" CTA to landing page** — Dependents page exists at `/dependents` but is only linked from the docs sidebar. Add a link in HeroSection or CTASection to cross-promote it. _Priority: LOW | Effort: 15 min_
- [ ] **Website performance audit** — Establish Lighthouse score baselines for performance, accessibility, SEO, best-practices. Use [unlighthouse.dev/tools](https://unlighthouse.dev/tools) for quick checks. _Priority: MEDIUM | Effort: 1 hr_
- [ ] **Test dependents page with real dependents** — Currently renders empty state (no public repos found). Verify the table renders correctly when actual GitHub results exist. _Priority: LOW | Effort: 30 min_
- [ ] **Add dependents page to stale reference CI check** — The `Check for stale references` step in `website.yml` should validate that `dependents.astro` is not orphaned. _Priority: LOW | Effort: 10 min_

### Documentation

- [ ] **Review and consolidate `docs/planning/`** — Planning docs from May 2026 may contain outdated information. Review and archive completed items. _Priority: LOW | Effort: 30 min_

### Strategic (requires decision)

- [ ] **Define v3 maintenance mode vs v4 vision** — The core library is complete (99.8% coverage, all features done). Decide: is v3 in maintenance mode, or is there a v4 scope? This determines the entire strategic direction. _Priority: HIGH | Effort: Decision_
- [ ] **Evaluate `golangci-lint` plugin opportunity** — gogenfilter is a natural fit as a golangci-lint plugin for auto-generated code detection during linting. Research feasibility and community interest. _Priority: MEDIUM | Effort: Research_
- [ ] **Design custom detector registration API** — Allow users to register their own detectors for proprietary code generators. Community extensibility play. _Priority: LOW | Effort: Design_

## Completed (2026-06-02)

- [x] **Fix 3 a11y issues on dependents page** — Added table `<caption>`, star column screen reader text, star cell `aria-label`
- [x] **Fix Firebase Node 20 deprecation** — Replaced `FirebaseExtended/action-hosting-deploy@v0` with direct `firebase-tools` CLI under Node 24
- [x] **Extract `SQLCOperation` typed constants** — New `SQLCOperation` type with 5 constants; `SQLCConfigError.Operation` now typed
- [x] **Update DOMAIN_LANGUAGE.md** — Added 9 missing exports (types, functions, commands)
- [x] **Resolve npm Dependabot alerts** — Added `brace-expansion@5.0.6` and `yaml@2.8.3` overrides

## Completed (2026-06-01)

- [x] Fix `goconst` lint warning — Extracted repeated sqlc string to `sqlcDBContent` constant in `example_test.go`
- [x] Create `TODO_LIST.md` — This file
- [x] Create `ROADMAP.md` — Strategic direction document
- [x] Update `FEATURES.md` — Added dependents page, updated date
- [x] Archive old status reports — Moved 9 older reports to `docs/status/archive/`
- [x] Document Lighthouse CI status — Added note to `lighthouse.yml` and `AGENTS.md`

## Completed (prior sessions)

- [x] CSP security fix — All 4 inline scripts moved to `public/js/`, fully CSP-compliant
- [x] Dependents page — Build-time GitHub code search with star count table
- [x] BuildFlow TODO false positives — Renamed `note:` to `hint:` in TypeScript property names
- [x] `goconst` was the only remaining lint warning — now fixed
