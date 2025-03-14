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
    webpackBuildWorker: true,
    optimizeCss: true,
    forceSwcTransforms: true,
    swcMinify: true,
    staticPageGenerationTimeout: 180,
    workerThreads: true,
    cpus: Math.max(1, Math.min(8, require('os').cpus().length - 1))
  },
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'development'
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = withBundleAnalyzer(nextConfig);
