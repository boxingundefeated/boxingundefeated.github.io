import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ClientBoxersList } from '@/components/boxers-list'
import { getBoxerCategories, getBoxersWithoutBouts } from '@/lib/boxers-loader'

export async function generateStaticParams() {
  const categories = getBoxerCategories()
  return categories.map(category => ({
    division: category.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: { division: string }
}): Promise<Metadata> {
  const { division } = await params
  const categories = getBoxerCategories()
  const category = categories.find(c => c.slug === division)
  
  if (!category) {
    return {
      title: 'Division Not Found'
    }
  }

  return {
    title: `${category.name} Boxers - Boxing Directory`,
    description: `Browse professional ${category.name.toLowerCase()} boxers with statistics and fight records.`
  }
}

export default async function DivisionPage({ 
  params 
}: { 
  params: { division: string } 
}) {
  const { division } = await params
  const categories = getBoxerCategories()
  const category = categories.find(c => c.slug === division)
  
  if (!category) {
    notFound()
  }

  // Get ALL boxers but filter server-side
  const allBoxers = await getBoxersWithoutBouts()
  
  // Filter boxers by division on the server
  const divisionBoxers = allBoxers.filter(
    boxer => boxer.proDivision === category.division
  )
  
  // Sort by wins on the server
  divisionBoxers.sort((a, b) => (b.proWins || 0) - (a.proWins || 0))

  const baseUrl = getBaseUrl()
  const breadcrumbItems = [
    { name: 'Boxers', href: '/boxers' },
    { name: category.name, href: `/boxers/division/${division}` }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
      <ClientBoxersList
        initialBoxers={divisionBoxers}
        initialDivision={division}
        initialSort="wins"
      />
    </div>
  )
}