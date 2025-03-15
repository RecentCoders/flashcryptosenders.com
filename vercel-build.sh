#!/bin/bash

# Install required TypeScript dependencies if they're missing
if ! grep -q '"@types/node"' package.json; then
  echo "Installing missing @types/node dependency..."
  npm install --save-dev @types/node
fi

# Run the Next.js build
next build

