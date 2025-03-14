"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const PLANS = [
  {
    name: "Basic",
    price: "$99",
    features: ["1 Day", "7 Days", "1 Month"],
    description: "Perfect for getting started",
    color: "blue",
  },
  {
    name: "Infinity",
    price: "$299",
    features: ["Lifetime", "Priority support", "Advanced features"],
    description: "Most popular choice",
    color: "green",
    popular: true,
  },
  {
    name: "Master",
    price: "$499",
    features: ["Lifetime", "VIP support", "Custom features"],
    description: "For power users",
    color: "purple",
  },
]

export function PricingSection() {
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">License Plans</h2>
          <p className="mt-4 text-muted-foreground">Choose the right plan for your crypto trading needs</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={plan.popular ? "border-green-500" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

