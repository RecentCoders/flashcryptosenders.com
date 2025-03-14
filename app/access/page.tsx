import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"
import { Zap, Lock, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Access Your Account | Flash Crypto Senders",
  description:
    "Log in or sign up to access your Flash Crypto Senders account and start making lightning-fast cryptocurrency transfers.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/access",
  },
}

export default function AccessPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Access Your Account | Flash Crypto Senders",
    description:
      "Log in or sign up to access your Flash Crypto Senders account and start making lightning-fast cryptocurrency transfers.",
    url: "https://flashcryptosenders.xyz/access",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://flashcryptosenders.xyz",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Access",
          item: "https://flashcryptosenders.xyz/access",
        },
      ],
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <FadeIn className="hidden md:block">
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl blur-3xl opacity-60"></div>
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-6">Why Choose Flash Crypto Senders</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Lightning-Fast Transfers</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Send cryptocurrency in seconds, not hours or days.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Bank-Grade Security</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Your assets are protected by military-grade encryption.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Trusted by 100,000+ Users</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Join our growing community of satisfied users worldwide.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-4">
                      <Image
                        src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                        alt="Bitcoin"
                        width={32}
                        height={32}
                      />
                      <Image
                        src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                        alt="Ethereum"
                        width={32}
                        height={32}
                      />
                      <Image
                        src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                        alt="USDT"
                        width={32}
                        height={32}
                      />
                      <Image
                        src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
                        alt="BNB"
                        width={32}
                        height={32}
                      />
                      <Image
                        src="https://cryptologos.cc/logos/solana-sol-logo.png"
                        alt="Solana"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                  Access your account to start sending crypto
                </p>

                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
                      <CardHeader>
                        <CardTitle>Login to Your Account</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="name@example.com" className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                              Forgot password?
                            </a>
                          </div>
                          <Input id="password" type="password" className="h-11" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember me
                          </label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                          Login
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="register">
                    <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
                      <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>Enter your information to create an account</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" className="h-11" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" className="h-11" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="name@example.com" className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input id="confirm-password" type="password" className="h-11" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <a href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                              terms of service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                              privacy policy
                            </a>
                          </label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                          Create account
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  )
}

