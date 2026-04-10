package gogenfilter

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"testing/fstest"
)

func assertFieldEqual[T comparable](t *testing.T, name string, got, want T, format string) {
	t.Helper()

	if got != want {
		t.Errorf("%s = "+format+", want "+format, name, got, want)
	}
}

func assertStringField(t *testing.T, fieldName, actual, expected string) {
	t.Helper()

	assertFieldEqual(t, fieldName, actual, expected, "%q")
}

func assertEqual[T comparable](t *testing.T, name string, got, want T) {
	t.Helper()

	assertFieldEqual(t, name, got, want, "%v")
}

func assertCallResult[T comparable](t *testing.T, fnName string, arg any, got, want T) {
	t.Helper()

	if got != want {
		if arg == nil {
			t.Errorf("%s() = %v, want %v", fnName, got, want)
		} else {
			t.Errorf("%s(%v) = %v, want %v", fnName, arg, got, want)
		}
	}
}

func assertContains(t *testing.T, got, substr string) {
	t.Helper()

	if !strings.Contains(got, substr) {
		t.Errorf("String() = %q, want to contain %s", got, substr)
	}
}

func assertLen(t *testing.T, name string, got, want int) {
	if got != want {
		t.Errorf("expected %d %s, got %d", want, name, got)
	}
}

func assertMapLen[K, V comparable](t *testing.T, name string, got map[K]V, want int) {
	assertLen(t, name, len(got), want)
}

func assertStringContainsAll(t *testing.T, got string, substrs ...string) {
	t.Helper()

	for _, substr := range substrs {
		assertContains(t, got, substr)
	}
}

func writeFile(t *testing.T, path, content string) {
	t.Helper()

	err := os.WriteFile(path, []byte(content), 0o600)
	if err != nil {
		t.Fatal(err)
	}
}

func mkdirAll(t *testing.T, dir string) {
	t.Helper()

	err := os.MkdirAll(dir, 0o750)
	if err != nil {
		t.Fatal(err)
	}
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
	f.WithFS(os.DirFS(filepath.Dir(tmpFile)))

	got := f.ShouldFilter(filepath.Base(tmpFile))

	assertCallResult(t, "ShouldFilter", nil, got, shouldFilter)
}

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

	assertLen(t, "patterns", len(patterns), expectedLen)
}

type boolTestCase[T any] struct {
	name     string
	input    T
	expected bool
}

func runBoolTableTest[T any](
	t *testing.T,
	tests []boolTestCase[T],
	fn func(T) bool,
	fnName string,
) {
	t.Helper()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := fn(tt.input)

			assertEqual(t, fnName+"()", got, tt.expected)
		})
	}
}

func addBoolTestCase(
	tests []boolTestCase[string],
	name, code string,
	expected bool,
) []boolTestCase[string] {
	return append(tests, boolTestCase[string]{
		name,
		code,
		expected,
	})
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

func generatedFileTests4(
	name string,
	mainPath, mainContent string,
	altPath, altContent string,
	noCommentPath, noCommentContent string,
	wrongExtPath, wrongExtContent string,
) []generatedFileTest {
	return []generatedFileTest{
		{
			name:     name + " " + mainPath,
			filePath: mainPath,
			content:  mainContent,
			expected: true,
		},
		{
			name:     name + " " + altPath,
			filePath: altPath,
			content:  altContent,
			expected: true,
		},
		{
			name:     name + " without comment",
			filePath: noCommentPath,
			content:  noCommentContent,
			expected: false,
		},
		{
			name:     "not " + name + " - wrong extension",
			filePath: wrongExtPath,
			content:  wrongExtContent,
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
			t.Parallel()

			got := fn(tt.filePath, tt.content)

			assertEqual(t, fmt.Sprintf("%s(%q)", fnName, tt.filePath), got, tt.expected)
		})
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

type sqlcFilenameTestCase struct {
	name     string
	path     string
	expected bool
}

func runSQLCFilenameTests(t *testing.T, tests []sqlcFilenameTestCase) {
	t.Helper()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			got := MatchesSQLCFilename(tt.path)

			assertCallResult(t, "MatchesSQLCFilename", tt.path, got, tt.expected)
		})
	}
}

type filenameTestCase struct {
	name     string
	filename string
	options  map[FilterOption]bool
	expected FilterReason
}

type generatorTestCase struct {
	name  string
	fn    func(string, string) bool
	tests []generatedFileTest
}

type matchPatternTestCase struct {
	name     string
	path     string
	pattern  string
	expected bool
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

type patternTestCase struct {
	name     string
	setter   func(*Filter)
	getter   func(*Filter) []string
	patterns []string
}

func includePatternsTestCase() patternTestCase {
	return patternTestCase{
		name:     "include patterns",
		setter:   func(f *Filter) { f.WithIncludePatterns([]string{"vendor/*", "generated/keep.go"}) },
		getter:   func(f *Filter) []string { return f.includePatterns },
		patterns: []string{"vendor/*", "generated/keep.go"},
	}
}

func excludePatternsTestCase() patternTestCase {
	return patternTestCase{
		name:     "exclude patterns",
		setter:   func(f *Filter) { f.WithExcludePatterns([]string{"test/*", "*.pb.go"}) },
		getter:   func(f *Filter) []string { return f.excludePatterns },
		patterns: []string{"test/*", "*.pb.go"},
	}
}

func writeSQLCConfigFile(t *testing.T, dir, filename string) {
	t.Helper()

	writeFile(t, filepath.Join(dir, filename), "version: \"2\"")
}

func testSQLCConfigInSkippedDir(t *testing.T, tmpDir, dir string) {
	t.Helper()

	mkdirAll(t, dir)

	writeSQLCConfigFile(t, dir, "sqlc.yaml")

	configs, err := FindSQLCConfigs([]string{tmpDir})
	if err != nil {
		t.Fatalf("FindSQLCConfigs() error = %v", err)
	}

	assertEqual(t, "len(configs)", len(configs), 0)
}

func testSQLOutputDirs(t *testing.T, yamlContent string, wantDirs int) {
	t.Helper()

	tmpDir := t.TempDir()

	writeFile(t, filepath.Join(tmpDir, "sqlc.yaml"), yamlContent)

	dirs, err := GetSQLOutputDirs([]string{tmpDir})
	if err != nil {
		t.Fatalf("GetSQLOutputDirs() error = %v", err)
	}

	assertEqual(t, "len(dirs)", len(dirs), wantDirs)
}

func newMapFile(content string) *fstest.MapFile {
	return &fstest.MapFile{ //nolint:exhaustruct // test helper, zero-value fields are intentional
		Data: []byte(content),
	}
}

func createFSWithFile(t *testing.T, filename, content string) fstest.MapFS {
	t.Helper()

	return fstest.MapFS{
		filename: newMapFile(content),
	}
}

func assertErrorsIs(t *testing.T, err, sentinel error) {
	t.Helper()

	if !errors.Is(err, sentinel) {
		t.Errorf("errors.Is should match %v", sentinel)
	}
}

func assertErrorHasBrandedPrefix(t *testing.T, err error) {
	t.Helper()

	if !strings.HasPrefix(err.Error(), "[gogenfilter:") {
		t.Errorf("Error() missing branded prefix: %q", err.Error())
	}
}

func ValidSQLCConfig(engine string) string {
	return "version: \"2\"\n" +
		"sql:\n" +
		"  - engine: \"" + engine + "\"\n" +
		"    schema: \"schema/\"\n" +
		"    gen:\n" +
		"      go:\n" +
		"        package: \"db\"\n" +
		"        out: \"db\"\n"
}
