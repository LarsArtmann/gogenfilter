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

	for _, opt := range invalidOptions {
		if opt.IsValid() {
			t.Errorf("FilterOption(%q).IsValid() = true, want false", opt)
		}
	}
}

func TestFilterReasonString(t *testing.T) {
	t.Parallel()

	testStringer(t, "FilterReason", filterReasonStringCases())
}

func TestFilterReasonIsValid(t *testing.T) {
	t.Parallel()

	validReasons := []FilterReason{
		ReasonSQLC, ReasonTempl, ReasonGoEnum, ReasonProtobuf,
		ReasonMockgen, ReasonStringer, ReasonGeneric,
		ReasonIncludePattern, ReasonExcludePattern, ReasonNotFiltered,
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

	for _, r := range invalidReasons {
		if r.IsValid() {
			t.Errorf("FilterReason(%q).IsValid() = true, want false", r)
		}
	}
}

func TestAllFilterOptions(t *testing.T) {
	t.Parallel()

	opts := AllFilterOptions()

	assertEqual(t, "len(AllFilterOptions())", len(opts), 8)

	for _, opt := range opts {
		if !opt.IsValid() {
			t.Errorf("AllFilterOptions() contains invalid option %q", opt)
		}
	}
}

func TestAllFilterReasons(t *testing.T) {
	t.Parallel()

	reasons := AllFilterReasons()

	assertEqual(t, "len(AllFilterReasons())", len(reasons), 10)

	for _, r := range reasons {
		if !r.IsValid() {
			t.Errorf("AllFilterReasons() contains invalid reason %q", r)
		}
	}
}
