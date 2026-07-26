# ADR-001: Warm-Stone Background + Three-Color Accent System

**Date:** 2026-07-25
**Status:** Accepted

## Context

The gogenfilter website needed a color system that:

1. **Feels warm and crafted** — not the default cold/neutral Tailwind gray that every generated docs site uses.
2. **Passes WCAG AA contrast** (≥4.5:1) on all text and interactive elements in both dark and light modes.
3. **Provides visual variety** without being chaotic — a single accent color makes every section look identical; too many colors looks unprofessional.
4. **Works with expressive-code** syntax highlighting (dracula dark / github-light light themes) without clashing.

## Decision

### Background: Warm Stone Palette

Use Tailwind's `stone` family (warm gray with a slight brown undertone) for backgrounds, borders, and text. Not `zinc`, `neutral`, or `slate` (all cool-toned).

| Token                    | Dark                             | Light                               |
| ------------------------ | -------------------------------- | ----------------------------------- |
| `--color-bg-primary`     | `#0c0a09` (stone-950)            | `#fafaf9` (stone-50)                |
| `--color-bg-raised`      | `#1c1917` (stone-900)            | `#f5f5f4` (stone-100)               |
| `--color-bg-card-solid`  | `#292524` (stone-800)            | `#ffffff`                           |
| `--color-text-primary`   | `#fafaf9` (stone-50)             | `#1c1917` (stone-900)               |
| `--color-text-secondary` | `#d6d3d1` (stone-300)            | `#44403c` (stone-700)               |
| `--color-text-muted`     | `#8e8884` (custom warm)          | `#66605a` (custom warm)             |
| `--color-border`         | `rgba(68,64,60,...)` (stone-700) | `rgba(231,229,228,...)` (stone-200) |

### Accent: Three-Color Rotation

Use three accent colors instead of one. Feature cards and use-case cards rotate through them:

| Token                       | Role                             | Dark      | Light                |
| --------------------------- | -------------------------------- | --------- | -------------------- |
| `--color-accent` (cyan)     | Brand / primary actions          | `#22d3ee` | `#0e7490` (cyan-700) |
| `--color-amber` (amber)     | Secondary / "human-written code" | `#f59e0b` | `#d97706`            |
| `--color-success` (emerald) | Positive outcome / "filtered"    | `#10b981` | `#059669`            |

Each card in `Feature` or `UseCase` specifies an `AccentColor` field (`"accent"` | `"amber"` | `"success"`) in `src/data/types.ts`.

### Contrast Decisions

- **`--color-on-accent` token** — Text on accent backgrounds uses `#0c0a09` (dark) / `#ffffff` (light). White on dark-mode `#22d3ee` was 1.81:1 (FAILS AA). All `bg-accent` buttons use `text-on-accent`.
- **Light-mode `--color-accent` is darker** (`#0e7490` not `#0891b2`) — `#0891b2` on white = 3.53:1 (fails AA for text).
- **Light-mode hover darkens** (`#155e75`) — opposite from dark mode (which lightens) because light mode uses white text on buttons.
- **Logo gradient stays hardcoded** `#22d3ee`/`#0891b2` — brand identity doesn't change with theme.

## How to Add a New Accent Color

1. **Define the token** in `website/src/styles/global.css` under both `:root` (dark) and `:root.light`:

   ```css
   --color-purple: #a78bfa; /* dark mode */
   --color-purple-hover: #c4b5fd; /* dark mode hover (lighten) */
   ```

   ```css
   :root.light {
     --color-purple: #7c3aed; /* light mode (darker for AA) */
     --color-purple-hover: #6d28d9; /* light mode hover (darken) */
   }
   ```

2. **Add to `AccentColor` type** in `website/src/data/types.ts`:

   ```ts
   export const ACCENT_COLORS = ["accent", "amber", "success", "purple"] as const;
   export type AccentColor = (typeof ACCENT_COLORS)[number];
   ```

3. **Wire the Tailwind utility** — add a mapping in components that consume `AccentColor` (e.g., `Feature.astro`, `UseCase.astro`). The pattern is `bg-{color}` / `text-{color}` / `border-{color}`.

4. **Verify contrast** — every text/accent pair must pass WCAG AA (≥4.5:1) on every surface it appears on (`bg-primary`, `bg-raised`, `bg-card-solid`, `bg-code`). Use a contrast checker.

5. **Update `--color-on-accent`** if the new color is used for buttons/links with text on top. Dark text (`#0c0a09`) works on bright colors; white text requires the accent to be dark enough (≥4.5:1).

## Consequences

- **Three accents create natural visual rhythm** — sections alternate `bg-primary`/`bg-raised` via the `tone` prop on `Section.astro`, and cards rotate accent colors.
- **More maintenance surface** — each new accent needs dark + light + hover variants that all pass AA.
- **Expressive-code themes are separate** — dracula/github-light colors are for code content only, not UI chrome. Design-system tokens are for buttons, borders, backgrounds.
