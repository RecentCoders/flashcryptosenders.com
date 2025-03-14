import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Products | Flash Crypto Senders",
    template: "%s | Flash Crypto Senders Products",
  },
  description: "Explore our range of cryptocurrency transfer solutions including USDT, BTC, and ETH senders.",
  openGraph: {
    title: "Cryptocurrency Transfer Solutions",
    description: "Fast and secure cryptocurrency transfer solutions for USDT, BTC, and ETH",
    type: "website",
    url: "https://flashcryptosenders.xyz/products",
  },
  alternates: {
    canonical: "https://flashcryptosenders.xyz/products",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

