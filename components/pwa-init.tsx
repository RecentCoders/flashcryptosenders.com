'use client'

import { useEffect } from 'react'

export function PWAInit() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      // Register service worker
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope)
          })
          .catch((err) => {
            console.error('Service Worker registration failed:', err)
          })
      }

      // Setup push notifications if supported
      if ('Notification' in window && 'PushManager' in window) {
        setupPushNotifications()
      }
    }
  }, [])

  const setupPushNotifications = async () => {
    try {
      // Check permission status
      const permission = await Notification.requestPermission()
      
      if (permission !== 'granted') {
        console.log('Notification permission not granted')
        return
      }

      // In a real app, you would subscribe the user to push notifications here
      // and send the subscription object to your server
    } catch (error) {
      console.error('Error setting up push notifications:', error)
    }
  }

  return null
}
