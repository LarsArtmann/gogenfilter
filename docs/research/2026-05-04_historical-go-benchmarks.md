# Historical Go Benchmark Tracking — Research

**Date:** 2026-05-04

## Context

gogenfilter has 17 benchmarks across `bench_test.go` and `errors_bench_test.go`. CI runs them (`.github/workflows/ci.yml:44`) but **discards the results**. This research evaluates open-source tools for tracking historical benchmark data with GitHub Actions integration.

---

## Tool Comparison

### 1. `github-action-benchmark` — Recommended

| Aspect         | Detail                                                       |
| -------------- | ------------------------------------------------------------ |
| Repo           | `benchmark-action/github-action-benchmark`                   |
| Stars          | 1.2k                                                         |
| Language       | Multi-language (Go, Rust, JS, Python, C++, etc.)             |
| Visualization  | Interactive charts on GitHub Pages                           |
| Regression     | Configurable thresholds (`alert-threshold`, `fail-on-alert`) |
| PR integration | Commit comments on regressions, job summaries                |
| Data storage   | `gh-pages` branch, `actions/cache`, or external JSON         |

### 2. `gobenchdata`

| Aspect        | Detail                             |
| ------------- | ---------------------------------- |
| Repo          | `bobheadxi/gobenchdata`            |
| Stars         | 153                                |
| Language      | Go-specific                        |
| Visualization | Built-in web app with Chart.js     |
| Regression    | PR checks with thresholds          |
| Data storage  | `gh-pages` branch or separate repo |

### 3. `benchstat` (complementary)

- Not a continuous tracking tool — it's a **statistical comparison** CLI (`golang.org/x/perf/cmd/benchstat`)
- Best paired _alongside_ one of the above for local A/B analysis
- Provides median, 95% CI, p-values

---

## Recommendation

**Use `github-action-benchmark`** — most mature, actively maintained, cleanest integration.

### Integration Plan

1. **CI workflow** — Replace the current fire-and-forget benchmark step with `benchmark-action/github-action-benchmark@v1`
2. **Data storage** — Use a `gh-pages` branch for the benchmark dashboard (separate from Firebase-hosted docs)
3. **Docs integration** — Link to the benchmark dashboard from Astro/Starlight docs (e.g., a "Performance" page)
4. **Regression detection** — Set `alert-threshold: '150%'` and `comment-on-alert: true` to catch regressions on PRs

### Example Workflow

```yaml
- name: Run benchmarks
  run: go test -bench=. -benchmem -count=1 ./... | tee benchmark-output.txt

- name: Store benchmark result
  uses: benchmark-action/github-action-benchmark@v1
  with:
    name: gogenfilter Benchmarks
    tool: "go"
    output-file-path: benchmark-output.txt
    github-token: ${{ secrets.GITHUB_TOKEN }}
    auto-push: true
    alert-threshold: "150%"
    comment-on-alert: true
    fail-on-alert: false
```

### What This Gives Us

- **Historical charts** at `https://<user>.github.io/gogenfilter/dev/bench/`
- **Regression alerts** on PRs
- **Zero maintenance** — fully automated in CI
