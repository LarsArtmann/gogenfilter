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

func assertNotContains(t *testing.T, got, substr string, msg string) {
	t.Helper()

	if strings.Contains(got, substr) {
		t.Errorf("%s, got: %s", msg, got)
	}
}

func assertLen(t *testing.T, name string, got, want int) {
	t.Helper()

	if got != want {
		t.Errorf("expected %d %s, got %d", want, name, got)
	}
}

func assertMapLen[K, V comparable](t *testing.T, name string, got map[K]V, want int) {
	t.Helper()

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
	f := NewFilter(WithFilterOptions(opts...), WithFS(os.DirFS(filepath.Dir(tmpFile))))

	got, err := f.ShouldFilter(filepath.Base(tmpFile))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	assertCallResult(t, "ShouldFilter", nil, got, shouldFilter)
}

func mustShouldFilter(t *testing.T, f *Filter, filePath string) bool {
	t.Helper()

	got, err := f.ShouldFilter(filePath)
	if err != nil {
		t.Fatalf("ShouldFilter(%q) error: %v", filePath, err)
	}

	return got
}

func assertShouldFilter(t *testing.T, mapFS fstest.MapFS, filePath string, expected bool) {
	t.Helper()

	filter := NewFilter(WithFilterOptions(FilterAll), WithFS(mapFS))

	got := mustShouldFilter(t, filter, filePath)
	if got != expected {
		t.Errorf("ShouldFilter(%q) = %v, want %v", filePath, got, expected)
	}
}

func writeSQLCConfigFile(t *testing.T, dir, filename string) {
	t.Helper()

	writeFile(t, filepath.Join(dir, filename), "version: \"2\"")
}

type boolTestCase[T any] struct {
	name     string
	input    T
	expected bool
}

func runBoolTableTest[T any](
	t *testing.T,
	tests []boolTestCase[T],
	predicate func(T) bool,
	fnName string,
) {
	t.Helper()

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			got := predicate(testCase.input)

			assertEqual(t, fnName+"()", got, testCase.expected)
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
	matchFn func(string, string) bool,
	fnName string,
) {
	t.Helper()

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			got := matchFn(testCase.filePath, testCase.content)

			assertEqual(t, fmt.Sprintf("%s(%q)", fnName, testCase.filePath), got, testCase.expected)
		})
	}
}

func testStringer[T any](t *testing.T, name string, cases []struct {
	value    T
	expected string
},
) {
	t.Helper()

	for _, testCase := range cases {
		t.Run(fmt.Sprintf("%s/%v", name, testCase.value), func(t *testing.T) {
			t.Parallel()

			var got string

			if s, ok := any(testCase.value).(interface{ String() string }); ok {
				got = s.String()
			} else {
				t.Skip("type does not implement String()")

				return
			}

			if got != testCase.expected {
				t.Errorf(
					"%s(%v).String() = %q, want %q",
					name, testCase.value, got, testCase.expected,
				)
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

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			got := MatchesSQLCFilename(testCase.path)

			assertCallResult(t, "MatchesSQLCFilename", testCase.path, got, testCase.expected)
		})
	}
}

type filenameTestCase struct {
	name     string
	filename string
	options  map[FilterOption]struct{}
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
	return &fstest.MapFile{
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

func testProjectRootErrorNotFound(t *testing.T) *ProjectRootError {
	t.Helper()

	return &ProjectRootError{
		Code:      CodeProjectRootNotFound,
		StartPath: StartPath("/path"),
		Markers:   []string{"go.mod"},
		Cause:     nil,
	}
}

func testProjectRootErrorWithCause(
	t *testing.T,
	code ErrorCode,
	path string,
	sentinel error,
) *ProjectRootError {
	t.Helper()

	innerErr := fmt.Errorf("inner: %w", sentinel)

	return &ProjectRootError{
		Code:      code,
		StartPath: StartPath(path),
		Markers:   []string{"go.mod"},
		Cause:     innerErr,
	}
}
