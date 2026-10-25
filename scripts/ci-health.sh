#!/usr/bin/env bash
# CI run-health check for this repo's Forgejo Actions.
#
# Usage: ci-health.sh [owner/repo] [zombie-minutes]
#   owner/repo      default: lars/gogenfilter (override for other repos)
#   zombie-minutes  a run still in flight after this many minutes is flagged
#                   as a zombie (default: 60)
#
# Environment:
#   FORGEJO_URL    default: https://forgejo.home.lan
#   FORGEJO_TOKEN  optional; anonymous reads work for public repos with the
#                  Actions unit enabled
#
# Forgejo v15.0.10 has a known Actions log-transfer regression where runs can
# hang after completion (#14843, fix pending) — this is the watch for that
# class. Tries the GitHub-compatible /actions/runs endpoint first and falls
# back to the older /actions/tasks; status vocabularies of both are accepted.
# Exit codes: 0 healthy, 1 zombies detected, 2 usage/API error. Designed for
# cron/Gatus or a manual check before cutting a release.
set -euo pipefail

repo="${1:-lars/gogenfilter}"
zombie_minutes="${2:-60}"
base="${FORGEJO_URL:-https://forgejo.home.lan}"
now=$(date +%s)

auth=()
[ -n "${FORGEJO_TOKEN:-}" ] && auth=(-H "Authorization: token $FORGEJO_TOKEN")

response=""
last_code=""
for endpoint in "actions/runs" "actions/tasks"; do
	api_url="$base/api/v1/repos/$repo/$endpoint"
	last_code=$(curl -s -o /tmp/ci-health-response.$$ -m 30 -w "%{http_code}" "${auth[@]}" "$api_url" || echo 000)
	if [ "$last_code" = "200" ]; then
		response=$(cat /tmp/ci-health-response.$$)
		break
	fi
done
rm -f /tmp/ci-health-response.$$

if [ -z "$response" ]; then
	echo "error: no working Actions API endpoint for $repo (last HTTP $last_code)." >&2
	echo "hint: the repo needs the Actions unit enabled and be public (or set FORGEJO_TOKEN)." >&2
	echo "      Pre-flip mirrors have Actions disabled — this is expected there." >&2
	exit 2
fi

total=$(jq '.total_count // (.workflow_runs | length) // 0' <<<"$response")
if [ "$total" -eq 0 ]; then
	echo "No Action runs recorded for $repo yet."
	exit 0
fi

# Normalize: status may be GitHub-style (queued/in_progress) or Forgejo-style
# (running/waiting/blocked/pending); started time epoch seconds or RFC3339.
zombies=$(jq -r --argjson now "$now" --argjson zm "$zombie_minutes" '
  def toepoch:
    if type == "number" then .
    elif (. == null or . == 0 or . == "") then 0
    else
      ((try (strptime("%Y-%m-%dT%H:%M:%SZ") | mktime) // null)
       // (try (sub("\\.[0-9]+Z$"; "Z") | strptime("%Y-%m-%dT%H:%M:%SZ") | mktime) // null)
       // 0)
    end;
  [.workflow_runs[]
    | {id: (.id // .run_number // "?"),
       name: (.name // (.head_branch // "?")),
       status: (.status // "?"),
       url: (.html_url // ""),
       started: ((.run_started_at // .started_at // null) | toepoch)}]
  | map(select(.status == "running" or .status == "in_progress" or .status == "queued"
               or .status == "waiting" or .status == "blocked" or .status == "pending"))
  | map(select((.started == 0) or ($now - .started) > ($zm * 60)))
  | .[] | "\(.id)\t\(.name)\t\(.status)\t\(.url)"
' <<<"$response")

if [ -n "$zombies" ]; then
	echo "ZOMBIE/WEDGED RUNS detected in $repo (in flight > ${zombie_minutes}m):"
	echo "id	name	status	url"
	echo "$zombies"
	echo
	echo "Remedy: re-run or cancel them in the Forgejo UI, or delete stale rows"
	echo "via the API — see SystemNix/docs/services/forgejo.md (zombie #14843)."
	exit 1
fi

in_flight=$(jq '[.workflow_runs[] | select((.status // "") == "running" or (.status // "") == "in_progress" or (.status // "") == "queued" or (.status // "") == "waiting")] | length' <<<"$response")
echo "$repo: healthy. $total runs known, $in_flight legitimately in flight, no zombies > ${zombie_minutes}m."
