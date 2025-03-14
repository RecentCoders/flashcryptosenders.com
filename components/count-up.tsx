"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export function CountUp({ end, duration = 2, prefix = "", suffix = "", decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let startTime: number
      let animationFrame: number

      const startAnimation = (timestamp: number) => {
        startTime = timestamp
        animate(timestamp)
      }

      const animate = (timestamp: number) => {
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = progress * end

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setHasAnimated(true)
        }
      }

      animationFrame = requestAnimationFrame(startAnimation)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  )
}

