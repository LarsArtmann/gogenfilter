package gogenfilter

import (
	"sync"
	"testing"
	"testing/fstest"
)

func TestFilterConcurrent(t *testing.T) {
	t.Parallel()

	mapFS := fstest.MapFS{
		dbModelsGo: newMapFile(sqlcGeneratedContentTest),
		mainGo:     newMapFile(packageMainFunc),
		apiGo:      newMapFile("package main\n"),
	}

	opts, err := WithFilterOptions(FilterAll)
	if err != nil {
		t.Fatal(err)
	}

	filter, err := NewFilter(
		opts,
		WithFS(mapFS),
	)
	if err != nil {
		t.Fatal(err)
	}

	const goroutines = 100

	var waitGroup sync.WaitGroup
	waitGroup.Add(goroutines)

	for i := range goroutines {
		go func() {
			defer waitGroup.Done()

			files := []string{dbModelsGo, mainGo, apiGo}
			file := files[i%len(files)]

			filtered, err := filter.Filter(file)
			if err != nil {
				t.Errorf("Filter(%q) error: %v", file, err)
			}

			switch file {
			case dbModelsGo:
				if !filtered {
					t.Error("expected db/models.go to be filtered")
				}
			case mainGo, apiGo:
				if filtered {
					t.Errorf("expected %s to not be filtered", file)
				}
			}
		}()
	}

	waitGroup.Wait()
}
