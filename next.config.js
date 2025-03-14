/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure static export
  output: 'standalone',
  
  // Additional experimental features
  experimental: {
    // App directory for App Router
    appDir: true,
    
    // Improved tree-shaking and dead code elimination
    optimizeCss: true,
    
    // Improved serverless function bundling
    outputFileTracingRoot: process.env.NODE_ENV === 'production' ? undefined : __dirname,
  },
  
  // Image optimization configuration
  images: {
    domains: [
      'flashcryptosenders.com',
      'www.flashcryptosenders.com',
      'assets.flashcryptosenders.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
