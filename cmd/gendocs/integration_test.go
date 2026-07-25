package main

import (
	"os/exec"
	"strings"
	"testing"
)

// TestGoGenerateIsIdempotent runs the full `go generate ./...` pipeline and
// verifies that the committed documentation artifacts are already fresh.
//
// This is the end-to-end integration test for the gendocs binary: it exercises
// detector table extraction, metadata validation, and all five output targets
// (README.md, doc.go, generators.json, generators.mdx, detection.mdx).
//
// If this test fails, run `go generate ./...` and commit the changes.
func TestGoGenerateIsIdempotent(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping integration test in short mode")
	}

	// Run go generate ./... — this invokes `go run ./cmd/gendocs` via the
	// //go:generate directive in detection.go.
	cmd := exec.Command("go", "generate", "./...")
	cmd.Dir = "../.."
	if out, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("go generate ./... failed:\n%s\n%v", out, err)
	}

	// Verify no files changed — the committed output must already be fresh.
	diff := exec.Command("git", "diff", "--exit-code")
	diff.Dir = "../.."
	if out, err := diff.CombinedOutput(); err != nil {
		t.Errorf(
			"go generate produced changes — committed docs are stale.\n"+
				"Run `go generate ./...` and commit the result.\n%s",
			out,
		)
	}
}

// TestGoGenerateProducesAllOutputs verifies that every expected output file
// exists and contains gendocs markers after running the generation pipeline.
func TestGoGenerateProducesAllOutputs(t *testing.T) {
	if testing.Short() {
		t.Skip("skipping integration test in short mode")
	}

	// Run go generate to ensure outputs are present.
	cmd := exec.Command("go", "generate", "./...")
	cmd.Dir = "../.."
	if out, err := cmd.CombinedOutput(); err != nil {
		t.Fatalf("go generate ./... failed:\n%s\n%v", out, err)
	}

	checks := []struct {
		path    string
		marker  string
	}{
		{"README.md", "<!-- gendocs:generators:start -->"},
		{"doc.go", "// gendocs:generator-list:start"},
		{"website/src/data/generators.json", "\"generators\""},
		{"website/src/content/docs/generators.mdx", "{/* gendocs:detection-table:start */}"},
		{"website/src/content/docs/api/detection.mdx", "{/* gendocs:per-generator:start */}"},
	}

	for _, check := range checks {
		check := check
		t.Run(check.path, func(t *testing.T) {
			t.Parallel()

			read := exec.Command("cat", check.path)
			read.Dir = "../.."
			out, err := read.Output()
			if err != nil {
				t.Fatalf("could not read %s: %v", check.path, err)
			}

			if !strings.Contains(string(out), check.marker) {
				t.Errorf(
					"%s does not contain expected gendocs marker %q",
					check.path, check.marker,
				)
			}
		})
	}
}
