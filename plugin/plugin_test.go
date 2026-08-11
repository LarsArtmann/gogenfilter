package plugin

import (
	"testing"

	"github.com/LarsArtmann/gogenfilter/v3"
	"github.com/golangci/plugin-module-register/register"
)

func TestNew(t *testing.T) {
	t.Parallel()

	t.Run("empty settings defaults to all generators", func(t *testing.T) {
		t.Parallel()

		p, err := New(nil)
		if err != nil {
			t.Fatalf("New() error: %v", err)
		}

		if p == nil {
			t.Fatal("New() returned nil plugin")
		}
	})

	t.Run("settings with generators", func(t *testing.T) {
		t.Parallel()

		conf := map[string]any{
			"generators": []any{"sqlc", "templ"},
		}

		p, err := New(conf)
		if err != nil {
			t.Fatalf("New() error: %v", err)
		}

		gp, ok := p.(*gogenfilterPlugin)
		if !ok {
			t.Fatalf("New() returned wrong type: %T", p)
		}

		if len(gp.settings.Generators) != 2 {
			t.Errorf("expected 2 generators, got %d", len(gp.settings.Generators))
		}
	})

	t.Run("settings with exclude paths", func(t *testing.T) {
		t.Parallel()

		conf := map[string]any{
			"exclude-paths": []any{"vendor/**", "**/testdata/**"},
		}

		p, err := New(conf)
		if err != nil {
			t.Fatalf("New() error: %v", err)
		}

		gp, ok := p.(*gogenfilterPlugin)
		if !ok {
			t.Fatalf("New() returned wrong type: %T", p)
		}

		if len(gp.settings.ExcludePaths) != 2 {
			t.Errorf("expected 2 exclude paths, got %d", len(gp.settings.ExcludePaths))
		}
	})
}

func TestGetLoadMode(t *testing.T) {
	t.Parallel()

	p := &gogenfilterPlugin{}

	if mode := p.GetLoadMode(); mode != register.LoadModeSyntax {
		t.Errorf("GetLoadMode() = %q, want %q", mode, register.LoadModeSyntax)
	}
}

func TestBuildAnalyzers(t *testing.T) {
	t.Parallel()

	t.Run("with default settings", func(t *testing.T) {
		t.Parallel()

		p := &gogenfilterPlugin{}

		analyzers, err := p.BuildAnalyzers()
		if err != nil {
			t.Fatalf("BuildAnalyzers() error: %v", err)
		}

		if len(analyzers) != 1 {
			t.Fatalf("expected 1 analyzer, got %d", len(analyzers))
		}

		if analyzers[0].Name != "gogenfilter" {
			t.Errorf("analyzer name = %q, want %q", analyzers[0].Name, "gogenfilter")
		}

		if analyzers[0].Run == nil {
			t.Error("analyzer Run function is nil")
		}

		if p.filter == nil {
			t.Error("filter was not initialized")
		}
	})

	t.Run("with specific generators", func(t *testing.T) {
		t.Parallel()

		p := &gogenfilterPlugin{
			settings: Settings{
				Generators: []string{string(gogenfilter.FilterSQLC)},
			},
		}

		analyzers, err := p.BuildAnalyzers()
		if err != nil {
			t.Fatalf("BuildAnalyzers() error: %v", err)
		}

		if len(analyzers) != 1 {
			t.Fatalf("expected 1 analyzer, got %d", len(analyzers))
		}
	})

	t.Run("with exclude patterns", func(t *testing.T) {
		t.Parallel()

		p := &gogenfilterPlugin{
			settings: Settings{
				ExcludePaths: []string{"vendor/**"},
			},
		}

		analyzers, err := p.BuildAnalyzers()
		if err != nil {
			t.Fatalf("BuildAnalyzers() error: %v", err)
		}

		if len(analyzers) != 1 {
			t.Fatalf("expected 1 analyzer, got %d", len(analyzers))
		}
	})
}

func TestBuildFilterOptions(t *testing.T) {
	t.Parallel()

	t.Run("default uses FilterAll", func(t *testing.T) {
		t.Parallel()

		p := &gogenfilterPlugin{}

		_, err := p.buildFilterOptions()
		if err != nil {
			t.Fatalf("buildFilterOptions() error: %v", err)
		}
	})

	t.Run("specific generators", func(t *testing.T) {
		t.Parallel()

		p := &gogenfilterPlugin{
			settings: Settings{
				Generators: []string{
					string(gogenfilter.FilterSQLC),
					string(gogenfilter.FilterTempl),
				},
			},
		}

		_, err := p.buildFilterOptions()
		if err != nil {
			t.Fatalf("buildFilterOptions() error: %v", err)
		}
	})
}

func TestPluginRegistration(t *testing.T) {
	t.Parallel()

	// Verify the plugin was registered during init()
	fn, err := register.GetPlugin("gogenfilter")
	if err != nil {
		t.Fatalf("plugin not registered: %v", err)
	}

	if fn == nil {
		t.Fatal("GetPlugin returned nil function")
	}

	// Verify it creates a valid plugin
	p, err := fn(nil)
	if err != nil {
		t.Fatalf("plugin factory error: %v", err)
	}

	if p == nil {
		t.Fatal("plugin factory returned nil")
	}

	if mode := p.GetLoadMode(); mode != register.LoadModeSyntax {
		t.Errorf("GetLoadMode() = %q, want %q", mode, register.LoadModeSyntax)
	}
}
