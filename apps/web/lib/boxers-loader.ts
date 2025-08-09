// @ts-ignore - Large JSON file
const boxersData = require('../../../data/boxers.json')

export interface Bout {
  boxerId: string
  boxrecId: string
  boutDate: string
  opponentName: string
  opponentWeight?: string | null
  opponentRecord?: string | null
  eventName: string
  refereeName?: string | null
  judge1Name?: string | null
  judge1Score?: string | null
  judge2Name?: string | null
  judge2Score?: string | null
  judge3Name?: string | null
  judge3Score?: string | null
  numRoundsScheduled?: number | null
  result: string
  resultMethod?: string | null
  resultRound?: string | null
  eventPageLink?: string | null
  boutPageLink?: string | null
  scorecardsPageLink?: string | null
  titleFight: boolean
}

export interface BoxerMetadata {
  id: string
  slug: string
  name: string
  birthName?: string | null
  nicknames?: string | null
  avatarImage?: string
  residence?: string
  birthPlace?: string | null
  nationality?: string
  height?: string | null
  reach?: string | null
  stance?: string | null
  bio?: string | null
  proDivision?: string
  proWins?: number
  proWinsByKnockout?: number
  proLosses?: number
  proDraws?: number
  proStatus?: string
  proTotalBouts?: number
  proTotalRounds?: number
  dateOfBirth?: string | null
  gender?: string
  proDebutDate?: string
  bouts?: string | Bout[]
  promoters?: string | null
  trainers?: string | null
  managers?: string | null
  gym?: string | null
}

export function getBoxers(): BoxerMetadata[] {
  return boxersData
    .map((boxer: any) => ({
      ...boxer,
      // Ensure slug exists
      slug:
        boxer.slug ||
        boxer.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
    }))
    .sort((a: BoxerMetadata, b: BoxerMetadata) => {
      // Sort by total bouts (most experienced first), then by wins
      const aBouts = a.proTotalBouts || 0
      const bBouts = b.proTotalBouts || 0
      if (aBouts !== bBouts) return bBouts - aBouts

      const aWins = a.proWins || 0
      const bWins = b.proWins || 0
      return bWins - aWins
    })
}

export function getBoxerBySlug(slug: string): BoxerMetadata | null {
  const boxers = getBoxers()
  return boxers.find(boxer => boxer.slug === slug) || null
}

export function getBoxerCategories() {
  return [
    { slug: 'heavy', name: 'Heavyweight' },
    { slug: 'light-heavy', name: 'Light Heavyweight' },
    { slug: 'middle', name: 'Middleweight' },
    { slug: 'welter', name: 'Welterweight' },
    { slug: 'light', name: 'Lightweight' },
    { slug: 'feather', name: 'Featherweight' },
    { slug: 'bantam', name: 'Bantamweight' },
    { slug: 'fly', name: 'Flyweight' }
  ]
}

export function getBoxersByDivision(division: string): BoxerMetadata[] {
  const boxers = getBoxers()
  return boxers.filter(boxer => boxer.proDivision === division)
}

export function getBoxerStats(boxer: BoxerMetadata) {
  const winRate =
    boxer.proTotalBouts && boxer.proTotalBouts > 0
      ? (((boxer.proWins || 0) / boxer.proTotalBouts) * 100).toFixed(1)
      : 0

  const koRate =
    boxer.proWins && boxer.proWins > 0
      ? (((boxer.proWinsByKnockout || 0) / boxer.proWins) * 100).toFixed(1)
      : 0

  return {
    record: `${boxer.proWins || 0}-${boxer.proLosses || 0}-${boxer.proDraws || 0}`,
    winRate: `${winRate}%`,
    koRate: `${koRate}%`,
    totalBouts: boxer.proTotalBouts || 0
  }
}

export function getBoxerBouts(boxer: BoxerMetadata): Bout[] {
  if (!boxer.bouts) return []

  // If bouts is a string, parse it as JSON
  if (typeof boxer.bouts === 'string') {
    try {
      return JSON.parse(boxer.bouts)
    } catch (e) {
      console.error('Failed to parse bouts for boxer:', boxer.name, e)
      return []
    }
  }

  return boxer.bouts
}
