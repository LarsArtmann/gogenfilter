# Deepening Opportunities — gogenfilter Website

**Date:** 2026-05-04 08:20

Using vocabulary from the improve-codebase-architecture skill: **module**, **interface**, **seam**, **adapter**, **depth**, **leverage**, **locality**.

---

## Candidate 1: Extract Section Module from index.astro

**Files:** `src/pages/index.astro` (229 lines), `src/components/` (6 components)

**Problem:** The landing page is a flat 229-line file with 7 sections that each follow the same pattern: `<section data-animate class="py-24 relative">` → `<div class="max-w-{N}xl mx-auto px-6">` → content. This is a **shallow module** — the interface (section wrapper) is repeated 7 times instead of being concentrated once.

**Solution:** Create a `Section.astro` component that encapsulates the section wrapper pattern. Props: `maxWidth: '3xl' | '6xl'`, `centered: boolean`, `animate: boolean`.

**Benefits:**
- **Locality:** Section wrapper change (e.g., adding a new `data-*` attribute) happens in one place, propagates to all 7 sections.
- **Leverage:** New page sections use `<Section>` instead of copy-pasting 40 chars of CSS classes.
- **Test surface:** Section layout can be tested independently.

---

## Candidate 2: Extract Card Module

**Files:** `src/pages/index.astro`, `src/components/FeatureGrid.astro`, `src/components/GeneratorGrid.astro`

**Problem:** The card CSS pattern `p-6 rounded-xl border border-border bg-bg-card` appears 8+ times across 3 files. Variants exist (centered, accent border, dashed border). This is duplicated knowledge — the "card" concept has no module.

**Solution:** Create a `Card.astro` component. Props: `variant: 'default' | 'accent' | 'dashed'`, `centered: boolean`, `padding: 'sm' | 'md'`, `as: 'div' | 'a'` (for linked cards).

**Benefits:**
- **Locality:** Card style changes (e.g., new border radius) happen once.
- **Leverage:** GeneratorGrid and FeatureGrid both delegate to Card — less code in each.
- **Depth:** The Card interface is small (4 props) but covers all current variants.

---

## Candidate 3: Centralize Icon System

**Files:** `src/data/features.ts` (raw HTML strings), `src/pages/index.astro` (inline SVGs)

**Problem:** Icons are stored as raw HTML strings in `features.ts` (injected via `set:html`) and duplicated as inline SVGs in `index.astro`. The icon system has no module — it's scattered across data files and templates.

**Solution:** Create an `Icon.astro` component with a `name` prop. Icons stored as a map of SVG paths (not full HTML strings). Component handles sizing, color, and `aria-hidden`.

**Benefits:**
- **Locality:** SVG path data centralized. Adding an icon = one entry.
- **Leverage:** `<Icon name="lightning" size="sm" />` is cleaner than raw HTML injection.
- **Type safety:** `name` prop typed to union of valid icon keys.

---

## Candidate 4: Extract ComparisonSection Data

**Files:** `src/pages/index.astro:124-155` (Why gogenfilter), `src/pages/index.astro:157-180` (Built for real tools)

**Problem:** Two sections in `index.astro` follow identical structural patterns — heading, subtitle, grid of cards — but their data is inline. They're not data-driven like `FeatureGrid` and `GeneratorGrid` are.

**Solution:** Extract the "Why gogenfilter" comparison data and "Built for real tools" use-case data into `data/` files (or inline arrays in the section component), then render via `.map()`.

**Benefits:**
- **Consistency:** All sections follow the same data-driven pattern.
- **Leverage:** Adding/removing a comparison point = editing data, not HTML.

---

## Prioritization

| # | Candidate                      | Impact | Effort | Leverage gained |
|---|-------------------------------|--------|--------|-----------------|
| 1 | Section module                | High   | 15min  | 7 → 1 for section wrappers |
| 2 | Card module                   | High   | 20min  | 8+ → 1 for card styles |
| 3 | Icon system                   | Medium | 30min  | 10+ → 1 for icon patterns |
| 4 | ComparisonSection data-driven | Low    | 15min  | Consistency only |

**Recommendation:** Start with 1 (Section) and 2 (Card) — they eliminate the most duplication for the least effort. Candidate 3 adds polish but isn't urgent.
