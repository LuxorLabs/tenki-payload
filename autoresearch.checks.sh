#!/usr/bin/env bash
set -euo pipefail

export NODE_OPTIONS="--no-deprecation"

echo "=== Type checking ==="
npx tsc --noEmit 2>&1

echo ""
echo "=== All checks passed ==="
