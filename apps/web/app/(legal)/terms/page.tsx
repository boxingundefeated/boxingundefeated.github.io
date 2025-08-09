import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Boxing Directory',
  description: 'Terms of service for the Boxing Directory website.'
}

export default function TermsOfServicePage() {
  const breadcrumbItems = [{ name: 'Terms of Service', href: '/terms' }]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={getBaseUrl()} />
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using the Boxing Directory website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>Use License</h2>
          <p>The Boxing Directory provides information about professional boxers for educational and informational purposes. All data is compiled from publicly available sources.</p>
          
          <h2>Disclaimer</h2>
          <p>The information on this website is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties regarding the accuracy or completeness of boxer statistics and records.</p>
          
          <h2>Limitations</h2>
          <p>In no event shall the Boxing Directory or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
          
          <h2>Revisions</h2>
          <p>We may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.</p>
          
          <h2>Contact</h2>
          <p>If you have any questions regarding these Terms of Service, please contact us through the website.</p>
        </div>
      </div>
    </div>
  )
}
