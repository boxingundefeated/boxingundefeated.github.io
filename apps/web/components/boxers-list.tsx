'use client'

import { useState, useEffect } from 'react'
import { Button } from '@thedaviddias/design-system/button'
import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import { ToggleGroup, ToggleGroupItem } from '@thedaviddias/design-system/toggle-group'
import { Grid, List, Trophy, Target, Users, SortAsc } from 'lucide-react'
import type { BoxerMetadata } from '@/lib/boxers-loader'
import { getBoxerCategories, getBoxerStats } from '@/lib/boxers-loader'
import { EmptyState } from '@/components/empty-state'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface ClientBoxersListProps {
  initialBoxers: BoxerMetadata[]
  initialDivision?: string
  initialSort?: string
}

export function ClientBoxersList({ initialBoxers, initialDivision, initialSort }: ClientBoxersListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [boxers, setBoxers] = useState(initialBoxers)
  const [divisionFilter, setDivisionFilter] = useState<string>(initialDivision || 'all')
  const [sortBy, setSortBy] = useState<string>(initialSort || 'wins')
  
  const categories = getBoxerCategories()
  
  const updateURLParams = (division: string, sort?: string) => {
    const params = new URLSearchParams()
    if (division !== 'all') params.set('division', division)
    if (sort && sort !== 'wins') params.set('sort', sort)
    const query = params.toString()
    router.push(`/boxers${query ? `?${query}` : ''}`)
  }

  useEffect(() => {
    let filteredBoxers = [...initialBoxers]

    // Filter by division if selected
    if (divisionFilter !== 'all') {
      filteredBoxers = filteredBoxers.filter(boxer => boxer.proDivision === divisionFilter)
    }

    // Sort by selected criteria
    if (sortBy === 'wins') {
      filteredBoxers.sort((a, b) => (b.proWins || 0) - (a.proWins || 0))
    } else if (sortBy === 'name') {
      filteredBoxers.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'bouts') {
      filteredBoxers.sort((a, b) => (b.proTotalBouts || 0) - (a.proTotalBouts || 0))
    }

    setBoxers(filteredBoxers)
  }, [initialBoxers, divisionFilter, sortBy])

  const BoxerCard = ({ boxer }: { boxer: BoxerMetadata }) => {
    const stats = getBoxerStats(boxer)
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">
            <Link href={`/boxers/${boxer.slug}`} className="hover:underline">
              {boxer.name}
            </Link>
            {boxer.nicknames && (
              <span className="text-sm text-muted-foreground">"{boxer.nicknames}"</span>
            )}
          </CardTitle>
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
              updateURLParams('all', sortBy)
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
                updateURLParams(category.slug, sortBy)
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
            onValueChange={(value: string) => value && setSortBy(value)}
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

      {boxers.length === 0 ? (
        <EmptyState
          title="No boxers found"
          description="There are no boxers matching your current filters."
          actionLabel="View All"
          actionHref="/boxers"
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boxers.map(boxer => (
            <BoxerCard key={boxer.id} boxer={boxer} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {boxers.map(boxer => (
            <BoxerListItem key={boxer.id} boxer={boxer} />
          ))}
        </div>
      )}
    </div>
  )
}