#!/usr/bin/env node

/**
 * Pre-deployment optimization script
 * 
 * This script optimizes the build output before deployment
 * to ensure maximum performance and smallest bundle size.
 * 
 * Run with: node scripts/optimize-build.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const zlib = require('zlib');

console.log('🚀 Starting build optimization process...');

const BUILD_DIR = path.join(process.cwd(), '.next');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Verify build exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found. Run npm run build first.');
  process.exit(1);
}

/**
 * Optimize images in public directory
 */
function optimizePublicImages() {
  console.log('\n📷 Optimizing public images...');
  
  try {
    // Check if sharp is installed
    try {
      require.resolve('sharp');
    } catch (err) {
      console.log('  Installing sharp for image optimization...');
      execSync('npm install --no-save sharp', { stdio: 'inherit' });
    }
    
    const sharp = require('sharp');
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    
    // Find all images in public directory
    function findImages(dir, fileList = []) {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          findImages(filePath, fileList);
        } else if (imageExtensions.includes(path.extname(file).toLowerCase())) {
          fileList.push(filePath);
        }
      });
      
      return fileList;
    }
    
    const imagePaths = findImages(PUBLIC_DIR);
    console.log(`  Found ${imagePaths.length} images to optimize`);
    
    // Skip already optimized images
    const nonOptimizedImages = imagePaths.filter(imagePath => 
      !imagePath.includes('-optimized') && 
      !imagePath.includes('.min.')
    );
    
    // Optimize each image
    let optimizedCount = 0;
    nonOptimizedImages.forEach(imagePath => {
      const ext = path.extname(imagePath);
      const basename = path.basename(imagePath, ext);
      const dirname = path.dirname(imagePath);
      const optimizedPath = path.join(dirname, `${basename}.min${ext}`);
      
      // Skip if optimized version already exists
      if (fs.existsSync(optimizedPath)) {
        return;
      }
      
      try {
        const image = sharp(imagePath);
        
        // Get image info
        image.metadata()
          .then(metadata => {
            // Don't process if already small
            if (metadata.width <= 100 && metadata.height <= 100) {
              return;
            }
            
            let optimizer = image;
            
            // Apply appropriate compression based on format
            if (ext === '.jpg' || ext === '.jpeg') {
              optimizer = optimizer.jpeg({ quality: 85, progressive: true });
            } else if (ext === '.png') {
              optimizer = optimizer.png({ compressionLevel: 9, progressive: true });
            } else if (ext === '.webp') {
              optimizer = optimizer.webp({ quality: 85 });
            }
            
            // Save optimized image
            optimizer.toFile(optimizedPath)
              .then(info => {
                const originalSize = fs.statSync(imagePath).size;
                const optimizedSize = info.size;
                const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
                
                console.log(`  ✅ Optimized: ${path.relative(PUBLIC_DIR, imagePath)} (${savings}% smaller)`);
                optimizedCount++;
              });
          });
      } catch (err) {
        console.error(`  ❌ Error optimizing ${imagePath}: ${err.message}`);
      }
    });
    
    if (optimizedCount === 0) {
      console.log('  ℹ️ All images are already optimized.');
    }
  } catch (err) {
    console.error(`  ❌ Image optimization failed: ${err.message}`);
  }
}

/**
 * Compress static assets
 */
function compressStaticAssets() {
  console.log('\n📦 Pre-compressing static assets...');
  
  const staticDir = path.join(BUILD_DIR, 'static');
  if (!fs.existsSync(staticDir)) {
    console.error('  ❌ Static directory not found.');
    return;
  }
  
  const compressibleExtensions = ['.js', '.css', '.html', '.xml', '.json', '.svg', '.txt'];
  let compressedCount = 0;
  
  // Find all compressible files
  function findCompressibleFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findCompressibleFiles(filePath, fileList);
      } else if (compressibleExtensions.includes(path.extname(file).toLowerCase())) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }
  
  const filesToCompress = findCompressibleFiles(staticDir);
  console.log(`  Found ${filesToCompress.length} compressible files`);
  
  // Compress each file with gzip and brotli
  filesToCompress.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath);
      
      // Create gzip version
      const gzipPath = `${filePath}.gz`;
      if (!fs.existsSync(gzipPath)) {
        const gzipped = zlib.gzipSync(content, { level: 9 });
        fs.writeFileSync(gzipPath, gzipped);
      }
      
      // Create brotli version
      const brotliPath = `${filePath}.br`;
      if (!fs.existsSync(brotliPath)) {
        const brotlied = zlib.brotliCompressSync(content, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        });
        fs.writeFileSync(brotliPath, brotlied);
      }
      
      compressedCount++;
    } catch (err) {
      console.error(`  ❌ Error compressing ${filePath}: ${err.message}`);
    }
  });
  
  console.log(`  ✅ Compressed ${compressedCount} files with gzip and brotli`);
}

/**
 * Create asset manifest for improved caching
 */
function createAssetManifest() {
  console.log('\n📋 Creating asset manifest...');
  
  try {
    const staticDir = path.join(BUILD_DIR, 'static');
    if (!fs.existsSync(staticDir)) {
      console.error('  ❌ Static directory not found.');
      return;
    }
    
    const manifest = {
      generated: new Date().toISOString(),
      assets: {},
    };
    
    // Find all assets
    function collectAssets(dir, basePath = '') {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.join(basePath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          collectAssets(filePath, relativePath);
        } else if (!file.endsWith('.gz') && !file.endsWith('.br') && !file.endsWith('.map')) {
          // Get file hash from filename (Next.js puts hash in filename)
          const hash = file.match(/\.([a-f0-9]{8,})\./) ? 
            file.match(/\.([a-f0-9]{8,})\./)[1] : 
            '';
          
          manifest.assets[`/${relativePath}`] = {
            size: stat.size,
            hash: hash,
          };
        }
      });
    }
    
    collectAssets(staticDir, 'static');
    
    // Save manifest to public directory
    const manifestPath = path.join(PUBLIC_DIR, 'asset-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`  ✅ Created asset manifest with ${Object.keys(manifest.assets).length} entries`);
  } catch (err) {
    console.error(`  ❌ Error creating asset manifest: ${err.message}`);
  }
}

/**
 * Run all optimization steps
 */
function runOptimizations() {
  // Step 1: Optimize public images
  optimizePublicImages();
  
  // Step 2: Compress static assets
  compressStaticAssets();
  
  // Step 3: Create asset manifest
  createAssetManifest();
  
  console.log('\n✨ Build optimization complete!');
}

// Run optimizations
runOptimizations();
