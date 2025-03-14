"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Clock, Users } from "lucide-react"

const FEATURES = [
  {
    title: "Instant Transfers",
    description: "Lightning-fast cryptocurrency transfers across the globe.",
    icon: Zap,
  },
  {
    title: "Enhanced Security",
    description: "Advanced encryption and multi-signature protection.",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support and assistance.",
    icon: Clock,
  },
  {
    title: "Multi-Wallet Support",
    description: "Compatible with major cryptocurrency wallets.",
    icon: Users,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose Flash Crypto Senders
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our platform offers unparalleled speed, security, and reliability for all your cryptocurrency transfer
            needs.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-green-500" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

