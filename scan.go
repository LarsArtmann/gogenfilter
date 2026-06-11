package gogenfilter

import (
	"fmt"
	"io/fs"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

// GeneratedFile holds information about a single detected generated file.
type GeneratedFile struct {
	Path   string       // relative path within the scanned directory
	Reason FilterReason // which generator was detected
}

// ScanResult holds the results of scanning a project for generated files.
type ScanResult struct {
	Files        []GeneratedFile     // all detected generated files
	ByGenerator  map[string][]string // generator name → list of file paths
	ScannedFiles int                 // total .go files scanned
	Generators   []string            // unique generator names, sorted
	Exclusions   []Exclusion         // derived exclusion patterns
}

// Exclusion represents a path-based exclusion pattern for auto-generated code.
type Exclusion struct {
	Pattern string // regex pattern suitable for golangci-lint exclusions.paths
	Reason  string // human-readable reason for the exclusion
}

// ExclusionPattern returns a fixed regex pattern for generators that have
// consistent filename conventions. Returns ("", false) for generators
// that need directory-based derivation (sqlc, oapi-codegen, generic).
func (r FilterReason) ExclusionPattern() (string, bool) {
	patterns := map[FilterReason]string{
		ReasonTempl:         `_templ\.go$`,
		ReasonProtobuf:      `\.pb\.go$`,
		ReasonGoEnum:        `_enum\.go$`,
		ReasonDeepcopy:      `zz_generated\..*\.go$`,
		ReasonWire:          `wire_gen\.go$`,
		ReasonMoq:           `_moq\.go$`,
		ReasonMockgen:       `_mock\.go$`,
		ReasonStringer:      `_string\.go$`,
		ReasonMockery:       `mock_.*\.go$`,
		ReasonEasyjson:      `_easyjson\.go$`,
		ReasonMsgp:          `_gen\.go$`,
		ReasonCounterfeiter: `fake_.*\.go$`,
	}

	p, ok := patterns[r]

	return p, ok
}

// ScanProject scans a project directory for auto-generated Go files.
// It walks the filesystem, detects generated files using the provided options,
// and returns a ScanResult with per-generator file lists and derived exclusion patterns.
//
// Default options (FilterAll) are used when no configs are provided.
// Directories named vendor, node_modules, and hidden directories (starting with .)
// are skipped during scanning.
//
// The fsys parameter provides the filesystem to scan. Use os.DirFS(projectDir)
// for the real filesystem.
func ScanProject(fsys fs.FS, configs ...FilterConfig) (*ScanResult, error) {
	if len(configs) == 0 {
		opts, err := WithFilterOptions(FilterAll)
		if err != nil {
			return nil, fmt.Errorf("configure default options: %w", err)
		}

		configs = []FilterConfig{opts}
	}

	filter, err := NewFilter(configs...)
	if err != nil {
		return nil, fmt.Errorf("create filter: %w", err)
	}

	goFiles, err := collectGoFiles(fsys)
	if err != nil {
		return nil, fmt.Errorf("collect Go files: %w", err)
	}

	byGenerator := make(map[string][]string)

	var files []GeneratedFile

	for _, file := range goFiles {
		result, filterErr := filter.FilterDetailed(file)
		if filterErr != nil {
			continue
		}

		if !result.Filtered || result.Reason == ReasonNotFiltered {
			continue
		}

		generator := string(result.Reason)
		byGenerator[generator] = append(byGenerator[generator], file)

		files = append(files, GeneratedFile{
			Path:   file,
			Reason: result.Reason,
		})
	}

	generators := make([]string, 0, len(byGenerator))
	for gen := range byGenerator {
		generators = append(generators, gen)
	}

	sort.Strings(generators)

	exclusions := deriveExclusions(byGenerator)

	return &ScanResult{
		Files:        files,
		ByGenerator:  byGenerator,
		ScannedFiles: len(goFiles),
		Generators:   generators,
		Exclusions:   exclusions,
	}, nil
}

// collectGoFiles walks the filesystem and collects all .go file paths
// relative to the root, excluding vendor, node_modules, and hidden directories.
func collectGoFiles(fsys fs.FS) ([]string, error) {
	var goFiles []string

	err := fs.WalkDir(fsys, ".", func(path string, dirEntry fs.DirEntry, err error) error {
		if err != nil {
			return fmt.Errorf("walking %s: %w", path, err)
		}

		if !dirEntry.IsDir() {
			if strings.HasSuffix(dirEntry.Name(), ".go") {
				goFiles = append(goFiles, path)
			}

			return nil
		}

		if path != "." && shouldSkipScanDir(dirEntry.Name()) {
			return fs.SkipDir
		}

		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("walk filesystem: %w", err)
	}

	return goFiles, nil
}

func shouldSkipScanDir(name string) bool {
	if strings.HasPrefix(name, ".") {
		return true
	}

	return name == vendorDir || name == nodeModulesDir
}

// deriveExclusions converts detected files into exclusion patterns.
// Generators with fixed filename patterns use ExclusionPattern().
// Others (sqlc, oapi-codegen, generic) use directory-based patterns.
func deriveExclusions(byGenerator map[string][]string) []Exclusion {
	// Count total possible entries for preallocation.
	maxExclusions := 0
	for _, files := range byGenerator {
		maxExclusions += len(files)
	}

	exclusions := make([]Exclusion, 0, maxExclusions)

	for generator, files := range byGenerator {
		exclusions = append(exclusions, exclusionsForGenerator(generator, files)...)
	}

	sort.Slice(exclusions, func(i, j int) bool {
		return exclusions[i].Pattern < exclusions[j].Pattern
	})

	return exclusions
}

// generatorExclusionReasons maps generator names to human-readable reasons.
var generatorExclusionReasons = map[string]string{
	string(FilterTempl):           "templ generated HTML components",
	string(FilterProtobuf):        "protobuf generated code",
	string(FilterGoEnum):          "go-enum generated enumerations",
	string(deepcopyGeneratorName): "deepcopy-gen generated code",
	string(FilterWire):            "wire generated dependency injection",
	string(moqGeneratorName):      "moq generated mocks",
	string(FilterMockgen):         "mockgen generated mocks",
	string(FilterStringer):        "stringer generated string methods",
	string(FilterMockery):         "mockery generated mocks",
	string(FilterEasyjson):        "easyjson generated marshalers",
	string(FilterMsgp):            "msgp generated serialization",
	string(FilterCounterfeiter):   "counterfeiter generated fakes",
	string(FilterSQLC):            "sqlc generated database code",
	string(FilterOapi):            "oapi-codegen generated API code",
}

func exclusionsForGenerator(generator string, files []string) []Exclusion {
	if pattern, ok := FilterReason(generator).ExclusionPattern(); ok {
		reason := generatorExclusionReasons[generator]

		return []Exclusion{{Pattern: pattern, Reason: reason}}
	}

	switch generator {
	case string(FilterSQLC):
		return dirBasedExclusions(files, generatorExclusionReasons[string(FilterSQLC)])
	case string(FilterOapi):
		return oapiExclusions(files)
	case string(FilterEnt), string(FilterGqlgen), string(FilterGoSwagger), string(FilterGeneric):
		return dirBasedExclusions(files, generatorExclusionReasons[generator])
	default:
		return dirBasedExclusions(files, "auto-generated code")
	}
}

// oapiExclusions generates exclusion patterns for oapi-codegen files.
func oapiExclusions(files []string) []Exclusion {
	for _, f := range files {
		if strings.HasSuffix(f, ".gen.go") {
			return []Exclusion{
				{Pattern: `.gen.go$`, Reason: generatorExclusionReasons[string(FilterOapi)]},
			}
		}
	}

	return dirBasedExclusions(files, generatorExclusionReasons["oapi-codegen"])
}

// dirBasedExclusions generates one exclusion per unique parent directory.
func dirBasedExclusions(files []string, reason string) []Exclusion {
	dirSet := make(map[string]struct{})
	for _, f := range files {
		dirSet[filepath.Dir(f)] = struct{}{}
	}

	dirs := make([]string, 0, len(dirSet))
	for dir := range dirSet {
		dirs = append(dirs, dir)
	}

	sort.Strings(dirs)

	exclusions := make([]Exclusion, len(dirs))
	for i, dir := range dirs {
		exclusions[i] = Exclusion{
			Pattern: regexp.QuoteMeta(dir) + "/",
			Reason:  reason,
		}
	}

	return exclusions
}

// ExclusionPaths extracts just the pattern strings from a slice of Exclusions.
func ExclusionPaths(exclusions []Exclusion) []string {
	paths := make([]string, len(exclusions))
	for i, e := range exclusions {
		paths[i] = e.Pattern
	}

	return paths
}
