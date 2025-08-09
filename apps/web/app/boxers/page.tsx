import { ClientBoxersList } from '@/components/boxers-list'
import { getBoxersWithoutBouts } from '@/lib/boxers-loader'
import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'

// Static export - no dynamic searchParams
export const metadata: Metadata = {
  title: 'Boxers Directory',
  description: 'Browse our comprehensive directory of professional boxers.',
}

export default async function BoxersPage() {
  const boxers = await getBoxersWithoutBouts()
  const baseUrl = getBaseUrl()
  
  const breadcrumbItems = [{ name: 'Boxers', href: '/boxers' }]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
      <ClientBoxersList 
        initialBoxers={boxers} 
        // Client-side will handle filters from URL
        initialDivision={undefined}
        initialSort={undefined}
      />
    </div>
  )
}