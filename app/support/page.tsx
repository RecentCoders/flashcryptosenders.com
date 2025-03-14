import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Mail, MessageSquare, Phone, Clock, ArrowRight, Headphones, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Support | Flash Crypto Senders",
  description:
    "Get help with your Flash Crypto Senders products. Our support team is available 24/7 to assist you with any questions or issues.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/support",
  },
}

export default function SupportPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CustomerService",
    name: "Flash Crypto Senders Support",
    url: "https://flashcryptosenders.xyz/support",
    telephone: "+1-800-FLASH-CRYPTO",
    email: "support@flashcryptosenders.xyz",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    description: "24/7 customer support for Flash Crypto Senders products and services.",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 0,
        longitude: 0,
      },
      geoRadius: "20000 km",
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16">
        <div className="container">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Customer Support</h1>
              <p className="text-xl text-muted-foreground">
                We're here to help you with any questions or issues you may have
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <FadeIn delay={0.1}>
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>Chat with our support team in real-time</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get instant help with our 24/7 live chat support. Our team is ready to assist you with any
                    questions.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Available 24/7</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                    Start Chat
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Send us an email and we'll respond quickly</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Email our support team for detailed assistance. We typically respond within 2-4 hours.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Mail className="h-4 w-4" />
                    <span>support@flashcryptosenders.xyz</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                    Send Email
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>Call us directly for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    For urgent matters, call our support hotline to speak directly with a support representative.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Phone className="h-4 w-4" />
                    <span>+1-800-FLASH-CRYPTO</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                    Call Now
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <FadeIn delay={0.4}>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Fill out the form below and our support team will get back to you as soon as possible.
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First name
                        </label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last name
                        </label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Please describe your issue in detail..." rows={5} />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                      Send Message
                    </Button>
                  </form>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Support Resources</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Explore our support resources to find answers to common questions and learn more about our products.
                  </p>

                  <div className="space-y-6">
                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">Documentation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Comprehensive guides and documentation for all our products.
                            </p>
                            <Link
                              href="/documentation"
                              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                            >
                              View Documentation <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">FAQ</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Find answers to frequently asked questions about our services.
                            </p>
                            <Link
                              href="/faq"
                              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                            >
                              View FAQ <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-bold mb-1">Video Tutorials</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Watch step-by-step video tutorials on how to use our products.
                            </p>
                            <Link
                              href="/tutorials"
                              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline inline-flex items-center"
                            >
                              Watch Tutorials <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white">
                    <h3 className="text-xl font-bold mb-2">Premium Support</h3>
                    <p className="mb-4">
                      Get priority support with faster response times and dedicated support specialists.
                    </p>
                    <Button variant="outline" className="border-white text-white hover:bg-white/20">
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.6}>
            <div className="max-w-6xl mx-auto mt-16 text-center">
              <h2 className="text-3xl font-bold mb-4">Our Support Team</h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Meet our dedicated support specialists who are committed to providing you with the best service
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100 dark:border-blue-900">
                      <Image
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${i + 10}.jpg`}
                        alt={`Support Team Member ${i}`}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-lg">
                      {["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim"][i - 1]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {["Support Manager", "Technical Specialist", "Customer Success", "Product Expert"][i - 1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}

