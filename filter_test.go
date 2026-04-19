package gogenfilter

import (
	"os"
	"path/filepath"
	"strings"
	"sync"
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

		filter := NewFilter(Disabled())

		if filter.IsEnabled() {
			t.Error("Expected disabled filter")
		}

		if len(filter.options) != 0 {
			t.Errorf("Expected empty options, got %v", filter.options)
		}
	})

	t.Run("creates enabled filter with options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithFilterOptions(FilterSQLC, FilterTempl))

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

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll))

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
}

func TestFilterReasons(t *testing.T) {
	t.Parallel()

	t.Run("returns reasons for enabled options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithFilterOptions(FilterSQLC, FilterTempl))
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

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll))
		reasons := filter.FilterReasons()

		expected := len(allSpecificOptions()) + 1 // +1 for FilterGeneric
		if len(reasons) != expected {
			t.Errorf("expected %d reasons for FilterAll, got %d", expected, len(reasons))
		}
	})

	t.Run("returns empty for no options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled())
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

		_ = NewFilter(Enabled(), WithFilterOptions(FilterOption("nonexistent")))
	})
}

func TestShouldFilter(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter never filters", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(Disabled(), WithFilterOptions(FilterAll))

		if mustShouldFilter(t, f, "any/file.go") {
			t.Error("Disabled filter should not filter")
		}
	})
}

func TestShouldFilterWithIncludes(t *testing.T) {
	t.Parallel()

	t.Run("matching include pattern still detects generated code", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(),
			WithFilterOptions(FilterSQLC),
			WithIncludePatterns("models.go"),
		)

		if !mustShouldFilter(t, filter, "models.go") {
			t.Error("expected generated file matching include pattern to still be filtered")
		}
	})

	t.Run("matching include pattern for non-generated file is not filtered", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"main.go": newMapFile("package main\nfunc main() {}"),
		}

		filter := NewFilter(Enabled(),
			WithFilterOptions(FilterSQLC),
			WithIncludePatterns("main.go"),
			WithFS(mapFS),
		)

		if mustShouldFilter(t, filter, "main.go") {
			t.Error("expected non-generated file matching include pattern to not be filtered")
		}
	})

	t.Run("non-matching path is filtered with include reason", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(),
			WithIncludePatterns("pkg/*.go"),
		)

		if !mustShouldFilter(t, filter, "other/file.go") {
			t.Error("expected non-matching path to be filtered")
		}

		stats := filter.GetStats()

		assertFilterStats(t, stats, ReasonIncludePattern, 1, "include-pattern")
	})

	t.Run("include pattern with wildcard", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(),
			WithIncludePatterns("*.go"),
		)

		if mustShouldFilter(t, filter, "main.go") {
			t.Error("expected *.go to match main.go")
		}
	})
}

func TestShouldFilterWithIncludesMultiple(t *testing.T) {
	t.Parallel()

	filter := NewFilter(Enabled(),
		WithIncludePatterns("keep.go", "safe.go"),
	)

	if mustShouldFilter(t, filter, "keep.go") {
		t.Error("expected keep.go to match")
	}

	if mustShouldFilter(t, filter, "safe.go") {
		t.Error("expected safe.go to match")
	}

	if !mustShouldFilter(t, filter, "remove.go") {
		t.Error("expected remove.go to be filtered")
	}
}

func TestShouldFilterIntegration(t *testing.T) {
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

	fltr := NewFilter(Enabled(),
		WithFilterOptions(FilterAll),
		WithFS(os.DirFS(tmpDir)),
	)

	for name := range files {
		_, _ = fltr.ShouldFilter(name)
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

	f := NewFilter(Disabled())
	stats := f.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 0)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 0)
	assertEqual(t, "FilteredBy SQLC", stats.FilteredBy(ReasonSQLC), 0)
}

func TestShouldFilterExcludePattern(t *testing.T) {
	t.Parallel()

	tmpDir := t.TempDir()

	dbDir := filepath.Join(tmpDir, "db")

	mkdirAll(t, dbDir)

	tmpFile := filepath.Join(dbDir, "models.go")
	writeFile(t, tmpFile, "// Code generated by sqlc. DO NOT EDIT.\npackage db\n")

	filter := NewFilter(Enabled(),
		WithFilterOptions(FilterSQLC),
		WithExcludePatterns("**/db/*.go"),
		WithFS(os.DirFS(tmpDir)),
	)

	if !mustShouldFilter(t, filter, filepath.Join("db", "models.go")) {
		t.Error("expected exclude pattern match to be filtered")
	}

	stats := filter.GetStats()

	assertFilterStats(t, stats, ReasonExcludePattern, 1, "exclude-pattern")
}

func TestFilterWithMapFS(t *testing.T) {
	t.Parallel()

	t.Run("detects sqlc via fstest.MapFS", testMapFSDetectsSQLC)
	t.Run("does not filter non-generated file", testMapFSNonGenerated)
	t.Run("non-existent file returns not filtered", testMapFSNonExistent)
	t.Run("multiple generators via MapFS", testMapFSMultipleGenerators)
}

func testMapFSDetectsSQLC(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"db/models.go": newMapFile(
			"// Code generated by sqlc. DO NOT EDIT.\n" +
				"package db\n" +
				"type User struct{ ID int64 }",
		),
	}

	fltr := NewFilter(Enabled(),
		WithFilterOptions(FilterSQLC),
		WithFS(mapFS),
	)

	if !mustShouldFilter(t, fltr, "db/models.go") {
		t.Error("expected sqlc-generated file to be filtered")
	}

	stats := fltr.GetStats()
	assertEqual(t, "SQLC filtered", stats.FilteredBy(ReasonSQLC), 1)
}

func testMapFSNonGenerated(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"main.go": newMapFile("package main\nfunc main() {}"),
	}

	fltr := NewFilter(Enabled(),
		WithFilterOptions(FilterAll),
		WithFS(mapFS),
	)

	if mustShouldFilter(t, fltr, "main.go") {
		t.Error("expected non-generated file to not be filtered")
	}
}

func testMapFSNonExistent(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{}

	fltr := NewFilter(Enabled(),
		WithFilterOptions(FilterSQLC),
		WithFS(mapFS),
	)

	_, err := fltr.ShouldFilter("nonexistent.go")
	if err == nil {
		t.Error("expected error for non-existent file")
	}
}

func testMapFSMultipleGenerators(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"db/models.go": newMapFile(
			"// Code generated by sqlc. DO NOT EDIT.\n" +
				"package db\n",
		),
		"components/header_templ.go": newMapFile(
			"// Code generated by templ DO NOT EDIT\n" +
				"package components\n" +
				"import \"github.com/a-h/templ\"\n" +
				"func Header() templ.Component { return nil }",
		),
		"main.go": newMapFile("package main\nfunc main() {}"),
	}

	fltr := NewFilter(Enabled(),
		WithFilterOptions(FilterAll),
		WithFS(mapFS),
	)

	_, _ = fltr.ShouldFilter("db/models.go")
	_, _ = fltr.ShouldFilter("components/header_templ.go")
	_, _ = fltr.ShouldFilter("main.go")

	stats := fltr.GetStats()
	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 3)
	assertEqual(t, "SQLC filtered", stats.FilteredBy(ReasonSQLC), 1)
	assertEqual(t, "Templ filtered", stats.FilteredBy(ReasonTempl), 1)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 2)
}

func TestFindSQLCConfigsFSWithMapFS(t *testing.T) {
	t.Parallel()

	t.Run("finds sqlc.yaml in MapFS",
		testFindSQLCConfig("sqlc.yaml", ValidSQLCConfig("postgresql")))
	t.Run("finds sqlc.yml in subdirectory",
		testFindSQLCConfig("internal/db/sqlc.yml", ValidSQLCConfig("mysql")))
	t.Run("skips dot directories", testFindSQLCSkipsDotDirs)
	t.Run("no configs returns empty map", testFindSQLCSkipsDotDirs)
}

func testFindSQLCConfig(path, configContent string) func(t *testing.T) {
	return func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			path: newMapFile(configContent),
		}

		testFindSQLCConfigCount(t, mapFS, 1)
	}
}

func testFindSQLCSkipsDotDirs(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		".git/sqlc.yaml": newMapFile("version: \"2\"\n"),
	}

	testFindSQLCConfigCount(t, mapFS, 0)
}

func testFindSQLCConfigCount(t *testing.T, mapFS fstest.MapFS, expected int) {
	t.Helper()

	configs, err := FindSQLCConfigsFS(mapFS, []string{"."})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	assertMapLen(t, "configs", configs, expected)
}

func TestGetSQLOutputDirsFSWithMapFS(t *testing.T) {
	t.Parallel()

	t.Run("extracts output dirs from config", testOutputDirsFromConfig)
	t.Run("no configs returns empty slice", testOutputDirsNoConfigs)
	t.Run("invalid yaml returns error", testOutputDirsInvalidYAML)
}

func testOutputDirsFromConfig(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"sqlc.yaml": newMapFile(ValidSQLCConfig("postgresql")),
	}

	dirs, err := GetSQLOutputDirsFS(mapFS, []string{"."})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(dirs) != 1 {
		t.Fatalf("expected 1 output dir, got %d: %v", len(dirs), dirs)
	}

	assertEqual(t, "output dir", dirs[0], "db")
}

func testOutputDirsNoConfigs(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{}

	dirs, err := GetSQLOutputDirsFS(mapFS, []string{"."})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(dirs) != 0 {
		t.Errorf("expected 0 dirs, got %d", len(dirs))
	}
}

func testOutputDirsInvalidYAML(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"sqlc.yaml": newMapFile("{{invalid yaml"),
	}

	_, err := GetSQLOutputDirsFS(mapFS, []string{"."})
	if err == nil {
		t.Error("expected error for invalid yaml")
	}
}

func TestParseSQLCConfigFSWithMapFS(t *testing.T) {
	t.Parallel()

	t.Run("parses valid config", testParseValidConfig)
	t.Run("non-existent file returns error", testParseNonExistent)
}

func testParseValidConfig(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"sqlc.yaml": newMapFile(
			"version: \"2\"\n" +
				"sql:\n" +
				"  - engine: \"postgresql\"\n" +
				"    gen:\n" +
				"      go:\n" +
				"        package: \"db\"\n" +
				"        out: \"db\"\n",
		),
	}

	config, err := parseSQLCConfigFS(mapFS, "sqlc.yaml")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	assertEqual(t, "version", config.Version, "2")
	assertEqual(t, "SQL engines", len(config.SQL), 1)
	assertEqual(t, "out dir", config.SQL[0].Gen.Go.Out, "db")
}

func testParseNonExistent(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{}

	_, err := parseSQLCConfigFS(mapFS, "missing.yaml")
	if err == nil {
		t.Error("expected error for missing file")
	}
}

func TestShouldFilterConcurrent(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		"db/models.go": newMapFile("// Code generated by sqlc. DO NOT EDIT.\npackage db\n"),
		"main.go":      newMapFile("package main\nfunc main() {}\n"),
		"api.go":       newMapFile("package main\n"),
	}

	filter := NewFilter(
		Enabled(),
		WithFilterOptions(FilterAll),
		WithFS(mapFS),
	)

	const goroutines = 100

	var wg sync.WaitGroup
	wg.Add(goroutines)

	for i := range goroutines {
		go func() {
			defer wg.Done()

			files := []string{"db/models.go", "main.go", "api.go"}
			file := files[i%len(files)]

			filtered, err := filter.ShouldFilter(file)
			if err != nil {
				t.Errorf("ShouldFilter(%q) error: %v", file, err)
			}

			switch file {
			case "db/models.go":
				if !filtered {
					t.Error("expected db/models.go to be filtered")
				}
			case "main.go", "api.go":
				if filtered {
					t.Errorf("expected %s to not be filtered", file)
				}
			}
		}()
	}

	wg.Wait()

	stats := filter.GetStats()

	assertEqual(t, "total checked", int(stats.TotalFilesChecked), goroutines)
}

func TestShouldFilterEdgeCases(t *testing.T) {
	t.Parallel()

	t.Run("empty path returns error", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll))

		_, err := filter.ShouldFilter("")
		if err == nil {
			t.Error("expected error for empty path")
		}
	})

	t.Run("path with spaces", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"path with spaces/models.go": newMapFile("// Code generated by sqlc. DO NOT EDIT.\npackage db\n"),
		}

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll), WithFS(mapFS))

		if !mustShouldFilter(t, filter, "path with spaces/models.go") {
			t.Error("expected file with spaces in path to be filtered")
		}
	})

	t.Run("unicode filename", func(t *testing.T) {
		t.Parallel()

		mapFS := fstest.MapFS{
			"dönner/models.go": newMapFile("// Code generated by sqlc. DO NOT EDIT.\npackage db\n"),
		}

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll), WithFS(mapFS))

		if !mustShouldFilter(t, filter, "dönner/models.go") {
			t.Error("expected unicode filename to be filtered")
		}
	})

	t.Run("very long filename", func(t *testing.T) {
		t.Parallel()

		longName := strings.Repeat("a", 200) + ".go"

		mapFS := fstest.MapFS{
			longName: newMapFile("package main\n"),
		}

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll), WithFS(mapFS))

		filtered, err := filter.ShouldFilter(longName)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if filtered {
			t.Error("expected long-named regular file to not be filtered")
		}
	})

	t.Run("nil FS defaults to OS filesystem", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithFilterOptions(FilterAll), WithFS(nil))

		filtered, err := filter.ShouldFilter("nonexistent_deffile_12345.go")
		if err == nil {
			t.Error("expected error for nonexistent file with OS FS")
		}

		if filtered {
			t.Error("expected nonexistent file to not be filtered even on error")
		}
	})
}

func TestFilterString(t *testing.T) {
	t.Parallel()

	t.Run("disabled filter", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Disabled())
		assertContains(t, filter.String(), "disabled")
	})

	t.Run("enabled with options", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithFilterOptions(FilterSQLC, FilterTempl))
		str := filter.String()

		assertContains(t, str, "sqlc")
		assertContains(t, str, "templ")
		assertContains(t, str, "options=")
	})

	t.Run("enabled with include patterns", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithIncludePatterns("pkg/*.go"))
		assertContains(t, filter.String(), "includes=")
	})

	t.Run("enabled with exclude patterns", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(Enabled(), WithExcludePatterns("vendor/**"))
		assertContains(t, filter.String(), "excludes=")
	})

	t.Run("enabled with all options and patterns", func(t *testing.T) {
		t.Parallel()

		filter := NewFilter(
			Enabled(),
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
