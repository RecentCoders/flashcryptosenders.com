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
    optimizeCss: true,
    webpackBuildWorker: true,
    swcMinify: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'flashcryptosenders.com'],
      bodySizeLimit: '2mb'
    }
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
  }
};

module.exports = withBundleAnalyzer(nextConfig);
