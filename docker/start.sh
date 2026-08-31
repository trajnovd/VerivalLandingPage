#!/bin/sh
set -e

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__ENV__ = {
  RECAPTCHA_SITE_KEY: "${RECAPTCHA_SITE_KEY:-}"
};
EOF

node /app/server/index.js &
exec nginx -g 'daemon off;'
