#!/bin/bash

# This script is used for Vercel deployments

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the application
npm run build
