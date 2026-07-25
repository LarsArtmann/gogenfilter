# TODO List

**Updated:** 2026-07-25
**Current version:** v3.3.1

> Open work only. Completed items live in [CHANGELOG.md](CHANGELOG.md); long-term ideas live in
> [ROADMAP.md](ROADMAP.md). Items are grouped by area and tagged with `_Priority_` and `_Effort_`.

## Website

- [ ] **Visually verify the site (screenshots)** — No session has ever rendered a pixel. Serve
      locally (`cd website && npm run dev`), screenshot every page in both themes + mobile, confirm
      colors/layouts/gradients. _Priority: HIGH | Effort: 1 hr | Needs: browser_
- [ ] **Fix Lighthouse accessibility failures** — `color-contrast` and `label-content-name-mismatch`
      on root page. The 2026-07-21 AA contrast pass + 2026-07-25 color-token fixes may have resolved
      some; run Lighthouse to confirm what remains, then fix.
      _Priority: MEDIUM | Effort: 1-2 hr | Needs: Lighthouse_
- [ ] **Website performance audit** — Establish Lighthouse baselines (performance, accessibility,
      SEO, best-practices) on the post-redesign site. _Priority: MEDIUM | Effort: 1 hr | Needs: Lighthouse_
- [ ] **Test on real browsers** (Chrome, Firefox, Safari) — Verify the color-token fixes, CSP
      changes (Newsletter script), and OG images render correctly across browsers.
      _Priority: MEDIUM | Effort: 30 min | Needs: browsers_

## CI / Process

- [ ] **Decide Lighthouse CI gate-vs-monitor policy** — All assertions currently downgraded to
      advisory warnings. Proposed hybrid: gate on correctness (errors-in-console, HTTPS, viewport),
      monitor performance as warnings. Awaits decision before tightening `lighthouserc.json`.
      _Priority: MEDIUM | Effort: Decision + 30 min_
- [ ] **Configure or remove Lighthouse CI status checks** — `LHCI_GITHUB_APP_TOKEN` not configured;
      workflow runs but produces no status checks. Install the [Lighthouse CI GitHub
      App](https://github.com/apps/lighthouse-ci) + add the token, or remove the workflow.
      _Priority: LOW | Effort: 15 min | Needs: GitHub App install_
- [ ] **Enable branch protection / required status checks** — `master` is currently unprotected. No
      required checks enforce CI before merge. _Priority: MEDIUM | Effort: 15 min | Needs: `gh` admin_
- [ ] **Pin GitHub Actions to SHA hashes** — 30 unpinned `uses:` statements across
      `.github/workflows/*.yml`. Pin each to its commit SHA for supply-chain security.
      _Priority: LOW | Effort: 1 hr_

## Dependencies / Security

- [ ] **Resolve `art-dupl` upstream breakage** — `art-dupl@v0.3.0` doesn't compile (undefined
      symbols in its own `printer/html.go`); CI is pinned to v0.1.0. Fix in `LarsArtmann/art-dupl` or
      replace the dedup tool. _Priority: LOW | Effort: Research | Needs: external repo_
- [ ] **Prune orphaned GCP service account keys** — Deploy attempts accumulated keys; 1 pruned, up
      to 4 may remain. Needs `gcloud iam` + auth. Add a max-2-active-keys policy.
      _Priority: LOW | Effort: 30 min | Needs: gcloud auth_
- [ ] **Migrate to Go 1.27** — Drops `GOEXPERIMENT=jsonv2` requirement. Assess toolchain impact
      (CI matrix, Nix `go_1_26` pin) before bumping. _Priority: LOW | Effort: 2 hr_

## Documentation

- [ ] **Investigate unifying theme systems** — Landing page uses `.light` class on `<html>`;
      Starlight docs use `data-theme` attribute (documented as accepted trade-off in AGENTS.md).
      Revisit whether a unified theme system is worth the migration cost.
      _Priority: LOW | Effort: Research | Status: Accepted trade-off, revisit if pain grows_

- [ ] **Audit npm overrides** (`website/package.json`) — `brace-expansion`, `devalue`, `vite`,
      `yaml` overrides were added for Dependabot alerts. Re-evaluate whether each is still needed
      when bumping Astro/Starlight. _Priority: LOW | Effort: 10 min_

## Strategic (requires decision)

- [ ] **Define v3 maintenance mode vs v4 vision** — The core library is feature-complete (98.3%
      coverage, 18 detectors, all features done). Decide whether v3 is in maintenance mode or there is
      a v4 scope. This determines the entire strategic direction. See [ROADMAP.md](ROADMAP.md).
      _Priority: HIGH | Effort: Decision_
- [ ] **Evaluate `golangci-lint` plugin opportunity** — gogenfilter is a natural fit as a
      golangci-lint plugin for auto-generated code detection during linting. Research feasibility and
      community interest. _Priority: MEDIUM | Effort: Research_
- [ ] **Design custom detector registration API** — Allow users to register their own detectors for
      proprietary code generators. Community extensibility play. _Priority: LOW | Effort: Design_
