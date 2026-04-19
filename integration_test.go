package gogenfilter

import (
	"embed"
	"io/fs"
	"testing"
	"testing/fstest"
)

//go:embed testdata
var testdataFS embed.FS

type integrationFixture struct {
	path           string
	expectedReason FilterReason
}

func integrationFixtures() []integrationFixture {
	return []integrationFixture{
		{"testdata/sqlc/models.go", ReasonSQLC},
		{"testdata/sqlc/query.sql.go", ReasonSQLC},
		{"testdata/templ/page_templ.go", ReasonTempl},
		{"testdata/protobuf/user.pb.go", ReasonProtobuf},
		{"testdata/protobuf/user_grpc.pb.go", ReasonProtobuf},
		{"testdata/go-enum/status_enum.go", ReasonGoEnum},
		{"testdata/wire/wire_gen.go", ReasonWire},
		{"testdata/moq/service_moq.go", ReasonMoq},
		{"testdata/mockgen/service_mock.go", ReasonMockgen},
		{"testdata/stringer/priority_string.go", ReasonStringer},
		{"testdata/oapi/petstore.gen.go", ReasonOapi},
		{"testdata/deepcopy/zz_generated.deepcopy.go", ReasonDeepcopy},
		{"testdata/handwritten/main.go", ReasonNotFiltered},
		{"testdata/handwritten/types.go", ReasonNotFiltered},
	}
}

func TestIntegrationDetectReasonFromEmbedFS(t *testing.T) {
	t.Parallel()

	for _, fixture := range integrationFixtures() {
		t.Run(fixture.path, func(t *testing.T) {
			t.Parallel()

			reason := DetectReason(
				fixture.path,
				mustReadFile(t, testdataFS, fixture.path),
				FilterAll,
			)

			if reason != fixture.expectedReason {
				t.Errorf("DetectReason(%q) = %v, want %v", fixture.path, reason, fixture.expectedReason)
			}
		})
	}
}

func TestIntegrationFilterWithEmbedFS(t *testing.T) {
	t.Parallel()

	for _, fixture := range integrationFixtures() {
		t.Run(fixture.path, func(t *testing.T) {
			t.Parallel()

			f := NewFilter(Enabled(), WithFilterOptions(FilterAll), WithFS(testdataFS))
			got, err := f.ShouldFilter(fixture.path)
			if err != nil {
				t.Fatalf("ShouldFilter(%q) error: %v", fixture.path, err)
			}

			shouldFilter := fixture.expectedReason != ReasonNotFiltered
			if got != shouldFilter {
				t.Errorf("ShouldFilter(%q) = %v, want %v", fixture.path, got, shouldFilter)
			}
		})
	}
}

func TestIntegrationFilterWithMapFS(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{}
	for _, fixture := range integrationFixtures() {
		content := mustReadFile(t, testdataFS, fixture.path)
		mapFS[fixture.path] = &fstest.MapFile{Data: []byte(content)} //nolint:exhaustruct
	}

	for _, fixture := range integrationFixtures() {
		t.Run(fixture.path, func(t *testing.T) {
			t.Parallel()

			f := NewFilter(Enabled(), WithFilterOptions(FilterAll), WithFS(mapFS))
			got, err := f.ShouldFilter(fixture.path)
			if err != nil {
				t.Fatalf("ShouldFilter(%q) error: %v", fixture.path, err)
			}

			shouldFilter := fixture.expectedReason != ReasonNotFiltered
			if got != shouldFilter {
				t.Errorf("ShouldFilter(%q) = %v, want %v", fixture.path, got, shouldFilter)
			}
		})
	}
}

func TestIntegrationSpecificFilterOnlyMatchesOwnGenerator(t *testing.T) {
	t.Parallel()

	cases := []struct {
		path   string
		option FilterOption
		want   bool
	}{
		{"testdata/sqlc/models.go", FilterSQLC, true},
		{"testdata/sqlc/models.go", FilterTempl, false},
		{"testdata/templ/page_templ.go", FilterTempl, true},
		{"testdata/templ/page_templ.go", FilterSQLC, false},
		{"testdata/protobuf/user.pb.go", FilterProtobuf, true},
		{"testdata/protobuf/user.pb.go", FilterSQLC, false},
		{"testdata/handwritten/main.go", FilterGeneric, false},
		{"testdata/go-enum/status_enum.go", FilterGoEnum, true},
		{"testdata/go-enum/status_enum.go", FilterGeneric, true},
	}

	mapFS := fstest.MapFS{}
	for _, c := range cases {
		if _, exists := mapFS[c.path]; !exists {
			content := mustReadFile(t, testdataFS, c.path)
			mapFS[c.path] = &fstest.MapFile{Data: []byte(content)} //nolint:exhaustruct
		}
	}

	for _, c := range cases {
		t.Run(c.path+"/"+string(c.option), func(t *testing.T) {
			t.Parallel()

			f := NewFilter(Enabled(), WithFilterOptions(c.option), WithFS(mapFS))
			got, err := f.ShouldFilter(c.path)
			if err != nil {
				t.Fatalf("ShouldFilter(%q) error: %v", c.path, err)
			}

			if got != c.want {
				t.Errorf("ShouldFilter(%q) with %v = %v, want %v", c.path, c.option, got, c.want)
			}
		})
	}
}

func mustReadFile(t *testing.T, fsys fs.FS, path string) string {
	t.Helper()

	data, err := fs.ReadFile(fsys, path)
	if err != nil {
		t.Fatalf("read %q: %v", path, err)
	}

	return string(data)
}
