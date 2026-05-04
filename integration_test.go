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

func assertFilterResult(t *testing.T, path string, got bool, expectedReason FilterReason) {
	t.Helper()

	expected := expectedReason != ReasonNotFiltered
	if got != expected {
		t.Errorf("ShouldFilter(%q) = %v, want %v", path, got, expected)
	}
}

func mustShouldFilterFromFS(t *testing.T, f *Filter, path string) bool {
	t.Helper()

	got, err := f.ShouldFilter(path)
	if err != nil {
		t.Fatalf("ShouldFilter(%q) error: %v", path, err)
	}

	return got
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
				t.Errorf(
					"DetectReason(%q) = %v, want %v",
					fixture.path, reason, fixture.expectedReason,
				)
			}
		})
	}
}

func TestIntegrationFilterWithEmbedFS(t *testing.T) {
	t.Parallel()

	for _, fixture := range integrationFixtures() {
		t.Run(fixture.path, func(t *testing.T) {
			t.Parallel()

			f := NewFilter(WithFilterOptions(FilterAll), WithFS(testdataFS))

			got := mustShouldFilterFromFS(t, f, fixture.path)

			assertFilterResult(t, fixture.path, got, fixture.expectedReason)
		})
	}
}

func TestIntegrationFilterWithMapFS(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{}

	for _, fixture := range integrationFixtures() {
		content := mustReadFile(t, testdataFS, fixture.path)
		mapFS[fixture.path] = &fstest.MapFile{Data: []byte(content)}
	}

	for _, fixture := range integrationFixtures() {
		t.Run(fixture.path, func(t *testing.T) {
			t.Parallel()

			f := NewFilter(WithFilterOptions(FilterAll), WithFS(mapFS))

			got := mustShouldFilterFromFS(t, f, fixture.path)

			assertFilterResult(t, fixture.path, got, fixture.expectedReason)
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
	for _, tc := range cases {
		if _, exists := mapFS[tc.path]; !exists {
			content := mustReadFile(t, testdataFS, tc.path)
			mapFS[tc.path] = &fstest.MapFile{Data: []byte(content)}
		}
	}

	for _, tc := range cases { //nolint:varnamelen // tc is standard table-driven test variable
		t.Run(tc.path+"/"+string(tc.option), func(t *testing.T) {
			t.Parallel()

			f := NewFilter(WithFilterOptions(tc.option), WithFS(mapFS))

			got, err := f.ShouldFilter(tc.path)
			if err != nil {
				t.Fatalf("ShouldFilter(%q) error: %v", tc.path, err)
			}

			if got != tc.want {
				t.Errorf("ShouldFilter(%q) with %v = %v, want %v", tc.path, tc.option, got, tc.want)
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
