const semver = require('semver');

if (process.env.VERCEL) {
  console.log('Skipping version check in Vercel environment');
  process.exit(0);
}

const requiredNode = '18.19.1';
const currentNode = process.version;

if (!semver.satisfies(currentNode, requiredNode)) {
  console.error(`Node.js ${requiredNode} is required, found ${currentNode}`);
  process.exit(1);
}

console.log(`Node.js version check passed: ${currentNode}`);
