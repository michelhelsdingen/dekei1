#!/bin/bash
# Deploy dekei1 and auto-fix Cloudflare tunnel routing
set -euo pipefail

# Config
COOLIFY_UUID="j8080k0ooccoooccow00k0s8"
COOLIFY_API="https://coolify.helsdingen.com/api/v1"
COOLIFY_TOKEN="1|TOxVqConZmctinHtv6cRbYZPmU3SvEez9O2q3UkY6c266a72"
CF_ACCOUNT="91a07c8e79b284d2ec64e001fa28fdda"
CF_TUNNEL="b88ebaa5-fd96-4d74-9076-06a10f8d7664"
CF_EMAIL="michel@helsdingen.com"
CF_KEY="ec80358daa6f073203b69cc1fdad2bcc2e7fc"
HOSTNAME="dekei1.ltcdekei.nl"

echo "=== DE KEI 1 Deploy ==="

# 1. Push to git (Coolify auto-deploys on push)
echo "[1/4] Pushing to git..."
git push

# 2. Trigger deploy via Coolify API
echo "[2/4] Triggering Coolify deploy..."
curl -s -X POST "$COOLIFY_API/deploy?uuid=$COOLIFY_UUID&force=true" \
  -H "Authorization: Bearer $COOLIFY_TOKEN" \
  -H "Content-Type: application/json" > /dev/null

# 3. Wait for new container to come up
echo "[3/4] Waiting for new container (up to 120s)..."
for i in $(seq 1 24); do
  sleep 5
  CONTAINER=$(ssh plex "docker ps --filter name=$COOLIFY_UUID --format '{{.Names}}'" 2>/dev/null | head -1)
  if [ -n "$CONTAINER" ]; then
    # Check if container is healthy/running
    STATUS=$(ssh plex "docker inspect --format='{{.State.Status}}' $CONTAINER" 2>/dev/null || echo "")
    if [ "$STATUS" = "running" ]; then
      echo "  Container ready: $CONTAINER"
      break
    fi
  fi
  echo "  Waiting... (${i}x5s)"
done

if [ -z "${CONTAINER:-}" ]; then
  echo "ERROR: No running container found after 120s"
  exit 1
fi

# 4. Update Cloudflare tunnel config
echo "[4/4] Updating Cloudflare tunnel config..."
NEW_SERVICE="http://${CONTAINER}:3000"

# Get current config
CURRENT=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/cfd_tunnel/$CF_TUNNEL/configurations" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "X-Auth-Key: $CF_KEY" \
  -H "Content-Type: application/json")

# Update the dekei1 service URL in the ingress config
UPDATED=$(echo "$CURRENT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
config = data['result']['config']
for rule in config['ingress']:
    if rule.get('hostname') == '$HOSTNAME':
        rule['service'] = '$NEW_SERVICE'
        break
print(json.dumps({'config': config}))
")

curl -s -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/cfd_tunnel/$CF_TUNNEL/configurations" \
  -H "X-Auth-Email: $CF_EMAIL" \
  -H "X-Auth-Key: $CF_KEY" \
  -H "Content-Type: application/json" \
  -d "$UPDATED" > /dev/null

echo ""
echo "=== Deploy complete ==="
echo "Service: $NEW_SERVICE"
echo "URL: https://$HOSTNAME"
