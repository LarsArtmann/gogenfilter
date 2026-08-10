# ADR 003: FilterDetailedAndContent — Lazy Read with Content Return

**Date:** 2026-08-10
**Status:** Accepted

## Context

`FilterDetailed` performs lazy file reads during phase-2 content detection.
When a file is classified by filename (phase 1) or pattern matching, no read
occurs. When content detection is needed, the file is read exactly once — but
the content is then discarded.

Callers that need the content for post-detection logic (e.g., art-dupl's
`allowsContent` override for `ReasonGeneric` classification) had two options:

1. Call `FilterDetailed` (which reads the file), then read the file **again**
   to get the content for their own logic. This is a **double-read** — wasteful
   for large files and incorrect for `fs.FS` implementations that may change
   between reads.

2. Call `FilterDetailedWithContent` (which accepts pre-read content), but this
   requires the caller to **always** read the file, even when phase-1 filename
   detection would have made a read unnecessary. This defeats the lazy-read
   optimization.

Neither option is ideal. The gap: callers need both lazy reading AND content
return.

## Decision

Add `FilterDetailedAndContent(filePath string) (FilterResult, []byte, error)`.

This method:
- Performs the same lazy detection as `FilterDetailed` (filename → config-aware
  → content)
- When phase-2 reads the file, **returns that content** to the caller instead of
  discarding it
- Content is `nil` when no read occurred (disabled filter, pattern match,
  filename match, or no content-check detectors enabled)
- Content is guaranteed to be read exactly once from the filter's `fs.FS`

The method checks both include and exclude patterns inline (like
`FilterDetailedWithContent`), unlike `FilterDetailed` which uses the
either/or includes-vs-excludes split. This is because the content-return path
needs to know definitively whether a read occurred.

## Consequences

**Positive:**
- Eliminates double-read for callers needing content
- Preserves lazy-read optimization for callers who don't
- Purely additive — no changes to existing methods

**Negative:**
- Adds a third `FilterDetailed*` variant, increasing API surface
- The `nil` content return value has 4 distinct meanings (disabled, pattern
  match, filename match, no content-check detectors) — callers must check
  `result.Filtered` and `result.Reason` to distinguish

**Neutral:**
- The `configOrFilenameResult` shared helper was extracted from this method and
  `shouldFilterDetailedByContent`, reducing duplication
