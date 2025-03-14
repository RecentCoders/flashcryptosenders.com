"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Image } from "@/components/ui/image"
import { FadeIn } from "@/components/fade-in"

// Using placeholder logos for demonstration
const partners = [
  {
    name: "Coinbase",
    logo: "/images/partners/coinbase-logo.svg",
    url: "https://www.coinbase.com",
  },
  {
    name: "Binance",
    logo: "/images/partners/binance-logo.svg",
    url: "https://www.binance.com",
  },
  {
    name: "Kraken",
    logo: "/images/partners/kraken-logo.svg",
    url: "https://www.kraken.com",
  },
  {
    name: "Ledger",
    logo: "/images/partners/ledger-logo.svg",
    url: "https://www.ledger.com",
  },
  {
    name: "Trezor",
    logo: "/images/partners/trezor-logo.svg",
    url: "https://trezor.io",
  },
  {
    name: "MetaMask",
    logo: "/images/partners/metamask-logo.svg",
    url: "https://metamask.io",
  },
]

export function TrustedPartners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-gecko-green to-secondary-sushi-green text-white">
      <div className="container">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            We partner with leading companies in the blockchain and financial technology space
          </p>
        </FadeIn>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-center justify-center">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-32 h-32 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label={`Visit ${partner.name}`}
              >
                <Image
                  src={partner.logo || "/images/placeholder-logo.svg"}
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                  fallbackSrc="/images/placeholder-logo.svg"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

