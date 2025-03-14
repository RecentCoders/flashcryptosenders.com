'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface PageOptimizationProps {
  prefetchPaths?: string[]
  lazyLoadThreshold?: number
  preconnectUrls?: string[]
}

export default function PageOptimization({
  prefetchPaths = [],
  lazyLoadThreshold = 0.1,
  preconnectUrls = []
}: PageOptimizationProps) {
  const pathname = usePathname()

  // Handle preconnect for external domains
  useEffect(() => {
    if (preconnectUrls.length > 0) {
      preconnectUrls.forEach(url => {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = url
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)

        // Also add DNS-prefetch as fallback
        const dnsLink = document.createElement('link')
        dnsLink.rel = 'dns-prefetch'
        dnsLink.href = url
        document.head.appendChild(dnsLink)
      })
    }
  }, [preconnectUrls])

  // Handle prefetching of critical pages
  useEffect(() => {
    if (prefetchPaths.length > 0) {
      prefetchPaths.forEach(path => {
        if (path !== pathname) {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.href = path
          document.head.appendChild(link)
        }
      })
    }
  }, [prefetchPaths, pathname])

  // Implementation of lazy loading with Intersection Observer
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]')
      const lazyIframes = document.querySelectorAll('iframe[loading="lazy"]')
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
            }
            imageObserver.unobserve(img)
          }
        })
      }, { threshold: lazyLoadThreshold, rootMargin: '200px' })

      const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target as HTMLIFrameElement
            if (iframe.dataset.src) {
              iframe.src = iframe.dataset.src
              iframe.removeAttribute('data-src')
            }
            iframeObserver.unobserve(iframe)
          }
        })
      }, { threshold: lazyLoadThreshold, rootMargin: '200px' })

      lazyImages.forEach(img => imageObserver.observe(img))
      lazyIframes.forEach(iframe => iframeObserver.observe(iframe))

      return () => {
        lazyImages.forEach(img => imageObserver.unobserve(img))
        lazyIframes.forEach(iframe => iframeObserver.unobserve(iframe))
      }
    }
  }, [lazyLoadThreshold, pathname])

  // Script prioritization
  useEffect(() => {
    const deferScripts = () => {
      const scripts = document.querySelectorAll('script[defer]')
      scripts.forEach(script => {
        const newScript = document.createElement('script')
        Array.from(script.attributes).forEach(attr => {
          if (attr.name !== 'defer') {
            newScript.setAttribute(attr.name, attr.value)
          }
        })
        newScript.innerHTML = script.innerHTML
        script.parentNode?.replaceChild(newScript, script)
      })
    }

    // Run script deferrals after the page has loaded
    if (document.readyState === 'complete') {
      deferScripts()
    } else {
      window.addEventListener('load', deferScripts)
      return () => window.removeEventListener('load', deferScripts)
    }
  }, [pathname])

  // Analytics performance monitoring
  useEffect(() => {
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfEntries = performance.getEntriesByType('navigation')
          if (perfEntries.length > 0) {
            const navEntry = perfEntries[0] as PerformanceNavigationTiming
            
            // Send to analytics
            if (window._paq) {
              window._paq.push(['trackEvent', 'Performance', 'PageLoad', pathname, Math.round(navEntry.domComplete)])
              window._paq.push(['trackEvent', 'Performance', 'TTFB', pathname, Math.round(navEntry.responseStart)])
              window._paq.push(['trackEvent', 'Performance', 'DOMContentLoaded', pathname, Math.round(navEntry.domContentLoadedEventEnd)])
            }
            
            if (window.plausible) {
              window.plausible('PerformanceMetrics', {
                props: {
                  url: pathname,
                  loadTime: Math.round(navEntry.domComplete),
                  ttfb: Math.round(navEntry.responseStart),
                  domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd)
                }
              })
            }
          }
        }, 0)
      })
    }
  }, [pathname])

  return null
}

// Create a default configuration with commonly used third-party domains
export function DefaultPageOptimization() {
  const commonPaths = [
    '/', 
    '/products', 
    '/transfer', 
    '/contact', 
    '/about'
  ]
  
  const commonDomains = [
    'https://cdn.matomo.cloud',
    'https://plausible.io',
    'https://scripts.simpleanalyticscdn.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
  
  return (
    <PageOptimization
      prefetchPaths={commonPaths}
      preconnectUrls={commonDomains}
      lazyLoadThreshold={0.1}
    />
  )
}
