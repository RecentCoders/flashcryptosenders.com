const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false,

    // Image optimization
    images: {
      domains: [],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 31536000,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Compression
    compress: true,

    // Experimental features (updated for Next 15)
    experimental: {
      optimizePackageImports: ['react-icons', 'date-fns', 'lucide-react'],
      serverActions: {},
      webVitalsAttribution: ['CLS', 'LCP'],
    },

    // Webpack configuration (simplified)
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },

    // Redirects
    redirects: async () => [
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
    ],

    // Rewrites
    rewrites: async () => [
      {
        source: '/health',
        destination: '/api/health',
      },
      {
        source: '/site.webmanifest',
        destination: '/manifest.json',
      },
    ],

    // TypeScript configuration
    typescript: {
      ignoreBuildErrors: process.env.CI !== 'true',
    },

    // ESLint configuration
    eslint: {
      ignoreDuringBuilds: process.env.CI !== 'true',
    },

    // Output configuration
    output: 'standalone',
  };
};
