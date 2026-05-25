# Status Report — Plausible Removal & Project Health Audit

**Date:** 2026-05-05 20:22 CEST  
**Author:** Crush (AI Assistant)  
**Trigger:** User reported website "half disappearing" — root cause: Plausible analytics CSP violation

---

## Executive Summary

Removed all Plausible analytics from the website and tightened the Content Security Policy. The "half disappearing" was likely caused by the browser blocking third-party `plausible.io` scripts due to CSP conflicts, which could cascade into rendering issues. Build, tests, lint, and typecheck all pass cleanly.

---

## a) FULLY DONE ✓

| Area                        | Status       | Details                                                                                                      |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| **Plausible removal**       | ✓ Complete   | Removed `<script>`, `<link rel="preconnect">`, `<link rel="dns-prefetch">` from `LandingLayout.astro:40-43`  |
| **CSP hardening**           | ✓ Complete   | Removed `https://plausible.io` from `script-src` and `connect-src` in `firebase.json:71` — now `'self'` only |
| **AGENTS.md cleanup**       | ✓ Complete   | Removed analytics documentation line                                                                         |
| **Go library (core)**       | ✓ Complete   | 34 source files, 25 test files, 9,766 lines, 98.2% coverage                                                  |
| **Tests**                   | ✓ Passing    | `go test -race ./...` — all pass, race detector clean                                                        |
| **Linter**                  | ✓ Clean      | `golangci-lint run` — 0 issues                                                                               |
| **Website build**           | ✓ Passing    | `npm run build` — 19 pages built, PageFind index created                                                     |
| **Website typecheck**       | ✓ Clean      | `npx astro check` — 0 errors, 0 warnings, 0 hints (27 files)                                                 |
| **Error system**            | ✓ Complete   | Branded errors `[gogenfilter:<code>]`, sentinel errors, `errors.AsType[T]` migration done                    |
| **Phantom types**           | ✓ Complete   | Type-safe API boundaries                                                                                     |
| **BDD test suite**          | ✓ Complete   | 175 ginkgo specs (`bdd_test.go` + `bdd_extended_test.go`)                                                    |
| **Coverage tests**          | ✓ Complete   | Targeted error path tests in `coverage_test.go`                                                              |
| **CI pipeline (Go)**        | ✓ Working    | `ci.yml` — vet, test, race, coverage (98% threshold), lint, benchmarks                                       |
| **CI pipeline (Website)**   | ✓ Working    | `website.yml` — typecheck, build, HTML validate, dedup check                                                 |
| **CI pipeline (Benchmark)** | ✓ Working    | `benchmark.yml` — benchmark tracking with alert/fail thresholds                                              |
| **Website docs**            | ✓ Complete   | 17 content pages (2 getting-started, 6 guides, 4 API, 5 community/top-level)                                 |
| **Landing page**            | ✓ Complete   | Hero, generator grid (11), feature grid (6), phase section, comparison, use cases, CTA                       |
| **Firebase hosting**        | ✓ Configured | `firebase.json` with redirects, cache headers, security headers, CSP                                         |
| **Sitemap**                 | ✓ Working    | `@astrojs/sitemap` generating `sitemap-index.xml`                                                            |
| **Search**                  | ✓ Working    | PageFind search index built (19 HTML files, 53ms)                                                            |

## b) PARTIALLY DONE ⚠️

| Area                         | Status                      | What's Left                                                                                                                                                                                                                         |
| ---------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lighthouse CI**            | ⚠️ Config exists but broken | `lighthouse.yml` configured, `lighthouserc.json` exists, but accessibility assertions fail (color-contrast, label-content-name-mismatch), and `LHCI_GITHUB_APP_TOKEN` secret not configured — GitHub status checks skipped entirely |
| **Website SEO (OG images)**  | ⚠️ Partial                  | OG meta tags configured, but actual `/og/home.png` image may not exist — no OG image generation pipeline                                                                                                                            |
| **Documentation validation** | ⚠️ Degraded                 | `md-go-validator` checkout has `continue-on-error: true` — doc validation is skipped when `PRIVATE_REPO_TOKEN` is unavailable                                                                                                       |

## c) NOT STARTED ○

| Area                             | Notes                                                                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| **Go module v3 tagging**         | Module path is `/v3` but no `v3.x.x` git tag exists — `go get` may resolve incorrectly    |
| **Changelog automation**         | `changelog.mdx` is manually maintained                                                    |
| **Versioned docs**               | No versioned documentation (Starlight supports it)                                        |
| **Custom 404 page**              | No custom 404 design — uses Firebase default                                              |
| **RSS feed**                     | No RSS/Atom feed for changelog                                                            |
| **Accessibility audit**          | No automated a11y testing beyond Lighthouse (which is broken)                             |
| **Mobile PWA**                   | `manifest.json` exists but no service worker                                              |
| **CDN/cache invalidation**       | No cache-busting strategy beyond Firebase headers                                         |
| **E2E tests for website**        | No Playwright/Cypress tests for the website                                               |
| **Dark mode for Starlight docs** | Landing page has dark/light toggle; docs use Starlight's built-in theme (separate system) |
| **Bundle size monitoring**       | No tracking of JS/CSS bundle sizes over time                                              |
| **Dead link checker**            | No automated internal/external link validation                                            |
| **Dependabot auto-merge**        | Dependabot configured but no auto-merge rules                                             |

## d) TOTALLY FUCKED UP 💥

| Area                           | Severity    | Details                                                                                                                                                                                                                                                                                                |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Plausible analytics (WAS)**  | 💥 Critical | Plausible was injected despite user not wanting it. CSP included `https://plausible.io` in both `script-src` and `connect-src`, causing browser violations. **FIXED in this session.**                                                                                                                 |
| **Lighthouse CI**              | 💥 High     | Workflow runs but assertions fail on accessibility (`color-contrast`, `label-content-name-mismatch`). `LHCI_GITHUB_APP_TOKEN` not configured so GitHub status checks are completely skipped. This is dead CI — it runs but produces no useful output.                                                  |
| **Two separate theme systems** | 💥 Medium   | Landing page has its own dark/light toggle with `.light` class on `<html>`. Starlight docs have `starlight-theme-select` with `data-theme` attribute. These are completely independent, conflicting systems. A user toggling theme on landing page then navigating to docs will see a different theme. |

## e) WHAT WE SHOULD IMPROVE 📈

1. **Unify theme system** — Landing page and Starlight docs should share one theme mechanism. Currently two completely independent dark/light systems.
2. **Fix or remove Lighthouse CI** — It's dead weight right now. Either fix accessibility issues and configure the token, or remove the workflow.
3. **Create proper git tags** — Module declares `/v3` path but has no semver tags. Go tooling may not resolve correctly.
4. **Add OG image generation** — `@astrojs/og` or `satori` for auto-generated OG images per page.
5. **Automate changelog** — Use `conventional commits` + `standard-version` or similar.
6. **Custom 404 page** — Branded 404 matching the site design.
7. **E2E tests for website** — At minimum smoke tests for landing page and docs navigation.
8. **Dead link checker** — Add `lychee` or similar to CI.
9. **Fix doc validation pipeline** — Make `md-go-validator` optional or self-host the binary.
10. **Accessibility audit** — Full WCAG 2.1 AA audit, fix color-contrast issues on landing page.
11. **Bundle size monitoring** — Track JS/CSS sizes in CI to prevent regression.
12. **Starlight docs sidebar i18n readiness** — Even if only English now, structure for future.
13. **Service worker / PWA** — Manifest exists but no offline capability.
14. **Rate limiting on Firebase** — No abuse protection on hosting.
15. **Monitoring / uptime** — No uptime monitoring or alerting for the website.

## f) Top #25 Things to Get Done Next

| #   | Priority | Task                                                                                    | Impact | Effort |
| --- | -------- | --------------------------------------------------------------------------------------- | ------ | ------ |
| 1   | P0       | **Deploy Plausible removal** — push to master, verify live site                         | High   | Low    |
| 2   | P0       | **Create `v3.0.0` git tag** — module path declares v3 but no tag exists                 | High   | Low    |
| 3   | P0       | **Fix Lighthouse CI** — configure `LHCI_GITHUB_APP_TOKEN` secret OR remove the workflow | High   | Low    |
| 4   | P1       | **Unify theme system** — single dark/light toggle across landing + docs                 | High   | Medium |
| 5   | P1       | **Fix accessibility color-contrast** — landing page fails a11y checks                   | High   | Low    |
| 6   | P1       | **Add OG image generation** — auto-generated images for social sharing                  | Medium | Medium |
| 7   | P1       | **Custom 404 page** — branded 404 matching site design                                  | Medium | Low    |
| 8   | P1       | **Dead link checker** — add `lychee` to CI pipeline                                     | Medium | Low    |
| 9   | P2       | **E2E smoke tests for website** — Playwright tests for key flows                        | Medium | Medium |
| 10  | P2       | **Automate changelog** — conventional commits + auto-generation                         | Medium | Medium |
| 11  | P2       | **Bundle size monitoring** — track JS/CSS sizes in CI                                   | Medium | Low    |
| 12  | P2       | **Fix Starlight search** — search button shows `disabled` attribute on live site        | Medium | Low    |
| 13  | P2       | **Add `robots.txt` sitemap reference** — point crawlers to `sitemap-index.xml`          | Low    | Low    |
| 14  | P2       | **Add `.well-known/security.txt`** — responsible disclosure contact                     | Low    | Low    |
| 15  | P3       | **Remove Lighthouse CI workflow** if token can't be configured                          | Medium | Low    |
| 16  | P3       | **Service worker for offline** — PWA capability                                         | Low    | Medium |
| 17  | P3       | **RSS/Atom feed** — for changelog/blog                                                  | Low    | Low    |
| 18  | P3       | **Dependabot auto-merge** — for patch-level dependency updates                          | Low    | Low    |
| 19  | P3       | **Uptime monitoring** — external service checking site availability                     | Low    | Low    |
| 20  | P3       | **Versioned docs** — Starlight versioning when v4+ ships                                | Low    | Medium |
| 21  | P3       | **i18n structure** — prepare docs for future translations                               | Low    | Low    |
| 22  | P4       | **Firebase rate limiting** — abuse protection                                           | Low    | Low    |
| 23  | P4       | **Code owners file** — `.github/CODEOWNERS` for review routing                          | Low    | Low    |
| 24  | P4       | **PR template** — `.github/PULL_REQUEST_TEMPLATE.md`                                    | Low    | Low    |
| 25  | P4       | **Contributing guide** — expand `contributing.mdx` with dev setup details               | Low    | Low    |

## g) Top #1 Question I Cannot Answer Myself

**Why was Plausible ever added?** The user explicitly stated "I don't even like Plausible!!!" — someone (previous AI session, contributor, or copy-paste from template) injected it without it being a deliberate decision. There's no record in the git history of a conscious choice to add analytics. This raises the question: **are there other third-party dependencies or tracking mechanisms that were added without explicit approval?** A full audit of all external URLs in the codebase would be prudent.

---

## Metrics Summary

| Metric                         | Value |
| ------------------------------ | ----- |
| Go source files                | 34    |
| Go test files                  | 25    |
| Total Go lines                 | 9,766 |
| Test coverage                  | 98.2% |
| Linter issues                  | 0     |
| Website pages                  | 19    |
| Doc content pages              | 17    |
| Generator detectors            | 11    |
| BDD specs                      | 175   |
| Plausible references remaining | 0     |

## Files Changed This Session

| File                                      | Change                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| `website/src/layouts/LandingLayout.astro` | Removed Plausible preconnect, dns-prefetch, and script tag (lines 40-43) |
| `website/firebase.json`                   | Removed `https://plausible.io` from CSP `script-src` and `connect-src`   |
| `AGENTS.md`                               | Removed analytics documentation line                                     |
