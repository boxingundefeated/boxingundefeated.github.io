import fs from 'node:fs'
import path from 'node:path'

interface BoxerSearchEntry {
  name: string
  slug: string
  division?: string
  wins?: number
  losses?: number
  draws?: number
  kos?: number
  nationality?: string
}

async function generateBoxerSearchIndex() {
  // Handle different working directories
  // In Vercel, the working directory is the monorepo root
  // Locally when run from package.json, it's apps/web
  const possiblePaths = [
    path.join(process.cwd(), '..', '..', 'data', 'boxers.json'), // When run from apps/web
    path.join(process.cwd(), 'data', 'boxers.json'), // When run from monorepo root
    path.join(__dirname, '../data/boxers.json') // Relative to script location
  ]

  let dataPath: string | undefined
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      dataPath = p
      break
    }
  }

  if (!dataPath) {
    console.error('Could not find boxers.json in any of the expected locations:')
    possiblePaths.forEach(p => console.error(`  - ${p}`))
    console.error('Current working directory:', process.cwd())
    console.error('Script directory:', __dirname)
    process.exit(1)
  }

  console.log(`Loading boxer data from: ${dataPath}`)
  const boxersData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  const searchEntries: BoxerSearchEntry[] = boxersData.map((boxer: any) => ({
    name: boxer.name,
    slug:
      boxer.slug ||
      boxer.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, ''),
    division: boxer.proDivision,
    wins: boxer.proWins,
    losses: boxer.proLosses,
    draws: boxer.proDraws,
    kos: boxer.proWinsByKnockout,
    nationality: boxer.nationality
  }))

  // Write the search index
  const searchIndexPath = path.join(process.cwd(), 'public', 'search', 'boxer-search-index.json')

  // Ensure the directory exists
  const searchIndexDir = path.dirname(searchIndexPath)
  if (!fs.existsSync(searchIndexDir)) {
    fs.mkdirSync(searchIndexDir, { recursive: true })
  }

  fs.writeFileSync(searchIndexPath, JSON.stringify(searchEntries))
  console.log(`Boxer search index generated at ${searchIndexPath}`)
  console.log(`Total boxers indexed: ${searchEntries.length}`)
}

generateBoxerSearchIndex().catch(console.error)
