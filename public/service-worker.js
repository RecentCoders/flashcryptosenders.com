// FlashCryptoSenders Service Worker
// Optimized for performance and offline capabilities

const CACHE_NAME = 'flashcryptosenders-cache-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Resources to cache on install
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/images/logo.png',
  '/images/favicon.ico',
  '/fonts/inter-var.woff2',
];

// Install event - precache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - cache strategy with network-first for API, cache-first for static
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For API requests - network first, fallback to cache
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response for the cache
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.status === 200) {
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If we don't have a cached API response, let's just return the offline page
              return caches.match('/offline');
            });
        })
    );
    return;
  }
  
  // For static assets - cache first, network fallback, update cache
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return the cached response and update cache in background
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                });
              return networkResponse;
            })
            .catch(() => cachedResponse);
            
          // Return cached response immediately
          return cachedResponse;
        }
        
        // No cache, try network
        return fetch(event.request)
          .then((response) => {
            // Return the response and cache it
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache successful responses
                if (response.status === 200) {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          })
          .catch(() => {
            // Network failed, return offline page for HTML requests
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline');
            }
            
            // For other resources, just fail
            return new Response('Network unavailable', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormData());
  }
});

// Function to sync stored form data with the server
async function syncFormData() {
  const db = await openDatabase();
  const formDataStore = db.transaction('formData', 'readonly').objectStore('formData');
  const allFormData = await getAllFormData(formDataStore);
  
  const syncPromises = allFormData.map(async (formData) => {
    try {
      const response = await fetch(formData.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.data),
      });
      
      if (response.ok) {
        // Remove from IndexedDB if successfully synced
        const db = await openDatabase();
        const transaction = db.transaction('formData', 'readwrite');
        transaction.objectStore('formData').delete(formData.id);
        return transaction.complete;
      }
    } catch (error) {
      console.error('Sync failed for form data', error);
    }
  });
  
  return Promise.all(syncPromises);
}

// Open IndexedDB database
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FlashCryptoSenders', 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('formData')) {
        db.createObjectStore('formData', { keyPath: 'id', autoIncrement: true });
      }
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// Get all form data from IndexedDB
function getAllFormData(store) {
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
