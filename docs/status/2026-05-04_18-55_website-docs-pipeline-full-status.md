# Website Docs Pipeline — Full Status Report

**Date:** 2026-05-04 18:55 CEST
**Session Focus:** Fix website docs pipeline — broken links, missing API docs, code example errors, CI failures

---

## a) FULLY DONE ✓

### Critical: Broken Links (ALL landing page + doc links were 404)

| Commit | What |
|--------|------|
| `7d8c926` | Fixed all `/docs/...` links in 4 Astro components + 2 doc files → root-level paths. Root cause: flatten commit (8f83648) moved `src/content/docs/docs/` → `src/content/docs/`, removing `/docs/` URL prefix, but links never updated |
| `040ed77` | Updated `firebase.json` redirect `/docs/**` → `/:dest` (was `/docs/docs/**` → `/docs/:dest`). Updated `lighthouserc.json` URLs from `/docs/...` to root-level |
| `a8fa8b4` | Added trailing slash to `/limitations/` link in sqlc-config.mdx for consistency |

### High: Missing API Documentation

| Commit | What |
|--------|------|
| `173569f` | Added `FilterPaths`, `FilterContext`, `FilterPathsContext` to `api/filter.mdx`. Added `FilterConfigError` type, `CodeInvalidFilterOption` error code, `ErrInvalidFilterOption` sentinel to `api/errors.mdx`. Updated `AllErrorCodes()` count 7→8 |
| `46aedff` | Documented `TotalFilesChecked` field on `FilterStats` (embedded from `MetricsMixin` but was only in Phantom Types table) |

### High: Wrong API Signatures in Docs

| Commit | What |
|--------|------|
| `771d3ae` | Fixed return types: `WithFS`, `WithIncludePatterns`, `WithExcludePatterns` return `FilterConfig` NOT `(FilterConfig, error)`. Only `WithFilterOptions` returns error |
| `9a7224a` | Removed dead `if err != nil` after `WithFS()` in custom-filesystem.mdx — `WithFS` returns `FilterConfig`, checking previous error was copy-paste artifact |

### High: Broken Code Examples

| Commit | What |
|--------|------|
| `173569f` | Fixed `NewFilter()` calls: `f :=` → `f, _ :=` (returns `(*Filter, error)`). Added error handling for `filter.Filter()` in installation.mdx |
| `8a9f425` | Fixed tab/space mixing in installation.mdx Go code blocks. Added proper import grouping |
| `1153c3d` | Fixed tab/space mixing + zero-indent control flow in quick-start.mdx (code was syntactically invalid Go outside function body). Fixed 3 code blocks |
| `ed9ccad` | Fixed tab/space inconsistency across 3 code blocks in custom-filesystem.mdx (block 1=tabs, block 2=spaces, block 3=tabs → all tabs now) |

### Done: Infrastructure

| Commit | What |
|--------|------|
| `b4c9ec9` | Bumped `github.com/Masterminds/semver/v3` v3.4.0 → v3.5.0 |
| `040ed77` | Updated `AGENTS.md` with URL structure documentation |

### Local Verification (ALL PASS)

| Check | Status |
|-------|--------|
| `go test ./...` | ✅ PASS |
| `go vet ./...` | ✅ CLEAN |
| Coverage | ✅ 98.9% |
| `npm run build` (website) | ✅ 19 pages built |
| `npx astro check` | ✅ 0 errors, 0 warnings, 0 hints |
| `html-validate` | ✅ EXIT: 0 |
| `npm run dedup` | ✅ 0 clones |
| No `/docs/` links in source | ✅ VERIFIED |
| No `/docs/` links in dist | ✅ VERIFIED |
| All exported Go symbols documented | ✅ (only `NewMetrics` excluded — internal API) |

---

## b) PARTIALLY DONE

### CI Workflow Fix (UNCOMMITTED — in working tree)

`.github/workflows/website.yml` has a fix that:
- Makes `md-go-validator` checkout `continue-on-error: true` with step ID
- Removes unused `LarsArtmann/go-output` checkout
- Makes build + validation conditional on successful checkout
- Fixes relative paths for validation command

**Status:** Code is correct but NOT YET COMMITTED. Needs review and commit.

### Live Site Deployment

The live site at `gogenfilter.lars.software` and `gogenfilter.web.app` still shows the OLD API:
- `Enabled()`, `Disabled()` — removed functions
- `ShouldFilter()`, `MustShouldFilter()` — removed/renamed
- Old constructor signature `*Filter` instead of `(*Filter, error)`

**Status:** Deployment blocked by CI failure. CI failure caused by `PRIVATE_REPO_TOKEN` secret not configured.

---

## c) NOT STARTED

1. **`PRIVATE_REPO_TOKEN` GitHub secret** — Needs to be added by repo owner. Required for `LarsArtmann/md-go-validator` private repo checkout in CI
2. **Live site verification** — Once CI passes, verify the deployed site shows correct API
3. **`docs/index.mdx` cleanup** — Dead content overridden by landing page. Low risk, low priority
4. **Consistent indentation across ALL doc files** — 3 files use tabs (installation, quick-start, custom-filesystem), rest use spaces. Each file is internally consistent. No mixing within blocks. Low priority
5. **Domain consistency** — Astro `site` config uses `gogenfilter.lars.software`, Lighthouse CI tests `gogenfilter.web.app`. Pre-existing

---

## d) TOTALLY FUCKED UP ⚠️

### CI — Website + Lighthouse FAILING on every push

**Root cause:** `PRIVATE_REPO_TOKEN` secret not configured in GitHub repo settings. The workflow tries to checkout `LarsArtmann/md-go-validator` (private repo) with `github.token` which gets 404.

**Impact:** NO deployment happens. The live site shows months-old API that doesn't match the source code. Every commit to `website/` triggers a red CI.

**Fix required:** Repo owner must add a PAT with `contents:read` scope for `LarsArtmann/md-go-validator` as `PRIVATE_REPO_TOKEN` secret. OR merge the uncommitted workflow fix that makes the checkout optional.

### Live Site Shows COMPLETELY Wrong API

The deployed site shows:
- `Enabled()` / `Disabled()` — functions that were REMOVED
- `ShouldFilter()` — renamed to `Filter()`
- `MustShouldFilter()` — REMOVED
- `NewFilter() *Filter` — now returns `(*Filter, error)`
- `WithFilterOptions` "Panics on invalid options" — now returns error
- Missing `FilterPaths`, `FilterContext`, `FilterPathsContext`
- Missing `FilterConfigError`, `CodeInvalidFilterOption`

**This means the live docs are actively misleading users.**

---

## e) WHAT WE SHOULD IMPROVE

1. **CI must not be broken** — A broken CI means no deployment, no validation, no quality gates. This is the #1 priority
2. **Docs-source sync** — Currently manual. Could use `go doc` output or Go examples to auto-generate API reference sections
3. **Dead docs/index.mdx** — Renders at `/` but overridden by landing page. Should either redirect or be removed
4. **Tab/space convention** — Establish a project standard (Go uses tabs, but MDX doesn't care). Document in AGENTS.md
5. **Link checking in CI** — No step validates that internal links resolve. A broken link like the `/docs/` issue could recur
6. **Domain canonical consistency** — `gogenfilter.lars.software` vs `gogenfilter.web.app` should be resolved
7. **Firebase redirect is a band-aid** — The `/docs/**` → `/:dest` redirect handles old indexed URLs but is a temporary measure. Consider if docs should actually be under `/docs/`

---

## f) Top #25 Things to Get Done Next

### P0 — Unblock (do now)

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Commit the `website.yml` CI fix (make private repo checkout optional) | Unblocks ALL future deployments | 5 min |
| 2 | Verify CI passes after fix | Confirms deployment pipeline works | 2 min |
| 3 | Verify live site deployment succeeds | End-to-end validation | 5 min |

### P1 — High Impact

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 4 | Add `PRIVATE_REPO_TOKEN` secret (requires repo owner) | Full CI validation with md-go-validator | 5 min (owner) |
| 5 | Add link checking step to website CI | Prevents future broken link regressions | 30 min |
| 6 | Remove or redirect dead `docs/index.mdx` | Eliminates confusing dead page | 15 min |
| 7 | Verify ALL doc code examples compile via `md-go-validator` | Catches API drift early | 5 min (after #4) |

### P2 — Architecture & Quality

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 8 | Generate API reference from Go source/doc comments | Single source of truth, no manual drift | 2-4 hr |
| 9 | Add `godoc`-style examples (`Example_*` test functions) | Auto-verified, always current | 2-3 hr |
| 10 | Resolve domain: pick `gogenfilter.lars.software` OR `gogenfilter.web.app` | SEO, canonical URLs, Lighthouse | 30 min |
| 11 | Document indentation convention in AGENTS.md | Consistency for future edits | 5 min |
| 12 | Add `htmltest` (external link checker) to CI | Catches broken external links too | 30 min |
| 13 | Add og:image to landing page (currently only docs have OG images) | Better social sharing for root URL | 30 min |

### P3 — Polish

| # | Task | Impact | Effort |
|---|------|--------|--------|
| 14 | Standardize all Go code blocks to tabs (or spaces) across all docs | Visual consistency | 30 min |
| 15 | Add `package` + `import` headers to all standalone code snippets | Complete, copy-pasteable examples | 1 hr |
| 16 | Add version badge/shield to landing page | Shows current version at a glance | 15 min |
| 17 | Add "Edit this page on GitHub" links to docs | Community contributions | 15 min |
| 18 | Add Algolia/PageFind search customization | Better search UX | 1 hr |
| 19 | Add `CONTRIBUTING.md` to repo root (currently only in docs) | GitHub shows it on PRs | 15 min |
| 20 | Add `CHANGELOG.md` to repo root | Standard Go project convention | 15 min |
| 21 | Configure Firebase to serve custom 404 page | Better UX for broken links | 30 min |
| 22 | Add Open Graph meta tags to landing page hero | Better social previews | 15 min |
| 23 | Investigate `astro:assets` for logo optimization | Performance | 30 min |
| 24 | Add `robots.txt` `Sitemap` directive pointing to full URL | SEO | 5 min |
| 25 | Consider moving docs back under `/docs/` via Astro `base` config | Cleaner URL structure, landing/docs separation | 1 hr |

---

## g) Top #1 Question I Cannot Figure Out Myself

**Does the `PRIVATE_REPO_TOKEN` secret exist at all in this repo's GitHub settings, or was it never configured?**

The workflow uses `${{ secrets.PRIVATE_REPO_TOKEN || github.token }}` — the fallback to `github.token` causes the 404 because `github.token` only has access to the current repo, not `LarsArtmann/md-go-validator`. I cannot check or configure repo secrets — only the repo owner can verify/add this. This is THE blocker for deployment.

**Alternative approach I need feedback on:** Should I commit the workflow fix that makes the private checkout optional (already in the working tree)? This would unblock CI immediately — the build, deploy, HTML validation, and dedup checks would all pass. Only the doc validation step would be skipped until the token is configured.

---

## Session Statistics

| Metric | Value |
|--------|-------|
| Commits made | 12 (11 pushed + 1 pending workflow fix) |
| Files changed | 15 |
| Lines changed | ~120 insertions, ~70 deletions |
| Go tests | ✅ PASS |
| Go coverage | 98.9% |
| Website build | ✅ 19 pages |
| Astro check | ✅ 0 issues |
| HTML validation | ✅ PASS |
| Code dedup | ✅ 0 clones |
| CI (Go) | ✅ PASS |
| CI (Website) | ❌ FAIL (PRIVATE_REPO_TOKEN) |
| CI (Lighthouse) | ❌ FAIL (depends on live site) |
| CI (Benchmark) | ✅ PASS |
