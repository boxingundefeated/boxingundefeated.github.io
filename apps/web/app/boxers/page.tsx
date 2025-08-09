import { ClientBoxersList } from '@/components/boxers-list'
import { getBoxers, getBoxerCategories } from '@/lib/boxers-loader'
import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface BoxersPageProps {
  searchParams: { division?: string; sort?: string }
}

export function generateMetadata({ searchParams }: BoxersPageProps): Metadata {
  const baseUrl = getBaseUrl()
  const division = searchParams.division
  const categories = getBoxerCategories()
  const divisionName = categories.find(c => c.slug === division)?.name
  
  const title = divisionName 
    ? `${divisionName} Boxers - Boxing Directory`
    : 'Boxers Directory'
  
  const description = divisionName
    ? `Browse professional ${divisionName.toLowerCase()} boxers with complete records and statistics.`
    : 'Browse our comprehensive directory of professional boxers.'

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/boxers${division ? `?division=${division}` : ''}`
    }
  }
}

export default async function BoxersPage({ searchParams }: BoxersPageProps) {
  const boxers = await getBoxers()
  const baseUrl = getBaseUrl()
  const division = searchParams.division
  const categories = getBoxerCategories()
  const divisionName = categories.find(c => c.slug === division)?.name
  
  const breadcrumbItems = division && divisionName
    ? [
        { name: 'Boxers', href: '/boxers' },
        { name: divisionName, href: `/boxers?division=${division}` }
      ]
    : [{ name: 'Boxers', href: '/boxers' }]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
      <ClientBoxersList 
        initialBoxers={boxers} 
        initialDivision={division}
        initialSort={searchParams.sort}
      />
    </div>
  )
}