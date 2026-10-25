# Releasing gogenfilter

> **Forgejo-primary flow (2026-10-25).** This repo is canonical on Forgejo
> (`forgejo.home.lan/lars/gogenfilter`); GitHub is a push mirror. Tags are cut
> here; the Forgejo release is created by CI; the tag propagates to GitHub and
> then to the Go module proxy. Effective as soon as the Forgejo flip has run
> (2026-10-25 migration; see `docs/planning/2026-10-25_17-13_forgejo-ci-migration-pareto-plan.md`).

This runbook covers cutting a new release end-to-end. Every step is verifiable.

## Prerequisites

- You are on `master` with a clean working tree (`git status` clean).
- `origin` points at Forgejo (`git remote -v` shows
  `ssh://forgejo@forgejo.home.lan/lars/gogenfilter.git`); `github` is the fallback mirror remote.
- All CI checks are green on the commit you plan to release (Forgejo `ci` workflow).
- Nix is available (this project uses `flake.nix` for all build automation).

## 0. Pre-release checklist

Before starting the release process, verify ALL of the following:

- [ ] **CI is green** — The Forgejo `ci` workflow passed on the latest master
      commit (test, race, coverage ≥98%, lint, plugin, dedup, docs, vulncheck).
- [ ] **`nix flake check` passes** — No vendorHash mismatches, no test failures.
- [ ] **`nix run .#lint` passes** — Zero golangci-lint issues.
- [ ] **`nix run .#test` passes** — All tests pass locally.
- [ ] **Docs are fresh** — `nix run .#gendocs && git diff --exit-code` shows no changes.
- [ ] **CHANGELOG is complete** — All changes since the last release are documented under `[Unreleased]`.
- [ ] **No uncommitted changes** — `git status` is clean (BuildFlow auto-commits may create unexpected commits; verify the log).
- [ ] **Commit message convention** — The release commit will use `release: vX.Y.Z` format.
- [ ] **Website builds** — `cd website && pnpm install && pnpm run build` succeeds (if website files changed).

> **BuildFlow note**: BuildFlow runs continuously and may auto-commit changes mid-session.
> Check `git log --oneline -5` and `git status` before tagging to ensure the working tree
> reflects your intended release state.

## 1. Run the full quality gate

```sh
nix flake check          # build + tests in sandbox + treefmt
nix run .#lint           # golangci-lint (0 issues required)
nix run .#test           # go test ./...
nix run .#gendocs && git diff --exit-code   # docs freshness
```

Every command must pass. If `nix flake check` reports a `vendorHash` mismatch, update
`vendorHash` in `flake.nix` to the "got" hash and re-run.

## 2. Update CHANGELOG

1. Move entries from `## [Unreleased]` to a new `## [vX.Y.Z] — YYYY-MM-DD` section in
   **both** `CHANGELOG.md` and `website/src/content/docs/changelog.mdx`.
2. Ensure both files have identical version headers (CI checks this).
3. Verify compare-reference links at the bottom of both files cover the new version.
4. Leave an empty `## [Unreleased]` section at the top.

The release workflow cuts the release notes from the CHANGELOG section — an empty or
missing `## [vX.Y.Z]` section FAILS the release pipeline (`scripts/release-notes.sh --require`).

## 3. Bump the version

Update the version in:

- `TODO_LIST.md` header (`**Current version:**`)
- `ROADMAP.md` (if it tracks current version)
- `doc.go` (if it references a version)

The Go module version (`/v3`) does **not** change for minor/patch releases — only a
major bump (v4) would change the import path.

## 4. Commit and tag

```sh
git add -A
git commit -m "release: vX.Y.Z"
git tag vX.Y.Z
git push origin master vX.Y.Z
```

Use the convention `release: vX.Y.Z` for the commit message. The tag MUST be `vX.Y.Z`
(not `X.Y.Z`) — this is what the Go module proxy and releases expect.

## 5. What the tag push triggers (automated)

1. **`release` workflow on Forgejo** — gates (`nix flake check`, lint, test), extracts
   the CHANGELOG section, creates the **Forgejo release** via the API, and — when the
   `GH_RELEASE_PAT` secret is set — also creates the **GitHub release** (decision D2:
   users browse github.com).
2. **Push mirror → GitHub** — the tag and commits reach `github.com/LarsArtmann/gogenfilter`
   (sync-on-commit, 8h interval worst case).
3. **Go module proxy** — picks the tag up from GitHub within minutes of the mirror sync
   (`GOPROXY` consumers are unaffected by where the release notes live).

## 6. Verify

- [ ] Forgejo release page shows the new release with CHANGELOG notes
      (`https://forgejo.home.lan/lars/gogenfilter/releases`)
- [ ] GitHub release exists (if `GH_RELEASE_PAT` set) and the tag arrived via the mirror
- [ ] `pkg.go.dev/github.com/LarsArtmann/gogenfilter/v3` shows the new version
- [ ] `go install github.com/LarsArtmann/gogenfilter/v3@latest` works

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Major (v4)**: Breaking API changes, new import path (`/v4`)
- **Minor (v3.X)**: New detectors, new features (backward-compatible)
- **Patch (v3.X.Y)**: Bug fixes, docs, CI improvements

## Rollback

If a release has a critical bug:

1. Do NOT delete the tag (consumers may have already pinned it).
2. Cut a patch release (`vX.Y.Z+1`) with the fix.
3. If the tag itself is wrong (e.g., tagged the wrong commit), delete it on Forgejo
   (release page → delete, which removes the tag) and let the push mirror propagate the
   deletion — but only if no consumer could have fetched it yet.
