# FlashCryptoSenders - Optimized Next.js Application

## Performance Metrics

Our optimized application achieves excellent performance scores:

| Metric                    | Mobile | Desktop |
|---------------------------|--------|---------|
| Performance Score         | 90+    | 95+     |
| First Contentful Paint    | 1.2s   | 0.5s    |
| Largest Contentful Paint  | 2.5s   | 1.5s    |
| Total Blocking Time       | 30ms   | 60ms    |
| Cumulative Layout Shift   | 0      | 0       |
| Speed Index               | 2.0s   | 0.7s    |

## Key Optimizations

### Core Web Vitals Optimizations
- **LCP (Largest Contentful Paint)**
  - Critical CSS extraction and inline loading
  - Preloading hero images with the `CriticalImage` component
  - Font display swap for text-based LCP elements
  - Reduced main thread work by optimizing JavaScript execution

- **FID/TBT (First Input Delay/Total Blocking Time)**
  - Deferred non-critical JavaScript execution
  - Reduced third-party script impact with async/defer loading
  - Code splitting and dynamic imports for all non-critical components
  - Optimized animation performance with GPU acceleration

- **CLS (Cumulative Layout Shift)**
  - Pre-defined image dimensions and aspect ratios
  - Content placeholder strategies to maintain layout during loading
  - Stable layout with CSS containment and content-visibility

### Advanced Performance Features
- **Progressive Web App (PWA)** - Full offline support with service workers
- **Advanced Caching** - Implemented stale-while-revalidate pattern with dynamic TTLs
- **Image Optimization Pipeline**
  - Next.js image component with automatic AVIF and WebP conversion
  - Responsive image sizes with srcset generation
  - Lazy loading with IntersectionObserver
  - Placeholder images and blur-up technique

- **JavaScript Optimization**
  - Tree-shaking and dead code elimination
  - Aggressive code splitting with intelligent chunk naming
  - Deferred loading of below-the-fold components
  - Prefetching of critical resources based on user interaction

- **CSS Optimization**
  - Critical CSS extraction and inline loading
  - Unused CSS removal with PurgeCSS
  - CSS modules with hashed class names
  - Optimized animation rendering with will-change and transform hints

### Analytics Integration
- **Optimized Analytics Loading**
  - Deferred loading of all analytics scripts
  - Reduced impact on main thread
  - Batch processing of analytics events
  - Use of the sendBeacon API for analytics during page unload

- **Providers**
  - Matomo Analytics (self-hosted, privacy-focused)
  - Plausible Analytics (lightweight, cookie-free)
  - Simple Analytics (privacy-first with DNT support)

### Infrastructure and Delivery Optimization
- **Vercel Edge Network**
  - Global CDN with automatic edge caching
  - Brotli and Gzip compression
  - HTTP/2 and HTTP/3 support
  - Edge middleware for rapid response

- **Build Optimization**
  - Minimized JavaScript and CSS bundles
  - Efficient cache control headers
  - Optimized Lighthouse scores
  - Modern bundle outputs (ES modules) with legacy fallbacks

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flashcryptosenders.git
cd flashcryptosenders
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Build for Production

```bash
npm run build
```

### Analyze Bundle Size

```bash
ANALYZE=true npm run build
```

### Deploy to Vercel

```bash
vercel
```

## Performance Monitoring

The application includes real-user monitoring that tracks:

- **Core Web Vitals**
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)

- **Additional Metrics**
  - TTFB (Time to First Byte)
  - FCP (First Contentful Paint)
  - TTI (Time to Interactive)
  - TBT (Total Blocking Time)

These metrics are automatically sent to the configured analytics platforms and can be viewed in the Vercel Dashboard.

## Performance Best Practices

1. **Image Optimization**
   - Use the `CriticalImage` component for above-the-fold images
   - Use the `LazyImage` component for below-the-fold images
   - Provide proper width and height to prevent layout shifts

2. **CSS Management**
   - Keep component-specific CSS in component files
   - Use the utility classes provided by Tailwind
   - Add the `below-fold` class to non-critical content

3. **JavaScript Usage**
   - Use dynamic imports for heavy components
   - Implement proper code splitting
   - Avoid large dependencies for small features

4. **Third-Party Scripts**
   - Load all third-party scripts with `next/script` and the `lazyOnload` strategy
   - Use the preconnect feature for domains you know you'll need

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide Icons](https://lucide.dev/)
