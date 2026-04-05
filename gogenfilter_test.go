package gogenfilter

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"
	"testing/quick"
)

func testPatternSetter(
	t *testing.T,
	f *Filter,
	setter func(*Filter),
	getPatterns func(*Filter) []string,
	expectedLen int,
) {
	t.Helper()
	setter(f)

	patterns := getPatterns(f)
	if len(patterns) != expectedLen {
		t.Errorf("Expected %d patterns, got %d", expectedLen, len(patterns))
	}
}

func runBoolTableTest[T any](t *testing.T, tests []struct {
	name     string
	input    T
	expected bool
}, fn func(T) bool, fnName string,
) {
	t.Helper()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := fn(tt.input)
			if got != tt.expected {
				t.Errorf("%s() = %v, want %v", fnName, got, tt.expected)
			}
		})
	}
}

type generatedFileTest struct {
	name     string
	filePath string
	content  string
	expected bool
}

func simpleGeneratedFileTests(
	generatorName, generatedFilePath, generatedContent, regularFilePath, regularContent string,
) []generatedFileTest {
	return []generatedFileTest{
		{
			name:     generatorName + " generated file",
			filePath: generatedFilePath,
			content:  generatedContent,
			expected: true,
		},
		{
			name:     "not " + generatorName + " - regular file",
			filePath: regularFilePath,
			content:  regularContent,
			expected: false,
		},
	}
}

func runGeneratedFileTest(
	t *testing.T,
	tests []generatedFileTest,
	fn func(string, string) bool,
	fnName string,
) {
	t.Helper()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := fn(tt.filePath, tt.content)
			if got != tt.expected {
				t.Errorf("%s(%q) = %v, want %v", fnName, tt.filePath, got, tt.expected)
			}
		})
	}
}

func TestNewFilter(t *testing.T) {
	t.Run("creates disabled filter", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(false, nil)
		if f.enabled {
			t.Error("Expected disabled filter")
		}

		if len(f.options) != 0 {
			t.Errorf("Expected empty options, got %v", f.options)
		}
	})

	t.Run("creates enabled filter with options", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(true, []FilterOption{FilterSQLC, FilterTempl})
		if !f.enabled {
			t.Error("Expected enabled filter")
		}

		if !f.options[FilterSQLC] {
			t.Error("Expected SQLC option enabled")
		}

		if !f.options[FilterTempl] {
			t.Error("Expected Templ option enabled")
		}
	})

	t.Run("creates enabled filter with FilterAll", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(true, []FilterOption{FilterAll})
		if !f.enabled {
			t.Error("Expected enabled filter")
		}

		for _, opt := range allSpecificOptions() {
			if !f.options[opt] {
				t.Errorf("Expected %s option enabled for FilterAll", opt)
			}
		}

		if !f.options[FilterGeneric] {
			t.Error("Expected Generic option enabled for FilterAll")
		}
	})
}

func TestShouldFilter(t *testing.T) {
	t.Run("disabled filter never filters", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(false, []FilterOption{FilterAll})
		if f.ShouldFilter("any/file.go") {
			t.Error("Disabled filter should not filter")
		}
	})
}

func TestMatchPattern(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		path     string
		pattern  string
		expected bool
	}{
		{name: "exact match", path: "file.go", pattern: "file.go", expected: true},
		{name: "wildcard match", path: "test.go", pattern: "*.go", expected: true},
		{name: "wildcard no match", path: "test.txt", pattern: "*.go", expected: false},
		{name: "directory pattern", path: "vendor/file.go", pattern: "vendor/*", expected: true},
		{
			name:     "complex pattern",
			path:     "generated/sqlc/models.go",
			pattern:  "generated/sqlc/*.go",
			expected: true,
		},
		{
			name:     "single star does not match subdirectories",
			path:     "generated/sqlc/sub/models.go",
			pattern:  "generated/sqlc/*.go",
			expected: false,
		},
		{
			name:     "double star matches any depth",
			path:     "generated/sqlc/sub/models.go",
			pattern:  "generated/**/*.go",
			expected: true,
		},
		{
			name:     "double star prefix matches at root",
			path:     "any/nested/path/file.go",
			pattern:  "**/file.go",
			expected: true,
		},
		{
			name:     "double star suffix matches everything under",
			path:     "vendor/deep/nested/pkg/file.go",
			pattern:  "vendor/**",
			expected: true,
		},
		{
			name:     "no match wrong directory",
			path:     "other/file.go",
			pattern:  "vendor/*.go",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := MatchPattern(tt.path, tt.pattern)
			if got != tt.expected {
				t.Errorf(
					"MatchPattern(%q, %q) = %v, want %v",
					tt.path,
					tt.pattern,
					got,
					tt.expected,
				)
			}
		})
	}
}

func TestFilterIdempotentProperty(t *testing.T) {
	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(filePath string) bool {
			if filePath == "" || len(filePath) < 1 {
				return true
			}

			filter1 := NewFilter(true, nil)
			filter2 := NewFilter(true, nil)

			return filter1.ShouldFilter(filePath) == filter2.ShouldFilter(filePath)
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Idempotent property failed: %v", err)
		}
	})
}

func TestDisabledFilterProperty(t *testing.T) {
	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(filePath string) bool {
			if filePath == "" {
				return true
			}

			return !NewFilter(false, nil).ShouldFilter(filePath)
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Disabled filter property failed: %v", err)
		}
	})
}

func TestIncludePatternProperty(t *testing.T) {
	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(includePattern, filePath string) bool {
			if includePattern == "" || filePath == "" {
				return true
			}

			filter := NewFilter(true, nil)
			filter.WithIncludePatterns([]string{includePattern})

			if !MatchPattern(filePath, includePattern) {
				return true
			}

			return !filter.ShouldFilter(filePath)
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Include pattern property failed: %v", err)
		}
	})
}

func TestExcludePatternProperty(t *testing.T) {
	t.Run("property test", func(t *testing.T) {
		t.Parallel()

		f := func(excludePattern, filePath string) bool {
			if excludePattern == "" || filePath == "" {
				return true
			}

			filter := NewFilter(true, nil)
			filter.WithExcludePatterns([]string{excludePattern})
			shouldFilter := MatchPattern(filePath, excludePattern)
			isFiltered := filter.ShouldFilter(filePath)

			return shouldFilter == isFiltered
		}

		err := quick.Check(f, nil)
		if err != nil {
			t.Errorf("Exclude pattern property failed: %v", err)
		}
	})
}

func createTempFile(t *testing.T, name, content string) string {
	t.Helper()
	tmpDir := t.TempDir()

	filePath := filepath.Join(tmpDir, name)

	err := os.WriteFile(filePath, []byte(content), 0o600)
	if err != nil {
		t.Fatalf("Failed to create temp file: %v", err)
	}

	return filePath
}

func assertFilterBehavior(
	t *testing.T,
	name, content string,
	opts []FilterOption,
	shouldFilter bool,
) {
	t.Helper()
	tmpFile := createTempFile(t, name, content)
	f := NewFilter(true, opts)

	got := f.ShouldFilter(tmpFile)
	if got != shouldFilter {
		t.Errorf("ShouldFilter() = %v, want %v", got, shouldFilter)
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

type shouldFilterTestCase struct {
	name         string
	fileName     string
	content      string
	opts         []FilterOption
	shouldFilter bool
}

func newShouldFilterTest(
	name, fileName, content string,
	opts ...FilterOption,
) shouldFilterTestCase {
	return shouldFilterTestCase{
		name:         name,
		fileName:     fileName,
		content:      content,
		opts:         opts,
		shouldFilter: true,
	}
}

//nolint:funlen
func shouldFilterTestCases() []shouldFilterTestCase {
	return []shouldFilterTestCase{
		newShouldFilterTest(
			"filters sqlc file",
			"models.go",
			"// Code generated by sqlc. DO NOT EDIT.\npackage db\ntype User struct {}\n",
			FilterSQLC,
		),
		newShouldFilterTest(
			"filters templ file",
			"header_templ.go",
			"package components\nimport \"github.com/a-h/templ\"\nfunc header() templ.Component { return nil }\n",
			FilterTempl,
		),
		{
			name:         "does not filter regular file",
			fileName:     "main.go",
			content:      "package main\nfunc main() {}\n",
			opts:         []FilterOption{FilterAll},
			shouldFilter: false,
		},
		newShouldFilterTest(
			"filters go-enum file",
			"status_enum.go",
			"// Code generated by go-enum DO NOT EDIT.\npackage enums\nconst StatusPending Status = iota\n",
			FilterGoEnum,
		),
		newShouldFilterTest(
			"filters protobuf .pb.go file",
			"user.pb.go",
			"// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
			FilterProtobuf,
		),
		newShouldFilterTest(
			"filters protobuf grpc file",
			"user_grpc.pb.go",
			"// Code generated by protoc-gen-go-grpc. DO NOT EDIT.\npackage pb\n",
			FilterProtobuf,
		),
		newShouldFilterTest(
			"filters mockgen file",
			"service_mock.go",
			"// Code generated by MockGen. DO NOT EDIT.\npackage mocks\n",
			FilterMockgen,
		),
		newShouldFilterTest(
			"filters stringer file",
			"status_string.go",
			`// Code generated by "stringer". DO NOT EDIT.`+"\npackage enums\n",
			FilterStringer,
		),
		newShouldFilterTest(
			"filters generic generated file",
			"custom_gen.go",
			"// Code generated by custom-tool. DO NOT EDIT.\npackage main\n",
			FilterGeneric,
		),
		{
			name:         "generic does not filter without comment",
			fileName:     "regular.go",
			content:      "package main\nfunc main() {}\n",
			opts:         []FilterOption{FilterGeneric},
			shouldFilter: false,
		},
	}
}

type generatorTestCase struct {
	name  string
	fn    func(string, string) bool
	tests []generatedFileTest
}

//nolint:gochecknoglobals
var generatedTestCases = []generatorTestCase{
	{
		name: "SQLC",
		fn:   IsSQLCGenerated,
		tests: []generatedFileTest{
			{
				name:     "sqlc models with comment",
				filePath: "db/models.go",
				content:  "// Code generated by sqlc. DO NOT EDIT.\npackage db\n\ntype User struct {\n\tID int\n}",
				expected: true,
			},
			{
				name:     "sqlc query with version comment",
				filePath: "db/query.sql.go",
				content:  "package db\n\n// versions:\n//   sqlc v1.25.0\n",
				expected: true,
			},
			{
				name:     "sqlc articles.sql.go",
				filePath: "internal/storage/queries/articles.sql.go",
				content:  "// Code generated by sqlc. DO NOT EDIT.\npackage queries\n\ntype Article struct {\n\tID    int64\n}",
				expected: true,
			},
			{
				name:     "not sqlc - regular Go file",
				filePath: "models/user.go",
				content:  "package models\n\ntype User struct {\n\tID string\n}",
				expected: false,
			},
		},
	},
	{
		name: "Templ",
		fn:   IsTemplGenerated,
		tests: []generatedFileTest{
			{
				name:     "templ generated file",
				filePath: "components/header_templ.go",
				content: "// Code generated by templ DO NOT EDIT\n\npackage components\n\n" +
					"import (\n\t\"context\"\n\t\"io\"\n\t\"github.com/a-h/templ\"\n)\n\n" +
					"func header(name string) templ.Component {\n\treturn templ.ComponentFunc(nil)\n}",
				expected: true,
			},
			{
				name:     "not templ - regular file",
				filePath: "components/helper.go",
				content:  "package components\n\nfunc Helper() string {\n\treturn \"helper\"\n}",
				expected: false,
			},
		},
	},
	{
		name: "GoEnum",
		fn:   IsGoEnumGenerated,
		tests: []generatedFileTest{
			{
				name:     "go-enum generated file",
				filePath: "enums/status_enum.go",
				content:  "// Code generated by go-enum DO NOT EDIT.\npackage enums\n\ntype Status int",
				expected: true,
			},
			{
				name:     "not go-enum - regular file",
				filePath: "models/user.go",
				content:  "package models\n\ntype User struct {\n\tID   int\n\tName string\n}",
				expected: false,
			},
			{
				name:     "wrong filename - not _enum.go suffix",
				filePath: "enums/status.go",
				content:  "// Code generated by go-enum DO NOT EDIT.\npackage enums\n\ntype Status int",
				expected: false,
			},
		},
	},
	{
		name: "Protobuf",
		fn:   IsProtobufGenerated,
		tests: []generatedFileTest{
			{
				name:     "protobuf .pb.go file",
				filePath: "pb/user.pb.go",
				content:  "// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
				expected: true,
			},
			{
				name:     "protobuf grpc file",
				filePath: "pb/user_grpc.pb.go",
				content:  "// Code generated by protoc-gen-go-grpc. DO NOT EDIT.\npackage pb\n",
				expected: true,
			},
			{
				name:     "protobuf without code comment",
				filePath: "pb/user.pb.go",
				content:  "package pb\n",
				expected: false,
			},
			{
				name:     "not protobuf - wrong extension",
				filePath: "pb/user.go",
				content:  "// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
				expected: false,
			},
		},
	},
	{
		name: "Mockgen",
		fn:   IsMockgenGenerated,
		tests: simpleGeneratedFileTests(
			"mockgen",
			"mocks/service_mock.go",
			"// Code generated by MockGen. DO NOT EDIT.\npackage mocks\n",
			"service/service.go",
			"package service\nfunc New() *Service { return nil }\n",
		),
	},
	{
		name: "Stringer",
		fn:   IsStringerGenerated,
		tests: simpleGeneratedFileTests(
			"stringer",
			"enums/status_string.go",
			"// Code generated by \"stringer\". DO NOT EDIT.\npackage enums\n",
			"enums/status.go",
			"package enums\ntype Status int\n",
		),
	},
	{
		name: "Generic",
		fn:   IsGenericGenerated,
		tests: []generatedFileTest{
			{
				name:     "generic generated file",
				filePath: "generated/custom.go",
				content:  "// Code generated by my-custom-tool. DO NOT EDIT.\npackage generated\n",
				expected: true,
			},
			{
				name:     "generic catches sqlc comment",
				filePath: "db/models.go",
				content:  "// Code generated by sqlc. DO NOT EDIT.\npackage db\n",
				expected: true,
			},
			{
				name:     "not generated - no comment",
				filePath: "regular/file.go",
				content:  "package regular\nfunc DoSomething() {}\n",
				expected: false,
			},
		},
	},
}

func TestIsGenerated(t *testing.T) {
	t.Parallel()

	for _, gen := range generatedTestCases {
		t.Run(gen.name, func(t *testing.T) {
			t.Parallel()
			runGeneratedFileTest(t, gen.tests, gen.fn, "Is"+gen.name+"Generated")
		})
	}
}

func TestNeedsContentCheck(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		input    map[FilterOption]bool
		expected bool
	}{
		{
			name:     "empty options",
			input:    map[FilterOption]bool{},
			expected: false,
		},
		{
			name:     "only content-based filter",
			input:    map[FilterOption]bool{FilterGeneric: true},
			expected: true,
		},
		{
			name:     "sqlc filter requires content",
			input:    map[FilterOption]bool{FilterSQLC: true},
			expected: true,
		},
		{
			name:     "no filters enabled",
			input:    map[FilterOption]bool{FilterSQLC: false, FilterGeneric: false},
			expected: false,
		},
	}

	runBoolTableTest(t, tests, needsContentCheck, "needsContentCheck")
}

func TestFilterMetrics(t *testing.T) {
	t.Parallel()

	t.Run("tracks filtered files by reason", func(t *testing.T) {
		t.Parallel()

		metrics := NewMetrics()
		metrics.Record("db/models.go", ReasonSQLC)
		metrics.Record("db/query.sql.go", ReasonSQLC)
		metrics.Record("components/header_templ.go", ReasonTempl)
		metrics.Record("vendor/lib.go", ReasonExcludePattern)

		stats := metrics.GetStats()
		assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 4)
		assertEqual(t, "SQLC count", stats.FilteredByReason[ReasonSQLC], 2)
		assertEqual(t, "Templ count", stats.FilteredByReason[ReasonTempl], 1)
		assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 4)
	})

	t.Run("tracks not filtered files", func(t *testing.T) {
		t.Parallel()

		metrics := NewMetrics()
		metrics.Record("db/models.go", ReasonSQLC)
		metrics.Record("main.go", ReasonNotFiltered)
		metrics.Record("service/user.go", ReasonNotFiltered)

		stats := metrics.GetStats()
		assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 3)
		assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 1)
	})

	t.Run("nil metrics handler", func(t *testing.T) {
		t.Parallel()

		var metrics *Metrics
		metrics.Record("test.go", ReasonSQLC)

		stats := metrics.GetStats()
		assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 0)
	})
}

func TestFilterWithMetrics(t *testing.T) {
	t.Run("integration test", func(t *testing.T) {
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

		fltr := NewFilter(true, []FilterOption{FilterAll})

		for name := range files {
			filePath := filepath.Join(tmpDir, name)
			_ = fltr.ShouldFilter(filePath)
		}

		stats := fltr.GetStats()
		assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 4)
		assertEqual(t, "SQLC filtered", stats.FilteredByReason[ReasonSQLC], 1)
		assertEqual(t, "Templ filtered", stats.FilteredByReason[ReasonTempl], 1)
		assertEqual(t, "GoEnum filtered", stats.FilteredByReason[ReasonGoEnum], 1)
		assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 3)
	})
}

type patternTestCase struct {
	name     string
	setter   func(*Filter)
	getter   func(*Filter) []string
	patterns []string
}

func TestWithPatterns(t *testing.T) {
	t.Parallel()

	testCases := []patternTestCase{
		{
			name:     "include patterns",
			setter:   func(f *Filter) { f.WithIncludePatterns([]string{"vendor/*", "generated/keep.go"}) },
			getter:   func(f *Filter) []string { return f.includePatterns },
			patterns: []string{"vendor/*", "generated/keep.go"},
		},
		{
			name:     "exclude patterns",
			setter:   func(f *Filter) { f.WithExcludePatterns([]string{"test/*", "*.pb.go"}) },
			getter:   func(f *Filter) []string { return f.excludePatterns },
			patterns: []string{"test/*", "*.pb.go"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			f := NewFilter(true, []FilterOption{FilterAll})
			testPatternSetter(t, f, tc.setter, tc.getter, len(tc.patterns))
		})
	}
}

func TestFindProjectRoot(t *testing.T) {
	t.Parallel()

	t.Run("finds marker in current directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()

		writeFile(t, filepath.Join(tmpDir, "go.mod"), "module test\n")

		root, err := FindProjectRoot(tmpDir, []string{"go.mod"})
		if err != nil {
			t.Fatalf("FindProjectRoot() error: %v", err)
		}

		if root != tmpDir {
			t.Errorf("Expected %q, got %q", tmpDir, root)
		}
	})

	t.Run("finds marker in parent directory", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()

		childDir := filepath.Join(tmpDir, "subdir", "deep")
		mkdirAll(t, childDir)

		writeFile(t, filepath.Join(tmpDir, "go.mod"), "module test\n")

		root, err := FindProjectRoot(childDir, []string{"go.mod"})
		if err != nil {
			t.Fatalf("FindProjectRoot() error: %v", err)
		}

		if root != tmpDir {
			t.Errorf("Expected %q, got %q", tmpDir, root)
		}
	})

	t.Run("returns error when no marker found", func(t *testing.T) {
		t.Parallel()
		tmpDir := t.TempDir()

		_, err := FindProjectRoot(tmpDir, []string{"nonexistent.marker"})
		if err == nil {
			t.Error("Expected error when no marker found")
		}
	})

	t.Run("ProjectRootError unwraps cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			StartPath: "/some/path",
			Markers:   []string{"go.mod"},
			Cause:     fmt.Errorf("inner error"),
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}

		if err.Unwrap() == nil {
			t.Error("Expected non-nil unwrap")
		}
	})

	t.Run("ProjectRootError without cause", func(t *testing.T) {
		t.Parallel()

		err := &ProjectRootError{
			StartPath: "/some/path",
			Markers:   []string{"go.mod"},
			Cause:     nil,
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}

		if err.Unwrap() != nil {
			t.Error("Expected nil unwrap for nil cause")
		}
	})
}

func TestHasSQLCCodePatterns(t *testing.T) {
	t.Parallel()

	runBoolTableTest(t, []struct {
		name     string
		input    string
		expected bool
	}{
		{name: "sqlc.Arg", input: "id := sqlc.Arg(\"user_id\")", expected: true},
		{name: "sqlc.Narg", input: "id := sqlc.Narg(\"user_id\")", expected: true},
		{name: "query method", input: "row := q.query(ctx, sql)", expected: true},
		{name: "no pattern", input: "package main\nfunc main() {}", expected: false},
	}, HasSQLCCodePatterns, "HasSQLCCodePatterns")
}

func TestMatchesSQLCFilename(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{name: "models.go", path: "db/models.go", expected: true},
		{name: "querier.go", path: "db/querier.go", expected: true},
		{name: "query.sql.go", path: "db/query.sql.go", expected: true},
		{name: "batch.go", path: "db/batch.go", expected: true},
		{name: "users.sql.go", path: "db/users.sql.go", expected: true},
		{name: "regular file", path: "db/main.go", expected: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := MatchesSQLCFilename(tt.path)
			if got != tt.expected {
				t.Errorf("MatchesSQLCFilename(%q) = %v, want %v", tt.path, got, tt.expected)
			}
		})
	}
}

func TestDetectGenerated(t *testing.T) {
	t.Parallel()

	for _, tc := range detectGeneratedTestCases() {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			reason := getFilenameBasedReason(tc.filename, tc.options)
			if reason != tc.expected {
				t.Errorf("Expected %v, got %v", tc.expected, reason)
			}
		})
	}
}

type filenameTestCase struct {
	name     string
	filename string
	options  map[FilterOption]bool
	expected FilterReason
}

func detectGeneratedTestCases() []filenameTestCase {
	return []filenameTestCase{
		{
			"detects sqlc by filename",
			"db/models.go",
			map[FilterOption]bool{FilterSQLC: true},
			ReasonSQLC,
		},
		{
			"detects templ by filename",
			"page_templ.go",
			map[FilterOption]bool{FilterTempl: true},
			ReasonTempl,
		},
		{
			"detects go-enum by filename",
			"status_enum.go",
			map[FilterOption]bool{FilterGoEnum: true},
			ReasonGoEnum,
		},
		{
			"detects protobuf .pb.go by filename",
			"user.pb.go",
			map[FilterOption]bool{FilterProtobuf: true},
			ReasonProtobuf,
		},
		{
			"detects protobuf grpc by filename",
			"user_grpc.pb.go",
			map[FilterOption]bool{FilterProtobuf: true},
			ReasonProtobuf,
		},
		{
			"detects mockgen _mock.go by filename",
			"service_mock.go",
			map[FilterOption]bool{FilterMockgen: true},
			ReasonMockgen,
		},
		{
			"detects mockgen mock_ by filename",
			"mock_service.go",
			map[FilterOption]bool{FilterMockgen: true},
			ReasonMockgen,
		},
		{
			"returns not filtered for regular file",
			"main.go",
			map[FilterOption]bool{FilterSQLC: true},
			ReasonNotFiltered,
		},
	}
}

func testStringer[T any](t *testing.T, name string, cases []struct {
	value    T
	expected string
},
) {
	t.Helper()

	for _, tt := range cases {
		t.Run(fmt.Sprintf("%s/%v", name, tt.value), func(t *testing.T) {
			t.Parallel()

			var got string
			if s, ok := any(tt.value).(interface{ String() string }); ok {
				got = s.String()
			} else {
				t.Skip("type does not implement String()")

				return
			}

			if got != tt.expected {
				t.Errorf("%s(%v).String() = %q, want %q", name, tt.value, got, tt.expected)
			}
		})
	}
}

func TestFilterOptionString(t *testing.T) {
	t.Parallel()

	testStringer(t, "FilterOption", []struct {
		value    FilterOption
		expected string
	}{
		{FilterSQLC, "sqlc"},
		{FilterTempl, "templ"},
		{FilterGoEnum, "go-enum"},
		{FilterProtobuf, "protobuf"},
		{FilterMockgen, "mockgen"},
		{FilterStringer, "stringer"},
		{FilterGeneric, "generic"},
		{FilterAll, "all"},
	})
}

func TestFilterReasonString(t *testing.T) {
	t.Parallel()

	testStringer(t, "FilterReason", []struct {
		value    FilterReason
		expected string
	}{
		{ReasonSQLC, "sqlc"},
		{ReasonTempl, "templ"},
		{ReasonGoEnum, "go-enum"},
		{ReasonProtobuf, "protobuf"},
		{ReasonMockgen, "mockgen"},
		{ReasonStringer, "stringer"},
		{ReasonGeneric, "generic"},
		{ReasonNotFiltered, "not-filtered"},
	})
}

func TestDetectGeneratedWithFile(t *testing.T) {
	t.Parallel()

	t.Run("detects generated file from disk", func(t *testing.T) {
		t.Parallel()

		content := "// Code generated by sqlc. DO NOT EDIT.\npackage db\ntype User struct{}\n"
		tmpFile := createTempFile(t, "models.go", content)

		reason := DetectGenerated(tmpFile, map[FilterOption]bool{FilterSQLC: true})
		if reason != ReasonSQLC {
			t.Errorf("Expected %v, got %v", ReasonSQLC, reason)
		}
	})

	t.Run("returns not filtered for non-existent file", func(t *testing.T) {
		t.Parallel()

		reason := DetectGenerated("/nonexistent/file.go", map[FilterOption]bool{FilterSQLC: true})
		if reason != ReasonNotFiltered {
			t.Errorf("Expected %v, got %v", ReasonNotFiltered, reason)
		}
	})

	t.Run("returns not filtered when no options enabled", func(t *testing.T) {
		t.Parallel()

		content := "// Code generated by sqlc. DO NOT EDIT.\npackage db\n"
		tmpFile := createTempFile(t, "models.go", content)

		reason := DetectGenerated(tmpFile, map[FilterOption]bool{})
		if reason != ReasonNotFiltered {
			t.Errorf("Expected %v, got %v", ReasonNotFiltered, reason)
		}
	})
}

func TestSQLCConfigError(t *testing.T) {
	t.Parallel()

	t.Run("error with config path", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{
			ConfigPath: "/path/to/sqlc.yaml",
			Operation:  "read",
			Cause:      fmt.Errorf("permission denied"),
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}

		if err.Unwrap() == nil {
			t.Error("Expected non-nil unwrap")
		}
	})

	t.Run("error without config path", func(t *testing.T) {
		t.Parallel()

		err := &SQLCConfigError{
			ConfigPath: "",
			Operation:  "find",
			Cause:      fmt.Errorf("not found"),
		}

		if err.Error() == "" {
			t.Error("Expected non-empty error message")
		}
	})
}

func TestEmptyContent(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		fn   func(string, string) bool
	}{
		{"IsSQLCGenerated", IsSQLCGenerated},
		{"IsTemplGenerated", IsTemplGenerated},
		{"IsGoEnumGenerated", IsGoEnumGenerated},
		{"IsProtobufGenerated", IsProtobufGenerated},
		{"IsMockgenGenerated", IsMockgenGenerated},
		{"IsStringerGenerated", IsStringerGenerated},
		{"IsGenericGenerated", IsGenericGenerated},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			if tt.fn("file.go", "") {
				t.Errorf("%s with empty content should return false", tt.name)
			}
		})
	}
}

func TestMatchesSQLCFilenameFalsePositives(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{name: "user_models.go is not sqlc", path: "db/user_models.go", expected: false},
		{name: "myquerier.go is not sqlc", path: "db/myquerier.go", expected: false},
		{name: "batch_processor.go is not sqlc", path: "db/batch_processor.go", expected: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := MatchesSQLCFilename(tt.path)
			if got != tt.expected {
				t.Errorf("MatchesSQLCFilename(%q) = %v, want %v", tt.path, got, tt.expected)
			}
		})
	}
}

func benchmarkShouldFilter(b *testing.B, enabled bool) {
	b.Helper()

	f := NewFilter(enabled, []FilterOption{FilterAll})

	for b.Loop() {
		_ = f.ShouldFilter("db/models.go")
	}
}

func BenchmarkShouldFilter(b *testing.B) {
	benchmarkShouldFilter(b, true)
}

func BenchmarkShouldFilterDisabled(b *testing.B) {
	benchmarkShouldFilter(b, false)
}

func BenchmarkDetectGenerated(b *testing.B) {
	options := map[FilterOption]bool{FilterAll: true}

	for b.Loop() {
		_ = getFilenameBasedReason("db/models.go", options)
	}
}

func benchmarkIsGenerated(b *testing.B, content string, fn func(string, string) bool) {
	b.Helper()

	for b.Loop() {
		_ = fn("file.go", content)
	}
}

func BenchmarkIsSQLCGenerated(b *testing.B) {
	benchmarkIsGenerated(
		b,
		"// Code generated by sqlc. DO NOT EDIT.\npackage db\n\ntype User struct {\n\tID int64\n\tName string\n}",
		IsSQLCGenerated,
	)
}

func BenchmarkIsProtobufGenerated(b *testing.B) {
	benchmarkIsGenerated(
		b,
		"// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
		IsProtobufGenerated,
	)
}

func BenchmarkIsGenericGenerated(b *testing.B) {
	benchmarkIsGenerated(
		b,
		"// Code generated by some-tool. DO NOT EDIT.\npackage main\n",
		IsGenericGenerated,
	)
}
