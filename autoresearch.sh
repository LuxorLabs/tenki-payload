#!/usr/bin/env bash
set -euo pipefail

export PAYLOAD_SECRET=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
export NEXT_PUBLIC_SITE_URL=http://localhost:3000
export NODE_OPTIONS="--no-deprecation --max-old-space-size=8000"

# Clean previous build
rm -rf .next

# Run Next.js build — compilation will succeed even though static generation
# fails (no local D1 database). Bundle sizes are determined at compile time.
npx next build --no-lint 2>&1 || true

# Measure total gzipped size of all client-side JS
total_gz=0
while IFS= read -r -d '' f; do
  gz=$(gzip -c "$f" | wc -c | tr -d ' ')
  total_gz=$((total_gz + gz))
done < <(find .next/static -name "*.js" -print0 2>/dev/null)

echo ""
echo "=== AUTORESEARCH METRIC ==="
echo "total_gzipped_client_js_bytes=${total_gz}"
echo "total_gzipped_client_js_kb=$(echo "scale=1; ${total_gz}/1024" | bc)"
echo "==========================="
