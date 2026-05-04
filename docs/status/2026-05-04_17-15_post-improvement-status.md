# Status Report — 2026-05-04 17:15

_Generated after full session: CI audit → fix → reflection → improvement → push cycle._

---

## Executive Summary

| Area           | Status         | Detail                                                   |
| -------------- | -------------- | -------------------------------------------------------- |
| Go library     | **SHIPPING**   | 98.9% coverage, 0 lint, all tests pass, 24 benchmarks    |
| CI (test+lint) | **PASSING** ✅ | Green across the board, Node.js 24 via setup-go@v6       |
| Benchmark CI   | **PASSING** ✅ | gh-pages branch live, data pushing successfully          |
| Website CI     | **BLOCKED** 🔴 | Needs `PRIVATE_REPO_TOKEN` secret (repo owner action)    |
| Lighthouse CI  | **PARTIAL** 🟡 | Config fixed; accessibility assertions fail on live site |
| Working tree   | **CLEAN**      | Everything pushed to origin/master                       |

---

## a) FULLY DONE

### Go Library — Production-Grade

- **11 generator detectors** + generic fallback, table-driven, zero-maintenance derived lists
- **Two-phase detection**: filename (zero I/O) → content (reads file), automatic skip when no content checkers enabled
- **Functional options API**: `NewFilter(WithFilterOptions(FilterAll), WithFS(fsys), WithIncludePatterns(...))`
- **Batch methods**: `FilterPaths`, `FilterPathsContext` with cancellation support
- **Phantom types**: `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`
- **Branded errors**: `[gogenfilter:<code>]` prefix, 7 sentinel errors, `errors.Is` support, `ErrorCoder`/`Helper` interfaces
- **`fs.FS` abstraction**: testable via `fstest.MapFS`
- **Thread-safe metrics**: `FilteredFiles()`, `FilteredBy()`, `TotalFiltered()` accessors
- **Pattern matching**: `**` glob via `doublestar/v4`

### Test Suite — Comprehensive

- **98.9% statement coverage** (CI threshold: 98%)
- **175 BDD specs** (ginkgo/gomega)
- **Fuzz tests**, **property-based tests**, **integration tests** with embedded testdata from 11 generators
- **24 benchmarks**: Filter enabled 73ns, disabled 1.3ns, 0 allocs on hot paths
- **Race detector clean**

### CI Workflow Fixes — This Session (7 commits)

| Commit    | Fix                                         | Before → After                                   |
| --------- | ------------------------------------------- | ------------------------------------------------ |
| `deb4d61` | website.yml: `path` inside `with`           | checkout overwrote root → correct subdirs        |
| `deb4d61` | gh-pages branch created                     | `fatal: couldn't find remote ref` → data pushing |
| `deb4d61` | lighthouse.yml: removed `budgetPath`        | LHCI v12 rejects both → assertions only          |
| `deb4d61` | setup-go v5 → v6                            | Node.js 20 deprecation → Node.js 24              |
| `deb4d61` | removed `budget.json` from path filters     | stale triggers → clean                           |
| `0af8fef` | PAT token fallback for cross-repo checkouts | 404 on private repos → code ready for secret     |
| `2f037a0` | `workflow_dispatch` on website + benchmark  | no manual trigger → on-demand                    |
| `85854c3` | deleted `budget.json`                       | dead file in repo → gone                         |
| `ca2cf80` | CHANGELOG `[Unreleased]` section            | no record → documented                           |
| `786b75b` | AGENTS.md full CI section rewrite           | stale docs → current                             |

### Documentation

- **CHANGELOG.md**: `[Unreleased]` section with all CI fixes
- **AGENTS.md**: Complete CI section with 4 workflows, known issues, current coverage
- **Status reports**: 2 comprehensive reports in `docs/status/`

---

## b) PARTIALLY DONE

### Website CI — Code Ready, Blocked on Secret

**What's done**: Checkout path fix, PAT token plumbing (`secrets.PRIVATE_REPO_TOKEN || github.token`), `workflow_dispatch` trigger.

**What's blocked**: The `PRIVATE_REPO_TOKEN` secret must be created by the repo owner. The `GITHUB_TOKEN` (default) cannot access `LarsArtmann/md-go-validator` or `LarsArtmann/go-output` (both private repos).

**Failure**: `Not Found - https://docs.github.com/rest/repos/repos#get-a-repository` on `actions/checkout` for private repos.

**Latest run**: `25326650328` — still failing as expected (no secret configured yet).

### Lighthouse CI — Config Fixed, Site Has Real Issues

**What's done**: Removed `budgetPath` input (LHCI v12 compatibility), assertions in `lighthouserc.json` are correct.

**What's failing**: The live website has real accessibility/performance problems detected by the (now-working) assertions:

| URL                | Failures                                                                |
| ------------------ | ----------------------------------------------------------------------- |
| `/` (root)         | `color-contrast` (0 vs ≥0.9), `label-content-name-mismatch` (0 vs ≥0.9) |
| `/docs`            | `document-latency-insight` (0.5 vs ≥0.9), `redirects` (0 vs ≥0.9)       |
| `/docs/api/filter` | `network-dependency-tree-insight` (0 vs ≥0.9)                           |
| `/docs/changelog`  | `network-dependency-tree-insight` (0 vs ≥0.9)                           |

Also: `LHCI_GITHUB_APP_TOKEN` secret not configured → GitHub status checks skipped.

---

## c) NOT STARTED

1. **Create `PRIVATE_REPO_TOKEN` secret** — fine-grained PAT with `contents:read` on md-go-validator + go-output
2. **Install LHCI GitHub App** + add `LHCI_GITHUB_APP_TOKEN` secret
3. **Fix website color-contrast** — likely in Hero section CSS
4. **Fix website label-content-name-mismatch** — likely buttons/links with icons
5. **Fix `/docs` redirect chain** — likely Firebase Hosting config
6. **Optimize render-blocking resources** — defer/async scripts
7. **Convert images to WebP** — `uses-webp-images` warning on all pages
8. **Pin GitHub Actions to SHA hashes** — supply-chain security
9. **Add Dependabot for Actions** — auto-update action versions
10. **Connect Codecov/Coveralls** — coverage visualization
11. **Add link-checker to website CI** — broken link detection
12. **Visual regression testing** — Playwright/puppeteer for website
13. **API docs generation** — godoc→md pipeline
14. **Contributing guide for new detectors** — step-by-step onboarding
15. **goreleaser config** — automated releases

---

## d) TOTALLY FUCKED UP

### Website CI — Never Worked with Current Architecture

The website workflow has **never successfully completed** with the cross-repo checkout steps. Two compounding bugs:

1. **`path:` outside `with:`** — The YAML was syntactically valid but semantically wrong. `actions/checkout` ignores top-level `path` — it must be inside `with:`. This caused the second checkout to overwrite the workspace root, deleting the `website/` directory.

2. **`GITHUB_TOKEN` scope limitation** — Even after fixing `path:`, the default token cannot access private repos in other repositories. This means the workflow was architecturally broken from the moment cross-repo checkouts were added.

**Impact**: 20+ consecutive failures over several hours. Website may not have been deployed via CI at all during this period.

**Current state**: Code is correct, plumbing is in place, but the `PRIVATE_REPO_TOKEN` secret must be created by the repo owner to unblock.

### Lighthouse Accessibility — Real User Impact

The landing page has `color-contrast` score of **0** (expected ≥0.9). This means text elements exist that are unreadable — either invisible, or nearly invisible against their background. This is not a config issue — it's a real accessibility violation affecting actual users.

---

## e) WHAT WE SHOULD IMPROVE

### Critical (Blocks Shipping)

1. **PAT token** — Without this, website CI is dead. 5-minute manual action.
2. **Website accessibility** — Color contrast and label issues are real user-facing bugs.
3. **LHCI GitHub App token** — Without this, Lighthouse enforcement is theater (status checks skipped).

### Important (Quality & Maintenance)

4. **Action pinning to SHA** — Supply-chain attack vector; all actions use `@v6` tags (mutable).
5. **Dependabot for Actions** — Prevents manual version tracking like the v5→v6 migration.
6. **Coverage reporting service** — No historical visibility into coverage trends.
7. **`/docs` redirect chain** — Performance regression on the docs landing page.

### Nice to Have (Polish)

8. **Link checker** — No automated detection of broken links in docs.
9. **Contributing guide** — No documentation for adding new generator detectors.
10. **goreleaser** — No automated release pipeline.

---

## f) Top #25 Things to Do Next

| #   | Priority | Task                                                                                    | Effort | Impact                        |
| --- | -------- | --------------------------------------------------------------------------------------- | ------ | ----------------------------- |
| 1   | P0       | Create `PRIVATE_REPO_TOKEN` secret (PAT with repo scope on md-go-validator + go-output) | 5min   | Unblocks website CI entirely  |
| 2   | P0       | Fix color-contrast on landing page (Hero section)                                       | 30min  | Lighthouse accessibility pass |
| 3   | P0       | Fix label-content-name-mismatch on landing page (buttons/links with icons)              | 15min  | Lighthouse accessibility pass |
| 4   | P1       | Install Lighthouse CI GitHub App, add `LHCI_GITHUB_APP_TOKEN` secret                    | 10min  | Status check enforcement      |
| 5   | P1       | Fix `/docs` redirect chain (Firebase Hosting config)                                    | 15min  | Performance                   |
| 6   | P1       | Optimize render-blocking resources (defer/async scripts)                                | 30min  | Performance                   |
| 7   | P1       | Convert images to WebP format                                                           | 20min  | Lighthouse warnings           |
| 8   | P2       | Pin all GitHub Actions to SHA hashes                                                    | 15min  | Supply-chain security         |
| 9   | P2       | Add Dependabot config for GitHub Actions auto-updates                                   | 10min  | Maintenance                   |
| 10  | P2       | Add link-checker step to website CI                                                     | 20min  | Docs quality                  |
| 11  | P2       | Connect Codecov for coverage visualization                                              | 15min  | Visibility                    |
| 13  | P2       | Tighten Lighthouse thresholds after accessibility fixes                                 | 10min  | Quality gate                  |
| 14  | P3       | Add visual regression testing (Playwright)                                              | 2hr    | UI quality                    |
| 15  | P3       | Generate API docs from Go source                                                        | 3hr    | Docs freshness                |
| 16  | P3       | Add `FilterWithContext` for single-file cancellation                                    | 30min  | API completeness              |
| 17  | P3       | Add example tests for `FilterPaths` and `FilterPathsContext`                            | 15min  | Docs                          |
| 18  | P3       | Benchmark dashboard: trend comparison                                                   | 1hr    | Observability                 |
| 19  | P3       | Add CHANGELOG entries for v0.x releases                                                 | 30min  | Release readiness             |
| 20  | P4       | Consider Renovate over Dependabot                                                       | 30min  | Dependency management         |
| 21  | P4       | Add goreleaser config                                                                   | 1hr    | Release automation            |
| 22  | P4       | Migrate any remaining justfile remnants                                                 | 15min  | Cleanup                       |
| 23  | P4       | Contributing guide for new detector types                                               | 30min  | Onboarding                    |
| 24  | P4       | Add `output-file-path` to lighthouserc.json for LHCI results                            | 5min   | Debugging                     |
| 25  | P4       | Audit website CSP headers for Starlight compatibility                                   | 15min  | Security                      |

---

## g) Top #1 Question I Cannot Figure Out Myself

**Was the website CI ever actually working with the cross-repo private checkouts?**

Both the `path:` bug (outside `with:`) AND the token scope issue (`GITHUB_TOKEN` can't access private repos) were present from the moment these checkout steps were added. This means either:

1. The repos were previously public and later made private
2. A PAT was previously configured and later removed
3. The cross-repo checkout steps were never tested
4. The workflow was passing by coincidence (checkout to root happened to not break subsequent steps)

This matters because it determines whether adding the PAT will fix everything, or if there are more latent issues we haven't seen.

---

## CI Dashboard (Live as of 2026-05-04 17:15 UTC)

```
CI (test+lint)      ✅ PASSING  — 98.9% coverage, 0 lint issues, race clean
Benchmark           ✅ PASSING  — gh-pages data push working, all 24 benchmarks
gh-pages deploy     ✅ PASSING  — Benchmark dashboard live
Website             ❌ BLOCKED  — Needs PRIVATE_REPO_TOKEN secret (repo owner action)
Lighthouse CI       ❌ FAILING  — Accessibility assertions (real site issues)
```

## Key Metrics

| Metric               | Value                 |
| -------------------- | --------------------- |
| Go version           | 1.26.2                |
| Coverage             | 98.9%                 |
| Linter issues        | 0                     |
| BDD specs            | 175                   |
| Benchmarks           | 24                    |
| Source files         | 22 `.go` files        |
| Total lines          | 9,066                 |
| Generator detectors  | 11                    |
| Dependencies         | 4 direct, 16 indirect |
| Website pages        | 19                    |
| Commits this session | 10                    |

## Commits This Session (chronological)

```
deb4d61 fix(ci): resolve all workflow failures — website, benchmark, lighthouse, Node.js deprecation
b6a3a8f feat(api): add FilterContext and FilterPathsContext for cancellation support
6e86bf7 docs: update AGENTS.md and CHANGELOG for FilterPaths + FilterContext APIs
5740c84 docs(status): comprehensive CI audit report — 2026-05-04 16:47
4c273e7 docs(status): add comprehensive CI audit report — 2026-05-04 16:48
85854c3 chore: delete dead budget.json — no longer referenced by any workflow
2f037a0 ci: add workflow_dispatch triggers to website and benchmark workflows
0af8fef fix(ci): add PAT token support for private repo checkouts in website workflow
ca2cf80 docs(changelog): add [Unreleased] section for CI workflow fixes
786b75b docs(AGENTS.md): update CI section with fixes, known issues, and current coverage
```

---

_Report generated by Crush (GLM-5.1) on 2026-05-04 at 17:15._
