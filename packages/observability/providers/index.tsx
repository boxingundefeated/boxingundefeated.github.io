'use client'

import * as Sentry from '@sentry/nextjs'
// import { useAuth } from '@thedaviddias/auth' // Removed for static export
import { useEffect } from 'react'

export function SentryUserProvider({ children }: { children: React.ReactNode }) {
  // const { user } = useAuth() // Removed for static export
  // Static export - no auth, Sentry user tracking disabled

  useEffect(() => {
    // No user tracking in static export mode
    Sentry.setUser(null)
  }, [])

  return <>{children}</>
}
