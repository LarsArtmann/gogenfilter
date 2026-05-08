window.BENCHMARK_DATA = {
  "lastUpdate": 1778204748640,
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
      }
    ]
  }
}