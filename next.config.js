/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Output configuration
  output: 'standalone',
  
  // Experimental features (compatible with Next.js 13.5.4)
  experimental: {
    appDir: true,
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
  
  // TypeScript configuration - ignore errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration - ignore errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Custom webpack configuration for compatibility
  webpack: (config) => {
    // Return the modified config
    return config;
  },
};

module.exports = nextConfig;
