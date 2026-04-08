package gogenfilter

import "testing"

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
