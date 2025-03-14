'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Intelligently prefetches the most likely pages a user will navigate to
 * based on viewport interactions and navigation patterns
 */
export function NavigationPrefetcher({
  prefetchOnHover = true,
  prefetchOnVisible = true,
  prefetchMainRoutes = true,
  mainRoutes = ['/about', '/products', '/transfer', '/faq', '/contact'],
  threshold = 0.2,
}: {
  prefetchOnHover?: boolean;
  prefetchOnVisible?: boolean;
  prefetchMainRoutes?: boolean;
  mainRoutes?: string[];
  threshold?: number;
}) {
  const router = useRouter();
  const currentPath = usePathname();

  // Function to prefetch a route
  const prefetchRoute = useCallback((href: string) => {
    if (href === currentPath) return; // Don't prefetch current page
    if (href.startsWith('http') || href.startsWith('#')) return; // Only prefetch internal routes
    
    try {
      router.prefetch(href);
      if (process.env.NODE_ENV === 'development') {
        console.log(`Prefetched: ${href}`);
      }
    } catch (e) {
      // Fail silently, prefetching is just an optimization
    }
  }, [router, currentPath]);

  useEffect(() => {
    if (!prefetchMainRoutes) return;
    
    // Intelligently prefetch main routes in order of likelihood
    const delayedPrefetch = () => {
      const prefetchNextRoute = (index = 0) => {
        if (index >= mainRoutes.length) return;
        
        // Skip current path
        if (mainRoutes[index] !== currentPath) {
          prefetchRoute(mainRoutes[index]);
        }
        
        // Stagger prefetching to reduce network contention
        setTimeout(() => prefetchNextRoute(index + 1), 1000);
      };
      
      // Start prefetching after page is fully loaded
      prefetchNextRoute();
    };
    
    // Wait until the page is idle
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(delayedPrefetch);
    } else {
      setTimeout(delayedPrefetch, 2000);
    }
  }, [prefetchMainRoutes, mainRoutes, prefetchRoute, currentPath]);

  useEffect(() => {
    if (!prefetchOnHover && !prefetchOnVisible) return;
    
    const handleLinkInteraction = (event: MouseEvent | IntersectionObserverEntry, type: 'hover' | 'visible') => {
      // Only proceed if the feature is enabled
      if (type === 'hover' && !prefetchOnHover) return;
      if (type === 'visible' && !prefetchOnVisible) return;
      
      let element: Element | null = null;
      
      if ('target' in event) {
        // Handle mouse events
        element = event.target as Element;
      } else {
        // Handle intersection observer
        element = event.target;
      }
      
      // Find the closest link
      const linkElement = element?.closest('a');
      
      if (linkElement && linkElement.hasAttribute('href')) {
        const href = linkElement.getAttribute('href');
        if (href) {
          prefetchRoute(href);
        }
      }
    };
    
    // Set up hover detection for links
    if (prefetchOnHover) {
      const handleMouseOver = (event: MouseEvent) => {
        handleLinkInteraction(event, 'hover');
      };
      
      document.addEventListener('mouseover', handleMouseOver);
    }
    
    // Set up visibility detection for links
    if (prefetchOnVisible) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleLinkInteraction(entry, 'visible');
            }
          });
        },
        { threshold }
      );
      
      // Observe all links
      document.querySelectorAll('a[href^="/"]').forEach((link) => {
        observer.observe(link);
      });
    }
    
    return () => {
      if (prefetchOnHover) {
        document.removeEventListener('mouseover', handleMouseOver);
      }
      
      if (prefetchOnVisible && typeof observer !== 'undefined') {
        observer.disconnect();
      }
    };
  }, [prefetchOnHover, prefetchOnVisible, prefetchRoute, threshold]);
  
  return null;
}
