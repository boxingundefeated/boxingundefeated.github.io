// Utility functions for boxers that don't require loading the data
import type { BoxerMetadata } from './boxers-loader'

export function getBoxerStats(boxer: BoxerMetadata) {
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

export function getBoxerCategories() {
  return [
    { slug: 'heavy', name: 'Heavyweight', division: 'heavy' },
    { slug: 'light-heavy', name: 'Light Heavyweight', division: 'light heavy' },
    { slug: 'cruiser', name: 'Cruiserweight', division: 'cruiser' },
    { slug: 'super-middle', name: 'Super Middleweight', division: 'super middle' },
    { slug: 'middle', name: 'Middleweight', division: 'middle' },
    { slug: 'super-welter', name: 'Super Welterweight', division: 'super welter' },
    { slug: 'welter', name: 'Welterweight', division: 'welter' },
    { slug: 'super-light', name: 'Super Lightweight', division: 'super light' },
    { slug: 'light', name: 'Lightweight', division: 'light' },
    { slug: 'super-feather', name: 'Super Featherweight', division: 'super feather' },
    { slug: 'feather', name: 'Featherweight', division: 'feather' },
    { slug: 'super-bantam', name: 'Super Bantamweight', division: 'super bantam' },
    { slug: 'bantam', name: 'Bantamweight', division: 'bantam' },
    { slug: 'super-fly', name: 'Super Flyweight', division: 'super fly' },
    { slug: 'fly', name: 'Flyweight', division: 'fly' },
    { slug: 'light-fly', name: 'Light Flyweight', division: 'light fly' },
    { slug: 'minimum', name: 'Minimumweight', division: 'minimum' }
  ]
}