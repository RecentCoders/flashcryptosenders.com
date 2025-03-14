#!/usr/bin/env node

/**
 * Build analysis script
 * 
 * This script analyzes the production build output and generates a report
 * with performance insights, bundle size analysis, and optimization recommendations.
 * 
 * Usage:
 * - After a production build (npm run build), run:
 *   node scripts/analyze-bundle.js
 * 
 * Features:
 * - Bundle size analysis
 * - Chunk distribution visualization
 * - Performance recommendations
 * - Browser compatibility check
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const brotliSize = require('brotli-size');

// Configurable options
const options = {
  buildDir: path.join(process.cwd(), '.next'),
  includeBundleMap: true,
  includeBrowsersList: true,
  includeNodeModules: true,
  includeDependencyGraph: true,
  warnLimitKB: 250, // Warn if any single asset exceeds this size
  errorLimitKB: 500, // Error if any single asset exceeds this size
};

// ASCII art header
console.log(chalk.cyan('\n' +
  '┌─────────────────────────────────────────────────┐\n' +
  '│                                                 │\n' +
  '│   FlashCryptoSenders Build Analysis Report      │\n' +
  '│                                                 │\n' +
  '└─────────────────────────────────────────────────┘\n'));

// 1. Check if .next directory exists
if (!fs.existsSync(options.buildDir)) {
  console.error(chalk.red('❌ Build directory not found. Run npm run build first.'));
  process.exit(1);
}

// 2. Read and parse build manifest
console.log(chalk.white.bold('📊 Analyzing build output...'));

const buildIdPath = path.join(options.buildDir, 'BUILD_ID');
const buildManifestPath = path.join(options.buildDir, 'build-manifest.json');
const serverDirPath = path.join(options.buildDir, 'server');
const staticDirPath = path.join(options.buildDir, 'static');

let buildId;
try {
  buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
  console.log(chalk.gray(`   Build ID: ${buildId}`));
} catch (err) {
  console.warn(chalk.yellow('⚠️ Could not read BUILD_ID'));
}

let buildManifest;
try {
  buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));
} catch (err) {
  console.error(chalk.red('❌ Could not parse build manifest'));
  process.exit(1);
}

// 3. Collect client bundle statistics
const clientPages = buildManifest.pages || {};
const clientAssets = new Map();

// Collect all unique JS and CSS files
const allFiles = new Set();
Object.values(clientPages).forEach(files => {
  files.forEach(file => allFiles.add(file));
});

// 4. Analyze each file for size statistics
console.log(chalk.white.bold('\n📦 Client-side bundle analysis:'));

// Create table for static assets
const staticAssetsTable = new Table({
  head: [
    chalk.cyan('Asset Path'),
    chalk.cyan('Size'),
    chalk.cyan('Gzipped'),
    chalk.cyan('Brotli'),
    chalk.cyan('Type')
  ],
  colWidths: [60, 12, 12, 12, 10]
});

// Track totals for summary
let totalSizeBytes = 0;
let totalGzipBytes = 0;
let totalBrotliBytes = 0;
let jsFilesCount = 0;
let cssFilesCount = 0;
let imageFilesCount = 0;
let otherFilesCount = 0;

// Scan static directory recursively
function scanDirectory(dir, baseDir = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, relativePath);
    } else if (entry.isFile()) {
      // Skip source maps
      if (entry.name.endsWith('.map')) continue;
      
      const fileStats = fs.statSync(fullPath);
      const sizeBytes = fileStats.size;
      const gzipBytes = gzipSize.fileSync(fullPath);
      const brotliBytes = brotliSize.fileSync(fullPath);
      
      totalSizeBytes += sizeBytes;
      totalGzipBytes += gzipBytes;
      totalBrotliBytes += brotliBytes;
      
      // Determine file type
      let fileType = 'other';
      if (entry.name.endsWith('.js')) {
        fileType = 'js';
        jsFilesCount++;
      } else if (entry.name.endsWith('.css')) {
        fileType = 'css';
        cssFilesCount++;
      } else if (/\.(png|jpg|jpeg|gif|webp|avif|svg)$/.test(entry.name)) {
        fileType = 'image';
        imageFilesCount++;
      } else {
        otherFilesCount++;
      }
      
      // Add to the table
      let sizeColor = chalk.green;
      if (sizeBytes > options.errorLimitKB * 1024) {
        sizeColor = chalk.red;
      } else if (sizeBytes > options.warnLimitKB * 1024) {
        sizeColor = chalk.yellow;
      }
      
      staticAssetsTable.push([
        chalk.white(relativePath.length > 57 ? '...' + relativePath.slice(-54) : relativePath),
        sizeColor(filesize(sizeBytes)),
        chalk.gray(filesize(gzipBytes)),
        chalk.gray(filesize(brotliBytes)),
        chalk.cyan(fileType)
      ]);
      
      // Store client asset details
      clientAssets.set(relativePath, {
        path: relativePath,
        size: sizeBytes,
        gzip: gzipBytes,
        brotli: brotliBytes,
        type: fileType
      });
    }
  }
}

// Analyze static files
try {
  if (fs.existsSync(staticDirPath)) {
    scanDirectory(staticDirPath, 'static');
  }
} catch (err) {
  console.error(chalk.red(`❌ Error analyzing static directory: ${err.message}`));
}

// Output table with the top 20 largest assets
console.log(chalk.white.bold('\n🔍 Top 20 largest assets:'));
const sortedAssets = [...clientAssets.values()].sort((a, b) => b.size - a.size).slice(0, 20);

const top20Table = new Table({
  head: [
    chalk.cyan('Asset'),
    chalk.cyan('Size'),
    chalk.cyan('Gzipped'),
    chalk.cyan('Type')
  ],
  colWidths: [60, 12, 12, 10]
});

sortedAssets.forEach(asset => {
  const sizeFormatted = filesize(asset.size);
  const gzipFormatted = filesize(asset.gzip);
  
  let sizeColor = chalk.green;
  if (asset.size > options.errorLimitKB * 1024) {
    sizeColor = chalk.red;
  } else if (asset.size > options.warnLimitKB * 1024) {
    sizeColor = chalk.yellow;
  }
  
  top20Table.push([
    chalk.white(asset.path.length > 57 ? '...' + asset.path.slice(-54) : asset.path),
    sizeColor(sizeFormatted),
    chalk.gray(gzipFormatted),
    chalk.cyan(asset.type)
  ]);
});

console.log(top20Table.toString());

// Output summary statistics
console.log(chalk.white.bold('\n📊 Bundle Summary:'));
const summaryTable = new Table();

summaryTable.push(
  { 'Total Size': chalk.bold(filesize(totalSizeBytes)) },
  { 'Gzipped Size': chalk.gray(filesize(totalGzipBytes)) },
  { 'Brotli Size': chalk.gray(filesize(totalBrotliBytes)) },
  { 'JavaScript Files': chalk.yellow(`${jsFilesCount} files`) },
  { 'CSS Files': chalk.blue(`${cssFilesCount} files`) },
  { 'Image Files': chalk.magenta(`${imageFilesCount} files`) },
  { 'Other Files': chalk.gray(`${otherFilesCount} files`) }
);

console.log(summaryTable.toString());

// 5. Generate performance recommendations
console.log(chalk.white.bold('\n🚀 Performance Recommendations:'));

const recommendations = [];

// Check for large JavaScript bundles
const largeJsFiles = sortedAssets.filter(asset => 
  asset.type === 'js' && asset.size > options.warnLimitKB * 1024
);

if (largeJsFiles.length > 0) {
  recommendations.push(
    `🔴 ${largeJsFiles.length} JavaScript file(s) exceed ${options.warnLimitKB}KB. Consider code splitting or lazy loading.`
  );
}

// Check for unoptimized images
const largeImageFiles = sortedAssets.filter(asset => 
  asset.type === 'image' && asset.size > 100 * 1024 // 100KB
);

if (largeImageFiles.length > 0) {
  recommendations.push(
    `🔴 ${largeImageFiles.length} image(s) exceed 100KB. Consider further image optimization.`
  );
}

// Check gzip compression effectiveness
const poorlyCompressedFiles = sortedAssets.filter(asset => 
  asset.type === 'js' && (asset.gzip / asset.size > 0.7) // Less than 30% compression
);

if (poorlyCompressedFiles.length > 0) {
  recommendations.push(
    `🟠 ${poorlyCompressedFiles.length} file(s) have poor gzip compression ratios, suggesting possible minification issues.`
  );
}

// Check for modern syntax support
const modernBuildPath = path.join(options.buildDir, 'static/chunks');
if (!fs.existsSync(modernBuildPath)) {
  recommendations.push(
    `🟠 Modern output not detected. Consider enabling modern JavaScript output for better performance in modern browsers.`
  );
}

// Check total bundle size
if (totalGzipBytes > 300 * 1024) { // 300KB gzipped total
  recommendations.push(
    `🟠 Total bundle size exceeds 300KB gzipped. Consider tree-shaking and removing unused dependencies.`
  );
}

// Output recommendations
if (recommendations.length === 0) {
  console.log(chalk.green('✅ No significant issues detected in the bundle.'));
} else {
  recommendations.forEach(rec => {
    console.log(rec);
  });
}

// Best practices
console.log(chalk.white('\nBest practices:'));
console.log(chalk.gray('1. Use dynamic imports for route-specific code'));
console.log(chalk.gray('2. Implement resource preloading using <ResourcePreloadManager>'));
console.log(chalk.gray('3. Optimize images with Next.js Image component'));
console.log(chalk.gray('4. Minimize third-party scripts and use async/defer'));
console.log(chalk.gray('5. Monitor Core Web Vitals in production using PerformanceTracker'));

// 6. Output browser compatibility
if (options.includeBrowsersList) {
  try {
    const packageJson = require(path.join(process.cwd(), 'package.json'));
    
    console.log(chalk.white.bold('\n🌐 Browser Compatibility:'));
    
    if (packageJson.browserslist) {
      console.log(chalk.gray('Targeting browsers:'));
      if (Array.isArray(packageJson.browserslist)) {
        packageJson.browserslist.forEach(target => {
          console.log(`  ${chalk.cyan('•')} ${target}`);
        });
      } else {
        console.log(`  ${chalk.cyan('•')} Using custom browserslist configuration`);
      }
    } else {
      console.log(chalk.yellow('⚠️ No browserslist configuration found. Using default settings.'));
    }
  } catch (err) {
    console.warn(chalk.yellow('⚠️ Could not analyze browser compatibility'));
  }
}

// 7. Dependency analysis if requested
if (options.includeNodeModules) {
  try {
    const packageJson = require(path.join(process.cwd(), 'package.json'));
    
    console.log(chalk.white.bold('\n📦 Dependency Analysis:'));
    
    const depCount = Object.keys(packageJson.dependencies || {}).length;
    const devDepCount = Object.keys(packageJson.devDependencies || {}).length;
    
    console.log(`${chalk.cyan('•')} Production dependencies: ${chalk.white(depCount)}`);
    console.log(`${chalk.cyan('•')} Development dependencies: ${chalk.gray(devDepCount)}`);
    
    // Check for potential issues
    if (depCount > 30) {
      console.log(chalk.yellow('⚠️ High number of dependencies may impact load time and bundle size.'));
    }
  } catch (err) {
    console.warn(chalk.yellow('⚠️ Could not analyze dependencies'));
  }
}

// 8. Success message with next steps
console.log(chalk.green.bold('\n✅ Build analysis complete!'));

// Suggest next steps
console.log(chalk.white.bold('\n⏭️ Next Steps:'));
console.log(chalk.gray('1. Run Lighthouse audit in production for more detailed metrics'));
console.log(chalk.gray('2. Monitor Core Web Vitals in Google Search Console'));
console.log(chalk.gray('3. Test load time across different network conditions'));
console.log(chalk.gray('4. Verify SEO implementation with structured data testing tool'));

// Footer
console.log(chalk.cyan('\n' +
  '┌─────────────────────────────────────────────────┐\n' +
  '│                                                 │\n' +
  '│   FlashCryptoSenders - Optimized for Success    │\n' +
  '│                                                 │\n' +
  '└─────────────────────────────────────────────────┘\n'));
