'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import { Input } from '@thedaviddias/design-system/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SearchBoxer {
  name: string
  slug: string
  nationality?: string
  division?: string
  wins?: number
  losses?: number
  draws?: number
  kos?: number
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [boxers, setBoxers] = useState<SearchBoxer[]>([])
  const [filteredBoxers, setFilteredBoxers] = useState<SearchBoxer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadBoxers() {
      try {
        const response = await fetch('/search/boxer-search-index.json')
        const data = await response.json()
        setBoxers(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load search index:', error)
        setIsLoading(false)
      }
    }
    loadBoxers()
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBoxers([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = boxers
      .filter(
        boxer =>
          boxer.name.toLowerCase().includes(query) ||
          boxer.nationality?.toLowerCase().includes(query) ||
          boxer.division?.toLowerCase().includes(query)
      )
      .slice(0, 50) // Limit to 50 results

    setFilteredBoxers(results)
  }, [searchQuery, boxers])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Search Boxers</h1>
          <p className="text-muted-foreground">
            Search our database of {boxers.length.toLocaleString()} professional boxers
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by name, country, or division..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
            autoFocus
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading boxers...</p>
          </div>
        ) : searchQuery.trim() ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found {filteredBoxers.length} {filteredBoxers.length === 1 ? 'boxer' : 'boxers'}
            </p>
            {filteredBoxers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBoxers.map(boxer => (
                  <Card key={boxer.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>
                        <Link href={`/boxers/${boxer.slug}`} className="hover:underline">
                          {boxer.name}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-muted-foreground">Record</dt>
                          <dd className="font-semibold">
                            {boxer.wins || 0}-{boxer.losses || 0}-{boxer.draws || 0}
                          </dd>
                        </div>
                        {boxer.division && (
                          <div className="flex justify-between">
                            <dt className="text-sm text-muted-foreground">Division</dt>
                            <dd className="capitalize">{boxer.division}</dd>
                          </div>
                        )}
                        {boxer.nationality && (
                          <div className="flex justify-between">
                            <dt className="text-sm text-muted-foreground">Country</dt>
                            <dd>{boxer.nationality}</dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No boxers found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Start typing to search for boxers</p>
          </div>
        )}
      </div>
    </div>
  )
}
