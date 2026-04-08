package gogenfilter

import "testing"

func TestFilterMetrics(t *testing.T) {
	t.Parallel()

	t.Run("tracks filtered files by reason", func(t *testing.T) {
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
	})

	t.Run("tracks not filtered files", func(t *testing.T) {
		t.Parallel()

		metrics := NewMetrics()
		metrics.record("db/models.go", ReasonSQLC)
		metrics.record("main.go", ReasonNotFiltered)
		metrics.record("service/user.go", ReasonNotFiltered)

		stats := metrics.GetStats()

		assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 3)
		assertEqual(t, "TotalFiltered", stats.TotalFiltered(), 1)
	})

	t.Run("nil metrics handler", func(t *testing.T) {
		t.Parallel()

		var metrics *Metrics
		metrics.record("test.go", ReasonSQLC)

		stats := metrics.GetStats()

		assertEqual(t, "TotalFilesChecked", stats.TotalFilesChecked, 0)
	})
}
