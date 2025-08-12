const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// Load the full boxers data
const boxersDataPath = path.join(__dirname, '../apps/web/data/boxers.json')
const boxersData = JSON.parse(fs.readFileSync(boxersDataPath, 'utf-8'))

// Output directory for images
const imagesDir = path.join(__dirname, '../apps/web/public/images/boxers')

// Create output directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename)

    // Skip if already exists
    if (fs.existsSync(filePath)) {
      resolve('exists')
      return
    }

    const file = fs.createWriteStream(filePath)
    const protocol = url.startsWith('https') ? https : http

    const request = protocol.get(url, response => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        file.close()
        fs.unlinkSync(filePath)
        downloadImage(response.headers.location, filename).then(resolve).catch(reject)
        return
      }

      if (response.statusCode !== 200) {
        file.close()
        fs.unlinkSync(filePath)
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      response.pipe(file)

      file.on('finish', () => {
        file.close()
        resolve('downloaded')
      })
    })

    request.on('error', err => {
      file.close()
      fs.unlink(filePath, () => {})
      reject(err)
    })

    request.setTimeout(10000, () => {
      request.destroy()
      file.close()
      fs.unlink(filePath, () => {})
      reject(new Error('Timeout'))
    })
  })
}

// Process boxers
async function processBoxers() {
  let downloaded = 0
  let failed = 0
  let skipped = 0
  let updated = 0

  console.log(`Processing ${boxersData.length} boxers...`)

  for (let i = 0; i < boxersData.length; i++) {
    const boxer = boxersData[i]

    if (!boxer.avatarImage) {
      skipped++
      continue
    }

    // Check if it's a boxrec URL
    if (!boxer.avatarImage.includes('boxrec.com')) {
      skipped++
      continue
    }

    // Generate filename based on boxer slug or ID
    const slug =
      boxer.slug ||
      boxer.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
    const filename = `${slug}.jpg`

    try {
      const result = await downloadImage(boxer.avatarImage, filename)

      if (result === 'downloaded') {
        downloaded++
      } else {
        skipped++
      }

      // Update the boxer data with local path
      // For GitHub Pages serving from /boxing path
      boxer.avatarImage = `/boxing/images/boxers/${filename}`
      updated++

      if ((i + 1) % 50 === 0) {
        console.log(
          `Progress: ${i + 1}/${boxersData.length} - Downloaded: ${downloaded}, Failed: ${failed}, Skipped: ${skipped}`
        )
      }

      // Rate limit - wait 200ms between downloads to be respectful
      if (result === 'downloaded') {
        await new Promise(resolve => setTimeout(resolve, 200))
      }
    } catch (error) {
      failed++
      console.error(`Failed to download image for ${boxer.name}: ${error.message}`)
      // Set to null so we don't show broken images
      boxer.avatarImage = null
    }
  }

  // Save updated boxers data
  fs.writeFileSync(boxersDataPath, JSON.stringify(boxersData, null, 2))

  // Also update the individual JSON files in public/data/boxers
  const publicBoxersDir = path.join(__dirname, '../apps/web/public/data/boxers')

  if (fs.existsSync(publicBoxersDir)) {
    console.log('\nUpdating individual boxer JSON files...')

    for (const boxer of boxersData) {
      const slug =
        boxer.slug ||
        boxer.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
      const boxerFilePath = path.join(publicBoxersDir, `${slug}.json`)

      if (fs.existsSync(boxerFilePath)) {
        try {
          const boxerFileData = JSON.parse(fs.readFileSync(boxerFilePath, 'utf-8'))
          boxerFileData.avatarImage = boxer.avatarImage
          fs.writeFileSync(boxerFilePath, JSON.stringify(boxerFileData))
        } catch (error) {
          console.error(`Failed to update ${boxerFilePath}: ${error.message}`)
        }
      }
    }

    // Update the index file
    const indexPath = path.join(publicBoxersDir, 'index.json')
    if (fs.existsSync(indexPath)) {
      const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
      for (const boxer of indexData) {
        const matchingBoxer = boxersData.find(b => b.id === boxer.id || b.slug === boxer.slug)
        if (matchingBoxer) {
          boxer.avatarImage = matchingBoxer.avatarImage
        }
      }
      fs.writeFileSync(indexPath, JSON.stringify(indexData))
    }
  }

  console.log('\n=== Download Complete ===')
  console.log(`Total processed: ${boxersData.length}`)
  console.log(`Downloaded: ${downloaded}`)
  console.log(`Failed: ${failed}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Updated: ${updated}`)
  console.log(`Images saved to: ${imagesDir}`)
}

// Run the script
processBoxers().catch(console.error)
