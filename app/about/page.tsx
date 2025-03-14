import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Award, Globe, TrendingUp, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "About Us | Flash Crypto Senders",
  description:
    "Learn about Flash Crypto Senders, our mission, values, and the team behind our innovative cryptocurrency transfer solutions.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/about",
  },
}

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flash Crypto Senders",
    url: "https://flashcryptosenders.xyz",
    logo: "https://flashcryptosenders.xyz/logo.png",
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Alexander Mitchell",
        jobTitle: "CEO & Founder",
      },
      {
        "@type": "Person",
        name: "Sophia Chen",
        jobTitle: "CTO & Co-Founder",
      },
    ],
    description:
      "Flash Crypto Senders provides lightning-fast cryptocurrency transfer solutions with industry-leading security and reliability.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Blockchain Avenue",
      addressLocality: "Crypto City",
      addressRegion: "CA",
      postalCode: "94103",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-FLASH-CRYPTO",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish", "Chinese"],
    },
    sameAs: [
      "https://twitter.com/FlashCrypto",
      "https://facebook.com/FlashCryptoSenders",
      "https://linkedin.com/company/flash-crypto-senders",
      "https://github.com/flashcrypto",
    ],
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16">
        <div className="container">
          {/* Hero Section */}
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Flash Crypto Senders</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're revolutionizing cryptocurrency transfers with lightning-fast technology and uncompromising
                security
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/about/team-photo.webp"
                  alt="Flash Crypto Senders Team"
                  width={800}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </FadeIn>

          {/* Our Story Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn delay={0.1}>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                      Flash Crypto Senders was founded in 2020 by a team of blockchain experts and financial technology
                      innovators who recognized a critical gap in the cryptocurrency ecosystem: the need for faster,
                      more secure transfers.
                    </p>
                    <p>
                      What began as a solution for slow transaction times quickly evolved into a comprehensive platform
                      that addresses multiple pain points in the crypto transfer process. Our founders combined their
                      expertise in blockchain technology, cybersecurity, and financial systems to create a revolutionary
                      approach to cryptocurrency transfers.
                    </p>
                    <p>
                      Today, Flash Crypto Senders serves over 100,000 users worldwide, processing millions of
                      transactions with a 99.9% success rate. We continue to innovate and expand our offerings, staying
                      at the forefront of the rapidly evolving cryptocurrency landscape.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="relative">
                  <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl blur-3xl opacity-60"></div>
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2020</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Company Founded</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100K+</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5M+</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Countries Served</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold mb-4">Company Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-16 flex-shrink-0 font-bold">2020</div>
                          <div>Flash Crypto Senders founded</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-16 flex-shrink-0 font-bold">2021</div>
                          <div>Launch of Flash USDT Sender</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-16 flex-shrink-0 font-bold">2022</div>
                          <div>Expanded to BTC and ETH transfers</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-16 flex-shrink-0 font-bold">2023</div>
                          <div>Reached 50,000 active users</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-16 flex-shrink-0 font-bold">2024</div>
                          <div>Surpassed 5 million transactions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Mission & Values Section */}
          <FadeIn delay={0.3}>
            <div className="max-w-6xl mx-auto mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We're driven by a clear mission and guided by strong values that shape everything we do
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                      Our Mission
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      To revolutionize cryptocurrency transfers by providing lightning-fast, secure, and accessible
                      solutions that empower individuals and businesses to move digital assets without limitations.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
                      <p className="italic text-gray-700 dark:text-gray-300">
                        "We envision a world where cryptocurrency transfers are as fast, secure, and simple as sending a
                        text message."
                      </p>
                      <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-2">
                        — Alexander Mitchell, CEO & Founder
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Award className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                      Our Values
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">Security First</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We prioritize the security of our users' assets above all else, implementing the highest
                            standards of protection.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">Innovation</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We continuously push the boundaries of what's possible in blockchain technology.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">User-Centric</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We design our products with our users' needs and experiences at the center.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">Global Accessibility</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We strive to make our services accessible to everyone, regardless of location or background.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold">Continuous Improvement</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            We are committed to constantly improving our products and services based on user feedback
                            and technological advancements.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Team Section */}
          <FadeIn delay={0.4}>
            <div className="max-w-6xl mx-auto mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  The visionaries and experts behind Flash Crypto Senders
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Alexander Mitchell",
                    role: "CEO & Founder",
                    bio: "Former blockchain developer with 10+ years of experience in fintech.",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                  },
                  {
                    name: "Sophia Chen",
                    role: "CTO & Co-Founder",
                    bio: "Cybersecurity expert with a background in cryptography and distributed systems.",
                    image: "https://randomuser.me/api/portraits/women/33.jpg",
                  },
                  {
                    name: "Marcus Johnson",
                    role: "COO",
                    bio: "Operations specialist with experience scaling fintech startups globally.",
                    image: "https://randomuser.me/api/portraits/men/34.jpg",
                  },
                  {
                    name: "Elena Rodriguez",
                    role: "Chief Security Officer",
                    bio: "Former security consultant for major cryptocurrency exchanges.",
                    image: "https://randomuser.me/api/portraits/women/35.jpg",
                  },
                ].map((member, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100 dark:border-blue-900">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Office Locations */}
          <FadeIn delay={0.5}>
            <div className="max-w-6xl mx-auto mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  With offices around the world, we provide 24/7 service to our global user base
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    city: "San Francisco",
                    country: "United States",
                    address: "123 Blockchain Avenue, San Francisco, CA 94103",
                    image: "/images/about/office-sf.webp",
                  },
                  {
                    city: "London",
                    country: "United Kingdom",
                    address: "45 Fintech Street, London, EC2A 4BX",
                    image: "/images/about/office-london.webp",
                  },
                  {
                    city: "Singapore",
                    country: "Singapore",
                    address: "78 Crypto Tower, Singapore, 018956",
                    image: "/images/about/office-singapore.webp",
                  },
                ].map((office, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <div className="h-48 relative">
                      <Image
                        src={office.image || "/placeholder.svg?height=200&width=400"}
                        alt={`${office.city} Office`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-1">{office.city}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{office.country}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{office.address}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={0.6}>
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the Flash Crypto Revolution</h2>
                  <p className="text-xl text-blue-100 mb-8">
                    Experience the future of cryptocurrency transfers today with Flash Crypto Senders
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-base">
                      <Link href="/license-plans">
                        Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 text-base"
                    >
                      <Link href="/contact">Contact Our Team</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  )
}

