'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';

interface SeoOptimizerProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
      type?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    handle?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    sizes?: string;
    type?: string;
    color?: string;
    as?: string;
    crossOrigin?: string;
  }>;
  schema?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
  nofollow?: boolean;
  hreflangEntries?: Array<{
    href: string;
    hrefLang: string;
  }>;
  monetization?: string;
}

export function SeoOptimizer({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags = [],
  additionalLinkTags = [],
  schema,
  noindex = false,
  nofollow = false,
  hreflangEntries = [],
  monetization,
}: SeoOptimizerProps) {
  // Use client-side effects for advanced SEO management
  useEffect(() => {
    // Track outbound links for SEO analysis
    const trackOutboundLinks = () => {
      const links = document.querySelectorAll('a[href^="http"]');
      links.forEach(link => {
        if (!link.getAttribute('href')?.includes(window.location.hostname)) {
          // Add tracking for outbound links
          link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (typeof window.gtag !== 'undefined') {
              window.gtag('event', 'click', {
                event_category: 'outbound',
                event_label: href,
                transport_type: 'beacon',
              });
            }
            
            if (typeof window._paq !== 'undefined') {
              window._paq.push(['trackLink', href, 'link']);
            }
          });
          
          // Add proper rel attributes for SEO if not already present
          const rel = link.getAttribute('rel');
          if (!rel) {
            link.setAttribute('rel', 'noopener noreferrer');
          } else if (!rel.includes('noopener')) {
            link.setAttribute('rel', `${rel} noopener noreferrer`);
          }
        }
      });
    };
    
    // Enhance internal links with preconnect/prefetch for better performance
    const enhanceInternalLinks = () => {
      const internalLinks = document.querySelectorAll('a[href^="/"]');
      internalLinks.forEach(link => {
        // Add data attributes for tracking
        link.setAttribute('data-tracked', 'true');
        
        // Add mouse tracking for enhanced analytics
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href && typeof window.navigator.connection !== 'undefined') {
            const connection = window.navigator.connection;
            if (!connection.saveData && connection.effectiveType !== 'slow-2g' && connection.effectiveType !== '2g') {
              // Prefetch only if user has good connection
              const linkEl = document.createElement('link');
              linkEl.rel = 'prefetch';
              linkEl.href = href;
              document.head.appendChild(linkEl);
              
              setTimeout(() => {
                document.head.removeChild(linkEl);
              }, 3000);
            }
          }
        });
      });
    };
    
    // Run SEO enhancements after page load
    trackOutboundLinks();
    enhanceInternalLinks();
    
    // Set up advanced schema markup dynamically
    if (schema && typeof window !== 'undefined') {
      const existingScript = document.getElementById('schema-script');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      
      const script = document.createElement('script');
      script.id = 'schema-script';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    
    // Clean up
    return () => {
      const schemaScript = document.getElementById('schema-script');
      if (schemaScript) {
        document.head.removeChild(schemaScript);
      }
    };
  }, [schema]);
  
  return (
    <>
      {title && <title>{title}</title>}
      
      {/* Basic Meta Tags */}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots Meta */}
      {(noindex || nofollow) && (
        <meta
          name="robots"
          content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}
        />
      )}
      
      {/* Open Graph */}
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type || 'website'} />
          {openGraph.title && <meta property="og:title" content={openGraph.title} />}
          {openGraph.description && <meta property="og:description" content={openGraph.description} />}
          {openGraph.url && <meta property="og:url" content={openGraph.url} />}
          {openGraph.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
          {openGraph.locale && <meta property="og:locale" content={openGraph.locale} />}
          
          {openGraph.images && openGraph.images.length > 0 && openGraph.images.map((image, index) => (
            <>
              <meta key={`og:image:${index}`} property="og:image" content={image.url} />
              <meta key={`og:image:width:${index}`} property="og:image:width" content={String(image.width)} />
              <meta key={`og:image:height:${index}`} property="og:image:height" content={String(image.height)} />
              <meta key={`og:image:alt:${index}`} property="og:image:alt" content={image.alt} />
              {image.type && <meta key={`og:image:type:${index}`} property="og:image:type" content={image.type} />}
            </>
          ))}
        </>
      )}
      
      {/* Twitter */}
      {twitter && (
        <>
          <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
          {twitter.site && <meta name="twitter:site" content={twitter.site} />}
          {twitter.handle && <meta name="twitter:creator" content={twitter.handle} />}
          {twitter.title && <meta name="twitter:title" content={twitter.title} />}
          {twitter.description && <meta name="twitter:description" content={twitter.description} />}
          {twitter.image && <meta name="twitter:image" content={twitter.image} />}
        </>
      )}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.length > 0 && additionalMetaTags.map((tag, index) => (
        <meta 
          key={`meta:${index}`}
          {...(tag.name && { name: tag.name })}
          {...(tag.property && { property: tag.property })}
          content={tag.content}
        />
      ))}
      
      {/* Additional Link Tags */}
      {additionalLinkTags.length > 0 && additionalLinkTags.map((tag, index) => (
        <link
          key={`link:${index}`}
          rel={tag.rel}
          href={tag.href}
          {...(tag.sizes && { sizes: tag.sizes })}
          {...(tag.type && { type: tag.type })}
          {...(tag.color && { color: tag.color })}
          {...(tag.as && { as: tag.as })}
          {...(tag.crossOrigin && { crossOrigin: tag.crossOrigin })}
        />
      ))}
      
      {/* Hreflang Tags */}
      {hreflangEntries.length > 0 && hreflangEntries.map((entry, index) => (
        <link
          key={`hreflang:${index}`}
          rel="alternate"
          href={entry.href}
          hrefLang={entry.hrefLang}
        />
      ))}
      
      {/* Monetization */}
      {monetization && <meta name="monetization" content={monetization} />}
      
      {/* Schema Data */}
      {schema && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}

// Backlink Generator Component
export function BacklinkManager({ 
  enabled = true,
  partnerSites = [],
  backlinksPerPage = 2,
}: { 
  enabled?: boolean; 
  partnerSites?: string[];
  backlinksPerPage?: number;
}) {
  useEffect(() => {
    if (!enabled) return;
    
    // List of partner sites for reciprocal backlinks
    const defaultPartners = [
      'https://trusted-partner1.com',
      'https://trusted-partner2.com',
      'https://industry-blog.com',
      'https://related-business.com',
    ];
    
    const partners = partnerSites.length > 0 ? partnerSites : defaultPartners;
    
    // Select random partners for this page
    const selectedPartners = partners
      .sort(() => 0.5 - Math.random())
      .slice(0, backlinksPerPage);
    
    // Find appropriate places to insert backlinks
    const paragraphs = document.querySelectorAll('p, article div, .content-area');
    
    if (paragraphs.length > 3) {
      // Only insert backlinks if we have enough content
      const eligibleParagraphs = Array.from(paragraphs)
        .filter(p => p.textContent && p.textContent.length > 100)
        .filter(p => !p.closest('header, footer, nav, aside'));
      
      if (eligibleParagraphs.length >= selectedPartners.length) {
        selectedPartners.forEach((partner, index) => {
          const paragraph = eligibleParagraphs[Math.floor(index * eligibleParagraphs.length / selectedPartners.length)];
          
          // Create backlink element
          const backlink = document.createElement('a');
          backlink.href = partner;
          backlink.rel = 'noopener noreferrer';
          backlink.classList.add('partner-link');
          backlink.setAttribute('data-backlink', 'true');
          backlink.textContent = `Visit our partner`;
          
          // Add backlink to paragraph
          const text = paragraph.textContent || '';
          if (text.length > 0) {
            // Insert at the end of paragraph
            paragraph.appendChild(document.createTextNode(' '));
            paragraph.appendChild(backlink);
          }
        });
      }
    }
    
    return () => {
      // Clean up backlinks if component unmounts
      document.querySelectorAll('a[data-backlink="true"]').forEach(link => {
        link.remove();
      });
    };
  }, [enabled, partnerSites, backlinksPerPage]);
  
  return null;
}

// Add TypeScript types for global objects
declare global {
  interface Navigator {
    connection: {
      effectiveType: string;
      saveData: boolean;
    };
  }
  
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
    _paq: any[];
  }
}
