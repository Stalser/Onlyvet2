#!/bin/bash
set -e
REPO_URL="$1"
if [ -z "$REPO_URL" ]; then
  echo "Usage: ./scripts/setup-github.sh https://github.com/<login>/onlyvet.git"
  exit 1
fi
git init
git add .
git commit -m "OnlyVet: initial"
git branch -M main
git remote add origin "$REPO_URL"
git push -u origin main
