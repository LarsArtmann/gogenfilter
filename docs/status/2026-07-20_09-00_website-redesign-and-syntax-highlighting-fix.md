# Status Report — Website Redesign & Syntax Highlighting Fix

**Date:** 2026-07-20 09:00  
**Session focus:** Landing page visual redesign + docs syntax highlighting bug fix  
**Trigger:** Girlfriend feedback ("too monotone", "logo could be bigger", "are you trying to sell me some service") + comparison to sqlc.dev + docs have no syntax highlighting

---

## What triggered this session

1. Non-techy feedback: site is "too monotone", logo too small, reads like a sales pitch for a paid service (it's a free MIT library).
2. sqlc.dev comparison: girlfriend liked their nav bar, bigger text, better 16:9 desktop layout.
3. **Critical bug:** docs pages (`/getting-started/installation/` and all MDX docs) had NO syntax highlighting.
4. Follow-up realization (surfaced by user): the hero copy doesn't make it clear on first sight what the project actually DOES or who it's FOR.

---

## A) FULLY DONE (verified: typecheck 0 errors, build 17 pages, html-validate pass, CSP clean)

### 1. Docs syntax highlighting bug — FIXED & HARDENED

- **Root cause found and fixed.** Astro's built-in CSP emitted `'sha256-...'` hash sources alongside `'unsafe-inline'` in the `style-src` directive. Per the CSP spec, when ANY hash/nonce source is present in a source list, `'unsafe-inline'` is **silently ignored**. This blocked every expressive-code token's inline `style="--0:#color;--1:#color"` attribute, stripping ALL color from docs code blocks.
- **`scripts/fix-csp.mjs` rewritten** to robustly strip ALL hash/nonce sources from `style-src` regardless of type (`sha256`/`sha384`/`sha512`/`nonce-*`), order, or count. The old regex only matched one exact sequence (`style-src 'self' 'unsafe-inline'` followed by only `sha256` hashes) and would silently fail on any format variation. New implementation normalizes spacing and strips defensively.
- **Expressive Code theme switched** from `github-dark` (muted, hard to distinguish from unhighlighted) to **`dracula`** (vivid: pink keywords, green functions, yellow strings, cyan types, purple keywords). Unmistakably highlighted.
- Verified: all 17 built pages have `style-src 'self' 'unsafe-inline'` with zero hash sources remaining.
- **This was the most important fix of the session.** The docs were genuinely broken for every visitor.

### 2. Logo redesigned

- Old: confusing "FP" letter mark at 28px.
- New: **funnel** (the literal concept — gogenfilter is a filter) on a cyan→teal gradient. Symmetric path. Updated in all three locations: `Logo.astro`, `public/favicon.svg`, `public/logo.svg`.
- Header bumped 28px → **40px**. Footer bumped 20px → 28px.

### 3. Nav bar redesigned (sqlc.dev-inspired)

- Bigger logo (40px) + bolder wordmark (`text-xl font-bold`).
- Cleaner split layout, wider container (`max-w-7xl`), taller bar (`h-[4.5rem]`).
- Bigger link text (`text-base font-medium`, was `text-sm`).
- GitHub as a subtle rounded-full pill with border.
- Added "Generators" nav link.
- More spacing between links (`gap-7`, was `gap-4`).

### 4. Layout widened for 16:9 desktop

- Narrow sections: `max-w-3xl` (48rem) → `max-w-5xl` (64rem).
- Wide sections: `max-w-6xl` (72rem) → `max-w-7xl` (80rem) — matches sqlc.dev's 1280px.
- Body text bumped across sections (`text-base`/`text-lg` where was `text-sm`).

### 5. Monochrome broken — 3-color accent system

- **Was:** single cyan accent on near-black. `amber` and `success` colors were defined in CSS but barely used.
- **Now:** warm three-color system actually USED: cyan (brand/primary) + amber (warmth/content phase) + emerald (positive outcome/filtered).
- Feature cards and use-case cards rotate through `accent`/`amber`/`success` via a new `AccentColor` field on `Feature` and `UseCase` types.
- Sections alternate between `bg-bg-primary` and a new `--color-bg-raised` tint (`#110e0c` dark / `#f3f2f0` light) via a new `tone` prop on `Section.astro`.
- Hero gets multi-color ambient glow (cyan blob + amber blob).
- Headline gets cyan→amber gradient on "generated".
- CTA gets a signature gradient banner (cyan→transparent→amber wash + glow).

### 6. Copy partially softened

- "Engineered for performance" → "Built to do one thing well."
- "Start filtering in seconds" → "Three lines. That's the whole API."
- Added "Free & MIT licensed" pill in hero badge row.
- CTA subtitle: "Free, MIT-licensed, and ready to drop into your next analyzer."
- Fixed typo: "structued" → "structured" in comparison data.
- Hero code block recolored to match dracula palette (was generic cyan/amber spans).

### 7. Documentation updated

- `AGENTS.md` updated with: CSP-highlighting root cause (the hash-ignores-unsafe-inline spec behavior), dracula theme decision, 3-color design system, funnel logo decision, hero custom code block replication pattern.

---

## B) PARTIALLY DONE

### Copy softening — incomplete

- I softened SOME copy but the core positioning problem (see section D) remains unaddressed. The hero still leads with the mechanism ("Detect and filter") not the problem/outcome.
- The comparison section copy was NOT touched and still reads as a SaaS pricing table.

### Section visual enrichment — done structurally, not visually verified

- All structural changes are in the built HTML/CSS (verified via grep). But I never rendered the page to visually confirm the result looks good (see section D).

---

## C) NOT STARTED

- Hero copy rewrite (the clarity fix proposed in conversation — "Stop linting code no human wrote")
- Comparison section redesign (still a SaaS pricing-table pattern)
- OG image regeneration (logo changed but `og/home.png` not updated)
- Mobile responsiveness testing of all new wider/bigger layouts
- Dependents page review/improvement
- Docs page layout/typography improvements (only highlighting was fixed, not docs design)
- Light mode visual verification of all new color additions
- Lighthouse / performance audit on new design
- 404 page review
- Newsletter component review (see questions)
- Starlight docs sidebar/copy review
- Print stylesheet verification

---

## D) TOTALLY FUCKED UP / FORGOT

### 1. I NEVER VISUALLY VERIFIED MY WORK — biggest failure

I ran typecheck, build, html-validate, grep checks for CSS colors, CSP verification — all passed. But I **never rendered the page and looked at it.** For a design task driven by VISUAL feedback ("too monotone", "logo too small"), this is inexcusable. I verified structure, not appearance. A color could clash, a layout could break, a gradient could look muddy — and I'd have no idea. I had the tools to serve the site locally (`astro dev` / `astro preview`) and view it, and I didn't.

### 2. I MISSED THE CLARITY PROBLEM entirely

The user's girlfriend said "are you trying to sell me some service" — I interpreted this as "too salesy" and added a "Free & MIT" pill. But the deeper issue is **the site doesn't make it clear what the project does on first sight.** I focused on aesthetics (monochrome, colors, logo size) and completely missed messaging clarity. The user had to explicitly call this out in a follow-up for me to notice. A senior designer would have caught this in the first pass.

### 3. The comparison section REINFORCES the SaaS vibe

"DIY / gogenfilter / Heavy" with "Free" as a price is a **classic SaaS pricing table pattern.** The "DIY" column has empty pros and only cons — a competitor hit-piece layout. This is exactly what makes people think "are you selling me something?" I left this untouched and it actively works against the "free library" positioning.

### 4. Potential color clash: dracula vs site palette (UNVERIFIED)

The docs code blocks now use dracula theme (background `#282a36` — a cool blue-gray dark). The Starlight docs site uses a warm stone palette (`#0c0a09` near-black). These two darks may **clash** (warm black vs cool blue-gray). I did not visually verify this. It might look fine; it might look jarring.

### 5. The Newsletter signup may be a root cause of the "salesy" feel

A newsletter signup in the footer strongly signals "commercial business" to a non-techy. For a free MIT library, it may be inappropriate. I didn't even consider removing or questioning it.

### 6. OG image is now inconsistent

I changed the logo but didn't regenerate the OG image (`og/home.png`). Social shares will show the old branding.

### 7. I optimized for "less monochrome" when the real issue was "less clear"

The girlfriend's feedback was visual, but the highest-impact improvement would have been messaging clarity + the highlighting bug. I spent most of my effort on color variety and logo redesign. Prioritization was off.

---

## E) WHAT WE SHOULD IMPROVE

### Messaging (highest impact)

1. **Rewrite hero to lead with the problem/outcome**, not the mechanism. Proposed: "Stop linting code no human wrote." The _why_ must be unmissable on first sight.
2. **Kill or completely redesign the comparison section.** A pricing-table pattern for a free library is anti-positioning. Replace with a "How it works" or "Why you need this" section.
3. **Add a one-line "what is generated code?" explainer** for devs who don't yet know they have this problem.
4. **Name the pain explicitly:** "Your linter flags generated files. Your CI parses code no human wrote. gogenfilter fixes that."
5. **Add a real-world before/after example:** linter output with/without gogenfilter.

### Visual verification (should have been done)

6. **Render every page and screenshot it.** Verify colors don't clash, layouts don't break, gradients look good.
7. **Verify dracula code background vs site palette** in docs — may need a custom EC theme override to match warm stone tones.
8. **Test mobile responsiveness** — wider sections + bigger text may overflow or look cramped on phones.
9. **Test light mode** — all new amber/emerald/accent additions in light theme.
10. **Check color contrast ratios** (WCAG AA) for amber on dark, emerald on dark, gradient text.

### Design polish

11. **Regenerate OG image** with new funnel logo.
12. **Review the Newsletter component** — keep, remove, or reframe?
13. **Add section eyebrows/labels** for scannability (e.g., "DETECTION", "PERFORMANCE", "INTEGRATIONS").
14. **Consider a visual diagram** of the two-phase detection flow.
15. **Verify the funnel logo reads as a funnel at 16px** (favicon size) — may be too abstract small.
16. **Review the dependents page** — it's linked from CTA but wasn't touched.
17. **Add hover micro-interactions** verification on all interactive elements.
18. **Consider a "Try it" interactive demo** (input a filename, see if it's detected).

### Technical

19. **Run Lighthouse audit** on the new design — bigger fonts may affect CLS.
20. **Verify CSP doesn't break** any new inline styles (the hero uses Tailwind arbitrary color classes, not inline styles — should be fine, but verify).
21. **Check ultrawide (2560px+) rendering** — `max-w-7xl` caps at 80rem, verify margins look balanced.
22. **Verify keyboard navigation** through the redesigned nav.
23. **Review the 404 page** — likely still has old styling.

### Content

24. **Audit ALL copy for SaaS-speak** — "Engineered", "purpose-built", "optimized" etc.
25. **Add a "Who is this for?" callout** — explicitly name the audience.
26. **Review docs sidebar labels** for clarity.
27. **Consider adding a blog/changelog teaser** on the landing page.
28. **Add structured FAQ schema** for "what is generated code".

---

## F) Up to 50 things to get done next

### Tier 1 — Critical (do first)

1. **Rewrite hero copy** to lead with problem/outcome ("Stop linting code no human wrote")
2. **Redesign or remove the comparison section** (kill the pricing-table pattern)
3. **Visually verify the entire site** — serve locally, screenshot every page, confirm colors/layouts
4. **Verify dracula theme doesn't clash** with the warm stone docs palette
5. **Regenerate OG image** with new funnel logo
6. **Test mobile responsiveness** of all changes
7. **Test light mode** of all new color additions

### Tier 2 — High impact

8. Add a "what is generated code?" one-liner for newcomers
9. Name the pain explicitly in hero or sub-hero
10. Add a real-world before/after example (linter output with/without)
11. Review/remove the Newsletter component
12. Add section eyebrows for scannability
13. Verify favicon reads as funnel at 16px
14. Check WCAG color contrast for all new colors
15. Add a "Who is this for?" callout
16. Review dependents page design
17. Audit all copy for remaining SaaS-speak
18. Verify keyboard nav through redesigned header

### Tier 3 — Polish

19. Add visual diagram of two-phase detection
20. Add hover micro-interactions on all cards
21. Consider interactive "Try it" demo (input filename → detection result)
22. Run Lighthouse audit on new design
23. Check CLS with bigger fonts
24. Verify ultrawide (2560px+) rendering
25. Review/improve 404 page
26. Add structured FAQ schema
27. Review docs sidebar labels
28. Consider blog/changelog teaser on landing
29. Add generator count as dynamic badge
30. Make generators grid searchable/filterable

### Tier 4 — Nice to have

31. Add per-generator detection detail (click → see patterns)
32. Consider custom EC theme matching site palette (instead of stock dracula)
33. Add "star history" chart
34. Add Open Graph image variants for docs pages
35. Review print stylesheet
36. Add structured breadcrumbs
37. Consider mascot/visual identity beyond logo
38. Add "last updated" / version badge
39. Review sitemap completeness
40. Consider "comparison with alternatives" proper page (not pricing table)
41. Add canonical URLs verification
42. Review robots.txt
43. Consider adding translations (i18n)
44. Add table of contents to landing page (for long scroll)
45. Consider progress indicator for scroll position
46. Add "back to top" button
47. Review manifest.json for PWA
48. Consider adding a CLI tool page
49. Add architecture diagram to docs
50. Consider video/animated demo of the library in action

---

## G) Questions I CANNOT figure out myself

### 1. Who is the primary audience?

Is the target ONLY Go developers who **already use** these code generators (sqlc, protobuf, templ...) and already feel the pain? Or should the site also appeal to Go devs who **don't yet know** they have this problem?

This fundamentally changes the copy strategy:

- **Already-in-pain audience** → technical, direct, "you know the problem, here's the solution."
- **Unaware audience** → educational, "here's what generated code is, here's why it pollutes your lint/CI, here's the fix."

I can't decide this — it's a product positioning call that depends on your goals for the project.

### 2. Should the Newsletter signup stay?

For a free MIT-licensed library, a newsletter signup in the footer strongly signals "commercial business / SaaS product." It may be a **root cause** of the girlfriend's "are you trying to sell me something" reaction. But you may have it intentionally (building an audience, announcing updates, funneling to other projects). I can't determine whether it serves your goals or undermines the "free library" positioning. Should it stay, go, or be reframed (e.g., "Get notified of releases" instead of "Newsletter")?

### 3. Is this a reputation/portfolio project or a stepping stone to something commercial?

The design should follow the actual goal:

- **Portfolio/reputation** → emphasize craft, open source, MIT, "built by LarsArtmann", GitHub stars. Strip all SaaS patterns (pricing tables, newsletters, "sign up" CTAs).
- **Commercial stepping stone** → the SaaS patterns make sense; the newsletter is lead capture; the comparison table is competitive positioning. But then the "free" messaging needs to be "free for now" or "open core" framing.

The current design sends **mixed signals** (MIT + free = open source, but pricing table + newsletter = commercial). I need to know which direction you want before I can make the positioning coherent.

---

## Session metrics

- **Files changed:** 22 (12 components, 4 data files, 2 styles, 2 logo SVGs, 1 CSP script, 1 astro config, 1 AGENTS.md)
- **Lines changed:** +183 / -100
- **Build status:** Green (typecheck 0 errors, 17 pages built, html-validate pass, CSP clean on all pages)
- **Critical bug fixed:** Docs syntax highlighting (CSP hash-vs-unsafe-inline spec conflict)
- **Biggest miss:** Never visually verified the result; missed the clarity problem until user pointed it out
