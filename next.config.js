const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

module.exports = (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    productionBrowserSourceMaps: false,

    // Image optimization
    images: {
      domains: [],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 31536000, // 1 year in seconds
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Compression
    compress: true,

    // i18n configuration
    i18n: isDev
      ? {
          locales: ['en'],
          defaultLocale: 'en',
        }
      : undefined,

    // URL handling
    trailingSlash: false,
    skipTrailingSlashRedirect: false,

    // Experimental features
    experimental: {
      optimizeCss: true,
      optimizePackageImports: ['react-icons', 'date-fns', 'lucide-react'],
      serverActions: {}, // Fix: Set as an object instead of boolean
      // ppr: true, // Remove or disable PPR unless using Next.js canary
      webVitalsAttribution: ['CLS', 'LCP'],
    },

    // Asset prefix for CDN (if used)
    assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || '',

    // Webpack configuration
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Optimize SVG loading with SVGR
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      // Add build ID to environment for debugging
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_ID': JSON.stringify(buildId),
        })
      );

      // Polyfills
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };
      }

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

    // ESLint
    eslint: {
      ignoreDuringBuilds: process.env.CI !== 'true',
    },

    // Set output directory
    distDir: '.next',

    // Configure output mode
    output: 'standalone',
  };

  return nextConfig;
};
