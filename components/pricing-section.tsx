"use client"

import Link from "next/link"
import { Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { GeckoMascot } from "@/components/gecko-mascot"

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gecko-night">
      <div className="container">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-sulu-citron/20 dark:bg-secondary-sulu-citron/10 text-secondary-apple-green dark:text-secondary-sulu-citron text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" /> Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">License Plans</h2>
          <p className="text-lg text-moon-dust-7 dark:text-star-dust-3 max-w-2xl mx-auto">
            Choose the right plan for your Flash Crypto sending needs
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <FadeIn delay={0.1}>
            <Card className="flex flex-col h-full border-moon-dust-3 dark:border-star-dust-7 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute -right-16 -top-16 transform rotate-45">
                <GeckoMascot variant="fun" size="sm" />
              </div>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Basic</h3>
                  <p className="text-moon-dust-6 dark:text-star-dust-4">For individuals making occasional transfers</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>1 Day</span>
                    <span className="font-bold">$150</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>7 Days</span>
                    <span className="font-bold">$350</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>1 Month</span>
                    <span className="font-bold">$1,000</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up to 200k flash per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic security features</span>
                    </li>
                  </ul>

                  <Button asChild className="w-full bg-gecko-green hover:bg-secondary-apple-green">
                    <Link href="/license-plans">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Infinity Plan */}
          <FadeIn delay={0.2}>
            <Card className="flex flex-col h-full border-gecko-green shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute -right-16 -top-16 transform rotate-45">
                <GeckoMascot variant="rich" size="sm" />
              </div>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold mb-2">Infinity</h3>
                    <Badge className="bg-gecko-green">Popular</Badge>
                  </div>
                  <p className="text-moon-dust-6 dark:text-star-dust-4">For active traders and small businesses</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>1 Day</span>
                    <span className="font-bold">$300</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>7 Days</span>
                    <span className="font-bold">$750</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>1 Month</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up to 750k flash per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced security features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>API access</span>
                    </li>
                  </ul>

                  <Button asChild className="w-full bg-gecko-green hover:bg-secondary-apple-green">
                    <Link href="/license-plans">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Master Plan */}
          <FadeIn delay={0.3}>
            <Card className="flex flex-col h-full border-secondary-cornflower-purple shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute -right-16 -top-16 transform rotate-45">
                <GeckoMascot variant="graduate" size="sm" />
              </div>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold mb-2">Master</h3>
                    <Badge className="bg-secondary-cornflower-purple">Premium</Badge>
                  </div>
                  <p className="text-moon-dust-6 dark:text-star-dust-4">For businesses with high transaction volumes</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>1 Day</span>
                    <span className="font-bold">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>7 Days</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-moon-dust-3 dark:border-star-dust-7">
                    <span>1 Month</span>
                    <span className="font-bold">$7,500</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up to 500M flash per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Enterprise-grade security</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-gecko-green mr-2 flex-shrink-0 mt-0.5" />
                      <span>Custom integration solutions</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-secondary-cornflower-purple hover:bg-secondary-cornflower-purple/90"
                  >
                    <Link href="/license-plans">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

