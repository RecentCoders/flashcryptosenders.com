// Helper script to ensure proper builds on Vercel
const fs = require('fs');
const path = require('path');

// Log the build environment
console.log('Vercel Build Helper: Starting...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

// Ensure directory structure
const ensureDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Make sure these important directories exist
ensureDirectory(path.join(__dirname, '.next'));
ensureDirectory(path.join(__dirname, 'public'));

// Create a simple log file to verify the script ran
fs.writeFileSync(
  path.join(__dirname, 'vercel-build-log.txt'), 
  `Build helper executed at ${new Date().toISOString()}\n`,
  'utf8'
);

console.log('Vercel Build Helper: Completed successfully');
