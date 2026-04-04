package gogenfilter

import (
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

type generatedFileTest struct {
	name     string
	filePath string
	content  string
	expected bool
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

		for _, opt := range allSpecificOptions {
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
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
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
	tests := []struct {
		name         string
		fileName     string
		content      string
		opts         []FilterOption
		shouldFilter bool
	}{
		{
			name:         "filters sqlc file",
			fileName:     "models.go",
			content:      "// Code generated by sqlc. DO NOT EDIT.\npackage db\ntype User struct {}\n",
			opts:         []FilterOption{FilterSQLC},
			shouldFilter: true,
		},
		{
			name:         "filters templ file",
			fileName:     "header_templ.go",
			content:      "package components\nimport \"github.com/a-h/templ\"\nfunc header() templ.Component { return nil }\n",
			opts:         []FilterOption{FilterTempl},
			shouldFilter: true,
		},
		{
			name:         "does not filter regular file",
			fileName:     "main.go",
			content:      "package main\nfunc main() {}\n",
			opts:         []FilterOption{FilterAll},
			shouldFilter: false,
		},
		{
			name:         "filters go-enum file",
			fileName:     "status_enum.go",
			content:      "// Code generated by go-enum DO NOT EDIT.\npackage enums\nconst StatusPending Status = iota\n",
			opts:         []FilterOption{FilterGoEnum},
			shouldFilter: true,
		},
		{
			name:         "filters protobuf .pb.go file",
			fileName:     "user.pb.go",
			content:      "// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
			opts:         []FilterOption{FilterProtobuf},
			shouldFilter: true,
		},
		{
			name:         "filters protobuf grpc file",
			fileName:     "user_grpc.pb.go",
			content:      "// Code generated by protoc-gen-go-grpc. DO NOT EDIT.\npackage pb\n",
			opts:         []FilterOption{FilterProtobuf},
			shouldFilter: true,
		},
		{
			name:         "filters mockgen file",
			fileName:     "service_mock.go",
			content:      "// Code generated by MockGen. DO NOT EDIT.\npackage mocks\n",
			opts:         []FilterOption{FilterMockgen},
			shouldFilter: true,
		},
		{
			name:         "filters stringer file",
			fileName:     "status_string.go",
			content:      `// Code generated by "stringer". DO NOT EDIT.` + "\npackage enums\n",
			opts:         []FilterOption{FilterStringer},
			shouldFilter: true,
		},
		{
			name:         "filters generic generated file",
			fileName:     "custom_gen.go",
			content:      "// Code generated by custom-tool. DO NOT EDIT.\npackage main\n",
			opts:         []FilterOption{FilterGeneric},
			shouldFilter: true,
		},
		{
			name:         "generic does not filter without comment",
			fileName:     "regular.go",
			content:      "package main\nfunc main() {}\n",
			opts:         []FilterOption{FilterGeneric},
			shouldFilter: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			assertFilterBehavior(t, tt.fileName, tt.content, tt.opts, tt.shouldFilter)
		})
	}
}

func TestIsSQLCGenerated(t *testing.T) {
	tests := []generatedFileTest{
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
	}

	runGeneratedFileTest(t, tests, IsSQLCGenerated, "IsSQLCGenerated")
}

func TestIsTemplGenerated(t *testing.T) {
	t.Parallel()

	tests := []generatedFileTest{
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
	}

	runGeneratedFileTest(t, tests, IsTemplGenerated, "IsTemplGenerated")
}

func TestIsGoEnumGenerated(t *testing.T) {
	t.Parallel()

	tests := []generatedFileTest{
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
	}

	runGeneratedFileTest(t, tests, IsGoEnumGenerated, "IsGoEnumGenerated")
}

func TestIsProtobufGenerated(t *testing.T) {
	t.Parallel()

	tests := []generatedFileTest{
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
	}

	runGeneratedFileTest(t, tests, IsProtobufGenerated, "IsProtobufGenerated")
}

func TestIsMockgenGenerated(t *testing.T) {
	t.Parallel()

	tests := []generatedFileTest{
		{
			name:     "mockgen generated file",
			filePath: "mocks/service_mock.go",
			content:  "// Code generated by MockGen. DO NOT EDIT.\npackage mocks\n",
			expected: true,
		},
		{
			name:     "not mockgen - regular file",
			filePath: "service/service.go",
			content:  "package service\nfunc New() *Service { return nil }\n",
			expected: false,
		},
	}

	runGeneratedFileTest(t, tests, IsMockgenGenerated, "IsMockgenGenerated")
}

func TestIsStringerGenerated(t *testing.T) {
	t.Parallel()

	tests := []generatedFileTest{
		{
			name:     "stringer generated file",
			filePath: "enums/status_string.go",
			content:  "// Code generated by \"stringer\". DO NOT EDIT.\npackage enums\n",
			expected: true,
		},
		{
			name:     "not stringer - regular file",
			filePath: "enums/status.go",
			content:  "package enums\ntype Status int\n",
			expected: false,
		},
	}

	runGeneratedFileTest(t, tests, IsStringerGenerated, "IsStringerGenerated")
}

func TestIsGenericGenerated(t *testing.T) {
	t.Parallel()

	tests := []generatedFileTest{
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
	}

	runGeneratedFileTest(t, tests, IsGenericGenerated, "IsGenericGenerated")
}

func TestNeedsContentCheck(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		options  map[FilterOption]bool
		expected bool
	}{
		{
			name:     "empty options",
			options:  map[FilterOption]bool{},
			expected: false,
		},
		{
			name:     "only content-based filter",
			options:  map[FilterOption]bool{FilterGeneric: true},
			expected: true,
		},
		{
			name:     "sqlc filter requires content",
			options:  map[FilterOption]bool{FilterSQLC: true},
			expected: true,
		},
		{
			name:     "no filters enabled",
			options:  map[FilterOption]bool{FilterSQLC: false, FilterGeneric: false},
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := needsContentCheck(tt.options)
			if got != tt.expected {
				t.Errorf("needsContentCheck() = %v, want %v", got, tt.expected)
			}
		})
	}
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
			err := os.MkdirAll(dir, 0o755)
			if err != nil {
				t.Fatalf("Failed to create dir: %v", err)
			}

			err = os.WriteFile(
				filepath.Join(tmpDir, name),
				[]byte(content),
				0o644,
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

func TestWithIncludePatterns(t *testing.T) {
	t.Run("patterns test", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(true, []FilterOption{FilterAll})
		testPatternSetter(
			t, f,
			func(f *Filter) { f.WithIncludePatterns([]string{"vendor/*", "generated/keep.go"}) },
			func(f *Filter) []string { return f.includePatterns },
			2,
		)
	})
}

func TestWithExcludePatterns(t *testing.T) {
	t.Run("patterns test", func(t *testing.T) {
		t.Parallel()

		f := NewFilter(true, []FilterOption{FilterAll})
		testPatternSetter(
			t, f,
			func(f *Filter) { f.WithExcludePatterns([]string{"test/*", "*.pb.go"}) },
			func(f *Filter) []string { return f.excludePatterns },
			2,
		)
	})
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
		if err := os.MkdirAll(childDir, 0o755); err != nil {
			t.Fatal(err)
		}

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
}

func TestHasSQLCCodePatterns(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		content  string
		expected bool
	}{
		{name: "sqlc.Arg", content: "id := sqlc.Arg(\"user_id\")", expected: true},
		{name: "sqlc.Narg", content: "id := sqlc.Narg(\"user_id\")", expected: true},
		{name: "query method", content: "row := q.query(ctx, sql)", expected: true},
		{name: "no pattern", content: "package main\nfunc main() {}", expected: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := HasSQLCCodePatterns(tt.content)
			if got != tt.expected {
				t.Errorf("HasSQLCCodePatterns() = %v, want %v", got, tt.expected)
			}
		})
	}
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
			got := MatchesSQLCFilename(tt.path)
			if got != tt.expected {
				t.Errorf("MatchesSQLCFilename(%q) = %v, want %v", tt.path, got, tt.expected)
			}
		})
	}
}

func TestDetectGenerated(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		filename string
		options  map[FilterOption]bool
		expected FilterReason
	}{
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

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			reason := getFilenameBasedReason(tc.filename, tc.options)
			if reason != tc.expected {
				t.Errorf("Expected %v, got %v", tc.expected, reason)
			}
		})
	}
}

func TestFilterOptionString(t *testing.T) {
	t.Parallel()

	tests := []struct {
		option   FilterOption
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
	}

	for _, tt := range tests {
		t.Run(string(tt.option), func(t *testing.T) {
			t.Parallel()

			if got := tt.option.String(); got != tt.expected {
				t.Errorf("FilterOption(%q).String() = %q, want %q", tt.option, got, tt.expected)
			}
		})
	}
}

func TestFilterReasonString(t *testing.T) {
	t.Parallel()

	tests := []struct {
		reason   FilterReason
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
	}

	for _, tt := range tests {
		t.Run(string(tt.reason), func(t *testing.T) {
			t.Parallel()

			if got := tt.reason.String(); got != tt.expected {
				t.Errorf("FilterReason(%q).String() = %q, want %q", tt.reason, got, tt.expected)
			}
		})
	}
}

func BenchmarkShouldFilter(b *testing.B) {
	f := NewFilter(true, []FilterOption{FilterAll})

	for b.Loop() {
		_ = f.ShouldFilter("db/models.go")
	}
}

func BenchmarkShouldFilterDisabled(b *testing.B) {
	f := NewFilter(false, []FilterOption{FilterAll})

	for b.Loop() {
		_ = f.ShouldFilter("db/models.go")
	}
}

func BenchmarkDetectGenerated(b *testing.B) {
	options := map[FilterOption]bool{FilterAll: true}

	for b.Loop() {
		_ = getFilenameBasedReason("db/models.go", options)
	}
}

func BenchmarkIsSQLCGenerated(b *testing.B) {
	content := "// Code generated by sqlc. DO NOT EDIT.\npackage db\n\ntype User struct {\n\tID int64\n\tName string\n}"

	for b.Loop() {
		_ = IsSQLCGenerated("db/models.go", content)
	}
}

func BenchmarkIsProtobufGenerated(b *testing.B) {
	content := "// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n"

	for b.Loop() {
		_ = IsProtobufGenerated("pb/user.pb.go", content)
	}
}

func BenchmarkIsGenericGenerated(b *testing.B) {
	content := "// Code generated by some-tool. DO NOT EDIT.\npackage main\n"

	for b.Loop() {
		_ = IsGenericGenerated("generated/file.go", content)
	}
}
