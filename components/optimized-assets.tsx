'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// This component helps reduce unused CSS and optimize loading of external resources
export function OptimizedAssets({
  criticalStyles = true,
  deferThirdParty = true,
  criticalScripts = [],
}) {
  useEffect(() => {
    // Function to handle dynamic loading of non-critical CSS
    const loadNonCriticalCSS = () => {
      const nonCriticalStyles = document.querySelectorAll('link[data-non-critical="true"]')
      nonCriticalStyles.forEach(link => {
        link.setAttribute('media', 'all')
      })
    }

    // Wait until after first paint to load non-critical CSS
    if (typeof window !== 'undefined' && typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        loadNonCriticalCSS()
      })
    } else {
      setTimeout(loadNonCriticalCSS, 1000)
    }

    // Function to handle removal of unused CSS selectors
    // This is simplified and would need a better implementation for production
    const removeUnusedCSS = () => {
      if (process.env.NODE_ENV !== 'production') return

      setTimeout(() => {
        try {
          // Get all stylesheets
          const sheets = document.styleSheets
          for (let i = 0; i < sheets.length; i++) {
            const sheet = sheets[i]
            if (!sheet.href || sheet.href.includes('chrome-extension://')) continue
            
            try {
              // Get rules
              const rules = sheet.cssRules || sheet.rules
              for (let j = 0; j < rules.length; j++) {
                const rule = rules[j]
                if (rule.type !== 1) continue // Only process style rules
                
                // Try to find elements matching the selector
                if (rule.selectorText) {
                  try {
                    const elements = document.querySelectorAll(rule.selectorText)
                    if (elements.length === 0) {
                      // No elements match this selector, could be removed
                      // But we'll just log it for now as direct removal can cause issues
                      console.debug('Unused CSS:', rule.selectorText)
                    }
                  } catch (e) {
                    // Invalid selector, ignore
                  }
                }
              }
            } catch (e) {
              // CORS issues or other errors, skip this sheet
              continue
            }
          }
        } catch (e) {
          console.error('Error analyzing CSS:', e)
        }
      }, 3000)
    }

    // Only run in development to help identify issues
    if (process.env.NODE_ENV === 'development') {
      removeUnusedCSS()
    }

    return () => {
      // Cleanup if needed
    }
  }, [criticalStyles])

  return (
    <>
      {deferThirdParty && (
        <>
          {/* Load critical scripts first */}
          {criticalScripts.map((script, index) => (
            <Script 
              key={`critical-script-${index}`}
              src={script}
              strategy="beforeInteractive"
            />
          ))}
          
          {/* Preconnect to origins */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Add a way to load non-critical CSS after page load */}
          <noscript>
            {/* Fallback for no-JS environments */}
            <link 
              rel="stylesheet" 
              href="/css/non-critical.css"
            />
          </noscript>
        </>
      )}
    </>
  )
}

// Component to help with animation optimization
export function OptimizedAnimations() {
  useEffect(() => {
    const prepareForAnimation = () => {
      // Find elements with animations
      const animatedElements = document.querySelectorAll('[data-animate="true"]')
      
      // Apply will-change to optimize animations and avoid non-composited animations
      animatedElements.forEach(el => {
        // Only apply will-change when the element is about to animate
        el.addEventListener('animationstart', () => {
          el.setAttribute('style', 'will-change: transform, opacity;')
        })
        
        // Remove will-change after animation completes to free up resources
        el.addEventListener('animationend', () => {
          el.removeAttribute('style')
        })
      })
      
      // Handle transitions similarly
      const transitionElements = document.querySelectorAll('[data-transition="true"]')
      transitionElements.forEach(el => {
        el.addEventListener('transitionstart', () => {
          el.setAttribute('style', 'will-change: transform, opacity;')
        })
        el.addEventListener('transitionend', () => {
          el.removeAttribute('style')
        })
      })
    }
    
    // Wait for content to load before optimizing animations
    if (document.readyState === 'complete') {
      prepareForAnimation()
    } else {
      window.addEventListener('load', prepareForAnimation)
      return () => window.removeEventListener('load', prepareForAnimation)
    }
  }, [])
  
  return null
}
