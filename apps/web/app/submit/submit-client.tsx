'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitForm } from '@/components/forms/submit-form'

export default function SubmitClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem('github_token')

      if (!token) {
        // No token, redirect to login
        router.push('/login?redirectTo=/submit')
        return
      }

      // Validate token
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json'
          }
        })

        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Token is invalid
          localStorage.removeItem('github_token')
          router.push('/login?redirectTo=/submit')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login?redirectTo=/submit')
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [router])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        <span className="ml-3">Verifying authentication...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Router will redirect
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Submit a Boxer</h1>
      <p className="text-muted-foreground mb-8">
        Help us expand our boxing directory by submitting new boxers or updating existing
        information. Your submission will create a pull request for review.
      </p>
      <SubmitForm />
    </>
  )
}
