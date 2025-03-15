/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.com", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
}

// Only use the bundle analyzer in analyze mode
if (process.env.ANALYZE === "true") {
  // Dynamically import the bundle analyzer to avoid issues during normal builds
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  })
  module.exports = withBundleAnalyzer(nextConfig)
} else {
  module.exports = nextConfig
}

