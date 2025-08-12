'use client'

import { Button } from '@boxingundefeated/design-system/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@boxingundefeated/design-system/card'
import { Github } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'Ov23liUq0yH0LslGJmJ2'
const GITHUB_SCOPE = 'public_repo'

function LoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const redirectTo = searchParams.get('redirectTo') || '/submit'

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('github_token')
    if (token) {
      // Validate token is still valid
      fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })
        .then(response => {
          if (response.ok) {
            // Token is valid, redirect to intended destination
            router.push(redirectTo)
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('github_token')
            setIsChecking(false)
          }
        })
        .catch(() => {
          setIsChecking(false)
        })
    } else {
      setIsChecking(false)
    }
  }, [redirectTo, router])

  const handleGithubAuth = () => {
    // Store the redirect URL for after auth
    sessionStorage.setItem('auth_redirect', redirectTo)

    // Redirect to GitHub OAuth
    const redirectUri = `${window.location.origin}/auth/callback`
    const state = encodeURIComponent(redirectTo)
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${GITHUB_SCOPE}&state=${state}`
    window.location.href = authUrl
  }

  if (isChecking) {
    return (
      <div className="container max-w-2xl mx-auto py-20">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              <span className="ml-3">Checking authentication...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-20">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign in to Submit Boxers</CardTitle>
          <CardDescription>
            Authenticate with GitHub to submit new boxers or update existing entries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Why GitHub?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All submissions are reviewed via GitHub Pull Requests</li>
              <li>• Maintains transparency and version history</li>
              <li>• Allows community contributions and reviews</li>
              <li>• No separate account needed - use your existing GitHub</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={handleGithubAuth} className="w-full" size="lg">
              <Github className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing in, you agree to grant this app access to create pull requests on the
              Boxing Directory repository.
            </p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Need help? Check our{' '}
              <a
                href="/docs/GITHUB_AUTH_SETUP.md"
                target="_blank"
                className="text-blue-600 hover:underline"
                rel="noopener"
              >
                authentication guide
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-2xl mx-auto py-20">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                <span className="ml-3">Loading...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
