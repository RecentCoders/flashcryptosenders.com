// Component for embedding structured data in pages
export function StructuredData({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// Organization structured data
export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FlashCryptoSenders",
    "url": "https://flashcryptosenders.com",
    "logo": "https://flashcryptosenders.com/logo.png",
    "sameAs": [
      "https://twitter.com/flashcryptosenders",
      "https://facebook.com/flashcryptosenders",
      "https://instagram.com/flashcryptosenders",
      "https://linkedin.com/company/flashcryptosenders"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-1234",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Crypto Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94107",
      "addressCountry": "US"
    }
  }
  
  return <StructuredData data={organizationData} />
}

// Service structured data
export function ServiceStructuredData() {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Cryptocurrency Transfer Service",
    "provider": {
      "@type": "Organization",
      "name": "FlashCryptoSenders",
      "url": "https://flashcryptosenders.com"
    },
    "name": "Crypto Transfer Services",
    "description": "Fast and secure cryptocurrency transfer services with low fees and instant delivery.",
    "offers": {
      "@type": "Offer",
      "price": "0.99",
      "priceCurrency": "USD"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Cryptocurrency Users"
    }
  }
  
  return <StructuredData data={serviceData} />
}

// FAQ structured data
export function FaqStructuredData({ questions }: { 
  questions: Array<{ question: string; answer: string; }>
}) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }
  
  return <StructuredData data={faqData} />
}

// Article structured data
export function ArticleStructuredData({ 
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName
}: { 
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlashCryptoSenders",
      "logo": {
        "@type": "ImageObject",
        "url": "https://flashcryptosenders.com/logo.png"
      }
    }
  }
  
  return <StructuredData data={articleData} />
}

// BreadcrumbList structured data
export function BreadcrumbStructuredData({ 
  items 
}: { 
  items: Array<{ name: string; item: string; }>
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  }
  
  return <StructuredData data={breadcrumbData} />
}

// Product structured data
export function ProductStructuredData({
  name,
  image,
  description,
  price,
  currency = "USD",
  availability = "https://schema.org/InStock",
  rating = null
}: {
  name: string;
  image: string;
  description: string;
  price: string;
  currency?: string;
  availability?: string;
  rating?: {
    ratingValue: string;
    reviewCount: number;
  } | null;
}) {
  const productData: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": image,
    "description": description,
    "offers": {
      "@type": "Offer",
      "url": "https://flashcryptosenders.com/products",
      "price": price,
      "priceCurrency": currency,
      "availability": availability,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    }
  }
  
  if (rating) {
    productData.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": rating.ratingValue,
      "reviewCount": rating.reviewCount
    }
  }
  
  return <StructuredData data={productData} />
}

// WebSite structured data for search box
export function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FlashCryptoSenders",
    "url": "https://flashcryptosenders.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://flashcryptosenders.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  
  return <StructuredData data={websiteData} />
}
