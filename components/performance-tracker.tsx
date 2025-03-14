'use client';

import { useEffect, useRef } from 'react';
import { getCLS, getFCP, getFID, getLCP, getTTFB, getINP } from 'web-vitals';

interface PerformanceData {
  url: string;
  metrics: {
    fcp: number | null;
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    ttfb: number | null;
    inp: number | null;
  };
  userAgent: string | null;
  connection: string | null;
  deviceCategory: string | null;
}

/**
 * Component for tracking Core Web Vitals and other performance metrics
 * Sends data to API endpoint for monitoring and analysis
 */
export function PerformanceTracker() {
  const perfDataRef = useRef<PerformanceData>({
    url: '',
    metrics: {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      inp: null,
    },
    userAgent: null,
    connection: null,
    deviceCategory: null,
  });
  
  // Track whether metrics have been reported
  const reportedRef = useRef({
    fcp: false,
    lcp: false,
    fid: false,
    cls: false,
    ttfb: false,
    inp: false,
  });
  
  // Set up performance monitoring
  useEffect(() => {
    // Skip in development mode to avoid skewing metrics
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    
    // Prepare initial data
    perfDataRef.current.url = window.location.pathname;
    perfDataRef.current.userAgent = navigator.userAgent;
    
    // Get connection type if available
    if ('connection' in navigator) {
      // @ts-ignore - typescript doesn't include the connection property in Navigator
      const connection = navigator.connection;
      if (connection) {
        perfDataRef.current.connection = connection.effectiveType || 'unknown';
      }
    }
    
    // Determine device category based on screen size
    const width = window.innerWidth;
    if (width < 768) {
      perfDataRef.current.deviceCategory = 'mobile';
    } else if (width < 1024) {
      perfDataRef.current.deviceCategory = 'tablet';
    } else {
      perfDataRef.current.deviceCategory = 'desktop';
    }
    
    // Measure Core Web Vitals
    getCLS(({ value }) => {
      perfDataRef.current.metrics.cls = value;
      reportedRef.current.cls = true;
      checkAndSendMetrics();
    });
    
    getFCP(({ value }) => {
      perfDataRef.current.metrics.fcp = value;
      reportedRef.current.fcp = true;
      checkAndSendMetrics();
    });
    
    getFID(({ value }) => {
      perfDataRef.current.metrics.fid = value;
      reportedRef.current.fid = true;
      checkAndSendMetrics();
    });
    
    getLCP(({ value }) => {
      perfDataRef.current.metrics.lcp = value;
      reportedRef.current.lcp = true;
      checkAndSendMetrics();
    });
    
    getTTFB(({ value }) => {
      perfDataRef.current.metrics.ttfb = value;
      reportedRef.current.ttfb = true;
      checkAndSendMetrics();
    });
    
    getINP(({ value }) => {
      perfDataRef.current.metrics.inp = value;
      reportedRef.current.inp = true;
      checkAndSendMetrics();
    });
    
    // Report metrics before user leaves page, for SPAs this is important 
    // since unload might happen before all metrics are collected
    const handleBeforeUnload = () => {
      sendMetrics(true);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  // Send metrics when all are collected or after timeout
  const checkAndSendMetrics = () => {
    // Check if key metrics are gathered (we don't wait for all)
    if (
      reportedRef.current.fcp && 
      reportedRef.current.lcp && 
      (reportedRef.current.fid || reportedRef.current.inp)
    ) {
      sendMetrics();
    }
  };
  
  // Send the metrics to our API
  const sendMetrics = (isBeforeUnload = false) => {
    // Skip if already sending or missing all metrics
    if (
      !perfDataRef.current.metrics.fcp &&
      !perfDataRef.current.metrics.lcp &&
      !perfDataRef.current.metrics.cls &&
      !perfDataRef.current.metrics.ttfb
    ) {
      return;
    }
    
    // If navigator.sendBeacon is available, use it on beforeunload
    if (isBeforeUnload && navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/cron/performance-monitor',
        JSON.stringify(perfDataRef.current)
      );
      return;
    }
    
    // Otherwise use fetch
    fetch('/api/cron/performance-monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(perfDataRef.current),
      // Use keepalive for better reliability
      keepalive: true,
    }).catch(error => {
      console.error('Error sending performance metrics:', error);
    });
  };
  
  // Helper function to analyze metrics and give tips for improvement
  const analyzePerformance = () => {
    const metrics = perfDataRef.current.metrics;
    const issues = [];
    
    // Check FCP
    if (metrics.fcp && metrics.fcp > 1800) {
      issues.push('First Contentful Paint is slow. Consider optimizing CSS and font loading.');
    }
    
    // Check LCP
    if (metrics.lcp && metrics.lcp > 2500) {
      issues.push('Largest Contentful Paint is slow. Consider optimizing images and critical rendering path.');
    }
    
    // Check FID
    if (metrics.fid && metrics.fid > 100) {
      issues.push('First Input Delay is high. Consider reducing JavaScript execution time.');
    }
    
    // Check CLS
    if (metrics.cls && metrics.cls > 0.1) {
      issues.push('Cumulative Layout Shift is high. Consider setting explicit dimensions for images and elements.');
    }
    
    // Check TTFB
    if (metrics.ttfb && metrics.ttfb > 600) {
      issues.push('Time to First Byte is slow. Consider optimizing server response time.');
    }
    
    return issues;
  };
  
  return null; // This component doesn't render anything
}

// Export a debug panel for development use
export function PerformanceDebugPanel() {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    inp: null,
  });
  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }
    
    getCLS(({ value }) => setMetrics(m => ({ ...m, cls: value })));
    getFCP(({ value }) => setMetrics(m => ({ ...m, fcp: value })));
    getFID(({ value }) => setMetrics(m => ({ ...m, fid: value })));
    getLCP(({ value }) => setMetrics(m => ({ ...m, lcp: value })));
    getTTFB(({ value }) => setMetrics(m => ({ ...m, ttfb: value })));
    getINP(({ value }) => setMetrics(m => ({ ...m, inp: value })));
  }, []);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 right-0 bg-black/80 text-white p-4 text-xs font-mono z-50 rounded-tl-lg">
      <div className="font-bold mb-1">Core Web Vitals</div>
      <div>FCP: {metrics.fcp ? `${metrics.fcp.toFixed(1)}ms` : '...'}</div>
      <div>LCP: {metrics.lcp ? `${metrics.lcp.toFixed(1)}ms` : '...'}</div>
      <div>FID: {metrics.fid ? `${metrics.fid.toFixed(1)}ms` : '...'}</div>
      <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : '...'}</div>
      <div>TTFB: {metrics.ttfb ? `${metrics.ttfb.toFixed(1)}ms` : '...'}</div>
      <div>INP: {metrics.inp ? `${metrics.inp.toFixed(1)}ms` : '...'}</div>
    </div>
  );
}

// Helper component to optimize resource hints based on analytics
export function ResourceHintOptimizer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip in development mode
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    
    // Get navigation data from performance API
    if (
      typeof window !== 'undefined' && 
      window.performance && 
      window.performance.getEntriesByType
    ) {
      // Find navigation entries
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        // Get first navigation entry
        const nav = navigationEntries[0] as PerformanceNavigationTiming;
        
        // Check for long DNS lookup times
        if (nav.domainLookupEnd - nav.domainLookupStart > 100) {
          // Add DNS prefetch for main domain
          const dnsPrefetch = document.createElement('link');
          dnsPrefetch.rel = 'dns-prefetch';
          dnsPrefetch.href = window.location.origin;
          document.head.appendChild(dnsPrefetch);
        }
        
        // Check for slow connection times
        if (nav.connectEnd - nav.connectStart > 200) {
          // Add preconnect for main domain
          const preconnect = document.createElement('link');
          preconnect.rel = 'preconnect';
          preconnect.href = window.location.origin;
          document.head.appendChild(preconnect);
        }
      }
      
      // Find resource timing entries
      const resourceEntries = performance.getEntriesByType('resource');
      
      // Track domains that take long to load
      const slowDomains = new Map<string, number>();
      
      // Analyze resource load times
      resourceEntries.forEach(resource => {
        try {
          const url = new URL((resource as PerformanceResourceTiming).name);
          const hostname = url.hostname;
          
          // Skip self-origin
          if (hostname === window.location.hostname) {
            return;
          }
          
          // Calculate total load time for this resource
          const totalTime = (resource as PerformanceResourceTiming).responseEnd - 
                           (resource as PerformanceResourceTiming).startTime;
          
          // If slow (>300ms), add to map
          if (totalTime > 300) {
            const currentCount = slowDomains.get(hostname) || 0;
            slowDomains.set(hostname, currentCount + 1);
          }
        } catch (e) {
          // Invalid URL, skip
        }
      });
      
      // Add preconnect hints for domains that appear multiple times slowly
      slowDomains.forEach((count, domain) => {
        if (count >= 2) {
          const preconnect = document.createElement('link');
          preconnect.rel = 'preconnect';
          preconnect.href = `https://${domain}`;
          preconnect.crossOrigin = 'anonymous';
          document.head.appendChild(preconnect);
        }
      });
    }
  }, []);
  
  return <>{children}</>;
}

import { useState } from 'react';
