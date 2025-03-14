import type { Metadata } from "next"
import { StructuredData } from "@/components/structured-data"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { CriticalImage } from "@/components/critical-image"

// Import critical above-the-fold components directly
import { HeroSection } from "@/components/hero-section"
import { CryptoTicker } from "@/components/crypto-ticker"

// Dynamic imports for below-the-fold components to improve initial load time
const TrustedPartners = dynamic(() => import('@/components/trusted-partners').then(mod => mod.TrustedPartners), {
  loading: () => <div className="content-placeholder h-32 my-8 rounded-lg bg-gray-100 animate-pulse"></div>
})

const FeaturesSection = dynamic(() => import('@/components/features-section').then(mod => mod.FeaturesSection), {
  ssr: true // Still pre-render this for SEO, but hydrate it later
})

const TestimonialSection = dynamic(() => import('@/components/testimonial-section').then(mod => mod.TestimonialSection), {
  loading: () => <div className="content-placeholder h-64 my-8 rounded-lg bg-gray-100 animate-pulse"></div>
})

const PricingSection = dynamic(() => import('@/components/pricing-section').then(mod => mod.PricingSection))
const FaqSection = dynamic(() => import('@/components/faq-section').then(mod => mod.FaqSection))
const CtaSection = dynamic(() => import('@/components/cta-section').then(mod => mod.CtaSection))

export const metadata: Metadata = {
  title: "Flash Crypto Senders | Lightning-Fast Cryptocurrency Transactions",
  description:
    "Experience lightning-fast and secure cryptocurrency transactions with industry-leading technology. Send crypto in seconds, not hours. Trusted by over 100,000 users worldwide.",
  alternates: {
    canonical: "https://flashcryptosenders.com",
  },
  keywords: [
    "fast crypto transfers",
    "secure cryptocurrency transactions",
    "instant bitcoin transfer",
    "quick USDT sender",
    "ETH transfer service",
    "crypto transaction platform",
    "blockchain transfer service",
    "USDT flash sender",
    "flash USDT",
    "crypto flash transfer",
  ],
  // Add viewport directive for better mobile optimization
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  // Add additional metadata for improved performance
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  },
  // Additional OpenGraph data
  openGraph: {
    title: "Flash Crypto Senders | Lightning-Fast Cryptocurrency Transactions",
    description: "Experience lightning-fast and secure cryptocurrency transactions with industry-leading technology.",
    url: "https://flashcryptosenders.com",
    siteName: "Flash Crypto Senders",
    images: [
      {
        url: "https://flashcryptosenders.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flash Crypto Senders"
      }
    ],
    locale: "en_US",
    type: "website"
  }
}

// PreloadedImages component to ensure early loading of critical images
function PreloadedImages() {
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      {/* Preload logo */}
      <CriticalImage 
        src="/logo.png" 
        alt="Flash Crypto Senders Logo" 
        width={180} 
        height={60} 
        priority={true}
      />
      {/* Preload hero image */}
      <CriticalImage 
        src="/hero-image.jpg" 
        alt="Hero Background" 
        width={1920} 
        height={1080} 
        priority={true}
      />
    </div>
  )
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flash Crypto Senders",
    url: "https://flashcryptosenders.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://flashcryptosenders.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description: "Experience lightning-fast and secure cryptocurrency transactions with industry-leading technology.",
    publisher: {
      "@type": "Organization",
      name: "Flash Crypto Senders",
      logo: {
        "@type": "ImageObject",
        url: "https://flashcryptosenders.com/logo.png",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1245",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "9.99",
      highPrice: "99.99",
      priceCurrency: "USD",
      offerCount: "3",
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />
      
      {/* Preload critical images */}
      <PreloadedImages />

      {/* Crypto Ticker - Above the fold, keep it synchronous */}
      <CryptoTicker />

      {/* Hero Section - Critical for LCP, keep it synchronous */}
      <HeroSection />

      {/* Everything below this is not critical for LCP and can be loaded lazily */}
      <div className="below-fold">
        {/* Features Section - Important for SEO so still SSR it */}
        <FeaturesSection />

        {/* Suspense for remaining sections to optimize loading */}
        <Suspense fallback={<div className="content-placeholder h-32 my-8 rounded-lg bg-gray-100 animate-pulse"></div>}>
          {/* Trusted Partners Section */}
          <TrustedPartners />
        </Suspense>

        <Suspense fallback={<div className="content-placeholder h-64 my-8 rounded-lg bg-gray-100 animate-pulse"></div>}>
          {/* Testimonials Section */}
          <TestimonialSection />
        </Suspense>

        <Suspense fallback={<div className="content-placeholder h-96 my-8 rounded-lg bg-gray-100 animate-pulse"></div>}>
          {/* Pricing Section */}
          <PricingSection />
        </Suspense>

        <Suspense fallback={<div className="content-placeholder h-64 my-8 rounded-lg bg-gray-100 animate-pulse"></div>}>
          {/* FAQ Section */}
          <FaqSection />
        </Suspense>

        <Suspense fallback={<div className="content-placeholder h-32 my-8 rounded-lg bg-gray-100 animate-pulse"></div>}>
          {/* CTA Section */}
          <CtaSection />
        </Suspense>
      </div>
    </>
  )
}
