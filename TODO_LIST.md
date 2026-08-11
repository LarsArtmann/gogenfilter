# TODO List

**Updated:** 2026-08-10
**Current version:** v3.5.0
**Strategic direction:** v4 — golangci-lint plugin (see [ROADMAP.md](ROADMAP.md))

> Open work only. Completed items live in [CHANGELOG.md](CHANGELOG.md); long-term ideas live in
> [ROADMAP.md](ROADMAP.md). Items are grouped by area and tagged with `_Priority_` and `_Effort_`.

## v4 — golangci-lint Plugin

- [ ] **Publish plugin module** — Tag `plugin/` as `v0.1.0`. Remove the `replace` directive from
      `plugin/go.mod` before tagging. Verify `golangci-lint custom` builds successfully with the
      published version.
      _Priority: HIGH | Effort: 1 hr | Needs: v3.5.0 tagged first_
- [ ] **Add plugin CI job** — Verify `plugin/` compiles and tests pass in CI. Add a job to
      `.github/workflows/ci.yml` that runs `cd plugin && GOWORK=off go test ./...`.
      _Priority: HIGH | Effort: 1 hr_
- [ ] **Integration test with real golangci-lint** — Build a custom golangci-lint binary with the
      plugin and run it against a test project containing generated files. Verify diagnostics appear.
      _Priority: MEDIUM | Effort: 2 hr_
- [ ] **Design custom detector registration API** — `RegisterDetector(...)` for proprietary code
      generators. Must be thread-safe, work with the existing table-driven system, and not break
      derived lists. Part of v4 breaking-change scope.
      _Priority: MEDIUM | Effort: Design + implementation_
- [ ] **Plan v4 breaking changes** — Identify API cleanup opportunities for the `/v4` import path
      bump. Remove deprecated patterns, simplify error system surface, evaluate removing context
      method stubs permanently.
      _Priority: MEDIUM | Effort: Design_

## Website

- [ ] **Visually verify the site (screenshots)** — No session has ever rendered a pixel. Serve
      locally (`cd website && npm run dev`), screenshot every page in both themes + mobile, confirm
      colors/layouts/gradients. _Priority: HIGH | Effort: 1 hr | Needs: browser_
- [ ] **Website performance audit** — Establish Lighthouse baselines (performance, accessibility,
      SEO, best-practices) on the post-redesign site. Lighthouse CI is now advisory-only (all
      assertions at `warn` level). _Priority: MEDIUM | Effort: 1 hr | Needs: Lighthouse_
- [ ] **Test on real browsers** (Chrome, Firefox, Safari) — Verify the color-token fixes, CSP
      changes, and OG images render correctly across browsers.
      _Priority: MEDIUM | Effort: 30 min | Needs: browsers_

## CI / Process

- [ ] **Configure LHCI_GITHUB_APP_TOKEN** — Install Lighthouse CI GitHub App and add the token
      secret. Once configured, upgrade assertions from `warn` to `error` in `lighthouserc.json`.
      _Priority: LOW | Effort: 30 min | Needs: GitHub App install_

## Dependencies / Security

- [ ] **Resolve `art-dupl` upstream breakage** — `art-dupl@v0.3.0` doesn't compile (undefined
      symbols in its own `printer/html.go`); CI is pinned to v0.1.0. Fix in `LarsArtmann/art-dupl` or
      replace the dedup tool. _Priority: LOW | Effort: Research | Needs: external repo_
- [ ] **Prune orphaned GCP service account keys** — Deploy attempts accumulated keys; 1 pruned, up
      to 4 may remain. Needs `gcloud iam` + auth. Add a max-2-active-keys policy.
      _Priority: LOW | Effort: 30 min | Needs: gcloud auth_
- [ ] **Migrate to Go 1.27** — Drops `GOEXPERIMENT=jsonv2` requirement. Assess toolchain impact
      (CI matrix, Nix `go_1_26` pin) before bumping. _Priority: LOW | Effort: 2 hr_
- [ ] **Update art-dupl consumer** — Migrate `shouldIncludeFile` to `FilterDetailedAndContent` in
      the art-dupl repo. _Priority: LOW | Effort: 1 hr | Needs: external repo_

## Documentation

- [ ] **Investigate unifying theme systems** — Landing page uses `.light` class on `<html>`;
      Starlight docs use `data-theme` attribute (documented as accepted trade-off in AGENTS.md).
      Revisit whether a unified theme system is worth the migration cost.
      _Priority: LOW | Effort: Research | Status: Accepted trade-off, revisit if pain grows_
- [ ] **Audit npm overrides** (`website/package.json`) — `brace-expansion`, `devalue`, `vite`,
      `yaml` overrides were added for Dependabot alerts. Re-evaluate whether each is still needed
      when bumping Astro/Starlight. _Priority: LOW | Effort: 10 min_
