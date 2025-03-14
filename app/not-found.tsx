import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Page Not Found | FlashCryptoSenders',
  description: 'Sorry, the page you are looking for does not exist or has been moved.'
}

export default function NotFound() {
  const popularLinks = [
    { title: 'Send Crypto', href: '/transfer' },
    { title: 'Our Services', href: '/products' },
    { title: 'Trading Tips', href: '/trading-tips' },
    { title: 'FAQ', href: '/faq' },
    { title: 'Contact Support', href: '/contact' }
  ]

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative w-32 h-32 mb-6">
          <Image 
            src="/logo.png" 
            alt="FlashCryptoSenders Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-medium mb-6">Page Not Found</h2>
        
        <p className="text-lg text-muted-foreground max-w-lg mb-10">
          Sorry, the page you are looking for cannot be found or has been moved.
          Our team has been notified and will investigate any broken links.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 w-full max-w-2xl mb-10">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3">Popular Destinations</h3>
            <ul className="space-y-2">
              {popularLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-primary hover:text-primary/80 transition-colors flex items-center"
                  >
                    <span className="mr-2">&rarr;</span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3">Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 w-full"
            >
              Contact Support
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-white shadow transition-colors hover:bg-primary/90"
          >
            Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
