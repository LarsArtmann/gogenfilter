window.BENCHMARK_DATA = {
  "lastUpdate": 1777907174105,
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
      }
    ]
  }
}