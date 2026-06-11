# Status Report — Live Site CSP Broken, Firebase Deploy Hard-Blocked

**Date:** 2026-06-03 11:13 CEST
**Branch:** master (clean)
**Session context:** User reports live site CSP violations despite all fixes being in the repo

---

## Executive Summary

The gogenfilter Go library is **production-ready and stable** (99.8% coverage, 0 lint issues, all 11 detectors working). The **website is hard-blocked on Firebase deploy** — the `GOOGLE_APPLICATION_CREDENTIALS` service account key is expired, so the last 6 commits (including all CSP fixes) have **never been deployed**. The live site still serves the old broken CSP with style hashes that make `'unsafe-inline'` ineffective. All code-level fixes are correct and verified locally — they just can't reach production.

**CI Reality:**

- **Go CI:** ✅ All green (test, vet, lint, vulncheck, dedup)
- **Website Build CI:** ✅ All green (typecheck, build, HTML validation, dedup, import path check)
- **Website Deploy CI:** ❌ **HARD BLOCKED** — Firebase auth failure since 2026-06-02
- **Lighthouse CI:** ❌ Failing on old deployment (a11y, CSP console errors, stale content)
- **Dependabot PRs:** 5 open (#17–#21), all pass Website CI, fail Lighthouse CI (token not configured)

---

## a) FULLY DONE

### Core Library — Complete & Production-Ready

| Component              | Status | Details                                                                                                    |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| 11 generator detectors | ✅     | sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic fallback |
| Two-phase detection    | ✅     | Filename (zero I/O) → content (reads file)                                                                 |
| Functional options API | ✅     | `NewFilter(WithFilterOptions(FilterAll), ...)` — immutable after construction                              |
| FilterResult + trace   | ✅     | `FilterDetailed()` returns reason, path, trace                                                             |
| Pattern matching       | ✅     | `**` glob via doublestar/v4, include/exclude scoping                                                       |
| SQLC config discovery  | ✅     | v1 + v2 format, OS + fs.FS variants                                                                        |
| Branded error system   | ✅     | `[gogenfilter:<code>]` prefix, 8 sentinel errors, `ErrorCoder` interface                                   |
| fs.FS abstraction      | ✅     | `WithFS()` for testability                                                                                 |
| Test coverage          | ✅     | **99.8%** — only untestable `filepath.Abs` error path remains                                              |
| golangci-lint          | ✅     | v2 with 90+ linters, 0 issues                                                                              |
| Go vet                 | ✅     | Clean                                                                                                      |
| govulncheck            | ✅     | Clean                                                                                                      |
| Code dedup             | ✅     | art-dupl semantic check passing (known false positive in sqlc.go excluded)                                 |
| Benchmark tests        | ✅     | All hot paths benchmarked, CI tracking via gh-pages                                                        |

### Testing — Comprehensive

| Test Type          | Count/Details                                                  | Status |
| ------------------ | -------------------------------------------------------------- | ------ |
| Table-driven tests | All test files                                                 | ✅     |
| BDD tests          | ~120 ginkgo specs in `bdd_test.go`                             | ✅     |
| Fuzz tests         | `FuzzMatchPattern`, `FuzzDetectReason`                         | ✅     |
| Property tests     | `testing/quick` for idempotency/invariants                     | ✅     |
| Benchmark tests    | All hot paths                                                  | ✅     |
| Concurrent tests   | 100-goroutine Filter test                                      | ✅     |
| Integration tests  | Real generated files via `//go:embed testdata`                 | ✅     |
| Generic helpers    | `assertErrorType[T]`, `boolTestCase[T]`, `runBoolTableTest[T]` | ✅     |

### Website — Source Code Complete

| Component                 | Status | Details                                                                       |
| ------------------------- | ------ | ----------------------------------------------------------------------------- |
| Astro v6 + Starlight      | ✅     | Landing page + 17 doc pages + dependents page (20 total)                      |
| Landing page              | ✅     | Hero, features, code examples, comparison, use cases, CTA                     |
| Starlight docs            | ✅     | PageFind search, sidebar navigation                                           |
| Dependents page           | ✅     | Build-time GitHub code search for public users                                |
| Type checking             | ✅     | `astro check` — 0 errors, 0 warnings, 0 hints (33 files)                      |
| HTML validation           | ✅     | `html-validate` — all 20 pages pass                                           |
| Code dedup                | ✅     | jscpd via wrapper script, no violations                                       |
| Import path validation    | ✅     | CI checks all `gogenfilter` imports include `/v3`                             |
| CHANGELOG sync            | ✅     | CI verifies root + website changelogs match                                   |
| Stale reference detection | ✅     | CI checks for references to deleted files                                     |
| CSP fix-csp.mjs           | ✅     | Strips style hashes, computes missing script hashes — works correctly locally |
| Inline styles             | ✅     | **Zero** in our source code — all converted to Tailwind classes               |
| Theme system              | ✅     | Dark mode default, light mode toggle, persisted to localStorage               |
| SEO                       | ✅     | JSON-LD, OG tags, canonical URLs, sitemap                                     |
| A11y                      | ✅     | Dependents page: caption, star labels, ARIA attributes                        |
| Firebase config           | ✅     | `firebase.json`, `.firebaserc` in `website/`                                  |
| External scripts          | ✅     | 4 files in `public/js/` — all CSP-compliant (no inline scripts in our source) |

### CI/CD — Go Pipeline Complete

| Workflow                                           | Trigger                          | Status                               |
| -------------------------------------------------- | -------------------------------- | ------------------------------------ |
| Go CI (`.github/workflows/ci.yml`)                 | Push/PR to master, path-filtered | ✅ test, vet, lint, vulncheck, dedup |
| Benchmark (`.github/workflows/benchmark.yml`)      | Push to master, path-filtered    | ✅ Pushes to gh-pages                |
| Website build (`.github/workflows/website.yml`)    | Push/PR to master, path-filtered | ✅ Build + all validations           |
| Lighthouse CI (`.github/workflows/lighthouse.yml`) | Push/PR to master, path-filtered | ❌ Token not configured              |

### Infrastructure

| Component                | Status                                                                  |
| ------------------------ | ----------------------------------------------------------------------- |
| `flake.nix` (root)       | ✅ Go 1.26.3 dev environment                                            |
| `flake.nix` (website)    | ✅ Node 24 dev environment                                              |
| `.buildflow.yml`         | ✅ Project-specific excludes configured                                 |
| `.github/dependabot.yml` | ✅ Weekly: Go modules, npm, GitHub Actions                              |
| Dependabot overrides     | ✅ `brace-expansion@5.0.6`, `devalue@5.8.1`, `yaml@2.8.3`, `vite@7.3.2` |

---

## b) PARTIALLY DONE

### Firebase Deploy — Blocked Since 2026-06-02

- **Build pipeline**: ✅ Works perfectly — `npm run build` runs `astro build && node scripts/fix-csp.mjs`
- **Deploy pipeline**: ❌ `Failed to authenticate, have you run firebase login?`
- **Root cause**: `GOOGLE_APPLICATION_CREDENTIALS` service account key expired
- **Impact**: Last 6 commits (all CSP fixes) never deployed. Live site has broken CSP.
- **What works**: The build artifact is correct — verified locally, all 20 HTML files patched

### Lighthouse CI — Partially Configured

- **Workflow**: ✅ Runs on push/PR, scans 4 URLs, 3 runs each
- **Config**: ✅ `lighthouserc.json` with permissive thresholds
- **GitHub App token**: ❌ `LHCI_GITHUB_APP_TOKEN` not configured — no status checks
- **Results**: ❌ Failing on old deployment — CSP console errors inflate issues
- **Known failures**: `color-contrast`, `label-content-name-mismatch`, `redirects`, `errors-in-console`

### fix-csp.mjs — Works but Over-hashes

- ✅ Strips style hashes correctly → `style-src 'self' 'unsafe-inline'`
- ✅ Computes missing script hashes for Starlight inline scripts
- ⚠️ Also hashes `type="application/ld+json"` blocks — harmless but wasteful (browsers don't check JSON-LD against `script-src`)

---

## c) NOT STARTED

### From TODO_LIST.md — Untouched

| Task                                           | Priority | Effort     |
| ---------------------------------------------- | -------- | ---------- |
| Fix Lighthouse `color-contrast` on root page   | MEDIUM   | 1-2 hrs    |
| Fix Lighthouse `redirects` on `/docs`          | MEDIUM   | 15 min     |
| Add "Who Uses gogenfilter" CTA to landing page | LOW      | 15 min     |
| Website performance audit + baseline           | MEDIUM   | 1 hr       |
| Test dependents page with real GitHub results  | LOW      | 30 min     |
| Configure or remove Lighthouse CI              | MEDIUM   | 15 min     |
| Merge 5 open Dependabot PRs (#17–#21)          | LOW      | 5 min each |
| Review `docs/planning/` for outdated info      | LOW      | 30 min     |
| Define v3 maintenance mode vs v4 vision        | HIGH     | Decision   |
| Evaluate golangci-lint plugin opportunity      | MEDIUM   | Research   |
| Design custom detector registration API        | LOW      | Design     |

---

## d) TOTALLY FUCKED UP

### 1. Firebase Deploy — HARD BLOCKED (Since 2026-06-02)

**This is the #1 problem.** The `GOOGLE_APPLICATION_CREDENTIALS` service account key is expired. Every deploy since commit `a7dcafd` fails with `Failed to authenticate, have you run firebase login?`.

**Impact:**

- Live site (`gogenfilter.web.app`) serves **stale code** from 2026-06-01
- ALL CSP fixes (6 commits) are **invisible to users**
- User is seeing CSP violations because the old build has style hashes that disable `'unsafe-inline'`
- Dependents page a11y fixes not live
- `SQLCOperation` typed constants not relevant to deploy, but all subsequent work is undeployed

**Cannot be fixed by code.** Requires Firebase/GCP admin access to rotate the service account key and update the GitHub secret.

### 2. Live Site CSP — Broken Due to Stale Deploy

The user's reported error:

```
Applying inline style violates the following Content Security Policy directive
'style-src 'self' 'unsafe-inline' 'sha256-dOxAnKZR...' 'sha256-uK57H...' 'sha256-vv9Io...' 'sha256-47DEQ...'
Note that 'unsafe-inline' is ignored if either a hash or nonce value is present in the source list.
```

This is **exactly the bug fix-csp.mjs solves** — but it can't help until the site is redeployed. The hashes (`dOxAnKZR`, `uK57HDx`, `vv9IoKo`, `47DEQpj`) are Astro's auto-generated style hashes that make `'unsafe-inline'` ineffective per CSP Level 2 spec.

### 3. fix-csp.mjs Regex — Potential Silent Failure Mode

The script uses regex to parse CSP meta tags. If Astro changes the CSP format in a future version, the regex could silently fail to match, leaving hashes in place. No CI check verifies the fix actually worked.

### 4. Lighthouse CI — Running but Toothless

Runs on every push, produces artifacts, but:

- No `LHCI_GITHUB_APP_TOKEN` → no status checks, no PR comments, no enforcement
- Reports failures on stale content → noisy, not actionable
- Creates false sense of monitoring while providing zero value

---

## e) WHAT WE SHOULD IMPROVE

### Critical Path (Unblocks Everything)

1. **Fix Firebase deploy** — Rotate the service account key. Everything else is theater until this is done.
2. **Verify CSP after deploy** — Once deployed, load the site and confirm `style-src` has no hashes in browser DevTools.

### Quick Wins (After Deploy)

3. **Exclude `type="application/ld+json"` from fix-csp.mjs** — 5 min fix, cleaner CSP headers
4. **Add CSP verification step to CI** — After `fix-csp.mjs`, assert `style-src` contains no `sha256-` hashes. Catch regressions.
5. **Merge Dependabot PRs** — 5 PRs open, all pass Website CI. Astro 6.3.1 → 6.4.2 may fix CSP hashing gaps natively.
6. **Configure LHCI GitHub App token OR remove the workflow** — Dead CI is worse than no CI.

### Architecture Improvements

7. **Replace fix-csp.mjs with Astro integration** — Regex-based HTML post-processing is fragile. An Astro integration hook would be type-safe and version-aware.
8. **Drop CSP entirely for the static docs site** — Evaluate whether CSP provides real security value for a static Astro site. Starlight's architecture (inline scripts, inline styles on SVGs) fundamentally conflicts with strict CSP. The current approach is a band-aid.
9. **Upgrade to latest Astro** — Dependabot PR #18 (6.3.1 → 6.4.2) may include CSP improvements.

### Strategic

10. **Decide v3 vs v4** — The library is done. Is this maintenance mode or is there a v4 scope?
11. **golangci-lint plugin** — Natural extension. Would give gogenfilter real-world impact.
12. **Custom detector registration API** — Community extensibility.

---

## f) Top 25 Things to Get Done Next

| #   | Task                                                                       | Impact                          | Effort     | Blocked?                   |
| --- | -------------------------------------------------------------------------- | ------------------------------- | ---------- | -------------------------- |
| 1   | **Rotate Firebase service account key & update GitHub secret**             | CRITICAL — unblocks all deploys | 15 min     | ❌ Requires GCP admin      |
| 2   | **Verify live site CSP after redeploy**                                    | CRITICAL — confirms fix works   | 5 min      | ⏳ After #1                |
| 3   | **Add CSP verification to CI** (assert no style hashes after fix-csp.mjs)  | Prevent regressions             | 30 min     | No                         |
| 4   | **Exclude `application/ld+json` from fix-csp.mjs**                         | Cleaner CSP                     | 5 min      | No                         |
| 5   | **Merge Dependabot PR #18** (astro 6.3.1 → 6.4.2)                          | May fix CSP natively            | 5 min      | No                         |
| 6   | **Merge Dependabot PRs #17, #19, #20, #21**                                | Security + freshness            | 5 min each | No                         |
| 7   | **Fix Lighthouse `color-contrast` on root page**                           | Accessibility compliance        | 1-2 hrs    | No                         |
| 8   | **Fix Lighthouse `redirects` on `/docs`**                                  | SEO                             | 15 min     | No                         |
| 9   | **Configure LHCI GitHub App token or remove workflow**                     | CI hygiene                      | 15 min     | ❌ Requires GH App install |
| 10  | **Website performance audit** — baseline Lighthouse scores                 | UX optimization                 | 1 hr       | No                         |
| 11  | **Add dependents page CTA to landing page**                                | Cross-promotion                 | 15 min     | No                         |
| 12  | **Test dependents page with real GitHub dependents**                       | Correctness                     | 30 min     | No                         |
| 13  | **Evaluate dropping CSP for static docs site**                             | Architecture simplification     | 1 hr       | No                         |
| 14  | **Convert fix-csp.mjs to Astro integration**                               | Robustness                      | 2 hrs      | No                         |
| 15  | **Starlight upstream: request CSS classes instead of inline styles**       | Ecosystem improvement           | Issue + PR | No                         |
| 16  | **Review docs/planning/ for outdated info**                                | Housekeeping                    | 30 min     | No                         |
| 17  | **Define v3 maintenance mode vs v4 vision**                                | Strategic direction             | Decision   | ❌ Requires owner input    |
| 18  | **Evaluate golangci-lint plugin opportunity**                              | Ecosystem play                  | Research   | No                         |
| 19  | **Design custom detector registration API**                                | Extensibility                   | Design doc | No                         |
| 20  | **Add `font-display: swap` for Google Fonts**                              | Performance                     | 5 min      | No                         |
| 21  | **Generate WebP versions of logo/OG images**                               | Performance                     | 15 min     | No                         |
| 22  | **Supply chain hardening** (Sigstore, SLSA, SBOM)                          | Security                        | 2 hrs      | No                         |
| 23  | **CODE_OF_CONDUCT.md**                                                     | Community                       | 15 min     | No                         |
| 24  | **GitHub Discussions for community feedback**                              | Community                       | 15 min     | No                         |
| 25  | **Starlight favicon** (already have `/favicon.svg`, check Starlight pages) | Polish                          | 5 min      | No                         |

---

## g) Top #1 Question I Cannot Answer Myself

**Who has GCP admin access to rotate the Firebase service account key?**

The `GOOGLE_APPLICATION_CREDENTIALS` secret is expired/invalid. This is the single blocker that prevents ALL website updates from reaching production. Six commits of CSP fixes, a11y improvements, and dependency updates are trapped in the repo.

Steps needed (by someone with `lars-software` Firebase project admin access):

1. Go to [GCP Console → IAM → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Find the CI deploy service account
3. Generate a new JSON key
4. Update the `GOOGLE_APPLICATION_CREDENTIALS` secret in [GitHub repo settings](https://github.com/LarsArtmann/gogenfilter/settings/secrets/actions)
5. Trigger a `workflow_dispatch` on the Website workflow to redeploy

---

## Key Metrics

| Metric                              | Value                            |
| ----------------------------------- | -------------------------------- |
| Go source lines                     | 8,452 total (incl. tests)        |
| Test coverage                       | 99.8%                            |
| Go lint issues                      | 0                                |
| Generator detectors                 | 11                               |
| Website pages                       | 20                               |
| Open Dependabot PRs                 | 5                                |
| Failed CI deploys                   | 3 consecutive (since 2026-06-02) |
| Undeployed commits                  | 6                                |
| Inline styles in source             | 0                                |
| CSP style hashes (after fix)        | 0                                |
| CSP script hashes (landing page)    | 14                               |
| CSP script hashes (Starlight pages) | 16–18                            |
| Last successful deploy              | 2026-06-01 (commit `a7dcafd`)    |

## Source Files Summary

| File                   | Purpose                               | Lines |
| ---------------------- | ------------------------------------- | ----- |
| `detection.go`         | Core detection logic, detectors table | ~470  |
| `filter.go`            | Filter type, functional options       | ~290  |
| `types.go`             | FilterOption, FilterReason types      | ~165  |
| `errors.go`            | Branded errors, sentinel errors       | ~185  |
| `sqlc.go`              | SQLC config discovery/parsing         | ~330  |
| `pattern.go`           | Glob pattern matching                 | ~31   |
| `project.go`           | Project root discovery                | ~35   |
| `bdd_test.go`          | ~120 ginkgo BDD specs                 | ~950  |
| `bdd_extended_test.go` | Extended BDD scenarios                | ~590  |
| `filter_test.go`       | Filter unit tests                     | ~465  |
| `detection_test.go`    | Detection unit tests                  | ~400  |
| `sqlc_test.go`         | SQLC unit tests                       | ~480  |
| `helpers_test.go`      | Generic test helpers                  | ~375  |
| `example_test.go`      | Runnable examples                     | ~225  |
