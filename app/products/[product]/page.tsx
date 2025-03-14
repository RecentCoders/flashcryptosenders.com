import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Zap, Bitcoin, DollarSign, Shield, Clock, Wallet, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"
import { PaymentButton } from "@/components/payment-button"
import { FadeIn } from "@/components/fade-in"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Product data
const products = {
  "flash-usdt-sender": {
    title: "Flash USDT Sender",
    description:
      "Transfer USDT quickly and efficiently with our Flash USDT Sender. Enjoy advanced TRC20 support for lightning-fast stablecoin transactions.",
    icon: DollarSign,
    features: [
      "Rapid USDT transfers",
      "Advanced TRC20 support",
      "Low transaction costs",
      "Real-time transaction monitoring",
      "Multi-wallet compatibility",
      "370 days validity",
      "P2P transaction support",
      "No transaction limits",
    ],
    benefits: [
      "Save time with instant transfers",
      "Reduce transaction fees",
      "Enhance security with advanced encryption",
      "Access global markets without restrictions",
      "Enjoy 24/7 customer support",
    ],
    protocol: "TRC20",
    currency: "USDT",
    price: 29.99,
    lastUpdated: "2025-02-15",
    image: "/images/products/usdt-sender.webp",
    plans: [
      {
        name: "Basic",
        duration: "1 Day",
        price: 150,
        limit: "2k flash",
      },
      {
        name: "Basic",
        duration: "7 Days",
        price: 350,
        limit: "20k flash",
      },
      {
        name: "Basic",
        duration: "1 Month",
        price: 1000,
        limit: "200k flash",
      },
      {
        name: "Infinity",
        duration: "1 Day",
        price: 300,
        limit: "35k flash",
        popular: true,
      },
      {
        name: "Infinity",
        duration: "7 Days",
        price: 750,
        limit: "350k flash",
        popular: true,
      },
      {
        name: "Infinity",
        duration: "1 Month",
        price: 2500,
        limit: "750k flash",
        popular: true,
      },
      {
        name: "Master",
        duration: "1 Day",
        price: 1000,
        limit: "950k flash",
        premium: true,
      },
      {
        name: "Master",
        duration: "7 Days",
        price: 2500,
        limit: "30M flash",
        premium: true,
      },
      {
        name: "Master",
        duration: "1 Month",
        price: 7500,
        limit: "500M flash",
        premium: true,
      },
    ],
  },
  "flash-btc-sender": {
    title: "Flash BTC Sender",
    description:
      "Send Bitcoin instantly and securely across the globe with our Flash BTC Sender. Experience lightning-fast transactions and top-notch security for all your Bitcoin transfers.",
    icon: Bitcoin,
    features: [
      "Instant Bitcoin transfers",
      "Low transaction fees",
      "Advanced security measures",
      "Real-time transaction tracking",
      "Support for multiple wallets",
      "370 days validity",
      "P2P transaction support",
      "No transaction limits",
    ],
    benefits: [
      "Bypass blockchain congestion",
      "Eliminate high network fees",
      "Transfer Bitcoin in seconds",
      "Maintain complete privacy",
      "Access 24/7 technical support",
    ],
    protocol: "Bitcoin Network",
    currency: "BTC",
    price: 39.99,
    lastUpdated: "2025-02-15",
    image: "/images/products/btc-sender.webp",
    plans: [
      {
        name: "Basic",
        duration: "1 Day",
        price: 150,
        limit: "0.05 BTC",
      },
      {
        name: "Basic",
        duration: "7 Days",
        price: 350,
        limit: "0.5 BTC",
      },
      {
        name: "Basic",
        duration: "1 Month",
        price: 1000,
        limit: "2 BTC",
      },
      {
        name: "Infinity",
        duration: "1 Day",
        price: 300,
        limit: "0.5 BTC",
        popular: true,
      },
      {
        name: "Infinity",
        duration: "7 Days",
        price: 750,
        limit: "5 BTC",
        popular: true,
      },
      {
        name: "Infinity",
        duration: "1 Month",
        price: 2500,
        limit: "10 BTC",
        popular: true,
      },
      {
        name: "Master",
        duration: "1 Day",
        price: 1000,
        limit: "2 BTC",
        premium: true,
      },
      {
        name: "Master",
        duration: "7 Days",
        price: 2500,
        limit: "20 BTC",
        premium: true,
      },
      {
        name: "Master",
        duration: "1 Month",
        price: 7500,
        limit: "50 BTC",
        premium: true,
      },
    ],
  },
  "flash-eth-sender": {
    title: "Flash ETH Sender",
    description:
      "Transfer Ethereum securely and quickly with Flash ETH Sender. Experience fast and reliable transactions on the Ethereum network with advanced features.",
    icon: Zap,
    features: [
      "Fast Ethereum transfers",
      "ERC20 token support",
      "Gas optimization",
      "Smart contract integration",
      "Multi-wallet support",
      "370 days validity",
      "P2P transaction support",
      "No transaction limits",
    ],
    benefits: [
      "Avoid high gas fees",
      "Transfer ETH instantly",
      "Support for all ERC20 tokens",
      "Enhanced security protocols",
      "Dedicated customer support",
    ],
    protocol: "ERC20",
    currency: "ETH",
    price: 34.99,
    lastUpdated: "2025-02-15",
    image: "/images/products/eth-sender.webp",
    plans: [
      {
        name: "Basic",
        duration: "1 Day",
        price: 150,
        limit: "1 ETH",
      },
      {
        name: "Basic",
        duration: "7 Days",
        price: 350,
        limit: "10 ETH",
      },
      {
        name: "Basic",
        duration: "1 Month",
        price: 1000,
        limit: "30 ETH",
      },
      {
        name: "Infinity",
        duration: "1 Day",
        price: 300,
        limit: "5 ETH",
        popular: true,
      },
      {
        name: "Infinity",
        duration: "7 Days",
        price: 750,
        limit: "50 ETH",
        popular: true,
      },
      {
        name: "Infinity",
        duration: "1 Month",
        price: 2500,
        limit: "100 ETH",
        popular: true,
      },
      {
        name: "Master",
        duration: "1 Day",
        price: 1000,
        limit: "20 ETH",
        premium: true,
      },
      {
        name: "Master",
        duration: "7 Days",
        price: 2500,
        limit: "200 ETH",
        premium: true,
      },
      {
        name: "Master",
        duration: "1 Month",
        price: 7500,
        limit: "500 ETH",
        premium: true,
      },
    ],
  },
}

type Props = {
  params: {
    product: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products[params.product as keyof typeof products]

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.title} | Flash Crypto Senders`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
      images: [product.image],
      modifiedTime: product.lastUpdated,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
    },
    alternates: {
      canonical: `https://flashcryptosenders.xyz/products/${params.product}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(products).map((product) => ({
    product,
  }))
}

export default function ProductPage({ params }: Props) {
  const product = products[params.product as keyof typeof products]

  if (!product) {
    notFound()
  }

  const { title, description, icon: Icon, features, benefits, protocol, currency, price, image, plans } = product

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: description,
    brand: {
      "@type": "Brand",
      name: "Flash Crypto Senders",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: plans[0].price,
      highPrice: plans[plans.length - 1].price,
      priceCurrency: "USD",
      offerCount: plans.length,
      availability: "https://schema.org/InStock",
    },
    category: "Cryptocurrency Software",
    applicationCategory: "Finance Software",
    operatingSystem: "Web-based",
    features: features,
    image: image,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Protocol",
        value: protocol,
      },
      {
        "@type": "PropertyValue",
        name: "Currency",
        value: currency,
      },
    ],
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-8">
        <div className="container">
          <Breadcrumbs
            items={[
              { title: "Home", href: "/" },
              { title: "Products", href: "/products" },
              { title: title, href: `/products/${params.product}`, current: true },
            ]}
          />

          <div className="max-w-6xl mx-auto mt-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn delay={0.1}>
                <div className="relative">
                  <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl blur-3xl opacity-60"></div>
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={title}
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-lg mb-6"
                    />
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                        <Icon className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-muted-foreground">
                          Protocol: <Badge variant="secondary">{protocol}</Badge>
                        </p>
                      </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                      <p className="text-lg">{description}</p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
                      <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Key Benefits</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="space-y-8">
                  <Tabs defaultValue="features" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="plans">License Plans</TabsTrigger>
                      <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                    </TabsList>

                    <TabsContent value="features" className="space-y-4 mt-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">Features:</h2>
                        <ul className="grid gap-3">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <svg
                                className="h-5 w-5 text-green-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">Why Choose {title}</h2>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Lightning-Fast Speed</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Complete transactions in seconds, not minutes or hours.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Enhanced Security</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Military-grade encryption and advanced security protocols.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Multi-Wallet Support</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Compatible with all major cryptocurrency wallets.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="plans" className="space-y-4 mt-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">License Plans</h2>
                        <div className="grid gap-4">
                          {plans.map((plan, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border ${
                                plan.premium
                                  ? "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20"
                                  : plan.popular
                                    ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-bold">{plan.name}</h3>
                                    {plan.popular && <Badge className="bg-blue-500">Popular</Badge>}
                                    {plan.premium && <Badge className="bg-purple-500">Premium</Badge>}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {plan.duration} - {plan.limit}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold">${plan.price}</p>
                                  <PaymentButton
                                    productName={`${title} - ${plan.name} (${plan.duration})`}
                                    amount={plan.price}
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                  >
                                    Buy Now
                                  </PaymentButton>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="how-it-works" className="space-y-4 mt-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                        <div className="space-y-6">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              1
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Purchase a License</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Choose the license plan that best fits your needs and complete the purchase.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              2
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Activate Your License</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Enter the license key you received via email into the activation portal.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              3
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Access Your Flash Wallet</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Once activated, you'll gain access to your flash wallet with the purchased limit.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              4
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">Start Sending {currency}</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Enter the recipient's wallet address, specify the amount, and complete the transaction
                                instantly.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 text-center">
                          <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/step-guide">
                              View Detailed Guide <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg text-white">
                    <div>
                      <p className="text-sm text-blue-100 mb-1">Starting from</p>
                      <p className="text-3xl font-bold">
                        ${plans[0].price}{" "}
                        <span className="text-base font-normal text-blue-200">/{plans[0].duration.toLowerCase()}</span>
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                        <Link href="/license-plans">View All Plans</Link>
                      </Button>
                      <PaymentButton
                        productName={title}
                        amount={plans[0].price}
                        className="bg-white text-blue-600 hover:bg-blue-50"
                      >
                        Buy Now
                      </PaymentButton>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                    <PaymentButton
                      productName={title}
                      amount={plans[0].price}
                      oneClick={true}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <Image src="/images/crypto/ethereum.svg" alt="ETH" width={20} height={20} />
                      Pay with ETH
                    </PaymentButton>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <PaymentButton
                      productName={title}
                      amount={plans[0].price}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <Image src="/images/crypto/bitcoin.svg" alt="BTC" width={20} height={20} />
                      Pay with BTC
                    </PaymentButton>
                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <PaymentButton
                      productName={title}
                      amount={plans[0].price}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <Image src="/images/crypto/usdt.svg" alt="USDT" width={20} height={20} />
                      Pay with USDT
                    </PaymentButton>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

