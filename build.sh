#!/bin/bash

# Exit on error
set -e

# Clean up
echo "Cleaning..."
rm -rf node_modules/.cache
rm -rf .next

# Ensure correct Node version
echo "Setting up Node environment..."
. ~/.nvm/nvm.sh
nvm use 18

# Update lockfile and install dependencies
echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

# Run the build
echo "Building application..."
pnpm run build

# Run bundle analysis if required
if [ "$ANALYZE" = "true" ]; then
  echo "Running bundle analysis..."
  pnpm run analyze
fi
