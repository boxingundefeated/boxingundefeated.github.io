'use client'

import { Card, CardContent } from '@boxingundefeated/design-system/card'
import { AlertCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const TOKEN_EXCHANGE_URL =
  process.env.NEXT_PUBLIC_TOKEN_EXCHANGE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/token`
    : typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? '/api/auth/token'
      : 'http://localhost:3000/api/auth/token')

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state') // This contains our redirectTo path
      const error = searchParams.get('error')

      if (error) {
        setError(`GitHub authorization failed: ${error}`)
        setIsProcessing(false)
        return
      }

      if (!code) {
        setError('No authorization code received')
        setIsProcessing(false)
        return
      }

      try {
        // Exchange code for token
        const response = await fetch(TOKEN_EXCHANGE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Failed to exchange authorization code')
        }

        const data = await response.json()

        if (data.access_token) {
          // Store the token
          localStorage.setItem('github_token', data.access_token)

          // Get the redirect path from state or session storage
          const redirectTo = state || sessionStorage.getItem('auth_redirect') || '/submit'
          sessionStorage.removeItem('auth_redirect')

          // Redirect to the intended destination
          router.push(redirectTo)
        } else {
          throw new Error('No access token received')
        }
      } catch (err: any) {
        console.error('Token exchange error:', err)
        setError(err.message || 'Failed to complete authentication')
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [searchParams, router])

  if (error) {
    return (
      <div className="container max-w-2xl mx-auto py-20">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold">Authentication Failed</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <div className="pt-2">
                  <a href="/login" className="text-sm text-blue-600 hover:underline">
                    Try again
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <span className="ml-3">
              {isProcessing ? 'Completing authentication...' : 'Redirecting...'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-2xl mx-auto py-20">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                <span className="ml-3">Processing...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}
