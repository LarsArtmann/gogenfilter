# Comprehensive Status Report — 2026-05-04 11:33

**Generated:** 2026-05-04 11:33 CEST  
**Scope:** gogenfilter (core + website) + md-go-validator integration  
**Since last report (10:28):** Fixed all code validation issues, fixed MDX build error, 0 skips achieved

---

## Executive Summary

| Area                        | Status                                                           | Grade  |
| --------------------------- | ---------------------------------------------------------------- | ------ |
| Core Library (Go)           | Production-ready, 32 source files, 23 test files, zero TODOs     | **A+** |
| Website (Astro + Starlight) | 19 pages, clean build, 40/40 code blocks valid                   | **A+** |
| md-go-validator Integration | CI + docs + validation fully wired                               | **A**  |
| CI/CD                       | Two separate workflows (Go + Website), path-filtered, concurrent | **A**  |

---

## A. FULLY DONE ✅

### Core Library (gogenfilter)

| Item                                      | Evidence                                                                                                       |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 32 Go source files (production)           | `find . -maxdepth 1 -name '*.go' \| wc -l` → 32                                                                |
| 23 test files                             | Unit, integration, BDD (Ginkgo), fuzz, property-based, benchmarks                                              |
| 14 testdata fixtures                      | 11 generators + 2 handwritten negatives + embed                                                                |
| 11 generator detectors + generic fallback | sqlc, templ, go-enum, protobuf, oapi-codegen, deepcopy-gen, wire, moq, mockgen, stringer, generic              |
| Two-phase detection                       | Filename first (zero I/O) → content only when needed                                                           |
| Functional options API                    | `Enabled()`, `Disabled()`, `WithFilterOptions()`, `WithFS()`, `WithIncludePatterns()`, `WithExcludePatterns()` |
| `fs.FS` abstraction                       | Works with `os.DirFS`, `fstest.MapFS`, `embed.FS`                                                              |
| Thread-safe metrics                       | `FilterStats` with `FilteredByReason` map                                                                      |
| SQLC config discovery                     | YAML/YML parsing, output dir extraction, walk with skip dirs                                                   |
| Glob pattern matching                     | `**` support via `doublestar`                                                                                  |
| Branded error types                       | 7 error codes, sentinel errors, `errors.As`/`errors.Is` chains                                                 |
| Phantom types                             | `StartPath`, `ConfigPath`, `Operation`, `ErrorMessage`, `TotalFilesChecked`                                    |
| `MustFilter`                              | Panic-on-error variant                                                                                         |
| `DetectReasonReader`                      | `io.Reader` detection                                                                                          |
| 70+ golangci-lint linters                 | Strict depguard (only 4 allowed deps)                                                                          |
| 95% coverage threshold                    | Enforced in CI                                                                                                 |
| Zero TODOs/FIXMEs in code                 | `grep -rn TODO\|FIXME --include='*.go'` → NONE                                                                 |
| CI: test + lint + benchmarks              | Separate from website, path-filtered, concurrent                                                               |
| Go examples                               | All major API functions have runnable examples                                                                 |

### Website (gogenfilter)

| Item                          | Evidence                                                      |
| ----------------------------- | ------------------------------------------------------------- |
| 19 HTML pages built           | Landing + 17 docs + 404                                       |
| 17 MDX documentation files    | Getting Started, Guides, API Reference, Generators, Community |
| 14 Astro components           | All well-structured, type-safe props                          |
| 40/40 code blocks valid       | `md-go-validator` → 40 valid, 0 skipped, 0 errors             |
| Build: 0 errors, 0 warnings   | `npm run build` clean                                         |
| Typecheck: 0 errors           | `astro check` → 0 errors, 2 hints                             |
| Tailwind v4 + dark/light mode | Custom theme tokens, CSS-first config                         |
| Self-hosted fonts             | Space Grotesk + JetBrains Mono via Astro providers            |
| SEO                           | JSON-LD, canonical URLs, OG images, sitemap, robots.txt       |
| Analytics                     | Plausible integration                                         |
| Firebase Hosting              | Immutable cache, security headers, clean URLs                 |
| HTML validation enforced      | `html-validate` in CI (non-optional)                          |
| md-go-validator in CI         | `website.yml` → install + validate + upload results artifact  |

### md-go-validator Integration (this session's work)

| Item                              | Evidence                                            |
| --------------------------------- | --------------------------------------------------- |
| CI step in `website.yml`          | Install + validate + upload artifact                |
| Separate `website.yml` workflow   | Path-filtered, independent from Go CI               |
| `validate-docs` flake app         | `nix run .#validate-docs`                           |
| `validate:docs` npm script        | `npm run validate:docs`                             |
| `related-tools.mdx` documentation | Usage, CI, skip directives, library examples        |
| Sidebar entry                     | Community → Related Tools                           |
| Contributing guide updated        | `validate:docs` step listed                         |
| All code snippets valid (0 skips) | Fixed partial snippets to be complete compilable Go |
| MDX build error fixed             | `benchmarks.mdx` `<2` escaped as `{'<'}2`           |

---

## B. PARTIALLY DONE ⚠️

| #   | Item                        | What's Done                                                                         | What's Missing                                                                                                              |
| --- | --------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | md-go-validator standalone  | Library is mature, CI works locally                                                 | CI Go version mismatch (1.24 vs 1.26.2), no flake.nix, `go-output` replace directive blocks `go install` for external users |
| 2   | Uncommitted Go core changes | sqlc.go enhanced (119 new lines), filter.go, metrics.go, pattern_test.go refactored | Not committed yet — appears to be work-in-progress on sqlc parsing improvements                                             |
| 3   | FEATURES.md accuracy        | Most entries correct                                                                | "Dark theme only" still listed but light mode IS implemented                                                                |

---

## C. NOT STARTED 🔲

| #   | Item                                                                    | Impact               | Effort |
| --- | ----------------------------------------------------------------------- | -------------------- | ------ |
| 1   | Source real brand logos for generators                                  | Visual polish        | 30min  |
| 2   | Lighthouse audit (requires live browser)                                | Performance baseline | 60min  |
| 3   | Browser visual QA (desktop + mobile)                                    | UX verification      | 30min  |
| 4   | Skip-to-content link for a11y                                           | Accessibility        | 5min   |
| 5   | Move logos from `public/` to `src/assets/` for Astro image optimization | Performance          | 30min  |
| 6   | md-go-validator: fix CI Go version 1.24→1.26+                           | CI reliability       | 1min   |
| 7   | md-go-validator: create flake.nix                                       | Reproducibility      | 30min  |
| 8   | md-go-validator: deduplicate Go validation logic                        | Code hygiene         | 15min  |
| 9   | md-go-validator: publish `go-output` or remove replace directive        | Publishability       | 10min  |
| 10  | Tag gogenfilter v0.1.0 release                                          | Distribution         | 5min   |

---

## D. TOTALLY FUCKED UP 💥

| #   | Issue                                            | Severity    | Status                                                                                                                                                                                                                                                                                   |
| --- | ------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **md-go-validator `go install` WILL FAIL on CI** | 🔴 CRITICAL | `go.mod` has `replace github.com/larsartmann/go-output => ../go-output`. The `go install github.com/larsartmann/md-go-validator@latest` step in `website.yml` will fail because the replace directive resolves to a nonexistent local path. **This will break the website CI pipeline.** |
| 2   | **Uncommitted Go core changes (8 files)**        | 🟡 MEDIUM   | sqlc.go has 119 new lines, filter.go/metrics.go modified, pattern_test.go reworked. These are staged but not committed. Could be lost or cause confusion.                                                                                                                                |

---

## E. WHAT WE SHOULD IMPROVE

### Immediate (from this session's learnings)

1. **md-go-validator `go install` will break CI** — Must either publish `go-output`, remove the replace directive, or change the CI step to build from source (e.g., clone + `go build` instead of `go install @latest`)
2. **Commit the uncommitted Go core changes** — 8 files with sqlc improvements are sitting uncommitted
3. **Fix FEATURES.md** — "Dark theme only" is stale; light mode exists

### Architecture

4. **md-go-validator skip directive scanning is too aggressive** — It picks up directive text inside backtick-quoted prose and nested markdown fences. This caused false-positive skips in our docs. Should only scan bare text lines, not content inside backtick spans or code blocks.
5. **Consider Go workspace (`go.work`)** — gogenfilter + md-go-validator + go-output could share a workspace for unified development
6. **Type model consistency** — md-go-validator has excellent phantom types (`FileID`, `LineNumber`, `BlockIndex`). gogenfilter uses similar patterns. Could extract shared type patterns.

### Process

7. **Add `validate:docs` to pre-commit hook** — Catch broken docs before push
8. **Structured changelog** — Use conventional commits for automated changelog generation
9. **Version tagging** — No Go module version tag exists yet; `pkg.go.dev` won't work without one

---

## F. Top #25 Things We Should Get Done Next

Sorted by impact × effort (Pareto principle):

| #   | Task                                                                                         | Category       | Impact | Effort | Priority |
| --- | -------------------------------------------------------------------------------------------- | -------------- | ------ | ------ | -------- |
| 1   | Fix md-go-validator CI step: use `go build` from local clone instead of `go install @latest` | Critical Fix   | HIGH   | 5min   | 🔴 P0    |
| 2   | Commit uncommitted Go core changes (8 files: sqlc, filter, metrics, tests)                   | Housekeeping   | HIGH   | 2min   | 🔴 P0    |
| 3   | Publish `go-output` as a real module OR remove replace directive from md-go-validator        | Publishability | HIGH   | 10min  | 🔴 P0    |
| 4   | Fix md-go-validator CI Go version 1.24→1.26                                                  | CI Fix         | HIGH   | 1min   | 🔴 P0    |
| 5   | Update FEATURES.md (light mode exists, remove "Dark theme only")                             | Doc Fix        | MEDIUM | 2min   | 🟡 P1    |
| 6   | Tag gogenfilter v0.1.0 release                                                               | Distribution   | HIGH   | 5min   | 🟡 P1    |
| 7   | Add skip-to-content link for a11y                                                            | A11y           | MEDIUM | 5min   | 🟢 P2    |
| 8   | Deduplicate md-go-validator Go validation logic (parser.go vs go_validator.go)               | Code Hygiene   | MEDIUM | 15min  | 🟢 P2    |
| 9   | Fix md-go-validator skip directive scanner (too aggressive on prose/backticks)               | Bug Fix        | MEDIUM | 30min  | 🟢 P2    |
| 10  | Add md-go-validator flake.nix                                                                | Infra          | MEDIUM | 30min  | 🟢 P2    |
| 11  | Remove empty `src/content/config/` directory                                                 | Cleanup        | LOW    | 1min   | 🟢 P2    |
| 12  | Fix `PhaseSection.astro` hardcoded type cast to use `UseCaseIcon`                            | Type Safety    | LOW    | 2min   | 🟢 P2    |
| 13  | Create Go workspace (`go.work`) for gogenfilter + md-go-validator + go-output                | Architecture   | HIGH   | 15min  | 🟢 P2    |
| 14  | Add `validate:docs` to pre-commit hook                                                       | DX             | LOW    | 5min   | 🟢 P3    |
| 15  | Move logos from `public/` to `src/assets/` for image optimization                            | Perf           | LOW    | 30min  | 🟢 P3    |
| 16  | Source real brand logos for generators                                                       | Visual         | LOW    | 30min  | 🟢 P3    |
| 17  | Run Lighthouse audit                                                                         | Perf           | MEDIUM | 60min  | 🟢 P3    |
| 18  | Browser visual QA                                                                            | UX             | MEDIUM | 30min  | 🟢 P3    |
| 19  | Create comparison rationale docs page                                                        | Docs           | MEDIUM | 20min  | 🟢 P3    |
| 20  | Add structured changelog with conventional commits                                           | Process        | LOW    | 30min  | 🔵 P4    |
| 21  | Add E2E tests for website (Playwright)                                                       | Testing        | MEDIUM | 120min | 🔵 P4    |
| 22  | Extract shared phantom type patterns between gogenfilter and md-go-validator                 | Architecture   | MEDIUM | 60min  | 🔵 P4    |
| 23  | Create md-go-validator as gogenfilter workspace member (or keep separate)                    | Architecture   | HIGH   | 60min  | 🔵 P4    |
| 24  | Add OpenAPI spec for the error code system                                                   | Documentation  | LOW    | 30min  | 🔵 P4    |
| 25  | Create automated release pipeline (goreleaser)                                               | Infra          | MEDIUM | 60min  | 🔵 P4    |

---

## G. Top #1 Question I Cannot Figure Out Myself

**Is the md-go-validator CI step (`go install github.com/larsartmann/md-go-validator@latest`) going to work on GitHub Actions?**

The `go.mod` has `replace github.com/larsartmann/go-output => ../go-output` which means:

- **Local builds**: work fine (../go-output exists)
- **`go install @latest`**: depends on whether the published version on GitHub still has the replace directive
- If the replace directive is in the tagged version, `go install` will fail because `../go-output` doesn't exist in the module cache
- If the replace directive was removed before tagging, it will work

I cannot check this without either:

1. Seeing the actual tagged version on GitHub
2. Knowing if `go-output` was published as a standalone module
3. Testing on a clean machine without local `../go-output`

**Decision needed**: Should we change the CI step to clone + build from source instead of `go install @latest`? This would be more reliable:

```yaml
- name: Build md-go-validator
  run: |
    git clone https://github.com/larsartmann/md-go-validator.git /tmp/md-go-validator
    cd /tmp/md-go-validator && go build -o /usr/local/bin/md-go-validator ./cmd/md-go-validator/
```

---

## Project Metrics (Current)

| Metric              | gogenfilter (Core)       | gogenfilter (Website)            | md-go-validator |
| ------------------- | ------------------------ | -------------------------------- | --------------- |
| Source files        | 32 `.go`                 | 14 components + 6 data + 2 pages | 13 `.go`        |
| Test files          | 23                       | 0 (static)                       | 7               |
| Testdata fixtures   | 14                       | N/A                              | N/A             |
| Code blocks in docs | N/A                      | 40 (all valid)                   | N/A             |
| HTML pages          | N/A                      | 19                               | N/A             |
| MDX docs            | N/A                      | 17                               | N/A             |
| TODOs in code       | 0                        | 0                                | 0               |
| Build errors        | 0                        | 0                                | ⚠️ CI version   |
| Coverage threshold  | 95% (enforced)           | N/A                              | Not enforced    |
| Linters             | 70+                      | html-validate                    | golangci-lint   |
| CI workflows        | 2 (ci.yml + website.yml) | —                                | 1               |
| Dependencies        | 3 direct                 | 5 direct                         | 2 direct        |
| Uncommitted changes | 8 files                  | 0                                | 0               |

---

_Arte in Aeternum_
