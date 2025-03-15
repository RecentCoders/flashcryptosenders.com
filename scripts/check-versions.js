// This script is modified to work with npm instead of bun
// It checks if the Node.js version matches the one specified in package.json

const fs = require("fs")
const semver = require("semver")
const { execSync } = require("child_process")

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"))

  // Get required Node.js version
  const requiredNodeVersion = packageJson.engines?.node

  if (!requiredNodeVersion) {
    console.log("No Node.js version specified in package.json")
    process.exit(0)
  }

  // Get current Node.js version
  const currentNodeVersion = process.version

  // Check if current version satisfies the requirement
  if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
    console.warn(
      `⚠️ Warning: You're using Node.js ${currentNodeVersion}, but this project requires Node.js ${requiredNodeVersion}`,
    )
    console.warn("This might cause compatibility issues.")
  } else {
    console.log(`✅ Using Node.js ${currentNodeVersion} (required: ${requiredNodeVersion})`)
  }
} catch (error) {
  console.error("Error checking versions:", error.message)
  // Don't fail the build if this script has an error
  process.exit(0)
}

