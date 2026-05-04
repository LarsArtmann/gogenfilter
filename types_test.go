package gogenfilter

import "testing"

func filterOptionStringCases() []struct {
	value    FilterOption
	expected string
} {
	return []struct {
		value    FilterOption
		expected string
	}{
		{FilterSQLC, "sqlc"},
		{FilterTempl, "templ"},
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
		{ReasonTempl, "templ"},
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

	for _, tc := range tests {
		if got := tc.option.Reason(); got != tc.reason {
			t.Errorf("FilterOption(%q).Reason() = %q, want %q",
				tc.option, got, tc.reason)
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

	assertAllInvalid(t, "invalidOptions", invalidOptions)
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

	assertAllInvalid(t, "invalidReasons", invalidReasons)
}

func assertAllValid[T any](t *testing.T, name string, items []T, isValid func(T) bool) {
	t.Helper()

	for _, item := range items {
		if !isValid(item) {
			t.Errorf("%s contains invalid item %v", name, item)
		}
	}
}

func assertAllInvalid[T validatable](t *testing.T, name string, items []T) {
	t.Helper()

	for _, item := range items {
		if item.IsValid() {
			t.Errorf("%s contains valid item %v", name, item)
		}
	}
}

func TestAllFilterOptions(t *testing.T) {
	t.Parallel()

	opts := AllFilterOptions()

	assertEqual(t, "len(AllFilterOptions())", len(opts), 12)

	assertAllValid(
		t,
		"AllFilterOptions()",
		opts,
		func(o FilterOption) bool { return o.IsValid() },
	)
}

func TestAllFilterReasons(t *testing.T) {
	t.Parallel()

	reasons := AllFilterReasons()

	assertEqual(t, "len(AllFilterReasons())", len(reasons), 14)

	assertAllValid(
		t,
		"AllFilterReasons()",
		reasons,
		func(r FilterReason) bool { return r.IsValid() },
	)
}
