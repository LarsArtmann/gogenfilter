# SQLC Config Parsing: gogenfilter vs sqlc

**Date:** 2026-05-04

Comparison of gogenfilter's sqlc config parsing (`sqlc.go`) against sqlc's own config parsing (`github.com/sqlc-dev/sqlc/internal/config`). Purpose: identify coverage gaps that cause false negatives in generated file detection.

## Why Not Use sqlc's Parser Directly?

sqlc's config types live in `internal/config` and `internal/codegen/golang/opts`. Go's module system **forbids external imports** of `internal/` packages. The minimal struct reimplementation in gogenfilter is the correct approach — it just needs to cover the full output dir surface.

## Version Dispatch

| Aspect | gogenfilter | sqlc |
|--------|-------------|------|
| V1 detection | Unmarshals into `sqlcConfig` — no `packages` field mapped | Reads `version` first, dispatches to `v1ParseConfig` |
| V2 detection | Same struct, maps `sql[].gen.go.out` | Dispatches to `v2ParseConfig`, maps full v2 `Config` struct |
| Unknown version | Silently accepts anything | Returns `ErrUnknownVersion` |
| Missing version | Silently accepts | Returns `ErrMissingVersion` |
| `KnownFields(true)` | Not used | Used — rejects unknown YAML fields |

## Output Directory Coverage

### V1 Format (`version: "1"`)

V1 uses `packages[].path` as the output directory. sqlc's `Translate()` maps `pkg.Path` → `SQL.Gen.Go.Out`.

```yaml
# V1 config
version: "1"
packages:
  - name: "db"
    path: "gen/db"        # ← THIS is the output dir
    engine: "postgresql"
    schema: "queries/"
    queries: "queries/"
```

| Field | gogenfilter | sqlc |
|-------|-------------|------|
| `packages[].path` | **Not mapped** — zero output dirs | Mapped to `SQL.Gen.Go.Out` |
| `packages[].name` | **Not mapped** | Used as `Out: pkg.Path` + `Package: pkg.Name` |

**Impact:** All v1 sqlc configs produce zero detected output dirs. Files in those directories are **not filtered**.

### V2 Format (`version: "2"`)

```yaml
# V2 config
version: "2"
sql:
  - engine: "postgresql"
    schema: "queries/"
    queries: "queries/"
    gen:
      go:
        package: "db"
        out: "gen/db"         # ← extracted by both
      json:
        out: "gen/json"       # ← missed by gogenfilter
    codegen:
      - plugin: "go-structs"
        out: "gen/structs"    # ← missed by gogenfilter
```

| Output Path | gogenfilter | sqlc |
|-------------|-------------|------|
| `sql[].gen.go.out` | **Extracted** | Extracted |
| `sql[].gen.json.out` | **Not extracted** | Extracted |
| `sql[].codegen[].out` | **Not extracted** | Extracted |

**Impact:** Plugin-based codegen and JSON output directories are invisible to gogenfilter.

## YAML Library

| | gogenfilter | sqlc |
|--|-------------|------|
| Library | `github.com/go-faster/yaml` v0.4.6 | `gopkg.in/yaml.v3` |
| Concern | Different from sqlc | Authoritative |
| Practical impact | None for basic unmarshaling | — |

Both handle standard YAML correctly. No actionable change needed.

## Known Potential Issues

### 1. YAML Library Divergence: `go-faster/yaml` vs `gopkg.in/yaml.v3`

sqlc uses `gopkg.in/yaml.v3` to parse `sqlc.{yaml,yml}`. gogenfilter uses `github.com/go-faster/yaml`. This is an intentional choice per the library policy (`/home/lars/projects/library-policy/library-policy.yaml`):

- **`gopkg.in/yaml.v2`** — Banned (critical severity). Repository archived April 1, 2025. Known CVE-2020-14343. `go-faster/yaml` is the mandated replacement.
- **`gopkg.in/yaml.v3`** — Banned (critical severity). Aging library with known CVEs. `go-faster/yaml` is the mandated replacement.
- **`go-yaml/yaml`** (the upstream of both v2/v3) — Banned (critical severity). Repository archived April 1, 2025. `go-faster/yaml` is the mandated replacement.
- **`github.com/go-faster/yaml`** — Recommended. 2-3x faster than `yaml.v3`, actively maintained, better memory efficiency.

**Potential risks of this divergence:**

| Risk | Severity | Detail |
|------|----------|--------|
| Behavioral edge cases | **Low** | Both libraries implement YAML 1.2 spec. For the simple key-value structures in `sqlc.yaml`, behavioral differences are extremely unlikely. |
| `yaml.Node` incompatibility | **None** | gogenfilter never uses `yaml.Node` — only flat struct unmarshaling. sqlc uses `yaml.Node` for plugin `options` fields which we don't need. |
| `KnownFields(true)` difference | **Low** | `go-faster/yaml` supports `KnownFields(true)` identically to `yaml.v3`. If we add strict parsing, this is a non-issue. |
| Custom `UnmarshalYAML` methods | **None** | sqlc defines custom `UnmarshalYAML` on `Paths` and `AnalyzerDatabase` types. gogenfilter's structs don't use these types, so this doesn't apply. |
| Future spec drift | **Low** | `go-faster/yaml` is a fork of `go-yaml/yaml` v3 with performance patches. Core YAML parsing logic is identical. |

**Mitigation:** The test suite uses `fstest.MapFS` with realistic sqlc configs covering both v1 and v2 formats. Any parsing divergence would be caught by tests.

### 2. No `KnownFields(true)` — Silent Ignorance of Typos

sqlc uses `dec.KnownFields(true)` in both `v1ParseConfig` and `v2ParseConfig`. This causes an error if the YAML contains unknown fields (e.g., a typo like `engien` instead of `engine`). gogenfilter does not use this.

**Impact:** A malformed `sqlc.yaml` with a typo in a critical field (e.g., `out:` misspelled as `out:`) would silently parse with zero output dirs instead of returning an error. The filter would fail to detect generated files in that project.

**Mitigation:** Low priority — the typo would also break sqlc itself, so the user would discover it during code generation, not during filtering.

### 3. No Version Dispatch — V1 and V2 Parsed Identically

sqlc reads the `version` field first and dispatches to entirely different parsing logic (`v1ParseConfig` vs `v2ParseConfig`). gogenfilter uses a single struct that only has v2 fields.

**Impact:** V1 configs silently produce zero output dirs (see "Output Directory Coverage" above). V2 configs with unknown version numbers (hypothetical v3) would also silently fail.

**Mitigation:** Add version-based dispatch matching sqlc's pattern.

### 4. No Environment Variable Substitution

sqlc calls `config.addEnvVars()` after parsing, which reads `SQLC_AUTH_TOKEN` from the environment. While this doesn't affect output dir detection, sqlc also supports `envsubst`-style variable substitution in config values via its cloud integration.

**Impact:** None currently — output dir paths in `sqlc.yaml` are not environment-variable-substituted by sqlc either. The `addEnvVars` function only handles `SQLC_AUTH_TOKEN` for cloud auth.

### 5. Config Discovery Stops at Dot-directories and `vendor`

gogenfilter skips hidden directories (`.*`), `node_modules`, and `vendor` during config discovery (`shouldSkipDirectory`). sqlc itself doesn't have this constraint — it reads the config from the working directory or explicit path.

**Impact:** If a project stores its `sqlc.yaml` inside a hidden directory (e.g., `.sqlc/sqlc.yaml`), gogenfilter won't discover it. This is unlikely but possible in monorepo setups.

### 6. Single Config File per Directory Assumption

`recordSQLCConfig` records any file named `sqlc.yaml` or `sqlc.yml` found during the walk. If both exist in the same directory, both are recorded and both are parsed. sqlc itself would error on ambiguous config.

**Impact:** Low — having both `sqlc.yaml` and `sqlc.yml` in the same directory is a user error. gogenfilter would merge output dirs from both, which is overly permissive (more files filtered) rather than overly restrictive.

## Struct Comparison

### gogenfilter (`sqlc.go`)

```go
type sqlcConfig struct {
    Version string       `yaml:"version"`
    SQL     []sqlcEngine `yaml:"sql"`
}
type sqlcEngine struct {
    Schema string        `yaml:"schema"`
    Engine string        `yaml:"engine"`
    Gen    sqlcGenConfig `yaml:"gen"`
}
type sqlcGenConfig struct {
    Go sqlcGoConfig `yaml:"go"`
}
type sqlcGoConfig struct {
    Package string `yaml:"package"`
    Out     string `yaml:"out"`
}
```

### sqlc (`internal/config/config.go`)

```go
type Config struct {
    Version string               `yaml:"version"`
    Cloud   Cloud                `yaml:"cloud"`
    Servers []Server             `yaml:"servers"`
    SQL     []SQL                `yaml:"sql"`
    // ... Overrides, Plugins, Rules, Options
}
type SQL struct {
    Engine  Engine    `yaml:"engine"`
    Schema  Paths     `yaml:"schema"`
    Queries Paths     `yaml:"queries"`
    Gen     SQLGen    `yaml:"gen"`
    Codegen []Codegen `yaml:"codegen"`    // ← plugin-based output
    // ... Analyzer, Rules, etc.
}
type SQLGen struct {
    Go   *golang.Options `yaml:"go"`
    JSON *SQLJSON        `yaml:"json"`     // ← JSON output
}
type Codegen struct {
    Out     string    `yaml:"out"`        // ← plugin output dir
    Plugin  string    `yaml:"plugin"`
    Options yaml.Node `yaml:"options"`
}
type SQLJSON struct {
    Out      string `yaml:"out"`          // ← JSON output dir
    // ... Indent, Filename
}
```

## Gaps Summary

| # | Gap | Severity | False Negatives |
|---|-----|----------|-----------------|
| 1 | V1 `packages[].path` not mapped | **High** | All v1 sqlc projects unfiltered |
| 2 | V2 `sql[].codegen[].out` not extracted | **Medium** | Plugin-based codegen unfiltered |
| 3 | V2 `sql[].gen.json.out` not extracted | **Low** | JSON output dirs unfiltered |
| 4 | No version validation | **Low** | Invalid configs silently accepted |

## Fix Approach

Extend the structs in `sqlc.go` to cover the missing output paths. No need to mirror sqlc's full config surface — only fields that contribute to output directory discovery.

### Required struct additions:

```go
// V1 support
type sqlcV1Config struct {
    Version  string           `yaml:"version"`
    Packages []sqlcV1Package  `yaml:"packages"`
}
type sqlcV1Package struct {
    Path string `yaml:"path"` // output dir in v1
}

// V2 additions
type sqlcGenConfig struct {
    Go   *sqlcGoConfig `yaml:"go"`
    JSON *sqlcJSONConfig `yaml:"json"`
}
type sqlcJSONConfig struct {
    Out string `yaml:"out"`
}
type sqlcCodegen struct {
    Out    string `yaml:"out"`
    Plugin string `yaml:"plugin"`
}
// Add Codegen field to sqlcEngine
```

### Required logic changes:

1. Read `version` field first, dispatch to v1 or v2 parsing (like sqlc does)
2. V1: extract `packages[].path` as output dirs
3. V2: also extract `sql[].codegen[].out` and `sql[].gen.json.out`
4. `extractOutputDirs` must walk all three sources

## Source References

- gogenfilter: `sqlc.go` — `sqlcConfig`, `extractOutputDirs`, `parseSQLCConfig`
- sqlc config types: `github.com/sqlc-dev/sqlc/internal/config/config.go` — `Config`, `SQL`, `SQLGen`, `Codegen`, `SQLJSON`
- sqlc v1 parsing: `github.com/sqlc-dev/sqlc/internal/config/v_one.go` — `V1GenerateSettings`, `v1PackageSettings.Path`, `Translate()`
- sqlc v2 parsing: `github.com/sqlc-dev/sqlc/internal/config/v_two.go` — `v2ParseConfig`
- sqlc version dispatch: `github.com/sqlc-dev/sqlc/internal/config/config.go` — `ParseConfig`
