'use client'

import { cn } from '@thedaviddias/design-system/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
}

export function LazyImage({
  src,
  alt,
  className,
  fallback = '/placeholder-avatar.png'
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.01, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [src])

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden bg-gray-100', className)}>
      {!imageLoaded && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      {imageSrc && (
        <img
          src={error ? fallback : imageSrc}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            imageLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setError(true)
            setImageLoaded(true)
          }}
        />
      )}
    </div>
  )
}
