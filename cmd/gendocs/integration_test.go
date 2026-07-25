package main

import (
	"context"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/LarsArtmann/gogenfilter/v3"
)

const repoRoot = "../.."

// TestGoGenerateEndToEnd is the integration test for the gendocs binary.
//
// It runs the full `go generate ./...` pipeline (which invokes
// `go run ./cmd/gendocs` via the //go:generate directive in detection.go),
// then verifies:
//
// 1. All five output files exist and contain expected content.
// 2. The output is idempotent — re-running produces no changes.
//
// This test is NOT parallel because `go generate` writes to tracked files.
// If this test fails, run `go generate ./...` and commit the changes.
//
//nolint:paralleltest // writes to tracked files; cannot run in parallel
func TestGoGenerateEndToEnd(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping integration test in short mode")
	}

	// Skip in environments where gendocs output targets don't exist
	// (e.g., Nix sandbox which only includes Go source files).
	if _, err := os.Stat(repoRoot + "/website/src/data"); err != nil {
		t.Skip("skipping: website/src/data not found (sandbox or minimal checkout)")
	}

	ctx := context.Background()

	// Phase 1: Run go generate ./... and verify it succeeds.
	cmd := exec.CommandContext(ctx, "go", "generate", "./...")
	cmd.Dir = repoRoot

	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("go generate ./... failed:\n%s\n%v", out, err)
	}

	// Phase 2: Verify all output files contain expected content.
	docs := gogenfilter.AllDetectorDocs()
	if len(docs) == 0 {
		t.Fatal("AllDetectorDocs() returned no detectors")
	}

	firstOption := string(docs[0].Option)

	checks := []struct {
		path   string
		needle string
	}{
		{"README.md", "<!-- gendocs:generators:start -->"},
		{"doc.go", "// gendocs:generator-list:start"},
		{"website/src/data/generators.json", firstOption},
		{
			"website/src/content/docs/generators.mdx",
			"{/* gendocs:detection-table:start */}",
		},
		{
			"website/src/content/docs/api/detection.mdx",
			"{/* gendocs:per-generator:start */}",
		},
	}

	for _, check := range checks {
		//nolint:gosec // G204: check.path is a hardcoded test constant
		read := exec.CommandContext(ctx, "cat", check.path)
		read.Dir = repoRoot

		out, err := read.Output()
		if err != nil {
			t.Errorf("could not read %s: %v", check.path, err)

			continue
		}

		if !strings.Contains(string(out), check.needle) {
			t.Errorf("%s does not contain expected content %q", check.path, check.needle)
		}
	}

	// Phase 3: Verify idempotency — the committed output must already be fresh.
	outputFiles := []string{
		"README.md",
		"doc.go",
		"website/src/data/generators.json",
		"website/src/content/docs/generators.mdx",
		"website/src/content/docs/api/detection.mdx",
	}

	args := append([]string{"diff", "--exit-code", "--"}, outputFiles...)
	//nolint:gosec // G204: args are hardcoded test constants
	diff := exec.CommandContext(ctx, "git", args...)
	diff.Dir = repoRoot

	if out, err := diff.CombinedOutput(); err != nil {
		t.Errorf(
			"go generate produced changes to managed files — committed docs are stale.\n"+
				"Run `go generate ./...` and commit the result.\n%s",
			out,
		)
	}
}
