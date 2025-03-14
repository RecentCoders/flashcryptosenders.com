"use client"

import Link from "next/link"
import { ArrowRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeIn } from "@/components/fade-in"
import { GeckoMascot } from "@/components/gecko-mascot"

export function FaqSection() {
  return (
    <section className="py-20 md:py-28 bg-moon-dust-2 dark:bg-star-dust-9">
      <div className="container">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-heliotrope-violet/20 dark:bg-secondary-heliotrope-violet/10 text-secondary-cornflower-purple dark:text-secondary-heliotrope-violet text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4 mr-2" /> FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-moon-dust-7 dark:text-star-dust-3 max-w-2xl mx-auto">
            Find answers to common questions about our Flash Crypto Sender
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-12 -right-12 md:-right-24 z-10">
            <GeckoMascot variant="support" size="lg" message="Need help?" />
          </div>

          <Card className="bg-white/80 dark:bg-star-dust-8/80 backdrop-blur-sm border border-moon-dust-3 dark:border-star-dust-7">
            <div className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-moon-dust-3 dark:border-star-dust-7">
                  <AccordionTrigger className="text-lg font-medium">Is Flash Crypto transferable?</AccordionTrigger>
                  <AccordionContent className="text-moon-dust-7 dark:text-star-dust-3">
                    Yes, you can transfer Flash Crypto to any wallet. Our system allows seamless transfers to any
                    compatible cryptocurrency wallet.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-moon-dust-3 dark:border-star-dust-7">
                  <AccordionTrigger className="text-lg font-medium">
                    Is there an expiration date of the flashed values?
                  </AccordionTrigger>
                  <AccordionContent className="text-moon-dust-7 dark:text-star-dust-3">
                    Yes, crypto validity is 370 days from the date of the flash transfer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-moon-dust-3 dark:border-star-dust-7">
                  <AccordionTrigger className="text-lg font-medium">
                    Can it be used for P2P transactions?
                  </AccordionTrigger>
                  <AccordionContent className="text-moon-dust-7 dark:text-star-dust-3">
                    Yes, P2P (peer-to-peer) transactions are the most recommended practice for Flash Crypto transfers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-moon-dust-3 dark:border-star-dust-7">
                  <AccordionTrigger className="text-lg font-medium">Is there any demo available?</AccordionTrigger>
                  <AccordionContent className="text-moon-dust-7 dark:text-star-dust-3">
                    We do not send demos for security reasons. However, for those who want to test without spending a
                    lot, you can purchase our Demo License which is loaded with 600 Flash Crypto for only $70 daily
                    license.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-moon-dust-3 dark:border-star-dust-7">
                  <AccordionTrigger className="text-lg font-medium">
                    What security measures are in place?
                  </AccordionTrigger>
                  <AccordionContent className="text-moon-dust-7 dark:text-star-dust-3">
                    We implement military-grade encryption, multi-factor authentication, and advanced fraud detection
                    systems. All transactions are monitored in real-time to prevent unauthorized access and ensure the
                    safety of your assets.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-6 text-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-gecko-green text-gecko-green hover:bg-gecko-green/10"
                >
                  <Link href="/faq">
                    View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

