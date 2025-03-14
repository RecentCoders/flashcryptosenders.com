'use client';

import { useEffect } from 'react';
import { ServiceWorkerManager } from './service-worker-manager';

/**
 * ServiceWorkerHandler - Integrates service worker registration with layout
 * while also providing a centralized place to handle lifecycle events and updates
 */
export function ServiceWorkerHandler() {
  useEffect(() => {
    // Integrate service worker with appropriate Web Vitals measurement
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Track service worker installation and updates
      const trackSWEvent = (eventName: string, eventData: any = {}) => {
        if (window.gtag) {
          window.gtag('event', eventName, {
            ...eventData,
            event_category: 'service_worker',
            event_label: 'service_worker_status',
            non_interaction: true,
          });
        }
      };

      // Listen for service worker lifecycle events
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        trackSWEvent('sw_controller_change');
      });

      // Add global SW update methods
      window.updateServiceWorker = () => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready
            .then((registration) => {
              trackSWEvent('sw_update_requested');
              registration.update();
            })
            .catch((error) => {
              console.error('Error updating service worker:', error);
            });
        }
      };

      // Add performance marks for service worker events
      if (window.performance && window.performance.mark) {
        // Set initial mark
        window.performance.mark('sw_integration_start');

        // Listen for service worker initialization
        navigator.serviceWorker.ready.then(() => {
          window.performance.mark('sw_ready');
          window.performance.measure('sw_initialization_time', 'sw_integration_start', 'sw_ready');
          
          // Report on performance of service worker initialization
          const swInitMeasure = window.performance.getEntriesByName('sw_initialization_time', 'measure');
          if (swInitMeasure.length > 0) {
            trackSWEvent('sw_init_time', {
              value: Math.round(swInitMeasure[0].duration),
              metric_id: 'sw_init_time',
            });
          }
        });
      }
    }
  }, []);

  return (
    <ServiceWorkerManager
      enableOfflineSupport={true}
      showUpdatePrompt={true}
    />
  );
}

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, any>) => void;
    updateServiceWorker?: () => void;
  }
}
