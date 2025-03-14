"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Image } from "@/components/ui/image"

interface GeckoMascotProps {
  variant?: "rich" | "graduate" | "fun" | "networking" | "support" | "feedback" | "newsletter" | "project"
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  animate?: boolean
  message?: string
  showMessage?: boolean
}

export function GeckoMascot({
  variant = "rich",
  className,
  size = "md",
  animate = true,
  message = "Hello! 👋",
  showMessage = false,
}: GeckoMascotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const mascotImages = {
    rich: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/657aad24a204346988eca831_Gecko_rich-p-500-PwMaY392Jz36Tf4Yq6LetzkNyd7XUw.png",
    graduate:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/657a80ad3c4664b8192352e1_Gecko_graduate-p-500%20%281%29-q5P6eu5ituyPz6OCw9hAGg1LiLAVEl.png",
    fun: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/657a80730e8144ca446f1971_Gecko_fun-p-500-MxB9oS0vbxka7izJJI6vILHVZzGYsp.png",
    networking:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/65812ae46ac54e407e5f48ad_networking-p-500-HGVQm5cI6Kgw8HfL16YqVrZBGDeSC7.png",
    support:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/657f0eee8331325e709c1017_mentorship-p-500-RRUiVTfhwYqKcBhrffY45swKuw6PAL.png",
    feedback:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/657f0f06e7ea1b09462a7a16_Feedback%20and%20evaluation-p-500-VoiTIOVkeeDJnNKLhPuxVG3FUcdV9z.png",
    newsletter:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api_landing_newsletter-0123ebb28d630245c0f582435560c5dd0f46ed9291aa9aad1aae10e9db2a3593-0evKAJvr7BlryqCGFRFQiHdl5fBE0n.webp",
    project:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/657f0cdbb1ac103f4c68ffa1_My%20project-p-500-oqzyI53ncDKSGqq9KzhellNzvXWSuv.png",
  }

  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  const containerVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const fallbackImage = "/images/gecko-placeholder.svg"

  return (
    <motion.div
      className={cn("relative inline-block", sizes[size], className)}
      variants={animate ? containerVariants : undefined}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Image
        src={mascotImages[variant] || fallbackImage}
        alt={`Gecko Mascot - ${variant}`}
        fill
        className="object-contain"
        priority
        onLoad={() => setImageLoaded(true)}
        fallbackSrc={fallbackImage}
      />

      <AnimatePresence>
        {(isHovered || showMessage) && imageLoaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gecko-green text-white px-3 py-1 rounded-full text-sm whitespace-nowrap"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

