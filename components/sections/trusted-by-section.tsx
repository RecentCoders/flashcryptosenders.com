"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const PARTNERS = [
  { name: "Partner 1", logo: "/logos/partner1.svg" },
  { name: "Partner 2", logo: "/logos/partner2.svg" },
  { name: "Partner 3", logo: "/logos/partner3.svg" },
  { name: "Partner 4", logo: "/logos/partner4.svg" },
  { name: "Partner 5", logo: "/logos/partner5.svg" },
]

export function TrustedBySection() {
  return (
    <section className="py-16 bg-green-600">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-white">Trusted By Industry Leaders</h2>
          <p className="mt-4 text-white/80">
            We partner with leading companies in the blockchain and financial technology space.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={40}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

