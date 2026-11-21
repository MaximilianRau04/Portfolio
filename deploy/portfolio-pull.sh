#!/usr/bin/env bash
################################################################################
# Auto-deploy for the portfolio: fast-forwards /var/www/portfolio to
# origin/main. Run it from portfolio-pull.timer every few minutes.
#
# - Does nothing if origin/main has not moved.
# - Only fast-forwards; if the server checkout has local commits or edits,
#   it fails and leaves everything as it is (check the journal).
# - Git runs as the owner of the checkout, so file ownership stays the same.
# - If backend/ changed, reinstalls dependencies and restarts the backend.
#   The frontend is static, Caddy serves the new files right away.
#
# Config (environment):
#   PORTFOLIO_DIR     checkout to update   (default: /var/www/portfolio)
#   PORTFOLIO_BRANCH  branch to follow     (default: main)
#
# Install:
#   sudo install -m 755 deploy/portfolio-pull.sh /usr/local/bin/portfolio-pull
################################################################################

set -euo pipefail

DIR="${PORTFOLIO_DIR:-/var/www/portfolio}"
BRANCH="${PORTFOLIO_BRANCH:-main}"
OWNER="$(stat -c %U "$DIR")"

as_owner() { runuser -u "$OWNER" -- "$@"; }

as_owner git -C "$DIR" fetch --quiet origin "$BRANCH"
old="$(as_owner git -C "$DIR" rev-parse HEAD)"
new="$(as_owner git -C "$DIR" rev-parse "origin/$BRANCH")"
[[ "$old" == "$new" ]] && exit 0

as_owner git -C "$DIR" merge --ff-only --quiet "origin/$BRANCH"
echo "deployed ${old:0:7} -> ${new:0:7}"

if ! as_owner git -C "$DIR" diff --quiet "$old" "$new" -- backend/; then
    (cd "$DIR/backend" && as_owner npm install --omit=dev --no-audit --no-fund)
    systemctl restart portfolio-backend
    echo "backend changed, restarted portfolio-backend"
fi
