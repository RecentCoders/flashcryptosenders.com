"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-16 bg-green-600">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
            Ready to Experience Flash Crypto Transfers?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Join thousands of users worldwide who trust Flash Crypto Senders for fast, secure, and reliable
            cryptocurrency transfers.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-green-600 hover:bg-white/90">
              Get Started Now
            </Button>
            <Link href="/guide" passHref>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Step Guide
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

