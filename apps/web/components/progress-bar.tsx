'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function ProgressBar() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Reset on route change
    setLoading(false)
    setProgress(0)
  }, [pathname])

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
      setProgress(10)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 200)
    }

    // Listen for route changes
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      handleStart()
      originalPushState.apply(history, args)
      setTimeout(handleComplete, 500)
    }

    history.replaceState = function (...args) {
      handleStart()
      originalReplaceState.apply(history, args)
      setTimeout(handleComplete, 500)
    }

    // Cleanup
    return () => {
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  useEffect(() => {
    if (loading && progress < 90) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [loading, progress])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}