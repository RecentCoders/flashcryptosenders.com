"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { GeckoMascot } from "@/components/gecko-mascot"

export function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gecko-night">
      <div className="container">
        <div className="bg-gradient-to-br from-gecko-green to-secondary-sushi-green rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gecko-pattern opacity-10"></div>

          <div className="absolute bottom-0 right-0 md:right-12 transform translate-y-1/4">
            <GeckoMascot variant="rich" size="xl" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience Flash Crypto Transfers?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of users worldwide who trust Flash Crypto Senders for their cryptocurrency transfers
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-gecko-green hover:bg-white/90 text-base">
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
                  <Link href="/step-guide">View Step Guide</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

