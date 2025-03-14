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
    serverActions: true,
    optimizeCss: true,
  },
};

module.exports = nextConfig;
