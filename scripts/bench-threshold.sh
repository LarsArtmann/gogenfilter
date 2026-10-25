#!/usr/bin/env bash
# Compare benchmark output against a committed baseline.
#
# Usage: bench-threshold.sh <bench-output.txt> [baseline.txt]
#
# Parses `go test -bench` lines (`BenchmarkX-16  <runs>  <ns/op> ns/op`), joins
# on the benchmark name against the baseline, and applies the migration plan's
# thresholds: >=150% of baseline = warning, >=300% = failure. Pure awk — the
# runner has no bc (unit PATH, forgejo.nix:1318-1332).
#
# Baseline format: same bench output lines (a raw `go test -bench` capture).
# Missing baseline -> bootstrap mode: prints the current output as the
# baseline to commit and exits 0 (a missing bar must not fail the first run;
# a present bar is strict). Benchmarks absent from the baseline are reported
# as new, never as regressions. Bench count machinery (-16 suffix) is stripped
# so results compare across GOMAXPROCS.
set -euo pipefail

out="${1:?usage: bench-threshold.sh <bench-output.txt> [baseline.txt]}"
base="${2:-}"
alert_ratio="${BENCH_ALERT_RATIO:-1.5}"
fail_ratio="${BENCH_FAIL_RATIO:-3.0}"

[ -f "$out" ] || { echo "error: bench output '$out' not found" >&2; exit 2; }

parse_bench() {
  # name -> ns/op (float). Fields: $1=name $2=runs $3=value $4=ns/op
  awk '$1 ~ /^Benchmark/ && $4 == "ns/op" { name = $1; sub(/-[0-9]+$/, "", name); print name, $3 }' "$1"
}

if [ -z "$base" ] || [ ! -f "$base" ]; then
  echo "No baseline (${base:-<none>}) — bootstrap mode. Commit this output as the baseline:"
  echo
  grep -E '^Benchmark.*[[:space:]]ns/op' "$out" || echo "(no benchmarks found in output!)"
  echo
  echo "cp benchmark-output.txt testdata/bench-baseline.txt && git add testdata/bench-baseline.txt"
  exit 0
fi

parse_bench "$out"  > /tmp/bench-cur.$$
parse_bench "$base" > /tmp/bench-base.$$

failed=0
warned=0
joined=$(join -j 1 -o 0,1.2,2.2 /tmp/bench-base.$$ /tmp/bench-cur.$$)
if [ -z "$joined" ]; then
  echo "::warning::No benchmarks overlap the baseline — check for renamed/removed benchmarks."
fi
while read -r name base_val cur_val; do
  ratio=$(awk -v c="$cur_val" -v b="$base_val" 'BEGIN { printf "%.3f", (b + 0 > 0) ? c / b : 0 }')
  verdict="ok"
  if awk -v r="$ratio" -v f="$fail_ratio" 'BEGIN { exit !(r >= f) }'; then
    verdict="FAIL"
    failed=1
  elif awk -v r="$ratio" -v a="$alert_ratio" 'BEGIN { exit !(r >= a) }'; then
    verdict="ALERT"
    warned=1
  fi
  printf '%-50s %10s -> %10s ns/op  (%5.1f%% of baseline)  %s\n' \
    "$name" "$base_val" "$cur_val" "$(awk -v r="$ratio" 'BEGIN { print r * 100 }')" "$verdict"
done <<< "$joined"

new_benchs=$(comm -13 <(cut -d' ' -f1 /tmp/bench-base.$$ | sort) <(cut -d' ' -f1 /tmp/bench-cur.$$ | sort))
if [ -n "$new_benchs" ]; then
  echo "New benchmarks (no baseline yet): $(echo "$new_benchs" | tr '\n' ' ')"
fi
removed_benchs=$(comm -23 <(cut -d' ' -f1 /tmp/bench-base.$$ | sort) <(cut -d' ' -f1 /tmp/bench-cur.$$ | sort))
if [ -n "$removed_benchs" ]; then
  echo "Benchmarks removed since baseline: $(echo "$removed_benchs" | tr '\n' ' ')"
fi

rm -f /tmp/bench-cur.$$ /tmp/bench-base.$$

if [ "$failed" -eq 1 ]; then
  echo "::error::Benchmark regression >= ${fail_ratio}x baseline (fail threshold). If this slowdown is deliberate (e.g. a feature tradeoff), regenerate the baseline: cd <repo> && nix shell nixpkgs#go_1_27 -c go test -bench=. -benchmem -run='^$' ./... > testdata/bench-baseline.txt"
  exit 1
fi
if [ "$warned" -eq 1 ]; then
  echo "::warning::Benchmark alert >= ${alert_ratio}x baseline. Watch it; regenerate the baseline only deliberately."
fi
echo "Benchmark thresholds passed."
