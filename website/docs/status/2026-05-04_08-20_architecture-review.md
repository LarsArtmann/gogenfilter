# Architecture Review — gogenfilter Website

**Date:** 2026-05-04 08:20
**Scope:** `website/src/` — Astro + Starlight static site

## Current Architecture

```
src/
├── components/       # Reusable UI fragments (6 components)
├── content/docs/     # Starlight MDX documentation pages
├── data/             # Data layer — config, generators, features, types
├── layouts/          # Page shells (LandingLayout only)
├── pages/            # Routes (index.astro + og/[...slug].ts)
└── styles/           # Global CSS (Tailwind v4 tokens)
```

## Scalability Assessment

### Strengths

1. **Clean data/content separation.** Landing page content lives in `data/` (TypeScript), docs in `content/` (MDX). Adding a generator or feature requires editing one file.
2. **Single source of truth for config.** `siteConfig` in `data/config.ts` eliminates hardcoded URLs/descriptions.
3. **Starlight handles docs complexity.** Sidebar, search, page navigation all delegated to the framework — no custom code needed.
4. **Static output.** Zero server runtime, CDN-deployable. Scales to any traffic level.

### Weaknesses

1. **index.astro is a monolith** (229 lines, 13KB). It contains 7 distinct sections that should be individual components. This is the highest-friction file in the project.
2. **No component library pattern.** `Card`, `Section`, `SectionHeading` patterns are repeated 8+ times via copy-pasted Tailwind classes. These should be extracted.
3. **Inline SVG icons** are duplicated between `features.ts` (raw HTML strings) and `index.astro` (inline markup). No shared icon system.
4. **No test infrastructure.** Zero tests for the website. No HTML validation, no broken-link checking, no visual regression.

## Modularity Assessment

| Aspect              | Rating | Notes                                                                                               |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| Component reuse     | 2/5    | Only 6 components; landing page sections not componentized                                          |
| Data centralization | 4/5    | Good — config, generators, features all in `data/`                                                  |
| Style system        | 4/5    | Tailwind v4 with design tokens — clean but needs Card/Section abstractions                          |
| Layout flexibility  | 3/5    | Only `LandingLayout` — can't add new page types easily                                              |
| Type safety         | 3/5    | `Generator`/`Feature` interfaces exist but `icons` in features.ts is untyped Record<string, string> |

## Service Orientation / Composability

This is a static marketing site — service orientation is not the primary concern. However, composability matters for maintainability:

### Current Composability Score: 3/5

- **Data components** are composable: `GeneratorGrid` reads from `generators.ts`, `FeatureGrid` from `features.ts`.
- **Layout components** are not composable: There's one layout. No concept of page "sections" as composable units.
- **Design tokens** are composable: Tailwind `@theme` block is the right pattern.

### Recommendations for Composability

1. Extract `Section` component with `maxWidth` prop (`'3xl' | '6xl'`) and `centered` boolean
2. Extract `Card` component with `border`, `padding`, `centered` props
3. Extract `SectionHeading` component (title + subtitle pattern used 6 times)
4. Move inline SVGs from `features.ts` to a proper `Icon` component with a name prop

## Architectural Verdict

The architecture is **appropriate for its current scope** — a single-page marketing site with Starlight docs. The main risk is that `index.astro` becomes unmaintainable as sections are added. Component extraction is the highest-value refactoring target.

The `data/` layer is well-factored. The `content/` layer is properly managed by Starlight. The deployment layer (Firebase + Nix) is clean.
