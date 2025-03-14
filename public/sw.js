// Service Worker version
const CACHE_VERSION = 'v1';
const CACHE_NAME = `flash-crypto-cache-${CACHE_VERSION}`;

// Assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png',
  '/icon.svg',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - respond with cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return the response
        if (response) {
          return response;
        }

        // Clone the request - request streams can only be read once
        const fetchRequest = event.request.clone();

        // Make network request and cache the response
        return fetch(fetchRequest)
          .then((response) => {
            // Check if response is valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response - response streams can only be read once
            const responseToCache = response.clone();

            // Cache the successful response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If the fetch fails due to network issue, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline');
            }
          });
      })
  );
});

// Background sync for deferred API requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'crypto-transaction') {
    event.waitUntil(syncTransactions());
  }
});

// Function to handle background sync of transactions
async function syncTransactions() {
  try {
    const pendingTransactions = await getPendingTransactions();
    for (const transaction of pendingTransactions) {
      await sendTransaction(transaction);
      await markTransactionComplete(transaction.id);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Helper functions for transaction handling (these would be implemented with IndexedDB in a full implementation)
async function getPendingTransactions() {
  // In a real implementation, this would retrieve transactions from IndexedDB
  return [];
}

async function sendTransaction(transaction) {
  // In a real implementation, this would send the transaction to the server
  return fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  });
}

async function markTransactionComplete(id) {
  // In a real implementation, this would update the transaction status in IndexedDB
  return true;
}
