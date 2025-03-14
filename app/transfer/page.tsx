import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoTransferCard } from "@/components/crypto-transfer-card"
import { StructuredData } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FadeIn } from "@/components/fade-in"
import { Zap, Shield, Globe, InfoIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Crypto Transfer | Flash Crypto Senders",
  description:
    "Transfer cryptocurrencies instantly with our Flash Crypto Transfer technology. Support for BTC, ETH, and USDT with minimal fees and maximum security.",
  keywords: [
    "crypto transfer",
    "bitcoin transfer",
    "ethereum transfer",
    "usdt transfer",
    "fast crypto",
    "secure crypto transfer",
    "web3 transfer",
  ],
  alternates: {
    canonical: "https://flashcryptosenders.xyz/transfer",
  },
}

export default function TransferPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Flash Crypto Transfer",
    description: "Transfer cryptocurrencies instantly with our Flash Crypto Transfer technology",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1256",
    },
    featureList: [
      "Instant cryptocurrency transfers",
      "Multiple cryptocurrency support",
      "Web3 wallet integration",
      "Military-grade security",
    ],
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16">
        <div className="container">
          <Breadcrumbs
            items={[
              { title: "Home", href: "/" },
              { title: "Transfer", href: "/transfer", current: true },
            ]}
          />

          <FadeIn>
            <div className="max-w-4xl mx-auto text-center my-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gecko-green/10 dark:bg-gecko-green/20 text-gecko-green dark:text-gecko-light text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" /> Web3 Enabled Transfer
              </div>
              <h1 className="text-4xl font-bold mb-6">Flash Crypto Transfer</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connect your web3 wallet and instantly transfer cryptocurrencies with minimal fees
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Transfers complete in seconds, not hours</p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold mb-2">100% Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Military-grade encryption for all transfers
                  </p>
                </div>

                <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold mb-2">Global Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Send to anyone, anywhere in the world</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex gap-3">
                <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Connect Your Wallet</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    This demo shows how Flash Crypto Senders integrates with Web3 wallets. Connect MetaMask or
                    WalletConnect to try the transfer feature.
                  </p>
                </div>
              </div>

              <Tabs defaultValue="usdt" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="usdt" className="flex items-center gap-2">
                    <Image src="/images/crypto/usdt.svg" alt="USDT" width={20} height={20} />
                    USDT
                  </TabsTrigger>
                  <TabsTrigger value="btc" className="flex items-center gap-2">
                    <Image src="/images/crypto/bitcoin.svg" alt="BTC" width={20} height={20} />
                    BTC
                  </TabsTrigger>
                  <TabsTrigger value="eth" className="flex items-center gap-2">
                    <Image src="/images/crypto/ethereum.svg" alt="ETH" width={20} height={20} />
                    ETH
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="usdt">
                  <CryptoTransferCard cryptoType="USDT" />
                </TabsContent>

                <TabsContent value="btc">
                  <CryptoTransferCard cryptoType="BTC" />
                </TabsContent>

                <TabsContent value="eth">
                  <CryptoTransferCard cryptoType="ETH" />
                </TabsContent>
              </Tabs>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4">Need a License?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  This is a demo of our Flash Crypto Sender. For full access and higher transfer limits, purchase a
                  license.
                </p>
                <Link
                  href="/license-plans"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  View License Plans
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  )
}

