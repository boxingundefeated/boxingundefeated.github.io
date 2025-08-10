// Lightweight boxer loader that doesn't import the huge JSON file
// This is used during build time to generate static pages without loading 71MB

import fs from 'fs'
import path from 'path'
import type { BoxerMetadata } from './boxers-loader'

// Only use this in Node.js environment (build time)
export function getBoxersFromFile(): BoxerMetadata[] {
  if (typeof window !== 'undefined') {
    throw new Error('getBoxersFromFile can only be used at build time')
  }
  
  const dataPath = path.join(process.cwd(), 'data', 'boxers.json')
  const data = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(data)
}

// Get a single boxer without loading all data
export function getBoxerBySlugFromFile(slug: string): BoxerMetadata | null {
  const boxers = getBoxersFromFile()
  return boxers.find(b => (b.slug || b.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')) === slug) || null
}

// Get boxer stats without loading all data
export function getBoxerStatsLightweight(boxer: BoxerMetadata) {
  const wins = boxer.proWins || 0
  const losses = boxer.proLosses || 0
  const draws = boxer.proDraws || 0
  const kos = boxer.proWinsByKnockout || 0
  const totalBouts = boxer.proTotalBouts || wins + losses + draws

  const winRate = totalBouts > 0 ? Math.round((wins / totalBouts) * 100) : 0
  const koRate = wins > 0 ? Math.round((kos / wins) * 100) : 0

  return {
    record: `${wins}-${losses}-${draws}`,
    winRate: `${winRate}%`,
    koRate: `${koRate}%`,
    totalBouts
  }
}