'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'

// This component is specifically designed to optimize LCP performance
export function CriticalImage({
  src,
  alt,
  width,
  height,
  priority = true,
  className,
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      loading="eager"
      fetchPriority="high"
      {...props}
    />
  )
}

// This component uses native lazy loading with IntersectionObserver
// for non-critical images to defer offscreen images
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  threshold = 0.1,
  ...props
}: ImageProps & { threshold?: number }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '200px' }
    )

    observer.observe(imgRef.current)
    
    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <>
      <div 
        ref={imgRef}
        className={`${className || ''} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          position: 'relative', 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        }}
      >
        {isInView && (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            fetchPriority="low"
            {...props}
          />
        )}
      </div>
      
      {/* Use blur data URL or low-quality image placeholder */}
      {!isLoaded && isInView && (
        <div 
          className={`${className || ''} blur-sm bg-gray-200 animate-pulse`}
          style={{ 
            position: 'absolute', 
            top: 0,
            left: 0,
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height
          }}
          aria-hidden="true"
        />
      )}
    </>
  )
}

// Create a wrapper for background images
export function OptimizedBackgroundImage({
  src,
  alt,
  className,
  children,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])

  return (
    <div
      className={`${className || ''} relative overflow-hidden bg-cover bg-center`}
      style={{ backgroundImage: loaded ? `url(${src})` : 'none' }}
      role="img"
      aria-label={alt}
      {...props}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {children}
    </div>
  )
}
