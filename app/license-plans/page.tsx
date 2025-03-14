import type { Metadata } from "next"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"
import { PaymentButton } from "@/components/payment-button"

export const metadata: Metadata = {
  title: "License Plans | Flash Crypto Senders",
  description:
    "Choose the right license plan for your Flash USDT sending needs. We offer Basic, Infinity, Master, and Trial plans with various flash limits and durations.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/license-plans",
  },
}

export default function LicensePlansPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Flash USDT Sender",
    description: "Lightning-fast USDT transfer solution with various license plans",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "70",
      highPrice: "7500",
      priceCurrency: "USD",
      offerCount: "10",
    },
    brand: {
      "@type": "Brand",
      name: "Flash Crypto Senders",
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16">
        <div className="container">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">License Plans</h1>
              <p className="text-xl text-muted-foreground">Choose the right plan for your Flash USDT sending needs</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <FadeIn delay={0.1}>
              <Card className="flex flex-col h-full border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Basic</CardTitle>
                      <CardDescription className="mt-2">
                        Perfect for individuals making occasional transfers
                      </CardDescription>
                    </div>
                    <Badge>Popular</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">1 Day</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$150</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- Limited to 2k flash</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">7 Days</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$350</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- Limited to 20k flash</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">1 Month</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$1,000</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- Limited to 200k flash</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-3">Features include:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Basic USDT flash transfers</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Email support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Step-by-step guide</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>370 days validity</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <PaymentButton
                    productName="Basic License Plan"
                    amount={150}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  >
                    Get Started
                  </PaymentButton>
                </CardFooter>
              </Card>
            </FadeIn>

            {/* Infinity Plan */}
            <FadeIn delay={0.2}>
              <Card className="flex flex-col h-full border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Infinity</CardTitle>
                      <CardDescription className="mt-2">Ideal for active traders and small businesses</CardDescription>
                    </div>
                    <Badge className="bg-blue-500">Recommended</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">1 Day</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$300</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- Limited to 35k flash</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">7 Days</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$750</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- Limited to 350k flash</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">1 Month</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$2,500</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- Limited to 750k flash</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-3">Features include:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Advanced USDT flash transfers</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Detailed transaction analytics</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>370 days validity</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Multi-wallet support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <PaymentButton
                    productName="Infinity License Plan"
                    amount={300}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  >
                    Get Started
                  </PaymentButton>
                </CardFooter>
              </Card>
            </FadeIn>

            {/* Master Plan */}
            <FadeIn delay={0.3}>
              <Card className="flex flex-col h-full border-purple-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Master</CardTitle>
                      <CardDescription className="mt-2">
                        Complete solution for businesses with high transaction volumes
                      </CardDescription>
                    </div>
                    <Badge className="bg-purple-500">Premium</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">1 Day</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$1,000</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- 950k Flash Limit</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">7 Days</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$2,500</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- 30M Flash Limit</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 dark:text-gray-400">1 Month</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-3xl font-bold">$7,500</span>
                        <span className="ml-2 text-gray-500 dark:text-gray-400">- 500M Flash Limit</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-3">Features include:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Enterprise-grade USDT flash transfers</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>24/7 dedicated support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Advanced security features</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>370 days validity</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Custom integration solutions</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Unlimited wallet connections</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <PaymentButton
                    productName="Master License Plan"
                    amount={1000}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
                  >
                    Get Started
                  </PaymentButton>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>

          {/* Trial Plan */}
          <FadeIn delay={0.4}>
            <div className="max-w-6xl mx-auto mt-12">
              <Card className="border-gray-200 dark:border-gray-800 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-2">Trial Plan</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get started today and use all the features available with a Demo License! Loaded with 600 Flash
                      USDT for only $70 daily license.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Full feature access</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>600 Flash USDT limit</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>24-hour validity</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Standard support</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold">$70</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">/ day</span>
                    </div>
                    <PaymentButton
                      productName="Trial License Plan"
                      amount={70}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                    >
                      Try Now
                    </PaymentButton>
                  </div>
                </div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}

