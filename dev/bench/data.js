window.BENCHMARK_DATA = {
  "lastUpdate": 1781167335454,
  "repoUrl": "https://github.com/LarsArtmann/gogenfilter",
  "entries": {
    "gogenfilter": [
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "b6a3a8ff23ea79a09e0118c4b49adada630db4c0",
          "message": "feat(api): add FilterContext and FilterPathsContext for cancellation support\n\n- `FilterContext(ctx, path)` checks context before and after filtering,\n  returning wrapped context errors via fmt.Errorf with %w\n- `FilterPathsContext(ctx, paths)` checks context between each path in\n  the batch, returning partial results when cancelled\n- Both satisfy golangci-lint: noinlineerr, wrapcheck rules\n- 4 new tests: cancelled context, active context, mid-batch cancel,\n  active context with batch\n\nGenerated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-04T16:42:06+02:00",
          "tree_id": "3ed72136cefbcb4042d04dc71f111a5e7dc3ee94",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/b6a3a8ff23ea79a09e0118c4b49adada630db4c0"
        },
        "date": 1777905784774,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 147.5,
            "unit": "ns/op\t      83 B/op\t       0 allocs/op",
            "extra": "7937986 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 147.5,
            "unit": "ns/op",
            "extra": "7937986 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 83,
            "unit": "B/op",
            "extra": "7937986 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7937986 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.511,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479418978 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.511,
            "unit": "ns/op",
            "extra": "479418978 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479418978 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479418978 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "48328218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.72,
            "unit": "ns/op",
            "extra": "48328218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "48328218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "48328218 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 14.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79591398 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 14.97,
            "unit": "ns/op",
            "extra": "79591398 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79591398 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79591398 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.93,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76150872 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.93,
            "unit": "ns/op",
            "extra": "76150872 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76150872 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76150872 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.115,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147947917 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.115,
            "unit": "ns/op",
            "extra": "147947917 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147947917 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147947917 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 89.23,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12454324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 89.23,
            "unit": "ns/op",
            "extra": "12454324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12454324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12454324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 96.27,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11690094 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 96.27,
            "unit": "ns/op",
            "extra": "11690094 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11690094 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11690094 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 143.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8439260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 143.6,
            "unit": "ns/op",
            "extra": "8439260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8439260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8439260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22740819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.67,
            "unit": "ns/op",
            "extra": "22740819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22740819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22740819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 152,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7897448 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 152,
            "unit": "ns/op",
            "extra": "7897448 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7897448 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7897448 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 749.9,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1588728 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 749.9,
            "unit": "ns/op",
            "extra": "1588728 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1588728 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1588728 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1449,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "806664 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1449,
            "unit": "ns/op",
            "extra": "806664 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "806664 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "806664 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1266,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "950252 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1266,
            "unit": "ns/op",
            "extra": "950252 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "950252 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "950252 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1057,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1057,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1588,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "778764 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1588,
            "unit": "ns/op",
            "extra": "778764 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "778764 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "778764 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.435,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "349095294 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.435,
            "unit": "ns/op",
            "extra": "349095294 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "349095294 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "349095294 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6241,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6241,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 485.4,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2449845 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 485.4,
            "unit": "ns/op",
            "extra": "2449845 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2449845 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2449845 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 632,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1888372 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 632,
            "unit": "ns/op",
            "extra": "1888372 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1888372 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1888372 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.69,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "77699976 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.69,
            "unit": "ns/op",
            "extra": "77699976 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "77699976 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "77699976 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "77965712 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.97,
            "unit": "ns/op",
            "extra": "77965712 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "77965712 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "77965712 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.58,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.58,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "6e86bf7ef995aef0713ca75d028b5c654857d7bb",
          "message": "docs: update AGENTS.md and CHANGELOG for FilterPaths + FilterContext APIs\n\n- AGENTS.md: add FilterPaths, FilterContext, FilterPathsContext to API\n  patterns; update CI section to 4 workflows with 98% coverage threshold\n- CHANGELOG.md: add FilterPaths, FilterContext, FilterPathsContext to\n  v3.0.0 Added section; deduplicate existing Added entries\n\nGenerated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-04T16:45:00+02:00",
          "tree_id": "18a4c2840a2d4f239643f592a2e1de773a2071f7",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/6e86bf7ef995aef0713ca75d028b5c654857d7bb"
        },
        "date": 1777905968193,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 138.7,
            "unit": "ns/op\t      87 B/op\t       0 allocs/op",
            "extra": "7538108 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 138.7,
            "unit": "ns/op",
            "extra": "7538108 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 87,
            "unit": "B/op",
            "extra": "7538108 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7538108 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.53,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479107722 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.53,
            "unit": "ns/op",
            "extra": "479107722 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479107722 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479107722 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 23.77,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "48542744 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 23.77,
            "unit": "ns/op",
            "extra": "48542744 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "48542744 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "48542744 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 14.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80346748 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 14.97,
            "unit": "ns/op",
            "extra": "80346748 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80346748 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80346748 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 16.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76964128 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 16.24,
            "unit": "ns/op",
            "extra": "76964128 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76964128 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76964128 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.035,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "149524938 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.035,
            "unit": "ns/op",
            "extra": "149524938 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "149524938 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "149524938 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 85.69,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14071375 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 85.69,
            "unit": "ns/op",
            "extra": "14071375 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14071375 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14071375 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 94.82,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12652887 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 94.82,
            "unit": "ns/op",
            "extra": "12652887 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12652887 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12652887 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 142,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8486077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 142,
            "unit": "ns/op",
            "extra": "8486077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8486077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8486077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 55.36,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22649928 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 55.36,
            "unit": "ns/op",
            "extra": "22649928 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22649928 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22649928 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 151.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7718260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 151.8,
            "unit": "ns/op",
            "extra": "7718260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7718260 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7718260 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 706.3,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1688283 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 706.3,
            "unit": "ns/op",
            "extra": "1688283 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1688283 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1688283 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1359,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "891469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1359,
            "unit": "ns/op",
            "extra": "891469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "891469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "891469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1214,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "994636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1214,
            "unit": "ns/op",
            "extra": "994636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "994636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "994636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 968.4,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1240954 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 968.4,
            "unit": "ns/op",
            "extra": "1240954 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1240954 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1240954 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1516,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "780442 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1516,
            "unit": "ns/op",
            "extra": "780442 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "780442 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "780442 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.431,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "349155385 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.431,
            "unit": "ns/op",
            "extra": "349155385 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "349155385 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "349155385 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6324,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6324,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 468.6,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2566539 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 468.6,
            "unit": "ns/op",
            "extra": "2566539 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2566539 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2566539 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 602.7,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1986766 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 602.7,
            "unit": "ns/op",
            "extra": "1986766 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1986766 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1986766 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.68,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80814752 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.68,
            "unit": "ns/op",
            "extra": "80814752 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80814752 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80814752 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "78017902 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.97,
            "unit": "ns/op",
            "extra": "78017902 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "78017902 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "78017902 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.61,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.61,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "786b75b5350eb32c6e643a613ed37de217b95abd",
          "message": "docs(AGENTS.md): update CI section with fixes, known issues, and current coverage\n\n- CI section: document all 4 workflows with current status (ci, benchmark, website, lighthouse)\n- Add Benchmark workflow docs (was missing entirely)\n- Update Website workflow: PRIVATE_REPO_TOKEN for cross-repo checkouts, workflow_dispatch\n- Update Lighthouse workflow: assertions-only config (no budget.json), LHCI v12 compatibility\n- Add CI Known Issues section: PAT token requirement, accessibility failures, missing LHCI token\n- Remove all budget.json references (deleted from repo)\n- Update coverage: 98.9% (was stale 99.8%)\n- Fix Lighthouse/Performance section: assertions not budgets\n\n💘 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-04T17:03:59+02:00",
          "tree_id": "6c5369ce22aa18942be63266b50f704449d31399",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/786b75b5350eb32c6e643a613ed37de217b95abd"
        },
        "date": 1777907173625,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 128.8,
            "unit": "ns/op\t      96 B/op\t       0 allocs/op",
            "extra": "8562876 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 128.8,
            "unit": "ns/op",
            "extra": "8562876 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 96,
            "unit": "B/op",
            "extra": "8562876 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8562876 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.649,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "484512326 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.649,
            "unit": "ns/op",
            "extra": "484512326 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "484512326 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "484512326 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.94,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "49995478 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.94,
            "unit": "ns/op",
            "extra": "49995478 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "49995478 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "49995478 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 15.07,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80663022 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 15.07,
            "unit": "ns/op",
            "extra": "80663022 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80663022 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80663022 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "74963361 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.87,
            "unit": "ns/op",
            "extra": "74963361 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "74963361 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "74963361 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.401,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "162132220 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.401,
            "unit": "ns/op",
            "extra": "162132220 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "162132220 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "162132220 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 81.38,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14785333 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 81.38,
            "unit": "ns/op",
            "extra": "14785333 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14785333 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14785333 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.79,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12349753 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.79,
            "unit": "ns/op",
            "extra": "12349753 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12349753 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12349753 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 144.4,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8389287 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 144.4,
            "unit": "ns/op",
            "extra": "8389287 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8389287 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8389287 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23636077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.6,
            "unit": "ns/op",
            "extra": "23636077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23636077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23636077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 158.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7654454 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 158.5,
            "unit": "ns/op",
            "extra": "7654454 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7654454 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7654454 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 738.8,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1659024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 738.8,
            "unit": "ns/op",
            "extra": "1659024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1659024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1659024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1469,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "773656 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1469,
            "unit": "ns/op",
            "extra": "773656 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "773656 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "773656 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1196,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "892888 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1196,
            "unit": "ns/op",
            "extra": "892888 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "892888 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "892888 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1040,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1040,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1526,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "670264 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1526,
            "unit": "ns/op",
            "extra": "670264 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "670264 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "670264 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.96,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "304217899 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.96,
            "unit": "ns/op",
            "extra": "304217899 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "304217899 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "304217899 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.7063,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.7063,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 433.3,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2750413 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 433.3,
            "unit": "ns/op",
            "extra": "2750413 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2750413 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2750413 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 577.8,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2026614 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 577.8,
            "unit": "ns/op",
            "extra": "2026614 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2026614 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2026614 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.86,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80266966 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.86,
            "unit": "ns/op",
            "extra": "80266966 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80266966 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80266966 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 15.16,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79038969 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 15.16,
            "unit": "ns/op",
            "extra": "79038969 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79038969 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79038969 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.69,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.69,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "92ab8d4db32ebdbcd848e065949bd7583049f23f",
          "message": "docs(status): improve markdown table alignment and deduplicate error assertions\n\n### Documentation: Markdown table alignment improvements\n\nTwo status report files received improved markdown table alignment:\n- docs/status/2026-05-04_17-15_post-improvement-status.md\n- docs/status/2026-05-04_17-16_comprehensive-status-report.md\n\nTables in both files had inconsistent column separator alignment (e.g., `| --- |`\ninstead of `| --- | --- |`). Standardized all table separators to use explicit\ncolumn markers (`| --- | --- |` / `| --- |`) which improves rendering in GitHub's\nmarkdown viewer and most editors. This is a purely cosmetic/documentation\nchange that does not affect any functionality.\n\n### filter_test.go: Deduplicate errors.Is assertion pattern\n\nReplaced the manual `errors.Is` + `t.Errorf` pattern with the shared\n`assertErrorsIs(t, err, context.Canceled)` helper in two locations:\n- TestFilterContext: cancelled context subtest\n- TestFilterPathsContext: cancelled context subtest\n\nBefore:\n  if !errors.Is(err, context.Canceled) {\n      t.Errorf(\"expected context.Canceled, got: %v\", err)\n  }\n\nAfter:\n  assertErrorsIs(t, err, context.Canceled)\n\nThis follows the established pattern in the test suite of using the assertErrorsIs\nhelper for consistent error identity assertions. The manual pattern was flagged\nas duplication since it appears in multiple test cases with only the sentinel\nerror varying. Using the helper reduces code duplication and ensures consistent\nerror messaging across all error assertion sites.\n\n### helpers_test.go: Improve assertErrorsIs error message\n\nChanged the failure message in assertErrorsIs from:\n  \"errors.Is should match %v\"\n\nTo:\n  \"expected %v, got: %v\"\n\nThe new message provides more actionable debugging information by showing both\nthe expected sentinel error and the actual error value that was received. This\nmakes test failures easier to diagnose at a glance without needing to mentally\nreconstruct what the received error was. The old message only showed the\nsentinel, requiring the developer to infer the actual error from context.\n\n💘 Generated with Crush\n\nAssisted-by: MiniMax-M2.7-highspeed via Crush <crush@charm.land>",
          "timestamp": "2026-05-04T17:28:51+02:00",
          "tree_id": "12c7acbbf8431c49421517f3c2c7c269f87e7ac7",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/92ab8d4db32ebdbcd848e065949bd7583049f23f"
        },
        "date": 1777908610051,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 174.9,
            "unit": "ns/op\t      94 B/op\t       0 allocs/op",
            "extra": "7012582 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 174.9,
            "unit": "ns/op",
            "extra": "7012582 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 94,
            "unit": "B/op",
            "extra": "7012582 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7012582 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.497,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479533934 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.497,
            "unit": "ns/op",
            "extra": "479533934 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479533934 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479533934 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.04,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "47158875 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.04,
            "unit": "ns/op",
            "extra": "47158875 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "47158875 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "47158875 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 15.79,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80046757 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 15.79,
            "unit": "ns/op",
            "extra": "80046757 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80046757 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80046757 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.89,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76754030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.89,
            "unit": "ns/op",
            "extra": "76754030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76754030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76754030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.108,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "148060077 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.108,
            "unit": "ns/op",
            "extra": "148060077 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "148060077 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "148060077 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 85.4,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "13915447 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 85.4,
            "unit": "ns/op",
            "extra": "13915447 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "13915447 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "13915447 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 95.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12384002 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 95.72,
            "unit": "ns/op",
            "extra": "12384002 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12384002 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12384002 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 150.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6969351 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 150.1,
            "unit": "ns/op",
            "extra": "6969351 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6969351 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6969351 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 53.92,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22299049 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 53.92,
            "unit": "ns/op",
            "extra": "22299049 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22299049 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22299049 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 151.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7896626 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 151.6,
            "unit": "ns/op",
            "extra": "7896626 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7896626 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7896626 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 726.6,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1646305 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 726.6,
            "unit": "ns/op",
            "extra": "1646305 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1646305 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1646305 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1418,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "848068 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1418,
            "unit": "ns/op",
            "extra": "848068 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "848068 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "848068 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1261,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "946683 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1261,
            "unit": "ns/op",
            "extra": "946683 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "946683 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "946683 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1029,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1029,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1588,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "787951 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1588,
            "unit": "ns/op",
            "extra": "787951 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "787951 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "787951 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.442,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "347975631 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.442,
            "unit": "ns/op",
            "extra": "347975631 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "347975631 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "347975631 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6275,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6275,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 482.2,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2457316 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 482.2,
            "unit": "ns/op",
            "extra": "2457316 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2457316 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2457316 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 619.4,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1934911 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 619.4,
            "unit": "ns/op",
            "extra": "1934911 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1934911 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1934911 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.78,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "77700450 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.78,
            "unit": "ns/op",
            "extra": "77700450 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "77700450 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "77700450 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 15.01,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "75338362 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 15.01,
            "unit": "ns/op",
            "extra": "75338362 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "75338362 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "75338362 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.6,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "b4c9ec9e2d929a5cddd3591e2e70355eb6c0481f",
          "message": "chore: bump github.com/Masterminds/semver/v3 v3.4.0 → v3.5.0\n\n💣 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-04T18:38:18+02:00",
          "tree_id": "8d8b7a7886b75287603658577c1e1c03637dd594",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/b4c9ec9e2d929a5cddd3591e2e70355eb6c0481f"
        },
        "date": 1777913150865,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 142.6,
            "unit": "ns/op\t      96 B/op\t       0 allocs/op",
            "extra": "8528896 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 142.6,
            "unit": "ns/op",
            "extra": "8528896 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 96,
            "unit": "B/op",
            "extra": "8528896 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8528896 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.467,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "486539148 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.467,
            "unit": "ns/op",
            "extra": "486539148 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "486539148 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "486539148 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 23.75,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "46599753 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 23.75,
            "unit": "ns/op",
            "extra": "46599753 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "46599753 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "46599753 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 14.88,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "67341544 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 14.88,
            "unit": "ns/op",
            "extra": "67341544 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "67341544 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "67341544 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 16.23,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "73155121 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 16.23,
            "unit": "ns/op",
            "extra": "73155121 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "73155121 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "73155121 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.394,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "162298069 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.394,
            "unit": "ns/op",
            "extra": "162298069 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "162298069 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "162298069 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 81.18,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14781272 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 81.18,
            "unit": "ns/op",
            "extra": "14781272 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14781272 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14781272 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.52,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12334952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.52,
            "unit": "ns/op",
            "extra": "12334952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12334952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12334952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 151.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8329897 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 151.1,
            "unit": "ns/op",
            "extra": "8329897 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8329897 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8329897 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.59,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23785465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.59,
            "unit": "ns/op",
            "extra": "23785465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23785465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23785465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 156.7,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7647364 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 156.7,
            "unit": "ns/op",
            "extra": "7647364 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7647364 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7647364 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 683.6,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1760582 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 683.6,
            "unit": "ns/op",
            "extra": "1760582 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1760582 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1760582 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1324,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "769868 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1324,
            "unit": "ns/op",
            "extra": "769868 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "769868 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "769868 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1148,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1148,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 929.9,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1292112 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 929.9,
            "unit": "ns/op",
            "extra": "1292112 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1292112 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1292112 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1429,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "833120 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1429,
            "unit": "ns/op",
            "extra": "833120 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "833120 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "833120 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.985,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "300226146 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.985,
            "unit": "ns/op",
            "extra": "300226146 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "300226146 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "300226146 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.7077,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.7077,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 413,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2872022 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 413,
            "unit": "ns/op",
            "extra": "2872022 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2872022 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2872022 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 541,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2205180 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 541,
            "unit": "ns/op",
            "extra": "2205180 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2205180 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2205180 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.99,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "70004839 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.99,
            "unit": "ns/op",
            "extra": "70004839 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "70004839 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "70004839 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 16.53,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "73151346 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 16.53,
            "unit": "ns/op",
            "extra": "73151346 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "73151346 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "73151346 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.41,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.41,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "8f72a970c0e82b475df44b3ff20900b14fb6fc1a",
          "message": "fix: docs, CI security, and comment clarity improvements\n\n- Fix errors.mdx to use errors.AsType for Helper interface example\n  (previously called methods on concrete type, obscuring the interface pattern)\n- Remove pull_request trigger from benchmark.yml to prevent contents:write\n  permission being granted on fork PRs\n- Clarify FilteredFiles comment about defensive copy contract\n- Update AGENTS.md with benchmark trigger change and CI fix details\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-04T19:15:31+02:00",
          "tree_id": "6a45206ce7e4a5d5fc4aa42f8b88625b8c79d3d8",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/8f72a970c0e82b475df44b3ff20900b14fb6fc1a"
        },
        "date": 1777915081727,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 134.6,
            "unit": "ns/op\t      82 B/op\t       0 allocs/op",
            "extra": "7972496 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 134.6,
            "unit": "ns/op",
            "extra": "7972496 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 82,
            "unit": "B/op",
            "extra": "7972496 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7972496 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.498,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "478967413 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.498,
            "unit": "ns/op",
            "extra": "478967413 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "478967413 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "478967413 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.07,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "49776069 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.07,
            "unit": "ns/op",
            "extra": "49776069 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "49776069 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "49776069 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 15.58,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79756074 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 15.58,
            "unit": "ns/op",
            "extra": "79756074 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79756074 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79756074 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 16.05,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "75958288 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 16.05,
            "unit": "ns/op",
            "extra": "75958288 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "75958288 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "75958288 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.187,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "145676750 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.187,
            "unit": "ns/op",
            "extra": "145676750 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "145676750 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "145676750 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 85.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14039810 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 85.24,
            "unit": "ns/op",
            "extra": "14039810 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14039810 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14039810 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 95.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12580653 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 95.64,
            "unit": "ns/op",
            "extra": "12580653 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12580653 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12580653 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 141.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8451752 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 141.8,
            "unit": "ns/op",
            "extra": "8451752 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8451752 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8451752 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 54.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22336592 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 54.64,
            "unit": "ns/op",
            "extra": "22336592 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22336592 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22336592 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 152.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7547792 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 152.6,
            "unit": "ns/op",
            "extra": "7547792 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7547792 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7547792 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 708.7,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1702738 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 708.7,
            "unit": "ns/op",
            "extra": "1702738 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1702738 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1702738 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1417,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "840268 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1417,
            "unit": "ns/op",
            "extra": "840268 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "840268 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "840268 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1232,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "953046 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1232,
            "unit": "ns/op",
            "extra": "953046 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "953046 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "953046 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 982.5,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1219280 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 982.5,
            "unit": "ns/op",
            "extra": "1219280 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1219280 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1219280 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1519,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "800134 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1519,
            "unit": "ns/op",
            "extra": "800134 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "800134 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "800134 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.466,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348393255 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.466,
            "unit": "ns/op",
            "extra": "348393255 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348393255 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348393255 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6243,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6243,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 464.9,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2585124 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 464.9,
            "unit": "ns/op",
            "extra": "2585124 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2585124 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2585124 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 605.4,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1977764 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 605.4,
            "unit": "ns/op",
            "extra": "1977764 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1977764 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1977764 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.66,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79450009 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.66,
            "unit": "ns/op",
            "extra": "79450009 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79450009 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79450009 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 15.14,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79190258 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 15.14,
            "unit": "ns/op",
            "extra": "79190258 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79190258 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79190258 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.57,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.57,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "4a726d484c76c3707b6cb0f59f388f577e95296e",
          "message": "feat: FilterResult, FilterDetailed, AllGeneratorOptions, WithMetricsCap\n\nMajor API improvements focused on clarity, debuggability, and production safety.\nAll changes are additive — existing Filter() API is unchanged and backward-compatible.\n\n## New Features\n\n### FilterResult struct (types.go)\n- Structured result type with Filtered, Reason, Path, Trace fields\n- FilterResult.String() for human-readable output\n- Trace field provides detection explanation (e.g., \"detected as sqlc via filename pattern\")\n\n### FilterDetailed family (filter.go)\n- FilterDetailed(filePath) (FilterResult, error) — detailed filtering with trace info\n- FilterPathsDetailed(paths) ([]FilterResult, error) — batch detailed results\n- FilterDetailedContext(ctx, filePath) (FilterResult, error) — context-aware variant\n- All delegate to new trace-aware detection functions in detection.go\n\n### AllGeneratorOptions() (types.go, detection.go)\n- Returns all detector FilterOption values (11 entries) excluding FilterAll\n- Complements AllFilterOptions() which includes FilterAll for validation\n- AllGeneratorOptions() is for enumeration; AllFilterOptions() is for IsValid checks\n\n### WithMetricsCap(n int) (filter.go, metrics.go)\n- Limits stored file paths per reason in FilteredFiles()\n- WithMetricsCap(0) = unlimited (default, backward-compatible)\n- FilteredBy() counts are always accurate; only path storage is capped\n- Prevents unbounded memory growth on large monorepos\n\n## Breaking Changes\n\n### FilterOption.Reason() returns (FilterReason, bool)\n- Previously: Reason() FilterReason — panicked on FilterAll\n- Now: Reason() (FilterReason, bool) — returns (\"\", false) for FilterAll/unregistered\n- No panics in library code — correct Go pattern\n- All callers updated: filter.go, types_test.go, detection_test.go, bdd_test.go, bdd_extended_test.go\n\n## Trace-Aware Detection (detection.go)\n- getFilenameBasedReasonWithTrace() — returns (FilterReason, string)\n- getContentBasedReasonWithTrace() — returns (FilterReason, string)\n- detectReasonFSWithTrace() — returns (FilterResult, error)\n- allDetectorOptions() — returns all 11 detector options from table\n\n## Tests\n- TestFilterDetailed: disabled filter, SQLC detection with trace, non-generated file,\n  include pattern scope, exclude pattern, error propagation\n- TestFilterPathsDetailed: batch detailed results\n- TestFilterDetailedContext: cancelled context, active context\n- TestWithMetricsCap: cap limits stored paths, cap=0 unlimited\n- TestAllGeneratorOptions: 11 entries, no FilterAll\n- TestFilterOptionReasonFilterAllReturnsFalse, TestFilterOptionReasonUnregisteredReturnsFalse\n- TestFilterResultString: not filtered, filtered without trace, filtered with trace\n- ExampleFilter_FilterDetailed, ExampleFilter_FilterDetailed_notFiltered\n- ExampleAllGeneratorOptions, ExampleFilterOption_Reason, ExampleFilterOption_Reason_filterAll\n- All 175 BDD specs pass, 22 runnable examples pass, race detector clean, 0 lint issues\n\n## Documentation\n- CHANGELOG.md: [Unreleased] section with all new features and breaking change\n- AGENTS.md: updated Key Source Files, Design Decisions, Key API Patterns\n- FEATURES.md: 8 new feature entries for FilterResult, FilterDetailed, AllGeneratorOptions, etc.\n- docs/planning/: comprehensive execution plan with Pareto analysis and mermaid.js graph\n\n## Stats\n12 files changed, 758 insertions(+), 36 deletions(-)\n\nGenerated with Crush\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-05T00:15:38+02:00",
          "tree_id": "312c7a80d6dfaa171969d7105953f12127c1a43e",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/4a726d484c76c3707b6cb0f59f388f577e95296e"
        },
        "date": 1777933018586,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 147.4,
            "unit": "ns/op\t      96 B/op\t       0 allocs/op",
            "extra": "6821138 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 147.4,
            "unit": "ns/op",
            "extra": "6821138 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 96,
            "unit": "B/op",
            "extra": "6821138 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6821138 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.491,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "473177504 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.491,
            "unit": "ns/op",
            "extra": "473177504 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "473177504 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "473177504 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "45131378 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.1,
            "unit": "ns/op",
            "extra": "45131378 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "45131378 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "45131378 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 23.54,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "50504948 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 23.54,
            "unit": "ns/op",
            "extra": "50504948 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "50504948 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "50504948 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 16.03,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76687738 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 16.03,
            "unit": "ns/op",
            "extra": "76687738 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76687738 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76687738 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.166,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147471373 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.166,
            "unit": "ns/op",
            "extra": "147471373 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147471373 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147471373 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 84.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14138092 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 84.6,
            "unit": "ns/op",
            "extra": "14138092 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14138092 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14138092 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.35,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11893584 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.35,
            "unit": "ns/op",
            "extra": "11893584 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11893584 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11893584 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 143.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8497827 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 143.5,
            "unit": "ns/op",
            "extra": "8497827 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8497827 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8497827 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.95,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23241042 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.95,
            "unit": "ns/op",
            "extra": "23241042 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23241042 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23241042 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 151.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7941739 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 151.5,
            "unit": "ns/op",
            "extra": "7941739 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7941739 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7941739 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 731.8,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1639417 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 731.8,
            "unit": "ns/op",
            "extra": "1639417 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1639417 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1639417 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1378,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "829162 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1378,
            "unit": "ns/op",
            "extra": "829162 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "829162 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "829162 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1226,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "965806 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1226,
            "unit": "ns/op",
            "extra": "965806 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "965806 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "965806 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1048,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1048,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1572,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "811681 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1572,
            "unit": "ns/op",
            "extra": "811681 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "811681 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "811681 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.435,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348343746 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.435,
            "unit": "ns/op",
            "extra": "348343746 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348343746 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348343746 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.3748,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.3748,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 465.3,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2591310 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 465.3,
            "unit": "ns/op",
            "extra": "2591310 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2591310 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2591310 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 613.7,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1974817 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 613.7,
            "unit": "ns/op",
            "extra": "1974817 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1974817 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1974817 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.89,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "72490960 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.89,
            "unit": "ns/op",
            "extra": "72490960 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "72490960 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "72490960 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.96,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "78422770 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.96,
            "unit": "ns/op",
            "extra": "78422770 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "78422770 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "78422770 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.29,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.29,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "4a37f7c3dc9a56376a3b198969371c3f18011f07",
          "message": "fix: add /v3 suffix to module path for Go module convention compliance",
          "timestamp": "2026-05-05T02:06:02+02:00",
          "tree_id": "1847213d57ce16ac62abeb666996cea49d54216d",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/4a37f7c3dc9a56376a3b198969371c3f18011f07"
        },
        "date": 1777939641439,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 133.9,
            "unit": "ns/op\t      97 B/op\t       0 allocs/op",
            "extra": "8469009 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 133.9,
            "unit": "ns/op",
            "extra": "8469009 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 97,
            "unit": "B/op",
            "extra": "8469009 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8469009 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.467,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "484168893 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.467,
            "unit": "ns/op",
            "extra": "484168893 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "484168893 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "484168893 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 23.77,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "46996135 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 23.77,
            "unit": "ns/op",
            "extra": "46996135 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "46996135 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "46996135 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 14.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80982003 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 14.8,
            "unit": "ns/op",
            "extra": "80982003 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80982003 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80982003 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.84,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76881600 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.84,
            "unit": "ns/op",
            "extra": "76881600 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76881600 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76881600 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.202,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "167415324 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.202,
            "unit": "ns/op",
            "extra": "167415324 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "167415324 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "167415324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 81.83,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14789302 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 81.83,
            "unit": "ns/op",
            "extra": "14789302 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14789302 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14789302 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12347304 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.5,
            "unit": "ns/op",
            "extra": "12347304 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12347304 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12347304 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 144,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8392911 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 144,
            "unit": "ns/op",
            "extra": "8392911 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8392911 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8392911 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23619561 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.5,
            "unit": "ns/op",
            "extra": "23619561 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23619561 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23619561 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 156.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7657502 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 156.2,
            "unit": "ns/op",
            "extra": "7657502 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7657502 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7657502 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 724.4,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1647420 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 724.4,
            "unit": "ns/op",
            "extra": "1647420 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1647420 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1647420 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1399,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "788101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1399,
            "unit": "ns/op",
            "extra": "788101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "788101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "788101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1198,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "945286 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1198,
            "unit": "ns/op",
            "extra": "945286 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "945286 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "945286 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1024,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1024,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1536,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "815368 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1536,
            "unit": "ns/op",
            "extra": "815368 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "815368 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "815368 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "301104218 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.97,
            "unit": "ns/op",
            "extra": "301104218 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "301104218 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "301104218 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.3588,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.3588,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 432.5,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2754015 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 432.5,
            "unit": "ns/op",
            "extra": "2754015 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2754015 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2754015 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 563,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2105590 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 563,
            "unit": "ns/op",
            "extra": "2105590 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2105590 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2105590 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 15.66,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "69782224 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 15.66,
            "unit": "ns/op",
            "extra": "69782224 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "69782224 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "69782224 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 15.36,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "78837368 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 15.36,
            "unit": "ns/op",
            "extra": "78837368 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "78837368 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "78837368 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.73,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.73,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "17ace2effe150cf2302a0ba6346d0b235235b546",
          "message": "docs: add branching-flow context analysis feedback\n\nDetailed review of all 25 findings from `branching-flow context`\nagainst gogenfilter. Of 25 findings, only 4 were genuine (context\ncheck errors missing filePath). The remaining 21 were false positives\ncaused by five systemic tool limitations:\n\n1. Does not trace error wrapping through the call graph — flags bare\n   `err` propagation even when the callee already wraps all context\n2. Does not recognize branded/structured error constructors — flags\n   variables as lost when they're stored in typed error fields\n3. Suggests meaningless variable types (fs.FS, any, empty strings)\n4. Does not detect variables already used in fmt.Sprintf in the same\n   expression\n5. Does not recognize walk callback scoping (filePath vs root path)\n\nWritten for feedback to the branching-flow project to improve accuracy\nand reduce false positive rate.\n\n💘 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-05T20:05:18+02:00",
          "tree_id": "575d8b2880c716a2b7cac8203bc382303753e707",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/17ace2effe150cf2302a0ba6346d0b235235b546"
        },
        "date": 1778004390239,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 136.8,
            "unit": "ns/op\t      93 B/op\t       0 allocs/op",
            "extra": "8868596 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 136.8,
            "unit": "ns/op",
            "extra": "8868596 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 93,
            "unit": "B/op",
            "extra": "8868596 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8868596 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.495,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479936448 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.495,
            "unit": "ns/op",
            "extra": "479936448 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479936448 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479936448 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.91,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "49526307 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.91,
            "unit": "ns/op",
            "extra": "49526307 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "49526307 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "49526307 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 15.25,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79582837 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 15.25,
            "unit": "ns/op",
            "extra": "79582837 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79582837 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79582837 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 16.35,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "74223964 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 16.35,
            "unit": "ns/op",
            "extra": "74223964 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "74223964 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "74223964 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.142,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "146517682 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.142,
            "unit": "ns/op",
            "extra": "146517682 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "146517682 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "146517682 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 84.42,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14193427 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 84.42,
            "unit": "ns/op",
            "extra": "14193427 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14193427 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14193427 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.44,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12311370 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.44,
            "unit": "ns/op",
            "extra": "12311370 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12311370 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12311370 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 146,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8470081 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 146,
            "unit": "ns/op",
            "extra": "8470081 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8470081 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8470081 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.25,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22925323 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.25,
            "unit": "ns/op",
            "extra": "22925323 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22925323 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22925323 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 151.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7926696 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 151.2,
            "unit": "ns/op",
            "extra": "7926696 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7926696 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7926696 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 722.4,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1655742 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 722.4,
            "unit": "ns/op",
            "extra": "1655742 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1655742 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1655742 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1389,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "805411 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1389,
            "unit": "ns/op",
            "extra": "805411 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "805411 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "805411 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1224,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "993087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1224,
            "unit": "ns/op",
            "extra": "993087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "993087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "993087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1014,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1014,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1558,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "787682 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1558,
            "unit": "ns/op",
            "extra": "787682 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "787682 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "787682 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.467,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "338969918 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.467,
            "unit": "ns/op",
            "extra": "338969918 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "338969918 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "338969918 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6246,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6246,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 476,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2468006 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 476,
            "unit": "ns/op",
            "extra": "2468006 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2468006 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2468006 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 615.5,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1945074 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 615.5,
            "unit": "ns/op",
            "extra": "1945074 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1945074 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1945074 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.66,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "78594355 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.66,
            "unit": "ns/op",
            "extra": "78594355 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "78594355 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "78594355 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.98,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "79497105 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.98,
            "unit": "ns/op",
            "extra": "79497105 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "79497105 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "79497105 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.61,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.61,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "18dbb694b33f4081bd2bdb7af62941ec94c3639e",
          "message": "feat!: remove metrics system — stats aggregation is the caller's responsibility\n\nBREAKING CHANGE: Removes the entire metrics subsystem from the public API.\nThis reduces the exported surface by ~10 symbols and eliminates mutex\noverhead from the Filter() hot path.\n\nRemoved exports:\n- Filter.GetStats()\n- FilterStats type and all methods (TotalFiltered, FilteredBy, FilteredFiles, String)\n- Metrics type and all methods (NewMetrics, RecordChecked, RecordFiltered, GetStats)\n- MetricsMixin type\n- WithMetricsCap option\n- TotalFilesChecked phantom type\n\nRationale: Stats aggregation is the caller's job. FilterDetailed() and\nFilterPaths() already return per-call results with all the data callers\nneed (Filtered, Reason, Trace). Maintaining a metrics subsystem added\ncomplexity (mutex, deep-clone, cap system) for a feature with no evidence\nof user demand.\n\nChanges to filter.go:\n- Removed metrics/metricsCap fields from Filter struct\n- Removed GetStats(), recordChecked(), recordFiltered() methods\n- Removed WithMetricsCap option\n- Removed metrics init from NewFilter()\n- Removed stats= from Filter.String()\n- Simplified shouldFilterByPattern/shouldFilterDetailedByPattern (no recording)\n\nChanges to test files:\n- Removed metrics assertions from bdd_test.go, bdd_extended_test.go,\n  filter_test.go, filter_mapfs_test.go, filter_concurrent_test.go\n- Removed TestFilterWithMetrics, TestGetStatsDisabledFilter, TestWithMetricsCap\n- Removed TestNewFilter_EnabledMetricsInit from coverage_test.go\n- Removed ExampleFilter_GetStats from example_test.go\n- Removed assertFilterStats helper\n- Removed unused assertStringContainsAll helper\n\nChanges to phantom types:\n- Removed TotalFilesChecked type and test\n\nChanges to website:\n- Deleted guides/metrics.mdx\n- Removed Metrics from sidebar in astro.config.mjs\n- Updated quick-start.mdx (replaced metrics section with FilterDetailed)\n- Updated api/filter.mdx (removed context methods, GetStats; added FilterDetailed)\n- Updated api/types.mdx (removed FilterStats, Metrics, MetricsMixin, TotalFilesChecked)\n\nCoverage: 97.9% (from 98.2% — removed metrics-specific coverage inflation)\n\n💘 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-06T02:11:56+02:00",
          "tree_id": "d361e05533126394e8531bd0fdd4142ba91c7657",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/18dbb694b33f4081bd2bdb7af62941ec94c3639e"
        },
        "date": 1778028649536,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 35.86,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "33509013 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 35.86,
            "unit": "ns/op",
            "extra": "33509013 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "33509013 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "33509013 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.123,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "384795428 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.123,
            "unit": "ns/op",
            "extra": "384795428 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "384795428 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "384795428 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 25.47,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "47948826 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 25.47,
            "unit": "ns/op",
            "extra": "47948826 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "47948826 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "47948826 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.95,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "87491181 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.95,
            "unit": "ns/op",
            "extra": "87491181 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "87491181 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "87491181 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 16.17,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "75745214 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 16.17,
            "unit": "ns/op",
            "extra": "75745214 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "75745214 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "75745214 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.123,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147663506 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.123,
            "unit": "ns/op",
            "extra": "147663506 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147663506 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147663506 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14331106 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.67,
            "unit": "ns/op",
            "extra": "14331106 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14331106 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14331106 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 109.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11010850 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 109.5,
            "unit": "ns/op",
            "extra": "11010850 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11010850 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11010850 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8105944 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.3,
            "unit": "ns/op",
            "extra": "8105944 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8105944 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8105944 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 51.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23116800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 51.72,
            "unit": "ns/op",
            "extra": "23116800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23116800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23116800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 174.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6872564 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 174.6,
            "unit": "ns/op",
            "extra": "6872564 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6872564 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6872564 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 733.3,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1630410 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 733.3,
            "unit": "ns/op",
            "extra": "1630410 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1630410 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1630410 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1378,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "891625 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1378,
            "unit": "ns/op",
            "extra": "891625 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "891625 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "891625 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1212,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "996050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1212,
            "unit": "ns/op",
            "extra": "996050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "996050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "996050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 964.9,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1242164 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 964.9,
            "unit": "ns/op",
            "extra": "1242164 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1242164 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1242164 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1533,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "803079 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1533,
            "unit": "ns/op",
            "extra": "803079 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "803079 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "803079 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.457,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "343062465 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.457,
            "unit": "ns/op",
            "extra": "343062465 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "343062465 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "343062465 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6264,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6264,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 457.4,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2620780 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 457.4,
            "unit": "ns/op",
            "extra": "2620780 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2620780 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2620780 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 582.4,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2059647 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 582.4,
            "unit": "ns/op",
            "extra": "2059647 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2059647 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2059647 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.53,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80573695 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.53,
            "unit": "ns/op",
            "extra": "80573695 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80573695 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80573695 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.82,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "81225562 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.82,
            "unit": "ns/op",
            "extra": "81225562 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "81225562 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "81225562 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.59,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.59,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "fc182d36c76f2103a3888ad31a3ee48bc82915c8",
          "message": "feat!: rename Cause→Err, fix docs rot, migrate errors.As→AsType\n\nBreaking changes:\n- Error struct field `Cause` renamed to `Err` on all 3 error types\n  (ProjectRootError, FilterConfigError, SQLCConfigError). Follows\n  Go stdlib convention (os.PathError.Err, net.OpError.Err, url.Error.Err).\n  Unwrap() behavior unchanged.\n\nCode fixes:\n- bdd_test.go: errors.As → errors.AsType[*FilterConfigError]\n- filter_test.go: errors.As → errors.AsType[*FilterConfigError]\n  with additional code assertion for extracted error\n- All test files updated: Cause: → Err: in struct literals\n\nDocs fixes (all stale references from metrics removal):\n- FEATURES.md: removed metrics section (7 entries), WithMetricsCap,\n  TotalFilesChecked phantom type. Updated phantom count 5→4, error\n  codes 7→8, sentinel errors 7→8, examples count, coverage 98.9→97.9,\n  BDD spec count 175→164, added FilterContext/FilterPathsContext entries\n- AGENTS.md: corrected \"No errors.As calls remain\" claim (2 existed),\n  updated BDD spec count, coverage percentage, added Err field note,\n  documented metrics removal design decision\n- CHANGELOG.md: comprehensive [Unreleased] update with metrics removal,\n  Cause→Err rename, context error fix, Plausible removal, module path fix\n- website/changelog.mdx: rewritten to reflect current API, removed\n  references to ShouldFilter, GetStats, MustFilter, metrics\n- website/errors.mdx: Cause → Err in struct definitions\n- website/features.ts: \"Thread-Safe Metrics\" → \"Detailed Results\"\n\nRepo cleanup:\n- Removed .auto-deduplicate/ and .auto-deduplicate.lock from tracking\n- .gitignore: added /report/, /reports/, .auto-deduplicate/,\n  .auto-deduplicate.lock; cleaned up mixed text/pattern lines\n\nAll tests pass: go test -race (97.9% coverage), golangci-lint (0 issues)\n\n💘 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-06T03:33:43+02:00",
          "tree_id": "822fde7936171b20597f9a713a015dd2cf8e897b",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/fc182d36c76f2103a3888ad31a3ee48bc82915c8"
        },
        "date": 1778031304891,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 35.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "33665409 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 35.6,
            "unit": "ns/op",
            "extra": "33665409 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "33665409 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "33665409 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.241,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "381711594 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.241,
            "unit": "ns/op",
            "extra": "381711594 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "381711594 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "381711594 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 25.55,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "46102399 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 25.55,
            "unit": "ns/op",
            "extra": "46102399 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "46102399 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "46102399 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.76,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "81761023 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.76,
            "unit": "ns/op",
            "extra": "81761023 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "81761023 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "81761023 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.62,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76930419 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.62,
            "unit": "ns/op",
            "extra": "76930419 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76930419 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76930419 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.119,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147702037 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.119,
            "unit": "ns/op",
            "extra": "147702037 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147702037 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147702037 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 87.57,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14375354 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 87.57,
            "unit": "ns/op",
            "extra": "14375354 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14375354 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14375354 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 109.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "10998363 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 109.3,
            "unit": "ns/op",
            "extra": "10998363 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "10998363 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "10998363 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8023006 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.2,
            "unit": "ns/op",
            "extra": "8023006 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8023006 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8023006 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 51.75,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23094176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 51.75,
            "unit": "ns/op",
            "extra": "23094176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23094176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23094176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 174.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6877124 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 174.6,
            "unit": "ns/op",
            "extra": "6877124 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6877124 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6877124 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 743.8,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1566259 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 743.8,
            "unit": "ns/op",
            "extra": "1566259 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1566259 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1566259 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1410,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "809106 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1410,
            "unit": "ns/op",
            "extra": "809106 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "809106 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "809106 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1216,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1216,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 978.7,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1223144 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 978.7,
            "unit": "ns/op",
            "extra": "1223144 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1223144 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1223144 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1535,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "784849 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1535,
            "unit": "ns/op",
            "extra": "784849 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "784849 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "784849 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.437,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348602454 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.437,
            "unit": "ns/op",
            "extra": "348602454 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348602454 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348602454 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6245,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6245,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 466.5,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2559859 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 466.5,
            "unit": "ns/op",
            "extra": "2559859 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2559859 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2559859 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 590.3,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2032094 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 590.3,
            "unit": "ns/op",
            "extra": "2032094 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2032094 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2032094 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "83086335 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.72,
            "unit": "ns/op",
            "extra": "83086335 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "83086335 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "83086335 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.65,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "78430352 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.65,
            "unit": "ns/op",
            "extra": "78430352 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "78430352 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "78430352 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.78,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.78,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "bbb63dac2b610c429959822ae21c503b4024706c",
          "message": "refactor(tests): rename testProjectRootErrorWithCause → testProjectRootErrorWithErr\n\nFollow-up to Cause→Err rename. The test helper function name still\nreferenced the old field name. No functional change.\n\n💘 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-06T03:51:02+02:00",
          "tree_id": "bdfcebc25156fdb320eaace56ab265689b215bc9",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/bbb63dac2b610c429959822ae21c503b4024706c"
        },
        "date": 1778032341375,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 35.66,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "33484386 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 35.66,
            "unit": "ns/op",
            "extra": "33484386 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "33484386 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "33484386 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.119,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "384408667 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.119,
            "unit": "ns/op",
            "extra": "384408667 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "384408667 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "384408667 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 25.17,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "46201263 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 25.17,
            "unit": "ns/op",
            "extra": "46201263 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "46201263 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "46201263 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "81814141 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.8,
            "unit": "ns/op",
            "extra": "81814141 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "81814141 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "81814141 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.91,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76030353 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.91,
            "unit": "ns/op",
            "extra": "76030353 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76030353 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76030353 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.242,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "144646436 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.242,
            "unit": "ns/op",
            "extra": "144646436 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "144646436 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "144646436 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.46,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14376396 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.46,
            "unit": "ns/op",
            "extra": "14376396 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14376396 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14376396 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 110,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "10977177 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 110,
            "unit": "ns/op",
            "extra": "10977177 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "10977177 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "10977177 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 150.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8018458 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 150.1,
            "unit": "ns/op",
            "extra": "8018458 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8018458 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8018458 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.07,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22480798 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.07,
            "unit": "ns/op",
            "extra": "22480798 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22480798 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22480798 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 175.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6641697 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 175.8,
            "unit": "ns/op",
            "extra": "6641697 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6641697 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6641697 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 725.1,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1652431 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 725.1,
            "unit": "ns/op",
            "extra": "1652431 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1652431 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1652431 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1423,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "810543 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1423,
            "unit": "ns/op",
            "extra": "810543 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "810543 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "810543 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1253,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "951030 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1253,
            "unit": "ns/op",
            "extra": "951030 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "951030 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "951030 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1020,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1020,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1573,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "770462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1573,
            "unit": "ns/op",
            "extra": "770462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "770462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "770462 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.442,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348546092 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.442,
            "unit": "ns/op",
            "extra": "348546092 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348546092 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348546092 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6263,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6263,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 476,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2511820 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 476,
            "unit": "ns/op",
            "extra": "2511820 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2511820 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2511820 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 603,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "1985170 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 603,
            "unit": "ns/op",
            "extra": "1985170 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "1985170 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1985170 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 14.35,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "82890547 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 14.35,
            "unit": "ns/op",
            "extra": "82890547 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "82890547 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "82890547 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 14.68,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "78718870 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 14.68,
            "unit": "ns/op",
            "extra": "78718870 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "78718870 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "78718870 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp",
            "value": 10.42,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - ns/op",
            "value": 10.42,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkCodeHelp - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "3d4f7c46de0f9e3e8eae9c4d8749ddda047bd4d9",
          "message": "docs: update FEATURES.md and AGENTS.md — reflect simplified API\n\nFEATURES.md:\n- Remove context method entries (FilterContext, FilterDetailedContext, FilterPathsContext)\n- Remove phantom types entry (StartPath, ConfigPath, Operation, ErrorMessage)\n- Remove CodeHelp, AllErrorCodes, Helper, CodeEqual entries\n- Remove unexported detection helper entries (MatchesSQLCFilename, etc.)\n\nAGENTS.md:\n- Remove phantom.go from source file table\n- Update detection.go description (includes AllFilterOptions etc.)\n- Update errors.go description (includes ErrorCode, ErrorCoder)\n- Update types.go description (removed moved functions)\n- Fix errors.AsType migration claim (now fully done)\n- Remove FilterContext from Key API Patterns\n- Add design decisions for phantom removal, context removal, error simplification\n- Add execution plan document\n\nAlso removed stale reports/ and report/ directories.\n\n💀 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-08T01:41:32+02:00",
          "tree_id": "16c452548da22bc073c43e545af8b34b941601f1",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/3d4f7c46de0f9e3e8eae9c4d8749ddda047bd4d9"
        },
        "date": 1778197432827,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 33.18,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "36446521 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 33.18,
            "unit": "ns/op",
            "extra": "36446521 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "36446521 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "36446521 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.467,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "486248924 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.467,
            "unit": "ns/op",
            "extra": "486248924 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "486248924 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "486248924 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "50329810 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.3,
            "unit": "ns/op",
            "extra": "50329810 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "50329810 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "50329810 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 14.13,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "86097313 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 14.13,
            "unit": "ns/op",
            "extra": "86097313 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "86097313 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "86097313 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "77409745 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.5,
            "unit": "ns/op",
            "extra": "77409745 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "77409745 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "77409745 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 9.465,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "124921322 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 9.465,
            "unit": "ns/op",
            "extra": "124921322 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "124921322 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "124921322 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 85.34,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14196783 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 85.34,
            "unit": "ns/op",
            "extra": "14196783 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14196783 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14196783 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 107.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11421117 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 107.3,
            "unit": "ns/op",
            "extra": "11421117 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11421117 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11421117 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 152.9,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7757245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 152.9,
            "unit": "ns/op",
            "extra": "7757245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7757245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7757245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.57,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23743716 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.57,
            "unit": "ns/op",
            "extra": "23743716 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23743716 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23743716 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 176.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6849146 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 176.6,
            "unit": "ns/op",
            "extra": "6849146 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6849146 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6849146 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 668.8,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1798275 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 668.8,
            "unit": "ns/op",
            "extra": "1798275 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1798275 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1798275 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1319,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "904485 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1319,
            "unit": "ns/op",
            "extra": "904485 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "904485 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "904485 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1136,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1136,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 925.5,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1296278 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 925.5,
            "unit": "ns/op",
            "extra": "1296278 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1296278 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1296278 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1478,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "811892 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1478,
            "unit": "ns/op",
            "extra": "811892 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "811892 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "811892 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.95,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "299125354 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.95,
            "unit": "ns/op",
            "extra": "299125354 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "299125354 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "299125354 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.7067,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.7067,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 389.9,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "3089744 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 389.9,
            "unit": "ns/op",
            "extra": "3089744 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "3089744 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3089744 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 452.2,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2661218 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 452.2,
            "unit": "ns/op",
            "extra": "2661218 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2661218 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2661218 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 10.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 10.24,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 10.61,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 10.61,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "caf655694bce5fa3ba31c2400d367a11b25ff91f",
          "message": "chore: apply automated formatting fixes across codebase\n\nFormatting changes applied via gofmt/linter across multiple files:\n\n- AGENTS.md: Fixed table column alignment (added trailing spaces to match\n  pipe-and-space pattern) in detection.go and types.go description columns\n- bdd_extended_test.go: Removed extraneous blank line between closing\n  braces in Describe block (line 192)\n- docs/planning: Fixed markdown table number column alignment (# → ## spaces),\n  added blank lines before list items per markdown style convention\n- errors_sentinel_test.go: Removed trailing blank lines between test function\n  closing braces (lines 36, 75, 158)\n- errors_test.go: Applied Go idiomatic concise parameter naming convention\n  (`configPath string, msg string` → `configPath, msg string` in two helper\n  functions)\n- filter_test.go: Removed trailing blank lines at end of file\n- sqlc.go: Fixed indentation inconsistency — return statement in\n  unmarshalSQLCYAML was indented with spaces instead of Go-standard tab\n\nAll changes are purely cosmetic/whitespace. No functional code changed.\nTests pass. Linter-compliant.\n\n💘 Generated with Crush\n\nAssisted-by: MiniMax-M2.7-highspeed via Crush <crush@charm.land>",
          "timestamp": "2026-05-08T03:44:41+02:00",
          "tree_id": "cd32134bc4b95992a3924aba425bb1089ef1aa77",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/caf655694bce5fa3ba31c2400d367a11b25ff91f"
        },
        "date": 1778204748172,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 34.41,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "34520041 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 34.41,
            "unit": "ns/op",
            "extra": "34520041 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "34520041 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "34520041 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "480734193 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.5,
            "unit": "ns/op",
            "extra": "480734193 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "480734193 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "480734193 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 25.41,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "48692707 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 25.41,
            "unit": "ns/op",
            "extra": "48692707 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "48692707 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "48692707 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.89,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "83710962 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.89,
            "unit": "ns/op",
            "extra": "83710962 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "83710962 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "83710962 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.61,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76903687 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.61,
            "unit": "ns/op",
            "extra": "76903687 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76903687 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76903687 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.23,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "144915453 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.23,
            "unit": "ns/op",
            "extra": "144915453 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "144915453 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "144915453 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.52,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14383582 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.52,
            "unit": "ns/op",
            "extra": "14383582 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14383582 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14383582 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 109.4,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "10977110 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 109.4,
            "unit": "ns/op",
            "extra": "10977110 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "10977110 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "10977110 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8019052 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.2,
            "unit": "ns/op",
            "extra": "8019052 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8019052 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8019052 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 51.74,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23158434 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 51.74,
            "unit": "ns/op",
            "extra": "23158434 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23158434 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23158434 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 176.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6648208 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 176.5,
            "unit": "ns/op",
            "extra": "6648208 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6648208 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6648208 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 731.2,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1707326 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 731.2,
            "unit": "ns/op",
            "extra": "1707326 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1707326 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1707326 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1390,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "894494 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1390,
            "unit": "ns/op",
            "extra": "894494 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "894494 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "894494 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1196,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1196,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 966,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1246537 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 966,
            "unit": "ns/op",
            "extra": "1246537 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1246537 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1246537 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1490,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "784010 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1490,
            "unit": "ns/op",
            "extra": "784010 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "784010 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "784010 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.451,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348496479 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.451,
            "unit": "ns/op",
            "extra": "348496479 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348496479 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348496479 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6251,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6251,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 453.2,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2634764 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 453.2,
            "unit": "ns/op",
            "extra": "2634764 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2634764 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2634764 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 496.2,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2459565 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 496.2,
            "unit": "ns/op",
            "extra": "2459565 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2459565 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2459565 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 10.62,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 10.62,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "682b8bf9e486c495bbdea7de01cfc7e515a6a29e",
          "message": "refactor: improve Filter.String() debug output\n\nUse strings.Join(patterns, \",\") instead of %v for pattern lists.\nBefore: includes=[pkg/** internal/*.go] (Go slice format)\nAfter:  includes=[pkg/**,internal/*.go] (comma-separated)\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-08T05:12:41+02:00",
          "tree_id": "2110cac2d591efbd19d6a9f4b3e85b543f65158d",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/682b8bf9e486c495bbdea7de01cfc7e515a6a29e"
        },
        "date": 1778210056985,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 33.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "35812831 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 33.87,
            "unit": "ns/op",
            "extra": "35812831 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "35812831 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "35812831 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.535,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "448040473 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.535,
            "unit": "ns/op",
            "extra": "448040473 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "448040473 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "448040473 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 24.77,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "48825128 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 24.77,
            "unit": "ns/op",
            "extra": "48825128 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "48825128 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "48825128 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.82,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "87416929 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.82,
            "unit": "ns/op",
            "extra": "87416929 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "87416929 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "87416929 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.86,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "76821180 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.86,
            "unit": "ns/op",
            "extra": "76821180 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "76821180 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "76821180 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.262,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147604356 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.262,
            "unit": "ns/op",
            "extra": "147604356 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147604356 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147604356 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 84.23,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14350676 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 84.23,
            "unit": "ns/op",
            "extra": "14350676 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14350676 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14350676 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 109.7,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "10933932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 109.7,
            "unit": "ns/op",
            "extra": "10933932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "10933932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "10933932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8015036 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.3,
            "unit": "ns/op",
            "extra": "8015036 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8015036 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8015036 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 51.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22710345 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 51.67,
            "unit": "ns/op",
            "extra": "22710345 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22710345 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22710345 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 175.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6805014 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 175.1,
            "unit": "ns/op",
            "extra": "6805014 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6805014 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6805014 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 716.4,
            "unit": "ns/op\t     632 B/op\t       4 allocs/op",
            "extra": "1683177 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 716.4,
            "unit": "ns/op",
            "extra": "1683177 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 632,
            "unit": "B/op",
            "extra": "1683177 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 4,
            "unit": "allocs/op",
            "extra": "1683177 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1386,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "851847 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1386,
            "unit": "ns/op",
            "extra": "851847 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "851847 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "851847 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1211,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "979933 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1211,
            "unit": "ns/op",
            "extra": "979933 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "979933 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "979933 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 987.1,
            "unit": "ns/op\t    1288 B/op\t       8 allocs/op",
            "extra": "1217101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 987.1,
            "unit": "ns/op",
            "extra": "1217101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1288,
            "unit": "B/op",
            "extra": "1217101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "1217101 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1518,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "786978 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1518,
            "unit": "ns/op",
            "extra": "786978 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "786978 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "786978 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.433,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "349195185 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.433,
            "unit": "ns/op",
            "extra": "349195185 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "349195185 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "349195185 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.6246,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.6246,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 458.9,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2623639 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 458.9,
            "unit": "ns/op",
            "extra": "2623639 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2623639 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2623639 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 500.1,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2403658 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 500.1,
            "unit": "ns/op",
            "extra": "2403658 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2403658 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2403658 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 10.62,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 10.62,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.05,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "108032517 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.05,
            "unit": "ns/op",
            "extra": "108032517 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "108032517 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "108032517 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "8c76b42ee808ccf145643916613814082fc89672",
          "message": "docs: update AGENTS.md — reflect trace unification, coverage_test.go dissolution, 99.8% coverage\n\n💘 Generated with Crush\n\nAssisted-by: GLM-5.1 via Crush <crush@charm.land>",
          "timestamp": "2026-05-08T05:43:49+02:00",
          "tree_id": "fe9ddbde464483511ceb405e03afd2b395cb8858",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/8c76b42ee808ccf145643916613814082fc89672"
        },
        "date": 1778211923685,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 214.9,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5539815 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 214.9,
            "unit": "ns/op",
            "extra": "5539815 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5539815 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5539815 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.12,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "382963116 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.12,
            "unit": "ns/op",
            "extra": "382963116 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "382963116 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "382963116 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 200.8,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5874078 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 200.8,
            "unit": "ns/op",
            "extra": "5874078 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5874078 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5874078 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 14.03,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "86867124 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 14.03,
            "unit": "ns/op",
            "extra": "86867124 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "86867124 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "86867124 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "75672678 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.64,
            "unit": "ns/op",
            "extra": "75672678 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "75672678 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "75672678 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.114,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147821766 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.114,
            "unit": "ns/op",
            "extra": "147821766 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147821766 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147821766 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.65,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14382514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.65,
            "unit": "ns/op",
            "extra": "14382514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14382514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14382514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 113.4,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11009337 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 113.4,
            "unit": "ns/op",
            "extra": "11009337 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11009337 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11009337 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 151.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7937744 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 151.1,
            "unit": "ns/op",
            "extra": "7937744 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7937744 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7937744 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 51.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23338695 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 51.67,
            "unit": "ns/op",
            "extra": "23338695 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23338695 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23338695 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 174.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6871495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 174.8,
            "unit": "ns/op",
            "extra": "6871495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6871495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6871495 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 906.1,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1324041 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 906.1,
            "unit": "ns/op",
            "extra": "1324041 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1324041 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1324041 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1669,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "768072 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1669,
            "unit": "ns/op",
            "extra": "768072 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "768072 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "768072 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1233,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "985443 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1233,
            "unit": "ns/op",
            "extra": "985443 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "985443 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "985443 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1190,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "932469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1190,
            "unit": "ns/op",
            "extra": "932469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "932469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "932469 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1513,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "811615 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1513,
            "unit": "ns/op",
            "extra": "811615 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "811615 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "811615 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.434,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348998856 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.434,
            "unit": "ns/op",
            "extra": "348998856 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348998856 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348998856 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 0.3961,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 0.3961,
            "unit": "ns/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "1000000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 436.4,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2728814 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 436.4,
            "unit": "ns/op",
            "extra": "2728814 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2728814 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2728814 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 491.7,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2431947 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 491.7,
            "unit": "ns/op",
            "extra": "2431947 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2431947 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2431947 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 10.92,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 10.92,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 10.92,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 10.92,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "a19f2dbad86bc98344702b10fbf832b090ee6176",
          "message": "docs(project): add domain language documentation and Go module files\n\n- Add DOMAIN_LANGUAGE.md documentation for project specification\n- Initialize Go module files (o.mod and o.sum)\n- Set up project structure for Go development",
          "timestamp": "2026-05-18T16:58:26+02:00",
          "tree_id": "355a876a0aa64fa1c9b8118b418c2c2b0a1b6843",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/a19f2dbad86bc98344702b10fbf832b090ee6176"
        },
        "date": 1779116865204,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 197.4,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6051442 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 197.4,
            "unit": "ns/op",
            "extra": "6051442 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6051442 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6051442 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.888,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "411167946 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.888,
            "unit": "ns/op",
            "extra": "411167946 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "411167946 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "411167946 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 203.6,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6166273 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 203.6,
            "unit": "ns/op",
            "extra": "6166273 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6166273 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6166273 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92746554 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.67,
            "unit": "ns/op",
            "extra": "92746554 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92746554 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92746554 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80133710 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.1,
            "unit": "ns/op",
            "extra": "80133710 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80133710 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80133710 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.387,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "167054750 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.387,
            "unit": "ns/op",
            "extra": "167054750 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "167054750 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "167054750 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 81.33,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14836150 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 81.33,
            "unit": "ns/op",
            "extra": "14836150 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14836150 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14836150 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 98.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12269812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 98.1,
            "unit": "ns/op",
            "extra": "12269812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12269812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12269812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 153.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7858000 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 153.6,
            "unit": "ns/op",
            "extra": "7858000 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7858000 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7858000 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.31,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "24097549 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.31,
            "unit": "ns/op",
            "extra": "24097549 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "24097549 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "24097549 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 158,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6938457 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 158,
            "unit": "ns/op",
            "extra": "6938457 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6938457 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6938457 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 875.8,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1367288 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 875.8,
            "unit": "ns/op",
            "extra": "1367288 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1367288 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1367288 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1555,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "766365 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1555,
            "unit": "ns/op",
            "extra": "766365 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "766365 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "766365 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1134,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1134,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1155,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1155,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1413,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "844050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1413,
            "unit": "ns/op",
            "extra": "844050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "844050 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "844050 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.231,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "283498341 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.231,
            "unit": "ns/op",
            "extra": "283498341 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "283498341 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "283498341 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.901,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "411775017 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.901,
            "unit": "ns/op",
            "extra": "411775017 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "411775017 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "411775017 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 399.2,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "3002828 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 399.2,
            "unit": "ns/op",
            "extra": "3002828 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "3002828 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3002828 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 476.6,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2496778 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 476.6,
            "unit": "ns/op",
            "extra": "2496778 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2496778 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2496778 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.62,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.62,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99289418 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.64,
            "unit": "ns/op",
            "extra": "99289418 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99289418 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99289418 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "bd06e40661f47d6f453379ff5e810229d14fa0e1",
          "message": "refactor(tests): centralize test string literals into named constants\n\nExtract hardcoded string literals used across test files into a new const\nblock in helpers_test.go to improve maintainability and reduce magic\nstrings throughout the test suite.\n\nChanges:\n- Added const block in helpers_test.go with test-specific string constants:\n  - File paths: mainGo, dbModelsGo, apiGo, serviceMockGo, statusEnumGo,\n    pageTemplGo, userPbGo, fileGo, wildcardGo, questionGo, aGo\n  - Test markers: testMarkerGoMod (\"go.mod\"), testFileSQLCConfig (\"sqlc.yaml\")\n  - Test paths: testPath (\"/path\"), testSomePath (\"/some/path\")\n  - Test content: sqlcGeneratedContentTest, myToolGenContentTest,\n    moqGeneratedContentTest, goEnumContentTest, packageMainFunc\n  - Other: nodeModulesDir (\"node_modules\")\n\n- Updated errors_test.go: replaced \"/some/path\" → testSomePath,\n  \"go.mod\" → testMarkerGoMod, \"go.sum\" kept as-is (not in const block)\n\n- Updated errors_bench_test.go: replaced \"go.mod\" → testMarkerGoMod\n\n- Updated errors_unwrap_test.go: replaced \"go.mod\" → testMarkerGoMod\n\n- Updated filter_concurrent_test.go: replaced file path strings with\n  constants (dbModelsGo, mainGo, apiGo) and content strings\n\n- Updated filter_mapfs_test.go: replaced file path strings with\n  constants (dbModelsGo, mainGo, testFileSQLCConfig) and inline content\n\n- Updated project_test.go: replaced \"go.mod\" → testMarkerGoMod\n\nThis refactoring eliminates duplication and makes test file paths and\ncontent values consistent across all test files. Future changes to these\ntest values need only update the constants in one place.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-05-19T19:06:41+02:00",
          "tree_id": "a05cdd2b302d05c82de59adeb1437da4b05b1e54",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/bd06e40661f47d6f453379ff5e810229d14fa0e1"
        },
        "date": 1779210456832,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 227.4,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5239012 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 227.4,
            "unit": "ns/op",
            "extra": "5239012 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5239012 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5239012 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.846,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "411187428 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.846,
            "unit": "ns/op",
            "extra": "411187428 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "411187428 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "411187428 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 214.5,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5567908 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 214.5,
            "unit": "ns/op",
            "extra": "5567908 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5567908 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5567908 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.04,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92737580 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.04,
            "unit": "ns/op",
            "extra": "92737580 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92737580 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92737580 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.01,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "83795623 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.01,
            "unit": "ns/op",
            "extra": "83795623 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "83795623 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "83795623 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.157,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147663166 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.157,
            "unit": "ns/op",
            "extra": "147663166 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147663166 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147663166 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.37,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14440602 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.37,
            "unit": "ns/op",
            "extra": "14440602 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14440602 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14440602 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 96.09,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11706291 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 96.09,
            "unit": "ns/op",
            "extra": "11706291 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11706291 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11706291 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8064064 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.6,
            "unit": "ns/op",
            "extra": "8064064 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8064064 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8064064 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 53.18,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22387134 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 53.18,
            "unit": "ns/op",
            "extra": "22387134 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22387134 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22387134 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 149.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7983841 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 149.3,
            "unit": "ns/op",
            "extra": "7983841 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7983841 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7983841 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 944.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1270774 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 944.4,
            "unit": "ns/op",
            "extra": "1270774 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1270774 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1270774 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1627,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "759748 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1627,
            "unit": "ns/op",
            "extra": "759748 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "759748 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "759748 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1222,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "975980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1222,
            "unit": "ns/op",
            "extra": "975980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "975980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "975980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1207,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1207,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1530,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "774884 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1530,
            "unit": "ns/op",
            "extra": "774884 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "774884 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "774884 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.753,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "320363652 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.753,
            "unit": "ns/op",
            "extra": "320363652 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "320363652 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "320363652 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.508,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "475817260 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.508,
            "unit": "ns/op",
            "extra": "475817260 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "475817260 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "475817260 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 453.4,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2635369 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 453.4,
            "unit": "ns/op",
            "extra": "2635369 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2635369 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2635369 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 519,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2308772 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 519,
            "unit": "ns/op",
            "extra": "2308772 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2308772 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2308772 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 12.45,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "97918648 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 12.45,
            "unit": "ns/op",
            "extra": "97918648 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "97918648 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "97918648 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 12.18,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "95939733 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 12.18,
            "unit": "ns/op",
            "extra": "95939733 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "95939733 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "95939733 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "2a0e0ec3dfdadfadc152a027bd98db4e7d151bd5",
          "message": "refactor(tests): centralize test string literals into named constants\n\nCentralizes all hardcoded test string literals across 11 test files into a\nnew shared testhelpers/constants.go package. This eliminates duplication,\nimproves maintainability, and ensures consistent naming conventions across\nthe entire test suite.\n\nChanges:\n- Added new testhelpers/constants.go package with typed constants for:\n  - File path constants: DbModelsGo, MainGo, FileGo, SqlcConfigFile\n  - Content constants: SQLCGeneratedContentTest, MyToolGenContentTest,\n    MoqGeneratedContentTest, GoEnumContentTest\n  - Operation constants: ParseOp, TestMarkerGoMod\n- Refactored all test files to import and use testhelpers package:\n  - bdd_extended_test.go: replaced \"parse\" with testhelpers.ParseOp,\n    \"db/models.go\" with testhelpers.DbModelsGo, string literals with\n    testhelpers.SQLCGeneratedContentTest\n  - bdd_test.go: replaced string literals with testhelpers constants\n  - bench_test.go: replaced \"db/models.go\" with dbModelsGo constant,\n    \"main.go\" with mainGo constant, content strings with test constants\n  - detection_test.go: replaced path and content string literals\n  - filter_edge_test.go: replaced content string literals\n  - filter_mapfs_test.go: replaced \"sqlc.yaml\" with testFileSQLCConfig\n  - filter_test.go: replaced \"main.go\" with mainGo constant\n  - fuzz_test.go: replaced seed data with constants\n  - pattern_test.go: replaced file paths with typed constants\n  - testdata_test.go: replaced \"db/models.go\" and \"main.go\" constants\n- Refactored sqlc.go to use named constants for config file detection:\n  - sqlcConfigFile = \"sqlc.yaml\"\n  - sqlcConfigFileAlt = \"sqlc.yml\"\n\nMotivation: Having magic strings scattered across 11 test files creates\ncoordination overhead when changing naming conventions and increases\nrisk of typos. Centralizing these into a single package with clear\nnaming conventions improves discoverability and reduces duplication from\n~50+ occurrences to 11 imports.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-05-19T19:45:04+02:00",
          "tree_id": "dccefeb10dedfebbacb4503d86c625b6a4cacde1",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/2a0e0ec3dfdadfadc152a027bd98db4e7d151bd5"
        },
        "date": 1779212755659,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 195.9,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6053175 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 195.9,
            "unit": "ns/op",
            "extra": "6053175 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6053175 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6053175 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.821,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "425845966 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.821,
            "unit": "ns/op",
            "extra": "425845966 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "425845966 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "425845966 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 186.4,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6348603 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 186.4,
            "unit": "ns/op",
            "extra": "6348603 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6348603 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6348603 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.67,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92247823 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.67,
            "unit": "ns/op",
            "extra": "92247823 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92247823 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92247823 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.12,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80495648 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.12,
            "unit": "ns/op",
            "extra": "80495648 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80495648 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80495648 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.327,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "162083914 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.327,
            "unit": "ns/op",
            "extra": "162083914 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "162083914 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "162083914 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 80.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14822952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 80.6,
            "unit": "ns/op",
            "extra": "14822952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14822952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14822952 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 98.02,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12311386 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 98.02,
            "unit": "ns/op",
            "extra": "12311386 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12311386 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12311386 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 153.9,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7788531 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 153.9,
            "unit": "ns/op",
            "extra": "7788531 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7788531 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7788531 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 49.94,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "24078465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 49.94,
            "unit": "ns/op",
            "extra": "24078465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "24078465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "24078465 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 155.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7709977 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 155.3,
            "unit": "ns/op",
            "extra": "7709977 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7709977 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7709977 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 847.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1414462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 847.4,
            "unit": "ns/op",
            "extra": "1414462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1414462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1414462 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1544,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "786334 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1544,
            "unit": "ns/op",
            "extra": "786334 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "786334 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "786334 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1131,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "957339 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1131,
            "unit": "ns/op",
            "extra": "957339 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "957339 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "957339 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1122,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1069087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1122,
            "unit": "ns/op",
            "extra": "1069087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1069087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1069087 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1412,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "822624 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1412,
            "unit": "ns/op",
            "extra": "822624 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "822624 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "822624 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.234,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "282736808 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.234,
            "unit": "ns/op",
            "extra": "282736808 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "282736808 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "282736808 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.933,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "410933217 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.933,
            "unit": "ns/op",
            "extra": "410933217 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "410933217 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "410933217 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 401.1,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2970594 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 401.1,
            "unit": "ns/op",
            "extra": "2970594 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2970594 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2970594 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 475.8,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2507996 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 475.8,
            "unit": "ns/op",
            "extra": "2507996 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2507996 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2507996 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.6,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.63,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.63,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "6efc83675ae8441c6342392f1efedc9f232d3215",
          "message": "refactor(detection, tests): DRY up FilterResult construction and improve test helper generics\n\nDetection layer:\n- Extract `filteredResult()` and `notFilteredResult()` helper functions to\n  eliminate repetition in `detectReasonFSWithTrace()`. Previously each\n  early-return site manually constructed `FilterResult{...}` structs;\n  the helpers centralize the two output shapes and reduce the chance of\n  inconsistency as the type evolves.\n\nTest helpers:\n- Convert `assertAllValid[T]` from a function-typed `isValid func(T) bool`\n  parameter to a `validatable` interface constraint. This aligns with the\n  existing `IsValid()` method on `FilterOption` and `FilterReason`, removes\n  the need to pass a closure at every call-site, and makes the type\n  parameter bound explicit.\n\nBDD test formatting:\n- Reformat four `ginkgo.DescribeTable(...)` call sites in `bdd_test.go` and\n  `bdd_extended_test.go` to place the function name on its own line before\n  the opening parenthesis. This matches the project's established multi-line\n  call style and improves readability of the table entries that follow.\n\nFiles changed:\n- detection.go:         +10 lines (two helpers, refactored detectReasonFSWithTrace)\n- types_test.go:       -11 lines (generics cleanup, 3 call-sites simplified)\n- bdd_test.go:         ~4 lines (formatting only)\n- bdd_extended_test.go:~4 lines (formatting only)\n\nNo functional changes; all existing tests pass.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-05-21T18:50:29+02:00",
          "tree_id": "96f52ffab79e4e2f7f20255e2f46e69166d90003",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/6efc83675ae8441c6342392f1efedc9f232d3215"
        },
        "date": 1779382285660,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 244.3,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "4841850 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 244.3,
            "unit": "ns/op",
            "extra": "4841850 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "4841850 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "4841850 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.433,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "348786897 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.433,
            "unit": "ns/op",
            "extra": "348786897 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "348786897 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "348786897 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 217.6,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5441362 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 217.6,
            "unit": "ns/op",
            "extra": "5441362 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5441362 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5441362 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.05,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "90133519 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.05,
            "unit": "ns/op",
            "extra": "90133519 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "90133519 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "90133519 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.01,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "84110532 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.01,
            "unit": "ns/op",
            "extra": "84110532 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "84110532 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "84110532 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.98,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "132523088 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.98,
            "unit": "ns/op",
            "extra": "132523088 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "132523088 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "132523088 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.84,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14476726 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.84,
            "unit": "ns/op",
            "extra": "14476726 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14476726 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14476726 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.07,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12241987 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.07,
            "unit": "ns/op",
            "extra": "12241987 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12241987 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12241987 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 150.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8005905 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 150.6,
            "unit": "ns/op",
            "extra": "8005905 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8005905 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8005905 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 53.38,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22381245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 53.38,
            "unit": "ns/op",
            "extra": "22381245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22381245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22381245 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 149.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7999968 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 149.8,
            "unit": "ns/op",
            "extra": "7999968 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7999968 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7999968 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 945.5,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1269148 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 945.5,
            "unit": "ns/op",
            "extra": "1269148 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1269148 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1269148 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1659,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "718021 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1659,
            "unit": "ns/op",
            "extra": "718021 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "718021 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "718021 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1233,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "965882 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1233,
            "unit": "ns/op",
            "extra": "965882 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "965882 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "965882 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1222,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "937869 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1222,
            "unit": "ns/op",
            "extra": "937869 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "937869 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "937869 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1526,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "765220 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1526,
            "unit": "ns/op",
            "extra": "765220 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "765220 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "765220 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.75,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "319876209 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.75,
            "unit": "ns/op",
            "extra": "319876209 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "319876209 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "319876209 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.527,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "473840402 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.527,
            "unit": "ns/op",
            "extra": "473840402 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "473840402 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "473840402 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 456.1,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2619310 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 456.1,
            "unit": "ns/op",
            "extra": "2619310 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2619310 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2619310 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 518,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2322610 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 518,
            "unit": "ns/op",
            "extra": "2322610 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2322610 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2322610 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99152517 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.87,
            "unit": "ns/op",
            "extra": "99152517 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99152517 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99152517 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "98440496 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.87,
            "unit": "ns/op",
            "extra": "98440496 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "98440496 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "98440496 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "f1331ee39ea819fe541f30bf62a45eb8123b406c",
          "message": "test: add missing test files\n\n- Add elpers_test.go and ypes_test.go to test coverage\n- Ensure proper testing for previously untested components\n- Improve code quality and maintainability\n- Add test cases for core functionality",
          "timestamp": "2026-05-22T00:48:14+02:00",
          "tree_id": "c7f7d7021275406e146a2ddec80aa62625c05d1a",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/f1331ee39ea819fe541f30bf62a45eb8123b406c"
        },
        "date": 1779403868958,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 207.2,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5445267 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 207.2,
            "unit": "ns/op",
            "extra": "5445267 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5445267 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5445267 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.188,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "371614515 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.188,
            "unit": "ns/op",
            "extra": "371614515 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "371614515 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "371614515 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 188.4,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6416676 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 188.4,
            "unit": "ns/op",
            "extra": "6416676 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6416676 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6416676 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.14,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "88196169 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.14,
            "unit": "ns/op",
            "extra": "88196169 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "88196169 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "88196169 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 15.12,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "80706162 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 15.12,
            "unit": "ns/op",
            "extra": "80706162 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "80706162 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "80706162 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.669,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "154400986 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.669,
            "unit": "ns/op",
            "extra": "154400986 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "154400986 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "154400986 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 82.21,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14503866 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 82.21,
            "unit": "ns/op",
            "extra": "14503866 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14503866 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14503866 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.08,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12398178 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.08,
            "unit": "ns/op",
            "extra": "12398178 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12398178 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12398178 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 153.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7864658 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 153.8,
            "unit": "ns/op",
            "extra": "7864658 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7864658 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7864658 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.09,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23657320 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.09,
            "unit": "ns/op",
            "extra": "23657320 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23657320 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23657320 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 156.1,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7454872 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 156.1,
            "unit": "ns/op",
            "extra": "7454872 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7454872 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7454872 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 851.3,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1406827 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 851.3,
            "unit": "ns/op",
            "extra": "1406827 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1406827 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1406827 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1527,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "782067 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1527,
            "unit": "ns/op",
            "extra": "782067 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "782067 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "782067 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1129,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1129,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1124,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1124,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1416,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "863047 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1416,
            "unit": "ns/op",
            "extra": "863047 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "863047 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "863047 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.228,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "283499270 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.228,
            "unit": "ns/op",
            "extra": "283499270 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "283499270 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "283499270 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.933,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "410162602 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.933,
            "unit": "ns/op",
            "extra": "410162602 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "410162602 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "410162602 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 402.4,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2964447 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 402.4,
            "unit": "ns/op",
            "extra": "2964447 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2964447 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2964447 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 473,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2521669 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 473,
            "unit": "ns/op",
            "extra": "2521669 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2521669 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2521669 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.65,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.65,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.38,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.38,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "530f820b2ce93b505e7e7081390cf4e1c4187a5b",
          "message": "docs(architecture): add comprehensive architecture review with current state analysis\n\nAdds an in-depth architecture review document (284 lines) covering:\n- Executive summary: A- grade, production-ready, single-package design\n- Current package structure: 7 source files, 1632 lines of code\n- Dependency graph analysis: filter.go → detection.go → types.go coupling chain\n- Coupling strength matrix: errors.go/pattern.go/project.go as zero-coupled leaves\n- Strengths: table-driven detector system, two-phase detection, functional options API\n- Areas for improvement: SQLC module obesity, no extension mechanism, detection\n  function signature inconsistency, types↔detection circular awareness\n- Scalability assessment: adding new generators takes ~30 minutes, linear scan\n  is negligible up to 50+ detectors\n- Service orientation: fs.FS abstraction, functional options, two API levels\n- Modularization verdict: do NOT modularize — 3 high + 2 medium signals\n\nKey architectural insights documented:\n- The detectors[] table is the \"architectural crown jewel\" — one line per generator\n- Two-phase detection (filename match → early return) is a genuine optimization\n- Functional options API is idiomatic Go with immutable Filter post-construction\n- fs.FS abstraction enables testing with fstest.MapFS without touching real FS\n- Error system: 3 types, 8 codes, 7 sentinels with branded [gogenfilter:<code>] prefix\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-05-25T22:04:45+02:00",
          "tree_id": "a7cbd400c8d4d4d64cbac9930650365a70d62ce7",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/530f820b2ce93b505e7e7081390cf4e1c4187a5b"
        },
        "date": 1779739544323,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 161.6,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "7236436 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 161.6,
            "unit": "ns/op",
            "extra": "7236436 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "7236436 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "7236436 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.462,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "486267954 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.462,
            "unit": "ns/op",
            "extra": "486267954 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "486267954 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "486267954 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 145.5,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "8055676 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 145.5,
            "unit": "ns/op",
            "extra": "8055676 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "8055676 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "8055676 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 10.56,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 10.56,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 11.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "91324249 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 11.72,
            "unit": "ns/op",
            "extra": "91324249 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "91324249 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "91324249 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 5.629,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "218163170 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 5.629,
            "unit": "ns/op",
            "extra": "218163170 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "218163170 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "218163170 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 62.75,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "19232086 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 62.75,
            "unit": "ns/op",
            "extra": "19232086 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "19232086 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "19232086 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 75.25,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "15953409 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 75.25,
            "unit": "ns/op",
            "extra": "15953409 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "15953409 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "15953409 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 118.7,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "10193672 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 118.7,
            "unit": "ns/op",
            "extra": "10193672 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "10193672 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "10193672 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 38.83,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "31093812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 38.83,
            "unit": "ns/op",
            "extra": "31093812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "31093812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "31093812 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 120.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "9940390 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 120.3,
            "unit": "ns/op",
            "extra": "9940390 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "9940390 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "9940390 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 663.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1804752 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 663.4,
            "unit": "ns/op",
            "extra": "1804752 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1804752 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1804752 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1185,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "875310 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1185,
            "unit": "ns/op",
            "extra": "875310 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "875310 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "875310 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 873.1,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1373511 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 873.1,
            "unit": "ns/op",
            "extra": "1373511 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1373511 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1373511 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 864.8,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1387900 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 864.8,
            "unit": "ns/op",
            "extra": "1387900 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1387900 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1387900 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1095,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1095,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.277,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "365933137 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.277,
            "unit": "ns/op",
            "extra": "365933137 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "365933137 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "365933137 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.277,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "525301006 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.277,
            "unit": "ns/op",
            "extra": "525301006 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "525301006 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "525301006 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 306.2,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "3982952 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 306.2,
            "unit": "ns/op",
            "extra": "3982952 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "3982952 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3982952 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 362.3,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "3286549 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 362.3,
            "unit": "ns/op",
            "extra": "3286549 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "3286549 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "3286549 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 9.526,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "125949706 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 9.526,
            "unit": "ns/op",
            "extra": "125949706 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "125949706 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "125949706 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 9.149,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "130657567 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 9.149,
            "unit": "ns/op",
            "extra": "130657567 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "130657567 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "130657567 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "a1d3c989d104a200d56f4b78fac4d5ff105cc03d",
          "message": "fix(website): add devalue override to force 5.8.1 for CVE fix\n\ndependabot alert #3: devalue < 5.8.1 is vulnerable to DoS via\nsparse array deserialization. Adding npm override forces minimum\n5.8.1 when npm install is next run. Lockfile will be updated\non next website deployment or manually via `npm update devalue`.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:glm-5.1",
          "timestamp": "2026-05-25T23:56:35+02:00",
          "tree_id": "cc87162242e3eec07eab8f65044c40bcff87e715",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/a1d3c989d104a200d56f4b78fac4d5ff105cc03d"
        },
        "date": 1779746268912,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 287.7,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "4034222 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 287.7,
            "unit": "ns/op",
            "extra": "4034222 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "4034222 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "4034222 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.81,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "426474390 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.81,
            "unit": "ns/op",
            "extra": "426474390 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "426474390 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "426474390 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 221,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5397122 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 221,
            "unit": "ns/op",
            "extra": "5397122 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5397122 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5397122 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.08,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92498337 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.08,
            "unit": "ns/op",
            "extra": "92498337 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92498337 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92498337 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.03,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "84103599 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.03,
            "unit": "ns/op",
            "extra": "84103599 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "84103599 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "84103599 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.129,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147579663 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.129,
            "unit": "ns/op",
            "extra": "147579663 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147579663 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147579663 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.16,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14434819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.16,
            "unit": "ns/op",
            "extra": "14434819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14434819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14434819 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 96.29,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12409432 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 96.29,
            "unit": "ns/op",
            "extra": "12409432 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12409432 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12409432 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8065128 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.3,
            "unit": "ns/op",
            "extra": "8065128 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8065128 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8065128 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 53.02,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22725063 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 53.02,
            "unit": "ns/op",
            "extra": "22725063 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22725063 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22725063 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 150.9,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7990976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 150.9,
            "unit": "ns/op",
            "extra": "7990976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7990976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7990976 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 948.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1261723 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 948.4,
            "unit": "ns/op",
            "extra": "1261723 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1261723 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1261723 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1645,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "728427 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1645,
            "unit": "ns/op",
            "extra": "728427 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "728427 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "728427 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1218,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "968202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1218,
            "unit": "ns/op",
            "extra": "968202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "968202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "968202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1237,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "898356 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1237,
            "unit": "ns/op",
            "extra": "898356 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "898356 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "898356 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1548,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "789085 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1548,
            "unit": "ns/op",
            "extra": "789085 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "789085 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "789085 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.748,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "319735560 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.748,
            "unit": "ns/op",
            "extra": "319735560 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "319735560 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "319735560 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.528,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479486907 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.528,
            "unit": "ns/op",
            "extra": "479486907 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479486907 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479486907 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 472.5,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2419971 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 472.5,
            "unit": "ns/op",
            "extra": "2419971 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2419971 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2419971 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 522.8,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2290952 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 522.8,
            "unit": "ns/op",
            "extra": "2290952 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2290952 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2290952 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "95947550 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.87,
            "unit": "ns/op",
            "extra": "95947550 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "95947550 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "95947550 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.99,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.99,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "138a240d3439c31d2e1e3891bddfd0ee338bd5c4",
          "message": "chore(sdk-review): update go to 1.26.3, add flake.nix where needed\n\nBulk update across SDK ecosystem:\n- Update go directive: 1.26.2 -> 1.26.3\n- Add flake.nix with devShell, #test, #lint, #build, #vet apps\n- Update golangci-lint Go version\n- Fix failing test expectations\n- Fix pattern matching and negation semantics\n\n💘 Generated with Crush\n\nAssisted-by: Crush:hf:moonshotai/Kimi-K2.6",
          "timestamp": "2026-05-26T03:05:36+02:00",
          "tree_id": "754ec03d7f560a53951a7aec04d7518c3290f018",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/138a240d3439c31d2e1e3891bddfd0ee338bd5c4"
        },
        "date": 1779757640173,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 233.6,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5099455 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 233.6,
            "unit": "ns/op",
            "extra": "5099455 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5099455 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5099455 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.123,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "383629189 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.123,
            "unit": "ns/op",
            "extra": "383629189 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "383629189 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "383629189 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 224.1,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5388120 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 224.1,
            "unit": "ns/op",
            "extra": "5388120 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5388120 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5388120 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.27,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "91670776 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.27,
            "unit": "ns/op",
            "extra": "91670776 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "91670776 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "91670776 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.02,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "84945366 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.02,
            "unit": "ns/op",
            "extra": "84945366 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "84945366 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "84945366 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "144666316 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.24,
            "unit": "ns/op",
            "extra": "144666316 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "144666316 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "144666316 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.54,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14519757 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.54,
            "unit": "ns/op",
            "extra": "14519757 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14519757 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14519757 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 98.89,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12376495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 98.89,
            "unit": "ns/op",
            "extra": "12376495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12376495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12376495 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.7,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8027720 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.7,
            "unit": "ns/op",
            "extra": "8027720 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8027720 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8027720 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.57,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "21196400 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.57,
            "unit": "ns/op",
            "extra": "21196400 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "21196400 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "21196400 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 152.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7959486 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 152.8,
            "unit": "ns/op",
            "extra": "7959486 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7959486 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7959486 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 939.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1276711 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 939.4,
            "unit": "ns/op",
            "extra": "1276711 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1276711 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1276711 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1649,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "732913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1649,
            "unit": "ns/op",
            "extra": "732913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "732913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "732913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1226,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "962475 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1226,
            "unit": "ns/op",
            "extra": "962475 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "962475 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "962475 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1227,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "916466 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1227,
            "unit": "ns/op",
            "extra": "916466 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "916466 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "916466 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1545,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "751980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1545,
            "unit": "ns/op",
            "extra": "751980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "751980 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "751980 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.771,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "319723210 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.771,
            "unit": "ns/op",
            "extra": "319723210 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "319723210 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "319723210 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.504,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "479165612 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.504,
            "unit": "ns/op",
            "extra": "479165612 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "479165612 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "479165612 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 453.6,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2640078 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 453.6,
            "unit": "ns/op",
            "extra": "2640078 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2640078 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2640078 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 520.9,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2303796 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 520.9,
            "unit": "ns/op",
            "extra": "2303796 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2303796 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2303796 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.97,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "98947070 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.97,
            "unit": "ns/op",
            "extra": "98947070 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "98947070 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "98947070 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.9,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "87887060 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.9,
            "unit": "ns/op",
            "extra": "87887060 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "87887060 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "87887060 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "878cd0199ea3d23907dc1043e333262e0c5d8ee5",
          "message": "ci: add art-dupl code duplication check to Go CI\n\nNew parallel job that runs art-dupl with semantic analysis\n(threshold 15 tokens) on every Go file change. Excludes:\n- testdata/moq/** (generated mock code)\n- sqlc.go (known false positive: function signature collision)\n\nRuns: go install github.com/goreleaser/art-dupl@latest\n\n💘 Generated with Crush\n\nAssisted-by: Crush:glm-5.1",
          "timestamp": "2026-05-26T03:12:25+02:00",
          "tree_id": "0495b3690dccdb730f8df1bc58562d0e6bd7c206",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/878cd0199ea3d23907dc1043e333262e0c5d8ee5"
        },
        "date": 1779758035788,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 235.6,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5052630 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 235.6,
            "unit": "ns/op",
            "extra": "5052630 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5052630 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5052630 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.121,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "384679168 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.121,
            "unit": "ns/op",
            "extra": "384679168 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "384679168 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "384679168 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 222.9,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5332621 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 222.9,
            "unit": "ns/op",
            "extra": "5332621 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5332621 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5332621 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.08,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92335435 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.08,
            "unit": "ns/op",
            "extra": "92335435 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92335435 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92335435 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.02,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "84438925 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.02,
            "unit": "ns/op",
            "extra": "84438925 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "84438925 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "84438925 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.116,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147855980 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.116,
            "unit": "ns/op",
            "extra": "147855980 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147855980 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147855980 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 90.54,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14414796 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 90.54,
            "unit": "ns/op",
            "extra": "14414796 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14414796 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14414796 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 98.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11880189 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 98.24,
            "unit": "ns/op",
            "extra": "11880189 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11880189 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11880189 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8071324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.3,
            "unit": "ns/op",
            "extra": "8071324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8071324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8071324 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 53.4,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22575048 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 53.4,
            "unit": "ns/op",
            "extra": "22575048 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22575048 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22575048 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 152,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7971932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 152,
            "unit": "ns/op",
            "extra": "7971932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7971932 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7971932 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 1022,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 1022,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1673,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "710700 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1673,
            "unit": "ns/op",
            "extra": "710700 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "710700 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "710700 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1226,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "930816 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1226,
            "unit": "ns/op",
            "extra": "930816 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "930816 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "930816 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1226,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "904839 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1226,
            "unit": "ns/op",
            "extra": "904839 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "904839 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "904839 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1526,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "766657 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1526,
            "unit": "ns/op",
            "extra": "766657 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "766657 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "766657 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.795,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "307899752 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.795,
            "unit": "ns/op",
            "extra": "307899752 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "307899752 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "307899752 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.514,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "477447154 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.514,
            "unit": "ns/op",
            "extra": "477447154 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "477447154 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "477447154 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 455.1,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2627469 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 455.1,
            "unit": "ns/op",
            "extra": "2627469 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2627469 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2627469 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 523.5,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2284929 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 523.5,
            "unit": "ns/op",
            "extra": "2284929 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2284929 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2284929 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "97882699 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.87,
            "unit": "ns/op",
            "extra": "97882699 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "97882699 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "97882699 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.84,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.84,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "40f58c659e4c651e04bde87bcbd087597374da49",
          "message": "docs: document gitignore-aware filtering decision and composition pattern\n\nRejected native .gitignore support after thorough analysis. Native implementation would require go-git/v6 (alpha), cause 4x dependency explosion, blur gogenfilter's identity from \"generated code detector\" to \"general file filterer\", and add I/O amplification to the hot path. The recommended alternative — documented composition pattern using sabhiram/go-gitignore upstream — is zero-dependency (for WithExcludePatterns) or minimal-dependency (for composition).\n\n## What Changed\n\n### AGENTS.md\n- Added gotcha: \".gitignore filtering is out of scope\" — documents the design decision and recommends WithExcludePatterns + pre-filtering composition for future sessions\n\n### FEATURES.md\n- Added \"Gitignore-Aware Filtering\" section with status matrix:\n  - Native .gitignore parsing: REJECTED (would require alpha dep, scope creep)\n  - WithExcludePatterns alternative: FULLY_FUNCTIONAL (covers 80%+ of cases)\n  - Composition pattern documented: FULLY_FUNCTIONAL (new website guide)\n\n### docs/research/gitignore-aware-filtering-analysis.md\n- Full PRO/CON analysis with effort estimates:\n  - 6 PROs (intent deduplication, zero-config correctness, git-native semantics, etc.)\n  - 6 CONs (dependency burden — critical, scope creep — critical, I/O amplification, performance caching complexity, already solvable by caller, unstable dependency)\n  - Effort estimate: 18-24 hours for production-grade implementation\n  - 3-option matrix: Full implement (Option A), Document pattern (Option B), Reject (Option C)\n  - Recommendation: Option B — document composition pattern\n- Implementation sketch included for if user overrides to Option A\n\n### docs/status/2026-05-27_03-17_gitignore-analysis-docs-and-status.md\n- Session 5 status report covering full investigation, deliverables, and top-25 task backlog\n- Complete metrics snapshot (99.8% coverage, 0 new lint issues, etc.)\n- Files changed this session: 6 files, all documented\n\n### example_test.go\n- Added ExampleWithExcludePatterns_vendorAndTestdata: demonstrates WithExcludePatterns with vendor/** and **/testdata/** exclusions against a mixed file list (vendor file, testdata file, db file, main file)\n\n### website/astro.config.mjs\n- Added \"Gitignore Pre-Filtering\" to Guides sidebar section (slug: guides/gitignore-pre-filtering)\n\n### website/src/content/docs/guides/gitignore-pre-filtering.mdx\n- New Starlight docs page covering:\n  - Why built-in gitignore is not included (scope, dependency, semantic differences)\n  - Composition pattern with sabhiram/go-gitignore (full code example)\n  - WithExcludePatterns as the zero-dependency alternative\n  - When-to-use-which matrix (3 approaches compared)\n  - Recommended libraries table (sabhiram/go-gitignore vs go-git/gitignore)\n\n## Why This Matters\n\ngogenfilter's purpose is narrow and well-defined: detect and filter auto-generated Go code. .gitignore addresses \"files git shouldn't track\" — a broader concept that includes secrets, IDE configs, and build artifacts. Adding gitignore support would:\n- Dilute the library's identity and purpose\n- Require an alpha dependency with significant transitive cost\n- Add filesystem I/O to every filter call (hot path)\n- Require caching infrastructure for performance\n\nThe composition pattern (pre-filter with gitignore library → pass to gogenfilter) gives users the best of both worlds without these costs.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-05-27T03:26:01+02:00",
          "tree_id": "19300c237b4102e521a1ffcb98b8cede4e292117",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/40f58c659e4c651e04bde87bcbd087597374da49"
        },
        "date": 1779845228421,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 233.6,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5101892 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 233.6,
            "unit": "ns/op",
            "extra": "5101892 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5101892 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5101892 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.124,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "381755278 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.124,
            "unit": "ns/op",
            "extra": "381755278 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "381755278 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "381755278 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 221.1,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5383234 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 221.1,
            "unit": "ns/op",
            "extra": "5383234 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5383234 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5383234 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.09,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "88998990 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.09,
            "unit": "ns/op",
            "extra": "88998990 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "88998990 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "88998990 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.33,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "83431810 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.33,
            "unit": "ns/op",
            "extra": "83431810 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "83431810 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "83431810 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.112,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147872312 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.112,
            "unit": "ns/op",
            "extra": "147872312 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147872312 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147872312 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 85.55,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14335280 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 85.55,
            "unit": "ns/op",
            "extra": "14335280 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14335280 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14335280 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.91,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "11794894 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.91,
            "unit": "ns/op",
            "extra": "11794894 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "11794894 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "11794894 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 148.8,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8100960 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 148.8,
            "unit": "ns/op",
            "extra": "8100960 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8100960 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8100960 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.88,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22782703 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.88,
            "unit": "ns/op",
            "extra": "22782703 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22782703 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22782703 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 152.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7980966 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 152.2,
            "unit": "ns/op",
            "extra": "7980966 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7980966 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7980966 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 1029,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 1029,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1651,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "700670 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1651,
            "unit": "ns/op",
            "extra": "700670 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "700670 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "700670 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1225,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "973534 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1225,
            "unit": "ns/op",
            "extra": "973534 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "973534 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "973534 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1228,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "909913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1228,
            "unit": "ns/op",
            "extra": "909913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "909913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "909913 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1534,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "797386 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1534,
            "unit": "ns/op",
            "extra": "797386 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "797386 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "797386 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.754,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "319999324 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.754,
            "unit": "ns/op",
            "extra": "319999324 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "319999324 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "319999324 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.535,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "459958630 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.535,
            "unit": "ns/op",
            "extra": "459958630 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "459958630 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "459958630 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 459.9,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2633064 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 459.9,
            "unit": "ns/op",
            "extra": "2633064 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2633064 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2633064 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 523.8,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2293926 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 523.8,
            "unit": "ns/op",
            "extra": "2293926 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2293926 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2293926 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.89,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "93518643 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.89,
            "unit": "ns/op",
            "extra": "93518643 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "93518643 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "93518643 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.9,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "96352201 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.9,
            "unit": "ns/op",
            "extra": "96352201 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "96352201 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "96352201 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "fbdc2a5b9db17432f9e6a9e1c29e2afeb7b16f6a",
          "message": "feat(module): add Go module dependencies and research document\n\n- Add Go module dependency files (o.mod and o.sum) for dependency management\n- Include gitignore-aware filtering analysis documentation\n- Initialize project with module structure for better dependency tracking",
          "timestamp": "2026-05-27T07:17:33+02:00",
          "tree_id": "af771f67fce4fb7303c1ed43096134556b0efe4a",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/fbdc2a5b9db17432f9e6a9e1c29e2afeb7b16f6a"
        },
        "date": 1779859554988,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 203.2,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5772273 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 203.2,
            "unit": "ns/op",
            "extra": "5772273 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5772273 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5772273 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.172,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "378034972 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.172,
            "unit": "ns/op",
            "extra": "378034972 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "378034972 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "378034972 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 184.2,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6358650 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 184.2,
            "unit": "ns/op",
            "extra": "6358650 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6358650 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6358650 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.31,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "91607325 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.31,
            "unit": "ns/op",
            "extra": "91607325 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "91607325 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "91607325 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.86,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "81593371 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.86,
            "unit": "ns/op",
            "extra": "81593371 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "81593371 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "81593371 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.406,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "161873612 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.406,
            "unit": "ns/op",
            "extra": "161873612 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "161873612 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "161873612 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 80.54,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14935161 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 80.54,
            "unit": "ns/op",
            "extra": "14935161 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14935161 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14935161 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.51,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12365618 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.51,
            "unit": "ns/op",
            "extra": "12365618 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12365618 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12365618 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 154.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7501956 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 154.3,
            "unit": "ns/op",
            "extra": "7501956 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7501956 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7501956 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 49.98,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "23972070 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 49.98,
            "unit": "ns/op",
            "extra": "23972070 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "23972070 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "23972070 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 156.9,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7751553 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 156.9,
            "unit": "ns/op",
            "extra": "7751553 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7751553 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7751553 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 842.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1423003 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 842.4,
            "unit": "ns/op",
            "extra": "1423003 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1423003 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1423003 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1529,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "778798 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1529,
            "unit": "ns/op",
            "extra": "778798 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "778798 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "778798 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1133,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1133,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1121,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1121,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1531,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "867139 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1531,
            "unit": "ns/op",
            "extra": "867139 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "867139 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "867139 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.24,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "282050702 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.24,
            "unit": "ns/op",
            "extra": "282050702 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "282050702 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "282050702 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.88,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "415445998 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.88,
            "unit": "ns/op",
            "extra": "415445998 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "415445998 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "415445998 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 391.4,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "3053767 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 391.4,
            "unit": "ns/op",
            "extra": "3053767 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "3053767 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3053767 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 453,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2660364 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 453,
            "unit": "ns/op",
            "extra": "2660364 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2660364 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2660364 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.64,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.72,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "c23002d68d382bf4c54a66deb2bc4e5a7e62e1ca",
          "message": "docs, workflow, and project hygiene: archive old status reports, add ROADMAP/TODO docs, fix goconst lint warning, document Lighthouse CI, and cross-link dependents page\n\nThis commit consolidates several documentation and project hygiene tasks that\naccumulated over recent sessions. Below is a detailed breakdown of every change\nand its rationale.\n\n---\n\n### Documentation files added\n\n**ROADMAP.md (new)**\n\nIntroduces a new strategic planning document that lives alongside TODO_LIST.md\nand FEATURES.md. Its purpose, per the AGENTS.md file convention, is to capture\nlong-term direction and raw ideas that have not yet been refined into\nactionable tasks. Key contents:\n\n- v3 status: complete and stable, enters maintenance mode\n- Maintenance items: Dependabot alerts, Lighthouse CI configuration, website\n  performance audit\n- Open strategic question: v3 maintenance mode vs v4 with expanded scope\n  (golangci-lint plugin, custom detector registration API, WASM build, etc.)\n- Unprioritized idea list covering community, supply chain, and extensibility\n\nThe strategic question of \"maintenance mode vs v4\" is explicitly called out as\nthe #1 blocker for further planning and is tracked as a pending TODO item.\n\n**TODO_LIST.md (new)**\n\nReplaces informal tracking with a structured, categorized task list. Organized\ninto sections: In Progress, Pending (CI/CD, Website, Documentation, Strategic),\nCompleted (2026-06-01), and Completed (prior sessions). Each pending item has\na priority and effort estimate. Key pending items:\n\n- CI/CD: Configure or remove Lighthouse CI (requires LHCI_GITHUB_APP_TOKEN)\n- CI/CD: Resolve 4 npm Dependabot alerts (website transitive deps)\n- Website: Fix Lighthouse accessibility failures (color-contrast, ARIA labels)\n- Website: Add \"Who Uses gogenfilter\" CTA to landing page (cross-link dependents page)\n- Website: Performance audit and baseline establishment\n- Website: Test dependents page with real data\n- Website: Add dependents page to stale reference CI check\n- Documentation: Review and consolidate docs/planning/\n- Strategic: Define v3 maintenance mode vs v4 vision\n- Strategic: Evaluate golangci-lint plugin opportunity\n- Strategic: Design custom detector registration API\n\nCompleted items include: goconst warning fix, ROADMAP/TODO creation, FEATURES\nupdate, archiving of old status reports, and Lighthouse CI status documentation.\n\n---\n\n### Documentation files updated\n\n**FEATURES.md**\n\n- Updated \"Updated\" date from 2026-05-25 to 2026-06-01 and changed source to\n  note \"code audit of all source files + website features\"\n- Expanded Astro v6 + Starlight website feature entry with three sub-features:\n  Landing page (now mentions CSP-compliant scripts), Dependents page (new —\n  build-time GitHub code search for public users), Starlight docs, Firebase\n  Hosting (the latter two remain unchanged but are now formatted consistently)\n\n**AGENTS.md**\n\n- Updated \"CI Known Issues\" date from 2026-05-04 to 2026-06-01\n- Updated the Lighthouse CI line item to note that the missing token is now\n  documented in the lighthouse.yml header comment (prevents the same question\n  from arising again)\n- Updated the docs/status/archive/ description from \"Historical status reports\n  (pre-May-25) are archived here. Active reports remain in docs/status/\" to\n  \"Historical status reports. Only the 3 most recent reports are kept in\n  docs/status/; older reports are archived.\" — this removes the hardcoded date\n  and describes the actual policy\n\n---\n\n### Status reports archived\n\nThe following 9 historical status reports were renamed (git mv) into\ndocs/status/archive/, keeping their full content unchanged. These represent\ncompleted sessions from May 25–27, 2026 and are no longer active working\ndocuments:\n\n- 2026-05-25_21-45_post-dedup-error-handling-cleanup.md\n- 2026-05-25_22-35_comprehensive-post-review-session.md\n- 2026-05-25_22-44_full-session-architecture-review-and-docs-audit.md\n- 2026-05-25_22-47_comprehensive-status-update.md\n- 2026-05-25_23-14_comprehensive-status-all-tasks-done.md\n- 2026-05-25_23-35_final-status-all-clear.md\n- 2026-05-25_23-57_session-3-completion.md\n- 2026-05-26_04-52_session-4-ci-fixes-refactoring.md\n- 2026-05-27_03-17_gitignore-analysis-docs-and-status.md\n\nThe archive policy (3 most recent reports kept at root, older ones archived)\nis now documented in AGENTS.md.\n\n---\n\n### GitHub Actions workflow updated\n\n**.github/workflows/lighthouse.yml**\n\nAdded a header comment block at the top of the file:\n\n    # NOTE: This workflow requires the Lighthouse CI GitHub App to be installed\n    # and the LHCI_GITHUB_APP_TOKEN secret to be configured for status checks.\n    # Without it, the workflow runs but produces no actionable GitHub status checks.\n    # See: https://github.com/apps/lighthouse-ci\n\nThis directly addresses the \"CI Known Issues\" item about the missing token,\nmaking the requirement self-documenting in the workflow file itself rather\nthan only in AGENTS.md.\n\n---\n\n### Test file updated\n\n**example_test.go**\n\nExtracted the repeated sqlc file content string:\n\n    \"// Code generated by sqlc. DO NOT EDIT.\\npackage db\\n\"\n\ninto a package-level named constant:\n\n    const sqlcDBContent = \"// Code generated by sqlc. DO NOT EDIT.\\npackage db\\n\"\n\nThis constant is now used in 6 locations across 5 Example functions:\nExampleFilter_Filter, ExampleWithIncludePatterns, ExampleDetectReasonReader,\nExampleFilter_FilterDetailed, ExampleFilterOption_Reason_filterAll, and\nExampleWithExcludePatterns_vendorAndTestdata.\n\nRationale: The golangci-lint goconst linter flagged this string as a repeated\nliteral appearing 6 times. Extracting it to a named constant improves\nreadability, makes the intent explicit, and eliminates the lint warning. The\nstring is not a magic number — it is a stable sqlc-generated file header that\nlegitimately never changes, so a constant is the appropriate representation.\n\n---\n\n### Website component updated\n\n**website/src/components/CTASection.astro**\n\nChanged the CTA section from a single \"Read the Docs\" button to a two-button\nlayout:\n\n1. Primary button (unchanged style): \"Read the Docs\" → /getting-started/installation/\n2. New secondary button (outlined style): \"Who Uses gogenfilter\" → /dependents/\n   with external link icon\n\nThis directly addresses the TODO item \"Add 'Who Uses gogenfilter' CTA to\nlanding page\" — the dependents page was built in a prior session but was only\nlinked from the docs sidebar, making it nearly undiscoverable. The secondary\nbutton uses the existing `arrow-external` icon from the centralized Icon.astro\ncomponent, maintaining design consistency.\n\nThe buttons are wrapped in a flex container with gap-4 and flex-wrap for\nresponsive layout on smaller screens.\n\n---\n\n### Relationship to prior commits\n\nThis commit builds on:\n- 0aef07d (CSP security fix) — documentation of Lighthouse CI was identified\n  as a gap during that session\n- 4e99ea2 (dependents page) — cross-linking the page from the landing page was\n  a known follow-up item\n- af8e031 (comprehensive status report) — the decision to archive old status\n  reports and create ROADMAP/TODO_LIST documents was made during that session\n\n---\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-06-01T22:47:17+02:00",
          "tree_id": "e954e9094c176805ca787dd8996d7b79b3f4241d",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/c23002d68d382bf4c54a66deb2bc4e5a7e62e1ca"
        },
        "date": 1780346906541,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 194.7,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6109902 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 194.7,
            "unit": "ns/op",
            "extra": "6109902 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6109902 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6109902 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.225,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "358622689 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.225,
            "unit": "ns/op",
            "extra": "358622689 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "358622689 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "358622689 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 184.2,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6395696 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 184.2,
            "unit": "ns/op",
            "extra": "6395696 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6395696 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6395696 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.41,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92811508 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.41,
            "unit": "ns/op",
            "extra": "92811508 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92811508 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92811508 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.74,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "81381030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.74,
            "unit": "ns/op",
            "extra": "81381030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "81381030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "81381030 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.194,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "170200352 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.194,
            "unit": "ns/op",
            "extra": "170200352 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "170200352 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "170200352 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 80.59,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14855461 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 80.59,
            "unit": "ns/op",
            "extra": "14855461 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14855461 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14855461 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.18,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12301176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.18,
            "unit": "ns/op",
            "extra": "12301176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12301176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12301176 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 153.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7891650 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 153.3,
            "unit": "ns/op",
            "extra": "7891650 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7891650 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7891650 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 49.93,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "24012800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 49.93,
            "unit": "ns/op",
            "extra": "24012800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "24012800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "24012800 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 154.7,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7772011 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 154.7,
            "unit": "ns/op",
            "extra": "7772011 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7772011 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7772011 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 841.2,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1422770 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 841.2,
            "unit": "ns/op",
            "extra": "1422770 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1422770 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1422770 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1525,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "770004 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1525,
            "unit": "ns/op",
            "extra": "770004 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "770004 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "770004 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1128,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1128,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1120,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1120,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1406,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "784984 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1406,
            "unit": "ns/op",
            "extra": "784984 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "784984 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "784984 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.227,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "283588178 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.227,
            "unit": "ns/op",
            "extra": "283588178 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "283588178 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "283588178 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.896,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "416561058 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.896,
            "unit": "ns/op",
            "extra": "416561058 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "416561058 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "416561058 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 390.3,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2982612 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 390.3,
            "unit": "ns/op",
            "extra": "2982612 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2982612 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2982612 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 449.2,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2675820 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 449.2,
            "unit": "ns/op",
            "extra": "2675820 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2675820 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2675820 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.33,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.33,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.68,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.68,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "0c53a73ecfde82c7b6fdba9f618f9b28281f39dc",
          "message": "feat(errors): introduce SQLCOperation typed constants for stronger type safety\n\nIntroduce `SQLCOperation string` type with named constants (`OpSQLCFind`, `OpSQLCWalk`,\n`OpSQLCRead`, `OpSQLCCollect`, `OpSQLCParse`) replacing raw `string` operation values in\n`SQLCConfigError.Operation`. Follows the same typed-constants pattern already used for\n`ErrorCode`, `FilterOption`, and `FilterReason`. This makes the error type self-documenting,\nprevents invalid operation strings at compile time, and enables `errors.Is` checks by\nsemantic operation rather than string matching.\n\nAll call sites updated: `sqlc.go` internal helpers (`sqlcFindError`, `sqlcWalkError`,\n`sqlcReadError`, `sqlcCollectError`, `unmarshalSQLCYAML`, `unmarshalSQLCConfig`) now\npass typed constants. Tests in `errors_test.go`, `bdd_test.go`, and `bdd_extended_test.go`\nupdated to use `gogenfilter.OpSQLCParse` and `gogenfilter.OpSQLCRead`. The now-obsolete\n`testhelpers.ParseOp` constant is removed.\n\nchore(website): migrate Firebase deployment from action to firebase-tools CLI\n\nReplace `FirebaseExtended/action-hosting-deploy@v0` (deprecated, Node 20 runtime) with\ndirect `firebase-tools` CLI deployment in `.github/workflows/website.yml`. Uses\n`actions/setup-node@v6` with Node 24 to install `firebase-tools` globally, then runs\n`firebase deploy --only hosting:gogenfilter` with `GOOGLE_APPLICATION_CREDENTIALS` pointing\nto a service account JSON key (written via `secrets.FIREBASE_SERVICE_ACCOUNT`). This removes\nthe dependency on the deprecated action and aligns the deployment runtime with the rest of\nthe website CI pipeline (Node 24).\n\nfix(website): improve dependents page table accessibility\n\nAdd `<caption class=\"sr-only\">Projects depending on gogenfilter</caption>` to the dependents\ntable in `website/src/pages/dependents.astro` for screen reader users. Replace the bare\nUnicode star character `★` in the table header with `<span aria-hidden=\"true\">★</span>` +\n`<span class=\"sr-only\">Stars</span>` so screen readers announce \"Stars\" instead of reading\nthe symbol. Add `aria-label={${repo.stargazers_count} stars}` to each star count cell for\ncontextual announcement.\n\nchore(deps): add npm overrides for transitive dependency vulnerability resolution\n\nAdd `brace-expansion@5.0.6` and `yaml@2.8.3` overrides to `website/package.json` to resolve\nDependabot security alerts for transitive dev dependencies. The `brace-expansion` alert is\nfor a prototype pollution vulnerability in versions < 5.0.6. The `yaml` alert is for a\nparsing error vulnerability in certain versions.\n\ndocs: update AGENTS.md and DOMAIN_LANGUAGE.md to reflect all changes\n\nAGENTS.md Design Decisions section updated: added entry for `SQLCOperation` typed constants,\nFirebase deploy migration, website a11y fixes, and npm overrides. DOMAIN_LANGUAGE.md Types\ntable expanded with `SQLCOperation`, `ErrorCoder`, `ProjectRootError`, `FilterConfigError`,\nand `SQLCConfigError`. Operations table updated with `DetectReasonReader`,\n`FindSQLCConfigsFS`, `GetSQLOutputDirsFS`, and `MatchPattern`.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:MiniMax-M2.7-highspeed",
          "timestamp": "2026-06-02T04:31:59+02:00",
          "tree_id": "ea16d8d2b68d7c8347a5b3dd4c5383ee7094164d",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/0c53a73ecfde82c7b6fdba9f618f9b28281f39dc"
        },
        "date": 1780367580780,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 239.3,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5034513 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 239.3,
            "unit": "ns/op",
            "extra": "5034513 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5034513 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5034513 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.821,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "426879528 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.821,
            "unit": "ns/op",
            "extra": "426879528 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "426879528 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "426879528 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 223.2,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5361939 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 223.2,
            "unit": "ns/op",
            "extra": "5361939 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5361939 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5361939 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "93156808 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.2,
            "unit": "ns/op",
            "extra": "93156808 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "93156808 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "93156808 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 13.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "84802944 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 13.72,
            "unit": "ns/op",
            "extra": "84802944 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "84802944 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "84802944 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.131,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147662146 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.131,
            "unit": "ns/op",
            "extra": "147662146 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147662146 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147662146 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 86.91,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "13728440 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 86.91,
            "unit": "ns/op",
            "extra": "13728440 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "13728440 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "13728440 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 103.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "10927874 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 103.6,
            "unit": "ns/op",
            "extra": "10927874 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "10927874 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "10927874 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 150,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8022452 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 150,
            "unit": "ns/op",
            "extra": "8022452 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8022452 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8022452 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 56.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "21153013 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 56.5,
            "unit": "ns/op",
            "extra": "21153013 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "21153013 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "21153013 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 160.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7471761 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 160.3,
            "unit": "ns/op",
            "extra": "7471761 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7471761 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7471761 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 938,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1281456 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 938,
            "unit": "ns/op",
            "extra": "1281456 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1281456 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1281456 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1646,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "724218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1646,
            "unit": "ns/op",
            "extra": "724218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "724218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "724218 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1248,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "972928 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1248,
            "unit": "ns/op",
            "extra": "972928 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "972928 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "972928 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1228,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "912872 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1228,
            "unit": "ns/op",
            "extra": "912872 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "912872 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "912872 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1534,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "739572 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1534,
            "unit": "ns/op",
            "extra": "739572 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "739572 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "739572 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.747,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "320262115 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.747,
            "unit": "ns/op",
            "extra": "320262115 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "320262115 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "320262115 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.52,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "470534920 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.52,
            "unit": "ns/op",
            "extra": "470534920 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "470534920 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "470534920 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 456.6,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2618102 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 456.6,
            "unit": "ns/op",
            "extra": "2618102 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2618102 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2618102 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 572.2,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2091294 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 572.2,
            "unit": "ns/op",
            "extra": "2091294 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2091294 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2091294 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.88,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "94006681 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.88,
            "unit": "ns/op",
            "extra": "94006681 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "94006681 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "94006681 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.88,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "99505300 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.88,
            "unit": "ns/op",
            "extra": "99505300 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "99505300 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "99505300 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "21d7a95dc8dba6d5809602f071d87116131556bc",
          "message": "fix(detection): support absolute paths in content-based generated code detection\n\nfs.ReadFile with os.DirFS(\".\") silently rejects absolute paths with\n\"invalid argument\". This caused all content-based detectors (generic\n\"Code generated by\", stringer) to fail when art-dupl passed absolute\nfile paths from filepath.Walk — the error was silently swallowed and\nfiles were returned as \"not filtered\" instead of being detected as\ngenerated code.\n\nThe fix adds a readFile helper that falls back to os.ReadFile for\nabsolute paths when fs.ReadFile fails. This makes gogenfilter work\ncorrectly regardless of whether callers pass relative or absolute paths.\n\nImpact: art-dupl's stats command was producing false clone positives\nfor projects scanned via absolute paths (e.g. from projects-management-\nautomation's stats subcommand) because generated code wasn't being\nfiltered. For example, gogenfilter itself showed 5 clone groups / 10\nclones with absolute paths (38 files scanned, only 6 filtered) vs\n0 clone groups when run from inside the project (20 files scanned,\n24 filtered — including 12 generic \"Code generated by\" files).\n\nRoot cause: os.DirFS rejects absolute paths in ReadFile — a well-known\nGo gotcha documented since Go 1.16.\n\n💘 Generated with Crush\n\nAssisted-by: Crush:glm-5.1",
          "timestamp": "2026-06-05T00:11:55+02:00",
          "tree_id": "cecb5a002e87d2af375cae55915da85208cc9db6",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/21d7a95dc8dba6d5809602f071d87116131556bc"
        },
        "date": 1780611195183,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 238.5,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5009156 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 238.5,
            "unit": "ns/op",
            "extra": "5009156 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5009156 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5009156 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.118,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "384748942 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.118,
            "unit": "ns/op",
            "extra": "384748942 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "384748942 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "384748942 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 219.7,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5427265 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 219.7,
            "unit": "ns/op",
            "extra": "5427265 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5427265 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5427265 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.08,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "89709578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.08,
            "unit": "ns/op",
            "extra": "89709578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "89709578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "89709578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 13.72,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "87143272 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 13.72,
            "unit": "ns/op",
            "extra": "87143272 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "87143272 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "87143272 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.138,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147991320 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.138,
            "unit": "ns/op",
            "extra": "147991320 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147991320 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147991320 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.23,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14453982 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.23,
            "unit": "ns/op",
            "extra": "14453982 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14453982 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14453982 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.87,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12039195 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.87,
            "unit": "ns/op",
            "extra": "12039195 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12039195 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12039195 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 149.3,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8065969 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 149.3,
            "unit": "ns/op",
            "extra": "8065969 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8065969 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8065969 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 53.17,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22706976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 53.17,
            "unit": "ns/op",
            "extra": "22706976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22706976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22706976 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 150.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7844286 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 150.6,
            "unit": "ns/op",
            "extra": "7844286 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7844286 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7844286 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 942.4,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1273812 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 942.4,
            "unit": "ns/op",
            "extra": "1273812 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1273812 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1273812 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1649,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "683320 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1649,
            "unit": "ns/op",
            "extra": "683320 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "683320 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "683320 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1218,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "998653 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1218,
            "unit": "ns/op",
            "extra": "998653 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "998653 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "998653 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1247,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "988636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1247,
            "unit": "ns/op",
            "extra": "988636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "988636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "988636 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1534,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "795032 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1534,
            "unit": "ns/op",
            "extra": "795032 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "795032 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "795032 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.755,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "318353869 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.755,
            "unit": "ns/op",
            "extra": "318353869 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "318353869 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "318353869 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.544,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "478458704 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.544,
            "unit": "ns/op",
            "extra": "478458704 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "478458704 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "478458704 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 462.5,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2614021 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 462.5,
            "unit": "ns/op",
            "extra": "2614021 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2614021 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2614021 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 575.6,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2091830 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 575.6,
            "unit": "ns/op",
            "extra": "2091830 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2091830 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2091830 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.89,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "98330882 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.89,
            "unit": "ns/op",
            "extra": "98330882 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "98330882 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "98330882 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.86,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "97359402 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.86,
            "unit": "ns/op",
            "extra": "97359402 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "97359402 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "97359402 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "18a82635894185384a93097fcccbc64906c2138d",
          "message": "chore(project): update test data and project documentation\n\n- Add documentation files for multiple testdata packages\n- Add code of conduct file\n- Add lake lock file for dependency management",
          "timestamp": "2026-06-08T09:40:30+02:00",
          "tree_id": "24ad123c50f36ae123965626cbd4b5fe574f6e0d",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/18a82635894185384a93097fcccbc64906c2138d"
        },
        "date": 1780907474797,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 237.2,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5006762 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 237.2,
            "unit": "ns/op",
            "extra": "5006762 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5006762 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5006762 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.119,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "384148068 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.119,
            "unit": "ns/op",
            "extra": "384148068 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "384148068 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "384148068 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 218.7,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5447245 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 218.7,
            "unit": "ns/op",
            "extra": "5447245 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5447245 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5447245 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.09,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "91319954 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.09,
            "unit": "ns/op",
            "extra": "91319954 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "91319954 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "91319954 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 13.73,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "84386523 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 13.73,
            "unit": "ns/op",
            "extra": "84386523 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "84386523 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "84386523 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 8.117,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "147897243 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 8.117,
            "unit": "ns/op",
            "extra": "147897243 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "147897243 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "147897243 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 83.31,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14445774 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 83.31,
            "unit": "ns/op",
            "extra": "14445774 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14445774 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14445774 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12368900 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.2,
            "unit": "ns/op",
            "extra": "12368900 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12368900 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12368900 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 154,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "6556401 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 154,
            "unit": "ns/op",
            "extra": "6556401 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "6556401 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "6556401 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 52.51,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "22771858 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 52.51,
            "unit": "ns/op",
            "extra": "22771858 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "22771858 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "22771858 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 149.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8009838 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 149.5,
            "unit": "ns/op",
            "extra": "8009838 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8009838 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8009838 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 938.1,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1274180 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 938.1,
            "unit": "ns/op",
            "extra": "1274180 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1274180 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1274180 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1620,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "738859 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1620,
            "unit": "ns/op",
            "extra": "738859 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "738859 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "738859 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1208,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1208,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1209,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "893502 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1209,
            "unit": "ns/op",
            "extra": "893502 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "893502 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "893502 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1511,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "794181 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1511,
            "unit": "ns/op",
            "extra": "794181 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "794181 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "794181 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 3.751,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "319268233 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 3.751,
            "unit": "ns/op",
            "extra": "319268233 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "319268233 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "319268233 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.502,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "478762106 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.502,
            "unit": "ns/op",
            "extra": "478762106 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "478762106 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "478762106 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 455.8,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "2629754 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 455.8,
            "unit": "ns/op",
            "extra": "2629754 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "2629754 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2629754 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 571.2,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2100762 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 571.2,
            "unit": "ns/op",
            "extra": "2100762 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2100762 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2100762 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.84,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "96488269 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.84,
            "unit": "ns/op",
            "extra": "96488269 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "96488269 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "96488269 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.84,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.84,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "b7d2ae816463f7246cca511e2403a25fe67391e4",
          "message": "chore(deps): initialize go module\n\n📋 CHANGES SUMMARY:\n• Status: 0 modified, 0 staged, 2 untracked files\n• Branch: master\n\n🔧 DETAILED CHANGES:\n=== UNSTAGED CHANGES ===\ndiff --git a/go.mod b/go.mod\nindex 67423a7..e54a4c5 100644\n--- a/go.mod\n+++ b/go.mod\n@@ -26,7 +26,7 @@ require (\n \tgolang.org/x/mod v0.36.0 // indirect\n \tgolang.org/x/net v0.55.0 // indirect\n \tgolang.org/x/sync v0.20.0 // indirect\n-\tgolang.org/x/sys v0.45.0 // indirect\n+\tgolang.org/x/sys v0.46.0 // indirect\n \tgolang.org/x/text v0.37.0 // indirect\n \tgola...",
          "timestamp": "2026-06-09T21:18:30+02:00",
          "tree_id": "1f9f36e2257c9f3217a2ecc1985f0c316f84ada7",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/b7d2ae816463f7246cca511e2403a25fe67391e4"
        },
        "date": 1781032914107,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 202.9,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5848234 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 202.9,
            "unit": "ns/op",
            "extra": "5848234 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5848234 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5848234 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 3.031,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "361871907 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 3.031,
            "unit": "ns/op",
            "extra": "361871907 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "361871907 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "361871907 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 186.8,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6389836 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 186.8,
            "unit": "ns/op",
            "extra": "6389836 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6389836 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6389836 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 12.94,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "92115475 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 12.94,
            "unit": "ns/op",
            "extra": "92115475 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "92115475 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "92115475 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.48,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "83174578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.48,
            "unit": "ns/op",
            "extra": "83174578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "83174578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "83174578 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.411,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "161710542 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.411,
            "unit": "ns/op",
            "extra": "161710542 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "161710542 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "161710542 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 80.49,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14944308 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 80.49,
            "unit": "ns/op",
            "extra": "14944308 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14944308 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14944308 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.11,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12321922 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.11,
            "unit": "ns/op",
            "extra": "12321922 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12321922 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12321922 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 156.2,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7921532 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 156.2,
            "unit": "ns/op",
            "extra": "7921532 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7921532 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7921532 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 50.41,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "21686983 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 50.41,
            "unit": "ns/op",
            "extra": "21686983 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "21686983 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "21686983 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 155,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7743699 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 155,
            "unit": "ns/op",
            "extra": "7743699 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7743699 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7743699 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 840.5,
            "unit": "ns/op\t     696 B/op\t       6 allocs/op",
            "extra": "1428673 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 840.5,
            "unit": "ns/op",
            "extra": "1428673 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 696,
            "unit": "B/op",
            "extra": "1428673 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "1428673 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 1533,
            "unit": "ns/op\t     744 B/op\t       7 allocs/op",
            "extra": "781202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 1533,
            "unit": "ns/op",
            "extra": "781202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 744,
            "unit": "B/op",
            "extra": "781202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "781202 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 1122,
            "unit": "ns/op\t     680 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 1122,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1129,
            "unit": "ns/op\t    1352 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1129,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 1352,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 1415,
            "unit": "ns/op\t    1272 B/op\t       9 allocs/op",
            "extra": "864024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 1415,
            "unit": "ns/op",
            "extra": "864024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 1272,
            "unit": "B/op",
            "extra": "864024 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "864024 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.225,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "283854070 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.225,
            "unit": "ns/op",
            "extra": "283854070 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "283854070 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "283854070 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.888,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "413357695 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.888,
            "unit": "ns/op",
            "extra": "413357695 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "413357695 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "413357695 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 398.9,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "3018687 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 398.9,
            "unit": "ns/op",
            "extra": "3018687 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "3018687 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3018687 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 523.2,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2264107 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 523.2,
            "unit": "ns/op",
            "extra": "2264107 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2264107 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2264107 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.64,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.75,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.75,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "committer": {
            "email": "git@lars.software",
            "name": "Lars Artmann",
            "username": "LarsArtmann"
          },
          "distinct": true,
          "id": "dd6ba77afa2ab984be27da40dceff4b674fa50b2",
          "message": "docs: clarify mockgen/mockery boundary and gqlgen detection scope\n\nThe previous commit (979b84f) resolved the mockgen/mockery overlap by\nestablishing exclusive ownership of filename prefixes. This commit\nupdates all user-facing documentation (CHANGELOG.md, FEATURES.md,\nREADME.md) to accurately reflect the resolved detection logic.\n\nChanges per file:\n\nCHANGELOG.md:\n- mockery: added explicit note that it has exclusive ownership of the\n  mock_ prefix. Previously the entry could be misread as shared with\n  mockgen; it is not.\n- gqlgen: reworded from \"generated.go filename + content\" to\n  \"Content-only detection\" with rationale (\"generated.go too generic\").\n  The filename heuristic was never correct and was removed in 979b84f.\n\nFEATURES.md:\n- mockgen: removed the mock_ prefix from its description, leaving only\n  the _mock.go suffix. The mock_ prefix now belongs exclusively to\n  mockery by design (see 979b84f).\n- mockery: appended \"(exclusive ownership of mock_ prefix)\" to make\n  the boundary explicit.\n- gqlgen: changed from \"generated.go filename + content\" to \"Content\n  marker Code generated by github.com/99designs/gqlgen (no filename\n  heuristic — generated.go too generic)\". Matches CHANGELOG.md wording.\n- ent: minor whitespace normalization; no content change.\n\nREADME.md:\n- mockgen: removed mock_ prefix from the table, matching FEATURES.md.\n  The row now reads \"_mock.go suffix + content\".\n- gqlgen: changed from \"generated.go filename + content\" to\n  \"Content marker\". Consistent with FEATURES.md and CHANGELOG.md.\n\nRationale for the mock_ prefix split (from 979b84f):\n- mockgen (uber-go/mock): uses _mock.go suffix convention by default.\n  The mock_ prefix was never a primary convention for this tool.\n- mockery (vektra/mockery): uses mock_ prefix and \"Code generated by\n  mockery\" content marker. The prefix is part of its documented output\n  naming scheme.\n- These two tools are distinct; overlapping heuristics caused false\n  positives in the overlap zone. The fix assigns mock_ exclusively to\n  mockery and _mock.go exclusively to mockgen.\n\nRationale for gqlgen content-only detection:\n- gqlgen's default output naming is configurable (output: mode, file\n  name template). The generated.go filename is a common but not\n  guaranteed convention. A filename-only heuristic would produce false\n  negatives for non-default configs and false positives for any other\n  tool that happens to emit a file named generated.go.\n- The content marker \"Code generated by github.com/99designs/gqlgen\" is\n  authoritative and unambiguous.\n\nNo code changes — this commit is documentation-only.",
          "timestamp": "2026-06-11T10:41:07+02:00",
          "tree_id": "a1088c47c4a2f5d23f1015d18a1e7ebf94c6638a",
          "url": "https://github.com/LarsArtmann/gogenfilter/commit/dd6ba77afa2ab984be27da40dceff4b674fa50b2"
        },
        "date": 1781167334935,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkFilter/enabled",
            "value": 205.7,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "5623761 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - ns/op",
            "value": 205.7,
            "unit": "ns/op",
            "extra": "5623761 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "5623761 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/enabled - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "5623761 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled",
            "value": 2.83,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "423004950 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - ns/op",
            "value": 2.83,
            "unit": "ns/op",
            "extra": "423004950 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "423004950 times\n4 procs"
          },
          {
            "name": "BenchmarkFilter/disabled - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "423004950 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated",
            "value": 182.3,
            "unit": "ns/op\t      64 B/op\t       2 allocs/op",
            "extra": "6535831 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - ns/op",
            "value": 182.3,
            "unit": "ns/op",
            "extra": "6535831 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "6535831 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectGenerated - allocs/op",
            "value": 2,
            "unit": "allocs/op",
            "extra": "6535831 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated",
            "value": 13.95,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "90674778 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - ns/op",
            "value": 13.95,
            "unit": "ns/op",
            "extra": "90674778 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "90674778 times\n4 procs"
          },
          {
            "name": "BenchmarkIsSQLCGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "90674778 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated",
            "value": 14.74,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "81684241 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - ns/op",
            "value": 14.74,
            "unit": "ns/op",
            "extra": "81684241 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "81684241 times\n4 procs"
          },
          {
            "name": "BenchmarkIsProtobufGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "81684241 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated",
            "value": 7.451,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "160543551 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - ns/op",
            "value": 7.451,
            "unit": "ns/op",
            "extra": "160543551 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "160543551 times\n4 procs"
          },
          {
            "name": "BenchmarkIsGenericGenerated - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "160543551 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact",
            "value": 81.81,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "14896166 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - ns/op",
            "value": 81.81,
            "unit": "ns/op",
            "extra": "14896166 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "14896166 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/exact - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "14896166 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard",
            "value": 97.19,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "12400087 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - ns/op",
            "value": 97.19,
            "unit": "ns/op",
            "extra": "12400087 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "12400087 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/wildcard - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "12400087 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar",
            "value": 145.5,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "8316332 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - ns/op",
            "value": 145.5,
            "unit": "ns/op",
            "extra": "8316332 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "8316332 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/doublestar - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "8316332 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question",
            "value": 49.94,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "24008514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - ns/op",
            "value": 49.94,
            "unit": "ns/op",
            "extra": "24008514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "24008514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/question - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "24008514 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match",
            "value": 155.6,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "7696406 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - ns/op",
            "value": 155.6,
            "unit": "ns/op",
            "extra": "7696406 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "7696406 times\n4 procs"
          },
          {
            "name": "BenchmarkMatchPattern/no_match - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "7696406 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only",
            "value": 1633,
            "unit": "ns/op\t    1736 B/op\t       8 allocs/op",
            "extra": "676304 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - ns/op",
            "value": 1633,
            "unit": "ns/op",
            "extra": "676304 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - B/op",
            "value": 1736,
            "unit": "B/op",
            "extra": "676304 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/filename_only - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "676304 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based",
            "value": 2755,
            "unit": "ns/op\t    1784 B/op\t       9 allocs/op",
            "extra": "425754 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - ns/op",
            "value": 2755,
            "unit": "ns/op",
            "extra": "425754 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - B/op",
            "value": 1784,
            "unit": "B/op",
            "extra": "425754 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/content_based - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "425754 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered",
            "value": 2144,
            "unit": "ns/op\t    1720 B/op\t       7 allocs/op",
            "extra": "547659 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - ns/op",
            "value": 2144,
            "unit": "ns/op",
            "extra": "547659 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - B/op",
            "value": 1720,
            "unit": "B/op",
            "extra": "547659 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReason/not_filtered - allocs/op",
            "value": 7,
            "unit": "allocs/op",
            "extra": "547659 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename",
            "value": 1942,
            "unit": "ns/op\t    2392 B/op\t      12 allocs/op",
            "extra": "584325 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - ns/op",
            "value": 1942,
            "unit": "ns/op",
            "extra": "584325 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - B/op",
            "value": 2392,
            "unit": "B/op",
            "extra": "584325 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/sqlc_filename - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "584325 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered",
            "value": 2450,
            "unit": "ns/op\t    2312 B/op\t      11 allocs/op",
            "extra": "471037 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - ns/op",
            "value": 2450,
            "unit": "ns/op",
            "extra": "471037 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - B/op",
            "value": 2312,
            "unit": "B/op",
            "extra": "471037 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonReader/not_filtered - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "471037 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/filename_only",
            "value": 1667,
            "unit": "ns/op\t    1736 B/op\t       8 allocs/op",
            "extra": "670370 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/filename_only - ns/op",
            "value": 1667,
            "unit": "ns/op",
            "extra": "670370 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/filename_only - B/op",
            "value": 1736,
            "unit": "B/op",
            "extra": "670370 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/filename_only - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "670370 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/content_based",
            "value": 3926,
            "unit": "ns/op\t    2024 B/op\t      14 allocs/op",
            "extra": "299520 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/content_based - ns/op",
            "value": 3926,
            "unit": "ns/op",
            "extra": "299520 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/content_based - B/op",
            "value": 2024,
            "unit": "B/op",
            "extra": "299520 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/content_based - allocs/op",
            "value": 14,
            "unit": "allocs/op",
            "extra": "299520 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/not_filtered",
            "value": 3174,
            "unit": "ns/op\t    1896 B/op\t      12 allocs/op",
            "extra": "364186 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/not_filtered - ns/op",
            "value": 3174,
            "unit": "ns/op",
            "extra": "364186 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/not_filtered - B/op",
            "value": 1896,
            "unit": "B/op",
            "extra": "364186 times\n4 procs"
          },
          {
            "name": "BenchmarkDetectReasonFileFS/not_filtered - allocs/op",
            "value": 12,
            "unit": "allocs/op",
            "extra": "364186 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError",
            "value": 4.236,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "283576750 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - ns/op",
            "value": 4.236,
            "unit": "ns/op",
            "extra": "283576750 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "283576750 times\n4 procs"
          },
          {
            "name": "BenchmarkNewProjectRootError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "283576750 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError",
            "value": 2.926,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "405577578 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - ns/op",
            "value": 2.926,
            "unit": "ns/op",
            "extra": "405577578 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "405577578 times\n4 procs"
          },
          {
            "name": "BenchmarkNewSQLCConfigError - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "405577578 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError",
            "value": 386.5,
            "unit": "ns/op\t     144 B/op\t       3 allocs/op",
            "extra": "3101966 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - ns/op",
            "value": 386.5,
            "unit": "ns/op",
            "extra": "3101966 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - B/op",
            "value": 144,
            "unit": "B/op",
            "extra": "3101966 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorError - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3101966 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError",
            "value": 499.6,
            "unit": "ns/op\t     176 B/op\t       5 allocs/op",
            "extra": "2391816 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - ns/op",
            "value": 499.6,
            "unit": "ns/op",
            "extra": "2391816 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - B/op",
            "value": 176,
            "unit": "B/op",
            "extra": "2391816 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorError - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "2391816 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs",
            "value": 11.64,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - ns/op",
            "value": 11.64,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkProjectRootErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs",
            "value": 11.78,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - ns/op",
            "value": 11.78,
            "unit": "ns/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "100000000 times\n4 procs"
          },
          {
            "name": "BenchmarkSQLCConfigErrorIs - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "100000000 times\n4 procs"
          }
        ]
      }
    ]
  }
}