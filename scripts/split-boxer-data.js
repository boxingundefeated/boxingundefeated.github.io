const fs = require('fs')
const path = require('path')

// Load the full boxers data - handle different working directories
// In Vercel, the working directory is the monorepo root
// Locally when run from package.json, it's apps/web
const possiblePaths = [
  path.join(__dirname, '../data/boxers.json'), // When run from scripts/ directory
  path.join(process.cwd(), 'data/boxers.json'), // When run from monorepo root
  path.join(process.cwd(), '../../data/boxers.json') // When run from apps/web
]

let boxersData
let dataPath
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
boxersData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

// Output directory for split data
const outputDir = path.join(__dirname, '../apps/web/public/data/boxers')

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Function to generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

// Create individual boxer files
console.log(`Processing ${boxersData.length} boxers...`)

// Create a lightweight index without bouts data
const boxerIndex = []

// Track statistics
let totalSize = 0
let largestFile = { name: '', size: 0 }

boxersData.forEach((boxer, index) => {
  const slug = boxer.slug || generateSlug(boxer.name)

  // Save individual boxer data
  const boxerFilePath = path.join(outputDir, `${slug}.json`)
  const boxerDataStr = JSON.stringify(boxer)
  fs.writeFileSync(boxerFilePath, boxerDataStr)

  const fileSize = Buffer.byteLength(boxerDataStr)
  totalSize += fileSize

  if (fileSize > largestFile.size) {
    largestFile = { name: boxer.name, size: fileSize }
  }

  // Add to index (without bouts data)
  const { bouts, bio, ...boxerMetadata } = boxer
  boxerIndex.push({
    ...boxerMetadata,
    slug,
    hasBouts:
      !!bouts && (typeof bouts === 'string' ? JSON.parse(bouts).length > 0 : bouts.length > 0),
    hasBio: !!bio
  })

  if ((index + 1) % 100 === 0) {
    console.log(`Processed ${index + 1} boxers...`)
  }
})

// Sort index by total bouts and wins
boxerIndex.sort((a, b) => {
  const aBouts = a.proTotalBouts || 0
  const bBouts = b.proTotalBouts || 0
  if (aBouts !== bBouts) return bBouts - aBouts

  const aWins = a.proWins || 0
  const bWins = b.proWins || 0
  return bWins - aWins
})

// Save the index
fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(boxerIndex))

// Create division-specific indexes
const divisions = {}
boxerIndex.forEach(boxer => {
  if (boxer.proDivision) {
    const divisionSlug = boxer.proDivision.toLowerCase().replace(/\s+/g, '-')
    if (!divisions[divisionSlug]) {
      divisions[divisionSlug] = []
    }
    divisions[divisionSlug].push(boxer)
  }
})

// Save division files
Object.entries(divisions).forEach(([divisionSlug, boxers]) => {
  fs.writeFileSync(path.join(outputDir, `division-${divisionSlug}.json`), JSON.stringify(boxers))
})

// Create a search index (just names and slugs for autocomplete)
const searchIndex = boxerIndex.map(boxer => ({
  slug: boxer.slug,
  name: boxer.name,
  nicknames: boxer.nicknames,
  division: boxer.proDivision,
  nationality: boxer.nationality,
  record: `${boxer.proWins || 0}-${boxer.proLosses || 0}-${boxer.proDraws || 0}`
}))

fs.writeFileSync(path.join(outputDir, 'search-index.json'), JSON.stringify(searchIndex))

// Statistics
const avgFileSize = totalSize / boxersData.length
const indexSize = Buffer.byteLength(JSON.stringify(boxerIndex))
const searchIndexSize = Buffer.byteLength(JSON.stringify(searchIndex))

console.log('\n=== Data Split Complete ===')
console.log(`Total boxers processed: ${boxersData.length}`)
console.log(`Total data size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
console.log(`Average file size: ${(avgFileSize / 1024).toFixed(2)} KB`)
console.log(`Largest file: ${largestFile.name} (${(largestFile.size / 1024).toFixed(2)} KB)`)
console.log(`Index size: ${(indexSize / 1024).toFixed(2)} KB`)
console.log(`Search index size: ${(searchIndexSize / 1024).toFixed(2)} KB`)
console.log(`Divisions created: ${Object.keys(divisions).length}`)
console.log(`Output directory: ${outputDir}`)
