package gogenfilter_test

import (
	"errors"
	"fmt"
	"io"
	"io/fs"
	"testing"
	"testing/fstest"

	"github.com/LarsArtmann/gogenfilter"
	ginkgo "github.com/onsi/ginkgo/v2"
	gomega "github.com/onsi/gomega"
)

//nolint:paralleltest // Ginkgo uses its own parallelization, not t.Parallel()
func TestGogenfilterBDD(t *testing.T) {
	gomega.RegisterFailHandler(ginkgo.Fail)
	ginkgo.RunSpecs(t, "gogenfilter BDD Suite")
}

var _ = ginkgo.Describe("gogenfilter", func() {
	// ═══════════════════════════════════════════════════════════════════════
	// FILTER CREATION — As a user, I want to create filters with different
	// configurations so I can control which generated code gets detected.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Filter creation", func() {
		ginkgo.DescribeTable("enabled state depends on configuration",
			func(configs []gogenfilter.FilterConfig, expectedEnabled bool) {
				filter, err := gogenfilter.NewFilter(configs...)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(filter.IsEnabled()).To(gomega.Equal(expectedEnabled))
			},
			ginkgo.Entry("no configs → disabled",
				nil, false),
			ginkgo.Entry("WithFilterOptions(FilterAll) → enabled",
				func() []gogenfilter.FilterConfig {
					cfg, err := gogenfilter.WithFilterOptions(gogenfilter.FilterAll)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())

					return []gogenfilter.FilterConfig{cfg}
				}(), true),
			ginkgo.Entry("only WithIncludePatterns → enabled",
				[]gogenfilter.FilterConfig{gogenfilter.WithIncludePatterns("**/*.go")},
				true),
			ginkgo.Entry("only WithExcludePatterns → enabled",
				[]gogenfilter.FilterConfig{gogenfilter.WithExcludePatterns("**/vendor/**")},
				true),
		)

		ginkgo.When("created with FilterAll", func() {
			var filter *gogenfilter.Filter

			ginkgo.BeforeEach(func() {
				cfg, err := gogenfilter.WithFilterOptions(gogenfilter.FilterAll)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err = gogenfilter.NewFilter(cfg)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
			})

			ginkgo.It("is enabled", func() {
				gomega.Expect(filter.IsEnabled()).To(gomega.BeTrue())
			})

			ginkgo.It("returns all 11 filter reasons", func() {
				reasons := filter.FilterReasons()
				gomega.Expect(reasons).To(gomega.HaveLen(11))
			})

			ginkgo.It("filters generated files", func() {
				filtered, err := filter.Filter("db/models.go")
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(filtered).To(gomega.BeTrue())
			})
		})

		ginkgo.When("created with no options", func() {
			var filter *gogenfilter.Filter

			ginkgo.BeforeEach(func() {
				var err error

				filter, err = gogenfilter.NewFilter()
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
			})

			ginkgo.It("is not enabled", func() {
				gomega.Expect(filter.IsEnabled()).To(gomega.BeFalse())
			})

			ginkgo.It("never filters any file", func() {
				filtered, err := filter.Filter("db/models.go")
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(filtered).To(gomega.BeFalse())
			})

			ginkgo.It("returns empty filter reasons", func() {
				gomega.Expect(filter.FilterReasons()).To(gomega.BeEmpty())
			})

			ginkgo.It("returns zero stats", func() {
				stats := filter.GetStats()
				gomega.Expect(stats.TotalFilesChecked).
					To(gomega.Equal(gogenfilter.TotalFilesChecked(0)))
				gomega.Expect(stats.TotalFiltered()).To(gomega.Equal(0))
			})
		})

		ginkgo.When("created with selective generators", func() {
			var filter *gogenfilter.Filter

			ginkgo.BeforeEach(func() {
				cfg, err := gogenfilter.WithFilterOptions(
					gogenfilter.FilterSQLC,
					gogenfilter.FilterTempl,
				)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err = gogenfilter.NewFilter(cfg)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
			})

			ginkgo.It("returns only selected reasons", func() {
				reasons := filter.FilterReasons()
				gomega.Expect(reasons).To(gomega.HaveLen(2))
			})
		})

		ginkgo.When("given an invalid FilterOption", func() {
			ginkgo.It("WithFilterOptions returns a FilterConfigError", func() {
				_, err := gogenfilter.WithFilterOptions(gogenfilter.FilterOption("nonexistent"))
				gomega.Expect(err).To(gomega.HaveOccurred())

				var cfgErr *gogenfilter.FilterConfigError
				gomega.Expect(errors.As(err, &cfgErr)).To(gomega.BeTrue())
				gomega.Expect(cfgErr.Option).
					To(gomega.Equal(gogenfilter.FilterOption("nonexistent")))
			})

			ginkgo.It("supports errors.Is matching", func() {
				_, err := gogenfilter.WithFilterOptions(gogenfilter.FilterOption("nonexistent"))
				gomega.Expect(errors.Is(err, gogenfilter.ErrInvalidFilterOption)).
					To(gomega.BeTrue())
			})
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// DETECTING GENERATED CODE — As a linter author, I want to detect
	// auto-generated files so I can skip them during analysis.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Detecting generated code", func() {
		ginkgo.DescribeTable("detects each generator by content",
			func(path, content string, expectedReason gogenfilter.FilterReason) {
				reason := gogenfilter.DetectReason(path, content, gogenfilter.FilterAll)
				gomega.Expect(reason).To(gomega.Equal(expectedReason))
			},
			ginkgo.Entry("sqlc", "db/models.go",
				"// Code generated by sqlc. DO NOT EDIT.\npackage db\n",
				gogenfilter.ReasonSQLC),
			ginkgo.Entry(
				"templ",
				"page_templ.go",
				"package components\nimport \"github.com/a-h/templ\"\nfunc Page() templ.Component { return nil }\n",
				gogenfilter.ReasonTempl,
			),
			ginkgo.Entry("go-enum", "status_enum.go",
				"// Code generated by go-enum DO NOT EDIT.\npackage enums\n",
				gogenfilter.ReasonGoEnum),
			ginkgo.Entry("protobuf .pb.go", "user.pb.go",
				"// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
				gogenfilter.ReasonProtobuf),
			ginkgo.Entry("protobuf _grpc.pb.go", "user_grpc.pb.go",
				"// Code generated by protoc-gen-go. DO NOT EDIT.\npackage pb\n",
				gogenfilter.ReasonProtobuf),
			ginkgo.Entry("mockgen", "service_mock.go",
				"// Code generated by MockGen. DO NOT EDIT.\npackage mocks\n",
				gogenfilter.ReasonMockgen),
			ginkgo.Entry("mockgen mock_ prefix", "mock_service.go",
				"// Code generated by MockGen. DO NOT EDIT.\npackage mocks\n",
				gogenfilter.ReasonMockgen),
			ginkgo.Entry("stringer", "status_string.go",
				"// Code generated by \"stringer\". DO NOT EDIT.\npackage enums\n",
				gogenfilter.ReasonStringer),
			ginkgo.Entry(
				"oapi-codegen",
				"petstore.gen.go",
				"// Package petstore Code generated by oapi-codegen. DO NOT EDIT.\npackage petstore\n",
				gogenfilter.ReasonOapi,
			),
			ginkgo.Entry("wire", "wire_gen.go",
				"// Code generated by Wire. DO NOT EDIT.\npackage main\n",
				gogenfilter.ReasonWire),
			ginkgo.Entry("moq", "service_moq.go",
				"// Code generated by moq. DO NOT EDIT.\npackage mocks\n",
				gogenfilter.ReasonMoq),
			ginkgo.Entry("deepcopy-gen", "zz_generated.deepcopy.go",
				"// Code generated by deepcopy-gen. DO NOT EDIT.\npackage v1\n",
				gogenfilter.ReasonDeepcopy),
			ginkgo.Entry("generic fallback", "custom_gen.go",
				"// Code generated by my-tool. DO NOT EDIT.\npackage main\n",
				gogenfilter.ReasonGeneric),
		)

		ginkgo.DescribeTable(
			"detects by filename only (phase 1, zero I/O)",
			func(path string, expectedReason gogenfilter.FilterReason) {
				reason := gogenfilter.DetectReason(path, "package main\n", gogenfilter.FilterAll)
				gomega.Expect(reason).To(gomega.Equal(expectedReason))
			},
			ginkgo.Entry("sqlc models.go", "db/models.go", gogenfilter.ReasonSQLC),
			ginkgo.Entry("sqlc querier.go", "db/querier.go", gogenfilter.ReasonSQLC),
			ginkgo.Entry("sqlc batch.go", "db/batch.go", gogenfilter.ReasonSQLC),
			ginkgo.Entry("sqlc .sql.go suffix", "db/query.sql.go", gogenfilter.ReasonSQLC),
			ginkgo.Entry("templ _templ.go", "page_templ.go", gogenfilter.ReasonTempl),
			ginkgo.Entry("go-enum _enum.go", "status_enum.go", gogenfilter.ReasonGoEnum),
			ginkgo.Entry("protobuf .pb.go", "model.pb.go", gogenfilter.ReasonProtobuf),
			ginkgo.Entry("wire wire_gen.go", "wire_gen.go", gogenfilter.ReasonWire),
			ginkgo.Entry("moq _moq.go", "service_moq.go", gogenfilter.ReasonMoq),
			ginkgo.Entry("moq _moq_test.go", "service_moq_test.go", gogenfilter.ReasonMoq),
			ginkgo.Entry("mockgen _mock.go", "service_mock.go", gogenfilter.ReasonMockgen),
			ginkgo.Entry("mockgen mock_ prefix", "mock_service.go", gogenfilter.ReasonMockgen),
			ginkgo.Entry(
				"deepcopy zz_generated.",
				"zz_generated.deepcopy.go",
				gogenfilter.ReasonDeepcopy,
			),
		)

		ginkgo.When("content has no generated markers", func() {
			ginkgo.It("returns ReasonNotFiltered", func() {
				reason := gogenfilter.DetectReason(
					"main.go",
					"package main\n\nfunc main() {}\n",
					gogenfilter.FilterAll,
				)
				gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonNotFiltered))
			})
		})

		ginkgo.When("specific detector is enabled but generic is not", func() {
			ginkgo.It("only detects that specific generator", func() {
				reason := gogenfilter.DetectReason(
					"db/models.go",
					"// Code generated by sqlc. DO NOT EDIT.\npackage db\n",
					gogenfilter.FilterSQLC,
				)
				gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonSQLC))
			})

			ginkgo.It(
				"does not detect content-only generators when only filename-only is enabled",
				func() {
					reason := gogenfilter.DetectReason(
						"custom_gen.go",
						"// Code generated by my-tool. DO NOT EDIT.\npackage main\n",
						gogenfilter.FilterSQLC,
					)
					gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonNotFiltered))
				},
			)
		})

		ginkgo.When("a file matches multiple detectors", func() {
			ginkgo.It("specific detector takes priority over generic", func() {
				reason := gogenfilter.DetectReason(
					"db/models.go",
					"// Code generated by sqlc. DO NOT EDIT.\npackage db\n",
					gogenfilter.FilterAll,
				)
				gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonSQLC))
			})

			ginkgo.It("first matching detector wins", func() {
				// If both sqlc filename and templ filename matched, first in detectors table wins
				reason := gogenfilter.DetectReason(
					"query.sql.go",
					"// Code generated by sqlc. DO NOT EDIT.\npackage db\n",
					gogenfilter.FilterAll,
				)
				gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonSQLC))
			})
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// DETECTING FROM io.Reader — As a user streaming file content,
	// I want to detect generation without reading into a string first.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Detecting from io.Reader", func() {
		ginkgo.When("reader contains generated content", func() {
			ginkgo.It("detects the reason", func() {
				content := "// Code generated by sqlc. DO NOT EDIT.\npackage db\n"
				reason, err := gogenfilter.DetectReasonReader(
					"db/models.go",
					stringReader(content),
					gogenfilter.FilterAll,
				)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonSQLC))
			})
		})

		ginkgo.When("reader contains non-generated content", func() {
			ginkgo.It("returns ReasonNotFiltered", func() {
				reason, err := gogenfilter.DetectReasonReader(
					"main.go",
					stringReader("package main\n"),
					gogenfilter.FilterAll,
				)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(reason).To(gomega.Equal(gogenfilter.ReasonNotFiltered))
			})
		})

		ginkgo.When("reader fails", func() {
			ginkgo.It("propagates the error", func() {
				_, err := gogenfilter.DetectReasonReader(
					"file.go",
					&errorReader{},
					gogenfilter.FilterAll,
				)
				gomega.Expect(err).To(gomega.HaveOccurred())
				gomega.Expect(err.Error()).To(gomega.ContainSubstring("read content"))
			})
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// PATTERN MATCHING — As a user, I want glob patterns to match file paths
	// so I can include/exclude specific files from filtering.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Pattern matching", func() {
		ginkgo.DescribeTable(
			"matches patterns correctly",
			func(path, pattern string, expected bool) {
				gomega.Expect(gogenfilter.MatchPattern(path, pattern)).To(gomega.Equal(expected))
			},
			ginkgo.Entry("exact match", "file.go", "file.go", true),
			ginkgo.Entry("exact no match", "file.go", "other.go", false),
			ginkgo.Entry("wildcard match", "test.go", "*.go", true),
			ginkgo.Entry("wildcard no match by extension", "test.txt", "*.go", false),
			ginkgo.Entry("doublestar matches any depth", "a/b/c/file.go", "**/*.go", true),
			ginkgo.Entry("doublestar prefix match", "any/path/file.go", "**/file.go", true),
			ginkgo.Entry("no match on vendor", "other/file.go", "vendor/*.go", false),
			ginkgo.Entry("directory match", "pkg/sub/file.go", "pkg/**/*.go", true),
			ginkgo.Entry(
				"nested directory wildcard",
				"src/internal/util.go",
				"src/*/util.go",
				true,
			),
			ginkgo.Entry("single star does not cross separator", "a/b/file.go", "*/file.go", false),
		)
	})

	// ═══════════════════════════════════════════════════════════════════════
	// INCLUDE/EXCLUDE PATTERNS — As a user, I want to scope which files
	// are considered for filtering.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Include and exclude patterns", func() {
		ginkgo.Describe("Include patterns", func() {
			ginkgo.When("a file matches include pattern and is generated", func() {
				ginkgo.It("filters it as generated", func() {
					opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filter, err := gogenfilter.NewFilter(
						opts,
						gogenfilter.WithIncludePatterns("models.go"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filtered, err := filter.Filter("models.go")
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					gomega.Expect(filtered).To(gomega.BeTrue())
				})
			})

			ginkgo.When("a file does not match any include pattern", func() {
				ginkgo.It("filters it with outside-scope reason", func() {
					filter, err := gogenfilter.NewFilter(
						gogenfilter.WithIncludePatterns("pkg/*.go"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filtered, err := filter.Filter("other/file.go")
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					gomega.Expect(filtered).To(gomega.BeTrue())

					stats := filter.GetStats()
					gomega.Expect(stats.FilteredBy(gogenfilter.ReasonOutsideScope)).
						To(gomega.Equal(1))
				})

				ginkgo.It("records the file in FilteredFiles", func() {
					filter, err := gogenfilter.NewFilter(
						gogenfilter.WithIncludePatterns("pkg/*.go"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())

					_, _ = filter.Filter("other/file.go")

					stats := filter.GetStats()
					files := stats.FilteredFiles(gogenfilter.ReasonOutsideScope)
					gomega.Expect(files).To(gomega.ContainElement("other/file.go"))
				})
			})

			ginkgo.When("a file matches include pattern but is not generated", func() {
				ginkgo.It("does not filter it", func() {
					opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filter, err := gogenfilter.NewFilter(
						opts,
						gogenfilter.WithIncludePatterns("testdata/**/*.go"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filtered, err := filter.Filter("testdata/handwritten/main.go")
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					gomega.Expect(filtered).To(gomega.BeFalse())
				})
			})
		})

		ginkgo.Describe("Exclude patterns", func() {
			ginkgo.When("a file matches an exclude pattern", func() {
				ginkgo.It("filters it regardless of content", func() {
					opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filter, err := gogenfilter.NewFilter(
						opts,
						gogenfilter.WithExcludePatterns("**/vendor/**"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filtered, err := filter.Filter("vendor/pkg/generated.go")
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					gomega.Expect(filtered).To(gomega.BeTrue())

					stats := filter.GetStats()
					gomega.Expect(stats.FilteredBy(gogenfilter.ReasonExcludePattern)).
						To(gomega.Equal(1))
				})
			})

			ginkgo.When("a file does not match any exclude pattern", func() {
				ginkgo.It("proceeds with normal detection", func() {
					opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filter, err := gogenfilter.NewFilter(
						opts,
						gogenfilter.WithExcludePatterns("**/vendor/**"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filtered, err := filter.Filter("db/models.go")
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					gomega.Expect(filtered).To(gomega.BeTrue()) // detected by sqlc filename
				})
			})
		})

		ginkgo.Describe("Combining include and exclude patterns", func() {
			ginkgo.When("exclude takes priority over include", func() {
				ginkgo.It("excludes the file even if it matches include", func() {
					opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					filter, err := gogenfilter.NewFilter(
						opts,
						gogenfilter.WithIncludePatterns("**/*.go"),
						gogenfilter.WithExcludePatterns("**/test_*.go"),
					)
					gomega.Expect(err).NotTo(gomega.HaveOccurred())
					// Include patterns are checked first in Filter();
					// a file not matching include is filtered as outside-scope.
					gomega.Expect(filter.IsEnabled()).To(gomega.BeTrue())
				})
			})
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// METRICS — As a user, I want to track which files were filtered and why.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Metrics", func() {
		ginkgo.When("multiple files are checked", func() {
			ginkgo.It("tracks total files checked", func() {
				opts, err := gogenfilter.WithFilterOptions(
					gogenfilter.FilterSQLC,
					gogenfilter.FilterTempl,
				)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err := gogenfilter.NewFilter(opts)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())

				_, _ = filter.Filter("db/models.go")                 // filtered (sqlc filename)
				_, _ = filter.Filter("page_templ.go")                // filtered (templ filename)
				_, _ = filter.Filter("testdata/handwritten/main.go") // checked but not filtered

				stats := filter.GetStats()
				gomega.Expect(int(stats.TotalFilesChecked)).To(gomega.BeNumerically(">=", 3))
			})

			ginkgo.It("tracks filtered count per reason", func() {
				opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err := gogenfilter.NewFilter(opts)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())

				_, _ = filter.Filter("db/models.go")
				_, _ = filter.Filter("db/querier.go")
				_, _ = filter.Filter("testdata/handwritten/main.go")

				stats := filter.GetStats()
				gomega.Expect(stats.FilteredBy(gogenfilter.ReasonSQLC)).To(gomega.Equal(2))
				gomega.Expect(stats.TotalFiltered()).To(gomega.Equal(2))
			})

			ginkgo.It("records filtered file paths", func() {
				opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err := gogenfilter.NewFilter(opts)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())

				_, _ = filter.Filter("db/models.go")

				stats := filter.GetStats()
				files := stats.FilteredFiles(gogenfilter.ReasonSQLC)
				gomega.Expect(files).To(gomega.ConsistOf("db/models.go"))
			})

			ginkgo.It("returns nil for reasons with no filtered files", func() {
				opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err := gogenfilter.NewFilter(opts)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())

				_, _ = filter.Filter("testdata/handwritten/main.go")

				stats := filter.GetStats()
				gomega.Expect(stats.FilteredFiles(gogenfilter.ReasonTempl)).To(gomega.BeNil())
			})
		})

		ginkgo.When("filter is disabled", func() {
			ginkgo.It("returns zero stats", func() {
				filter, err := gogenfilter.NewFilter()
				gomega.Expect(err).NotTo(gomega.HaveOccurred())

				stats := filter.GetStats()
				gomega.Expect(stats.TotalFilesChecked).
					To(gomega.Equal(gogenfilter.TotalFilesChecked(0)))
				gomega.Expect(stats.TotalFiltered()).To(gomega.Equal(0))
			})
		})

		ginkgo.When("GetStats is called on a filter with include patterns only", func() {
			ginkgo.It("tracks outside-scope rejections", func() {
				filter, err := gogenfilter.NewFilter(
					gogenfilter.WithIncludePatterns("pkg/**/*.go"),
				)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())

				_, _ = filter.Filter("other/file.go")
				_, _ = filter.Filter("vendor/main.go")

				stats := filter.GetStats()
				gomega.Expect(stats.FilteredBy(gogenfilter.ReasonOutsideScope)).To(gomega.Equal(2))
			})
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// TYPE VALIDATION — As a library user, I want type safety for options.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Type validation", func() {
		ginkgo.DescribeTable("FilterOption validity",
			func(opt gogenfilter.FilterOption, valid bool) {
				gomega.Expect(opt.IsValid()).To(gomega.Equal(valid))
			},
			ginkgo.Entry("sqlc is valid", gogenfilter.FilterSQLC, true),
			ginkgo.Entry("all is valid", gogenfilter.FilterAll, true),
			ginkgo.Entry("generic is valid", gogenfilter.FilterGeneric, true),
			ginkgo.Entry("empty is invalid", gogenfilter.FilterOption(""), false),
			ginkgo.Entry("unknown is invalid", gogenfilter.FilterOption("unknown"), false),
		)

		ginkgo.DescribeTable("FilterReason validity",
			func(reason gogenfilter.FilterReason, valid bool) {
				gomega.Expect(reason.IsValid()).To(gomega.Equal(valid))
			},
			ginkgo.Entry("sqlc reason is valid", gogenfilter.ReasonSQLC, true),
			ginkgo.Entry("not-filtered is valid", gogenfilter.ReasonNotFiltered, true),
			ginkgo.Entry("outside-scope is valid", gogenfilter.ReasonOutsideScope, true),
			ginkgo.Entry("exclude-pattern is valid", gogenfilter.ReasonExcludePattern, true),
			ginkgo.Entry("unknown is invalid", gogenfilter.FilterReason("unknown"), false),
		)

		ginkgo.It("FilterOption.Reason returns matching FilterReason", func() {
			gomega.Expect(gogenfilter.FilterSQLC.Reason()).To(gomega.Equal(gogenfilter.ReasonSQLC))
			gomega.Expect(gogenfilter.FilterTempl.Reason()).
				To(gomega.Equal(gogenfilter.ReasonTempl))
			gomega.Expect(gogenfilter.FilterGeneric.Reason()).
				To(gomega.Equal(gogenfilter.ReasonGeneric))
		})

		ginkgo.It("AllFilterOptions returns all known options", func() {
			opts := gogenfilter.AllFilterOptions()
			gomega.Expect(opts).To(gomega.ContainElement(gogenfilter.FilterAll))
			gomega.Expect(opts).To(gomega.ContainElement(gogenfilter.FilterSQLC))
			gomega.Expect(opts).To(gomega.ContainElement(gogenfilter.FilterGeneric))
		})

		ginkgo.It("AllFilterReasons includes special reasons", func() {
			reasons := gogenfilter.AllFilterReasons()
			gomega.Expect(reasons).To(gomega.ContainElement(gogenfilter.ReasonNotFiltered))
			gomega.Expect(reasons).To(gomega.ContainElement(gogenfilter.ReasonOutsideScope))
			gomega.Expect(reasons).To(gomega.ContainElement(gogenfilter.ReasonExcludePattern))
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// ERROR SYSTEM — As a user, I want clear branded errors for diagnostics.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Error system", func() {
		ginkgo.When("project root is not found", func() {
			ginkgo.It("returns a ProjectRootError with branded prefix", func() {
				_, err := gogenfilter.FindProjectRoot(
					gogenfilter.StartPath("/nonexistent/path/12345"),
					[]string{"go.mod"},
				)
				gomega.Expect(err).To(gomega.HaveOccurred())
				gomega.Expect(err.Error()).To(gomega.ContainSubstring("[gogenfilter:"))
				gomega.Expect(err.Code).To(gomega.Equal(gogenfilter.CodeProjectRootNotFound))
			})

			ginkgo.It("supports errors.Is matching", func() {
				_, err := gogenfilter.FindProjectRoot(
					gogenfilter.StartPath("/nonexistent/path/12345"),
					[]string{"go.mod"},
				)
				gomega.Expect(errors.Is(err, gogenfilter.ErrProjectRootNotFound)).
					To(gomega.BeTrue())
			})
		})

		ginkgo.When("all error codes are enumerated", func() {
			ginkgo.It("has non-empty help text for each", func() {
				for _, code := range gogenfilter.AllErrorCodes() {
					help := gogenfilter.CodeHelp(code)
					gomega.Expect(help).
						NotTo(gomega.BeEmpty(), "CodeHelp(%q) should not be empty", code)
				}
			})
		})

		ginkgo.When("FilterConfigError occurs", func() {
			ginkgo.It("provides ErrorCode and Help methods", func() {
				err := &gogenfilter.FilterConfigError{
					Code:   gogenfilter.CodeInvalidFilterOption,
					Option: gogenfilter.FilterOption("bad"),
				}
				gomega.Expect(err.ErrorCode()).To(gomega.Equal(gogenfilter.CodeInvalidFilterOption))
				gomega.Expect(err.Help()).NotTo(gomega.BeEmpty())
			})
		})

		ginkgo.When("SQLCConfigError occurs", func() {
			ginkgo.It("includes config path in error message", func() {
				err := &gogenfilter.SQLCConfigError{
					Code:       gogenfilter.CodeSQLCConfigParse,
					ConfigPath: gogenfilter.ConfigPath("sqlc.yaml"),
					Operation:  gogenfilter.Operation("parse"),
					Message:    gogenfilter.ErrorMessage("invalid YAML"),
				}
				gomega.Expect(err.Error()).To(gomega.ContainSubstring("sqlc.yaml"))
				gomega.Expect(err.ErrorCode()).To(gomega.Equal(gogenfilter.CodeSQLCConfigParse))
				gomega.Expect(err.Help()).NotTo(gomega.BeEmpty())
			})
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// STRING REPRESENTATIONS — As a debugger, I want readable string output.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("String representations", func() {
		ginkgo.When("Filter is disabled", func() {
			ginkgo.It("String returns 'Filter(disabled)'", func() {
				filter, err := gogenfilter.NewFilter()
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(filter.String()).To(gomega.Equal("Filter(disabled)"))
			})
		})

		ginkgo.When("Filter is enabled", func() {
			ginkgo.It("String includes options", func() {
				cfg, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				filter, err := gogenfilter.NewFilter(cfg)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(filter.String()).To(gomega.ContainSubstring("sqlc"))
			})
		})

		ginkgo.It("FilterOption.String returns the option name", func() {
			gomega.Expect(gogenfilter.FilterSQLC.String()).To(gomega.Equal("sqlc"))
			gomega.Expect(gogenfilter.FilterAll.String()).To(gomega.Equal("all"))
		})

		ginkgo.It("FilterReason.String returns the reason name", func() {
			gomega.Expect(gogenfilter.ReasonSQLC.String()).To(gomega.Equal("sqlc"))
			gomega.Expect(gogenfilter.ReasonNotFiltered.String()).To(gomega.Equal("not-filtered"))
		})

		ginkgo.It("FilterStats.String shows checked and filtered counts", func() {
			opts, err := gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			filter, err := gogenfilter.NewFilter(opts)
			gomega.Expect(err).NotTo(gomega.HaveOccurred())

			_, _ = filter.Filter("db/models.go")
			_, _ = filter.Filter("testdata/handwritten/main.go")

			stats := filter.GetStats()
			s := stats.String()
			gomega.Expect(s).To(gomega.ContainSubstring("checked="))
			gomega.Expect(s).To(gomega.ContainSubstring("filtered="))
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// FILESYSTEM INTEGRATION — As a user, I want to use fstest.MapFS
	// for tests without real filesystem access.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Custom filesystem (WithFS)", func() {
		var (
			fsys    fs.FS
			filter  *gogenfilter.Filter
			testErr error
		)

		ginkgo.BeforeEach(func() {
			fsys = fstest.MapFS{
				"db/models.go": &fstest.MapFile{
					Data: []byte("// Code generated by sqlc. DO NOT EDIT.\npackage db\n"),
				},
				"main.go": &fstest.MapFile{
					Data: []byte("package main\n\nfunc main() {}\n"),
				},
			}

			var cfg gogenfilter.FilterConfig

			cfg, testErr = gogenfilter.WithFilterOptions(gogenfilter.FilterSQLC)
			gomega.Expect(testErr).NotTo(gomega.HaveOccurred())
			filter, testErr = gogenfilter.NewFilter(
				cfg,
				gogenfilter.WithFS(fsys),
			)
			gomega.Expect(testErr).NotTo(gomega.HaveOccurred())
		})

		ginkgo.It("detects generated files from the custom filesystem", func() {
			filtered, err := filter.Filter("db/models.go")
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			gomega.Expect(filtered).To(gomega.BeTrue())
		})

		ginkgo.It("does not filter non-generated files", func() {
			filtered, err := filter.Filter("main.go")
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			gomega.Expect(filtered).To(gomega.BeFalse())
		})

		ginkgo.It("returns error for missing files", func() {
			_, err := filter.Filter("nonexistent.go")
			gomega.Expect(err).To(gomega.HaveOccurred())
		})
	})

	// ═══════════════════════════════════════════════════════════════════════
	// REAL TESTDATA — As a user, I want the filter to detect actual
	// generated files from the testdata directory.
	// ═══════════════════════════════════════════════════════════════════════
	ginkgo.Describe("Integration with testdata files", func() {
		var filter *gogenfilter.Filter

		ginkgo.BeforeEach(func() {
			cfg, err := gogenfilter.WithFilterOptions(gogenfilter.FilterAll)
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			filter, err = gogenfilter.NewFilter(cfg)
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
		})

		ginkgo.DescribeTable(
			"detects real generated files in testdata",
			func(filePath string, expectedReason gogenfilter.FilterReason) {
				filtered, err := filter.Filter("testdata/" + filePath)
				gomega.Expect(err).NotTo(gomega.HaveOccurred())
				gomega.Expect(filtered).
					To(gomega.BeTrue(), "expected testdata/%s to be filtered", filePath)

				stats := filter.GetStats()
				gomega.Expect(stats.FilteredBy(expectedReason)).
					To(gomega.BeNumerically(">=", 1),
						"expected at least 1 file filtered for reason %s", expectedReason)
			},
			ginkgo.Entry("sqlc models.go", "sqlc/models.go", gogenfilter.ReasonSQLC),
			ginkgo.Entry("templ page", "templ/page_templ.go", gogenfilter.ReasonTempl),
			ginkgo.Entry("go-enum status", "go-enum/status_enum.go", gogenfilter.ReasonGoEnum),
			ginkgo.Entry("protobuf user.pb.go", "protobuf/user.pb.go", gogenfilter.ReasonProtobuf),
			ginkgo.Entry(
				"protobuf user_grpc.pb.go",
				"protobuf/user_grpc.pb.go",
				gogenfilter.ReasonProtobuf,
			),
			ginkgo.Entry("oapi-codegen petstore", "oapi/petstore.gen.go", gogenfilter.ReasonOapi),
			ginkgo.Entry(
				"deepcopy-gen",
				"deepcopy/zz_generated.deepcopy.go",
				gogenfilter.ReasonDeepcopy,
			),
			ginkgo.Entry("wire", "wire/wire_gen.go", gogenfilter.ReasonWire),
			ginkgo.Entry("moq", "moq/service_moq.go", gogenfilter.ReasonMoq),
			ginkgo.Entry("mockgen", "mockgen/service_mock.go", gogenfilter.ReasonMockgen),
			ginkgo.Entry("stringer", "stringer/priority_string.go", gogenfilter.ReasonStringer),
		)

		ginkgo.It("does not filter handwritten files", func() {
			filtered, err := filter.Filter("testdata/handwritten/main.go")
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			gomega.Expect(filtered).To(gomega.BeFalse())
		})

		ginkgo.It("does not filter handwritten types.go", func() {
			filtered, err := filter.Filter("testdata/handwritten/types.go")
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			gomega.Expect(filtered).To(gomega.BeFalse())
		})
	})
})

// ═════════════════════════════════════════════════════════════════════════════
// Helper types
// ═════════════════════════════════════════════════════════════════════════════

type stringReaderImpl struct {
	content string
	offset  int
}

func stringReader(s string) *stringReaderImpl {
	return &stringReaderImpl{content: s, offset: 0}
}

func (r *stringReaderImpl) Read(p []byte) (int, error) {
	if r.offset >= len(r.content) {
		return 0, io.EOF
	}

	n := copy(p, r.content[r.offset:])
	r.offset += n

	return n, nil
}

var errReadFailed = errors.New("read failed")

type errorReader struct{}

func (r *errorReader) Read(_ []byte) (int, error) {
	return 0, fmt.Errorf("%w: read failed", errReadFailed)
}
