package gogenfilter //nolint:testpackage // needs access to unexported metrics fields

import (
	"testing"
)

func TestFilterMetrics(t *testing.T) {
	t.Parallel()

	t.Run("tracks filtered files by reason", testTracksFilteredByReason)
	t.Run("tracks not filtered files", testTracksNotFiltered)
	t.Run("nil metrics handler", testNilMetricsHandler)
	t.Run("String with zero state", testStringWithZeroState)
	t.Run("String with data", testStringWithData)
}

func testTracksFilteredByReason(t *testing.T) {
	t.Parallel()

	metrics := NewMetrics()
	metrics.record("db/models.go", ReasonSQLC)
	metrics.record("db/query.sql.go", ReasonSQLC)
	metrics.record("components/header_templ.go", ReasonTempl)
	metrics.record("vendor/lib.go", ReasonExcludePattern)

	stats := metrics.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 4)
	assertEqual(t, "SQLC count", stats.FilteredBy(ReasonSQLC), 2)
	assertEqual(t, "Templ count", stats.FilteredBy(ReasonTempl), 1)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 4)
}

func testTracksNotFiltered(t *testing.T) {
	t.Parallel()

	metrics := NewMetrics()
	metrics.record("db/models.go", ReasonSQLC)
	metrics.record("main.go", ReasonNotFiltered)
	metrics.record("service/user.go", ReasonNotFiltered)

	stats := metrics.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 3)
	assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 1)
}

func testNilMetricsHandler(t *testing.T) {
	t.Parallel()

	var metrics *Metrics
	metrics.record("test.go", ReasonSQLC)

	stats := metrics.GetStats()

	assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 0)
}

func testStringWithZeroState(t *testing.T) {
	t.Parallel()

	stats := FilterStats{
		MetricsMixin: MetricsMixin{}, //nolint:exhaustruct // testing zero-value behavior
	}
	got := stats.String()

	assertEqual(t, "zero state", got, "FilterStats(checked=0, filtered=0)")
}

func testStringWithData(t *testing.T) {
	t.Parallel()

	metrics := NewMetrics()
	metrics.record("db/models.go", ReasonSQLC)
	metrics.record("db/query.sql.go", ReasonSQLC)
	metrics.record("header_templ.go", ReasonTempl)

	stats := metrics.GetStats()
	got := stats.String()

	assertStringContainsAll(t, got, "checked=3", "filtered=3", "sqlc=2", "templ=1")
}
