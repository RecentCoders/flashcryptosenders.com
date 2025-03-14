const semver = require('semver');

if (process.env.VERCEL) {
  console.log('Skipping version check in Vercel environment');
  process.exit(0);
}

const requiredNodeVersion = '20.18.1';
const currentNodeVersion = process.version.slice(1); // Remove the 'v' prefix

if (currentNodeVersion !== requiredNodeVersion) {
  console.error(`Node.js ${requiredNodeVersion} is required, found ${currentNodeVersion}`);
  process.exit(1);
}

console.log(`Node.js version check passed: ${currentNodeVersion}`);
