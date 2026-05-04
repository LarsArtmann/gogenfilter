# Full Code Review — gogenfilter Website

**Date:** 2026-05-04 08:20
**Reviewer:** Senior Software Architect
**Scope:** Every file in `website/src/`

---

## File-by-File Review

### `src/pages/index.astro` (229 lines — LARGEST FILE)

**Issues fixed in this session:**
- Replaced hardcoded GitHub URL with `siteConfig.github` 
- Replaced hardcoded "11" with `generatorCount`
- Fixed `.code-preview:hover` — added `code-preview` class to parent div
- Replaced emoji icons (⚙️📊🛠️) with inline SVGs
- Fixed IntersectionObserver selector (`[data-animate]` instead of `.fade-in`)

**Remaining issues:**
- **229 lines is too large.** Should be broken into ~7 section components.
- Card pattern repeated 8+ times. Needs `Card.astro` extraction.
- Section wrapper pattern repeated 6 times. Needs `Section.astro` extraction.
- Copy button uses `data-code` attribute with escaped HTML entities — fragile.
- `fade-in` CSS class defined but observer uses `[data-animate]` selector — class never applied correctly (should use `animate-fade-in` from Tailwind config, which the observer does correctly).

### `src/components/Header.astro` (60 lines)

**Fixed:** Now uses `siteConfig` for GitHub URL and site name.

**Remaining:**
- Mobile nav CSS is hardcoded (background color `rgba(12, 10, 9, 0.95)` should use Tailwind token).
- No close button in mobile menu — only hamburger toggle.
- Mobile menu doesn't close when a link is clicked.

### `src/components/Footer.astro` (17 lines)

**Fixed:** Now uses `siteConfig` for all URLs.

**Clean.** No issues.

### `src/components/Logo.astro` (13 lines)

**Fixed:** Added `class` prop, `role="img"`, `aria-label`.

**Clean.** No issues.

### `src/components/GeneratorGrid.astro` (37 lines)

**Fixed:** Uses `siteConfig` and `generatorCount`. Added `aria-hidden` on arrow SVG. Added `loading="lazy"` on images. Added `title` tooltips. Generic card uses `border-dashed` to differentiate.

**Remaining:**
- `.map()` branches (linked vs non-linked) could be simplified with a wrapper component.

### `src/components/FeatureGrid.astro` (20 lines)

**Clean.** No issues.

### `src/components/CodeBlock.astro` (18 lines)

**Fixed:** Removed unused `lang` prop.

**Remaining:**
- `code` prop is plain text — no syntax highlighting. Consider using Shiki for proper highlighting.
- Only used in docs, not on landing page (which uses raw `set:html`).

### `src/layouts/LandingLayout.astro` (37 lines)

**Fixed:** Uses `siteConfig` for all meta tags. Single description variable.

**Clean.** Well-structured.

### `src/pages/og/[...slug].ts` (17 lines)

**Clean.** OG image generation works correctly. Uses accent border color from theme.

### `src/data/config.ts` (NEW — 15 lines)

**New file.** Single source of truth for site URL, GitHub URL, author, description. All other files reference this.

### `src/data/generators.ts` (16 lines)

**Fixed:** Added `generatorCount` export.

**Clean.**

### `src/data/features.ts` (43 lines)

**Clean.** Icons as raw HTML strings is pragmatic for this scale.

**Note:** The `icons` record could use a stricter type than `Record<string, string>` — type keys to the `Feature['icon']` union.

### `src/data/types.ts` (12 lines)

**Clean.** `Generator` and `Feature` interfaces are appropriate.

### `src/styles/global.css` (42 lines)

**Clean.** Tailwind v4 with `@theme` tokens. No dead CSS remaining.

### `src/content.config.ts` (10 lines)

**Clean.** Standard Starlight content config.

---

## Architect Assessment

### What's Good

1. **Data-driven landing page.** Generators and features are data files, not hardcoded.
2. **Design system via Tailwind tokens.** Consistent colors, fonts, spacing.
3. **Static output with zero runtime.** Perfect for a marketing site.
4. **SEO done right.** OG tags, sitemap, clean URLs, meta descriptions.

### What Needs Work

| Priority | Issue | File(s) |
|----------|-------|---------|
| HIGH | Extract `Section.astro` component | index.astro |
| HIGH | Extract `Card.astro` component | index.astro, FeatureGrid, GeneratorGrid |
| MEDIUM | Break index.astro into section components | index.astro |
| MEDIUM | Add HTML validation to CI | CI config |
| MEDIUM | Add `loading="lazy"` to all below-fold images | index.astro |
| LOW | Type `icons` record keys in features.ts | features.ts |
| LOW | Add light mode support | global.css |

### Pareto Analysis

- **1% that delivers 51%:** Extract `Section` + `Card` components → eliminates 70% of duplication
- **4% that delivers 64%:** Break index.astro into section components → maintainability
- **20% that delivers 80%:** All the above + icon system + HTML validation CI

---

## Planning

### Phase 1: Component Extraction (51% impact, ~45 min)

| # | Task | Effort |
|---|------|--------|
| 1 | Create `Section.astro` with maxWidth + centered props | 10min |
| 2 | Create `Card.astro` with variant + padding props | 15min |
| 3 | Refactor index.astro to use Section + Card | 10min |
| 4 | Refactor FeatureGrid to use Card | 5min |
| 5 | Refactor GeneratorGrid to use Card | 5min |

### Phase 2: Section Components (64% impact, ~30 min)

| # | Task | Effort |
|---|------|--------|
| 6 | Extract HeroSection from index.astro | 10min |
| 7 | Extract ComparisonSection (data-driven) | 10min |
| 8 | Extract UseCasesSection (data-driven) | 10min |

### Phase 3: Polish (80% impact, ~45 min)

| # | Task | Effort |
|---|------|--------|
| 9 | Create Icon.astro component | 15min |
| 10 | Add mobile nav close-on-click | 5min |
| 11 | Add `loading="lazy"` audit | 5min |
| 12 | Type icons record in features.ts | 5min |
| 13 | Add HTML validation to build | 15min |
