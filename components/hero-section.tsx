"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeckoMascot } from "@/components/gecko-mascot"
import { FadeIn } from "@/components/fade-in"
import Link from "next/link"
import { Web3WalletConnect } from "@/components/web3-wallet-connect"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gecko-light via-white to-gecko-green/10 dark:from-gecko-night dark:via-star-dust-9 dark:to-gecko-green/20 py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gecko-pattern opacity-[0.1] dark:opacity-[0.05]"></div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="text-center lg:text-left" delay={0.1}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gecko-green/10 dark:bg-gecko-green/20 text-gecko-green dark:text-gecko-light text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" /> Trusted by 100,000+ users worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gecko mb-6">
              Lightning-Fast Crypto Transfers
            </h1>
            <p className="text-lg md:text-xl text-moon-dust-8 dark:text-star-dust-2 mb-8 max-w-xl mx-auto lg:mx-0">
              Send cryptocurrency instantly and securely across the globe with our advanced Flash Sender technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                size="lg"
                className="bg-gecko-green hover:bg-secondary-apple-green text-white w-full sm:w-auto text-base"
              >
                <Link href="/license-plans">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Web3WalletConnect
                buttonText="Connect Wallet"
                buttonSize="lg"
                className="bg-white text-gecko-green hover:bg-white/90 border-2 border-gecko-green w-full sm:w-auto"
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group border-gecko-green text-gecko-green hover:bg-gecko-green/10"
              >
                <Link href="/step-guide">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="relative">
            <div className="relative h-[400px] md:h-[500px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-2 border-dashed border-gecko-green/20 opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border-2 border-dashed border-gecko-green/30 opacity-60"></div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <GeckoMascot variant="rich" size="xl" className="animate-float" />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="absolute top-[20%] right-[30%]"
              >
                <GeckoMascot variant="graduate" size="sm" animate={false} />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                className="absolute bottom-[20%] right-[20%]"
              >
                <GeckoMascot variant="fun" size="sm" animate={false} />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
                className="absolute top-[30%] left-[20%]"
              >
                <GeckoMascot variant="networking" size="sm" animate={false} />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

