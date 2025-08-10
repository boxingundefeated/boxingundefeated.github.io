import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'
import { OptimizedBoxersList } from '@/components/boxers-list-optimized'

// Static export - no dynamic searchParams
export const metadata: Metadata = {
  title: 'Boxers Directory',
  description: 'Browse our comprehensive directory of professional boxers.'
}

export default async function BoxersPage() {
  const baseUrl = getBaseUrl()
  const breadcrumbItems = [{ name: 'Boxers', href: '/boxers' }]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
      <OptimizedBoxersList />
    </div>
  )
}
