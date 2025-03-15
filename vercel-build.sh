#!/bin/bash

# Install required TypeScript dependencies if they're missing
if ! grep -q '"@types/node"' package.json; then
  echo "Installing missing @types/node dependency..."
  npm install --save-dev @types/node
fi

# Ensure @next/bundle-analyzer is installed
if ! npm list @next/bundle-analyzer --depth=0 | grep -q '@next/bundle-analyzer'; then
  echo "Installing @next/bundle-analyzer..."
  npm install --save-dev @next/bundle-analyzer
fi

# Run the Next.js build
next build

