// facts.cue — extracted from code by `io-surface init`.
//
// Mechanical file: regenerate with `io-surface init --force` after an
// I/O-adding change; never hand-edit locations. Judgment lives in claims.cue.
package io_surface

audit: {
	commit: "ebdac85"
	date:   "2026-11-07"
	claims: 5
	method: "io-surface extract (AST, stdlib-only)"
}

enforcement: "gate"

scope: {
	in: [
		"file system (reads, writes, embeds)",
		"databases (SQLite/engine handles)",
		"network listeners",
		"outbound network",
		"stream copies",
		"entropy",
		"subprocess / local IPC",
		"environment reads",
	]
	out: [
		"timers and tickers (scheduling)",
		"memory pooling",
		"kernel-internal I/O (epoll, page cache)",
	]
}

sites: {
	"cmd/gendocs.generateDetectionMDX": {
		location: [
			"cmd/gendocs/main.go:263",
		]
		family: "file-read"
		facts: {
			call: ["os.ReadFile"]
		}
	}
	"cmd/gendocs.generateDocGo": {
		location: [
			"cmd/gendocs/main.go:309",
		]
		family: "file-read"
		facts: {
			call: ["os.ReadFile"]
		}
	}
	"cmd/gendocs.generateGeneratorsMDX": {
		location: [
			"cmd/gendocs/main.go:246",
		]
		family: "file-read"
		facts: {
			call: ["os.ReadFile"]
		}
	}
	"cmd/gendocs.generateReadme": {
		location: [
			"cmd/gendocs/main.go:186",
		]
		family: "file-read"
		facts: {
			call: ["os.ReadFile"]
		}
	}
	"cmd/gendocs.writeFile": {
		location: [
			"cmd/gendocs/main.go:523",
		]
		family: "file-write"
		facts: {
			call: ["os.WriteFile"]
		}
	}
}
