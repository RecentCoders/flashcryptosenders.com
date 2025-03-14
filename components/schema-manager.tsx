'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface SchemaManagerProps {
  siteTitle?: string;
  siteDescription?: string;
  siteUrl?: string;
  siteLogo?: string;
  organizationName?: string;
  socialProfiles?: string[];
  schema?: Record<string, any>;
  breadcrumbItems?: BreadcrumbItem[];
  type?: 'article' | 'product' | 'faq' | 'service' | 'organization' | 'website';
  article?: ArticleSchema;
  product?: ProductSchema;
  faq?: FAQSchema;
  service?: ServiceSchema;
}

interface BreadcrumbItem {
  name: string;
  item: string;
  position: number;
}

interface ArticleSchema {
  headline: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  description?: string;
  keywords?: string[];
  articleSection?: string;
}

interface ProductSchema {
  name: string;
  image: string;
  description: string;
  sku?: string;
  brand?: {
    name: string;
  };
  offers?: {
    price: number;
    priceCurrency: string;
    availability: string;
    url?: string;
    priceValidUntil?: string;
  };
  review?: {
    reviewCount: number;
    ratingValue: number;
  };
}

interface FAQSchema {
  questions: {
    question: string;
    answer: string;
  }[];
}

interface ServiceSchema {
  name: string;
  description: string;
  provider?: {
    name: string;
    url?: string;
  };
  serviceType?: string;
  areaServed?: string[];
}

/**
 * Schema Manager Component - Generates and injects schema structured data
 * for search engine optimization
 * 
 * @component
 */
export function SchemaManager({
  siteTitle = 'FlashCryptoSenders',
  siteDescription = 'Fast and secure cryptocurrency transfer services',
  siteUrl = 'https://flashcryptosenders.com',
  siteLogo = 'https://flashcryptosenders.com/images/logo.png',
  organizationName = 'FlashCryptoSenders',
  socialProfiles = [],
  schema = {},
  breadcrumbItems = [],
  type,
  article,
  product,
  faq,
  service
}: SchemaManagerProps) {
  // Get current path for URL generation
  const pathname = usePathname();
  const currentUrl = `${siteUrl}${pathname}`;
  
  // Generate org schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    url: siteUrl,
    logo: siteLogo,
    sameAs: socialProfiles
  };
  
  // Generate website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: siteTitle,
    description: siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  
  // Generate breadcrumb schema if items exist
  const breadcrumbSchema = breadcrumbItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.item
    }))
  } : null;
  
  // Generate type-specific schema
  let typeSpecificSchema = null;
  
  if (type === 'article' && article) {
    typeSpecificSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl
      },
      headline: article.headline,
      image: [article.image],
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        '@type': 'Person',
        name: article.author?.name || 'FlashCryptoSenders Team',
        url: article.author?.url
      },
      publisher: {
        '@type': 'Organization',
        name: article.publisher?.name || organizationName,
        logo: {
          '@type': 'ImageObject',
          url: article.publisher?.logo || siteLogo
        }
      },
      description: article.description || siteDescription,
      keywords: article.keywords,
      articleSection: article.articleSection
    };
  }
  
  if (type === 'product' && product) {
    typeSpecificSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.image,
      description: product.description,
      sku: product.sku,
      brand: product.brand ? {
        '@type': 'Brand',
        name: product.brand.name
      } : undefined,
      offers: product.offers ? {
        '@type': 'Offer',
        price: product.offers.price,
        priceCurrency: product.offers.priceCurrency,
        availability: `https://schema.org/${product.offers.availability}`,
        url: product.offers.url || currentUrl,
        priceValidUntil: product.offers.priceValidUntil
      } : undefined,
      aggregateRating: product.review ? {
        '@type': 'AggregateRating',
        ratingValue: product.review.ratingValue,
        reviewCount: product.review.reviewCount
      } : undefined
    };
  }
  
  if (type === 'faq' && faq) {
    typeSpecificSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.questions.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
  }
  
  if (type === 'service' && service) {
    typeSpecificSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: service.provider ? {
        '@type': 'Organization',
        name: service.provider.name,
        url: service.provider.url
      } : undefined,
      serviceType: service.serviceType,
      areaServed: service.areaServed ? service.areaServed.map(area => ({
        '@type': 'GeoCircle',
        name: area
      })) : undefined
    };
  }
  
  // Compile all schemas
  const schemas = [
    organizationSchema,
    websiteSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(typeSpecificSchema ? [typeSpecificSchema] : []),
    ...(Object.keys(schema).length > 0 ? [schema] : [])
  ];
  
  // Track schema usage for analytics
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Report schema usage to analytics
      const schemaTypes = schemas.map(s => s['@type']).join(',');
      
      // Track in analytics if available
      if (window.gtag) {
        window.gtag('event', 'schema_loaded', {
          schema_types: schemaTypes,
          page_path: pathname
        });
      }
    }
  }, [pathname]);
  
  return (
    <>
      {schemas.map((schemaItem, index) => (
        <Script
          key={`schema-${index}`}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem)
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}

// Helper component for creating an Article schema
export function ArticleSchema({
  headline,
  image,
  publishDate,
  modifyDate,
  authorName,
  authorUrl,
  description,
  children
}: {
  headline: string;
  image: string;
  publishDate: string;
  modifyDate?: string;
  authorName?: string;
  authorUrl?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SchemaManager 
        type="article"
        article={{
          headline,
          image,
          datePublished: publishDate,
          dateModified: modifyDate,
          author: {
            name: authorName || 'FlashCryptoSenders Team',
            url: authorUrl
          },
          description
        }}
      />
      {children}
    </>
  );
}

// Helper component for creating a Product schema
export function ProductSchema({
  name,
  image,
  description,
  price,
  currency = 'USD',
  availability = 'InStock',
  brandName,
  children
}: {
  name: string;
  image: string;
  description: string;
  price: number;
  currency?: string;
  availability?: string;
  brandName?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SchemaManager 
        type="product"
        product={{
          name,
          image,
          description,
          brand: brandName ? { name: brandName } : undefined,
          offers: {
            price,
            priceCurrency: currency,
            availability
          }
        }}
      />
      {children}
    </>
  );
}

// Helper for type safety with gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, any>
    ) => void;
  }
}
