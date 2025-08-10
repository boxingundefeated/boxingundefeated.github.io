'use client'

import { Button } from '@thedaviddias/design-system/button'
import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import { ToggleGroup, ToggleGroupItem } from '@thedaviddias/design-system/toggle-group'
import { Grid, List, SortAsc, Trophy, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { BoxerCardSkeleton, BoxerListSkeleton } from '@/components/boxer-skeleton'
import { EmptyState } from '@/components/empty-state'
import { LazyImage } from '@/components/lazy-image'
import type { BoxerMetadata } from '@/lib/boxers-loader'
import { getBoxerCategories, getBoxerStats } from '@/lib/boxers-loader'

interface ClientBoxersListProps {
  initialBoxers: BoxerMetadata[]
  initialDivision?: string
  initialSort?: string
}

export function ClientBoxersList({ initialBoxers }: ClientBoxersListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [boxers, setBoxers] = useState(initialBoxers)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 48

  // Read filters from URL searchParams on client side
  const divisionFromUrl = searchParams.get('division') || 'all'
  const sortFromUrl = searchParams.get('sort') || 'wins'

  const [divisionFilter, setDivisionFilter] = useState<string>(divisionFromUrl)
  const [sortBy, setSortBy] = useState<string>(sortFromUrl)

  const categories = getBoxerCategories()

  // Sync state with URL changes
  useEffect(() => {
    const newDivision = searchParams.get('division') || 'all'
    const newSort = searchParams.get('sort') || 'wins'
    const newPage = parseInt(searchParams.get('page') || '1')
    setDivisionFilter(newDivision)
    setSortBy(newSort)
    setCurrentPage(newPage)
  }, [searchParams])

  const updateURLParams = (division?: string, sort?: string, page?: number) => {
    startTransition(() => {
      const params = new URLSearchParams()
      if (division && division !== 'all') params.set('division', division)
      if (sort && sort !== 'wins') params.set('sort', sort)
      if (page && page !== 1) params.set('page', page.toString())
      const query = params.toString()
      router.push(`/boxers${query ? `?${query}` : ''}`)
    })
  }

  // Use useMemo to optimize filtering and sorting
  const filteredAndSortedBoxers = useMemo(() => {
    setIsLoading(true)
    let filtered = [...initialBoxers]

    // Filter by division if selected
    if (divisionFilter !== 'all') {
      // Map division slugs to actual division values
      const category = categories.find(c => c.slug === divisionFilter)
      const divisionValue = category ? category.division : divisionFilter
      filtered = filtered.filter(boxer => boxer.proDivision === divisionValue)
    }

    // Sort by selected criteria
    if (sortBy === 'wins') {
      filtered.sort((a, b) => (b.proWins || 0) - (a.proWins || 0))
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'bouts') {
      filtered.sort((a, b) => (b.proTotalBouts || 0) - (a.proTotalBouts || 0))
    }

    // Small delay to show loading state
    setTimeout(() => setIsLoading(false), 100)
    return filtered
  }, [initialBoxers, divisionFilter, sortBy])

  useEffect(() => {
    setBoxers(filteredAndSortedBoxers)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filteredAndSortedBoxers])

  // Calculate pagination
  const totalPages = Math.ceil(boxers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBoxers = boxers.slice(startIndex, endIndex)

  const BoxerCard = ({ boxer }: { boxer: BoxerMetadata }) => {
    const stats = getBoxerStats(boxer)

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start gap-4">
            {boxer.avatarImage && (
              <LazyImage
                src={boxer.avatarImage}
                alt={boxer.name}
                className="w-16 h-16 rounded-full"
              />
            )}
            <CardTitle className="flex-1 flex items-start justify-between">
              <Link href={`/boxers/${boxer.slug}`} className="hover:underline">
                {boxer.name}
              </Link>
              {boxer.nicknames && (
                <span className="text-sm text-muted-foreground">"{boxer.nicknames}"</span>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Record:</span>
              <span className="font-semibold">{stats.record}</span>
            </div>
            {boxer.proDivision && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Division:</span>
                <span className="capitalize">{boxer.proDivision}</span>
              </div>
            )}
            {boxer.nationality && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nationality:</span>
                <span>{boxer.nationality}</span>
              </div>
            )}
            {boxer.stance && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stance:</span>
                <span className="capitalize">{boxer.stance}</span>
              </div>
            )}
            <div className="pt-2 border-t">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                  <div className="font-semibold">{stats.winRate}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">KO Rate</div>
                  <div className="font-semibold">{stats.koRate}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Bouts</div>
                  <div className="font-semibold">{stats.totalBouts}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const BoxerListItem = ({ boxer }: { boxer: BoxerMetadata }) => {
    const stats = getBoxerStats(boxer)

    return (
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {boxer.avatarImage && (
              <LazyImage
                src={boxer.avatarImage}
                alt={boxer.name}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                <Link href={`/boxers/${boxer.slug}`} className="hover:underline">
                  {boxer.name}
                </Link>
                {boxer.nicknames && (
                  <span className="ml-2 text-sm text-muted-foreground">"{boxer.nicknames}"</span>
                )}
              </h3>
              <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                <span>Record: {stats.record}</span>
                {boxer.proDivision && <span>Division: {boxer.proDivision}</span>}
                {boxer.nationality && <span>{boxer.nationality}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold">{stats.winRate}</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{stats.koRate}</div>
              <div className="text-xs text-muted-foreground">KO Rate</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Professional Boxers Directory</h1>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={divisionFilter === 'all' ? 'default' : 'secondary'}
            size="sm"
            onClick={() => {
              setDivisionFilter('all')
              updateURLParams('all', sortBy, 1)
            }}
            className="rounded-full"
          >
            All Divisions
          </Button>
          {categories.map(category => (
            <Button
              key={category.slug}
              variant={divisionFilter === category.slug ? 'default' : 'secondary'}
              size="sm"
              onClick={() => {
                setDivisionFilter(category.slug)
                updateURLParams(category.slug, sortBy, 1)
              }}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="size-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <ToggleGroup
            type="single"
            value={sortBy}
            onValueChange={(value: string) => {
              if (value) {
                setSortBy(value)
                updateURLParams(divisionFilter, value, currentPage)
              }
            }}
            className="bg-background border rounded-md"
          >
            <ToggleGroupItem value="wins" className="px-3 py-2 h-10 data-[state=on]:bg-accent">
              <Trophy className="size-4 mr-2" />
              <span className="text-sm">Wins</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="bouts" className="px-3 py-2 h-10 data-[state=on]:bg-accent">
              <Users className="size-4 mr-2" />
              <span className="text-sm">Experience</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="name" className="px-3 py-2 h-10 data-[state=on]:bg-accent">
              <SortAsc className="size-4 mr-2" />
              <span className="text-sm">Name</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {isLoading || isPending ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, i) => (
              <BoxerCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <BoxerListSkeleton />
        )
      ) : boxers.length === 0 ? (
        <EmptyState
          title="No boxers found"
          description="There are no boxers matching your current filters."
          actionLabel="View All"
          actionHref="/boxers"
        />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedBoxers.map(boxer => (
                <BoxerCard key={boxer.id} boxer={boxer} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {paginatedBoxers.map(boxer => (
                <BoxerListItem key={boxer.id} boxer={boxer} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = Math.max(1, currentPage - 1)
                  setCurrentPage(newPage)
                  updateURLParams(divisionFilter, sortBy, newPage)
                }}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setCurrentPage(pageNum)
                        updateURLParams(divisionFilter, sortBy, pageNum)
                      }}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = Math.min(totalPages, currentPage + 1)
                  setCurrentPage(newPage)
                  updateURLParams(divisionFilter, sortBy, newPage)
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, boxers.length)} of {boxers.length} boxers
          </div>
        </>
      )}
    </div>
  )
}
