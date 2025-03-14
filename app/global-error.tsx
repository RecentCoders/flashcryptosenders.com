"use client"

import { useEffect } from "react"
import Image from "next/image"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error occurred:", error)
    
    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: sendToErrorTracking(error)
    }
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground">
          <div className="text-center max-w-lg">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <Image 
                src="/logo.png" 
                alt="FlashCryptoSenders Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>

            <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">Oops!</h1>
            <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
            
            <p className="text-muted-foreground mb-4">
              We apologize for the inconvenience. Our team has been notified about this issue.
            </p>
            
            {error.digest && (
              <div className="mb-6 p-3 bg-muted rounded-md">
                <p className="text-sm font-mono text-muted-foreground break-all">
                  Error ID: {error.digest}
                </p>
              </div>
            )}
            
            <div className="mb-8 max-w-md mx-auto">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">You can try:</h3>
                <ul className="text-left text-muted-foreground space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">•</span>
                    <span>Refreshing the page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">•</span>
                    <span>Clearing your browser cache</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">•</span>
                    <span>Checking your internet connection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5">•</span>
                    <span>Trying again later</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
              >
                Try Again
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
              >
                Return Home
              </a>
            </div>
            
            <div className="mt-8">
              <a
                href="/contact"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
