# gogenfilter — Comprehensive Status Report

**Date:** 2026-06-01 13:27
**Last commit:** `63f00cf` — 2026-05-27 09:24 (5 days ago)
**Last activity:** Nix flake updates, gitignore filtering research doc, Code of Conduct
**Branch:** master (clean)
**Tags:** v3.0.2 (latest)

---

## a) FULLY DONE

### Core Library — Production-Ready

| Component      | Lines | Coverage | Status                                                                            |
| -------------- | ----- | -------- | --------------------------------------------------------------------------------- |
| `detection.go` | 480   | 100%     | 11 detectors, table-driven, trace/non-trace unified                               |
| `filter.go`    | 335   | 100%     | Functional options API, immutable Filter, `Filter`/`FilterDetailed`/`FilterPaths` |
| `types.go`     | 158   | 100%     | 12 FilterOptions, 14 FilterReasons, FilterResult struct                           |
| `errors.go`    | 179   | 100%     | Branded errors, 8 codes, 8 sentinels, `ErrorCoder` interface                      |
| `pattern.go`   | 39    | 100%     | `**` glob matching via doublestar/v4                                              |
| `sqlc.go`      | 412   | 100%     | Config discovery (v1+v2), output dir extraction, OS + fs.FS variants              |
| `project.go`   | 52    | 93%      | Project root discovery (only `filepath.Abs` error path untested)                  |

**Test suite:** 44 Go files (22 source + 22 test), 8,435 total lines (6,780 test), 99.8% coverage, 160 ginkgo specs passing, all benchmarks green.

### CI/CD — 4 Workflows, All Functional

| Workflow                      | Status  | Details                                                         |
| ----------------------------- | ------- | --------------------------------------------------------------- |
| Go CI (`ci.yml`)              | GREEN   | Test, vet, lint, race, coverage (98% threshold), govulncheck    |
| Benchmark (`benchmark.yml`)   | GREEN   | Pushes to `gh-pages`, 150% alert / 300% fail thresholds         |
| Website (`website.yml`)       | GREEN   | Typecheck, build, HTML validation, dedup check, Firebase deploy |
| Lighthouse (`lighthouse.yml`) | PARTIAL | Config exists, `LHCI_GITHUB_APP_TOKEN` not configured           |

### Website — Deployed & Functional

- Astro v6 + Starlight, Firebase Hosting
- Landing page, docs with PageFind search, OG images
- Lighthouse accessibility fixes applied (b784c7c)
- gitignore pre-filtering guide published

### Infrastructure

- `flake.nix` — fileset-based src, govulncheck in devShell, treefmt
- `website/flake.nix` — Node.js environment
- Dependabot — weekly updates (Go, npm, GitHub Actions)
- Code of Conduct added

### Documentation

- `CHANGELOG.md` — v3.0.0 through v3.0.2, comprehensive
- `FEATURES.md` — Honest inventory, 100% FULLY_FUNCTIONAL (except Lighthouse CI)
- `docs/DOMAIN_LANGUAGE.md` — DDD ubiquitous language
- `AGENTS.md` — Comprehensive AI session context

---

## b) PARTIALLY DONE

| Item                   | Status      | What's Missing                                                                                                                                                             |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lighthouse CI          | Config only | `LHCI_GITHUB_APP_TOKEN` secret not set → GitHub status checks skipped. Accessibility assertions still fail on live site (`color-contrast`, `label-content-name-mismatch`). |
| Lint (`golangci-lint`) | 1 issue     | `goconst` flagging a 3x-repeated SQLC codegen string literal in `example_test.go:200`. Non-blocking but should be fixed.                                                   |
| Dependabot alerts      | 1 open      | `devalue` npm package (Svelte transitive dep) — high severity DoS via sparse array. Override exists at 5.8.1 but alert may persist.                                        |

---

## c) NOT STARTED

| Item                               | Priority | Notes                                                                                                       |
| ---------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `TODO_LIST.md`                     | —        | Does not exist. Should be created.                                                                          |
| `ROADMAP.md`                       | —        | Does not exist. Should be created.                                                                          |
| Context methods for SQLC functions | LOW      | Previously discussed and rejected — `filepath.WalkDir`/`fs.WalkDir` don't accept context. Would be theater. |
| `iter.Seq2`-based walking API      | LOW      | Future Go idiom for cancellable directory traversal. Wait for ecosystem adoption.                           |
| Website OG image generation        | —        | `website/src/pages/og/[...slug].ts` exists but requires Svelte runtime dependency.                          |
| Go module docs (pkg.go.dev)        | —        | Module is published but pkg.go.dev refresh could be triggered.                                              |
| Version auto-bumping               | —        | Manual version management in `CHANGELOG.md`, `go.mod`, tags.                                                |

---

## d) TOTALLY FUCKED UP / KNOWN ISSUES

| Issue                         | Severity    | Details                                                                                                                                          |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`goconst` lint failure**    | LOW         | `example_test.go:200` — SQLC codegen comment string repeated 3x. One-liner fix: extract to constant or use `//nolint:goconst`.                   |
| **Dependabot devalue alert**  | LOW         | Svelte `devalue` transitive dep. Override pinned at 5.8.1 in `package.json`. Alert may be stale or on a different dep path.                      |
| **Lighthouse CI token**       | MEDIUM      | Without `LHCI_GITHUB_APP_TOKEN`, the entire Lighthouse workflow is a no-op. Nobody has configured the GitHub App.                                |
| **Website `npm` not in PATH** | OPERATIONAL | Local nix dev environment doesn't expose `npm` globally — must use `nix develop` or `nix run .#website-dev`. Not a bug, just an env setup issue. |
| **5 days since last commit**  | OBSERVATION | No activity since 2026-05-27. Project appears stable but dormant.                                                                                |

---

## e) WHAT WE SHOULD IMPROVE

### High Impact

1. **Fix the `goconst` lint failure** — 2-minute fix, CI is technically failing
2. **Create `TODO_LIST.md`** — No structured task tracking exists. Every session starts from AGENTS.md + manual scanning.
3. **Create `ROADMAP.md`** — No long-term vision documented. Ideas float in planning docs but have no home.
4. **Configure Lighthouse CI properly** — Either set up the GitHub App token or remove the workflow to stop pretending it works.

### Medium Impact

5. **Resolve Dependabot `devalue` alert** — Verify the override is effective or update to a version that fixes the CVE.
6. **Website audit pass** — Accessibility assertions fail on live site. The `b784c7c` fix was for the build; runtime issues may remain.
7. **`FindProjectRoot` coverage gap** — 93% is the only function below 100%. The `filepath.Abs` error path is untestable but could be documented as an accepted gap.
8. **API examples in README** — README shows basic usage but doesn't cover `FilterDetailed`, `FilterPaths`, or `FilterReasons()`.

### Low Impact / Polish

9. **`art-dupl` in CI** — Uses `npm install` override for broken v4 `formats-exts`. Could pin a fixed version or contribute upstream.
10. **Website `og/[...slug].ts`** — OG image endpoint exists but may not work without Svelte runtime.
11. **Release automation** — Tag-based release workflow exists but version bumping is manual.

---

## f) Top 25 Things We Should Get Done Next

### Immediate (Do Now)

| #   | Task                                            | Effort | Impact            |
| --- | ----------------------------------------------- | ------ | ----------------- |
| 1   | Fix `goconst` lint failure in `example_test.go` | 2m     | CI green          |
| 2   | Create `TODO_LIST.md` from this report          | 15m    | Project tracking  |
| 3   | Create `ROADMAP.md` — long-term vision          | 15m    | Strategic clarity |
| 4   | Resolve or close Dependabot `devalue` alert     | 5m     | Security hygiene  |

### Short Term (This Week)

| #   | Task                                                                                                  | Effort | Impact                |
| --- | ----------------------------------------------------------------------------------------------------- | ------ | --------------------- |
| 5   | Configure `LHCI_GITHUB_APP_TOKEN` or remove Lighthouse workflow                                       | 10m    | CI honesty            |
| 6   | Fix Lighthouse accessibility failures on live site                                                    | 30m    | UX / SEO              |
| 7   | Update README with `FilterDetailed` / `FilterPaths` / `FilterReasons()` examples                      | 15m    | Developer experience  |
| 8   | Add `example_test.go` runnable examples for all public APIs                                           | 30m    | pkg.go.dev quality    |
| 9   | Audit website docs for stale references                                                               | 15m    | Documentation quality |
| 10  | Add `testdata/` fixtures for edge-case generators (e.g., `// Code generated` with unusual formatting) | 20m    | Robustness            |

### Medium Term (This Month)

| #   | Task                                                                                    | Effort | Impact               |
| --- | --------------------------------------------------------------------------------------- | ------ | -------------------- |
| 11  | Investigate `iter.Seq2`-based directory walking API (Go 1.26+)                          | 2h     | Future-proofing      |
| 12  | Add version auto-bumping (CHANGELOG, go.mod, tag) via CI                                | 1h     | Release automation   |
| 13  | Website performance audit — tighten Lighthouse assertions                               | 30m    | Performance          |
| 14  | Add Go doc comments audit — ensure all exported symbols have examples                   | 1h     | API documentation    |
| 15  | Review and potentially reduce golangci-lint config — 50+ linters is heavy               | 30m    | CI speed             |
| 16  | Add `CONTRIBUTING.md` content (file exists in website docs but not root)                | 20m    | Community            |
| 17  | Evaluate `go-faster/yaml` → `sigs.k8s.io/yaml` or stdlib `json` for SQLC config parsing | 1h     | Dependency reduction |

### Long Term (Backlog)

| #   | Task                                                                        | Effort | Impact                 |
| --- | --------------------------------------------------------------------------- | ------ | ---------------------- |
| 18  | Consider `fs.WalkDir` → `os.ReadDir`+recursive for real cancellable walking | 4h     | Production safety      |
| 19  | Add plugin/extension system for custom detectors                            | 4h     | Extensibility          |
| 20  | Benchmark against large monorepos (10k+ files)                              | 2h     | Performance validation |
| 21  | Add OpenTelemetry tracing for detection pipeline                            | 2h     | Observability          |
| 22  | Investigate WASM compilation for browser-based detection                    | 4h     | New platform           |
| 23  | Add `golangci-lint` custom plugin for gogenfilter-specific checks           | 4h     | Ecosystem              |
| 24  | Write blog post / announcement for v3 release                               | 2h     | Marketing              |
| 25  | Evaluate Go `iter` package for lazy detection pipelines                     | 2h     | API modernization      |

---

## g) Top #1 Question I Cannot Figure Out Myself

**What is the actual long-term vision for this library?**

The codebase is in excellent shape — 99.8% coverage, clean architecture, comprehensive CI. But there's no `ROADMAP.md`, no GitHub issues, no open PRs, and no activity for 5 days. The library does exactly what it says on the tin.

The critical question: **Is gogenfilter "done" — a complete, stable library that needs only maintenance?** Or is there a v4 vision (plugin system, WASM, integration with `golangci-lint` as a custom linter, etc.) that should be planned?

This fundamentally changes the priority of everything above. If "done," tasks 1-4 are all that matters. If "growing," the medium/long-term items become the real work.

---

## Health Summary

| Metric            | Value                    | Status    |
| ----------------- | ------------------------ | --------- |
| Tests             | 160 pass, 0 fail, 0 skip | GREEN     |
| Coverage          | 99.8%                    | EXCELLENT |
| Race detector     | Clean                    | GREEN     |
| Benchmarks        | All pass                 | GREEN     |
| `go vet`          | Clean                    | GREEN     |
| `golangci-lint`   | 1 issue (`goconst`)      | YELLOW    |
| Dependabot alerts | 1 open (npm transitive)  | LOW RISK  |
| Open issues       | 0                        | —         |
| Open PRs          | 0                        | —         |
| Last commit       | 5 days ago               | STABLE    |
| Latest tag        | `v3.0.2`                 | CURRENT   |

**Overall: HEALTHY & STABLE.** The library is production-ready with excellent test coverage and clean architecture. Minor lint issue and missing project tracking docs are the only immediate gaps.
