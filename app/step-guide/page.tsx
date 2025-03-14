import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Step Guide | Flash Crypto Senders",
  description:
    "Follow our step-by-step guide to get started with Flash USDT Sender. Learn how to grant access, activate your license, run the app, and start sending Flash USDT.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/step-guide",
  },
}

export default function StepGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use Flash USDT Sender",
    description: "A step-by-step guide to using the Flash USDT Sender",
    totalTime: "PT10M",
    step: [
      {
        "@type": "HowToStep",
        name: "Grant Access",
        text: "Reach out to us via the contact information provided on our website or go to the Licenses Plans and acquire a plan.",
        image: "/images/steps/step1.webp",
        url: "https://flashcryptosenders.xyz/license-plans",
      },
      {
        "@type": "HowToStep",
        name: "Activate License",
        text: "After purchasing a license, simply enter the data received into the activator and tap the button to activate.",
        image: "/images/steps/step2.webp",
        url: "https://flashcryptosenders.xyz/step-guide",
      },
      {
        "@type": "HowToStep",
        name: "Run App",
        text: "After activating your license, you will be sent to your flash wallet and you will be able to transact by following the steps we provide after purchase.",
        image: "/images/steps/step3.webp",
        url: "https://flashcryptosenders.xyz/step-guide",
      },
      {
        "@type": "HowToStep",
        name: "Start Sending Flash USDT",
        text: "Follow the app's intuitive interface. Insert your destination wallet, specify the amount you want to send, and complete the transaction.",
        image: "/images/steps/step4.webp",
        url: "https://flashcryptosenders.xyz/step-guide",
      },
    ],
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16">
        <div className="container">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Step-by-Step Guide</h1>
              <p className="text-xl text-muted-foreground">
                Follow these simple steps to get started with Flash USDT Sender
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[50px] md:left-[75px] top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-900 z-0 hidden md:block"></div>

              {/* Step 1 */}
              <FadeIn delay={0.1}>
                <Card className="mb-12 relative z-10 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[150px_1fr] gap-6">
                      <div className="bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold mb-2">1</div>
                        <div className="text-xl font-medium text-center">Grant Access</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Grant Access</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Reach out to us via the contact information provided on our website or go to the Licenses
                          Plans and acquire a plan.
                        </p>
                        <div className="flex justify-end">
                          <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/license-plans">
                              View License Plans <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Step 2 */}
              <FadeIn delay={0.2}>
                <Card className="mb-12 relative z-10 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[150px_1fr] gap-6">
                      <div className="bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold mb-2">2</div>
                        <div className="text-xl font-medium text-center">Activate License</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Activate License</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          After purchasing a license, simply enter the data received into the activator and tap the
                          button to activate.
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Note:</strong> You will receive your license key and activation instructions via
                            email immediately after your purchase is confirmed.
                          </div>
                        </div>
                        <Image
                          src="/images/steps/license-activation.webp"
                          alt="License Activation Screen"
                          width={500}
                          height={300}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Step 3 */}
              <FadeIn delay={0.3}>
                <Card className="mb-12 relative z-10 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[150px_1fr] gap-6">
                      <div className="bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold mb-2">3</div>
                        <div className="text-xl font-medium text-center">Run App</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Run App</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          After activating your license, you will be sent to your flash wallet and you will be able to
                          transact by following the steps we provide after purchase.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                            <h4 className="font-medium mb-2">Desktop App</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Launch the desktop application from your start menu or desktop shortcut.
                            </p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                            <h4 className="font-medium mb-2">Mobile App</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Open the Flash USDT Sender app on your mobile device.
                            </p>
                          </div>
                        </div>
                        <Image
                          src="/images/steps/app-dashboard.webp"
                          alt="App Dashboard"
                          width={500}
                          height={300}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Step 4 */}
              <FadeIn delay={0.4}>
                <Card className="mb-12 relative z-10 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[150px_1fr] gap-6">
                      <div className="bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold mb-2">4</div>
                        <div className="text-xl font-medium text-center">Start Sending</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Start Sending Flash USDT</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Follow the app's intuitive interface. Insert your destination wallet, specify the amount you
                          want to send, and complete the transaction.
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                          <h4 className="font-medium mb-2">Simple 3-Step Process:</h4>
                          <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
                            <li>Enter the recipient's wallet address</li>
                            <li>Specify the amount of USDT to flash</li>
                            <li>Confirm and send the transaction</li>
                          </ol>
                        </div>
                        <Image
                          src="/images/steps/transaction-process.webp"
                          alt="Transaction Process"
                          width={500}
                          height={300}
                          className="rounded-lg shadow-md mx-auto"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

            <FadeIn delay={0.5}>
              <div className="text-center mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Using the app is easy. Just launch it, paste the destination address, specify the value and that's it.
                  It flashes instantly.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                >
                  <Link href="/license-plans">
                    Get Access Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  )
}

