'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Bout } from '@/lib/boxers-loader'

interface FightHistoryProps {
  bouts: Bout[]
  opponentLinks: Map<string, string>
}

export function FightHistory({ bouts, opponentLinks }: FightHistoryProps) {
  const [displayedBouts, setDisplayedBouts] = useState<Bout[]>([])
  const [showAll, setShowAll] = useState(false)
  const initialDisplay = 10 // Show only 10 fights initially

  useEffect(() => {
    // Initially show only the first 10 bouts
    setDisplayedBouts(bouts.slice(0, initialDisplay))
  }, [bouts])

  const handleShowMore = () => {
    setDisplayedBouts(bouts)
    setShowAll(true)
  }

  if (bouts.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fight History ({bouts.length} Bouts)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayedBouts.map((bout, index) => {
            const opponentSlug = opponentLinks.get(bout.opponentName)
            return (
              <div key={`${bout.boxrecId}-${index}`} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {opponentSlug ? (
                        <Link
                          href={`/boxers/${opponentSlug}`}
                          className="font-semibold hover:text-blue-600 hover:underline transition-colors"
                          prefetch={false}
                        >
                          {bout.opponentName}
                        </Link>
                      ) : (
                        <span className="font-semibold">{bout.opponentName}</span>
                      )}
                      {bout.titleFight && (
                        <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">
                          Title Fight
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {bout.boutDate} • {bout.eventName}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-bold ${
                        bout.result === 'win'
                          ? 'text-green-600'
                          : bout.result === 'loss'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                      }`}
                    >
                      {bout.result ? bout.result.toUpperCase() : 'N/A'}
                    </span>
                    {bout.resultMethod && (
                      <div className="text-xs text-muted-foreground">
                        {bout.resultMethod} {bout.resultRound && `R${bout.resultRound}`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {!showAll && bouts.length > initialDisplay && (
          <div className="mt-4 text-center">
            <button
              onClick={handleShowMore}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Show {bouts.length - initialDisplay} more fights →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
