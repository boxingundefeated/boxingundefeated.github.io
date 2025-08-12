import { Breadcrumb } from '@boxingundefeated/design-system/breadcrumb'
import { getBaseUrl } from '@boxingundefeated/utils/get-base-url'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Boxing Directory',
  description: 'Privacy policy for the Boxing Directory website.'
}

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [{ name: 'Privacy Policy', href: '/privacy' }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={getBaseUrl()} />
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Information We Collect</h2>
          <p>
            The Boxing Directory is a static website that displays information about professional
            boxers. We do not collect any personal information from visitors.
          </p>

          <h2>Use of Data</h2>
          <p>
            All boxer data displayed on this website is publicly available information compiled for
            educational and informational purposes.
          </p>

          <h2>Cookies</h2>
          <p>This website does not use cookies or any tracking technologies.</p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services for hosting and content delivery. These services may
            have their own privacy policies.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the
            website.
          </p>
        </div>
      </div>
    </div>
  )
}
