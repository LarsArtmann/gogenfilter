package gogenfilter

import (
	"os"
	"strings"
	"testing"
)

// TestREADMETablesHaveConsistentColumns ensures every markdown table in README.md
// has rows with matching column counts. This is a regression guard for the gendocs
// "||" corruption that produced phantom empty columns in generated tables — the
// freshness check (go generate && git diff) only validates that output matches the
// tool, not that the output renders correctly.
func TestREADMETablesHaveConsistentColumns(t *testing.T) {
	t.Parallel()

	data, err := os.ReadFile("README.md")
	if err != nil {
		t.Fatalf("read README.md: %v", err)
	}

	tables := extractMarkdownTables(string(data))
	if len(tables) == 0 {
		t.Fatal("expected at least one markdown table in README.md")
	}

	for _, tbl := range tables {
		assertTableColumnsConsistent(t, tbl)
	}
}

type markdownTable struct {
	startLine int
	rows      []string
}

func extractMarkdownTables(content string) []markdownTable {
	lines := strings.Split(content, "\n")

	var tables []markdownTable

	inFence := false

	current := markdownTable{startLine: 0, rows: nil}

	for i, line := range lines {
		trimmed := strings.TrimSpace(line)

		if isCodeFence(trimmed) {
			inFence = !inFence

			flushTable(&current, &tables)

			continue
		}

		if inFence {
			continue
		}

		if strings.HasPrefix(line, "|") {
			if len(current.rows) == 0 {
				current.startLine = i + 1
			}

			current.rows = append(current.rows, line)
		} else {
			flushTable(&current, &tables)
		}
	}

	flushTable(&current, &tables)

	return tables
}

func flushTable(current *markdownTable, tables *[]markdownTable) {
	if len(current.rows) > 0 {
		*tables = append(*tables, *current)
	}

	*current = markdownTable{startLine: 0, rows: nil}
}

func assertTableColumnsConsistent(t *testing.T, tbl markdownTable) {
	t.Helper()

	if len(tbl.rows) < 2 {
		return
	}

	want := countTableCols(tbl.rows[0])

	for i, row := range tbl.rows {
		assertColumnCount(t, tbl, i, row, want)
	}
}

func assertColumnCount(t *testing.T, tbl markdownTable, i int, row string, want int) {
	t.Helper()

	got := countTableCols(row)

	if got != want {
		t.Errorf(
			"README.md:%d: table row %d has %d columns, expected %d.\n  Row: %s\n"+
				"Hint: a stray '|' or '||' creates a phantom empty column — "+
				"check gendocs output in cmd/gendocs/main.go.",
			tbl.startLine+i, i, got, want, row,
		)
	}
}

func isCodeFence(trimmed string) bool {
	return strings.HasPrefix(trimmed, "```") || strings.HasPrefix(trimmed, "~~~")
}

// countTableCols returns the number of columns in a markdown table row by counting
// unescaped pipe characters. A row "| a | b |" has 3 pipes and 2 columns.
func countTableCols(row string) int {
	return strings.Count(row, "|") - strings.Count(row, `\|`) - 1
}
