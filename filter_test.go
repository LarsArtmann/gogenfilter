package gogenfilter

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
	"testing/fstest"
)

func assertFilterStats(
	t *testing.T,
	stats FilterStats,
	reason FilterReason,
	expected int,
	name string,
) {
	t.Helper()

	if stats.FilteredBy(reason) != expected {
		t.Errorf(
			"expected %d %s filter, got %d",
			expected,
			name,
			stats.FilteredBy(reason),
		)
	}
}

func TestNewFilter(t *testing.T) {
	t.Parallel()

	t.Run("creates disabled filter", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter()

		if filter.IsEnabled() {
			t.Error("Expected disabled filter")
		}

		if len(filter.options) != 0 {
			t.Errorf("Expected empty options, got %v", filter.options)
		}
	})

	t.Run("creates enabled filter with options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithFilterOptions(FilterSQLC, FilterTempl))

		if !filter.IsEnabled() {
			t.Error("Expected enabled filter")
		}

		if _, ok := filter.options[FilterSQLC]; !ok {
			t.Error("Expected SQLC option enabled")
		}

		if _, ok := filter.options[FilterTempl]; !ok {
			t.Error("Expected Templ option enabled")
		}
	})

	t.Run("creates enabled filter with FilterAll", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithFilterOptions(FilterAll))

		if !filter.IsEnabled() {
			t.Error("Expected enabled filter")
		}

		for _, opt := range allSpecificOptions() {
			if _, ok := filter.options[opt]; !ok {
				t.Errorf("Expected %s option enabled for FilterAll", opt)
			}
		}

		if _, ok := filter.options[FilterGeneric]; !ok {
			t.Error("Expected Generic option enabled for FilterAll")
		}
	})

	t.Run("include patterns alone enable the filter", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithIncludePatterns("pkg/*.go"))

		if !filter.IsEnabled() {
			t.Error("Expected filter with include patterns to be enabled")
		}
	})

	t.Run("exclude patterns alone enable the filter", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithExcludePatterns("vendor/**"))

		if !filter.IsEnabled() {
			t.Error("Expected filter with exclude patterns to be enabled")
		}
	})
}

func TestFilterReasons(t *testing.T) {
	t.Parallel()

	t.Run("returns reasons for enabled options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithFilterOptions(FilterSQLC, FilterTempl))
		reasons := filter.FilterReasons()

		if len(reasons) != 2 {
			t.Fatalf("expected 2 reasons, got %d: %v", len(reasons), reasons)
		}

		got := make(map[FilterReason]bool, len(reasons))
		for _, r := range reasons {
			got[r] = true
		}

		if !got[ReasonSQLC] {
			t.Error("expected ReasonSQLC in FilterReasons()")
		}

		if !got[ReasonTempl] {
			t.Error("expected ReasonTempl in FilterReasons()")
		}
	})

	t.Run("returns all reasons for FilterAll", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithFilterOptions(FilterAll))
		reasons := filter.FilterReasons()

		expected := len(allSpecificOptions()) + 1 // +1 for FilterGeneric
		if len(reasons) != expected {
			t.Errorf("expected %d reasons for FilterAll, got %d", expected, len(reasons))
		}
	})

	t.Run("returns empty for no options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter()
		reasons := filter.FilterReasons()

		if len(reasons) != 0 {
			t.Errorf("expected 0 reasons, got %d", len(reasons))
		}
	})
}

func TestWithFilterOptionsPanicsOnInvalid(t *testing.T) {
	t.Parallel()

	t.Run("panics on invalid option", func(t *testing.T) {
		t.Parallel()

		defer func() {
			recovered := recover()
			if recovered == nil {
				t.Fatal("expected panic for invalid FilterOption")
			}

			msg, ok := recovered.(string)
			if !ok {
				t.Fatalf("expected string panic, got %T: %v", recovered, recovered)
			}

			if !strings.Contains(msg, "invalid FilterOption") {
				t.Errorf("panic message = %q, want to contain %q", msg, "invalid FilterOption")
			}
		}()

		_ = NewFilter(WithFilterOptions(FilterOption("nonexistent")))
	})
}

func TestFilter(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter never filters", func(t *testing.T) {
		t.Parallel()

		f := NewFilter()

		if mustFilter(t, f, "any/file.go") {
			t.Error("Disabled filter should not filter")
		}
	})
}

func TestFilterWithIncludes(t *testing.T) {
	t.Parallel()

	t.Run("matching include pattern still detects generated code", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(
			WithFilterOptions(FilterSQLC),
			WithIncludePatterns("models.go"),
		)

		if !mustFilter(t, filter, "models.go") {
			t.Error("expected generated file matching include pattern to still be filtered")
		}
	})

	t.Run("matching include pattern for non-generated file is not filtered", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"main.go": newMapFile("package main\nfunc main() {}"),
		}

		filter := NewFilter(
			WithFilterOptions(FilterSQLC),
			WithIncludePatterns("main.go"),
			WithFS(mapFS),
		)

		if mustFilter(t, filter, "main.go") {
			t.Error("expected non-generated file matching include pattern to not be filtered")
		}
	})

	t.Run("non-matching path is filtered with include reason", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(
			WithIncludePatterns("pkg/*.go"),
		)

		if !mustFilter(t, filter, "other/file.go") {
			t.Error("expected non-matching path to be filtered")
		}

		stats := filter.GetStats()

		assertFilterStats(t, stats, ReasonOutsideScope, 1, "outside-scope")
	})

	t.Run("include pattern with wildcard", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(
			WithIncludePatterns("*.go"),
		)

		if mustFilter(t, filter, "main.go") {
			t.Error("expected *.go to match main.go")
		}
	})
}

func TestFilterWithIncludesMultiple(t *testing.T) {
	t.Parallel()

	filter := NewFilter(
		WithIncludePatterns("keep.go", "safe.go"),
	)

	if mustFilter(t, filter, "keep.go") {
		t.Error("expected keep.go to match")
	}

	if mustFilter(t, filter, "safe.go") {
		t.Error("expected safe.go to match")
	}

	if !mustFilter(t, filter, "remove.go") {
		t.Error("expected remove.go to be filtered")
	}
}

func TestFilterIntegration(t *testing.T) {
	t.Parallel()

	for _, tt := range shouldFilterTestCases() {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			assertFilterBehavior(t, tt.fileName, tt.content, tt.opts, tt.shouldFilter)
		})
	}
}

func TestFilterWithMetrics(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()

	files := map[string]string{
		"db/models.go": "// Code generated by sqlc. DO NOT EDIT.\npackage db\ntype User struct{ ID int64 }",
		"main.go":      "package main\nfunc main() {}",
		"components/header_templ.go": "// Code generated by templ DO NOT EDIT\n\npackage components\n\n" +
			"import \"github.com/a-h/templ\"\n\nfunc Header() templ.Component { return nil }",
		"enums/status_enum.go": "// Code generated by go-enum DO NOT EDIT.\npackage enums\n" +
			"type Status int\nconst StatusPending Status = iota",
	}

	for name, content := range files {
		dir := filepath.Join(tmpDir, filepath.Dir(name))

		err := os.MkdirAll(dir, 0o750)
		if err != nil {
			t.Fatalf("Failed to create dir: %v", err)
		}

		err = os.WriteFile(
			filepath.Join(tmpDir, name),
			[]byte(content),
			0o600,
		)
		if err != nil {
			t.Fatalf("Failed to write file: %v", err)
		}
	}

	fltr := NewFilter(
		WithFilterOptions(FilterAll),
		WithFS(os.DirFS(tmpDir)),
	)

	for name := range files {
		_, _ = fltr.Filter(name)
	}

	stats := fltr.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 4)
	assertEqual(t, "SQLC filtered", stats.FilteredBy(ReasonSQLC), 1)
	assertEqual(t, "Templ filtered", stats.FilteredBy(ReasonTempl), 1)
	assertEqual(t, "GoEnum filtered", stats.FilteredBy(ReasonGoEnum), 1)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 3)
}

func TestGetStatsDisabledFilter(t *testing.T) {
	t.Parallel()

	f := NewFilter()
	stats := f.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 0)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 0)
	assertEqual(t, "FilteredBy SQLC", stats.FilteredBy(ReasonSQLC), 0)
}

func TestFilterString(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter()
		assertContains(t, filter.String(), "disabled")
	})

	t.Run("enabled with options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithFilterOptions(FilterSQLC, FilterTempl))
		str := filter.String()

		assertContains(t, str, "sqlc")
		assertContains(t, str, "templ")
		assertContains(t, str, "options=")
	})

	t.Run("enabled with include patterns", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithIncludePatterns("pkg/*.go"))
		str := filter.String()
		assertContains(t, str, "includes=")
		assertContains(t, str, "Filter(")
		assertNotContains(t, str, "options=", "pattern-only filter should not show options")
	})

	t.Run("enabled with exclude patterns", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(WithExcludePatterns("vendor/**"))
		str := filter.String()
		assertContains(t, str, "excludes=")
		assertNotContains(t, str, "options=", "pattern-only filter should not show options")
	})

	t.Run("enabled with all options and patterns", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(
			WithFilterOptions(FilterAll),
			WithIncludePatterns("pkg/*.go"),
			WithExcludePatterns("vendor/**"),
		)

		str := filter.String()

		assertContains(t, str, "options=")
		assertContains(t, str, "includes=")
		assertContains(t, str, "excludes=")
		assertContains(t, str, "stats=")
	})
}
