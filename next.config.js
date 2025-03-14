/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

// Analyze builds when ANALYZE is true
const withBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  
  // Base configuration
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
    i18n: isDev ? {
      locales: ['en'],
      defaultLocale: 'en',
    } : undefined, // Use Vercel i18n config in production
    
    // URL handling
    trailingSlash: false,
    skipTrailingSlashRedirect: false,
    
    // Experimental features
    experimental: {
      optimizeCss: true,
      optimizePackageImports: ['react-icons', 'date-fns', 'lucide-react'],
      serverActions: true,
      ppr: true,
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
      
      // Bundle analyzer in analyze mode
      if (process.env.ANALYZE === 'true') {
        config.plugins.push(
          new withBundleAnalyzer({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          })
        );
      }
      
      // Optimize moment.js if used
      if (config.resolve.alias) {
        config.resolve.alias['moment'] = path.resolve(__dirname, 'node_modules/moment/moment.js');
      }
      
      // Enable webpack caching
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
      
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
    
    // Headers configuration - moved to vercel.json
    
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
      // !! WARN !!
      // In production, we run type checking before build.
      // Don't disable this in CI/CD environments.
      ignoreBuildErrors: process.env.CI !== 'true',
    },
    
    // ESLint
    eslint: {
      // Disable ESLint during builds for speed
      // Use separate lint command in CI/CD instead
      ignoreDuringBuilds: process.env.CI !== 'true',
    },
    
    // Set output directory
    distDir: '.next',
    
    // Configure output mode
    output: 'standalone',
  };
  
  // Development-specific configuration
  if (isDev) {
    // Add dev-only settings here
    nextConfig.reactDevOverlay = true;
  } else {
    // Production-only optimizations
    nextConfig.swcMinify = true;
  }
  
  return nextConfig;
};
