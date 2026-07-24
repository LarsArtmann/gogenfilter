# TODO List

**Updated:** 2026-07-24
**Current version:** v3.3.1

> Open work only. Completed items live in [CHANGELOG.md](CHANGELOG.md); long-term ideas live in
> [ROADMAP.md](ROADMAP.md). Items are grouped by area and tagged with `_Priority_` and `_Effort_`.

## Website

- [ ] **Visually verify the site (screenshots)** — No session has ever rendered a pixel. Three
      consecutive design sessions verified structure/CSS/WCAG math but never opened a browser. Serve
      locally (`cd website && npm run dev`), screenshot every page in both themes + mobile, confirm
      colors/layouts/gradients. _Priority: HIGH | Effort: 1 hr_
- [ ] **Fix 3 color-token bugs** (from `2026-07-21_02-17` color review, all confirmed still open):
      (1) `--color-accent-dim` light mode is `rgba(8,145,178,0.1)` but accent is `#0e7490` →
      `rgba(14,116,144,0.1)`; (2) `--color-border` light mode is cool zinc-200 on a warm-stone palette →
      warm stone equivalent; (3) `--color-code-comment` is a dead token (0 refs outside CSS) → delete or
      wire up. _Priority: MEDIUM | Effort: 30 min_
- [ ] **Update Starlight `head` meta description** — `astro.config.mjs:120` still reads the old
      "Detect and filter auto-generated Go code files..." on every docs page, diverging from the new
      "Stop linting code no human wrote" positioning. _Priority: MEDIUM | Effort: 5 min_
- [ ] **Verify Newsletter form under CSP** — `Newsletter.astro` uses an inline `onsubmit` handler;
      `script-src` has no `'unsafe-hashes'`. The form may be silently broken. Move to
      `addEventListener` in an external script, or add the hash. _Priority: MEDIUM | Effort: 20 min_
- [ ] **Investigate theme split-brain** — Landing page uses `.light` class on `<html>` (custom JS);
      Starlight docs use `data-theme="light"` + own toggle. Two independent theme systems with separate
      persistence. Unify or document why they're intentionally separate. _Priority: LOW | Effort: 2 hr_
- [ ] **Fix Lighthouse accessibility failures** — `color-contrast` and `label-content-name-mismatch`
      on root page. The 2026-07-21 AA contrast pass may have resolved some; run Lighthouse to confirm
      what remains, then fix. _Priority: MEDIUM | Effort: 1-2 hr_
- [ ] **Website performance audit** — Establish Lighthouse baselines (performance, accessibility,
      SEO, best-practices) on the post-redesign site. Bigger fonts/colors may affect CLS.
      _Priority: MEDIUM | Effort: 1 hr_
- [ ] **Add "Who Uses gogenfilter" CTA to landing page** — Dependents page exists at `/dependents`
      but is only linked from the docs sidebar. _Priority: LOW | Effort: 15 min_

## CI / Process

- [ ] **Decide Lighthouse CI gate-vs-monitor policy** — All assertions currently downgraded to
      advisory warnings. Proposed hybrid: gate on correctness (errors-in-console, HTTPS, viewport),
      monitor performance as warnings. Awaits decision before tightening `lighthouserc.json`.
      _Priority: MEDIUM | Effort: Decision + 30 min_
- [ ] **Configure or remove Lighthouse CI status checks** — `LHCI_GITHUB_APP_TOKEN` not configured;
      workflow runs but produces no status checks. Install the [Lighthouse CI GitHub
      App](https://github.com/apps/lighthouse-ci) + add the token, or remove the workflow.
      _Priority: LOW | Effort: 15 min_
- [ ] **Enable branch protection / required status checks** — `master` is currently unprotected. No
      required checks enforce CI before merge. _Priority: MEDIUM | Effort: 15 min_
- [ ] **Add `cmd/gendocs` integration test** — The generator binary has 0% coverage. A simple test
      (run gendocs, verify output files exist and contain expected markers) would prevent regressions.
      _Priority: LOW | Effort: 1 hr_
- [ ] **Add gendocs single-pass idempotency test** — gendocs needed 2 passes to converge from a
      stale state. Add a test that asserts `go generate ./...` is idempotent (second run produces no
      diff). _Priority: LOW | Effort: 30 min_
- [ ] **Add `nix run .#gendocs` app** — The generator is only runnable via `go run ./cmd/gendocs`.
      Add a flake app alias. _Priority: LOW | Effort: 15 min_

## Dependencies / Security

- [ ] **Resolve `art-dupl` upstream breakage** — `art-dupl@v0.3.0` doesn't compile (undefined
      symbols in its own `printer/html.go`); CI is pinned to v0.1.0. Fix in `LarsArtmann/art-dupl` or
      replace the dedup tool. _Priority: LOW | Effort: Research_
- [ ] **Prune orphaned GCP service account keys** — Deploy attempts accumulated keys; 1 pruned, up
      to 4 may remain. Needs `gcloud iam` + auth. Add a max-2-active-keys policy.
      _Priority: LOW | Effort: 30 min_

## Documentation

- [ ] **Review `docs/planning/`** — May contain outdated planning docs. Review and archive completed
      items. _Priority: LOW | Effort: 30 min_

## Strategic (requires decision)

- [ ] **Define v3 maintenance mode vs v4 vision** — The core library is feature-complete (98.4%
      coverage, 18 detectors, all features done). Decide whether v3 is in maintenance mode or there is
      a v4 scope. This determines the entire strategic direction. See [ROADMAP.md](ROADMAP.md).
      _Priority: HIGH | Effort: Decision_
- [ ] **Evaluate `golangci-lint` plugin opportunity** — gogenfilter is a natural fit as a
      golangci-lint plugin for auto-generated code detection during linting. Research feasibility and
      community interest. _Priority: MEDIUM | Effort: Research_
- [ ] **Design custom detector registration API** — Allow users to register their own detectors for
      proprietary code generators. Community extensibility play. _Priority: LOW | Effort: Design_
