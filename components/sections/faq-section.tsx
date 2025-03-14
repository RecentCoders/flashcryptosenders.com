"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ_ITEMS = [
  {
    question: "Is Flash Crypto transferable?",
    answer:
      "Yes, Flash Crypto licenses are transferable between users. Contact our support team for assistance with the transfer process.",
  },
  {
    question: "What security measures are in place?",
    answer:
      "We implement multiple layers of security including encryption, multi-signature protection, and regular security audits to ensure your transactions are safe.",
  },
  {
    question: "Can it be used for P2P transactions?",
    answer: "Yes, Flash Crypto supports peer-to-peer transactions across multiple blockchain networks.",
  },
  {
    question: "Is there any demo available?",
    answer: "Yes, we offer a demo version for users to test our platform features before making a purchase.",
  },
]

export function FaqSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

