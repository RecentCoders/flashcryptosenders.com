import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"
import { FadeIn } from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Flash Crypto Senders",
  description:
    "Find answers to common questions about Flash Crypto Senders, including USDT flash transfers, expiration dates, and usage guidelines.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/faq",
  },
}

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Flash USDT transferable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can transfer Flash USDT to any wallet. Our system allows seamless transfers to any compatible cryptocurrency wallet.",
        },
      },
      {
        "@type": "Question",
        name: 'How many "jumps" are allowed?',
        acceptedAnswer: {
          "@type": "Answer",
          text: "There's no limit to the number of transfers. Once transferred, the new owner can transfer the Flash USDT to another wallet if desired.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any demo available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We do not send demos for security reasons. However, for those who want to test without spending a lot, you can purchase our Demo License which is loaded with 600 Flash USDT for only $70 daily license.",
        },
      },
      {
        "@type": "Question",
        name: "Is there an expiration date of the flashed values?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, USDT validity is 370 days from the date of the flash transfer.",
        },
      },
      {
        "@type": "Question",
        name: "After purchasing my license, is it just activate it and send flash to any wallet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, after purchasing and activating your license, you can immediately start sending Flash USDT. You will also receive a step-by-step guide on how to make these transfers.",
        },
      },
      {
        "@type": "Question",
        name: "Can it be used for P2P transactions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, P2P (peer-to-peer) transactions are the most recommended practice for Flash USDT transfers.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Flash USDT Sender?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Flash USDT Sender is a specialized tool designed to facilitate rapid USDT transfers across the blockchain. It enables users to send USDT quickly and efficiently with enhanced security features.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Flash USDT Sender work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Flash USDT Sender works by optimizing transaction pathways on the blockchain. Simply launch the app, paste the destination address, specify the value, and the system will execute the transfer instantly. The process is streamlined for maximum efficiency and security.",
        },
      },
      {
        "@type": "Question",
        name: "What are the supported wallets and platforms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Flash USDT Sender supports all major cryptocurrency wallets including MetaMask, Trust Wallet, Coinbase Wallet, and more. It's compatible with both desktop and mobile platforms.",
        },
      },
      {
        "@type": "Question",
        name: "What security measures are in place?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We implement military-grade encryption, multi-factor authentication, and advanced fraud detection systems. All transactions are monitored in real-time to prevent unauthorized access and ensure the safety of your assets.",
        },
      },
      {
        "@type": "Question",
        name: "What are the transaction limits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Transaction limits vary based on your license plan. Basic plans allow up to 200k flash per month, Infinity plans up to 750k flash per month, and Master plans up to 500M flash per month.",
        },
      },
      {
        "@type": "Question",
        name: "Is technical support available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide 24/7 technical support for all license holders. Our team of experts is always ready to assist you with any questions or issues you might encounter.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if a transaction fails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the rare event of a transaction failure, our system automatically detects the issue and attempts to resolve it. If the problem persists, our support team will assist you in completing the transaction or providing a refund if necessary.",
        },
      },
      {
        "@type": "Question",
        name: "Can I upgrade my license plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can upgrade your license plan at any time. The cost difference between your current plan and the new plan will be prorated based on the remaining time on your current license.",
        },
      },
      {
        "@type": "Question",
        name: "Are there any hidden fees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, there are no hidden fees. The price you see for each license plan is all-inclusive, covering all features and support services.",
        },
      },
      {
        "@type": "Question",
        name: "Is KYC required to use the Flash USDT Sender?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, we do not require KYC (Know Your Customer) verification to use our Flash USDT Sender. However, we recommend following all applicable laws and regulations in your jurisdiction.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use the Flash USDT Sender for business purposes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Master and Infinity plans are specifically designed for business users who need to process larger volumes of transactions.",
        },
      },
      {
        "@type": "Question",
        name: "What blockchain networks are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Flash USDT Sender primarily supports the Tron (TRC20) network for USDT transfers, as it offers the fastest and most cost-effective transaction processing.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a mobile app available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer mobile applications for both iOS and Android devices, providing the same functionality as our desktop version with an optimized interface for mobile users.",
        },
      },
      {
        "@type": "Question",
        name: "How often are updates released?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We release updates on a regular basis to improve performance, add new features, and enhance security. All updates are automatically applied to ensure you always have access to the latest version.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get a refund if I'm not satisfied?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Due to the nature of digital licenses, we generally do not offer refunds. However, we encourage you to try our Demo License first to ensure our service meets your needs before purchasing a full license.",
        },
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
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about Flash Crypto Senders and our services
              </p>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">Is Flash USDT transferable?</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      Yes, you can transfer Flash USDT to any wallet. Our system allows seamless transfers to any
                      compatible cryptocurrency wallet.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">How many "jumps" are allowed?</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      There's no limit to the number of transfers. Once transferred, the new owner can transfer the
                      Flash USDT to another wallet if desired.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">Is there any demo available?</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      We do not send demos for security reasons. However, for those who want to test without spending a
                      lot, you can purchase our Demo License which is loaded with 600 Flash USDT for only $70 daily
                      license.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">
                      Is there an expiration date of the flashed values?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      Yes, USDT validity is 370 days from the date of the flash transfer.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-medium">
                      After purchasing my license, is it just activate it and send flash to any wallet?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      Yes, after purchasing and activating your license, you can immediately start sending Flash USDT.
                      You will also receive a step-by-step guide on how to make these transfers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-lg font-medium">
                      Can it be used for P2P transactions?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      Yes, P2P (peer-to-peer) transactions are the most recommended practice for Flash USDT transfers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-lg font-medium">What is the Flash USDT Sender?</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      The Flash USDT Sender is a specialized tool designed to facilitate rapid USDT transfers across the
                      blockchain. It enables users to send USDT quickly and efficiently with enhanced security features.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-lg font-medium">
                      How does the Flash USDT Sender work?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      The Flash USDT Sender works by optimizing transaction pathways on the blockchain. Simply launch
                      the app, paste the destination address, specify the value, and the system will execute the
                      transfer instantly. The process is streamlined for maximum efficiency and security.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-lg font-medium">
                      What are the supported wallets and platforms?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      Our Flash USDT Sender supports all major cryptocurrency wallets including MetaMask, Trust Wallet,
                      Coinbase Wallet, and more. It's compatible with both desktop and mobile platforms.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-lg font-medium">
                      What security measures are in place?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      We implement military-grade encryption, multi-factor authentication, and advanced fraud detection
                      systems. All transactions are monitored in real-time to prevent unauthorized access and ensure the
                      safety of your assets.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

