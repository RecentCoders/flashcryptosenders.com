"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

// Sample testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    name: "David Rodriguez",
    role: "Blockchain Developer",
    avatar: "/avatars/avatar-1.png",
    content:
      "Truly a remarkable platform! Flash Crypto Senders has revolutionized my cryptocurrency transactions. Their API is well-documented, and they actually provide support when needed. Highly recommended for developers.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Crypto Trader",
    avatar: "/avatars/avatar-2.png",
    content:
      "I've been using Flash Crypto for over a year now, and it's been a game-changer for my trading strategy. The speed and reliability are unmatched in the industry.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Financial Analyst",
    avatar: "/avatars/avatar-3.png",
    content:
      "As someone who analyzes financial tools professionally, I can confidently say that Flash Crypto Senders offers the best balance of security, speed, and usability in the market.",
    rating: 4,
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-muted-foreground">
            Don't just take our word for it. Hear from our satisfied users worldwide.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-2xl bg-background/50 backdrop-blur-sm border-green-500/20">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-center text-lg italic mb-6">"{TESTIMONIALS[activeIndex].content}"</p>
                  <div className="flex items-center justify-center">
                    <Avatar className="h-12 w-12 border-2 border-green-500/20">
                      <AvatarImage
                        src={TESTIMONIALS[activeIndex].avatar || "/placeholder.svg?height=40&width=40"}
                        alt={TESTIMONIALS[activeIndex].name}
                      />
                      <AvatarFallback>{TESTIMONIALS[activeIndex].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 text-left">
                      <p className="font-semibold">{TESTIMONIALS[activeIndex].name}</p>
                      <p className="text-sm text-muted-foreground">{TESTIMONIALS[activeIndex].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-green-500" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

