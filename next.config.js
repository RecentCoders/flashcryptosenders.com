const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
})

/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.flashcryptosenders.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
      }
    ],
    formats: ['image/webp'],
  },
  experimental: {
    swcMinify: true,
    serverActions: true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'development'
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Add this to fix metadata warnings
  generateViewport: async () => {
    return {
      viewport: 'width=device-width, initial-scale=1',
      themeColor: '#ffffff',
    }
  }
};

module.exports = withBundleAnalyzer(nextConfig);
