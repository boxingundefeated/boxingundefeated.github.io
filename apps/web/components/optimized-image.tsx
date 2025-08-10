'use client'

import { cn } from '@thedaviddias/design-system/lib/utils'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  className,
  width = 200,
  height = 200,
  priority = false
}: OptimizedImageProps) {
  const [error, setError] = useState(false)

  // Skip external images or use placeholder
  if (!src || error) {
    return (
      <div
        className={cn('bg-gray-200 flex items-center justify-center text-gray-400', className)}
        style={{ width, height }}
      >
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setError(true)}
    />
  )
}
