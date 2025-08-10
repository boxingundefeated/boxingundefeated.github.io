const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Load the boxer index
const indexPath = path.join(__dirname, '../apps/web/public/data/boxers/index.json');
const boxersIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

// Output directory for images
const outputDir = path.join(__dirname, '../apps/web/public/images/boxers');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outputDir, filename));
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(path.join(outputDir, filename), () => {});
      reject(err);
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Process boxers with rate limiting
async function processBoxers() {
  let downloaded = 0;
  let failed = 0;
  let skipped = 0;
  
  console.log(`Processing ${boxersIndex.length} boxers...`);
  
  for (let i = 0; i < boxersIndex.length; i++) {
    const boxer = boxersIndex[i];
    
    if (!boxer.avatarImage || !boxer.avatarImage.includes('boxrec.com')) {
      skipped++;
      continue;
    }
    
    const filename = `${boxer.slug}.jpg`;
    const filePath = path.join(outputDir, filename);
    
    // Skip if already downloaded
    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }
    
    try {
      await downloadImage(boxer.avatarImage, filename);
      downloaded++;
      
      // Update the boxer data with local path
      const boxerDataPath = path.join(__dirname, '../apps/web/public/data/boxers', `${boxer.slug}.json`);
      if (fs.existsSync(boxerDataPath)) {
        const boxerData = JSON.parse(fs.readFileSync(boxerDataPath, 'utf-8'));
        boxerData.avatarImage = `/images/boxers/${filename}`;
        fs.writeFileSync(boxerDataPath, JSON.stringify(boxerData));
      }
      
      // Update index
      boxer.avatarImage = `/images/boxers/${filename}`;
      
      if ((downloaded + failed) % 10 === 0) {
        console.log(`Progress: ${downloaded} downloaded, ${failed} failed, ${skipped} skipped`);
      }
      
      // Rate limit - wait 100ms between downloads
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      failed++;
      console.error(`Failed to download image for ${boxer.name}: ${error.message}`);
    }
  }
  
  // Save updated index
  fs.writeFileSync(indexPath, JSON.stringify(boxersIndex));
  
  console.log('\n=== Download Complete ===');
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Failed: ${failed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total: ${boxersIndex.length}`);
}

// Run with limited concurrency
processBoxers().catch(console.error);