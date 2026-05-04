# Code Quality Scan — gogenfilter Website

**Date:** 2026-05-04 08:12
**Scope:** All source files in `src/`

## Build

| Check     | Status  | Details                   |
| --------- | ------- | ------------------------- |
| Build     | PASS    | 17 pages, 2.07s, 0 errors |
| Astro     | v6.2.1  |                           |
| Starlight | v0.38.4 |                           |

## Type Check (astro check)

| File                           | Line | Severity | Message                                                                                      |
| ------------------------------ | ---- | -------- | -------------------------------------------------------------------------------------------- |
| src/components/CodeBlock.astro | 8:15 | warning  | `lang` is declared but its value is never read                                               |
| src/components/Header.astro    | 8:13 | error    | `class` prop does not exist on Logo component — Logo's Props interface only has width/height |

## Duplication Analysis

### High Priority

| #   | Issue                                                           | Files                                      | Occurrences |
| --- | --------------------------------------------------------------- | ------------------------------------------ | ----------- |
| 1   | Generator count "11" hardcoded                                  | index.astro, GeneratorGrid, LandingLayout  | 5           |
| 2   | GitHub URL hardcoded                                            | index.astro, Header, Footer, LandingLayout | 4           |
| 3   | Card CSS pattern (`rounded-xl border border-border bg-bg-card`) | index.astro, FeatureGrid, GeneratorGrid    | 8+          |
| 4   | OG description text near-duplicated                             | LandingLayout.astro                        | 3           |

### Medium Priority

| #   | Issue                                      | Files                                   | Occurrences |
| --- | ------------------------------------------ | --------------------------------------- | ----------- |
| 5   | Section wrapper pattern (`py-24 relative`) | index.astro                             | 6           |
| 6   | Heading+subtitle class pattern             | index.astro, FeatureGrid, GeneratorGrid | 6           |
| 7   | Lightning SVG duplicated                   | index.astro:102, features.ts:37         | 2           |
| 8   | Link transition classes repeated           | Header, Footer, index                   | 10+         |
| 9   | LarsArtmann URL hardcoded                  | Footer, GeneratorGrid                   | 2           |

### Low Priority

| #   | Issue                            | Files              |
| --- | -------------------------------- | ------------------ |
| 10  | Window dots (3 identical spans)  | index.astro:33-35  |
| 11  | Inline code class pattern        | index.astro:99,113 |
| 12  | SVG boilerplate in feature icons | features.ts        |

## Dead Code

| File            | Line(s) | Detail                                                   |
| --------------- | ------- | -------------------------------------------------------- |
| CodeBlock.astro | 4,8     | `lang` prop destructured but never used in template      |
| global.css      | N/A     | Status doc mentions dead generator CSS — already cleaned |

## Accessibility Issues

| File                | Issue                                                               |
| ------------------- | ------------------------------------------------------------------- |
| GeneratorGrid.astro | Arrow icons lack `aria-hidden="true"`                               |
| Logo.astro          | SVG lacks `aria-label` or `role="img"`                              |
| Header.astro        | Mobile nav toggle button visible but CSS hides nav-links without JS |

## Performance Notes

- No `loading="lazy"` on below-fold images (generator logos)
- Google Fonts loaded via Astro font provider (good — self-hosted)
- `preconnect` not needed since Astro handles font injection

## Summary

| Category     | Count |
| ------------ | ----- |
| Errors       | 1     |
| Warnings     | 1     |
| Duplications | 12    |
| Dead code    | 1     |
| A11y issues  | 3     |
| Perf notes   | 1     |
