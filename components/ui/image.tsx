"use client"

import { useState } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ImageProps extends NextImageProps {
  fallbackSrc?: string
  containerClassName?: string
}

export function Image({
  src,
  alt,
  fallbackSrc = "/images/placeholder.svg",
  containerClassName,
  className,
  ...props
}: ImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <NextImage
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn("transition-opacity duration-300", loading ? "opacity-0" : "opacity-100", className)}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        {...props}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-moon-dust-3 dark:bg-star-dust-8 animate-pulse">
          <span className="sr-only">Loading image...</span>
        </div>
      )}
    </div>
  )
}

