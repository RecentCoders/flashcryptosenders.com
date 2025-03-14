'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

interface ResourcePreloadManagerProps {
  criticalImages?: string[];
  criticalStyles?: string[];
  criticalFonts?: {
    href: string;
    type: string;
  }[];
  criticalScripts?: string[];
  preconnectDomains?: string[];
  prefetchRoutes?: string[];
  children?: React.ReactNode;
}

/**
 * Component to intelligently preload critical resources
 * Optimizes loading of images, styles, fonts, and scripts
 */
export function ResourcePreloadManager({
  criticalImages = [],
  criticalStyles = [],
  criticalFonts = [],
  criticalScripts = [],
  preconnectDomains = [],
  prefetchRoutes = [],
  children,
}: ResourcePreloadManagerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Feature detection for save-data mode
    const connection = (navigator as any).connection;
    const saveData = connection?.saveData;

    // Don't prefetch routes in save-data mode
    if (!saveData && prefetchRoutes.length > 0) {
      prefetchRoutes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        link.as = 'document';
        document.head.appendChild(link);
      });
    }

    // Track which images are already in viewport
    const observeInitialImages = () => {
      // Skip if Intersection Observer isn't supported
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const image = entry.target as HTMLImageElement;
              if (image.dataset.src) {
                image.src = image.dataset.src;
                delete image.dataset.src;
              }
              observer.unobserve(image);
            }
          });
        },
        { rootMargin: '200px 0px' }
      );

      // Find all above-the-fold images that might need optimization
      document.querySelectorAll('img[data-priority="true"]').forEach(img => {
        observer.observe(img);
      });
    };

    // Add script for font loading optimization
    const optimizeFontLoading = () => {
      // Skip if the FontFace API isn't supported
      if (!('FontFace' in window)) return;

      // Add a class to the html element when fonts are loaded
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });

      // Optionally implement font fallback mechanism
      const fontTimeoutMs = 3000;
      setTimeout(() => {
        if (!document.documentElement.classList.contains('fonts-loaded')) {
          document.documentElement.classList.add('fonts-timeout');
        }
      }, fontTimeoutMs);
    };

    // Execute optimizations
    observeInitialImages();
    optimizeFontLoading();

    // Clean up function
    return () => {
      // Remove any dynamically added links/scripts if needed
    };
  }, [prefetchRoutes]);

  return (
    <>
      {/* Preconnect to critical domains */}
      {preconnectDomains.map((domain) => (
        <link
          key={`preconnect-${domain}`}
          rel="preconnect"
          href={domain}
          crossOrigin="anonymous"
        />
      ))}

      {/* Preload critical CSS */}
      {criticalStyles.map((style) => (
        <link
          key={`style-${style}`}
          rel="preload"
          href={style}
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
      ))}

      {/* Preload critical fonts */}
      {criticalFonts.map((font, index) => (
        <link
          key={`font-${index}`}
          rel="preload"
          href={font.href}
          as="font"
          type={font.type}
          crossOrigin="anonymous"
        />
      ))}

      {/* Preload critical images */}
      {criticalImages.map((image) => (
        <link
          key={`image-${image}`}
          rel="preload"
          href={image}
          as="image"
          type="image/webp"
          imageSrcSet={`${image} 1x, ${image.replace('.webp', '@2x.webp')} 2x`}
          imageSizes="100vw"
        />
      ))}

      {/* Preload critical scripts */}
      {criticalScripts.map((script) => (
        <link
          key={`script-${script}`}
          rel="preload"
          href={script}
          as="script"
        />
      ))}

      {children}
    </>
  );
}

// Helper component to specifically handle LCP image preloading
export function LcpImagePreloader({ imageUrl, width, height }: { 
  imageUrl: string; 
  width: number;
  height: number;
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={imageUrl}
        imageSrcSet={`${imageUrl} 1x, ${imageUrl.replace(/\.(jpg|png|webp)/, '@2x.$1')} 2x`}
        imageSizes={`${width}px`}
      />
      <style jsx global>{`
        @media screen and (max-width: 768px) {
          .lcp-image-container {
            height: auto !important;
          }
        }
      `}</style>
      <div 
        className="lcp-image-container" 
        style={{ 
          aspectRatio: `${width} / ${height}`,
          maxWidth: '100%',
          height: 'auto',
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          alt=""
          width={width}
          height={height}
          loading="eager"
          decoding="async"
          style={{ 
            display: 'block', 
            width: '100%', 
            height: 'auto',
            objectFit: 'contain'
          }}
          onLoad={(e) => {
            // Mark as LCP complete
            const target = e.currentTarget;
            target.dataset.lcpLoaded = 'true';
            
            // Report to performance observer if available
            if (window.LCP) {
              window.LCP.record({
                element: target,
                value: performance.now(),
                id: 'lcp-image'
              });
            }
          }}
        />
      </div>
    </>
  );
}

// Helper component for optimizing hero section loading
export function OptimizedHero({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add viewport height calculation
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initial calculation and event listener
    setVH();
    window.addEventListener('resize', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
    };
  }, []);
  
  return (
    <section
      className="optimized-hero-section"
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        overflowX: 'hidden',
        position: 'relative',
        willChange: 'transform', // Hint for compositor
      }}
    >
      {children}
    </section>
  );
}

// Extend Window interface for performance tracking
declare global {
  interface Window {
    LCP?: {
      record: (data: {
        element: HTMLElement;
        value: number;
        id: string;
      }) => void;
    };
  }
}
