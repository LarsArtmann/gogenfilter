package gogenfilter

import (
	"context"
	"errors"
	"os"
	"path/filepath"
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

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		if filter.IsEnabled() {
			t.Error("Expected disabled filter")
		}

		if len(filter.options) != 0 {
			t.Errorf("Expected empty options, got %v", filter.options)
		}
	})

	t.Run("creates enabled filter with options", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterSQLC, FilterTempl)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

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

		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

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

		filter, err := NewFilter(WithIncludePatterns("pkg/*.go"))
		if err != nil {
			t.Fatal(err)
		}

		if !filter.IsEnabled() {
			t.Error("Expected filter with include patterns to be enabled")
		}
	})

	t.Run("exclude patterns alone enable the filter", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter(WithExcludePatterns("vendor/**"))
		if err != nil {
			t.Fatal(err)
		}

		if !filter.IsEnabled() {
			t.Error("Expected filter with exclude patterns to be enabled")
		}
	})
}

func TestFilterReasons(t *testing.T) {
	t.Parallel()

	t.Run("returns reasons for enabled options", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterSQLC, FilterTempl)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

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

		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

		reasons := filter.FilterReasons()

		expected := len(allSpecificOptions()) + 1 // +1 for FilterGeneric
		if len(reasons) != expected {
			t.Errorf("expected %d reasons for FilterAll, got %d", expected, len(reasons))
		}
	})

	t.Run("returns empty for no options", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		reasons := filter.FilterReasons()

		if len(reasons) != 0 {
			t.Errorf("expected 0 reasons, got %d", len(reasons))
		}
	})
}

func TestWithFilterOptionsReturnsError(t *testing.T) {
	t.Parallel()

	t.Run("returns error on invalid option", func(t *testing.T) {
		t.Parallel()

		_, err := WithFilterOptions(FilterOption("nonexistent"))
		if err == nil {
			t.Fatal("expected error from WithFilterOptions for invalid FilterOption")
		}

		var cfgErr *FilterConfigError
		if !errors.As(err, &cfgErr) {
			t.Fatalf("expected FilterConfigError, got %T", err)
		}
	})
}

func TestFilter(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter never filters", func(t *testing.T) {
		t.Parallel()

		f, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		if mustFilter(t, f, "any/file.go") {
			t.Error("Disabled filter should not filter")
		}
	})
}

func TestFilterWithIncludes(t *testing.T) {
	t.Parallel()

	t.Run("matching include pattern still detects generated code", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(
			opts,
			WithIncludePatterns("models.go"),
		)
		if err != nil {
			t.Fatal(err)
		}

		if !mustFilter(t, filter, "models.go") {
			t.Error("expected generated file matching include pattern to still be filtered")
		}
	})

	t.Run("matching include pattern for non-generated file is not filtered", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"main.go": newMapFile("package main\nfunc main() {}"),
		}

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(
			opts,
			WithIncludePatterns("main.go"),
			WithFS(mapFS),
		)
		if err != nil {
			t.Fatal(err)
		}

		if mustFilter(t, filter, "main.go") {
			t.Error("expected non-generated file matching include pattern to not be filtered")
		}
	})

	t.Run("non-matching path is filtered with include reason", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter(
			WithIncludePatterns("pkg/*.go"),
		)
		if err != nil {
			t.Fatal(err)
		}

		if !mustFilter(t, filter, "other/file.go") {
			t.Error("expected non-matching path to be filtered")
		}

		stats := filter.GetStats()

		assertFilterStats(t, stats, ReasonOutsideScope, 1, "outside-scope")
	})

	t.Run("include pattern with wildcard", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter(
			WithIncludePatterns("*.go"),
		)
		if err != nil {
			t.Fatal(err)
		}

		if mustFilter(t, filter, "main.go") {
			t.Error("expected *.go to match main.go")
		}
	})
}

func TestFilterWithIncludesMultiple(t *testing.T) {
	t.Parallel()

	filter, err := NewFilter(
		WithIncludePatterns("keep.go", "safe.go"),
	)
	if err != nil {
		t.Fatal(err)
	}

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

	fltr, err := NewFilter(
		func(f *Filter) error {
			// Replicate FilterAll expansion
			expanded := optionsMap(FilterAll)
			for opt := range expanded {
				f.options[opt] = struct{}{}
			}

			return nil
		},
		WithFS(os.DirFS(tmpDir)),
	)
	if err != nil {
		t.Fatal(err)
	}

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

	f, err := NewFilter()
	if err != nil {
		t.Fatal(err)
	}

	stats := f.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 0)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 0)
	assertEqual(t, "FilteredBy SQLC", stats.FilteredBy(ReasonSQLC), 0)
}

func TestFilterString(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		assertContains(t, filter.String(), "disabled")
	})

	t.Run("enabled with options", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterSQLC, FilterTempl)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

		str := filter.String()

		assertContains(t, str, "sqlc")
		assertContains(t, str, "templ")
		assertContains(t, str, "options=")
	})

	t.Run("enabled with include patterns", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter(WithIncludePatterns("pkg/*.go"))
		if err != nil {
			t.Fatal(err)
		}

		str := filter.String()
		assertContains(t, str, "includes=")
		assertContains(t, str, "Filter(")
		assertNotContains(t, str, "options=", "pattern-only filter should not show options")
	})

	t.Run("enabled with exclude patterns", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter(WithExcludePatterns("vendor/**"))
		if err != nil {
			t.Fatal(err)
		}

		str := filter.String()
		assertContains(t, str, "excludes=")
		assertNotContains(t, str, "options=", "pattern-only filter should not show options")
	})

	t.Run("enabled with all options and patterns", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(
			opts,
			WithIncludePatterns("pkg/*.go"),
			WithExcludePatterns("vendor/**"),
		)
		if err != nil {
			t.Fatal(err)
		}

		str := filter.String()

		assertContains(t, str, "options=")
		assertContains(t, str, "includes=")
		assertContains(t, str, "excludes=")
		assertContains(t, str, "stats=")
	})
}

func TestFilterPaths(t *testing.T) {
	t.Parallel()

	t.Run("filters multiple valid paths", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter(
			WithIncludePatterns("keep.go", "safe.go"),
		)
		if err != nil {
			t.Fatal(err)
		}

		results, err := filter.FilterPaths([]string{"keep.go", "remove.go", "safe.go"})
		if err != nil {
			t.Fatal(err)
		}

		assertLen(t, "results", len(results), 3)
		assertEqual(t, "keep.go", results[0], false)
		assertEqual(t, "remove.go", results[1], true)
		assertEqual(t, "safe.go", results[2], false)
	})

	t.Run("empty paths slice", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		results, err := filter.FilterPaths([]string{})
		if err != nil {
			t.Fatal(err)
		}

		assertLen(t, "results", len(results), 0)
	})

	t.Run("returns partial results on error", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"main.go": newMapFile("package main\nfunc main() {}"),
		}

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts, WithFS(mapFS))
		if err != nil {
			t.Fatal(err)
		}

		results, err := filter.FilterPaths([]string{"main.go", "nonexistent.go"})
		if err == nil {
			t.Fatal("expected error for nonexistent file")
		}

		assertLen(t, "partial results", len(results), 1)
		assertEqual(t, "main.go result", results[0], false)
	})

	t.Run("disabled filter returns all false", func(t *testing.T) {
		t.Parallel()

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		results, err := filter.FilterPaths([]string{"a.go", "b.go", "c.go"})
		if err != nil {
			t.Fatal(err)
		}

		assertLen(t, "results", len(results), 3)

		for i, got := range results {
			if got {
				t.Errorf("disabled filter should not filter path %d", i)
			}
		}
	})
}

func TestFilterContext(t *testing.T) {
	t.Parallel()

	t.Run("respects cancelled context", func(t *testing.T) {
		t.Parallel()

		ctx, cancel := context.WithCancel(context.Background())
		cancel()

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		_, err = filter.FilterContext(ctx, "file.go")
		if err == nil {
			t.Fatal("expected error for cancelled context")
		}

		assertErrorsIs(t, err, context.Canceled)
	})

	t.Run("succeeds with active context", func(t *testing.T) {
		t.Parallel()

		ctx := context.Background()

		filter, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		filtered, err := filter.FilterContext(ctx, "file.go")
		if err != nil {
			t.Fatal(err)
		}

		if filtered {
			t.Error("disabled filter should not filter")
		}
	})
}

func TestFilterPathsContext(t *testing.T) {
	t.Parallel()

	t.Run("respects cancelled context mid-batch", func(t *testing.T) {
		t.Parallel()

		ctx, cancel := context.WithCancel(context.Background())

		filter, err := NewFilter(
			WithIncludePatterns("keep.go"),
		)
		if err != nil {
			t.Fatal(err)
		}

		cancel()

		_, err = filter.FilterPathsContext(ctx, []string{"keep.go", "drop.go"})
		if err == nil {
			t.Fatal("expected error for cancelled context")
		}

		assertErrorsIs(t, err, context.Canceled)
	})

	t.Run("succeeds with active context", func(t *testing.T) {
		t.Parallel()

		ctx := context.Background()

		filter, err := NewFilter(
			WithIncludePatterns("keep.go"),
		)
		if err != nil {
			t.Fatal(err)
		}

		results, err := filter.FilterPathsContext(ctx, []string{"keep.go", "drop.go"})
		if err != nil {
			t.Fatal(err)
		}

		assertLen(t, "results", len(results), 2)
		assertEqual(t, "keep.go", results[0], false)
		assertEqual(t, "drop.go", results[1], true)
	})
}

func TestFilterDetailed(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter returns unfiltered result", func(t *testing.T) {
		t.Parallel()

		f, err := NewFilter()
		if err != nil {
			t.Fatal(err)
		}

		result, err := f.FilterDetailed("any.go")
		if err != nil {
			t.Fatal(err)
		}

		if result.Filtered {
			t.Error("disabled filter should not mark files as filtered")
		}

		assertEqual(t, "Path", result.Path, "any.go")
	})

	t.Run("detects SQLC file with trace", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"db/models.go": newMapFile("// Code generated by sqlc. DO NOT EDIT.\npackage db"),
		}

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		f, err := NewFilter(opts, WithFS(mapFS))
		if err != nil {
			t.Fatal(err)
		}

		result, err := f.FilterDetailed("db/models.go")
		if err != nil {
			t.Fatal(err)
		}

		if !result.Filtered {
			t.Error("expected SQLC file to be filtered")
		}

		assertEqual(t, "Reason", result.Reason, ReasonSQLC)
		assertEqual(t, "Path", result.Path, "db/models.go")

		if result.Trace == "" {
			t.Error("expected non-empty trace for SQLC detection")
		}
	})

	t.Run("non-generated file returns not filtered", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"main.go": newMapFile("package main\nfunc main() {}"),
		}

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		f, err := NewFilter(opts, WithFS(mapFS))
		if err != nil {
			t.Fatal(err)
		}

		result, err := f.FilterDetailed("main.go")
		if err != nil {
			t.Fatal(err)
		}

		if result.Filtered {
			t.Error("expected non-generated file to not be filtered")
		}

		assertEqual(t, "Reason", result.Reason, ReasonNotFiltered)
	})

	t.Run("include pattern scope with trace", func(t *testing.T) {
		t.Parallel()

		f, err := NewFilter(WithIncludePatterns("pkg/*.go"))
		if err != nil {
			t.Fatal(err)
		}

		result, err := f.FilterDetailed("other/file.go")
		if err != nil {
			t.Fatal(err)
		}

		if !result.Filtered {
			t.Error("expected outside-scope file to be filtered")
		}

		assertEqual(t, "Reason", result.Reason, ReasonOutsideScope)
		assertContains(t, result.Trace, "include pattern")
	})

	t.Run("exclude pattern with trace", func(t *testing.T) {
		t.Parallel()

		f, err := NewFilter(WithExcludePatterns("vendor/**"))
		if err != nil {
			t.Fatal(err)
		}

		result, err := f.FilterDetailed("vendor/util.go")
		if err != nil {
			t.Fatal(err)
		}

		if !result.Filtered {
			t.Error("expected excluded file to be filtered")
		}

		assertEqual(t, "Reason", result.Reason, ReasonExcludePattern)
		assertContains(t, result.Trace, "exclude pattern")
	})

	t.Run("propagates read error", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		f, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

		_, err = f.FilterDetailed("nonexistent.go")
		if err == nil {
			t.Fatal("expected error for nonexistent file")
		}
	})
}

func TestFilterPathsDetailed(t *testing.T) {
	t.Parallel()

	t.Run("returns detailed results for batch", func(t *testing.T) {
		t.Parallel()

		f, err := NewFilter(WithIncludePatterns("keep.go"))
		if err != nil {
			t.Fatal(err)
		}

		results, err := f.FilterPathsDetailed([]string{"keep.go", "drop.go"})
		if err != nil {
			t.Fatal(err)
		}

		assertLen(t, "results", len(results), 2)
		assertEqual(t, "keep.go filtered", results[0].Filtered, false)
		assertEqual(t, "drop.go filtered", results[1].Filtered, true)
		assertEqual(t, "drop.go reason", results[1].Reason, ReasonOutsideScope)
	})
}

func TestFilterDetailedContext(t *testing.T) {
	t.Parallel()

	t.Run("respects cancelled context", func(t *testing.T) {
		t.Parallel()

		ctx, cancel := context.WithCancel(context.Background())
		cancel()

		f, err := NewFilter(WithIncludePatterns("pkg/*.go"))
		if err != nil {
			t.Fatal(err)
		}

		_, err = f.FilterDetailedContext(ctx, "file.go")
		if err == nil {
			t.Fatal("expected error for cancelled context")
		}

		assertErrorsIs(t, err, context.Canceled)
	})

	t.Run("succeeds with active context", func(t *testing.T) {
		t.Parallel()

		ctx := context.Background()

		f, err := NewFilter(WithIncludePatterns("keep.go"))
		if err != nil {
			t.Fatal(err)
		}

		result, err := f.FilterDetailedContext(ctx, "drop.go")
		if err != nil {
			t.Fatal(err)
		}

		if !result.Filtered {
			t.Error("expected drop.go to be filtered")
		}
	})
}

func TestWithMetricsCap(t *testing.T) {
	t.Parallel()

	t.Run("cap limits stored file paths", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"db/models.go": newMapFile("// Code generated by sqlc. DO NOT EDIT.\npackage db"),
		}

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts, WithFS(mapFS), WithMetricsCap(2))
		if err != nil {
			t.Fatal(err)
		}

		_, _ = filter.Filter("db/models.go")
		_, _ = filter.Filter("db/models.go")
		_, _ = filter.Filter("db/models.go")

		stats := filter.GetStats()

		assertEqual(t, "FilteredBy count", stats.FilteredBy(ReasonSQLC), 3)
		assertLen(t, "FilteredFiles", len(stats.FilteredFiles(ReasonSQLC)), 2)
	})

	t.Run("cap zero means unlimited", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"db/models.go": newMapFile("// Code generated by sqlc. DO NOT EDIT.\npackage db"),
		}

		opts, err := WithFilterOptions(FilterSQLC)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts, WithFS(mapFS), WithMetricsCap(0))
		if err != nil {
			t.Fatal(err)
		}

		for range 5 {
			_, _ = filter.Filter("db/models.go")
		}

		stats := filter.GetStats()

		assertEqual(t, "FilteredBy count", stats.FilteredBy(ReasonSQLC), 5)
		assertLen(t, "FilteredFiles", len(stats.FilteredFiles(ReasonSQLC)), 5)
	})
}
