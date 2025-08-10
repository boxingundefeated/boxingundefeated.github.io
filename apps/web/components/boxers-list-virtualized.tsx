'use client'

import { Button } from '@thedaviddias/design-system/button'
import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import { ToggleGroup, ToggleGroupItem } from '@thedaviddias/design-system/toggle-group'
import { Grid, List, SortAsc, Trophy, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { EmptyState } from '@/components/empty-state'
import { LazyImage } from '@/components/lazy-image'
import { BoxerCardSkeleton, BoxerListSkeleton } from '@/components/boxer-skeleton'
import type { BoxerMetadata } from '@/lib/boxers-loader'
import { getBoxerCategories, getBoxerStats } from '@/lib/boxer-utils'
import { 
  loadBoxersByDivision, 
  loadSearchIndex, 
  getDivisionSlug,
  sortBoxers 
} from '@/lib/boxers-loader-optimized'

const ITEMS_PER_PAGE = 24 // Reduced from 48 for faster initial load
const LOAD_MORE_THRESHOLD = 200 // pixels from bottom to trigger load

export function VirtualizedBoxersList() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [boxers, setBoxers] = useState<BoxerMetadata[]>([])
  const [displayedBoxers, setDisplayedBoxers] = useState<BoxerMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [divisionFilter, setDivisionFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('wins')
  const [hasMore, setHasMore] = useState(true)
  const loadingRef = useRef<HTMLDivElement>(null)
  const currentPageRef = useRef(1)

  const categories = getBoxerCategories()

  // Load boxers data
  const loadBoxers = useCallback(async (division: string, sort: string) => {
    setIsLoading(true)
    currentPageRef.current = 1
    
    try {
      let data: BoxerMetadata[] = []
      
      if (division === 'all') {
        // Load a sample from heavyweight division for "all" view
        const heavyData = await loadBoxersByDivision('heavy')
        data = heavyData.slice(0, 200) // Load up to 200 for "all"
      } else {
        const category = categories.find(c => c.slug === division)
        if (category) {
          const divisionSlug = getDivisionSlug(category.division)
          data = await loadBoxersByDivision(divisionSlug)
        }
      }
      
      const sorted = sortBoxers(data, sort)
      setBoxers(sorted)
      setDisplayedBoxers(sorted.slice(0, ITEMS_PER_PAGE))
      setHasMore(sorted.length > ITEMS_PER_PAGE)
    } catch (error) {
      console.error('Failed to load boxers:', error)
      setBoxers([])
      setDisplayedBoxers([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [categories])

  // Load more boxers when scrolling
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return
    
    setIsLoadingMore(true)
    const nextPage = currentPageRef.current + 1
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const moreBoxers = boxers.slice(startIndex, endIndex)
    
    setTimeout(() => {
      setDisplayedBoxers(prev => [...prev, ...moreBoxers])
      currentPageRef.current = nextPage
      setHasMore(endIndex < boxers.length)
      setIsLoadingMore(false)
    }, 300) // Small delay to show loading state
  }, [boxers, isLoadingMore, hasMore])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore()
        }
      },
      { 
        root: null,
        rootMargin: `${LOAD_MORE_THRESHOLD}px`,
        threshold: 0.1 
      }
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current)
      }
    }
  }, [loadMore, hasMore, isLoadingMore])

  // Load initial data
  useEffect(() => {
    loadBoxers(divisionFilter, sortBy)
  }, [divisionFilter, loadBoxers, sortBy])

  // Handle division change
  const handleDivisionChange = (division: string) => {
    setDivisionFilter(division)
    router.push(`/boxers${division !== 'all' ? `?division=${division}` : ''}`)
  }

  // Render boxer card
  const renderBoxerCard = useCallback((boxer: BoxerMetadata) => {
    const stats = getBoxerStats(boxer)
    
    if (viewMode === 'list') {
      return (
        <Link
          key={boxer.slug}
          href={`/boxers/${boxer.slug}`}
          className="block hover:bg-gray-50 transition-colors"
          prefetch={false}
        >
          <div className="flex items-center gap-4 p-4 border-b">
            <LazyImage
              src={boxer.avatarImage || ''}
              alt={boxer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{boxer.name}</h3>
              <p className="text-sm text-muted-foreground">
                {boxer.nationality} • {boxer.proDivision}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{stats.record}</p>
              <p className="text-sm text-muted-foreground">{stats.winRate} Win Rate</p>
            </div>
          </div>
        </Link>
      )
    }

    return (
      <Link
        key={boxer.slug}
        href={`/boxers/${boxer.slug}`}
        className="block"
        prefetch={false}
      >
        <Card className="h-full hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <LazyImage
                src={boxer.avatarImage || ''}
                alt={boxer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base line-clamp-1">{boxer.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {boxer.nationality} • {boxer.proDivision}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold">{boxer.proWins || 0}</p>
                <p className="text-xs text-muted-foreground">Wins</p>
              </div>
              <div>
                <p className="text-lg font-bold">{boxer.proLosses || 0}</p>
                <p className="text-xs text-muted-foreground">Losses</p>
              </div>
              <div>
                <p className="text-lg font-bold">{boxer.proWinsByKnockout || 0}</p>
                <p className="text-xs text-muted-foreground">KOs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }, [viewMode])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <BoxerCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <BoxerListSkeleton />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center sticky top-0 bg-white z-10 pb-4">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
          <Button
            variant={divisionFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDivisionChange('all')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant={divisionFilter === category.slug ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDivisionChange(category.slug)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <ToggleGroup
            type="single"
            value={sortBy}
            onValueChange={(value) => value && setSortBy(value)}
            className="hidden sm:flex"
          >
            <ToggleGroupItem value="wins" size="sm">
              <Trophy className="h-4 w-4 mr-1" />
              Wins
            </ToggleGroupItem>
            <ToggleGroupItem value="name" size="sm">
              <SortAsc className="h-4 w-4 mr-1" />
              Name
            </ToggleGroupItem>
            <ToggleGroupItem value="bouts" size="sm">
              <Users className="h-4 w-4 mr-1" />
              Bouts
            </ToggleGroupItem>
          </ToggleGroup>
          
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value: 'grid' | 'list') => value && setViewMode(value)}
          >
            <ToggleGroupItem value="grid" size="sm">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" size="sm">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {displayedBoxers.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedBoxers.map(renderBoxerCard)}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                {displayedBoxers.map(renderBoxerCard)}
              </CardContent>
            </Card>
          )}
          
          {/* Loading indicator for infinite scroll */}
          {hasMore && (
            <div ref={loadingRef} className="py-8 text-center">
              {isLoadingMore ? (
                <div className="space-y-2">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                  <p className="text-sm text-muted-foreground">Loading more boxers...</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Scroll for more</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}