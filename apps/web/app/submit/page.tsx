import type { Metadata } from 'next'
import SubmitClient from './submit-client'

export const metadata: Metadata = {
  title: 'Submit a Boxer',
  description: 'Submit a new boxer or update existing boxer information in our directory'
}

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <SubmitClient />
    </div>
  )
}
