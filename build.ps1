# Exit on error
$ErrorActionPreference = "Stop"

# Clean up
Write-Host "Cleaning..."
if (Test-Path ".next") { Remove-Item -Path ".next" -Recurse -Force }
if (Test-Path "node_modules/.cache") { Remove-Item -Path "node_modules/.cache" -Recurse -Force }

# Install dependencies
Write-Host "Installing dependencies..."
& pnpm install --no-frozen-lockfile

if ($LASTEXITCODE -ne 0) {
    Write-Error "pnpm install failed"
    exit 1
}

# Build the application
Write-Host "Building application..."
& pnpm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit 1
}

# Run bundle analysis if required
if ($env:ANALYZE -eq "true") {
    Write-Host "Running bundle analysis..."
    pnpm run analyze
}
