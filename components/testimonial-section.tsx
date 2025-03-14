"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { GeckoMascot } from "@/components/gecko-mascot"

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Crypto Investor",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content:
      "Flash Crypto Senders has revolutionized how I manage my digital assets. The speed and security are unmatched in the industry. I can send Bitcoin across the globe in seconds, not hours!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Day Trader",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "As a day trader, timing is everything. Flash Crypto Senders gives me the edge I need with instant transfers between exchanges. Their multi-currency support is a game-changer for my trading strategy.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content:
      "My e-commerce business relies on Flash Crypto Senders for international payments. The transaction fees are minimal, and the speed is incredible. It's transformed how we handle cross-border transactions.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Blockchain Developer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content:
      "From a technical perspective, Flash Crypto Senders has implemented an impressive infrastructure. Their API is well-documented, and the security protocols are top-notch. Highly recommended for developers.",
    rating: 5,
  },
]

export function TestimonialSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className="py-20 md:py-28 bg-moon-dust-2 dark:bg-star-dust-9">
      <div className="container">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-mindaro-lime/20 dark:bg-secondary-mindaro-lime/10 text-secondary-apple-green dark:text-secondary-mindaro-lime text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" /> Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-moon-dust-7 dark:text-star-dust-3 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied users worldwide
          </p>
        </FadeIn>

        <div className="relative max-w-4xl mx-auto px-4">
          <div
            className="overflow-hidden rounded-2xl bg-white dark:bg-star-dust-8 shadow-lg border border-moon-dust-3 dark:border-star-dust-7"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0 relative">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gecko-green/20 dark:border-gecko-green/10">
                      <Image
                        src={testimonials[current].image || "/images/placeholder-avatar.svg"}
                        alt={testimonials[current].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4">
                      <GeckoMascot variant="feedback" size="sm" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[current].rating
                              ? "text-gecko-yellow fill-gecko-yellow"
                              : "text-moon-dust-4 dark:text-star-dust-6"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg md:text-xl italic text-moon-dust-8 dark:text-star-dust-2 mb-4">
                      "{testimonials[current].content}"
                    </blockquote>
                    <div>
                      <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                      <p className="text-moon-dust-6 dark:text-star-dust-4">{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gecko-green text-gecko-green hover:bg-gecko-green/10 hover:text-gecko-green"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === current ? "bg-gecko-green" : "bg-moon-dust-4 dark:bg-star-dust-6 hover:bg-gecko-green/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gecko-green text-gecko-green hover:bg-gecko-green/10 hover:text-gecko-green"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

