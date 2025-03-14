/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable image optimization for various domains
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'flashcryptosenders.com', 
      'www.flashcryptosenders.com',
      'cdn.flashcryptosenders.com'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.flashcryptosenders.com',
      },
    ],
  },
  
  // Enable build-time compression
  compress: true,
  
  // Configure headers for additional security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // Configure webpack for optimizations
  webpack: (config, { dev, isServer }) => {
    // Only run in production builds
    if (!dev) {
      // Add bundle analyzer in analyze mode
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true,
          })
        );
      }
      
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the package name
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 1,
            reuseExistingChunk: true,
          }
        }
      };
      
      // Minimize CSS with cssnano
      config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((one) => {
            if (one.test && one.test.toString().includes('css')) {
              if (one.use && one.use.length > 0) {
                const cssLoader = one.use.find((u) => 
                  u.loader && u.loader.includes('css-loader')
                );
                if (cssLoader) {
                  cssLoader.options = {
                    ...cssLoader.options,
                    importLoaders: 1,
                    modules: {
                      ...cssLoader.options?.modules,
                      localIdentName: '[hash:base64:8]',
                    },
                  };
                }
              }
            }
          });
        }
      });
      
      // Optimize SVGs
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      });
    }
    
    // Add a plugin to handle dynamic chunks loading
    config.plugins.push(
      new config.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(isServer),
      })
    );
    
    return config;
  },
  
  // Add rewrites for proxy purposes
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.flashcryptosenders.com/:path*' // Proxy to API server
      }
    ]
  },
  
  // Add redirects for legacy URLs
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      }
    ]
  },
  
  // Enable experimental features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['sharp', 'react-dom'],
    optimizeCss: true,
    scrollRestoration: true,
    workerThreads: true,
    instrumentationHook: true,
    optimisticClientCache: true
  },
  
  // Configure output for static exports if needed
  output: 'standalone',
  
  // Configure TypeScript project references
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  
  // Configure compiler options
  compiler: {
    styledComponents: true, // Enable styled-components
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
  },
  
  // Enable support for serving modern bundles to modern browsers
  future: {
    webpack5: true, // Already default in Next.js 12+
  },
  
  // Configure powered by header
  poweredByHeader: false,
  
  // Optimize build performance
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds to improve speed
  },
  
  // Performance optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles
}

module.exports = nextConfig
