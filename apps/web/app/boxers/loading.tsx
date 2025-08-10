import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { Button } from '@thedaviddias/design-system/button'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import { BoxerCardSkeleton } from '@/components/boxer-skeleton'

export default function BoxersLoading() {
  const baseUrl = getBaseUrl()
  const breadcrumbItems = [{ name: 'Boxers', href: '/boxers' }]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />

      <h1 className="text-4xl font-bold tracking-tight mb-4">Professional Boxers Directory</h1>

      {/* Division filters skeleton */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <Button key={i} variant="secondary" size="sm" className="rounded-full" disabled>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </Button>
          ))}
        </div>
      </div>

      {/* Controls skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <div className="w-4 h-4 bg-gray-200 rounded" />
          </Button>
        </div>
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(12)].map((_, i) => (
          <BoxerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}