# Comprehensive Execution Plan — 2026-05-04

**Generated:** 2026-05-04 14:25
**Mode:** Pareto Planning — All TODOs, max 12 min each
**Sort:** Priority × Impact ÷ Effort (Pareto 80/20)

---

## PRIORITY TIER 0 — MUST DO (Risk / Quality)

| #    | Task                                                                                                           | Effort | Impact | Value     | Status |
| ---- | -------------------------------------------------------------------------------------------------------------- | ------ | ------ | --------- | ------ |
| P0.1 | **Delete 22 archived docs** (planning + research + status) — noise, misleads future devs                       | 2 min  | High   | Developer | 🔲     |
| P0.2 | **Fix FilterOption.Reason() fragility** — replace implicit string equality invariant with explicit map + panic | 12 min | High   | Developer | 🔲     |
| P0.3 | **Remove or configure Codecov** — step exists in CI but no token, fails silently                               | 2 min  | High   | CI        | 🔲     |
| P0.4 | **Delete root TODO_LIST.md** — stale, duplicates backlog                                                       | 2 min  | Medium | Developer | 🔲     |
| P0.5 | **Upgrade golangci-lint v2 → v3** in CI workflow — v2 is deprecated                                            | 5 min  | Medium | CI        | 🔲     |
| P0.6 | **Run golangci-lint and fix reported issues**                                                                  | 10 min | High   | Quality   | 🔲     |
| P0.7 | **Make pre-commit hook executable** — warning on every commit                                                  | 2 min  | Low    | Developer | 🔲     |
| P0.8 | **Verify tests pass after all changes**                                                                        | 5 min  | High   | All       | 🔲     |

---

## PRIORITY TIER 1 — HIGH (Code Quality)

| #     | Task                                                                   | Effort | Impact | Value       | Status |
| ----- | ---------------------------------------------------------------------- | ------ | ------ | ----------- | ------ |
| P1.1  | **Add `FilterPaths([]string) ([]bool, error)`** batch method           | 12 min | High   | User        | 🔲     |
| P1.2  | **Add `FilterContext(ctx, path)`** — cancellation support              | 12 min | High   | User        | 🔲     |
| P1.3  | **Add `FilterPathsContext`** — batch + cancellation                    | 10 min | Medium | User        | 🔲     |
| P1.4  | **Better error wrapping** — `fmt.Errorf("...: %w", err)` in file reads | 8 min  | Medium | Developer   | 🔲     |
| P1.5  | **Add SQLC config integration test** — real sqlc.yaml parsing          | 10 min | Medium | Quality     | 🔲     |
| P1.6  | **Add `MetricsMixin.String()`** — human-readable metrics               | 8 min  | Low    | Developer   | 🔲     |
| P1.7  | **Remove goexperiment build-tags** from golangci.yaml                  | 3 min  | Low    | CI          | 🔲     |
| P1.8  | **Add `assertMetrics` test helper**                                    | 5 min  | Low    | Developer   | 🔲     |
| P1.9  | **Audit go-faster/yaml version**                                       | 3 min  | Low    | Maintenance | 🔲     |
| P1.10 | **Add benchmark for FilterPaths** batch method                         | 8 min  | Low    | Performance | 🔲     |

---

## PRIORITY TIER 2 — MEDIUM (Website Polish)

| #     | Task                                                     | Effort | Impact | Value   | Status |
| ----- | -------------------------------------------------------- | ------ | ------ | ------- | ------ |
| P2.1  | **Add Twitter Card meta tags**                           | 5 min  | Medium | SEO     | 🔲     |
| P2.2  | **Add web app manifest**                                 | 10 min | Medium | UX      | 🔲     |
| P2.3  | **Custom Starlight 404 page content**                    | 5 min  | Medium | User    | 🔲     |
| P2.4  | **Add RSS/Atom feed** for changelog                      | 10 min | Low    | User    | 🔲     |
| P2.5  | **Fix `client` prop deprecation** in CodeBlock.astro     | 3 min  | Low    | Quality | 🔲     |
| P2.6  | **TypeScript strict mode** in tsconfig.json              | 5 min  | Medium | Quality | 🔲     |
| P2.7  | **Verify sitemap integration**                           | 3 min  | Low    | SEO     | 🔲     |
| P2.8  | **OG images for docs pages**                             | 5 min  | Medium | SEO     | 🔲     |
| P2.9  | **Add breadcrumbs** to Starlight docs                    | 8 min  | Low    | UX      | 🔲     |
| P2.10 | **"Edit this page" link**                                | 5 min  | Low    | UX      | 🔲     |
| P2.11 | **Algolia DocSearch** integration                        | 10 min | Medium | UX      | 🔲     |
| P2.12 | **Favicon SVG**                                          | 5 min  | Low    | UX      | 🔲     |
| P2.13 | **Reading time** on docs pages                           | 5 min  | Low    | UX      | 🔲     |
| P2.14 | **Audit all external links** in docs                     | 10 min | Medium | Quality | 🔲     |
| P2.15 | **Verify all generator logos** render at all breakpoints | 5 min  | Low    | UX      | 🔲     |
| P2.16 | **Mobile navigation test**                               | 5 min  | Medium | UX      | 🔲     |
| P2.17 | **Keyboard navigation** (Escape to close menu)           | 5 min  | Low    | A11y    | 🔲     |
| P2.18 | **Audit image dimensions** (prevent CLS)                 | 8 min  | Low    | Perf    | 🔲     |
| P2.19 | **Code block scrollbar styling**                         | 3 min  | Low    | UX      | 🔲     |
| P2.20 | **Starlight deprecated props audit**                     | 5 min  | Low    | Quality | 🔲     |

---

## PRIORITY TIER 3 — LOW (Manual / Ongoing)

| #     | Task                                                | Effort | Impact | Value       | Status |
| ----- | --------------------------------------------------- | ------ | ------ | ----------- | ------ |
| P3.1  | **Browser Visual QA** (Chrome + Firefox + mobile)   | 30 min | High   | User        | 🔲     |
| P3.2  | **Lighthouse Audit** (perf ≥90, a11y ≥90, SEO ≥90)  | 30 min | High   | SEO         | 🔲     |
| P3.3  | **Cross-browser testing** (Safari, Edge)            | 20 min | Medium | UX          | 🔲     |
| P3.4  | **Firebase CSP header**                             | 10 min | Medium | Security    | 🔲     |
| P3.5  | **GitHub branch protection rules**                  | 5 min  | Medium | CI          | 🔲     |
| P3.6  | **Verify module stability** in README vs actual API | 5 min  | Medium | Docs        | 🔲     |
| P3.7  | **Related tools cross-links**                       | 10 min | Low    | User        | 🔲     |
| P3.8  | **Performance profiling** — pprof on 10k+ files     | 15 min | High   | Performance | 🔲     |
| P3.9  | **Memory profiling benchmark** for Metrics          | 10 min | Low    | Performance | 🔲     |
| P3.10 | **Pre-commit hook** (golangci-lint on staged files) | 10 min | Medium | CI          | 🔲     |
| P3.11 | **Starlight version check**                         | 3 min  | Low    | Maintenance | 🔲     |
| P3.12 | **Astro version check**                             | 3 min  | Low    | Maintenance | 🔲     |
| P3.13 | **npm security audit**                              | 5 min  | Medium | Security    | 🔲     |
| P3.14 | **Go security audit**                               | 5 min  | Medium | Security    | 🔲     |
| P3.15 | **GitHub release workflow**                         | 15 min | Low    | DX          | 🔲     |
| P3.16 | **Dependabot merge automation**                     | 5 min  | Low    | CI          | 🔲     |
| P3.17 | **Code coverage report page**                       | 10 min | Low    | DX          | 🔲     |
| P3.18 | **Verify Sections.astro**                           | 8 min  | Medium | Quality     | 🔲     |
| P3.19 | **Unused CSS audit**                                | 5 min  | Low    | Perf        | 🔲     |
| P3.20 | **prefers-reduced-motion audit**                    | 5 min  | Low    | A11y        | 🔲     |
| P3.21 | **Starlight table of contents** verification        | 3 min  | Low    | UX          | 🔲     |
| P3.22 | **Starlight i18n audit**                            | 10 min | Low    | I18n        | 🔲     |
| P3.23 | **Twitter/X social link** in Starlight social       | 3 min  | Low    | SEO         | 🔲     |

---

## PRIORITY TIER 4 — FUTURE (Nice-to-Have)

| #     | Task                                            | Effort  | Impact | Value       | Status |
| ----- | ----------------------------------------------- | ------- | ------ | ----------- | ------ |
| P4.1  | **i18n** — German + other languages             | 60+ min | Low    | User        | 🔲     |
| P4.2  | **Dark mode persist to cookie**                 | 5 min   | Low    | UX          | 🔲     |
| P4.3  | **Code playground** — go.dev/play embed         | 30 min  | Medium | User        | 🔲     |
| P4.4  | **`FilterPathsAsync`** — concurrent worker pool | 15 min  | Medium | Performance | 🔲     |
| P4.5  | **`FilterPathsWithProgress`** — callback        | 12 min  | Low    | UX          | 🔲     |
| P4.6  | **GraphQL schema**                              | 30 min  | Low    | User        | 🔲     |
| P4.7  | **Prometheus metrics endpoint**                 | 20 min  | Low    | DevOps      | 🔲     |
| P4.8  | **OpenTelemetry tracing**                       | 30 min  | Low    | DevOps      | 🔲     |
| P4.9  | **Vim/Neovim plugin**                           | 60 min  | Low    | User        | 🔲     |
| P4.10 | **VS Code extension**                           | 60 min  | Low    | User        | 🔲     |
| P4.11 | **Helm chart**                                  | 30 min  | Low    | DevOps      | 🔲     |
| P4.12 | **Dockerfile + docker-compose**                 | 15 min  | Low    | DX          | 🔲     |
| P4.13 | **GitHub Actions template**                     | 15 min  | Low    | DX          | 🔲     |
| P4.14 | **Blog posts** about use cases                  | 30 min  | Low    | Marketing   | 🔲     |
| P4.15 | **"Copy link" button** on code blocks           | 5 min   | Low    | UX          | 🔲     |
| P4.16 | **Syntax highlighting themes switcher**         | 10 min  | Low    | UX          | 🔲     |
| P4.17 | **"Last updated" timestamp** on docs            | 5 min   | Low    | UX          | 🔲     |
| P4.18 | **"Download as file"** for code examples        | 5 min   | Low    | UX          | 🔲     |
| P4.19 | **jscpd formats-exts upstream bug report**      | 10 min  | Low    | Tooling     | 🔲     |
| P4.20 | **codecov uploader in root CI**                 | 5 min   | Low    | CI          | 🔲     |

---

## Top 20 by Pareto Impact (1% → 51%)

| Order | #     | Task                         | Effort | Cumulative | Why                   |
| ----- | ----- | ---------------------------- | ------ | ---------- | --------------------- |
| 1     | P0.1  | Delete 22 archived docs      | 2 min  | 2 min      | Noise elimination     |
| 2     | P0.2  | Fix FilterOption.Reason()    | 12 min | 14 min     | Silent bug prevention |
| 3     | P0.3  | Remove/configure Codecov     | 2 min  | 16 min     | CI reliability        |
| 4     | P0.4  | Delete root TODO_LIST.md     | 2 min  | 18 min     | Confusion elimination |
| 5     | P0.5  | Upgrade golangci-lint v3     | 5 min  | 23 min     | Tool currency         |
| 6     | P0.6  | Run linter + fix issues      | 10 min | 33 min     | Quality gate          |
| 7     | P0.7  | Make pre-commit executable   | 2 min  | 35 min     | DX improvement        |
| 8     | P1.1  | Add FilterPaths batch method | 12 min | 47 min     | User API improvement  |
| 9     | P1.2  | Add FilterContext            | 12 min | 59 min     | User API improvement  |
| 10    | P1.3  | Add FilterPathsContext       | 10 min | 69 min     | Combines above        |
| 11    | P1.4  | Better error wrapping        | 8 min  | 77 min     | Debugging improvement |
| 12    | P2.1  | Twitter Card meta tags       | 5 min  | 82 min     | SEO improvement       |
| 13    | P2.2  | Web app manifest             | 10 min | 92 min     | UX improvement        |
| 14    | P2.3  | Custom 404 page              | 5 min  | 97 min     | UX improvement        |
| 15    | P2.6  | TypeScript strict mode       | 5 min  | 102 min    | Quality improvement   |
| 16    | P2.8  | OG images for docs           | 5 min  | 107 min    | SEO improvement       |
| 17    | P2.14 | Audit external links         | 10 min | 117 min    | Quality improvement   |
| 18    | P3.4  | Firebase CSP header          | 10 min | 127 min    | Security hardening    |
| 19    | P3.5  | GitHub branch protection     | 5 min  | 132 min    | CI reliability        |
| 20    | P3.6  | Verify module stability      | 5 min  | 137 min    | Docs accuracy         |

**Total for top 20: 137 minutes**

---

_Generated by Crush — 2026-05-04 14:25_
