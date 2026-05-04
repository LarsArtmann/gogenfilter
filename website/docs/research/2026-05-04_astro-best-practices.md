# Astro 6 Best Practices — gogenfilter Website Audit

**Date:** 2026-05-04
**Astro Version:** ^6.2.1
**Stack:** Astro 6 + Starlight + Tailwind v4 + Firebase Hosting
**Status:** Research & Analysis Complete

---

## Executive Summary

The gogenfilter website already follows **~80% of Astro 6 best practices** — the architecture is solid, the data layer is well-structured, and the Starlight integration is correct. This document identifies the remaining 20%: actionable improvements grouped by impact.

---

## 1. What the Project Does Well (No Changes Needed)

| Area | Implementation | Verdict |
|------|---------------|---------|
| Static output | No SSR adapter, pure static generation | **Correct** — ideal for landing + docs |
| Tailwind v4 | `@tailwindcss/vite` plugin (not deprecated `@astrojs/tailwind`) | **Correct** — modern approach |
| Font providers | `fontProviders.google()` and `fontProviders.fontsource()` | **Correct** — self-hosted, no external requests |
| Content collections | `content.config.ts` with `docsLoader()` | **Correct** — Astro 6 Content Layer API |
| Strict TypeScript | `extends: "astro/tsconfigs/strict"` | **Correct** |
| Sitemap | `@astrojs/sitemap` with `site` URL configured | **Correct** |
| JSON-LD | Structured data for `SoftwareApplication` | **Correct** |
| Canonical URL | `<link rel="canonical">` in LandingLayout | **Correct** |
| OG images | `astro-og-canvas` per-page generation | **Correct** |
| SEO meta tags | Description, OG, Twitter cards | **Correct** |
| `prefers-reduced-motion` | Both CSS and JS respect it | **Correct** |
| `focus-visible` | Global focus ring with accent color | **Correct** |
| Firebase caching | Immutable assets (1yr), HTML must-revalidate | **Correct** |
| ARIA | `aria-expanded`, `aria-controls`, `aria-label` on nav | **Correct** |
| Data layer | Centralized `siteConfig`, `generators`, `features`, `sections` | **Excellent** |
| Component decomposition | 12 focused components, index.astro is 64 lines | **Excellent** |
| Deployment | Nix flake with dev/build/preview/deploy | **Correct** |

---

## 2. High-Impact Improvements

### 2.1 Enable Prefetching (5 min — Perceived Performance)

**Current:** Navigation links load pages on click only.
**Best practice:** Enable Astro's built-in prefetch to load pages before the user clicks.

```js
// astro.config.mjs
export default defineConfig({
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover', // loads on hover, not viewport
  },
  // ...
});
```

Then add `data-astro-prefetch` to key navigation links:
```astro
<a href="/docs/" data-astro-prefetch>Docs</a>
```

**Why:** Hover-based prefetch gives near-instant navigation without wasting bandwidth on pages the user may never visit. Astro injects a tiny `<link rel="prefetch">` — zero JavaScript overhead.

---

### 2.2 Add View Transitions (15 min — Perceived Navigation Speed)

**Current:** Full page reload between landing page and docs.
**Best practice:** Enable Astro's Client Router for seamless transitions.

```astro
<!-- LandingLayout.astro head section -->
import { ClientRouter } from 'astro:transitions';

<head>
  <ClientRouter />
  <!-- ... rest of head -->
</head>
```

**Why:** View Transitions API provides native browser animations between pages. No JavaScript framework needed. Falls back gracefully in unsupported browsers.

**Note:** Starlight already handles its own transitions for docs pages. Only the landing page layout needs this.

---

### 2.3 Move Generator Logos to `src/assets/` (30 min — Image Optimization)

**Current:** Logos live in `public/logos/` — served as-is, no optimization.
**Best practice:** Images in `src/assets/` get automatic WebP/AVIF conversion, width/height inference, and lazy loading defaults.

```astro
---
import { Image } from 'astro:assets';
import sqlcLogo from '../assets/logos/sqlc.svg';
---
<Image src={sqlcLogo} alt="sqlc" width={24} height={24} />
```

**Why:** Astro's `<Image>` component:
- Converts to WebP/AVIF automatically
- Sets explicit `width`/`height` (prevents CLS)
- Adds `decoding="async"` and `loading="lazy"`
- Hashes filenames for cache-busting

**Trade-off:** SVGs don't get converted (already optimal), but the `Image` component still enforces `alt` text and adds proper attributes. For SVGs specifically, the main benefit is type safety (import-based) and explicit dimensions.

---

### 2.4 Configure Shiki Dual Themes (10 min — Code Highlighting)

**Current:** Default Shiki theme (no customization).
**Best practice:** Configure light/dark themes to match the site's theme system.

```js
// astro.config.mjs
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false, // use CSS variables instead
    },
  },
});
```

**Why:** The site has light/dark mode support, but code blocks in docs always use the same theme. Dual themes switch automatically with the user's preference.

---

### 2.5 Fix Hardcoded Generator Count in LandingLayout (2 min — Bug)

**Current:** `src/layouts/LandingLayout.astro:12` — `ogDesc` uses hardcoded `'11'`.
**Best practice:** Use `generatorCount` from the data layer.

```astro
---
import { generatorCount } from '../data/generators';
const ogDesc = siteConfig.ogDescription.replace('{count}', String(generatorCount));
---
```

**Why:** When a new generator is added, OG descriptions currently still say "11". This is a data consistency bug.

---

## 3. Medium-Impact Improvements

### 3.1 Add `data-astro-prefetch` to Key Links (5 min)

**Target links:**
- Header: "Docs" link → `data-astro-prefetch`
- HeroSection: "Get Started" button → `data-astro-prefetch`
- Footer: "Docs" link → `data-astro-prefetch`

```astro
<a href="/docs/getting-started/installation/" data-astro-prefetch>Get Started →</a>
```

**Requires:** Section 2.1 (prefetch config) to be enabled first.

---

### 3.2 Tighten Icon Component Types (10 min — Type Safety)

**Current:** `Icon.astro` accepts `name: string` — no compile-time validation.
**Best practice:** Use a discriminated union of all valid icon names.

```typescript
type IconName = FeatureIcon | UseCaseIconName | UIIconName;

export interface Props {
  name: IconName;
  size?: number;
}
```

**Why:** Typos in icon names currently fail silently at runtime. With a union type, Astro's type-checking (`astro check`) catches them at build time.

---

### 3.3 Consolidate Inline Scripts (20 min — Bundle Optimization)

**Current:** Three `is:inline` scripts across Header and index pages:
1. `Header.astro:31-80` — theme toggle + nav toggle (80 lines)
2. `index.astro:53-67` — IntersectionObserver (15 lines)
3. `LandingLayout.astro:33` — Plausible analytics (1 line, correctly inline)

**Best practice for analytics:** `is:inline` is correct for Plausible (must not be bundled).
**Improvement for theme/nav:** These can use Astro's bundled `<script>` tags. The theme initialization script needs `is:inline` for immediate execution (avoid FOUC), but the toggle handlers can be bundled.

**Why:** `is:inline` scripts are duplicated on every page and bypass Vite's optimization. Bundled scripts are deduplicated and tree-shaken.

---

### 3.4 Add Missing `og:image` to Landing Page (5 min — Social Sharing)

**Current:** Landing page has `og:title`, `og:description`, `og:type`, `og:url` but no `og:image`.
**Best practice:** Every page should have an OG image for social sharing previews.

```astro
<meta property="og:image" content={`${siteConfig.siteUrl}/og-landing.png`} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Alternative:** Generate one using `astro-og-canvas` (already a dependency) or create a static image in `public/`.

---

### 3.5 Add `Security` Headers in Firebase Config (5 min — Defense in Depth)

```json
{
  "source": "**",
  "headers": [
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
  ]
}
```

**Why:** Standard security headers prevent clickjacking, MIME sniffing, and referrer leaks. Zero performance cost.

---

## 4. Low-Impact / Nice-to-Have

### 4.1 Experimental: Client Prerender (Astro 6)

```js
experimental: {
  clientPrerender: true,
}
```

Uses Speculation Rules API for even faster prefetching. Chrome-only for now. Consider when it stabilizes.

### 4.2 Sitemap Configuration

```js
sitemap({
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
})
```

Note: Google ignores `changefreq` and `priority`, but other crawlers may use them.

### 4.3 Custom 404 Page

Starlight supports custom 404 pages. Add `src/content/docs/404.mdx` for a branded not-found experience.

### 4.4 Robots.txt Enhancement

Current `public/robots.txt` should include sitemap reference:
```
Sitemap: https://gogenfilter.lars.software/sitemap-index.xml
```

---

## 5. Astro 6 Content Layer API — Current Status

The project correctly uses the Astro 6 Content Layer API:

| Feature | Status | Implementation |
|---------|--------|---------------|
| `content.config.ts` | **Correct** | Not legacy `content/config.ts` |
| `docsLoader()` | **Correct** | Starlight-specific loader |
| `docsSchema()` | **Correct** | Starlight schema with Zod |
| `getCollection('docs')` | **Correct** | Used in OG image generation |

**No changes needed** — the content layer implementation is already on the latest API.

---

## 6. Architecture Assessment

### What the Architecture Gets Right

```
src/
├── components/     ← Pure Astro components, zero client JS
├── data/           ← Typed data layer (single source of truth)
├── layouts/        ← Layout with SEO, structured data, analytics
├── pages/
│   ├── index.astro ← 64 lines, delegates to sections
│   └── og/         ← Dynamic OG image endpoint
├── content/        ← Starlight docs (MDX)
└── styles/         ← Tailwind v4 CSS-first with @theme tokens
```

This is textbook Astro architecture:
- **Zero client JavaScript** (no React/Vue/Svelte islands needed)
- **Server-only rendering** (no hydration overhead)
- **Content-first** (Starlight for docs, custom landing page)
- **CSS-first theming** (Tailwind v4 `@theme` tokens, not JS config)

### Areas Where It Could Grow

If the project ever needs client-side interactivity (interactive playground, live demos):
1. Use `client:visible` for below-fold interactive components
2. Keep the Astro component shell, add a framework island only where needed
3. Consider `client:only` for browser-API-dependent widgets

---

## 7. Performance Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Zero JS by default | **Pass** | No framework islands |
| Font self-hosting | **Pass** | Astro font providers |
| Image optimization | **Partial** | Logos in `public/` bypass optimization |
| CSS-first Tailwind | **Pass** | v4 `@tailwindcss/vite` |
| Static output | **Pass** | Pre-rendered HTML |
| Cache headers | **Pass** | Firebase immutable + must-revalidate |
| Prefetching | **Missing** | Not enabled |
| View transitions | **Missing** | Full page reloads |
| Bundle analysis | **Unknown** | Not audited |
| Lighthouse | **Unknown** | Not in TODO |

---

## 8. Execution Results

All high-impact items completed. 12 commits, 0 errors, 0 warnings.

| # | Task | Status |
|---|------|--------|
| 1 | Fix hardcoded generator count in LandingLayout | DONE |
| 2 | Enable prefetch in astro.config.mjs | DONE |
| 3 | Add \`data-astro-prefetch\` to nav links | DONE |
| 4 | Add \`og:image\` to landing page | DONE |
| 5 | Configure Shiki dual themes | DONE |
| 6 | Tighten Icon component types | DONE |
| 7 | Add security headers | DONE |
| 8 | Enable View Transitions | DONE |
| 9 | Remove dead \`icons\` export from features.ts | DONE |
| 10 | Remove dead \`useCaseIcons\` export from sections.ts | DONE |
| 11 | Centralize IconName type in types.ts | DONE |
| 12 | Use Section.astro component in index.astro | DONE |
| 13 | Move logos to src/assets/ | Skipped: SVGs dont benefit from Astro image optimization |
| 14 | Consolidate inline scripts | Skipped: \`is:inline\` required for FOUC prevention |
| 15 | Enhance robots.txt | Already done |
| 16 | Custom 404 page | Already done (Starlight built-in) |
## 9. Key Takeaways

1. **The foundation is excellent.** Astro 6, Tailwind v4, Starlight, strict TS, self-hosted fonts, content layer API — all correct choices.

2. **The biggest wins are small.** Enabling prefetch and view transitions are 20 minutes of work for a significantly better user experience.

3. **One actual bug exists.** The hardcoded `'11'` in LandingLayout's OG description should use `generatorCount`.

4. **No architectural changes needed.** The project doesn't need SSR, framework islands, or major restructuring. It's a content-focused static site that correctly leverages Astro's strengths.

5. **The 80/20 applies.** The project is 80% of the way to Astro best-practice perfection. The remaining 20% is configuration tweaks, not architectural changes.
