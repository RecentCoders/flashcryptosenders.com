import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3PaymentProvider } from "@/components/web3-payment-provider"
import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/toaster"
import { PWAInit } from "@/components/pwa-init"
import { EnhancedAnalytics } from "@/components/enhanced-analytics"
import { OrganizationStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import dynamic from "next/dynamic"

// Dynamically import components that aren't required for initial render
const PageOptimization = dynamic(() => import('@/components/page-optimization').then(mod => mod.DefaultPageOptimization), {
  ssr: false
})

const OptimizedAnimations = dynamic(() => import('@/components/optimized-assets').then(mod => mod.OptimizedAnimations), {
  ssr: false
})

const OptimizedAssets = dynamic(() => import('@/components/optimized-assets').then(mod => mod.OptimizedAssets), {
  ssr: false
})

// Web Vitals Monitor for Core Web Vitals tracking
const WebVitalsMonitor = dynamic(() => import('@/components/web-vitals-monitor').then(mod => mod.WebVitalsMonitor), {
  ssr: false
})

// Navigation Prefetcher for faster subsequent page loads
const NavigationPrefetcher = dynamic(() => import('@/components/navigation-prefetcher').then(mod => mod.NavigationPrefetcher), {
  ssr: false
})

// Load Inter font with display swap for better performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://flashcryptosenders.com"),
  title: {
    default: "FlashCryptoSenders",
    template: "%s | FlashCryptoSenders",
  },
  description: "Secure and fast cryptocurrency transactions with industry-leading technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flashcryptosenders.com",
    siteName: "FlashCryptoSenders",
    title: "Flash Crypto Senders | Lightning-Fast Cryptocurrency Transactions",
    description: "Experience lightning-fast and secure cryptocurrency transactions with industry-leading technology.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flash Crypto Senders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash Crypto Senders | Lightning-Fast Cryptocurrency Transactions",
    description: "Experience lightning-fast and secure cryptocurrency transactions with industry-leading technology.",
    images: ["/twitter-image.jpg"],
    creator: "@FlashCrypto",
    site: "@flashcryptosenders",
  },
  keywords: [
    "cryptocurrency",
    "crypto transfers",
    "bitcoin",
    "ethereum",
    "blockchain",
    "fast transfers",
    "secure crypto",
    "USDT sender",
    "BTC transfer",
    "ETH transaction",
    "instant crypto",
    "crypto wallet",
    "crypto payment",
    "blockchain transfer",
    "flash crypto",
    "web3 wallet",
  ],
  authors: [{ name: "Flash Crypto Team", url: "https://flashcryptosenders.com" }],
  creator: "Flash Crypto Team",
  publisher: "Flash Crypto Senders",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon-16x16.png", "/favicon-32x32.png"],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    bing: "bing-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* 
          Theme-color meta tags not supported in Firefox, but used for other browsers
          Firefox uses the background-color from manifest.json instead
        */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.matomo.cloud" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://scripts.simpleanalyticscdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetching as fallback */}
        <link rel="dns-prefetch" href="https://cdn.matomo.cloud" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://scripts.simpleanalyticscdn.com" />
        
        {/* Prefetch critical assets */}
        <link rel="prefetch" href="/logo.png" as="image" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Structured data for better SEO */}
        <OrganizationStructuredData />
        <WebsiteStructuredData />
        
        {/* Optimization for LCP */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Prevent Flash of Unstyled Content (FOUC)
            document.documentElement.classList.add('js-loading');
            window.addEventListener('load', function() {
              document.documentElement.classList.remove('js-loading');
            });
          `
        }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3PaymentProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </Web3PaymentProvider>
        </ThemeProvider>
        
        {/* Load performance monitoring first */}
        <SpeedInsights />
        <WebVitalsMonitor 
          enabled={true}
          debug={typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development'}
          reportTo={['analytics', 'console']}
          samplingRate={0.5} // Only track 50% of users to reduce analytics volume
        />
        
        {/* Navigation prefetching for faster page transitions */}
        <NavigationPrefetcher 
          prefetchOnHover={true}
          prefetchOnVisible={true}
          prefetchMainRoutes={true}
          mainRoutes={['/about', '/products', '/transfer', '/faq', '/contact']}
        />
        
        {/* Defer non-critical parts */}
        <EnhancedAnalytics />
        <PWAInit />
        <PageOptimization />
        <OptimizedAnimations />
        <OptimizedAssets 
          criticalStyles={true}
          deferThirdParty={true}
          criticalScripts={[]}
        />
      </body>
    </html>
  )
}