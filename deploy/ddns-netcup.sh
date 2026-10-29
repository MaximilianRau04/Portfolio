#!/usr/bin/env bash
################################################################################
# DynDNS updater for raudev.com via the netcup CCP DNS API
#
# The server sits behind a Telekom line whose public IPv4 changes from time to
# time. This script looks up the current IPv4 and, if it differs from the last
# one it saw, points the configured A records at it. Run it from
# ddns-netcup.timer every few minutes.
#
# Only A records whose hostname is listed in DDNS_HOSTS are touched, so
# records like compass (VPN IP) stay as they are.
#
# Config (environment, see ddns-netcup.env.example):
#   NETCUP_CUSTOMER_NUMBER, NETCUP_API_KEY, NETCUP_API_PASSWORD
#   DDNS_DOMAIN   zone to update               (default: raudev.com)
#   DDNS_HOSTS    space separated hostnames    (default: @)
#
# Needs: curl, jq
#
# Install:
#   sudo install -m 755 deploy/ddns-netcup.sh /usr/local/bin/ddns-netcup
################################################################################

set -euo pipefail

API_URL="https://ccp.netcup.net/run/webservice/servers/endpoint.php?JSON"
DOMAIN="${DDNS_DOMAIN:-raudev.com}"
HOSTS="${DDNS_HOSTS:-@}"
STATE_FILE="${STATE_DIRECTORY:-/var/lib/ddns-netcup}/last_ip"

: "${NETCUP_CUSTOMER_NUMBER:?not set}"
: "${NETCUP_API_KEY:?not set}"
: "${NETCUP_API_PASSWORD:?not set}"

log() { echo "ddns-netcup: $*" >&2; }

get_ipv4() {
    local url ip
    for url in https://api.ipify.org https://ipv4.icanhazip.com; do
        ip="$(curl -4 -fsS -m 10 "$url" 2>/dev/null | tr -d '[:space:]')" || continue
        if [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
            echo "$ip"
            return 0
        fi
    done
    return 1
}

# Calls one API action, prints responsedata, fails on anything but "success".
api() {
    local action="$1" params="$2" response
    response="$(curl -fsS -m 30 -H 'Content-Type: application/json' \
        -d "$(jq -n --arg a "$action" --argjson p "$params" '{action: $a, param: $p}')" \
        "$API_URL")"
    if [[ "$(jq -r '.status' <<<"$response")" != "success" ]]; then
        log "$action failed: $(jq -r '"\(.statuscode) \(.shortmessage) \(.longmessage)"' <<<"$response")"
        return 1
    fi
    jq '.responsedata' <<<"$response"
}

ip="$(get_ipv4)" || { log "could not determine public IPv4"; exit 1; }

if [[ -f "$STATE_FILE" && "$(cat "$STATE_FILE")" == "$ip" ]]; then
    exit 0
fi

auth="$(jq -n --arg c "$NETCUP_CUSTOMER_NUMBER" --arg k "$NETCUP_API_KEY" \
    '{customernumber: $c, apikey: $k}')"

session="$(api login "$(jq --arg p "$NETCUP_API_PASSWORD" '. + {apipassword: $p}' <<<"$auth")" \
    | jq -r '.apisessionid')"
auth="$(jq --arg s "$session" --arg d "$DOMAIN" '. + {apisessionid: $s, domainname: $d}' <<<"$auth")"
trap 'api logout "$auth" >/dev/null || true' EXIT

records="$(api infoDnsRecords "$auth" | jq '.dnsrecords')"
hosts_json="$(jq -nc --arg h "$HOSTS" '$h | split(" ") | map(select(. != ""))')"

missing="$(jq -r --argjson h "$hosts_json" \
    '[$h[] as $n | select([.[] | select(.type == "A" and .hostname == $n)] | length == 0) | $n] | join(" ")' \
    <<<"$records")"
if [[ -n "$missing" ]]; then
    log "no A record found for: $missing"
    exit 1
fi

changed="$(jq --argjson h "$hosts_json" --arg ip "$ip" \
    '[.[] | select(.type == "A" and (.hostname | IN($h[])) and .destination != $ip)
          | .destination = $ip]' \
    <<<"$records")"

if [[ "$(jq 'length' <<<"$changed")" -gt 0 ]]; then
    api updateDnsRecords "$(jq --argjson r "$changed" '. + {dnsrecordset: {dnsrecords: $r}}' <<<"$auth")" >/dev/null
    log "updated $(jq -r 'map(.hostname) | join(", ")' <<<"$changed") in $DOMAIN to $ip"
else
    log "records in $DOMAIN already point to $ip"
fi

echo "$ip" >"$STATE_FILE"
