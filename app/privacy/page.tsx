import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Shield, Lock, Eye, Database, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Privacy Policy | Flash Crypto Senders",
  description:
    "Learn about how Flash Crypto Senders collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/privacy",
  },
}

export default function PrivacyPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Flash Crypto Senders",
    description: "Learn about how Flash Crypto Senders collects, uses, and protects your personal information.",
    url: "https://flashcryptosenders.xyz/privacy",
    lastReviewed: "2025-02-15",
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "#privacy-policy-content",
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
          name: "Privacy Policy",
          item: "https://flashcryptosenders.xyz/privacy",
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
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">Last updated: February 15, 2025</p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg mb-8">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Our Commitment to Privacy</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        We take your privacy seriously and are committed to protecting your personal information
                      </p>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none" id="privacy-policy-content">
                    <p>
                      At Flash Crypto Senders, we respect your privacy and are committed to protecting your personal
                      data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                      when you visit our website or use our services.
                    </p>

                    <h3>Information We Collect</h3>
                    <p>
                      We collect information that you provide directly to us, information we collect automatically when
                      you use our services, and information from third parties.
                    </p>

                    <h4>Information You Provide to Us</h4>
                    <ul>
                      <li>
                        Account Information: When you create an account, we collect your name, email address, and
                        password.
                      </li>
                      <li>Profile Information: Your profile picture, preferences, and settings.</li>
                      <li>
                        Transaction Information: Information about the cryptocurrency transactions you conduct through
                        our services.
                      </li>
                      <li>
                        Communications: When you contact us, we collect the content of your messages and any additional
                        information you provide.
                      </li>
                      <li>Survey Responses: Information you provide when responding to surveys or questionnaires.</li>
                    </ul>

                    <h4>Information We Collect Automatically</h4>
                    <ul>
                      <li>Device Information: IP address, browser type, operating system, and device identifiers.</li>
                      <li>
                        Usage Information: How you interact with our services, including the pages you visit and
                        features you use.
                      </li>
                      <li>Location Information: General location information based on your IP address.</li>
                      <li>
                        Cookies and Similar Technologies: Information collected through cookies and similar tracking
                        technologies.
                      </li>
                    </ul>

                    <h3>How We Use Your Information</h3>
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul>
                      <li>Providing, maintaining, and improving our services</li>
                      <li>Processing transactions and sending related information</li>
                      <li>Verifying your identity and preventing fraud</li>
                      <li>Communicating with you about our services, updates, and promotions</li>
                      <li>
                        Personalizing your experience and providing content and features that match your profile and
                        interests
                      </li>
                      <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
                      <li>Complying with legal obligations and enforcing our terms and policies</li>
                    </ul>

                    <h3>How We Share Your Information</h3>
                    <p>We may share your information in the following circumstances:</p>
                    <ul>
                      <li>With service providers who perform services on our behalf</li>
                      <li>With business partners with whom we jointly offer products or services</li>
                      <li>When required by law or to protect our rights and the rights of others</li>
                      <li>
                        In connection with a business transaction such as a merger, acquisition, or sale of assets
                      </li>
                      <li>With your consent or at your direction</li>
                    </ul>

                    <h3>Data Security</h3>
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal
                      information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                      However, no method of transmission over the Internet or electronic storage is 100% secure, and we
                      cannot guarantee absolute security.
                    </p>

                    <h3>Your Rights and Choices</h3>
                    <p>
                      Depending on your location, you may have certain rights regarding your personal information,
                      including:
                    </p>
                    <ul>
                      <li>Access: You can request access to your personal information.</li>
                      <li>Correction: You can request that we correct inaccurate or incomplete information.</li>
                      <li>Deletion: You can request that we delete your personal information.</li>
                      <li>Restriction: You can request that we restrict the processing of your information.</li>
                      <li>
                        Data Portability: You can request a copy of your information in a structured, commonly used, and
                        machine-readable format.
                      </li>
                      <li>Objection: You can object to our processing of your information.</li>
                    </ul>

                    <h3>International Data Transfers</h3>
                    <p>
                      We may transfer your personal information to countries other than the one in which you live. We
                      deploy appropriate safeguards to ensure that your personal information receives an adequate level
                      of protection in the countries in which we process it.
                    </p>

                    <h3>Children's Privacy</h3>
                    <p>
                      Our services are not directed to children under the age of 18. We do not knowingly collect
                      personal information from children under 18. If we become aware that a child under 18 has provided
                      us with personal information, we will take steps to delete such information.
                    </p>

                    <h3>Changes to This Privacy Policy</h3>
                    <p>
                      We may update this Privacy Policy from time to time. If we make material changes, we will notify
                      you by email or through our services, or by other means as required by law.
                    </p>

                    <h3>Contact Us</h3>
                    <p>
                      If you have any questions about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <p>
                      Email: privacy@flashcryptosenders.xyz
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
                        <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Data Security</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          We use industry-standard encryption and security measures to protect your data.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Transparency</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          We're clear about what data we collect and how we use it.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Data Control</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You have control over your personal data and can request access or deletion.
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
                    <h3 className="text-xl font-bold mb-2">Additional Privacy Resources</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Learn more about how we protect your data and your privacy rights
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/terms">Terms of Service</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/cookie-policy">Cookie Policy</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/data-processing">Data Processing Agreement</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  If you have any questions about our privacy practices or would like to exercise your privacy rights,
                  please contact our privacy team.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                >
                  <Link href="/contact">
                    Contact Our Privacy Team <ArrowRight className="ml-2 h-4 w-4" />
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

