#!/usr/bin/env node

/**
 * This script checks the environment configuration before app startup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Display environment information
console.log('🔍 Environment Check');
console.log('==================');
console.log(`Node Version: ${process.version}`);
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

// Check for required directories
const requiredDirs = ['public', 'app'];
requiredDirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Required directory missing: ${dir}`);
    process.exit(1);
  }
});

// Check for required config files
const requiredFiles = ['next.config.js', 'next.config.mjs', 'tailwind.config.js'].filter(
  file => fs.existsSync(path.join(process.cwd(), file))
);

if (requiredFiles.length === 0) {
  console.error('❌ No valid Next.js configuration found');
  process.exit(1);
}

console.log(`✅ Found config files: ${requiredFiles.join(', ')}`);

// Check Next.js version
try {
  const packageJson = require(path.join(process.cwd(), 'package.json'));
  console.log(`Next.js version: ${packageJson.dependencies.next || 'unknown'}`);
  console.log(`React version: ${packageJson.dependencies.react || 'unknown'}`);
} catch (error) {
  console.warn('⚠️ Could not determine Next.js version');
}

// All checks passed
console.log('✅ Environment check complete. Ready to build!');
