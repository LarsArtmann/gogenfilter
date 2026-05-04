# Status Report — 2026-05-04 16:47

_Generated after comprehensive CI workflow audit, fix session, and post-fix verification._

---

## TL;DR

| Area                | Status              | Health                                                   |
| ------------------- | ------------------- | -------------------------------------------------------- |
| Go library (core)   | **SHIPPING**        | 🟢 98.9% coverage, 0 lint issues, all tests pass         |
| CI (test+lint)      | **FIXED**           | 🟢 Was passing already, now with Node.js 24              |
| Benchmark CI        | **FIXED**           | 🟢 Was failing (no gh-pages), now passing                |
| Website CI          | **STILL BROKEN**    | 🔴 Private repo checkout needs PAT token                 |
| Lighthouse CI       | **PARTIALLY FIXED** | 🟡 Config error fixed, but accessibility assertions fail |
| Benchmark dashboard | **LIVE**            | 🟢 gh-pages branch created, data pushing                 |

---

## a) FULLY DONE

### Core Library (Production-Ready)

- **11 generator detectors**: sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic fallback
- **Two-phase detection**: filename-based (zero I/O) → content-based (reads file)
- **Table-driven detector system**: `[]detector` slice, all derived lists auto-update
- **Functional options API**: `NewFilter(WithFilterOptions(FilterAll), WithFS(fsys), ...)`
- **FilterPaths + FilterPathsContext**: Batch methods with cancellation support (added in `b6a3a8f`)
- **Phantom types**: `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`
- **Branded errors**: `[gogenfilter:<code>]` prefix, sentinel errors, `ErrorCoder`/`Helper` interfaces, `CodeEqual[T]` generic
- **`fs.FS` abstraction**: testable via `fstest.MapFS`
- **Thread-safe metrics**: `FilteredFiles()`, `FilteredBy()` accessors
- **Pattern matching**: `**` glob via `doublestar/v4`, include/exclude patterns

### Test Suite

- **98.9% statement coverage** (up from 99.5% threshold in CI — 98% gate)
- **175 BDD specs** (ginkgo/gomega): `bdd_test.go` (110) + `bdd_extended_test.go` (65)
- **Coverage gap tests**: `coverage_test.go` for hard-to-reach error paths
- **Property-based tests**: `property_test.go`
- **Fuzz tests**: `fuzz_test.go`
- **Integration tests**: `integration_test.go`
- **Benchmarks**: 24 benchmarks in `bench_test.go` + `errors_bench_test.go`
- **Race detector clean**: `go test -race ./...` passes

### CI Workflow Fixes (This Session)

| Fix                           | Before                                                     | After                                           | Commit    |
| ----------------------------- | ---------------------------------------------------------- | ----------------------------------------------- | --------- |
| Website checkout paths        | `path:` outside `with:` → workspace overwritten            | `path:` inside `with:` → correct subdirectories | `deb4d61` |
| Benchmark gh-pages            | No branch → `fatal: couldn't find remote ref`              | Created orphan `gh-pages` with `dev/bench/`     | `deb4d61` |
| Lighthouse budgets+assertions | LHCI v12 rejects both simultaneously                       | Removed `budgetPath` input, kept assertions     | `deb4d61` |
| Node.js 20 deprecation        | `actions/setup-go@v5` on Node 20                           | Updated to `@v6` (Node 24) across all workflows | `deb4d61` |
| Stale budget.json triggers    | Both lighthouse.yml + website.yml triggered on unused file | Removed from path filters                       | `deb4d61` |

### Post-Fix CI Results (verified live)

- **CI (test+lint)**: ✅ PASSING (commit `deb4d61` triggered, green)
- **Benchmark**: ✅ PASSING (gh-pages fetch works, benchmark data pushed)
- **gh-pages**: ✅ LIVE (benchmark dashboard available at `https://larsartmann.github.io/gogenfilter/`)

---

## b) PARTIALLY DONE

### Website CI — `actions/checkout` for private repos

**Status**: Path fix deployed, but a **deeper issue** surfaced.

The `path:` fix was correct and necessary, but the real blocker is:

```
Not Found - https://docs.github.com/rest/repos/repos#get-a-repository
```

`actions/checkout` uses the default `GITHUB_TOKEN` which is scoped to the **current repository only**. It cannot access `LarsArtmann/md-go-validator` or `LarsArtmann/go-output` (both private repos). The checkout fails at "Determining the default branch" because the GitHub API returns 404 for private repos without proper authentication.

**What's needed**: A Personal Access Token (PAT) or GitHub App token with `repo` scope for the `LarsArtmann` org, stored as a repository secret (e.g., `PAT_TOKEN`), then passed to the checkout steps:

```yaml
- uses: actions/checkout@v6
  with:
    repository: LarsArtmann/md-go-validator
    path: md-go-validator
    token: ${{ secrets.PAT_TOKEN }}
```

### Lighthouse CI — Assertion failures

**Status**: Config error fixed (`budgetPath` removed), but **accessibility assertions now fail**.

The assertions in `lighthouserc.json` are correctly configured but the **live website** has real issues:

| URL                | Failures                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `/` (root)         | `color-contrast` (score 0 vs ≥0.9), `label-content-name-mismatch` (0 vs ≥0.9), `network-dependency-tree-insight` (0 vs ≥0.9) |
| `/docs`            | `document-latency-insight` (0.5 vs ≥0.9), `redirects` (0 vs ≥0.9)                                                            |
| `/docs/api/filter` | `network-dependency-tree-insight` (0 vs ≥0.9)                                                                                |
| `/docs/changelog`  | `network-dependency-tree-insight` (0 vs ≥0.9)                                                                                |

These are **real website issues**, not config problems. The Lighthouse CI is working correctly now — it's detecting actual accessibility and performance problems.

Also: `LHCI_GITHUB_APP_TOKEN` secret is not configured, so GitHub status checks are skipped.

---

## c) NOT STARTED

1. **PAT token for cross-repo checkout** — needs manual secret creation by repo owner
2. **LHCI GitHub App installation** — needs manual setup by repo owner
3. **Website accessibility fixes** — color contrast, label-content-name-mismatch on landing page
4. **Website performance fixes** — render-blocking resources, network dependency tree
5. **docs/redirects for `/docs`** — `/docs` has redirect chain causing latency
6. **WebP image conversion** — `uses-webp-images` warning on all pages
7. **`budget.json` cleanup** — file still exists in repo root but is no longer referenced; could be deleted
8. **Dependabot for GitHub Actions** — `actions/setup-go` was on v5 until this session; no auto-update for action versions
9. **Lighthouse assertion tuning** — current thresholds are permissive; could tighten as baselines are established
10. **Coverage push to Codecov/Coveralls** — no coverage visualization service configured

---

## d) TOTALLY FUCKED UP

### Website CI — 20+ Consecutive Failures

Every single website workflow run since at least `2026-05-04T11:11` has failed. The root cause was **TWO compounding bugs**:

1. **Original bug** (pre-this-session): `path:` parameter was outside `with:` block, causing `actions/checkout` to ignore it and overwrite the workspace root with `md-go-validator` or `go-output` content. The `website/` directory would disappear, and every subsequent step would fail.

2. **Deeper bug** (revealed after fix): Even with `path:` correctly placed, `GITHUB_TOKEN` cannot access private repos in other repositories. This means the website workflow was **never working** for cross-repo checkouts — unless the repos were previously public, or a PAT was configured and later removed.

**Impact**: The website has not been deployed via CI since this regression. Manual deploys may have been used.

**Severity**: HIGH — the deploy pipeline is completely broken.

### What We Fixed vs What We Didn't

| Issue                   | Fixed? | Why Not                                   |
| ----------------------- | ------ | ----------------------------------------- |
| `path:` outside `with:` | ✅ Yes | Code fix, committed                       |
| No `gh-pages` branch    | ✅ Yes | Branch created, pushed                    |
| LHCI budgets+assertions | ✅ Yes | Config fix, committed                     |
| Node.js 20 deprecation  | ✅ Yes | Action version bump, committed            |
| Private repo access     | ❌ No  | Requires PAT secret (manual owner action) |
| Accessibility failures  | ❌ No  | Real website code issues                  |
| LHCI GitHub token       | ❌ No  | Requires secret (manual owner action)     |

---

## e) WHAT WE SHOULD IMPROVE

### Critical

1. **PAT token for cross-repo checkouts** — Without this, website CI will never pass. Create a fine-grained PAT with `contents:read` on `LarsArtmann/md-go-validator` and `LarsArtmann/go-output`, store as `PRIVATE_REPO_TOKEN` secret.
2. **Website accessibility audit** — `color-contrast` scoring 0 on root page means there are elements with invisible/unreadable text. This is a fundamental usability issue.
3. **Lighthouse GitHub App token** — Without `LHCI_GITHUB_APP_TOKEN`, status checks are skipped, removing the enforcement mechanism.

### Important

4. **Delete `budget.json`** — No longer referenced by any workflow. Dead file confusing future contributors.
5. **Dependabot for Actions** — Pin action versions with SHA hashes AND use Dependabot to auto-update. Prevents manual version tracking like the v5→v6 migration.
6. **Coverage reporting service** — Connect Codecov or similar for visual coverage tracking over time.
7. **Website performance audit** — Render-blocking resources and network dependency tree issues across all pages.

### Nice to Have

8. **Benchmark alert thresholds** — Current 150%/300% is generous. Tighten as baselines establish.
9. **E2E website tests** — No automated tests verify the built website actually works (link checking, visual regression).
10. **API documentation generation** — Consider `go doc`→markdown pipeline for always-current API docs.

---

## f) Top #25 Things to Do Next

| #   | Priority | Task                                                                                            | Effort | Impact                   |
| --- | -------- | ----------------------------------------------------------------------------------------------- | ------ | ------------------------ |
| 1   | P0       | Create PAT token with repo access for cross-repo checkouts → add as `PRIVATE_REPO_TOKEN` secret | 5min   | Unblocks website CI      |
| 2   | P0       | Add `token: ${{ secrets.PRIVATE_REPO_TOKEN }}` to md-go-validator and go-output checkout steps  | 2min   | Unblocks website CI      |
| 3   | P0       | Fix color-contrast accessibility issue on landing page (Hero section likely)                    | 30min  | Lighthouse pass          |
| 4   | P0       | Fix label-content-name-mismatch on landing page (buttons/links)                                 | 15min  | Lighthouse pass          |
| 5   | P1       | Install Lighthouse CI GitHub App, add `LHCI_GITHUB_APP_TOKEN` secret                            | 10min  | Status check enforcement |
| 6   | P1       | Delete `budget.json` from repo root (dead file)                                                 | 1min   | Cleanup                  |
| 7   | P1       | Fix `/docs` redirect chain (likely Firebase hosting config)                                     | 15min  | Performance              |
| 8   | P1       | Optimize render-blocking resources (defer/async scripts)                                        | 30min  | Performance              |
| 9   | P1       | Convert images to WebP format                                                                   | 20min  | Lighthouse warnings gone |
| 10  | P2       | Add Dependabot config for GitHub Actions version updates                                        | 10min  | Auto-updates             |
| 11  | P2       | Pin all action versions to SHA hashes for supply-chain security                                 | 15min  | Security                 |
| 12  | P2       | Add `workflow_dispatch` to website.yml and benchmark.yml for manual triggers                    | 2min   | Operability              |
| 13  | P2       | Tighten Lighthouse assertion thresholds after accessibility fixes                               | 10min  | Quality gate             |
| 14  | P2       | Add link-checker step to website CI (broken link detection)                                     | 20min  | Docs quality             |
| 15  | P2       | Connect Codecov or Coveralls for coverage visualization                                         | 15min  | Visibility               |
| 16  | P3       | Add visual regression testing for website (Playwright/puppeteer)                                | 2hr    | UI quality               |
| 17  | P3       | Generate API docs from Go source (godoc→md pipeline)                                            | 3hr    | Docs freshness           |
| 18  | P3       | Add `FilterWithContext` method for single-file cancellation support                             | 30min  | API completeness         |
| 19  | P3       | Add example tests for `FilterPaths` and `FilterPathsContext`                                    | 15min  | Docs                     |
| 20  | P3       | Benchmark dashboard: add trend comparison between commits                                       | 1hr    | Observability            |
| 21  | P3       | Add CHANGELOG entries for v0.x releases                                                         | 30min  | Release readiness        |
| 22  | P4       | Consider Renovate over Dependabot for more flexible updates                                     | 30min  | Dependency management    |
| 23  | P4       | Add `goreleaser` config for automated releases                                                  | 1hr    | Release automation       |
| 24  | P4       | Migrate `justfile` remnants (if any) to documented make targets or remove                       | 15min  | Cleanup                  |
| 25  | P4       | Add contributing guide for new generator detectors (step-by-step)                               | 30min  | Onboarding               |

---

## g) Top #1 Question I Cannot Figure Out Myself

**Was the website CI ever actually working with the cross-repo checkouts?**

The `path:` was outside `with:` (a clear bug that would break checkout placement), AND the `GITHUB_TOKEN` cannot access private repos in other repositories. This means one of:

1. **The repos were previously public** and later made private (breaking CI)
2. **A PAT was previously configured** as a secret and later removed
3. **The website workflow was never tested** after adding the cross-repo checkout steps
4. **The workflow was passing by coincidence** (e.g., the `path` bug didn't matter because the later steps happened to work with the wrong checkout)

This matters because it affects whether adding a PAT will actually fix everything, or if there are more latent issues we haven't seen yet (the workflow has never successfully run with the current code).

---

## CI Dashboard (Live as of 2026-05-04 16:45 UTC)

```
CI (test+lint)      ✅ PASSING  — 99.5% coverage, 0 lint issues, race clean
Benchmark           ✅ PASSING  — gh-pages data push working
gh-pages deploy     ✅ PASSING  — Benchmark dashboard live
Website             ❌ FAILING  — Private repo checkout 404 (needs PAT)
Lighthouse CI       ❌ FAILING  — Accessibility assertions failing (real website issues)
```

## Key Metrics

| Metric              | Value                 |
| ------------------- | --------------------- |
| Go version          | 1.26.2                |
| Coverage            | 98.9%                 |
| Linter issues       | 0                     |
| BDD specs           | 175                   |
| Benchmark count     | 24                    |
| Source files        | 22 `.go` files        |
| Total lines         | 9,066                 |
| Dependencies        | 4 direct, 16 indirect |
| Website pages       | 19                    |
| Generator detectors | 11                    |

---

_Report generated by Crush (GLM-5.1) on 2026-05-04 at 16:47._
