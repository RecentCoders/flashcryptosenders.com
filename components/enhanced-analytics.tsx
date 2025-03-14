'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function EnhancedAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // Track page views in all analytics services
    
    // Matomo tracking
    if (window._paq) {
      window._paq.push(['setCustomUrl', url])
      window._paq.push(['setDocumentTitle', document.title])
      window._paq.push(['trackPageView'])
    }
    
    // Plausible tracking
    if (window.plausible) {
      window.plausible('pageview', { props: { path: url } })
    }
    
    // SimpleAnalytics doesn't need manual page tracking for SPAs
    
  }, [pathname, searchParams])

  return (
    <>
      {/* Matomo */}
      <Script id="matomo-analytics" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://flashcryptosenders.matomo.cloud/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://cdn.matomo.cloud/flashcryptosenders.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
      
      {/* Plausible */}
      <Script 
        id="plausible-analytics" 
        defer 
        data-domain="flashcryptosenders.com" 
        src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-analytics-setup" strategy="afterInteractive">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>
      
      {/* Simple Analytics */}
      <Script 
        id="simple-analytics" 
        data-collect-dnt="true" 
        async 
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="afterInteractive"
      />
      <noscript>
        <img 
          src="https://queue.simpleanalyticscdn.com/noscript.gif?collect-dnt=true" 
          alt="" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      
      {/* Additional analytics event listeners */}
      <Script id="enhanced-analytics-events" strategy="afterInteractive">
        {`
          // Track form submissions
          document.addEventListener('submit', function(e) {
            const formId = e.target.id || 'unknown-form';
            
            // Track in Matomo
            if (window._paq) {
              window._paq.push(['trackEvent', 'Form', 'Submit', formId]);
            }
            
            // Track in Plausible
            if (window.plausible) {
              window.plausible('Form Submission', { props: { formId: formId } });
            }
          });
          
          // Track file downloads
          document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Check if it's a file download
            const fileExtensions = ['pdf', 'xlsx', 'docx', 'zip', 'csv'];
            const isDownload = fileExtensions.some(ext => href.toLowerCase().endsWith('.' + ext));
            
            if (isDownload) {
              const fileName = href.split('/').pop();
              
              // Track in Matomo
              if (window._paq) {
                window._paq.push(['trackEvent', 'Download', 'Click', fileName]);
              }
              
              // Plausible automatically tracks file downloads with the enhanced script
            }
          });
          
          // Track outbound links
          document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('http')) return;
            
            const currentHost = window.location.hostname;
            if (!href.includes(currentHost)) {
              const destination = new URL(href).hostname;
              
              // Track in Matomo
              if (window._paq) {
                window._paq.push(['trackEvent', 'Outbound', 'Click', destination]);
              }
              
              // Plausible automatically tracks outbound links with the enhanced script
            }
          });
        `}
      </Script>
    </>
  )
}
