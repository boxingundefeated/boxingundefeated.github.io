// @ts-ignore - Large JSON file
// Lazy load the data only when needed
let boxersData: any = null

function loadBoxersData() {
  if (!boxersData) {
    // Only load in Node.js environment (build time)
    // This prevents the data from being bundled in client-side JS
    if (typeof window === 'undefined') {
      boxersData = require('../../../data/boxers.json')
    } else {
      // In browser, return empty array
      // The data should already be in the static HTML
      console.warn('Attempting to load boxers data in browser - this should not happen')
      return []
    }
  }
  return boxersData
}

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

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export function getBoxers(): BoxerMetadata[] {
  const data = loadBoxersData()
  return data
    .map((boxer: any) => ({
      ...boxer,
      // Ensure slug exists
      slug: boxer.slug || generateSlug(boxer.name)
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
    { slug: 'heavy', name: 'Heavyweight', division: 'heavy' },
    { slug: 'light-heavy', name: 'Light Heavyweight', division: 'light heavy' },
    { slug: 'middle', name: 'Middleweight', division: 'middle' },
    { slug: 'welter', name: 'Welterweight', division: 'welter' },
    { slug: 'light', name: 'Lightweight', division: 'light' },
    { slug: 'feather', name: 'Featherweight', division: 'feather' },
    { slug: 'bantam', name: 'Bantamweight', division: 'bantam' },
    { slug: 'fly', name: 'Flyweight', division: 'fly' }
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

// Create a map of boxer names to slugs for efficient lookup
let boxerNameMap: Map<string, string> | null = null

function getBoxerNameMap(): Map<string, string> {
  if (!boxerNameMap) {
    boxerNameMap = new Map()
    const boxers = getBoxersWithoutBouts() // Use lightweight version
    boxers.forEach(boxer => {
      // Add both the exact name and lowercase version
      boxerNameMap!.set(boxer.name, boxer.slug)
      boxerNameMap!.set(boxer.name.toLowerCase(), boxer.slug)
    })
  }
  return boxerNameMap
}

// Helper function to find boxer by name and return their slug
export function getBoxerSlugByName(name: string): string | null {
  const nameMap = getBoxerNameMap()
  return nameMap.get(name) || nameMap.get(name.toLowerCase()) || null
}

// Optimized function to get boxers without bout data for listing pages
export function getBoxersWithoutBouts(): BoxerMetadata[] {
  const data = loadBoxersData()
  return data
    .map((boxer: any) => {
      const { bouts, ...boxerWithoutBouts } = boxer
      return {
        ...boxerWithoutBouts,
        slug: boxer.slug || generateSlug(boxer.name)
      }
    })
    .sort((a: BoxerMetadata, b: BoxerMetadata) => {
      const aBouts = a.proTotalBouts || 0
      const bBouts = b.proTotalBouts || 0
      if (aBouts !== bBouts) return bBouts - aBouts

      const aWins = a.proWins || 0
      const bWins = b.proWins || 0
      return bWins - aWins
    })
}
