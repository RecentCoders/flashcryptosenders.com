// FlashCryptoSenders Service Worker Registration
// This script registers our service worker for offline functionality and performance

// Register service worker only in production and if browser supports it
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', function() {
    const swUrl = '/service-worker.js';
    
    // Helper function to check if we're on localhost
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    
    if (isLocalhost) {
      // Running on localhost - check if service worker still exists
      checkValidServiceWorker(swUrl);
      
      // Add additional logging on localhost
      navigator.serviceWorker.ready.then(() => {
        console.log(
          'FlashCryptoSenders is using a service worker in development mode.'
        );
      });
    } else {
      // Not localhost - register service worker
      registerValidSW(swUrl);
    }
  });
}

// Function to register the service worker
function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      // Successful registration
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated content has been fetched
              console.log(
                'New content is available and will be used when all tabs are closed.'
              );
              
              // Optional: Show a notification to the user that new content is available
              if (window.showUpdateNotification) {
                window.showUpdateNotification();
              }
            } else {
              // At this point, everything has been precached
              console.log('Content is cached for offline use.');
              
              // Optional: Notify user that app is ready for offline use
              if (window.showOfflineReadyNotification) {
                window.showOfflineReadyNotification();
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

// Function to check if the service worker is still valid
function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Ensure service worker exists and that we really are getting a JS file
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found - reload the page
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found - proceed as normal
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

// Helper function to update the service worker
window.updateServiceWorker = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.update();
      })
      .catch(error => {
        console.error('Error updating service worker:', error);
      });
  }
};

// Helper function to unregister the service worker
window.unregisterServiceWorker = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error('Error unregistering service worker:', error);
      });
  }
};

// Add event listeners for online/offline events
window.addEventListener('online', function() {
  // Document is online
  document.body.classList.remove('offline');
  document.body.classList.add('online');
  
  // Sync any pending data
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(registration => {
        return registration.sync.register('sync-forms');
      })
      .catch(err => {
        console.error('Background sync could not be registered:', err);
      });
  }
});

window.addEventListener('offline', function() {
  // Document is offline
  document.body.classList.remove('online');
  document.body.classList.add('offline');
  
  // Optional: Show an offline notification
  if (window.showOfflineNotification) {
    window.showOfflineNotification();
  }
});
