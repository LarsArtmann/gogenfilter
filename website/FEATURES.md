# Features — gogenfilter Website

**Generated:** 2026-05-04
**Source:** Code audit of all source files in `website/src/`

## Landing Page

| Feature              | Status           | Details                                                                                 |
| -------------------- | ---------------- | --------------------------------------------------------------------------------------- |
| Hero section         | FULLY_FUNCTIONAL | Gradient headline, subtitle with dynamic generator count, dual CTA                      |
| Code preview         | FULLY_FUNCTIONAL | Syntax-highlighted code block with copy button, macOS window chrome                     |
| Generator grid       | FULLY_FUNCTIONAL | 11 generators with logos, linked cards (external URLs), non-linked fallback for generic |
| Feature grid         | FULLY_FUNCTIONAL | 6 feature cards with SVG icons from centralized data                                    |
| Two-phase explainer  | FULLY_FUNCTIONAL | Side-by-side Phase 1/Phase 2 cards with badge icons                                     |
| Comparison table     | FULLY_FUNCTIONAL | 3-column Regex vs gogenfilter vs AST Parse                                              |
| Use cases section    | FULLY_FUNCTIONAL | Linters / Code Quality / CI-CD cards with inline SVG icons                              |
| CTA section          | FULLY_FUNCTIONAL | Final call-to-action with arrow link                                                    |
| Scroll animations    | FULLY_FUNCTIONAL | IntersectionObserver fade-in on `[data-animate]` sections                               |
| Star on GitHub badge | FULLY_FUNCTIONAL | Links to GitHub repo from hero                                                          |

## Documentation (Starlight)

| Feature               | Status           | Details                                                           |
| --------------------- | ---------------- | ----------------------------------------------------------------- |
| Starlight integration | FULLY_FUNCTIONAL | Full docs site at `/docs/` with sidebar navigation                |
| PageFind search       | FULLY_FUNCTIONAL | Built-in search index (17 pages indexed)                          |
| Sitemap               | FULLY_FUNCTIONAL | Auto-generated `sitemap-index.xml`                                |
| Sidebar structure     | FULLY_FUNCTIONAL | Getting Started, Guides, API Reference, Generators, Community     |
| OG image generation   | FULLY_FUNCTIONAL | `astro-og-canvas` generates per-page OG images with accent border |

## Shared Configuration

| Feature          | Status           | Details                                                                      |
| ---------------- | ---------------- | ---------------------------------------------------------------------------- |
| Site config      | FULLY_FUNCTIONAL | `src/data/config.ts` — single source of truth for URLs, descriptions, author |
| Generator count  | FULLY_FUNCTIONAL | Derived from `generators.length` — auto-updates when generators are added    |
| Generator data   | FULLY_FUNCTIONAL | `src/data/generators.ts` — name, file pattern, URL, logo path                |
| Feature data     | FULLY_FUNCTIONAL | `src/data/features.ts` — icon key, title, description                        |
| Type definitions | FULLY_FUNCTIONAL | `src/data/types.ts` — Generator and Feature interfaces                       |

## Layout & Navigation

| Feature        | Status           | Details                                                                  |
| -------------- | ---------------- | ------------------------------------------------------------------------ |
| Landing layout | FULLY_FUNCTIONAL | `LandingLayout.astro` — HTML shell with SEO meta, OG tags, Twitter cards |
| Fixed header   | FULLY_FUNCTIONAL | Backdrop-blur nav with logo, docs link, GitHub link                      |
| Mobile nav     | FULLY_FUNCTIONAL | Hamburger toggle for screens < 640px                                     |
| Footer         | FULLY_FUNCTIONAL | Logo, MIT license, author link, docs/GitHub/pkg.go.dev links             |
| Logo component | FULLY_FUNCTIONAL | Inline SVG with configurable size and class prop                         |

## Design System

| Feature             | Status           | Details                                                                  |
| ------------------- | ---------------- | ------------------------------------------------------------------------ |
| Tailwind v4         | FULLY_FUNCTIONAL | CSS-first via `@import "tailwindcss"` with `@theme` tokens               |
| Custom color tokens | FULLY_FUNCTIONAL | bg-primary, bg-card, border, text-primary/secondary/muted, accent, amber |
| Custom fonts        | FULLY_FUNCTIONAL | Space Grotesk (sans) + JetBrains Mono (mono) via Astro font providers    |
| Fade-in animation   | FULLY_FUNCTIONAL | CSS keyframe + `@theme --animate-fade-in`                                |
| Light/Dark themes   | FULLY_FUNCTIONAL | CSS custom properties toggle, localStorage persistence                     |

## Deployment

| Feature          | Status           | Details                                        |
| ---------------- | ---------------- | ---------------------------------------------- |
| Firebase Hosting | FULLY_FUNCTIONAL | `firebase.json` with cache headers, clean URLs |
| Nix flake        | FULLY_FUNCTIONAL | dev, build, preview, deploy apps               |
| Static output    | FULLY_FUNCTIONAL | Pre-rendered HTML, zero server runtime         |
| Cache strategy   | FULLY_FUNCTIONAL | Immutable assets (1yr), HTML must-revalidate   |

## Accessibility

| Feature             | Status               | Details                                                          |
| ------------------- | -------------------- | ---------------------------------------------------------------- |
| Semantic HTML       | FULLY_FUNCTIONAL     | `<nav>`, `<main>`, `<footer>`, headings                          |
| Aria labels         | PARTIALLY_FUNCTIONAL | Nav toggle has aria-label; decorative SVGs missing `aria-hidden` |
| Alt text            | PARTIALLY_FUNCTIONAL | Generator logos use `alt=""` (decorative) — correct              |
| Color contrast      | UNKNOWN              | No audit performed                                               |
| Keyboard navigation | UNKNOWN              | Not verified                                                     |
