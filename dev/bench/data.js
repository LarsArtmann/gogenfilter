window.BENCHMARK_DATA = {
  "lastUpdate": 1777905785653,
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
      }
    ]
  }
}