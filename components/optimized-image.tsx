'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  blurHashData?: string
  lowQualitySrc?: string
  loadingAnimation?: boolean
  aspectRatio?: number
  rootMargin?: string
  threshold?: number
  containerClassName?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/images/placeholder.jpg',
  blurHashData,
  lowQualitySrc,
  loadingAnimation = true,
  className,
  containerClassName,
  aspectRatio,
  rootMargin = '200px',
  threshold = 0.1,
  ...rest
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(imageRef.current)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    console.error(`Failed to load image: ${src}`)
    setIsError(true)
  }

  const containerStyle = aspectRatio 
    ? { paddingBottom: `${(1 / aspectRatio) * 100}%` } 
    : {}

  // Determine which source to use
  const effectiveSrc = isError ? fallbackSrc : src

  return (
    <div 
      ref={imageRef} 
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={aspectRatio ? containerStyle : undefined}
    >
      {/* Low quality placeholder */}
      {lowQualitySrc && !isLoaded && (
        <div className="absolute inset-0 z-0">
          <Image
            src={lowQualitySrc}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* BlurHash placeholder */}
      {blurHashData && !isLoaded && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${blurHashData})`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Loading animation */}
      {loadingAnimation && !isLoaded && (
        <div className="absolute inset-0 z-0 bg-muted animate-pulse" />
      )}

      {/* Main image */}
      {isVisible && (
        <Image
          src={effectiveSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      )}
    </div>
  )
}

// Exported component with AVIF/WebP support using <picture>
export function OptimizedPictureImage({
  src,
  alt,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  
  useEffect(() => {
    if (typeof src === 'string') {
      setImgSrc(src)
    }
  }, [src])
  
  if (!imgSrc || typeof src !== 'string') {
    return <OptimizedImage src={src} alt={alt} width={width} height={height} {...props} />
  }
  
  // Generate file paths for different formats
  const basePath = imgSrc.substring(0, imgSrc.lastIndexOf('.')) || imgSrc
  const extension = imgSrc.split('.').pop() || ''
  const avifSrc = `${basePath}.avif`
  const webpSrc = `${basePath}.webp`
  
  return (
    <div className={props.containerClassName}>
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <OptimizedImage 
          src={imgSrc} 
          alt={alt} 
          width={width} 
          height={height} 
          {...props} 
        />
      </picture>
    </div>
  )
}
