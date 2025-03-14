'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onLCP, onTTFB, onFCP } from 'web-vitals';

type MetricName = 'CLS' | 'FID' | 'LCP' | 'TTFB' | 'FCP' | 'INP';

interface MetricReport {
  name: MetricName;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
  navigationType?: string;
}

// Creates a more robust reporting system for Core Web Vitals
export function WebVitalsMonitor({
  enabled = true,
  debug = false,
  reportTo = ['analytics', 'console'], // Report destinations
  samplingRate = 1.0, // Report 100% of metrics by default
}: {
  enabled?: boolean;
  debug?: boolean;
  reportTo?: Array<'analytics' | 'console' | 'beacon'>;
  samplingRate?: number;
}) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    
    // Only collect metrics for a percentage of users
    if (Math.random() > samplingRate) return;
    
    // Helper to send data to analytics
    const sendToAnalytics = ({ name, value, id, delta, entries, navigationType }: MetricReport) => {
      const analyticsData = {
        name,
        value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS values are typically < 1
        id,
        delta: Math.round(delta),
        entries: entries.length,
        rating: getRating(name, value),
        navigationType: navigationType || 'unknown',
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        pathname: window.location.pathname,
      };

      if (debug || reportTo.includes('console')) {
        console.log(`Web Vitals: ${name}`, analyticsData);
      }

      if (reportTo.includes('analytics')) {
        // Send to Matomo if available
        if (typeof window._paq !== 'undefined') {
          window._paq.push(['trackEvent', 'Web Vitals', name, String(analyticsData.rating), analyticsData.value]);
        }
        
        // Send to Plausible if available
        if (typeof window.plausible !== 'undefined') {
          window.plausible('Web Vitals', { 
            props: { 
              metric: name, 
              value: analyticsData.value,
              rating: analyticsData.rating 
            }
          });
        }
        
        // Send to Simple Analytics if available
        if (typeof window.sa_event !== 'undefined') {
          window.sa_event('web_vitals', { 
            metric: name, 
            value: analyticsData.value,
            rating: analyticsData.rating
          });
        }
      }

      // Use sendBeacon for metrics during page unload
      if (reportTo.includes('beacon')) {
        const blob = new Blob([JSON.stringify(analyticsData)], { type: 'application/json' });
        navigator.sendBeacon('/api/vitals', blob);
      }
    };

    const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
      switch (name) {
        case 'CLS':
          return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
        case 'FID':
          return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
        case 'LCP':
          return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
        case 'TTFB':
          return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
        case 'FCP':
          return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
        default:
          return 'needs-improvement';
      }
    };

    // Register metrics observers
    const metricObservers = [
      onCLS(metric => sendToAnalytics({ ...metric, name: 'CLS' })),
      onFID(metric => sendToAnalytics({ ...metric, name: 'FID' })),
      onLCP(metric => sendToAnalytics({ ...metric, name: 'LCP' })),
      onTTFB(metric => sendToAnalytics({ ...metric, name: 'TTFB' })),
      onFCP(metric => sendToAnalytics({ ...metric, name: 'FCP' })),
    ];
    
    // Attempt to measure INP if available in modern browsers
    if ('measureUserAgentSpecificMemory' in performance) {
      try {
        // @ts-ignore - TypeScript doesn't know about this API yet
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.entryType === 'event') {
              sendToAnalytics({
                name: 'INP',
                value: entry.duration,
                id: entry.entryType,
                delta: entry.duration,
                entries: [entry],
              });
            }
          });
        });
        
        observer.observe({ type: 'event', buffered: true });
        metricObservers.push(() => observer.disconnect());
      } catch (e) {
        if (debug) console.error('INP measurement error:', e);
      }
    }

    // Monitor long tasks for main thread blocking
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Tasks longer than 50ms are considered problematic
            if (debug) {
              console.warn(`Long Task detected: ${Math.round(entry.duration)}ms`, entry);
            }
          }
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      metricObservers.push(() => longTaskObserver.disconnect());
    } catch (e) {
      if (debug) console.error('Long task observation error:', e);
    }

    // Clean up all observers on unmount
    return () => {
      metricObservers.forEach(disconnectFn => {
        if (typeof disconnectFn === 'function') {
          disconnectFn();
        }
      });
    };
  }, [enabled, debug, reportTo, samplingRate]);

  // This component doesn't render anything
  return null;
}

// Add type definitions for third-party analytics
declare global {
  interface Window {
    _paq: any[]; // Matomo
    plausible: (eventName: string, options?: { props?: Record<string, any> }) => void; // Plausible
    sa_event: (eventName: string, params?: Record<string, any>) => void; // Simple Analytics
  }
}
