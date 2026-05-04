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

func TestAllGeneratorOptions(t *testing.T) {
	t.Parallel()

	opts := AllGeneratorOptions()

	assertEqual(t, "len(AllGeneratorOptions())", len(opts), 11)

	for _, opt := range opts {
		if opt == FilterAll {
			t.Error("AllGeneratorOptions() should not contain FilterAll")
		}
	}

	assertAllValid(
		t,
		"AllGeneratorOptions()",
		opts,
		func(o FilterOption) bool { return o.IsValid() },
	)
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

	t.Run("not filtered", func(t *testing.T) {
		t.Parallel()

		r := FilterResult{Filtered: false, Reason: "", Path: "", Trace: ""}
		if r.String() != "FilterResult(filtered=false)" {
			t.Errorf("unexpected String(): %q", r.String())
		}
	})

	t.Run("filtered without trace", func(t *testing.T) {
		t.Parallel()

		r := FilterResult{Filtered: true, Reason: ReasonSQLC, Path: "", Trace: ""}
		assertContains(t, r.String(), "filtered=true")
		assertContains(t, r.String(), "sqlc")
	})

	t.Run("filtered with trace", func(t *testing.T) {
		t.Parallel()

		result := FilterResult{
			Filtered: true,
			Reason:   ReasonSQLC,
			Path:     "",
			Trace:    "detected as sqlc via filename pattern",
		}
		assertContains(t, result.String(), "trace=")
		assertContains(t, result.String(), "sqlc")
	})
}
