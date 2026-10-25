# TODO List

**Updated:** 2026-10-25
**Current version:** v3.6.1
**Strategic direction:** v4 — golangci-lint plugin (see [ROADMAP.md](ROADMAP.md))

> Open work only. Completed items live in [CHANGELOG.md](CHANGELOG.md); long-term ideas live in
> [ROADMAP.md](ROADMAP.md). Items are grouped by area and tagged with `_Priority_` and `_Effort_`.

## v4 — golangci-lint Plugin

- [ ] **Publish plugin module** — Tag `plugin/` as `v0.1.0`. Remove the `replace` directive from
      `plugin/go.mod` before tagging. Verify `golangci-lint custom` builds successfully with the
      published version.
      _Priority: HIGH | Effort: 1 hr | Needs: v3.5.0 tagged first_
- [x] **Add plugin CI job** — DONE via the Forgejo `ci.yml` (2026-10-25): `nix shell nixpkgs#go_1_27 nixpkgs#gcc -c bash -c 'cd plugin && GOWORK=off go test ./...'` runs in the consolidated quality-gate job; verified green locally before the flip.
      _Priority: HIGH | Effort: 1 hr | Status: DONE (2026-10-25)_
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
      locally (`cd website && pnpm run dev`), screenshot every page in both themes + mobile, confirm
      colors/layouts/gradients. _Priority: HIGH | Effort: 1 hr | Needs: browser_
- [ ] **Website performance audit** — Establish performance/a11y/SEO baselines on the post-redesign
      site with manual runs ([unlighthouse.dev/tools](https://unlighthouse.dev/tools) or local
      Lighthouse); LHCI automation was killed with the GitHub CI (2026-10-25, decision D3).
      _Priority: MEDIUM | Effort: 1 hr | Needs: browser_
- [ ] **Test on real browsers** (Chrome, Firefox, Safari) — Verify the color-token fixes, CSP
      changes, and OG images render correctly across browsers.
      _Priority: MEDIUM | Effort: 30 min | Needs: browsers_

## CI / Process

- [x] **Configure LHCI_GITHUB_APP_TOKEN** — KILLED 2026-10-25 (migration decision D3): the
      Lighthouse CI monitor was advisory-only theater (warn-only assertions, no token, no reader);
      `lighthouse.yml` + `lighthouserc.json` are deleted in the Forgejo cutover commit. Revisit only
      with a real consumer for the metrics.
      _Priority: LOW | Status: KILLED (2026-10-25)_

## Forgejo CI Migration (2026-10-25)

Plan: `docs/planning/2026-10-25_17-13_forgejo-ci-migration-pareto-plan.md`. Workflows + scripts are
written, validated, and pushed (`.forgejo/workflows/`, `scripts/`); the flip is the only user-gated
step. Order matters: flip → push/verify → secrets → drill → cutover.

- [x] **USER: run the flip** — RAN 2026-10-25 19:07. The migrate itself fully succeeded
      (native, Actions enabled, 11 open PRs + 10 releases imported, master = GitHub HEAD), but the
      flip's verify **false-failed** on a counter-semantics bug: GitHub's `open_issues_count`
      includes PRs, Forgejo's excludes them (all 11 were PRs, 0 real issues). The script died
      BEFORE attaching the push mirror. Root cause + fix live in SystemNix
      (`_forgejo-scripts.nix`, compare `open_issues_count + open_pr_counter`).
      _Priority: HIGH | Status: DONE (verify bug fixed upstream; mirror attach below)_
- [ ] **USER: deploy the SystemNix fix + attach the push mirror** — (a) `gh auth refresh -s workflow`
      (the sync PAT lacks `workflow` scope — domains is already 114 commits frozen; gogenfilter
      needs it while `.github/workflows/` exists, i.e. until cutover), (b) `forgejo-update-github-token`
      (refreshes sops), (c) `sudo nixos-rebuild switch --flake .#evo-x2` (toplevel pre-verified to
      build), (d) `sudo systemctl start forgejo-github-sync` (phase 5 attaches gogenfilter's push
      mirror idempotently — it is already in `canonicalRepos`).
      _Priority: HIGH | Effort: 15 min | Needs: sudo + browser for gh auth_
- [ ] **Switch clone origins** — this clone: `git remote set-url origin ssh://forgejo@forgejo.home.lan/lars/gogenfilter.git`
      + keep `github` as fallback remote. **Mac clone must switch BEFORE its next push** (clobber
      risk while the push mirror is live).
      _Priority: HIGH | Effort: 10 min_
- [ ] **Verify first Forgejo runs green** — push master to Forgejo; `ci.yml` (all gates incl.
      plugin tests + coverage awk gate), `website.yml` (build+validate; deploy skips without
      secret), `probe.yml` (records toolchain versions + Firebase egress verdict). Watch runs in
      the Forgejo UI or `scripts/ci-health.sh`.
      _Priority: HIGH | Effort: 30 min_
- [ ] **Set Forgejo Actions secrets** — `FIREBASE_SERVICE_ACCOUNT` (website deploy leg; deploy
      fails soft until set) and `GH_RELEASE_PAT` (GitHub release mirroring, needs `repo` scope).
      Optional: `RELEASE_TOKEN` only if the default Actions token turns out read-scoped. Repo →
      Settings → Actions → Secrets.
      _Priority: HIGH | Effort: 10 min | Needs: Forgejo UI_
- [ ] **Release drill** — tag `v0.0.0-ci-drill` on Forgejo → release.yml creates the Forgejo
      release from CHANGELOG (drill tag has no section, so verify the fail-path message is clean,
      then tag a section-bearing test or accept the gate failure as the drill result) → delete
      tag+release both sides.
      _Priority: HIGH | Effort: 30 min_
- [ ] **Cutover deletions** — after Forgejo ci+website are green: delete `.github/workflows/` +
      `.github/dependabot.yml` + `lighthouserc.json`, remove the README CI badge, confirm the
      push mirror propagates the deletion to GitHub.
      _Priority: HIGH | Effort: 15 min_
- [ ] **Dependency-update strategy** — dependabot is GitHub-only and dies at cutover; decide
      Renovate self-host vs quarterly manual `buildflow update` sweep; record the decision here.
      _Priority: MEDIUM | Effort: 30 min_
- [ ] **Optional hardening** — add `gogenfilter` to `SystemNix` `forgejo.canonicalRepos` (declarative
      push-mirror re-attachment; currently unused, S-1599 gated), attic nix-cache secrets for
      faster evals, schedule `scripts/ci-health.sh` via Gatus/cron (zombie-run watch, Forgejo
      #14843).
      _Priority: LOW | Effort: 30 min_
- [ ] **1-week post-cutover retro** — deploy reliability, zombie runs, capacity contention;
      annotate `docs/status/2026-10-25_16-57_forgejo-migration-assessment-self-review.md`.
      _Priority: LOW | Effort: 30 min | Needs: 1 week_

## Dependencies / Security

- [ ] **Resolve `art-dupl` upstream breakage** — `art-dupl@v0.3.0` doesn't compile (undefined
      symbols in its own `printer/html.go`); CI is pinned to v0.1.0. Fix in `LarsArtmann/art-dupl` or
      replace the dedup tool. _Priority: LOW | Effort: Research | Needs: external repo_
- [ ] **Prune orphaned GCP service account keys** — Deploy attempts accumulated keys; 1 pruned, up
      to 4 may remain. Needs `gcloud iam` + auth. Add a max-2-active-keys policy.
      _Priority: LOW | Effort: 30 min | Needs: gcloud auth_
- [x] **Migrate to Go 1.27** — Drops `GOEXPERIMENT=jsonv2` requirement (env removed from CI; json v2
      is default in 1.27). Flake uses `buildGo127Module` + `pkgs.go_1_27`; CI/benchmark workflows
      pin `go-version: "1.27"` with `GOTOOLCHAIN: local`; golangci-lint action bumped to v2.14.0
      (matches nixpkgs). Verified: `nix flake check`, `nix run .#test`, `.#test-race`, `.#lint`,
      `.#validate-docs`, plugin tests all green.
      _Priority: LOW | Effort: 2 hr | Status: DONE (2026-09-30)_
- [ ] **Fix md-go-validator upstream build** — Its flake pins `pkgs.go_1_26` while its go.mod
      requires ≥ 1.27, and its `package.nix` src fileset omits `testdata/` so in-store checks fail.
      This repo now builds `mdgo` locally via `buildGo127Module` (`flake.nix`) as a workaround;
      fix `LarsArtmann/md-go-validator` upstream (use `buildGoLatestModule`, add testdata to src)
      and revert to consuming its flake package.
      _Priority: LOW | Effort: 30 min | Needs: external repo_
- [ ] **Update art-dupl consumer** — Migrate `shouldIncludeFile` to `FilterDetailedAndContent` in
      the art-dupl repo. _Priority: LOW | Effort: 1 hr | Needs: external repo_

## Documentation

- [x] **Unify theme systems** — Landing page now uses `data-theme` attribute on `<html>` (matching
      Starlight's convention) instead of the `.light` class. Both landing page and docs pages share
      the `localStorage["starlight-theme"]` key, so theme preference persists across navigation.
      Backward-compatible: old `localStorage["theme"]` key is read as fallback. Changed: `global.css`
      (`:root.light` → `:root[data-theme="light"]`), `theme-init.js`, `header.js`.
      _Priority: LOW | Effort: 30 min | Status: DONE (needs `pnpm run build` verification before deploy)_
- [x] **Audit pnpm overrides** (`website/package.json`) — Audited all 4 overrides against the
      dependency tree. **`brace-expansion`**: zero references in lockfile — completely dead, safe to
      remove. **`devalue`**: only `astro@^5.8.1` requires it; range already guarantees >=5.8.1, exact
      pin blocks patches. **`vite`**: `astro@^8.0.13` forces vite 8; pin only blocks patches.
      **`yaml`**: `yaml-language-server` pins 2.8.3 exact + `@astrojs/yaml2ts@^2.8.3` — already safe.
      All 4 are redundant. Action: remove all overrides + run `pnpm install` to regenerate lockfile
      (cannot do in current env — no pnpm). _Priority: LOW | Effort: 10 min | Status: AUDITED_
