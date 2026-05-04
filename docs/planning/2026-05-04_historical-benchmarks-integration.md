# Integration Plan: Historical Go Benchmarks with `github-action-benchmark`

**Date:** 2026-05-04
**Status:** Planning
**Tool:** [`benchmark-action/github-action-benchmark@v1`](https://github.com/benchmark-action/github-action-benchmark) (1.2k stars)

---

## Current State

| Item            | Detail                                                                                  |
| --------------- | --------------------------------------------------------------------------------------- |
| Benchmarks      | 17 across `bench_test.go` and `errors_bench_test.go`                                    |
| CI step         | `go test -bench=. -benchmem -count=1 ./...` — **output discarded**                      |
| Website         | Astro + Starlight, deployed to Firebase at `gogenfilter.lars.software`                  |
| Docs page       | `docs/guides/benchmarks.mdx` — static numbers, manually updated                         |
| gh-pages branch | **Does not exist yet**                                                                  |
| Repo            | `github.com/LarsArtmann/gogenfilter`                                                    |
| CI path filters | `**.go`, `go.mod`, `go.sum`, `testdata/**`, `.golangci.yml`, `.github/workflows/ci.yml` |

---

## Architecture Decision: Separate Workflow

**Create `.github/workflows/benchmark.yml`** — do NOT modify the existing CI workflow.

### Rationale

| Factor            | Separate Workflow                     | Modify Existing CI                  |
| ----------------- | ------------------------------------- | ----------------------------------- |
| Benchmark noise   | Isolated — won't affect test pipeline | Adds flakiness to critical path     |
| Concurrency       | Independent controls                  | Shares concurrency group with tests |
| Permissions       | `contents: write` only where needed   | Escalates permissions for all jobs  |
| Toggle            | Can disable without touching CI       | Tangled with test job               |
| Failure isolation | Benchmark failure ≠ test failure      | One fails, whole job fails          |

---

## Execution Plan

### Phase 1: Infrastructure Setup (one-time)

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

**Dashboard URL after setup:** `https://larsartmann.github.io/gogenfilter/dev/bench/`

#### Step 1.3 — Verify GitHub Pages is active

Confirm `https://larsartmann.github.io/gogenfilter/` returns something (even a 404 page means Pages is active).

---

### Phase 2: Workflow File

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
  pull_request:
    branches: [master]
    paths:
      - "**.go"
      - go.mod
      - go.sum

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
          comment-on-alert: true
          fail-on-alert: false
          summary-always: true
          max-items-in-chart: 100
```

#### Step 2.2 — Key design decisions in this workflow

| Decision                  | Choice                        | Why                                                          |
| ------------------------- | ----------------------------- | ------------------------------------------------------------ |
| Separate workflow         | `benchmark.yml`               | Isolates benchmark failures from CI                          |
| `auto-push` conditional   | `github.event_name == 'push'` | Only master pushes update dashboard; PRs get comparison only |
| `fail-on-alert: false`    | Don't block on regression     | CI variance is ~10-20%; would cause false positives          |
| `comment-on-alert: true`  | Notify on regressions         | PRs get comments when performance degrades >150%             |
| `summary-always: true`    | Always show comparison        | Developers see benchmark diff in every run                   |
| `max-items-in-chart: 100` | Keep last 100 runs            | Prevents chart clutter; ~3 months of commits                 |
| `count=1`                 | Single benchmark run          | Standard for CI; `count=5+` for local benchstat analysis     |

---

### Phase 3: Remove Redundant CI Benchmark Step

#### Step 3.1 — Remove benchmark step from `.github/workflows/ci.yml`

Remove the existing fire-and-forget step (lines 62-63):

```yaml
- name: Benchmarks
  run: go test -bench=. -benchmem -count=1 ./...
```

This is now redundant — the dedicated `benchmark.yml` workflow handles it with proper tracking.

---

### Phase 4: Docs Integration

#### Step 4.1 — Update `website/src/content/docs/docs/guides/benchmarks.mdx`

Add a section linking to the live dashboard. Keep existing static numbers as "reference results" but make it clear they're a snapshot, not live data.

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

#### Step 4.2 — Add sidebar link (optional)

In `astro.config.mjs`, the "Benchmarks" guide already exists in the sidebar at `docs/guides/benchmarks`. No change needed — the dashboard link is inside the existing page.

---

### Phase 5: CI Path Filters Update

#### Step 5.1 — Add `benchmark.yml` to its own path triggers

The workflow already watches `**.go`, `go.mod`, `go.sum`. If benchmarks themselves change (e.g., new benchmark functions), the `**.go` glob already catches `*_test.go` files. No additional path filter needed.

#### Step 5.2 — Verify the CI workflow path filters

The existing `ci.yml` path filters don't need to change — we're only **removing** a step from it, not adding one.

---

### Phase 6: Verification Checklist

After merging, verify all of the following:

- [ ] **Workflow runs on push** — Check Actions tab for "Benchmark" workflow
- [ ] **Dashboard deploys** — Visit `https://larsartmann.github.io/gogenfilter/dev/bench/`
- [ ] **Charts render** — All 17 benchmarks appear with data points
- [ ] **PR comparison works** — Open a PR, check that benchmark summary appears
- [ ] **Alert threshold correct** — A >150% regression triggers a comment
- [ ] **CI still passes** — Test/lint jobs unaffected
- [ ] **Old benchmark step removed** — CI no longer runs fire-and-forget benchmarks

---

## Security Considerations

| Concern                      | Mitigation                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `contents: write` permission | Scoped to `benchmark.yml` only; CI workflow keeps `contents: read`            |
| `GITHUB_TOKEN` scope         | Default token — can only push to `gh-pages`, not `master`                     |
| Branch protection            | `gh-pages` has no protection rules (by design — auto-push needs write access) |
| No secrets exposure          | Uses default `GITHUB_TOKEN`, no custom PAT needed                             |

---

## Rollback Plan

If something goes wrong:

1. **Disable the workflow** — Delete `benchmark.yml` or add `if: false` to the job
2. **Re-add CI step** — Restore the removed benchmark step in `ci.yml`
3. **Dashboard remains** — `gh-pages` branch stays live; no harm in keeping historical data
4. **Clean slate** — To reset dashboard: delete and recreate `gh-pages` branch

---

## Future Enhancements (out of scope, but noted)

| Enhancement                           | Description                                                           | When                          |
| ------------------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| `benchstat` integration               | Run `count=5` locally, compare with `benchstat old.txt new.txt`       | When debugging regressions    |
| `go-force-package-suffix: true`       | Disambiguate benchmarks across packages (not needed — single package) | If multi-package in future    |
| Separate benchmark repo               | `LarsArtmann/gogenfilter-benchmarks` for isolated data                | If repo size becomes concern  |
| Custom alert thresholds per benchmark | Not supported by this action (single global threshold)                | Would need fork/custom action |
| Self-hosted runner                    | Eliminate CI variance (~10-20% on GitHub runners)                     | If precision becomes critical |

---

## Summary

| Phase     | What                                    | Effort      |
| --------- | --------------------------------------- | ----------- |
| 1         | Create `gh-pages` branch + enable Pages | 5 min       |
| 2         | Create `benchmark.yml` workflow         | 10 min      |
| 3         | Remove redundant CI benchmark step      | 1 min       |
| 4         | Update docs with dashboard link         | 5 min       |
| 5         | Path filter verification                | 1 min       |
| 6         | End-to-end verification                 | 10 min      |
| **Total** |                                         | **~30 min** |
