import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, AlertTriangle, Scale, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Terms of Service | Flash Crypto Senders",
  description:
    "Read the terms and conditions that govern your use of Flash Crypto Senders services. Our terms of service outline your rights and responsibilities.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/terms",
  },
}

export default function TermsOfServicePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service | Flash Crypto Senders",
    description: "Read the terms and conditions that govern your use of Flash Crypto Senders services.",
    url: "https://flashcryptosenders.xyz/terms",
    lastReviewed: "2025-02-15",
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "#terms-of-service-content",
    },
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
          name: "Terms of Service",
          item: "https://flashcryptosenders.xyz/terms",
        },
      ],
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16">
        <div className="container">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-xl text-muted-foreground">Last updated: February 15, 2025</p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg mb-8">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Terms of Service Agreement</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Please read these terms carefully before using our services
                      </p>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none" id="terms-of-service-content">
                    <p>
                      These Terms of Service ("Terms") govern your access to and use of the services provided by Flash
                      Crypto Senders ("we," "us," or "our"), including our website, applications, and cryptocurrency
                      transfer services (collectively, the "Services"). By accessing or using our Services, you agree to
                      be bound by these Terms.
                    </p>

                    <h3>1. Acceptance of Terms</h3>
                    <p>
                      By accessing or using our Services, you acknowledge that you have read, understood, and agree to
                      be bound by these Terms. If you do not agree to these Terms, you may not access or use our
                      Services.
                    </p>

                    <h3>2. Eligibility</h3>
                    <p>
                      You must be at least 18 years old to use our Services. By using our Services, you represent and
                      warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
                    </p>

                    <h3>3. Account Registration</h3>
                    <p>
                      To use certain features of our Services, you may need to create an account. You agree to provide
                      accurate, current, and complete information during the registration process and to update such
                      information to keep it accurate, current, and complete. You are responsible for safeguarding your
                      account credentials and for all activities that occur under your account.
                    </p>

                    <h3>4. License Plans and Payments</h3>
                    <p>
                      Our Services offer various license plans with different features, limitations, and pricing. By
                      purchasing a license plan, you agree to pay the applicable fees as described on our website. All
                      payments are non-refundable unless otherwise specified.
                    </p>

                    <h3>5. Cryptocurrency Transfers</h3>
                    <p>Our Services facilitate the transfer of cryptocurrencies. You acknowledge and agree that:</p>
                    <ul>
                      <li>Cryptocurrency transactions are irreversible once initiated.</li>
                      <li>
                        You are solely responsible for verifying the accuracy of recipient addresses and transaction
                        amounts.
                      </li>
                      <li>
                        We are not responsible for any loss or damage resulting from incorrect transaction details
                        provided by you.
                      </li>
                      <li>
                        Cryptocurrency values can be volatile, and we do not guarantee any exchange rates or values.
                      </li>
                    </ul>

                    <h3>6. Prohibited Activities</h3>
                    <p>You agree not to engage in any of the following prohibited activities:</p>
                    <ul>
                      <li>Violating any applicable laws, regulations, or third-party rights.</li>
                      <li>
                        Using our Services for any illegal purposes, including money laundering, terrorist financing, or
                        fraud.
                      </li>
                      <li>
                        Attempting to interfere with, compromise the system integrity or security, or decipher any
                        transmissions to or from the servers running our Services.
                      </li>
                      <li>Uploading or transmitting viruses, malware, or other malicious code.</li>
                      <li>
                        Attempting to access, search, or scrape our Services by any means other than our publicly
                        supported interfaces.
                      </li>
                      <li>
                        Impersonating another person or entity, or falsely stating or otherwise misrepresenting your
                        affiliation with a person or entity.
                      </li>
                    </ul>

                    <h3>7. Intellectual Property Rights</h3>
                    <p>
                      Our Services and their contents, features, and functionality are owned by Flash Crypto Senders and
                      are protected by copyright, trademark, and other intellectual property laws. You may not
                      reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
                      republish, download, store, or transmit any of the material on our Services without our prior
                      written consent.
                    </p>

                    <h3>8. Disclaimer of Warranties</h3>
                    <p>
                      OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                      EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
                      FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE
                      UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES OR THE SERVERS
                      THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                    </p>

                    <h3>9. Limitation of Liability</h3>
                    <p>
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FLASH CRYPTO SENDERS, ITS AFFILIATES, OR
                      THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT,
                      INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF
                      PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF
                      OR INABILITY TO ACCESS OR USE THE SERVICES.
                    </p>

                    <h3>10. Indemnification</h3>
                    <p>
                      You agree to defend, indemnify, and hold harmless Flash Crypto Senders, its affiliates, and their
                      respective officers, directors, employees, and agents from and against any claims, liabilities,
                      damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys'
                      fees) arising out of or relating to your violation of these Terms or your use of the Services.
                    </p>

                    <h3>11. Termination</h3>
                    <p>
                      We may terminate or suspend your access to all or part of our Services, with or without notice,
                      for any conduct that we, in our sole discretion, believe violates these Terms or is harmful to
                      other users of our Services, us, or third parties, or for any other reason.
                    </p>

                    <h3>12. Governing Law</h3>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of the State of
                      California, without regard to its conflict of law provisions. Any legal action or proceeding
                      arising out of or relating to these Terms shall be brought exclusively in the federal or state
                      courts located in San Francisco, California.
                    </p>

                    <h3>13. Changes to Terms</h3>
                    <p>
                      We reserve the right to modify these Terms at any time. If we make material changes to these
                      Terms, we will notify you by email or through our Services. Your continued use of our Services
                      after such notification constitutes your acceptance of the modified Terms.
                    </p>

                    <h3>14. Contact Information</h3>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p>
                      Email: legal@flashcryptosenders.xyz
                      <br />
                      Address: 123 Blockchain Avenue, San Francisco, CA 94103, USA
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Important Notice</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          By using our services, you agree to be bound by these terms and conditions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Legal Compliance</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          We comply with all applicable laws and regulations in the jurisdictions where we operate.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Your Protection</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          These terms are designed to protect both you and us while using our services.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 md:p-8 border border-blue-100 dark:border-blue-800/30 mb-12">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">Additional Legal Resources</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Review our other legal documents to fully understand your rights and obligations
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/privacy">Privacy Policy</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/refund-policy">Refund Policy</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/acceptable-use">Acceptable Use Policy</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Need Legal Assistance?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  If you have any questions about our terms of service or need legal assistance, please contact our
                  legal team.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                >
                  <Link href="/contact">
                    Contact Our Legal Team <ArrowRight className="ml-2 h-4 w-4" />
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

