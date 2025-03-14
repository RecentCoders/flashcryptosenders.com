const { execSync } = require('child_process');

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';

// Skip version checks in Vercel environment
if (isVercel) {
  console.log('Running in Vercel environment, skipping version checks');
  process.exit(0);
}

function getNodeVersion() {
  return process.versions.node;
}

function getPnpmVersion() {
  try {
    return execSync('pnpm --version').toString().trim();
  } catch (e) {
    return null;
  }
}

function validateVersions() {
  const nodeVersion = getNodeVersion();
  const pnpmVersion = getPnpmVersion();

  const requiredNode = '18.x';
  const requiredPnpm = '8.x';

  if (!nodeVersion.startsWith('18')) {
    console.error(`Node.js ${requiredNode} is required, but found ${nodeVersion}`);
    process.exit(1);
  }

  if (!pnpmVersion || !pnpmVersion.startsWith('8')) {
    console.error(`pnpm ${requiredPnpm} is required, but found ${pnpmVersion || 'not installed'}`);
    process.exit(1);
  }

  console.log('Environment validation successful');
}

validateVersions();
