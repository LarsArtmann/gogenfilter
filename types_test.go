package gogenfilter

import (
	"strings"
	"testing"
)

type validatable interface {
	IsValid() bool
}

func filterOptionStringCases() []struct {
	value    FilterOption
	expected string
} {
	return []struct {
		value    FilterOption
		expected string
	}{
		{FilterSQLC, "sqlc"},
		{FilterTempl, string(FilterTempl)},
		{FilterGoEnum, "go-enum"},
		{FilterProtobuf, "protobuf"},
		{FilterOapi, "oapi-codegen"},
		{FilterDeepcopy, "deepcopy-gen"},
		{FilterWire, "wire"},
		{FilterMoq, "moq"},
		{FilterMockgen, "mockgen"},
		{FilterStringer, "stringer"},
		{FilterGeneric, "generic"},
		{FilterAll, "all"},
	}
}

func filterReasonStringCases() []struct {
	value    FilterReason
	expected string
} {
	return []struct {
		value    FilterReason
		expected string
	}{
		{ReasonSQLC, "sqlc"},
		{ReasonTempl, string(FilterTempl)},
		{ReasonGoEnum, "go-enum"},
		{ReasonProtobuf, "protobuf"},
		{ReasonOapi, "oapi-codegen"},
		{ReasonDeepcopy, "deepcopy-gen"},
		{ReasonWire, "wire"},
		{ReasonMoq, "moq"},
		{ReasonMockgen, "mockgen"},
		{ReasonStringer, "stringer"},
		{ReasonGeneric, "generic"},
		{ReasonNotFiltered, "not-filtered"},
	}
}

func TestFilterOptionString(t *testing.T) {
	t.Parallel()

	testStringer(t, "FilterOption", filterOptionStringCases())
}

func TestFilterOptionReason(t *testing.T) {
	t.Parallel()

	tests := []struct {
		option FilterOption
		reason FilterReason
	}{
		{FilterSQLC, ReasonSQLC},
		{FilterTempl, ReasonTempl},
		{FilterGoEnum, ReasonGoEnum},
		{FilterProtobuf, ReasonProtobuf},
		{FilterOapi, ReasonOapi},
		{FilterDeepcopy, ReasonDeepcopy},
		{FilterWire, ReasonWire},
		{FilterMoq, ReasonMoq},
		{FilterMockgen, ReasonMockgen},
		{FilterStringer, ReasonStringer},
		{FilterGeneric, ReasonGeneric},
	}

	for _, testCase := range tests {
		reason, found := testCase.option.Reason()
		if !found {
			t.Errorf("FilterOption(%q).Reason() returned false, want true", testCase.option)
		}

		if reason != testCase.reason {
			t.Errorf("FilterOption(%q).Reason() = %q, want %q",
				testCase.option, reason, testCase.reason)
		}
	}
}

func TestFilterOptionIsValid(t *testing.T) {
	t.Parallel()

	validOptions := []FilterOption{
		FilterSQLC, FilterTempl, FilterGoEnum, FilterProtobuf,
		FilterOapi, FilterDeepcopy, FilterWire, FilterMoq,
		FilterMockgen, FilterStringer, FilterGeneric, FilterAll,
	}

	for _, opt := range validOptions {
		if !opt.IsValid() {
			t.Errorf("FilterOption(%q).IsValid() = false, want true", opt)
		}
	}

	invalidOptions := []FilterOption{
		"unknown", "", "SQLC", "mock",
		FilterOption("not-a-real-option"),
	}

	assertAllValidity(t, "invalidOptions", invalidOptions, false)
}

func TestFilterReasonString(t *testing.T) {
	t.Parallel()

	testStringer(t, "FilterReason", filterReasonStringCases())
}

func TestFilterReasonIsValid(t *testing.T) {
	t.Parallel()

	validReasons := []FilterReason{
		ReasonSQLC, ReasonTempl, ReasonGoEnum, ReasonProtobuf,
		ReasonOapi, ReasonDeepcopy, ReasonWire, ReasonMoq,
		ReasonMockgen, ReasonStringer, ReasonGeneric,
		ReasonOutsideScope, ReasonExcludePattern, ReasonNotFiltered,
	}

	for _, r := range validReasons {
		if !r.IsValid() {
			t.Errorf("FilterReason(%q).IsValid() = false, want true", r)
		}
	}

	invalidReasons := []FilterReason{
		"unknown", "", "SQLC", "mock",
		FilterReason("not-a-real-reason"),
	}

	assertAllValidity(t, "invalidReasons", invalidReasons, false)
}

func assertAllValidity[T validatable](t *testing.T, name string, items []T, wantValid bool) {
	t.Helper()

	for _, item := range items {
		if item.IsValid() != wantValid {
			validity := "invalid"

			if wantValid {
				validity = "valid"
			}

			t.Errorf("%s contains %s item %v", name, validity, item)
		}
	}
}

func TestAllFilterOptions(t *testing.T) {
	t.Parallel()

	opts := AllFilterOptions()

	assertEqual(t, "len(AllFilterOptions())", len(opts), 19)

	assertAllValidity(t, "AllFilterOptions()", opts, true)
}

func TestAllFilterReasons(t *testing.T) {
	t.Parallel()

	reasons := AllFilterReasons()

	assertEqual(t, "len(AllFilterReasons())", len(reasons), 21)

	assertAllValidity(t, "AllFilterReasons()", reasons, true)
}

func TestAllGeneratorOptions(t *testing.T) {
	t.Parallel()

	opts := AllGeneratorOptions()

	assertEqual(t, "len(AllGeneratorOptions())", len(opts), 18)

	for _, opt := range opts {
		if opt == FilterAll {
			t.Error("AllGeneratorOptions() should not contain FilterAll")
		}
	}

	assertAllValidity(t, "AllGeneratorOptions()", opts, true)
}

func TestAllDetectorDocs(t *testing.T) {
	t.Parallel()

	docs := AllDetectorDocs()

	assertEqual(t, "len(AllDetectorDocs())", len(docs), len(detectors))

	seen := make(map[FilterOption]bool, len(docs))

	for _, doc := range docs {
		if seen[doc.Option] {
			t.Errorf("AllDetectorDocs() duplicate option %q", doc.Option)
		}

		seen[doc.Option] = true

		if doc.Reason == "" {
			t.Errorf("AllDetectorDocs() doc for %q has empty Reason", doc.Option)
		}

		if doc.FilenameDetection == "" {
			t.Errorf("AllDetectorDocs() doc for %q has empty FilenameDetection", doc.Option)
		}

		if doc.ContentDetection == "" {
			t.Errorf("AllDetectorDocs() doc for %q has empty ContentDetection", doc.Option)
		}

		if doc.IsFuncName == "" {
			t.Errorf("AllDetectorDocs() doc for %q has empty IsFuncName", doc.Option)
		}

		hasPrefix := strings.HasPrefix(doc.IsFuncName, "Is")
		hasSuffix := strings.HasSuffix(doc.IsFuncName, "Generated")

		if !hasPrefix || !hasSuffix {
			t.Errorf(
				"AllDetectorDocs() doc for %q has malformed IsFuncName %q",
				doc.Option, doc.IsFuncName,
			)
		}

		if !doc.HasContentPhase {
			t.Errorf(
				"AllDetectorDocs() doc for %q should have HasContentPhase (all detectors check content)",
				doc.Option,
			)
		}
	}

	for _, detector := range detectors {
		if !seen[detector.option] {
			t.Errorf("AllDetectorDocs() missing detector %q", detector.option)
		}
	}
}

func TestFilterOptionReasonFilterAllReturnsFalse(t *testing.T) {
	t.Parallel()

	reason, ok := FilterAll.Reason()
	if ok {
		t.Error("FilterAll.Reason() should return false")
	}

	if reason != "" {
		t.Errorf("FilterAll.Reason() reason = %q, want empty", reason)
	}
}

func TestFilterOptionReasonUnregisteredReturnsFalse(t *testing.T) {
	t.Parallel()

	reason, ok := FilterOption("nonexistent").Reason()
	if ok {
		t.Error("unregistered option Reason() should return false")
	}

	if reason != "" {
		t.Errorf("unregistered option Reason() reason = %q, want empty", reason)
	}
}

func TestFilterResultString(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		result   FilterResult
		exact    string
		contains []string
	}{
		{
			name:     "not filtered",
			result:   FilterResult{Filtered: false, Reason: "", Path: "", Trace: ""},
			exact:    "FilterResult(filtered=false)",
			contains: nil,
		},
		{
			name:     "filtered without trace",
			result:   FilterResult{Filtered: true, Reason: ReasonSQLC, Path: "", Trace: ""},
			exact:    "",
			contains: []string{"filtered=true", string(ReasonSQLC)},
		},
		{
			name: "filtered with trace",
			result: FilterResult{
				Filtered: true,
				Reason:   ReasonSQLC,
				Path:     "",
				Trace:    "detected as sqlc via filename pattern",
			},
			exact:    "",
			contains: []string{"trace=", string(ReasonSQLC)},
		},
	}

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			got := testCase.result.String()

			if testCase.exact != "" && got != testCase.exact {
				t.Errorf("unexpected String(): %q", got)
			}

			for _, s := range testCase.contains {
				assertContains(t, got, s)
			}
		})
	}
}

func TestFilterResultIs(t *testing.T) {
	t.Parallel()

	filtered := FilterResult{Filtered: true, Reason: ReasonSQLC, Path: dbModelsGo, Trace: ""}
	notFiltered := FilterResult{Filtered: false, Reason: "", Path: "main.go", Trace: ""}

	if !filtered.Is(ReasonSQLC) {
		t.Error("expected Is(ReasonSQLC) = true for filtered result")
	}

	if filtered.Is(ReasonTempl) {
		t.Error("expected Is(ReasonTempl) = false for sqlc result")
	}

	if notFiltered.Is(ReasonSQLC) {
		t.Error("expected Is(ReasonSQLC) = false for not-filtered result")
	}
}
