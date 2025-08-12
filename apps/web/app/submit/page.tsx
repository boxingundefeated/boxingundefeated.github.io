import type { Metadata } from 'next'
import { SubmitForm } from '@/components/forms/submit-form'

export const metadata: Metadata = {
  title: 'Submit a Boxer',
  description: 'Submit a new boxer or update existing boxer information in our directory'
}

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Submit a Boxer</h1>
      <p className="text-muted-foreground mb-8">
        Help us expand our boxing directory by submitting new boxers or updating existing
        information. Your submission will create a GitHub issue for review.
      </p>
      <SubmitForm />
    </div>
  )
}
