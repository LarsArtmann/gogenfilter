# Theme Unification + pnpm Overrides Audit

_Date: 2026-08-10_

## Summary

Resolved both Documentation TODO items: unified the landing page theme system with Starlight's
`data-theme` convention, and audited all 4 pnpm overrides finding all redundant.

## a. Theme System Unification (DONE)

### Problem

The landing page (`/`) and Starlight docs pages used **different theme mechanisms**:

| Aspect | Landing Page (old) | Starlight Docs |
| ------ | ------------------ | -------------- |
| DOM attribute | `.light` CSS class on `<html>` | `data-theme` attribute on `<html>` |
| localStorage key | `"theme"` | `"starlight-theme"` |
| Values | `"light"`, `"dark"` | `"light"`, `"dark"`, `"auto"` |
| CSS selector | `:root.light` | `:root[data-theme="light"]` |

This caused theme preference to **not persist across navigation** — a user who toggled light mode
on the landing page would see dark mode when navigating to docs (and vice versa).

### Solution

Migrated the landing page to use Starlight's `data-theme` convention:

1. **`global.css`**: `:root.light` → `:root[data-theme="light"]` (1 selector)
2. **`theme-init.js`**: Sets `document.documentElement.dataset.theme` instead of `.light` class.
   Reads `localStorage["starlight-theme"]` with backward-compat fallback to old `"theme"` key.
   Supports `"auto"` value (resolves via `prefers-color-scheme`).
3. **`header.js`**: Toggles `dataset.theme` attribute, writes to `localStorage["starlight-theme"]`.
   Media query listener checks for `"auto"` or unset preference.

### Scope

~15 lines changed across 3 files. No Starlight internals touched. No new dependencies.

### Verification

- Cannot run `pnpm run build` in current environment (no pnpm available)
- Verified via code review: CSS selectors correct, JS logic traced through all states, backward
  compatibility maintained via fallback key read
- Website CI (`website.yml`) will catch issues on next push to master

## b. pnpm Overrides Audit (AUDITED — action deferred)

### Findings

Analyzed all 4 overrides in `website/package.json` against the `package-lock.json` dependency tree:

| Override | Version | Requirers | Verdict |
| -------- | ------- | --------- | ------- |
| `brace-expansion` | `5.0.6` | **None** — zero references in lockfile | **Dead. Safe to remove.** |
| `devalue` | `5.8.1` | `astro@^5.8.1` only | Range already guarantees >=5.8.1; exact pin blocks patches |
| `vite` | `8.1.5` | `astro@^8.0.13` forces vite 8 | Pin only blocks patches |
| `yaml` | `2.8.3` | `yaml-language-server` pins 2.8.3 exact | Already safe without override |

**All 4 overrides are redundant.** The Astro v7 bump made the direct dependency ranges
sufficient to resolve safe versions.

### Why Not Removed

Removing overrides from `package.json` requires running `pnpm install` to regenerate
`package-lock.json`. pnpm is not available in the current development environment. Editing
`package.json` without regenerating the lockfile would break `pnpm install --frozen-lockfile` in CI.

### Recommended Action

```sh
cd website
# Remove all 4 entries from "overrides" in package.json
pnpm install          # regenerate lockfile
pnpm audit            # verify no new vulnerabilities
pnpm run build        # verify build still works
git add package.json package-lock.json
git commit -m "chore(website): remove redundant pnpm overrides after Astro v7 bump"
```

## c. Files Changed

| File | Change |
| ---- | ------ |
| `website/src/styles/global.css` | `:root.light` → `:root[data-theme="light"]` |
| `website/public/js/theme-init.js` | Migrated to `data-theme` + `starlight-theme` key |
| `website/public/js/header.js` | Migrated toggle to `data-theme` + `starlight-theme` key |
| `AGENTS.md` | Updated theme system entry, theme split-brain entry, pnpm overrides entry |
| `TODO_LIST.md` | Marked both items done/audited with findings |

## d. Context From Prior Session

The prior session (commits `61e0fb4`, `fdad49e`) shipped: `ScanError` branded type, v3.5.0 release
prep, golangci-lint v2 module plugin, ADR 004. All work was committed by the auto-commit daemon.
Working tree was clean at session start. No uncommitted work was at risk.

Remaining from prior session: tag v3.5.0 (needs user approval), publish plugin as v0.1.0 (needs
v3.5.0 tag first), add plugin CI job.
