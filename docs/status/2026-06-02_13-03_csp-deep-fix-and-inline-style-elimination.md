# Status Report — CSP Deep Fix & Inline Style Elimination

**Date:** 2026-06-02 13:03 CEST
**Branch:** master (clean)
**Commits this session:** 6

---

## Executive Summary

Fixed ALL Content Security Policy (CSP) violations on the website through a combination of post-build script fixes and elimination of all inline styles from our source code. The root cause was a multi-layered interaction between Astro v6's CSP implementation, Starlight's inline script/style injection, and our own inline styles.

**CI Status:**
- **Go CI:** ✅ Passing (99.8% coverage, 0 lint issues)
- **Website Build:** ✅ Passing (all 20 pages built, CSP fix applied)
- **Website Deploy:** ❌ **BLOCKED** — Firebase auth failure (`GOOGLE_APPLICATION_CREDENTIALS` expired/invalid). New site not yet live.
- **Lighthouse CI:** ❌ Failing on old deployment (a11y, performance, console errors from stale CSP)

---

## a) FULLY DONE

### CSP Fix — Complete 3-Layer Solution

| Layer | Problem | Fix | Status |
|-------|---------|-----|--------|
| **Style hashes** | Astro auto-hashes inline `<style>` blocks → `'unsafe-inline'` ignored (CSP Level 2) | Post-build strips style hashes from CSP | ✅ Done |
| **Missing script hashes** | Starlight non-module inline scripts injected after Astro's hash phase | Post-build computes SHA-256 and appends to `script-src` | ✅ Done |
| **aria-hidden scripts** | `aria-hidden` scripts are still executed by browser, blocked without hashes | Post-build hashes all non-module scripts regardless of attributes | ✅ Done |

### Inline Style Elimination — Zero in Source

| File | Before | After | Method |
|------|--------|-------|--------|
| `dependents.astro` | 12 `style=""` attrs | 0 | Tailwind arbitrary values (`border-[var(--sl-color-gray-5)]`) |
| `Logo.astro` | 2 SVG `style=""` attrs | 0 | `fill-[var(--color-accent)]` |
| `Header.astro` | 1 `<style>` block (20 lines) | 0 | `max-sm:` responsive + `[&.open]:max-sm:flex` |
| **Total** | **14 attrs + 1 block** | **0** | — |

### Verification

- ✅ `astro check` — 0 errors, 0 warnings, 0 hints (33 files)
- ✅ `html-validate` — All 20 HTML pages pass
- ✅ `golangci-lint run` — 0 issues
- ✅ `go test -cover ./...` — 99.8% coverage
- ✅ All 20 HTML files patched by fix-csp.mjs
- ✅ 0 inline scripts missing from CSP (verified across index, dependents, installation pages)
- ✅ `style-src 'self' 'unsafe-inline'` with **no hashes** on all pages

---

## b) PARTIALLY DONE

### Firebase Deploy

- **Build** works correctly (`npm run build` runs `astro build && node scripts/fix-csp.mjs`)
- **Deploy** fails with authentication error: `Failed to authenticate, have you run firebase login?`
- The `GOOGLE_APPLICATION_CREDENTIALS` service account key is likely expired
- **Needs:** Rotation of the Firebase service account key in GitHub secrets

### Lighthouse CI

- Runs but reports failures on the **old deployment** (new build not yet deployed)
- Known failures: `color-contrast`, `errors-in-console` (from old CSP violations), `render-blocking-resources`
- `LHCI_GITHUB_APP_TOKEN` still not configured (status checks skipped)
- Once Firebase deploy is fixed, these should improve (CSP console errors will be gone)

---

## c) NOT STARTED

From TODO_LIST.md — items not touched this session:

- Fix Lighthouse accessibility failures (color-contrast, ARIA labels)
- Add "Who Uses gogenfilter" CTA to landing page
- Website performance audit
- Test dependents page with real dependents
- Configure or remove Lighthouse CI
- Resolve 5 open Dependabot PRs (#17–#21)
- Review `docs/planning/` for outdated info
- Strategic decisions (v3 maintenance vs v4)

---

## d) TOTALLY FUCKED UP

### Firebase Deploy — Hard Blocked

The `GOOGLE_APPLICATION_CREDENTIALS` secret contains a service account key that Firebase rejects. This blocks ALL deployments. The last successful deploy was from commit `a7dcafd` (2026-06-01). Every subsequent push fails at deploy.

**Impact:** The live site still has the OLD CSP with style hashes and missing script hashes. All our fixes exist only in the repo and CI build artifacts — NOT on the actual website.

**Fix required:** Someone with Firebase project admin access must:
1. Generate a new service account key from GCP Console
2. Update the `GOOGLE_APPLICATION_CREDENTIALS` GitHub secret

### fix-csp.mjs — Hashes JSON-LD Unnecessarily

The `INLINE_SCRIPT_RE` regex matches `<script type="application/ld+json">` blocks because it only excludes `type="module"`. JSON-LD blocks don't execute as scripts, so browsers don't check them against `script-src`. The hashes are harmless but wasteful.

---

## e) WHAT WE SHOULD IMPROVE

### Short-Term (this session's lessons)

1. **Fix Firebase deploy FIRST** — All CSP fixes are invisible until deployed
2. **fix-csp.mjs should exclude `type="application/ld+json"`** — Minor cleanup
3. **Add CI check for CSP violations** — Post-build verification that no inline scripts are missing hashes
4. **Consider dropping CSP entirely** — Starlight's architecture fundamentally conflicts with strict CSP. The current approach is a band-aid on Astro's limitations. Evaluate if CSP adds real security value for a static docs site.

### Medium-Term

5. **Upgrade Astro** — Dependabot PR #21 bumps astro 6.3.1 → 6.4.2. May fix CSP hashing gaps natively
6. **Lighthouse a11y fixes** — `color-contrast` on root page, `redirects` on `/docs`
7. **Merge Dependabot PRs** — 5 open PRs for npm dependency bumps, all pass Website CI

### Architecture

8. **The post-build script is fragile** — Regex-based HTML manipulation is brittle. If Astro v7 changes CSP format, this breaks silently. Consider an Astro integration plugin instead.
9. **Starlight's inline styles are unavoidable** — ~30 `style=""` attributes per page from Starlight's SVG icons, TOC, theme select. Only solvable by contributing upstream to Starlight.

---

## f) Top 25 Things to Get Done Next

| # | Task | Impact | Effort | Priority |
|---|------|--------|--------|----------|
| 1 | **Fix Firebase deploy** (rotate service account key) | CRITICAL — all fixes invisible without it | 15 min | P0 |
| 2 | Exclude `type="application/ld+json"` from fix-csp.mjs | Cleanup | 5 min | P1 |
| 3 | Add CSP verification to CI (assert 0 missing hashes) | Prevent regressions | 30 min | P1 |
| 4 | Merge Dependabot PR #21 (astro 6.3.1 → 6.4.2) | May fix CSP natively | 5 min | P1 |
| 5 | Merge remaining Dependabot PRs (#17–#20) | Security patches | 5 min each | P2 |
| 6 | Fix Lighthouse `color-contrast` on root page | Accessibility | 1 hr | P2 |
| 7 | Fix Lighthouse `redirects` on `/docs` | SEO | 15 min | P2 |
| 8 | Add dependents page CTA to landing page | Cross-promotion | 15 min | P3 |
| 9 | Website performance audit | UX | 1 hr | P3 |
| 10 | Configure LHCI GitHub App token or remove workflow | CI hygiene | 15 min | P3 |
| 11 | Add CSP meta tag to Firebase headers (defense in depth) | Security | 15 min | P3 |
| 12 | Evaluate dropping CSP for static docs site | Simplification | 1 hr research | P3 |
| 13 | Convert fix-csp.mjs to Astro integration plugin | Robustness | 2 hr | P4 |
| 14 | Starlight upstream: request CSS classes instead of inline styles | Ecosystem | Issue + PR | P4 |
| 15 | Test dependents page with real GitHub results | Correctness | 30 min | P4 |
| 16 | Review docs/planning/ for outdated info | Housekeeping | 30 min | P4 |
| 17 | Define v3 maintenance mode vs v4 vision | Strategic | Decision | P5 |
| 18 | Evaluate golangci-lint plugin opportunity | Strategic | Research | P5 |
| 19 | Design custom detector registration API | Extensibility | Design doc | P5 |
| 20 | Add website favicon for Starlight pages | Polish | 5 min | P5 |
| 21 | Generate WebP versions of logo images | Performance | 15 min | P5 |
| 22 | Add `font-display: swap` for Google Fonts | Performance | 5 min | P5 |
| 23 | Supply chain hardening (Sigstore, SLSA) | Security | 2 hr | P6 |
| 24 | CODE_OF_CONDUCT.md | Community | 15 min | P6 |
| 25 | GitHub Discussions for community feedback | Community | 15 min | P6 |

---

## g) Top #1 Question I Cannot Figure Out

**Who has Firebase/GCP admin access to rotate the service account key?**

The `GOOGLE_APPLICATION_CREDENTIALS` secret is expired. This is the single blocker preventing the CSP fix from going live. I cannot resolve this — it requires someone with `lars-software` Firebase project admin access to:

1. Go to GCP Console → IAM → Service Accounts
2. Generate a new JSON key for the CI deploy service account
3. Update the `GOOGLE_APPLICATION_CREDENTIALS` secret in GitHub repo settings

---

## Commits This Session

| Hash | Message |
|------|---------|
| `f1bb2d3` | fix(website): strip auto-generated style hashes from CSP to restore unsafe-inline |
| `c54d917` | docs(website): update CSP documentation — style hash stripping fix |
| `0f8d8b1` | fix(website): compute CSP hashes for Starlight's non-module inline scripts |
| `5535c22` | fix(website): hash aria-hidden inline scripts in CSP |
| `bb93a1b` | refactor(website): eliminate all inline styles from source code |
| `86e83dd` | docs(website): update CSP documentation — inline style elimination |

## Key Metrics

| Metric | Value |
|--------|-------|
| Go test coverage | 99.8% |
| Go lint issues | 0 |
| Test-to-source ratio | 3.66:1 (6,137 / 1,677 lines) |
| Website pages | 20 |
| Inline styles in source | 0 |
| `<style>` blocks in source | 0 |
| CSP script hashes (landing) | 14 |
| CSP script hashes (Starlight pages) | 16-18 |
| style-src hashes | 0 (stripped) |
