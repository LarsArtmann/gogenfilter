// schema.cue — the I/O surface manifest standard (io-surface/v1.1).
//
// The manifest describes every production code location in this repository
// that touches I/O: file system, embedded assets, databases, network
// listeners, outbound network, stream copies, entropy, subprocess/local IPC,
// and environment reads.
//
// The load-bearing wall is the facts/claims split:
//
//	facts.cue   extracted from code (regenerate freely; mechanical commits)
//	claims.cue  hand-written judgment (never overwritten; judgment commits)
//
// `cue vet` unifies this package into one value: every fact must be claimed,
// every claim must match a fact, every discipline constraint must hold.
//
// ID conventions:
//   - pkg.Func            e.g. "internal/dns.estimatedLines"
//   - pkg.Type.Method     e.g. "internal/server.AllowlistManager.Save"
//   - pkg.var             for go:embed sites, e.g. "internal/server.openAPISpec"
//   - pkg.Func#aspect     when ONE function legitimately spans two families
//                         (e.g. "internal/config.Load#file" / "#env")
//   - area.topic          for cross-cutting conceptual sites that have no
//                         single symbol (e.g. "logging.sink-topology")
//
// A site has exactly ONE family: its dominant role. Cross-family aspects carry
// the secondary aspect in claims.rationale; every declared location still
// lands in location, whichever section spelled it.
package io_surface

// Contract version (io-surface/v1.1). Absent in v1 manifests; new scaffolds
// and every capability-carrying manifest declare it. A schema change bumps
// the minor: a new family or capability name is a version bump, never a
// casual edit (taxonomy freeze).
version?: "io-surface/v1" | "io-surface/v1.1"

// Enforcement policy (decision D4: new undeclared sites fail the build).
// "gate" is the default and the birth decision; "audit" reports findings
// without failing (adoption posture). The policy is recorded HERE, in the
// manifest, so an opt-out is a committed, reviewable diff — never a silent
// CI edit or an uncommitted flag. Absent = "gate".
enforcement?: "gate" | "audit"

#Family: "file-read" | "file-write" | "embed" | "database" | "listener" | "outbound" | "stream-copy" | "entropy" | "ipc-subprocess" | "env"

// Cross-cutting I/O disciplines, as tags. disciplines.cue turns them into
// machine-checked constraints.
//
//	atomic-write     durable file writes go through an atomic write helper
//	single-writer    high-frequency DB writes funnel through one writer
//	buffered-write   bulk outputs wrap bufio.Writer
//	wal-pragmas      WAL + synchronous(NORMAL); never synchronous(OFF)
//	bounded          every fetch/stream declares a byte bound
//	pooled           buffers come from a shared pool, never per-call alloc
//	no-domain-labels per-domain truth never on Prometheus metrics
#Discipline: "atomic-write" | "single-writer" | "buffered-write" | "wal-pragmas" | "bounded" | "pooled" | "no-domain-labels"

#Site: {
	// Verified "path:line" claims (derived, never hand-edited).
	location: [...string]
	family: #Family
	facts: {
		// Resolved call tokens, e.g. ["os.CreateTemp", "os.Rename"].
		call: [...string] | *[]
		// Wrapper seam owning the raw call, e.g. "atomicWriteFile".
		via: string | *""
		// false for claims the AST extractor cannot see (config providers,
		// DSN pragma strings, log sink topology, vendored embeds). Such sites
		// are exempt from the declared-sites-exist direction.
		extractable: bool | *true
		// true for test-infrastructure sites (in scope, exempt from runtime
		// discipline constraints).
		testinfra: bool | *false
	}
	claims: {
		resource: string | *""    // what it touches, in domain terms
		trigger: string | *""     // when it fires
		discipline: [...#Discipline] | *[]
		exception: string | *""   // why a discipline rule does not apply
		rationale: string | *""   // the judgment prose
	}
}

sites: {[string]: #Site}

// Capability facts (v1.1): what each first-party package can REACH, as
// observed by an external reachability engine (Capslock, pinned; run in CI or
// dev shells — never imported by the hermetic gate). Written only by
// `io-surface absorb` into capabilities.cue; claims justify them like sites.
//
// The enum is the mapped vocabulary ONLY. Runtime-power capabilities (CGO,
// UNSAFE_POINTER, REFLECT, RUNTIME, SYSTEM_CALLS, ...) are out-of-scope per
// ROADMAP Q5. The single-source mapping lives in
// internal/capability/capability.go — keep the two in sync.
#CapabilityName: "FILES" | "NETWORK" | "EXEC"

#CapabilitySet: {
	// Repo/root-relative package path, e.g. "internal/extract".
	pkg!: string
	// Reachability through the package's OWN code (Capslock DIRECT edges).
	direct!: [...#CapabilityName]
	// Reachability including transitive dependency paths. Always a superset
	// of direct; absorb guarantees the invariant.
	deep!: [...#CapabilityName]
}

capabilities: [...#CapabilitySet] | *[]

// Provenance of the last absorb run (engine pin, source revision, date).
capabilityAudit?: {
	engine!: string  // "capslock" today
	version!: string // engine version the facts were observed with
	commit!: string  // repo revision the engine analyzed
	date!:   string  // YYYY-MM-DD
}

#Audit: {
	commit: string
	date:   string
	// Unique location tokens covered (doc-manifest parity mode).
	claims: int
	method: string
}

audit: #Audit

#Scope: {
	in: [...string]   // areas deliberately covered
	out: [...string]  // deliberately excluded areas
}

scope: #Scope

// Grandfathered undeclared extraction findings. Each entry carries a note and
// a date; the baseline only shrinks.
baseline: [...#BaselineEntry] | *[]

#BaselineEntry: {
	id:   string
	note: string
	date: string
	// Who vouches for the suppression (team or handle). Optional: the site,
	// not a person, is the thing being grandfathered.
	owner?: string
	// YYYY-MM-DD. An expired entry FAILS the gate: grandfathering must not
	// silently outlive its justification — fix the site or re-baseline
	// deliberately.
	expires?: string
}
