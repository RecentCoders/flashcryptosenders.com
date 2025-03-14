"use client"

import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-32 pb-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            Lightning-Fast
            <br />
            Crypto Transfers
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Send cryptocurrency instantly and securely across the globe with our advanced Flash Crypto technology.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ConnectWallet />
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </section>
  )
}

