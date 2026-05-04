# Execution Plan: Website Architecture Polish — Tailwind v4 Follow-up

**Created:** 2026-05-04 08:16 CEST
**Scope:** website/ — post-migration cleanup, component extraction, type safety, hardcoded data removal

---

## Task Table (sorted by impact / effort)

| #   | Task                                                           | Impact | Effort | Category   |
| --- | -------------------------------------------------------------- | ------ | ------ | ---------- |
| 1   | Commit existing unstaged changes (external work)               | High   | 1min   | Hygiene    |
| 2   | Add `#a5f3fc` to theme as `--color-accent-light`               | Medium | 2min   | Design     |
| 3   | Remove unused `lang` prop from CodeBlock                       | Low    | 1min   | Cleanup    |
| 4   | Type the icons map in features.ts with a union type            | Medium | 3min   | Types      |
| 5   | Add `prefers-reduced-motion` to global.css                     | Medium | 3min   | A11y       |
| 6   | Extract PhaseSection data to src/data/sections.ts              | Medium | 5min   | Data       |
| 7   | Extract ComparisonSection data to src/data/sections.ts         | Medium | 5min   | Data       |
| 8   | Extract UseCaseSection data to src/data/sections.ts            | Medium | 3min   | Data       |
| 9   | Add section types (PhaseCard, Comparison, UseCase) to types.ts | Medium | 3min   | Types      |
| 10  | Replace hardcoded `#a5f3fc` with theme token in index.astro    | Medium | 2min   | Design     |
| 11  | Wire index.astro to use siteConfig from config.ts              | High   | 5min   | Config     |
| 12  | Extract HeroSection component from index.astro                 | High   | 8min   | Components |
| 13  | Extract PhaseSection component from index.astro                | Medium | 8min   | Components |
| 14  | Extract ComparisonSection component from index.astro           | Medium | 8min   | Components |
| 15  | Extract UseCaseSection component from index.astro              | Medium | 5min   | Components |
| 16  | Extract CTASection component from index.astro                  | Medium | 5min   | Components |
| 17  | Wire all new components to use data layer imports              | Medium | 5min   | Wiring     |
| 18  | Final build verification                                       | High   | 2min   | QA         |
| 19  | Git commit + push                                              | High   | 2min   | Ship       |

**Total estimated time:** ~80min (all tasks <12min each)

---

## Execution Order

### Phase 1: Quick Wins (commit existing + theme + cleanup)

- Tasks 1–5

### Phase 2: Data Layer (extract all hardcoded data)

- Tasks 6–9

### Phase 3: Config Wiring (use siteConfig everywhere)

- Tasks 10–11

### Phase 4: Component Extraction (break up index.astro)

- Tasks 12–17

### Phase 5: Verify + Ship

- Tasks 18–19
