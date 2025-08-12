const fs = require('fs')
const path = require('path')

// Update main boxers.json
const boxersFile = path.join(__dirname, '../apps/web/data/boxers.json')
const boxersData = JSON.parse(fs.readFileSync(boxersFile, 'utf-8'))

let updatedCount = 0

boxersData.forEach(boxer => {
  if (boxer.avatarImage && boxer.avatarImage.startsWith('/boxing/')) {
    boxer.avatarImage = boxer.avatarImage.replace('/boxing/', '/')
    updatedCount++
  }
})

fs.writeFileSync(boxersFile, JSON.stringify(boxersData, null, 2))
console.log(`Updated ${updatedCount} image paths in apps/web/data/boxers.json`)

// Update individual boxer JSON files
const boxersDir = path.join(__dirname, '../apps/web/public/data/boxers')
const files = fs.readdirSync(boxersDir).filter(f => f.endsWith('.json'))

let fileCount = 0
files.forEach(file => {
  const filePath = path.join(boxersDir, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  let updated = false
  if (data.avatarImage && data.avatarImage.startsWith('/boxing/')) {
    data.avatarImage = data.avatarImage.replace('/boxing/', '/')
    updated = true
  }

  // Also update in the array format if it exists
  if (Array.isArray(data)) {
    data.forEach(boxer => {
      if (boxer.avatarImage && boxer.avatarImage.startsWith('/boxing/')) {
        boxer.avatarImage = boxer.avatarImage.replace('/boxing/', '/')
        updated = true
      }
    })
  }

  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    fileCount++
  }
})

console.log(`Updated ${fileCount} individual boxer JSON files`)
console.log('All image paths updated to use root path (/) instead of /boxing/')
