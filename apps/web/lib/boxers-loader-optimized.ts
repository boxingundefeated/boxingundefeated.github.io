import type { BoxerMetadata } from './boxers-loader'

// Cache for loaded division data
const divisionCache = new Map<string, BoxerMetadata[]>()
const searchIndexCache = { data: null as any, loaded: false }

// Load search index (lightweight, just names and basic info)
export async function loadSearchIndex() {
  if (searchIndexCache.loaded) {
    return searchIndexCache.data
  }

  try {
    const response = await fetch('/data/boxers/search-index.json')
    searchIndexCache.data = await response.json()
    searchIndexCache.loaded = true
    return searchIndexCache.data
  } catch (error) {
    console.error('Failed to load search index:', error)
    return []
  }
}

// Load boxers for a specific division
export async function loadBoxersByDivision(divisionSlug: string): Promise<BoxerMetadata[]> {
  // Check cache first
  if (divisionCache.has(divisionSlug)) {
    return divisionCache.get(divisionSlug)!
  }

  try {
    const response = await fetch(`/data/boxers/${divisionSlug}.json`)
    const data = await response.json()
    
    // Cache the result
    divisionCache.set(divisionSlug, data)
    
    return data
  } catch (error) {
    console.error(`Failed to load division ${divisionSlug}:`, error)
    return []
  }
}

// Load division index (metadata about all divisions)
export async function loadDivisionIndex() {
  try {
    const response = await fetch('/data/boxers/index.json')
    return await response.json()
  } catch (error) {
    console.error('Failed to load division index:', error)
    return { divisions: [], total: 0 }
  }
}

// Get division slug from display name
export function getDivisionSlug(division: string): string {
  return division.toLowerCase().replace(/\s+/g, '-')
}

// Sort boxers by different criteria
export function sortBoxers(boxers: BoxerMetadata[], sortBy: string): BoxerMetadata[] {
  const sorted = [...boxers]
  
  switch (sortBy) {
    case 'wins':
      sorted.sort((a, b) => (b.proWins || 0) - (a.proWins || 0))
      break
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'bouts':
      sorted.sort((a, b) => (b.proTotalBouts || 0) - (a.proTotalBouts || 0))
      break
    default:
      sorted.sort((a, b) => (b.proWins || 0) - (a.proWins || 0))
  }
  
  return sorted
}