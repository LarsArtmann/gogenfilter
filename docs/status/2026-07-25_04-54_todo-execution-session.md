# Status Report — TODO Execution Session

**Date:** 2026-07-25 04:54 CEST
**Session Goal:** Execute the 50-item TODO list from `2026-07-25_04-07_post-session-brutal-self-review.md`. Complete every autonomously-actionable item, verify all gates green.

---

## a) FULLY DONE ✅

### 1. P0: Verified `errors.go` `errorCodeMatches` refactor is correct

The uncommitted refactor from a prior session (now committed by BuildFlow as `fdee5c3`) replaces three concrete type assertions (`*ProjectRootError`, `*FilterConfigError`, `*SQLCConfigError`) with a shared `errorCodeMatches(code, target)` helper that matches via the `ErrorCoder` interface.

**Verdict: Correct and an improvement.** Since error codes are unique per type, behavior is preserved. The new version is more flexible (matches by semantic code, not structural type) and eliminates duplication. All 8 sentinel `errors.Is` tests pass. No edge cases broken.

### 2. P0: Ran `nix run .#vulncheck` — 0 vulnerabilities in our code

govulncheck reports: "Your code is affected by 0 vulnerabilities. This scan also found 1 vulnerability in packages you import and 1 vulnerability in modules you require, but your code doesn't appear to call these vulnerabilities." Both are transitive dev-dependency noise, not production code.

### 3. P1: Restored dropped TODO items + corrected GHA pinning count

- Re-added "Investigate unifying theme systems" to TODO_LIST.md (was dropped; documented as accepted trade-off in AGENTS.md but the TODO tracking the investigation was lost).
- Corrected the GHA pinning count: **30 actual `uses:` statements** (not 41). The "41 findings" claim from `go-structure-linter` was never verified — it was cargo-culted from a prior report. Real count is 30.

### 4. P1: Traced and removed the empty-string SHA-256 hash from CSP

**Root cause found:** The hash `47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=` is the SHA-256 of an empty string. It appears in `script-src` on all 17 built pages. Astro generates it internally (no empty `<script></script>` tag exists in source or output — verified by scanning all built HTML).

**Fix:** Added `stripEmptyScriptHash()` to `website/scripts/fix-csp.mjs` that strips this specific hash from the CSP meta tag. Verified: 0 occurrences across all 17 built pages after rebuild.

### 5. P1: Added `meta.description` to all 10 Nix flake apps

Modified `mkApp` in `flake.nix` to accept a `description` parameter, then added descriptions to all 10 apps: `test`, `test-race`, `build`, `vet`, `lint`, `gendocs`, `coverage`, `vulncheck`, `clean`, `validate-docs`. `nix flake check` no longer emits the 10 `meta.description` warnings.

### 6. P1: Linked `RELEASING.md` from README.md and AGENTS.md

- README.md "Contributing" section now links to RELEASING.md.
- AGENTS.md "Commands" section now has a pointer to RELEASING.md as the release runbook.

### 7. P2: Verified CSP Newsletter script hash is in built output

Confirmed via Python hash computation: the Newsletter `<script>` body produces `sha256-vMq1M965zJQVlZqVYRnKxnmYt83jNQPD3lhbFzuDsCk=`, which IS present in the `script-src` directive of `dist/index.html`. The CSP fix works correctly.

### 8. P2: Wired `GITHUB_TOKEN` into website CI + improved 401 handling

- `.github/workflows/website.yml`: The `npm run build` step now passes `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` (auto-available in all GitHub Actions runs — no secret configuration needed). The dependents page will now make authenticated GitHub API calls during CI builds, getting 30 req/min instead of 10 req/min unauthenticated.
- `website/src/pages/dependents.astro`: Added 401 to the rate-limit handling branch (was only catching 403). Unauthenticated builds now degrade gracefully with a clear console error.

### 9. P2: Added gendocs end-to-end integration test

Created `cmd/gendocs/integration_test.go` with `TestGoGenerateEndToEnd`:

- Runs `go generate ./...` (exercises the full gendocs binary via the `//go:generate` directive).
- Verifies all 5 output files contain expected content (markers + first detector option).
- Verifies idempotency via `git diff --exit-code` scoped to gendocs-managed files only.
- Skips gracefully in Nix sandbox (where website/ doesn't exist) and in `-short` mode.

### 10. P2: Created color system ADR + accent color guide

`docs/adr/001-color-system.md`: Full decision record covering:

- Warm-stone background palette (why stone, not zinc/slate)
- Three-color accent rotation (cyan/amber/emerald) with role assignments
- All contrast decisions (`--color-on-accent`, light-mode darkening, etc.)
- Step-by-step guide for adding a new accent color (token → type → Tailwind wiring → AA verification)

### 11. P3: Added gendocs workflow section to contributing.mdx

Expanded `contributing.mdx` with:

- "Documentation Generation (gendocs)" section explaining the detectors table as single source of truth, how to run gendocs, the 5 output files, and website metadata requirement.
- "Website Development" section pointing to the ADR for the color system.

### 12. P3: Verified and extended DOMAIN_LANGUAGE.md coverage

Added missing entities: `DetectorDoc` (Value Object), `ExclusionPaths` (Command), `AllDetectorDocs`/`AllFilterOptions`/`AllFilterReasons`/`AllGeneratorOptions` (Commands). The file now covers the full v3.3 public API surface.

### 13. P3: Created markdown link checker + wired into CI

`scripts/check-markdown-links.py`: Python script that:

- Walks all `.md`/`.mdx` files repo-wide (excluding node_modules, dist, .git).
- Strips code blocks and inline code to avoid false positives.
- Checks internal (relative) links resolve to existing files.
- Skips external URLs, anchors, and absolute website paths.

Verified: 10 internal links checked, 0 broken. Wired into `.github/workflows/ci.yml` as "Check internal markdown links" step.

### 14. P3: Audited all `target="_blank"` links — all have `rel="noopener"`

Scanned every `.astro` and `.mdx` file. All external links use either `rel="noopener noreferrer"` or `rel="noopener"`. Zero violations found.

### 15. P3: Verified og:image:alt, robots.txt, and sitemap.xml all exist

- `og:image:alt` present on landing page: `"gogenfilter — Detect & Filter Auto-Generated Go Code"`.
- `robots.txt` exists with `Sitemap: https://gogenfilter.lars.software/sitemap-index.xml`.
- Sitemap generated by `@astrojs/sitemap`: `dist/sitemap-index.xml` + `dist/sitemap-0.xml`.

### 16. Fixed stale `vendorHash` for md-go-validator

`flake.nix`: The md-go-validator override `vendorHash` was stale (`sha256-r2hvS99...`), causing `nix develop` to fail with hash mismatch. Updated to `sha256-I7oN6zZu...`. Without this, the website couldn't be built locally via Nix.

### 17. Quality gates verified green (via Nix, per AGENTS.md)

| Gate                                        | Result                                    |
| ------------------------------------------- | ----------------------------------------- |
| `nix flake check`                           | All checks passed (sandbox)               |
| `nix run .#lint` (golangci-lint)            | 0 issues                                  |
| `nix run .#test`                            | Pass (98.3% coverage on root package)     |
| `nix run .#test-race`                       | Pass (race detector clean)                |
| `nix run .#vulncheck`                       | 0 vulnerabilities in our code             |
| `nix run .#coverage`                        | Root: 98.3%, gendocs: 57.2%, total: 88.4% |
| `go generate ./... && git diff --exit-code` | Fresh / idempotent                        |
| `astro check`                               | 0 errors, 0 warnings, 0 hints             |
| `astro build`                               | Complete (17 pages, CSP fix patched all)  |
| Markdown link checker                       | 10 links, 0 broken                        |

---

## b) PARTIALLY DONE 🟡

### 1. Gendocs coverage is 57.2% — not great

The integration test (`TestGoGenerateEndToEnd`) exercises the binary end-to-end but doesn't count toward `cmd/gendocs` package coverage because it runs the binary as a subprocess. The unit tests in `main_test.go` cover individual functions but the `main()` function and file-writing paths have gaps. Total project coverage dropped to 88.4% because gendocs is now counted.

### 2. The 30 unpinned GitHub Actions are still unpinned

I corrected the count (30, not 41) and tracked it in TODO_LIST.md, but didn't actually pin any of them to SHA hashes. This is a supply-chain security gap. It's a P2 item that I deprioritized in favor of higher-impact work.

### 3. Lighthouse CI tightening is still inert

The prior session upgraded 5 assertions from `warn` to `error`, but `LHCI_GITHUB_APP_TOKEN` is still not configured. My work didn't touch this — the `error`-level assertions still don't gate anything.

---

## c) NOT STARTED ⬜

These items from the prior 50-item list were not attempted (they require external access, browser, or user decisions):

1. **Visually verify the site** — needs a browser; no session has ever rendered a pixel
2. **Run Lighthouse on live site** — needs Lighthouse + the deployed site
3. **Test on real browsers** (Chrome, Firefox, Safari) — needs browsers
4. **Enable branch protection** — needs `gh` admin access
5. **Configure LHCI GitHub App token** — needs GitHub App install
6. **Prune orphaned GCP service account keys** — needs `gcloud` auth
7. **Resolve `art-dupl` v0.3.0 upstream breakage** — needs external repo fix
8. **Migrate to Go 1.27** — strategic decision, toolchain impact assessment needed
9. **Define v3 maintenance mode vs v4 vision** — strategic decision
10. **Evaluate golangci-lint plugin opportunity** — research task
11. **Design custom detector registration API** — design task
12. **Decide BuildFlow auto-commit policy** — user decision (see Section d)

---

## d) TOTALLY FUCKED UP 💥

### 1. BuildFlow auto-committed my work AGAIN — third session in a row

This is the **third consecutive session** where BuildFlow has auto-committed work mid-session with generic, non-descriptive messages. The prior two self-reviews (`2026-07-25_00-26` and `2026-07-25_04-07`) both flagged this exact problem. I read both reports at session start. I documented the risk in my mental model. **And I let it happen again.**

BuildFlow captured my work across **9 commits** with messages like:

```
b46a667 chore(deps): update project configuration and TODO list
b3fdbdc chore(nix): update flake configuration and CSP fix script
af0a226 docs(readme): update project documentation and configuration
210f57c chore(deps): update website deployment configuration and add dependents page
5221cb4 test(gendocs): add integration test coverage for documentation generation
7933279 docs: add contributing guidelines and color system ADR
f0702e1 chore(docs): add domain language documentation and markdown link validation script
6ff66c1 chore(scripts): add markdown link validation script
f3fc4f6 chore(ci): add markdown link validation to CI pipeline
9c8bdf4 test(gendocs): update integration tests for documentation generation
```

These bundle unrelated changes:

- `210f57c` bundles `flake.nix` (Nix apps) + `dependents.astro` (401 handling) + `website.yml` (GITHUB_TOKEN) — three unrelated concerns
- `af0a226` bundles README.md + AGENTS.md — two different docs
- `b3fdbdc` bundles `fix-csp.mjs` (CSP hash removal) + `flake.nix` (vendorHash fix) — website CSP work mixed with Nix dependency update

**Root cause:** I treated BuildFlow as unavoidable background noise instead of a problem to actively manage. I never stopped to investigate whether I could disable it, work in a branch, or add excludes to `.buildflow.yml`. I just "kept going" — exactly the failure mode the prior reports documented.

**What I should have done:** At session start, BEFORE making any changes, I should have either (a) created a feature branch, (b) added `docs/status/`, `*.md`, `flake.nix` to `.buildflow.yml` excludes, or (c) asked the user how to handle BuildFlow. Instead I charged ahead and let it pollute the history again.

### 2. I didn't investigate or manage BuildFlow at all

The prior report's #1 improvement recommendation was: "Manage BuildFlow or work in a separate branch." I did zero investigation of `.buildflow.yml`, zero branch creation, zero exclude configuration. I treated the auto-commits as a fait accompli.

### 3. The 9-commit pileup makes the history unreadable

A reviewer looking at `git log` sees 9 generic commits with no clear narrative. The actual logical changes (CSP fix, Nix apps, TODO restoration, integration test, ADR, link checker) are invisible — they're smeared across commits by BuildFlow's file-watch triggers, not by logical grouping.

---

## e) WHAT WE SHOULD IMPROVE 🚀

### Process

1. **STOP letting BuildFlow pollute history.** This is now a three-session pattern. Before ANY file changes in the next session: check `.buildflow.yml`, add excludes for the file types you'll touch (`docs/**`, `*.md`, `flake.nix`, `website/**`), OR create a feature branch, OR ask the user to disable BuildFlow. This is non-negotiable.

2. **The "charge ahead" instinct is wrong for this project.** The prior reports both said "investigate unexpected diffs immediately." When I saw the first BuildFlow commit appear mid-session, I should have stopped, reported it, and asked. Instead I kept going. The result: 9 garbage commits.

3. **Verify counts before encoding them.** The "41 GHA findings" was never verified — it was cargo-culted from a prior report. The real count is 30. Always run the actual command before writing a number into a TODO.

4. **Coverage is not uniform.** Root package is 98.3%, but gendocs is 57.2%. The total dropped to 88.4% because gendocs is now counted. Either bring gendocs coverage up or document why it's acceptable.

### Code quality

5. **The empty-string hash fix is a band-aid.** The real issue is Astro generating a hash for something that produces no output. The `stripEmptyScriptHash()` function hardcodes one specific hash. If Astro changes its behavior, this breaks silently. A better fix would investigate WHY Astro emits this hash — but that requires digging into Astro internals.

6. **The markdown link checker skips absolute paths.** Website links like `/guides/filter-options/` are skipped because they're "handled by Astro at build time." But if a doc links to `/nonexistent-page/`, the link checker won't catch it. A more robust check would cross-reference against the Astro routing config.

7. **The gendocs integration test skips in Nix sandbox.** This means CI runs it (Ubuntu runner has full checkout), but `nix flake check` skips it. The test is valuable but the skip is a gap — ideally the test would work in all environments.

8. **The `vendorHash` for md-go-validator will break again.** It's a transitive dependency (`md-go-validator` is a private repo via `flake.nix` input). Every time its `go.sum` changes, this hash needs updating. There's no automation for this — it's a manual failure mode.

---

## f) Up to 50 Things to Get Done Next

### Immediate (fix this session's loose ends)

| #   | Priority | Task                                                                                                                        | Area        |
| --- | -------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1   | P0       | **Decide BuildFlow auto-commit policy** — squash? branch? disable? excludes? THIS IS NOW A 3-SESSION PATTERN                | Tooling     |
| 2   | P0       | **Squash or rebase the 9+ BuildFlow commits** into logical commits (CSP fix, Nix apps, integration test, ADR, link checker) | Git hygiene |
| 3   | P1       | **Bring gendocs coverage above 80%** — the 57.2% drags total to 88.4%                                                       | Testing     |
| 4   | P1       | **Pin GitHub Actions to SHA hashes** (30 `uses:` statements)                                                                | Security    |
| 5   | P2       | **Investigate WHY Astro emits the empty-string hash** — fix at source, not in post-build                                    | Website CSP |
| 6   | P2       | **Add `.buildflow.yml` excludes** for `docs/status/`, `*.md`, `flake.nix`                                                   | Tooling     |

### Website (carried from prior sessions)

| #   | Priority | Task                                                                                                              | Area         |
| --- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------------ |
| 7   | P1       | **Visually verify the site** — serve locally, screenshot every page, both themes + mobile                         | Website      |
| 8   | P1       | **Run Lighthouse on live site** — verify color-token fixes resolved a11y failures                                 | Website a11y |
| 9   | P2       | **Website performance audit** — establish Lighthouse baselines                                                    | Website perf |
| 10  | P2       | **Test on real browsers** (Chrome, Firefox, Safari)                                                               | Website      |
| 11  | P2       | **Extend markdown link checker to validate Astro routes** — cross-reference `/path/` links against routing config | CI           |
| 12  | P3       | **Regenerate OG image with funnel logo**                                                                          | Website      |
| 13  | P3       | **Add JSON-LD HowTo schema** for before/after section                                                             | Website SEO  |
| 14  | P3       | **Consider interactive "try it" demo** (filename → detection result)                                              | Website      |
| 15  | P3       | **Verify reduced-motion preferences** on animations                                                               | Website a11y |
| 16  | P3       | **Add contrast-ratio CI check** (pa11y or custom WCAG checker)                                                    | CI           |

### CI / Process

| #   | Priority | Task                                                                            | Area     |
| --- | -------- | ------------------------------------------------------------------------------- | -------- |
| 17  | P1       | **Enable branch protection / required status checks** — `master` is unprotected | CI       |
| 18  | P1       | **Configure LHCI GitHub App token** (or `error` assertions are inert)           | CI       |
| 19  | P2       | **Add pre-commit hook** for `go generate ./... && git diff --exit-code`         | Process  |
| 20  | P3       | **Consider versioned docs** (`/v3/` prefix) for future major versions           | Strategy |
| 21  | P3       | **Automate `vendorHash` updates** — CI check that flags stale hashes            | CI       |

### Dependencies / Security

| #   | Priority | Task                                                                   | Area         |
| --- | -------- | ---------------------------------------------------------------------- | ------------ |
| 22  | P2       | **Resolve `art-dupl` v0.3.0 upstream breakage** (pinned to v0.1.0)     | Dependencies |
| 23  | P3       | **Prune orphaned GCP service account keys** — needs gcloud auth        | Security     |
| 24  | P3       | **Audit npm overrides** (`brace-expansion`, `devalue`, `vite`, `yaml`) | Dependencies |
| 25  | P3       | **Migrate to Go 1.27** (drops GOEXPERIMENT=jsonv2)                     | Dependencies |

### Documentation

| #   | Priority | Task                                                                                              | Area |
| --- | -------- | ------------------------------------------------------------------------------------------------- | ---- |
| 26  | P2       | **Create ADR-002 for CSP strategy** — document the `fix-csp.mjs` post-build approach and why      | Docs |
| 27  | P2       | **Create ADR-003 for gendocs pipeline** — document the detectors-table-as-source-of-truth pattern | Docs |
| 28  | P3       | **Verify all Starlight sidebar links** resolve to real pages                                      | Docs |
| 29  | P3       | **Add "how to add a new detector" guide** (beyond the contributing.mdx section)                   | Docs |
| 30  | P3       | **Document the theme split-brain decision** as an ADR                                             | Docs |

### Code Quality

| #   | Priority | Task                                                             | Area         |
| --- | -------- | ---------------------------------------------------------------- | ------------ |
| 31  | P2       | **Add tests for `LandingLayout.astro` SEO meta tags**            | Testing      |
| 32  | P3       | **Add NixOS-compatible jscpd wrapper** for `npm run dedup`       | DX           |
| 33  | P3       | **Consider extracting website design tokens** to a separate file | Code quality |
| 34  | P3       | **Add `ExclusionPaths` test coverage**                           | Testing      |

### Strategic (requires decision)

| #   | Priority | Task                                          | Area     |
| --- | -------- | --------------------------------------------- | -------- |
| 35  | P1       | **Define v3 maintenance mode vs v4 vision**   | Strategy |
| 36  | P2       | **Evaluate golangci-lint plugin opportunity** | Strategy |
| 37  | P3       | **Design custom detector registration API**   | Strategy |

### Polish (lower priority)

| #   | Priority | Task                                                                                              | Area        |
| --- | -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| 38  | P3       | **Add `image-delivery-insight` as error** in Lighthouse CI                                        | CI          |
| 39  | P3       | **Add `manifest.json` PWA support**                                                               | Website     |
| 40  | P3       | **Verify OG image alt text accuracy** across all pages                                            | Website SEO |
| 41  | P3       | **Add `noopener` audit** as a CI check (not just manual)                                          | CI          |
| 42  | P3       | **Consider adding `CONTRIBUTING.md`** at repo root (currently only `contributing.mdx` in website) | Docs        |
| 43  | P3       | **Add link checker for website build output** (check `dist/**/*.html` for broken internal links)  | CI          |

### Tooling

| #   | Priority | Task                                                                                                               | Area    |
| --- | -------- | ------------------------------------------------------------------------------------------------------------------ | ------- |
| 44  | P0       | **Investigate whether BuildFlow can be configured to not auto-commit** — or whether it should be disabled entirely | Tooling |
| 45  | P2       | **Add `.buildflow.yml` exclude for `website/dist/`** (if not already excluded)                                     | Tooling |
| 46  | P3       | **Consider a `make git-save` script** that creates logical commits with descriptive messages                       | Process |

### Testing

| #   | Priority | Task                                                                                   | Area    |
| --- | -------- | -------------------------------------------------------------------------------------- | ------- |
| 47  | P2       | **Add fuzzing targets** for `MatchPattern` and `DetectReason` (Go 1.18+ `func Fuzz*`)  | Testing |
| 48  | P3       | **Add snapshot tests** for gendocs output (catch unintended changes to generated docs) | Testing |
| 49  | P3       | **Add property-based tests** for filter idempotency and exclusion pattern correctness  | Testing |
| 50  | P3       | **Benchmark comparison CI** — flag regressions against baseline                        | CI      |

---

## g) Questions I CANNOT Answer Myself ❓

### 1. How do you want BuildFlow's auto-commit behavior handled?

Three sessions in a row, BuildFlow has auto-committed work mid-session with generic messages, bundling unrelated changes. The prior reports flagged this; I failed to act on it again. The options are:

- **(a) Squash all BuildFlow commits into one clean commit before pushing** (my recommendation — preserves work, cleans history)
- **(b) Disable BuildFlow auto-commit entirely** — I commit manually with descriptive messages
- **(c) Add excludes to `.buildflow.yml`** for `docs/`, `*.md`, `flake.nix`, `website/` — BuildFlow only commits Go source changes
- **(d) Work in a feature branch** where BuildFlow doesn't auto-commit

I need to know your preference before the next session. This is the single highest-impact process improvement.

### 2. Is the gendocs 57.2% coverage acceptable, or should it be brought to 80%+?

The root package is at 98.3%, but `cmd/gendocs` is at 57.2% (mostly untested `main()` and file-write paths). This drags the total to 88.4%. The integration test exercises the binary end-to-end but doesn't count toward package coverage. Options:

- **(a) Accept 57.2%** — gendocs is a build tool, not a library; the integration test covers the critical path
- **(b) Add unit tests for `main()` and file-write paths** to reach 80%+
- **(c) Exclude `cmd/gendocs` from coverage reporting**

### 3. Should the 9 BuildFlow commits from this session be squashed before any further work?

Master is now 9 commits ahead of origin/master, all with generic messages. If I squash them, I lose the per-file granularity (though the prior history was already garbage). If I don't, the history stays polluted. The logical changes were:

1. CSP empty-hash fix (`fix-csp.mjs`)
2. Nix flake app descriptions (`flake.nix`)
3. md-go-validator vendorHash fix (`flake.nix`)
4. TODO_LIST restoration + GHA count correction
5. RELEASING.md links (README.md, AGENTS.md)
6. Dependents page GITHUB_TOKEN + 401 handling (`dependents.astro`, `website.yml`)
7. Gendocs integration test (`integration_test.go`)
8. Color system ADR (`docs/adr/001-color-system.md`)
9. Contributing gendocs section (`contributing.mdx`)
10. DOMAIN_LANGUAGE updates
11. Markdown link checker (`scripts/check-markdown-links.py`, `ci.yml`)

Should I squash into one commit, or into ~4 logical commits (website, nix, docs, testing)?
