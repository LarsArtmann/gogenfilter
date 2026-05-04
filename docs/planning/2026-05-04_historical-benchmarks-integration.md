# Integration Plan: Historical Go Benchmarks with `github-action-benchmark`

**Date:** 2026-05-04
**Status:** Ready to Execute
**Tool:** [`benchmark-action/github-action-benchmark@v1`](https://github.com/benchmark-action/github-action-benchmark) (1.2k stars)
**Cost:** Free (public repo, GitHub Pages free tier, unlimited bandwidth)

---

## Current State

| Item            | Detail                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Benchmarks      | 17 across `bench_test.go` and `errors_bench_test.go`                   |
| CI step         | `go test -bench=. -benchmem -count=1 ./...` — **output discarded**     |
| Website         | Astro + Starlight, deployed to Firebase at `gogenfilter.lars.software` |
| Docs page       | `docs/guides/benchmarks.mdx` — static numbers, manually updated        |
| gh-pages branch | **Does not exist yet**                                                 |
| Repo            | `github.com/LarsArtmann/gogenfilter`                                   |

---

## Architecture Decision: Separate Workflow + gh-pages

**Create `.github/workflows/benchmark.yml`** — do NOT modify existing CI beyond removing the redundant benchmark step.

### Why Separate Workflow

| Factor            | Separate Workflow                          | Modify Existing CI                  |
| ----------------- | ------------------------------------------ | ----------------------------------- |
| Benchmark noise   | Isolated from test pipeline                | Adds flakiness to critical path     |
| Concurrency       | Independent controls                       | Shares concurrency group with tests |
| Permissions       | `contents: write` scoped to benchmark only | Escalates permissions for all jobs  |
| Failure isolation | Benchmark failure ≠ test failure           | One fails, whole job fails          |

### Why gh-pages (not embedded in Astro)

| Factor       | gh-pages                                               | Embed in Astro                               |
| ------------ | ------------------------------------------------------ | -------------------------------------------- |
| Effort       | 30 min                                                 | 8-10 hours (custom chart.js + React wrapper) |
| Dashboard    | Pre-built, feature-complete                            | Must build from scratch                      |
| PR feedback  | Built-in `comment-on-alert` + `comment-always`         | Lost — only works in gh-pages mode           |
| Maintenance  | Zero                                                   | Ongoing                                      |
| Domain split | `larsartmann.github.io` vs `gogenfilter.lars.software` | Unified                                      |

The domain split is cosmetic — users click a link from the docs page. Not worth 8-10 hours of custom work.

---

## Execution Plan

### Phase 1: Infrastructure Setup (one-time, manual)

#### Step 1.1 — Create `gh-pages` branch

```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "chore: initialize gh-pages for benchmark dashboard"
git push origin gh-pages:gh-pages
git checkout master
```

#### Step 1.2 — Enable GitHub Pages

1. Go to **Settings → Pages** in the GitHub repo
2. Set **Source** to "Deploy from a branch"
3. Select branch `gh-pages`, root `/`
4. Save — wait for initial deployment

#### Step 1.3 — Verify

Confirm `https://larsartmann.github.io/gogenfilter/` returns something (even a 404 means Pages is active).

**Dashboard URL:** `https://larsartmann.github.io/gogenfilter/dev/bench/`

---

### Phase 2: Create Benchmark Workflow

#### Step 2.1 — Create `.github/workflows/benchmark.yml`

```yaml
name: Benchmark

on:
  push:
    branches: [master]
    paths:
      - "**.go"
      - go.mod
      - go.sum
      - .github/workflows/benchmark.yml
  pull_request:
    branches: [master]
    paths:
      - "**.go"
      - go.mod
      - go.sum
      - .github/workflows/benchmark.yml

permissions:
  contents: write
  deployments: write

concurrency:
  group: benchmark-${{ github.ref }}
  cancel-in-progress: true

jobs:
  benchmark:
    name: Run Benchmarks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-go@v5
        with:
          go-version: "1.26"

      - run: go mod download

      - name: Run benchmarks
        run: go test -bench=. -benchmem -count=1 ./... | tee benchmark-output.txt

      - name: Store benchmark result
        uses: benchmark-action/github-action-benchmark@v1
        with:
          name: gogenfilter
          tool: "go"
          output-file-path: benchmark-output.txt
          github-token: ${{ secrets.GITHUB_TOKEN }}
          auto-push: ${{ github.event_name == 'push' }}
          alert-threshold: "150%"
          fail-threshold: "300%"
          comment-on-alert: true
          comment-always: true
          summary-always: true
          fail-on-alert: false
          max-items-in-chart: 100
```

#### Step 2.2 — Design decisions

| Decision                                   | Choice                        | Why                                                                         |
| ------------------------------------------ | ----------------------------- | --------------------------------------------------------------------------- |
| Separate workflow file                     | `benchmark.yml`               | Isolates failures, independent permissions                                  |
| `auto-push` conditional                    | `github.event_name == 'push'` | Only master commits update dashboard; PRs get comparison only               |
| `alert-threshold: 150%`                    | Flag at 50% degradation       | Sensitive enough to catch real regressions                                  |
| `fail-threshold: 300%`                     | Catastrophic ceiling          | 3x worse = something is very wrong; alerts even with `fail-on-alert: false` |
| `fail-on-alert: false`                     | Don't block CI on regression  | CI variance is 10-20%; blocking would cause false positives                 |
| `comment-on-alert: true`                   | Notify on regressions         | PRs get comments when performance degrades >150%                            |
| `comment-always: true`                     | Every PR sees benchmark diff  | Performance visibility on every change, not just regressions                |
| `summary-always: true`                     | Job summary in every run      | Developers see benchmark comparison in Actions tab                          |
| `max-items-in-chart: 100`                  | Keep last 100 data points     | ~3 months of commits; prevents chart clutter                                |
| `count=1`                                  | Single benchmark run          | Standard for CI; use `benchstat` locally with `count=5+` when debugging     |
| `.github/workflows/benchmark.yml` in paths | Self-referential trigger      | Editing the workflow itself triggers validation                             |

---

### Phase 3: Remove Redundant CI Benchmark Step

#### Step 3.1 — Remove from `.github/workflows/ci.yml`

Remove lines 62-63:

```yaml
- name: Benchmarks
  run: go test -bench=. -benchmem -count=1 ./...
```

Now redundant — `benchmark.yml` handles it with full tracking.

---

### Phase 4: Update Docs

#### Step 4.1 — Update `website/src/content/docs/docs/guides/benchmarks.mdx`

Add after the "Reproducing" section:

```mdx
## Live Dashboard

Historical benchmark trends are tracked automatically on every push to master:

**[View Live Benchmark Dashboard](https://larsartmann.github.io/gogenfilter/dev/bench/)**

The dashboard shows:

- Time-series charts for all 17 benchmarks
- Commit-level granularity with tooltips showing commit messages
- Automatic regression highlighting when performance degrades >150%

Results above are a point-in-time snapshot (Go 1.24, AMD Ryzen AI MAX+ 395).
The dashboard provides continuous, hardware-consistent tracking from CI.
```

#### Step 4.2 — No sidebar changes needed

The "Benchmarks" guide already exists in the sidebar at `docs/guides/benchmarks`.

---

### Phase 5: Verify

After the first push to master:

- [ ] **Workflow runs** — Check Actions tab for "Benchmark" workflow
- [ ] **Dashboard deploys** — Visit `https://larsartmann.github.io/gogenfilter/dev/bench/`
- [ ] **Charts render** — All 17 benchmarks appear with data points
- [ ] **CI still passes** — Test/lint jobs unaffected
- [ ] **Old step removed** — CI no longer runs fire-and-forget benchmarks

After opening a test PR:

- [ ] **PR gets benchmark comment** — `comment-always` shows diff
- [ ] **Job summary visible** — Benchmark comparison in Actions summary
- [ ] **Dashboard NOT updated by PR** — `auto-push` only on push events

---

## Security

| Concern                      | Mitigation                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `contents: write` permission | Scoped to `benchmark.yml` only; CI keeps `contents: read`                      |
| `GITHUB_TOKEN` scope         | Default token — can push to `gh-pages`, not `master`                           |
| Branch protection            | `gh-pages` has no rules (by design — auto-push needs write access)             |
| No secrets                   | Uses default `GITHUB_TOKEN`, no custom PAT needed                              |
| Fork PRs                     | `comment-always`/`comment-on-alert` silently fail (read-only token from forks) |

---

## Rollback

1. **Disable** — Delete `benchmark.yml` or add `if: false` to the job
2. **Restore CI step** — Re-add the removed benchmark step in `ci.yml`
3. **Dashboard stays** — `gh-pages` keeps historical data; no harm in leaving it
4. **Clean slate** — Delete and recreate `gh-pages` branch to reset data

---

## Future Enhancements (out of scope)

| Enhancement                                           | When                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| `benchstat` for local A/B analysis                    | When debugging a regression                                  |
| Hybrid Firebase deployment (embed dashboard in Astro) | If domain split becomes a real problem (~2 hour migration)   |
| Separate benchmark data repo                          | If repo size becomes a concern                               |
| `go-force-package-suffix: true`                       | If multi-package in future (not needed — single package now) |
| Self-hosted runner                                    | If CI precision becomes critical                             |

---

## Summary

| Phase     | What                                    | Effort      |
| --------- | --------------------------------------- | ----------- |
| 1         | Create `gh-pages` branch + enable Pages | 5 min       |
| 2         | Create `benchmark.yml` workflow         | 10 min      |
| 3         | Remove redundant CI benchmark step      | 1 min       |
| 4         | Update docs with dashboard link         | 5 min       |
| 5         | End-to-end verification                 | 10 min      |
| **Total** |                                         | **~30 min** |
