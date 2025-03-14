"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeIn({ children, className = "", delay = 0, duration = 0.5, direction = "up" }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 20 }
      case "down":
        return { y: -20 }
      case "left":
        return { x: 20 }
      case "right":
        return { x: -20 }
      default:
        return {}
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getDirectionOffset() }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

