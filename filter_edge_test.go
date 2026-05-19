package gogenfilter

import (
	"strings"
	"testing"
	"testing/fstest"
)

func TestFilterEdgeCases(t *testing.T) {
	t.Parallel()

	t.Run("empty path returns error", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts)
		if err != nil {
			t.Fatal(err)
		}

		_, err = filter.Filter("")
		if err == nil {
			t.Error("expected error for empty path")
		}
	})

	t.Run("special characters in path", func(t *testing.T) {
		t.Parallel()

		type tc struct {
			name     string
			filePath string
			content  string
		}

		cases := []tc{
			{
				name:     "spaces in path",
				filePath: "path with spaces/models.go",
				content:  sqlcGeneratedContentTest,
			},
			{
				name:     "unicode filename",
				filePath: "dönner/models.go",
				content:  sqlcGeneratedContentTest,
			},
		}

		for _, caze := range cases {
			t.Run(caze.name, func(t *testing.T) {
				t.Parallel()

				mapFS := fstest.MapFS{
					caze.filePath: newMapFile(caze.content),
				}

				assertFilter(t, mapFS, caze.filePath, true)
			})
		}
	})

	t.Run("very long filename", func(t *testing.T) {
		t.Parallel()

		longName := strings.Repeat("a", 200) + ".go"

		mapFS := fstest.MapFS{
			longName: newMapFile("package main\n"),
		}

		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts, WithFS(mapFS))
		if err != nil {
			t.Fatal(err)
		}

		filtered, err := filter.Filter(longName)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if filtered {
			t.Error("expected long-named regular file to not be filtered")
		}
	})

	t.Run("nil FS defaults to OS filesystem", func(t *testing.T) {
		t.Parallel()

		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			t.Fatal(err)
		}

		filter, err := NewFilter(opts, WithFS(nil))
		if err != nil {
			t.Fatal(err)
		}

		filtered, err := filter.Filter("nonexistent_deffile_12345.go")
		if err == nil {
			t.Error("expected error for nonexistent file with OS FS")
		}

		if filtered {
			t.Error("expected nonexistent file to not be filtered even on error")
		}
	})
}
