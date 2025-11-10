#!/bin/bash
set -e
BASE="${1:-http://localhost:3000}"
echo "Smoke testing $BASE"
curl -s -o /dev/null -w "%{http_code}\n" "$BASE" | grep -E "200|3.."
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/booking" | grep -E "200|3.."
echo "OK"
