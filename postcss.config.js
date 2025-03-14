module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-focus-visible': {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {
            preset: [
              'advanced',
              {
                discardComments: {
                  removeAll: true,
                },
                reduceIdents: false,
                zindex: false,
                colormin: true,
                convertValues: true,
                discardDuplicates: true,
                discardOverridden: true,
                mergeIdents: false,
              },
            ],
          },
          '@fullhuman/postcss-purgecss': {
            content: [
              './app/**/*.{js,ts,jsx,tsx}',
              './pages/**/*.{js,ts,jsx,tsx}',
              './components/**/*.{js,ts,jsx,tsx}',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: ['html', 'body', 'dark'],
              deep: [/^dark/, /^light/, /^bg-/, /^text-/, /^border-/, /^focus-/, /^hover-/],
            },
          },
        }
      : {}),
  },
}
