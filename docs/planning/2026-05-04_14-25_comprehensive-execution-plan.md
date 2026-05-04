# Comprehensive Execution Plan — 2026-05-04

**Generated:** 2026-05-04 14:25
**Mode:** Pareto Planning — All TODOs, max 12 min each
**Sort:** Priority × Impact ÷ Effort (Pareto 80/20)

---

## How to Read This

| Column     | Meaning                                                            |
| ---------- | ------------------------------------------------------------------ |
| **#**      | Task number                                                        |
| **P**      | Priority tier (P0=critical, P1=high, P2=medium, P3=low, P4=future) |
| **Task**   | What to do                                                         |
| **Effort** | Estimated time (all ≤12 min)                                       |
| **Impact** | High/Medium/Low                                                    |
| **Value**  | Customer/User/Developer                                            |
| **Status** | ✅ Done, 🔲 Pending, 🏗️ In Progress                                |

---

## PRIORITY TIER 0 — MUST DO (Risk / Quality)

| #    | Task                                                                                                                  | Effort | Impact | Value     | Status |
| ---- | --------------------------------------------------------------------------------------------------------------------- | ------ | ------ | --------- | ------ |
| P0.1 | **Delete 22 archived docs** (planning + research + status) — they're noise, mislead future devs                       | 2 min  | High   | Developer | 🔲     |
| P0.2 | **Fix FilterOption.Reason() fragility** — replace implicit string equality invariant with explicit map + panic + test | 12 min | High   | Developer | 🔲     |
| P0.3 | **Remove or configure Codecov** — step exists in CI but no token, fails silently                                      | 2 min  | High   | CI        | 🔲     |
| P0.4 | **Delete root TODO_LIST.md** — stale, duplicates backlog, adds confusion                                              | 2 min  | Medium | Developer | 🔲     |
| P0.5 | **Upgrade golangci-lint v2 → v3** in CI workflow — v2 is deprecated                                                   | 5 min  | Medium | CI        | 🔲     |
| P0.6 | **Run golangci-lint and fix reported issues**                                                                         | 10 min | High   | Quality   | 🔲     |
| P0.7 | **Make pre-commit hook executable** — `git config advice.ignoredHook false` warning every commit                      | 2 min  | Low    | Developer | 🔲     |
| P0.8 | **Verify tests pass after all changes** — ensure no regressions                                                       | 5 min  | High   | All       | 🔲     |

---

## PRIORITY TIER 1 — HIGH (Code Quality)

| #     | Task                                                                                                          | Effort | Impact | Value       | Status |
| ----- | ------------------------------------------------------------------------------------------------------------- | ------ | ------ | ----------- | ------ |
| P1.1  | **Add `FilterPaths([]string) ([]bool, error)`** batch method — process multiple files, single error aggregate | 12 min | High   | User        | 🔲     |
| P1.2  | **Add `FilterContext(ctx, path)` method** — cancellation support for long-running operations                  | 12 min | High   | User        | 🔲     |
| P1.3  | **Add `FilterPathsContext`** — batch + cancellation combined                                                  | 10 min | Medium | User        | 🔲     |
| P1.4  | **Better error wrapping** — `fmt.Errorf("...: %w", err)` in detection file reads                              | 8 min  | Medium | Developer   | 🔲     |
| P1.5  | **Add SQLC config integration test** — real sqlc.yaml parsing against fixture files                           | 10 min | Medium | Quality     | 🔲     |
| P1.6  | **Add `MetricsMixin.String()`** — human-readable metrics summary (not just `GetStats().String()`)             | 8 min  | Low    | Developer   | 🔲     |
| P1.7  | **Remove goexperiment build-tags** from golangci.yaml — not needed, add noise                                 | 3 min  | Low    | CI          | 🔲     |
| P1.8  | **Add `assertMetrics(t, stats, expected)` helper** — reduces copy-paste in metrics tests                      | 5 min  | Low    | Developer   | 🔲     |
| P1.9  | **Audit `go-faster/yaml` version** — check if v3+ available and worth upgrading                               | 3 min  | Low    | Maintenance | 🔲     |
| P1.10 | **Add benchmark for `FilterPaths`** batch method                                                              | 8 min  | Low    | Performance | 🔲     |

---

## PRIORITY TIER 2 — MEDIUM (Website Polish)

| #     | Task                                                                                    | Effort | Impact | Value   | Status |
| ----- | --------------------------------------------------------------------------------------- | ------ | ------ | ------- | ------ |
| P2.1  | **Add Twitter Card meta tags** to LandingLayout.astro                                   | 5 min  | Medium | SEO     | 🔲     |
| P2.2  | **Add web app manifest** (name, icons, theme_color, display)                            | 10 min | Medium | UX      | 🔲     |
| P2.3  | **Add custom Starlight 404 page** content — guide users back to docs                    | 5 min  | Medium | User    | 🔲     |
| P2.4  | **Add RSS/Atom feed** for changelog via Starlight feeds                                 | 10 min | Low    | User    | 🔲     |
| P2.5  | **Fix `client` prop deprecation warning** in CodeBlock.astro                            | 3 min  | Low    | Quality | 🔲     |
| P2.6  | **Audit and enable TypeScript strict mode** in tsconfig.json                            | 5 min  | Medium | Quality | 🔲     |
| P2.7  | **Verify sitemap integration** — @astrojs/sitemap is installed, confirm it's generating | 3 min  | Low    | SEO     | 🔲     |
| P2.8  | **Add Open Graph image for docs pages** — currently only landing has OG                 | 5 min  | Medium | SEO     | 🔲     |
| P2.9  | **Add breadcrumbs** to Starlight docs via sidebar configuration                         | 8 min  | Low    | UX      | 🔲     |
| P2.10 | **Add "edit this page" link** — Starlight has built-in support                          | 5 min  | Low    | UX      | 🔲     |
| P2.11 | **Add Algolia DocSearch** or similar — Starlight supports it natively                   | 10 min | Medium | UX      | 🔲     |
| P2.12 | **Add favicon SVG** as alternative to ICO                                               | 5 min  | Low    | UX      | 🔲     |
| P2.13 | **Add reading time** to Starlight docs pages                                            | 5 min  | Low    | UX      | 🔲     |
| P2.14 | **Audit all external links** in docs — verify no 404s                                   | 10 min | Medium | Quality | 🔲     |
| P2.15 | **Verify all generator logos** render at all breakpoints                                | 5 min  | Low    | UX      | 🔲     |
| P2.16 | **Test mobile navigation** — hamburger menu, close behavior                             | 5 min  | Medium | UX      | 🔲     |
| P2.17 | **Add keyboard navigation** to mobile menu (Escape to close)                            | 5 min  | Low    | A11y    | 🔲     |
| P2.18 | **Audit image loading** — ensure all images have width/height to prevent CLS            | 8 min  | Low    | Perf    | 🔲     |
| P2.19 | **Add Starlight custom CSS** for code block scrollbar styling                           | 3 min  | Low    | UX      | 🔲     |
| P2.20 | **Check Starlight components** for any deprecated props                                 | 5 min  | Low    | Quality | 🔲     |

---

## PRIORITY TIER 3 — LOW (Manual / Ongoing)

| #     | Task                                                                           | Effort | Impact | Value       | Status |
| ----- | ------------------------------------------------------------------------------ | ------ | ------ | ----------- | ------ |
| P3.1  | **Browser Visual QA** (desktop Chrome + Firefox + mobile) — MANUAL             | 30 min | High   | User        | 🔲     |
| P3.2  | **Lighthouse Audit** (performance ≥90, a11y ≥90, SEO ≥90) — MANUAL             | 30 min | High   | SEO         | 🔲     |
| P3.3  | **Cross-browser testing** (Safari, Edge) — MANUAL                              | 20 min | Medium | UX          | 🔲     |
| P3.4  | **Add Firebase CSP header** — Content-Security-Policy for security hardening   | 10 min | Medium | Security    | 🔲     |
| P3.5  | **Add GitHub branch protection** — require PR reviews, status checks on master | 5 min  | Medium | CI          | 🔲     |
| P3.6  | **Verify go module stability claims** in README vs actual API surface          | 5 min  | Medium | Docs        | 🔲     |
| P3.7  | **Add "related tools" cross-links** — link to tools using gogenfilter          | 10 min | Low    | User        | 🔲     |
| P3.8  | **Performance profiling** — pprof on FilterPaths with 10k+ files               | 15 min | High   | Performance | 🔲     |
| P3.9  | **Add memory profiling benchmark** for Metrics recording                       | 10 min | Low    | Performance | 🔲     |
| P3.10 | **Verify pre-commit hook** runs golangci-lint on staged files                  | 10 min | Medium | CI          | 🔲     |
| P3.11 | **Check Starlight version** for available upgrades                             | 3 min  | Low    | Maintenance | 🔲     |
| P3.12 | **Check Astro version** for available upgrades                                 | 3 min  | Low    | Maintenance | 🔲     |
| P3.13 | **Audit npm dependencies** for security advisories                             | 5 min  | Medium | Security    | 🔲     |
| P3.14 | **Audit Go dependencies** for security advisories                              | 5 min  | Medium | Security    | 🔲     |
| P3.15 | **Add GitHub release workflow** — auto-generate changelog from commits         | 15 min | Low    | DX          | 🔲     |
| P3.16 | **Add Dependabot PR merge automation** — auto-merge safe updates               | 5 min  | Low    | CI          | 🔲     |
| P3.17 | **Add code coverage report** deployment — summary page                         | 10 min | Low    | DX          | 🔲     |
| P3.18 | **Verify Sections.astro** renders correctly with all data variants             | 8 min  | Medium | Quality     | 🔲     |
| P3.19 | **Check for unused CSS** in global.css                                         | 5 min  | Low    | Perf        | 🔲     |
| P3.20 | **Verify prefers-reduced-motion** works on all animations                      | 5 min  | Low    | A11y        | 🔲     |
| P3.21 | **Add Starlight table of contents** — already built-in, verify it's enabled    | 3 min  | Low    | UX          | 🔲     |
| P3.22 | **Audit Starlight i18n** — verify all UI strings are translatable              | 10 min | Low    | I18n        | 🔲     |
| P3.23 | **Check Starlight social links** — add Twitter/X link alongside GitHub         | 3 min  | Low    | SEO         | 🔲     |

---

## PRIORITY TIER 4 — FUTURE (Nice-to-Have)

| #     | Task                                                                               | Effort  | Impact | Value       | Status |
| ----- | ---------------------------------------------------------------------------------- | ------- | ------ | ----------- | ------ |
| P4.1  | **Internationalization (i18n)** — German, other languages                          | 60+ min | Low    | User        | 🔲     |
| P4.2  | **Dark mode persist to cookie** — better than localStorage for SSR                 | 5 min   | Low    | UX          | 🔲     |
| P4.3  | **Code playground** — go.dev/play embed for interactive examples                   | 30 min  | Medium | User        | 🔲     |
| P4.4  | **Add `FilterPathsAsync`** — concurrent with worker pool, configurable parallelism | 15 min  | Medium | Performance | 🔲     |
| P4.5  | **Add `FilterPathsWithProgress`** — callback for progress reporting                | 12 min  | Low    | UX          | 🔲     |
| P4.6  | **Add GraphQL schema** for programmatic API access                                 | 30 min  | Low    | User        | 🔲     |
| P4.7  | **Add Prometheus metrics endpoint** — for monitoring integration                   | 20 min  | Low    | DevOps      | 🔲     |
| P4.8  | **Add OpenTelemetry tracing** — for distributed systems                            | 30 min  | Low    | DevOps      | 🔲     |
| P4.9  | **Add Vim/Neovim plugin** — LSP integration for gogenfilter                        | 60 min  | Low    | User        | 🔲     |
| P4.10 | **Add VS Code extension** — inline decoration of generated files                   | 60 min  | Low    | User        | 🔲     |
| P4.11 | **Add Helm chart** — deploy as service in k8s                                      | 30 min  | Low    | DevOps      | 🔲     |
| P4.12 | **Add Dockerfile + docker-compose** — local dev environment                        | 15 min  | Low    | DX          | 🔲     |
| P4.13 | **Add GitHub Actions template** — reusable workflow for consuming projects         | 15 min  | Low    | DX          | 🔲     |
| P4.14 | **Write blog posts** about gogenfilter use cases                                   | 30 min  | Low    | Marketing   | 🔲     |
| P4.15 | **Add "copy link" button** to all code blocks                                      | 5 min   | Low    | UX          | 🔲     |
| P4.16 | **Add syntax highlighting themes** switcher                                        | 10 min  | Low    | UX          | 🔲     |
| P4.17 | **Add "last updated" timestamp** to docs pages                                     | 5 min   | Low    | UX          | 🔲     |
| P4.18 | **Add "download as file"** for code examples                                       | 5 min   | Low    | UX          | 🔲     |
| P4.19 | **Investigate jscpd formats-exts bug** — file upstream bug report                  | 10 min  | Low    | Tooling     | 🔲     |
| P4.20 | **Add codecov uploader to root CI** — not just website                             | 5 min   | Low    | CI          | 🔲     |

---

## Execution Order (Pareto: 1% → 51% → 80%)

### 1% → 51% Impact (TOP PRIORITY — Do First)

These 20 tasks deliver the most value for the least effort:

| Order     | #     | Task                         | Effort      | Why                   |
| --------- | ----- | ---------------------------- | ----------- | --------------------- |
| 1         | P0.1  | Delete 22 archived docs      | 2 min       | Noise elimination     |
| 2         | P0.2  | Fix FilterOption.Reason()    | 12 min      | Silent bug prevention |
| 3         | P0.3  | Remove/configure Codecov     | 2 min       | CI reliability        |
| 4         | P0.4  | Delete root TODO_LIST.md     | 2 min       | Confusion elimination |
| 5         | P0.5  | Upgrade golangci-lint v3     | 5 min       | Tool currency         |
| 6         | P0.6  | Run linter + fix issues      | 10 min      | Quality gate          |
| 7         | P0.7  | Make pre-commit executable   | 2 min       | DX improvement        |
| 8         | P1.1  | Add FilterPaths batch method | 12 min      | User API improvement  |
| 9         | P1.2  | Add FilterContext            | 12 min      | User API improvement  |
| 10        | P1.3  | Add FilterPathsContext       | 10 min      | Combines above        |
| 11        | P1.4  | Better error wrapping        | 8 min       | Debugging improvement |
| 12        | P2.1  | Twitter Card meta tags       | 5 min       | SEO improvement       |
| 13        | P2.2  | Web app manifest             | 10 min      | UX improvement        |
| 14        | P2.3  | Custom 404 page              | 5 min       | UX improvement        |
| 15        | P2.6  | TypeScript strict mode       | 5 min       | Quality improvement   |
| 16        | P2.8  | OG images for docs           | 5 min       | SEO improvement       |
| 17        | P2.14 | Audit external links         | 10 min      | Quality improvement   |
| 18        | P3.4  | Firebase CSP header          | 10 min      | Security hardening    |
| 19        | P3.5  | GitHub branch protection     | 5 min       | CI reliability        |
| 20        | P3.6  | Verify module stability      | 5 min       | Docs accuracy         |
| **Total** |       |                              | **130 min** |                       |

### 51% → 80% Impact (Next 20 tasks)

| Order     | #     | Task                        | Effort      | Why             |
| --------- | ----- | --------------------------- | ----------- | --------------- |
| 21        | P1.5  | SQLC integration test       | 10 min      | Test coverage   |
| 22        | P2.4  | RSS/Atom feed               | 10 min      | User experience |
| 23        | P2.5  | Fix client prop deprecation | 3 min       | Quality         |
| 24        | P2.7  | Verify sitemap              | 3 min       | SEO             |
| 25        | P2.9  | Add breadcrumbs             | 8 min       | UX              |
| 26        | P2.10 | Edit page link              | 5 min       | UX              |
| 27        | P2.11 | Algolia DocSearch           | 10 min      | UX              |
| 28        | P2.12 | Favicon SVG                 | 5 min       | UX              |
| 29        | P3.1  | Browser Visual QA           | 30 min      | MANUAL          |
| 30        | P3.2  | Lighthouse Audit            | 30 min      | MANUAL          |
| 31        | P3.8  | Performance profiling       | 15 min      | Performance     |
| 32        | P3.10 | Pre-commit hook (lint)      | 10 min      | CI              |
| 33        | P3.13 | npm security audit          | 5 min       | Security        |
| 34        | P3.14 | Go security audit           | 5 min       | Security        |
| 35        | P3.18 | Verify Sections.astro       | 8 min       | Quality         |
| 36        | P3.20 | prefers-reduced-motion      | 5 min       | A11y            |
| 37        | P1.6  | MetricsMixin.String()       | 8 min       | DX              |
| 38        | P1.8  | assertMetrics helper        | 5 min       | DX              |
| 39        | P1.9  | Audit go-faster/yaml        | 3 min       | Maintenance     |
| 40        | P3.16 | Verify mobile nav           | 5 min       | UX              |
| **Total** |       |                             | **191 min** |                 |

### 80% → 100% Impact (Remaining ~43 tasks)

All other tasks listed above.

---

## Batch Grouping (Parallelize Where Possible)

### Batch A — Delete & Cleanup (5 min)

- P0.1 + P0.4 (delete 22 archived docs + root TODO_LIST.md)

### Batch B — Go Code Quality (40 min)

- P0.5 + P0.6 + P0.7 (golangci-lint upgrade, fix issues, make hook executable)
- P0.2 (FilterOption.Reason() fix)
- P1.4 (error wrapping)

### Batch C — Go API Additions (34 min)

- P1.1 + P1.3 (FilterPaths + FilterPathsContext)

### Batch D — Website SEO & UX (30 min)

- P2.1 + P2.8 (Twitter Cards + OG images)
- P2.2 + P2.3 (web manifest + 404)
- P2.6 + P2.14 (TS strict + link audit)

### Batch E — CI/CD (15 min)

- P0.3 (Codecov) + P3.5 (branch protection)

### Batch F — Website Polish (25 min)

- P2.5 + P2.7 + P2.9 + P2.10 + P2.11 + P2.12

### Batch G — Manual (80 min)

- P3.1 + P3.2 + P3.3

---

## Git Commit Strategy

After each batch, commit with a descriptive message:

1. `chore: delete 22 archived docs and stale TODO_LIST.md`
2. `refactor(gogenfilter): make FilterOption.Reason() explicit with map`
3. `ci: upgrade golangci-lint v2 → v3, fix reported issues`
4. `feat(gogenfilter): add FilterPaths and FilterPathsContext batch methods`
5. `feat(website): add Twitter Cards, OG images, web manifest`
6. `fix(website): configure Codecov or remove from CI`
7. `chore(website): TypeScript strict mode, link audit, polish`

---

## Verification Checklist

After each task:

- [ ] `go build ./...`
- [ ] `go vet ./...`
- [ ] `go test -race ./...`
- [ ] `npx astro check` (website)
- [ ] `npm run build` (website)
- [ ] `git status`
- [ ] Commit + push

---

## D2 Execution Graph

```
execution-order {
  P0-Critical: P0.1 -> P0.2 -> P0.3 -> P0.4 -> P0.5 -> P0.6 -> P0.7 -> P0.8
  P1-CodeQuality: P1.1 -> P1.2 -> P1.3 -> P1.4 -> P1.5
  P2-Website: P2.1 -> P2.2 -> P2.3 -> P2.6 -> P2.14
  P3-Manual: P3.1 -> P3.2 -> P3.3
  CI: P0.3 -> P0.5 -> P0.6 -> P3.5

  P0-Critical -> P1-CodeQuality
  P1-CodeQuality -> P0-Critical
  P2-Website -> P3-Manual
}
```

---

_Generated by Crush — 2026-05-04 14:25_
