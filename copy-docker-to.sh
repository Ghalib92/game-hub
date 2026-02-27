#!/bin/bash

# ============================================
# Docker Template Copy Script
# ============================================
# Usage: ./copy-docker-to.sh /path/to/target/project
# ============================================

set -e

# Check if target directory is provided
if [ -z "$1" ]; then
  echo "❌ Error: No target directory specified"
  echo ""
  echo "Usage: ./copy-docker-to.sh /path/to/target/project"
  echo ""
  echo "Example:"
  echo "  ./copy-docker-to.sh ../my-new-react-app"
  exit 1
fi

TARGET_DIR="$1"

# Check if target directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Error: Directory '$TARGET_DIR' does not exist"
  exit 1
fi

echo "📦 Copying Docker files to: $TARGET_DIR"
echo ""

# Files to copy
FILES=(
  "Dockerfile"
  "docker-compose.yml"
  "docker-compose.prod.yml"
  "nginx.conf"
  ".dockerignore"
  ".env.example"
  "DOCKER.md"
  "DOCKER_TEMPLATE_CHECKLIST.md"
)

# Copy each file
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    cp "$file" "$TARGET_DIR/"
    echo "✅ Copied: $file"
  else
    echo "⚠️  Skipped: $file (not found)"
  fi
done

echo ""
echo "✨ Done! Docker files copied successfully."
echo ""
echo "Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. Copy .env.example to .env and fill in your values"
echo "3. Review DOCKER_TEMPLATE_CHECKLIST.md for customization"
echo "4. Update environment variable names in compose files"
echo "5. Run: docker compose run --rm dev npm install"
echo "6. Run: docker compose up"
echo ""
