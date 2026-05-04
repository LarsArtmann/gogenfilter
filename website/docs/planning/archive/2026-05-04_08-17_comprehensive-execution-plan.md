# Comprehensive Execution Plan — Website Architecture Polish

**Created:** 2026-05-04 08:17 CEST  
**Scope:** website/ — post-Tailwind-v4-migration polish  
**Sources:** TODO_LIST.md, FEATURES.md, code-quality-scan, full-review, deepening-opportunities, actual source code  
**Constraint:** Each task ≤12min. Sorted by impact/effort.

---

## Status Summary

| Category                            | Count                              |
| ----------------------------------- | ---------------------------------- |
| Existing unstaged changes to commit | 7 files                            |
| TODO_LIST.md HIGH items             | 5                                  |
| TODO_LIST.md MEDIUM items           | 10                                 |
| TODO_LIST.md LOW items              | 7                                  |
| Code quality scan duplications      | 12                                 |
| Type check errors/warnings          | 2 (both already fixed in unstaged) |
| A11y issues                         | 3 (all already fixed in unstaged)  |

---

## Master Task List

| #   | Task                                                                                               | Impact | Effort | Source                  | Status   |
| --- | -------------------------------------------------------------------------------------------------- | ------ | ------ | ----------------------- | -------- |
| 1   | Commit existing unstaged external work (config.ts, siteConfig wiring, CodeBlock, Logo, a11y fixes) | HIGH   | 2min   | git status              | UNSTAGED |
| 2   | Create `Section.astro` component (maxWidth, centered, animate props)                               | HIGH   | 10min  | full-review #1          | TODO     |
| 3   | Create `Card.astro` component (variant, padding, hover props)                                      | HIGH   | 12min  | full-review #2          | TODO     |
| 4   | Refactor `index.astro` to use Section + Card (replace 6× section wrappers + 8× card patterns)      | HIGH   | 10min  | full-review #3          | TODO     |
| 5   | Refactor `FeatureGrid.astro` to use Card                                                           | MED    | 5min   | full-review #4          | TODO     |
| 6   | Refactor `GeneratorGrid.astro` to use Card                                                         | MED    | 5min   | full-review #5          | TODO     |
| 7   | Extract `HeroSection.astro` from index.astro                                                       | HIGH   | 10min  | full-review #6, TODO #3 | TODO     |
| 8   | Extract `PhaseSection.astro` from index.astro with data layer                                      | MED    | 8min   | TODO #3                 | TODO     |
| 9   | Extract `ComparisonSection.astro` from index.astro with data layer                                 | MED    | 8min   | TODO #8, full-review #7 | TODO     |
| 10  | Extract `UseCasesSection.astro` from index.astro with data layer                                   | MED    | 5min   | TODO #9, full-review #8 | TODO     |
| 11  | Extract `CTASection.astro` from index.astro                                                        | MED    | 5min   | deepening               | TODO     |
| 12  | Add section data types (PhaseCard, Comparison, UseCase) to `types.ts`                              | MED    | 3min   | deepening               | TODO     |
| 13  | Create `src/data/sections.ts` for Phase + Comparison + UseCase data                                | MED    | 5min   | TODO #8,9               | TODO     |
| 14  | Type `icons` record keys to `Feature['icon']` union in features.ts                                 | MED    | 3min   | TODO #7, code-quality   | TODO     |
| 15  | Add `#a5f3fc` to `@theme` as `--color-accent-light`                                                | MED    | 2min   | audit                   | TODO     |
| 16  | Replace hardcoded `#a5f3fc` with `text-accent-light` in index.astro                                | MED    | 1min   | audit                   | TODO     |
| 17  | Add `prefers-reduced-motion` to global.css                                                         | MED    | 3min   | a11y                    | TODO     |
| 18  | Mobile nav close-on-click behavior                                                                 | MED    | 5min   | TODO #4                 | TODO     |
| 19  | Mobile nav close button (X icon)                                                                   | MED    | 8min   | TODO #5                 | TODO     |
| 20  | Mobile nav background use Tailwind tokens instead of hardcoded rgba                                | LOW    | 3min   | TODO #10                | TODO     |
| 21  | Wire index.astro to use siteConfig (already partially done)                                        | MED    | 3min   | code-quality            | TODO     |
| 22  | Build verification after each phase                                                                | HIGH   | 2min   | QA                      | TODO     |
| 23  | Git commit after each smallest self-contained change                                               | HIGH   | 1min   | hygiene                 | TODO     |
| 24  | Final git push                                                                                     | HIGH   | 1min   | ship                    | TODO     |

---

## Execution Phases

### Phase 1: Commit existing work (2min)

- Task 1

### Phase 2: Reusable primitives — Section + Card (32min)

- Tasks 2–6

### Phase 3: Section extraction + data layer (44min)

- Tasks 7–13

### Phase 4: Polish — types, theme tokens, a11y (15min)

- Tasks 14–17

### Phase 5: Mobile nav improvements (16min)

- Tasks 18–20

### Phase 6: Final wiring + verify + ship (6min)

- Tasks 21–24

---

## Explicitly NOT in scope (from TODO_LIST.md LOW + Go repo)

- Light mode support (60min, LOW priority)
- Custom 404 page (15min, LOW)
- Analytics (30min, LOW)
- Real brand logos (30min, LOW)
- JSON-LD structured data (20min, LOW)
- Canonical URL meta (5min, LOW)
- HTML validation CI (15min, LOW)
- Lighthouse audit (60min, separate effort)
- Icon.astro component (30min, low ROI at current scale)
- All Go repo items (separate concern)
