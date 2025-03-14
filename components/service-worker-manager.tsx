'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

interface ServiceWorkerManagerProps {
  enableOfflineSupport?: boolean;
  showUpdatePrompt?: boolean;
  children?: React.ReactNode;
}

/**
 * Service Worker Manager Component
 * 
 * Manages registration and lifecycle of service worker for offline support
 * and improved performance through caching.
 */
export function ServiceWorkerManager({
  enableOfflineSupport = true,
  showUpdatePrompt = true,
  children
}: ServiceWorkerManagerProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Define event listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      console.log('Application is online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('Application is offline');
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Expose notification functions to window for service worker access
    if (typeof window !== 'undefined') {
      window.showUpdateNotification = () => {
        setUpdateAvailable(true);
      };

      window.showOfflineReadyNotification = () => {
        setOfflineReady(true);
      };

      window.showOfflineNotification = () => {
        // Optional implementation for offline notification
      };
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      // Clean up window functions
      if (typeof window !== 'undefined') {
        delete window.showUpdateNotification;
        delete window.showOfflineReadyNotification;
        delete window.showOfflineNotification;
      }
    };
  }, []);

  // Handle update action
  const handleUpdate = () => {
    if (typeof window !== 'undefined' && 'updateServiceWorker' in window) {
      (window as any).updateServiceWorker();
      window.location.reload();
    }
  };

  // Dismiss update notification
  const dismissUpdate = () => {
    setUpdateAvailable(false);
  };

  // Dismiss offline ready notification
  const dismissOfflineReady = () => {
    setOfflineReady(false);
  };

  return (
    <>
      {/* Load service worker registration script */}
      {enableOfflineSupport && (
        <Script
          src="/service-worker-register.js"
          strategy="afterInteractive"
        />
      )}

      {/* Update notification */}
      {showUpdatePrompt && updateAvailable && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-blue-600 text-white flex justify-between items-center">
          <div>
            A new version is available!
          </div>
          <div className="flex space-x-2">
            <button
              onClick={dismissUpdate}
              className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded"
            >
              Later
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-white text-blue-600 hover:bg-gray-100 rounded"
            >
              Update now
            </button>
          </div>
        </div>
      )}

      {/* Offline ready notification */}
      {offlineReady && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-green-600 text-white flex justify-between items-center">
          <div>
            App ready to work offline!
          </div>
          <button
            onClick={dismissOfflineReady}
            className="px-3 py-1 bg-green-700 hover:bg-green-800 rounded"
          >
            Got it
          </button>
        </div>
      )}

      {/* Offline status indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 p-2 bg-yellow-500 text-white text-center text-sm">
          You are currently offline. Some features may be limited.
        </div>
      )}

      {children}
    </>
  );
}

// Type definitions for window methods
declare global {
  interface Window {
    showUpdateNotification?: () => void;
    showOfflineReadyNotification?: () => void;
    showOfflineNotification?: () => void;
    updateServiceWorker?: () => void;
    unregisterServiceWorker?: () => void;
  }
}
