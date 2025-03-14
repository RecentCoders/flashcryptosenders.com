#!/bin/bash

# Exit on error
set -e

# This script is used for Vercel deployments

# Install dependencies using npm
echo "Installing dependencies..."
npm install --no-audit --prefer-offline

# Run the build
echo "Building application..."
npm run build

# Run bundle analysis if required
if [ "$ANALYZE" = "true" ]; then
  echo "Running bundle analysis..."
  npm run analyze
fi
