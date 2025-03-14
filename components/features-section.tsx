"use client"
import { Zap, Lock, Globe, Wallet, Check } from "lucide-react"
import { GeckoMascot } from "@/components/gecko-mascot"
import { FadeIn } from "@/components/fade-in"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gecko-night">
      <div className="container">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-sulu-citron/20 dark:bg-secondary-sulu-citron/10 text-secondary-apple-green dark:text-secondary-sulu-citron text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" /> Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Flash Crypto Senders</h2>
          <p className="text-lg text-moon-dust-7 dark:text-star-dust-3 max-w-3xl mx-auto">
            Our platform offers unparalleled speed, security, and reliability for all your cryptocurrency transfer
            needs.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-secondary-mindaro-lime/30 to-secondary-sulu-citron/30 dark:from-secondary-everglade-mint/30 dark:to-secondary-apple-green/20 rounded-2xl blur-3xl opacity-60"></div>
              <Card className="bg-white/80 dark:bg-star-dust-9/80 backdrop-blur-sm rounded-2xl border border-moon-dust-3 dark:border-star-dust-7 shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <GeckoMascot variant="project" size="lg" message="I'm fast & secure!" showMessage={true} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Why Our Technology Stands Out</h3>
                  <p className="text-moon-dust-7 dark:text-star-dust-3 mb-6">
                    Our proprietary technology optimizes the blockchain transaction process, allowing for
                    near-instantaneous cryptocurrency transfers with enhanced security features.
                  </p>
                  <div className="bg-moon-dust-2 dark:bg-star-dust-8 rounded-lg p-6 border border-moon-dust-3 dark:border-star-dust-7">
                    <h4 className="font-bold mb-3">Simple 3-Step Process:</h4>
                    <ol className="space-y-4">
                      <li className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-gecko-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                          1
                        </div>
                        <div>
                          <h5 className="font-medium">Launch the App</h5>
                          <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                            Open the Flash Crypto Sender application on your device
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-gecko-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                          2
                        </div>
                        <div>
                          <h5 className="font-medium">Enter Details</h5>
                          <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                            Specify the destination address and amount to send
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-gecko-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                          3
                        </div>
                        <div>
                          <h5 className="font-medium">Complete Transfer</h5>
                          <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                            Confirm and watch as your crypto is transferred instantly
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Key Features of Our Platform</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-star-dust-8 rounded-lg p-4 border border-moon-dust-3 dark:border-star-dust-7 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Zap className="h-5 w-5 text-gecko-green dark:text-gecko-green mr-2" />
                      <h4 className="font-medium">Instant Transfers</h4>
                    </div>
                    <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                      Send crypto in seconds, not minutes or hours
                    </p>
                  </div>
                  <div className="bg-white dark:bg-star-dust-8 rounded-lg p-4 border border-moon-dust-3 dark:border-star-dust-7 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Lock className="h-5 w-5 text-gecko-green dark:text-gecko-green mr-2" />
                      <h4 className="font-medium">Enhanced Security</h4>
                    </div>
                    <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                      Military-grade encryption protects your transactions
                    </p>
                  </div>
                  <div className="bg-white dark:bg-star-dust-8 rounded-lg p-4 border border-moon-dust-3 dark:border-star-dust-7 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-gecko-green dark:text-gecko-green mr-2" />
                      <h4 className="font-medium">Global Accessibility</h4>
                    </div>
                    <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                      Send crypto to anyone, anywhere in the world
                    </p>
                  </div>
                  <div className="bg-white dark:bg-star-dust-8 rounded-lg p-4 border border-moon-dust-3 dark:border-star-dust-7 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Wallet className="h-5 w-5 text-gecko-green dark:text-gecko-green mr-2" />
                      <h4 className="font-medium">Multi-Wallet Support</h4>
                    </div>
                    <p className="text-sm text-moon-dust-7 dark:text-star-dust-4">
                      Compatible with all major cryptocurrency wallets
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Benefits You'll Enjoy</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-semantic-success mr-2 flex-shrink-0" />
                    <span>Save time with instant transfers that complete in seconds</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-semantic-success mr-2 flex-shrink-0" />
                    <span>Reduce transaction fees compared to traditional methods</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-semantic-success mr-2 flex-shrink-0" />
                    <span>Enhance security with advanced encryption protocols</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-semantic-success mr-2 flex-shrink-0" />
                    <span>Access global markets without restrictions or delays</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-semantic-success mr-2 flex-shrink-0" />
                    <span>Enjoy 24/7 customer support from our expert team</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

