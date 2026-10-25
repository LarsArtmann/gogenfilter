#!/usr/bin/env bash
# CI run-health check for this repo's Forgejo Actions.
#
# Usage: ci-health.sh [owner/repo] [zombie-minutes]
#   owner/repo      default: lars/gogenfilter (override for other repos)
#   zombie-minutes  a run still "running/waiting/blocked" after this many
#                   minutes is flagged as a zombie (default: 60)
#
# Environment:
#   FORGEJO_URL   default: https://forgejo.home.lan
#   FORGEJO_TOKEN optional; anonymous reads work for public repos
#
# Forgejo v15.0.10 has a known Actions log-transfer regression where runs can
# hang as zombies after completion (#14843, fix pending) — this is the watch
# for that class. Exit codes: 0 healthy, 1 zombies/wedge detected, 2 usage/API
# error. Designed for cron/Gatus or a manual check before cutting a release.
set -euo pipefail

repo="${1:-lars/gogenfilter}"
zombie_minutes="${2:-60}"
base="${FORGEJO_URL:-https://forgejo.home.lan}"
now=$(date +%s)

api_url="$base/api/v1/repos/$repo/actions/tasks"
auth=()
[ -n "${FORGEJO_TOKEN:-}" ] && auth=(-H "Authorization: token $FORGEJO_TOKEN")

response=$(curl -sf --compressed -m 30 "${auth[@]}" "$api_url") || {
  echo "error: API call failed: $api_url" >&2
  echo "hint: is the repo public, or is FORGEJO_TOKEN set and valid?" >&2
  exit 2
}

total=$(jq '.total_count // (.workflow_runs | length) // 0' <<<"$response")
if [ "$total" -eq 0 ]; then
  echo "No Action runs recorded for $repo yet."
  exit 0
fi

# Older Forgejo/Gitea versions differ on whether `status` is a name or a
# number; normalize: numbers 1/2/3/4 = running classes (1=success? no —
# treat unknowns as healthy and only flag explicit in-flight names), strings
# are matched directly. started/ended epoch seconds arrive as int or ISO —
# normalize ISO to epoch.
zombies=$(jq -r --argjson now "$now" --argjson zm "$zombie_minutes" '
  def toepoch:
    if type == "number" then .
    elif . == null or . == 0 then 0
    else (strptime("%Y-%m-%dT%H:%M:%SZ") | mktime) end;
  .workflow_runs[]
  | {id: (.id // .run_number), name: (.name // .workflow_id // "?"),
     status: (.status // "?"), started: ((.run_started_at // .started_at // null) | toepoch)}
  | select(.status == "running" or .status == "waiting" or .status == "blocked" or .status == "pending")
  | select((.started == 0) or ($now - .started) > ($zm * 60))
  | "\(.id)\t\(.name)\t\(.status)\tstarted=\(.started)"
' <<<"$response")

if [ -n "$zombies" ]; then
  echo "ZOMBIE/WEDGED RUNS detected in $repo (in-flight > ${zombie_minutes}m):"
  echo "id	name	status	started"
  echo "$zombies"
  echo
  echo "Remedy: re-run or cancel them in the Forgejo UI (Actions), or via API"
  echo "DELETE $api_url-run/<id> — see SystemNix/docs/services/forgejo.md."
  exit 1
fi

in_flight=$(jq '[.workflow_runs[] | select((.status // "") == "running" or (.status // "") == "waiting")] | length' <<<"$response")
echo "$repo: healthy. $total runs known, $in_flight legitimately in flight, no zombies > ${zombie_minutes}m."
