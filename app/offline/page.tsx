import Link from "next/link"
import Image from "next/image"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="mb-8">
        <Image 
          src="/logo.png"
          alt="Flash Crypto Senders Logo"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
      
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        It seems you're not connected to the internet. Some features may be unavailable.
      </p>
      
      <div className="space-y-4 max-w-md">
        <div className="bg-muted p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Available Offline:</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>View cached transactions</li>
            <li>Access saved wallet addresses</li>
            <li>View cryptocurrency rates (last updated when online)</li>
          </ul>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Unavailable Until Online:</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>New transactions</li>
            <li>Current market rates</li>
            <li>Customer support chat</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}
