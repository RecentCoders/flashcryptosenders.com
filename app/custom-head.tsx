'use client';

import { useEffect } from 'react';

/**
 * Component that handles font optimization and critical resource loading
 * to improve LCP and other performance metrics
 */
export function CustomHead() {
  useEffect(() => {
    // Add font loading optimization
    if ('fonts' in document) {
      // Enable font optimization API if available
      Promise.all([
        // @ts-ignore - TypeScript doesn't know about this API yet
        document.fonts.load('1em Inter'),
        // Add other fonts you need to preload
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Save data mode detection
    const connection = (navigator as any).connection;
    if (connection && connection.saveData) {
      document.documentElement.classList.add('save-data');
    }

    // Add connection-aware enhancements
    const enhanceForConnection = () => {
      const connection = (navigator as any).connection;
      if (!connection) return;

      // Check for slow connections
      const effectiveType = connection.effectiveType || '';
      const isSlow = 
        effectiveType === 'slow-2g' || 
        effectiveType === '2g' || 
        effectiveType === '3g';
      
      if (isSlow) {
        document.documentElement.classList.add('slow-connection');
        
        // Potentially disable certain heavy features for slow connections
        const heavyElements = document.querySelectorAll('[data-heavy-feature]');
        heavyElements.forEach(el => {
          el.setAttribute('data-disabled-for-speed', 'true');
        });
      }
    };

    enhanceForConnection();

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }

    // Optimize loading of images based on viewport
    const optimizeImageLoading = () => {
      const viewportHeight = window.innerHeight;
      const farBelowFold = viewportHeight * 2; // 2x viewport height
      
      const allImages = document.querySelectorAll('img[loading="lazy"]');
      
      allImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        
        if (rect.top > farBelowFold) {
          // Really far down, add extra lazy marker for our custom loading logic
          img.setAttribute('data-extra-lazy', 'true');
        }
      });
    };
    
    // Run after the page has loaded
    window.addEventListener('load', optimizeImageLoading);
    
    return () => {
      window.removeEventListener('load', optimizeImageLoading);
    };
  }, []);

  return null;
}

/**
 * PreloadStylesheets component to preload critical stylesheets
 */
export function PreloadStylesheets() {
  return (
    <>
      <link 
        rel="preload" 
        href="/styles/critical.css" 
        as="style" 
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link rel="stylesheet" href="/styles/critical.css" />
      </noscript>
    </>
  );
}

/**
 * PreconnectDomains component to preconnect to important third-party domains
 */
export function PreconnectDomains() {
  return (
    <>
      {/* Add preconnect for all domains you load resources from */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.matomo.cloud" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
    </>
  );
}
