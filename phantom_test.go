package gogenfilter

import "testing"

func TestStartPath_String(t *testing.T) {
	t.Parallel()
	testStringer(t, "StartPath", []struct {
		value    StartPath
		expected string
	}{
		{StartPath("/tmp"), "/tmp"},
		{StartPath(""), ""},
		{StartPath("relative/path"), "relative/path"},
	})
}

func TestConfigPath_String(t *testing.T) {
	t.Parallel()
	testStringer(t, "ConfigPath", []struct {
		value    ConfigPath
		expected string
	}{
		{ConfigPath("sqlc.yaml"), "sqlc.yaml"},
		{ConfigPath(""), ""},
		{ConfigPath("/etc/config.yml"), "/etc/config.yml"},
	})
}

func TestOperation_String(t *testing.T) {
	t.Parallel()
	testStringer(t, "Operation", []struct {
		value    Operation
		expected string
	}{
		{Operation("read"), "read"},
		{Operation(""), ""},
		{Operation("parse"), "parse"},
	})
}

func TestErrorMessage_String(t *testing.T) {
	t.Parallel()
	testStringer(t, "ErrorMessage", []struct {
		value    ErrorMessage
		expected string
	}{
		{ErrorMessage("something failed"), "something failed"},
		{ErrorMessage(""), ""},
		{ErrorMessage("not found"), "not found"},
	})
}

func TestTotalFilesChecked_String(t *testing.T) {
	t.Parallel()
	testStringer(t, "TotalFilesChecked", []struct {
		value    TotalFilesChecked
		expected string
	}{
		{TotalFilesChecked(0), "0"},
		{TotalFilesChecked(42), "42"},
		{TotalFilesChecked(1000), "1000"},
	})
}
