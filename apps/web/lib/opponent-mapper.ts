import fs from 'node:fs'
import path from 'node:path'

// Cache for opponent name to slug mapping
let opponentMap: Map<string, string> | null = null

/**
 * Creates a mapping of boxer names to their slugs for quick opponent lookup
 * This runs at build time only
 */
export function getOpponentSlugMap(): Map<string, string> {
  if (opponentMap) {
    return opponentMap
  }

  opponentMap = new Map()

  try {
    // Read the index file that has all boxer names and slugs
    const indexPath = path.join(process.cwd(), 'public/data/boxers', 'index.json')
    const data = fs.readFileSync(indexPath, 'utf-8')
    const boxers = JSON.parse(data)

    // Create mappings for both regular names and birth names
    for (const boxer of boxers) {
      if (boxer.name) {
        // Normalize the name for better matching
        const normalizedName = boxer.name.toLowerCase().trim()
        opponentMap.set(normalizedName, boxer.slug)

        // Also add the exact name for exact matches
        opponentMap.set(boxer.name, boxer.slug)
      }

      // Also map birth names if different
      if (boxer.birthName && boxer.birthName !== boxer.name) {
        const normalizedBirthName = boxer.birthName.toLowerCase().trim()
        opponentMap.set(normalizedBirthName, boxer.slug)
        opponentMap.set(boxer.birthName, boxer.slug)
      }
    }
  } catch (error) {
    console.error('Failed to create opponent map:', error)
  }

  return opponentMap
}

/**
 * Gets the slug for an opponent name if they exist in our database
 */
export function getOpponentSlug(opponentName: string): string | undefined {
  if (!opponentName) return undefined

  const map = getOpponentSlugMap()

  // Try exact match first
  let slug = map.get(opponentName)
  if (slug) return slug

  // Try normalized match
  const normalizedName = opponentName.toLowerCase().trim()
  slug = map.get(normalizedName)
  if (slug) return slug

  // Try without common suffixes like "Jr", "Sr", "III", etc.
  const nameWithoutSuffix = normalizedName.replace(/\s+(jr\.?|sr\.?|iii|ii|iv|v)$/i, '').trim()

  if (nameWithoutSuffix !== normalizedName) {
    slug = map.get(nameWithoutSuffix)
    if (slug) return slug
  }

  return undefined
}

/**
 * Pre-compute opponent links for a list of bouts
 * Returns a map of opponent names to their slugs
 */
export function getOpponentLinksForBouts(
  bouts: Array<{ opponentName: string }>
): Map<string, string> {
  const links = new Map<string, string>()

  for (const bout of bouts) {
    if (bout.opponentName && !links.has(bout.opponentName)) {
      const slug = getOpponentSlug(bout.opponentName)
      if (slug) {
        links.set(bout.opponentName, slug)
      }
    }
  }

  return links
}
