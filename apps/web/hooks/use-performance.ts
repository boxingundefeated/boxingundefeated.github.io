import { useCallback, useEffect, useState } from 'react'

export function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Measure page load time
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming

      if (perfData) {
        console.log(`[${componentName}] Performance Metrics:`, {
          domContentLoaded: Math.round(
            perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
          ),
          loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
          domInteractive: Math.round(perfData.domInteractive),
          firstByte: Math.round(perfData.responseStart - perfData.requestStart)
        })
      }
    }
  }, [componentName])

  const measureAction = useCallback(
    (actionName: string, fn: () => void) => {
      if (process.env.NODE_ENV !== 'development') {
        fn()
        return
      }

      const start = performance.now()
      fn()
      const end = performance.now()
      console.log(`[${componentName}] ${actionName} took ${Math.round(end - start)}ms`)
    },
    [componentName]
  )

  return { measureAction }
}

// Hook to lazy load heavy components
export function useLazyComponent<T>(
  importFn: () => Promise<{ default: T }>,
  delay: number = 0
): T | null {
  const [Component, setComponent] = useState<T | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      importFn().then(module => {
        setComponent(() => module.default)
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [importFn, delay])

  return Component
}
