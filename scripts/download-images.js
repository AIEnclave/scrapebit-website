const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

const STRAPI_BASE_URL = 'https://strapi.thunderbit.com'
const JSON_FILE = path.join(__dirname, '../src/data/templates.json')
const OUTPUT_DIR = path.join(__dirname, '../public/uploads')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Download a single file
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    const file = fs.createWriteStream(outputPath)
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close()
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath)
        }
        return downloadFile(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject)
      }
      
      if (response.statusCode !== 200) {
        file.close()
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath)
        }
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
        return
      }
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        resolve(outputPath)
      })
    })
    
    request.on('error', (err) => {
      file.close()
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
      }
      reject(err)
    })
    
    request.setTimeout(30000, () => {
      request.destroy()
      file.close()
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
      }
      reject(new Error(`Timeout downloading ${url}`))
    })
  })
}

// Extract all image URLs from JSON (including from contents field)
function extractImageUrls(data) {
  const urls = new Set()
  
  function traverse(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(item => traverse(item))
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        // Handle 'url' field - can be direct or nested
        if (key === 'url') {
          const url = obj[key]
          if (typeof url === 'string' && url.startsWith('/uploads/')) {
            urls.add(url)
          }
        }
        // Handle 'thumbnail' field - can be a string URL or an object with nested url
        else if (key === 'thumbnail') {
          const thumbnail = obj[key]
          if (typeof thumbnail === 'string' && thumbnail.startsWith('/uploads/')) {
            urls.add(thumbnail)
          } else if (thumbnail && typeof thumbnail === 'object' && thumbnail.url) {
            // Handle nested thumbnail.url (e.g., formats.thumbnail.url)
            if (typeof thumbnail.url === 'string' && thumbnail.url.startsWith('/uploads/')) {
              urls.add(thumbnail.url)
            }
          }
        }
        // Handle 'formats' object which contains nested thumbnail
        else if (key === 'formats' && obj[key] && typeof obj[key] === 'object') {
          const formats = obj[key]
          if (formats.thumbnail && formats.thumbnail.url) {
            const thumbnailUrl = formats.thumbnail.url
            if (typeof thumbnailUrl === 'string' && thumbnailUrl.startsWith('/uploads/')) {
              urls.add(thumbnailUrl)
            }
          }
          // Continue traversing formats object
          traverse(formats)
        }
        else if (key === 'contents' && typeof obj[key] === 'string') {
          // Extract image URLs from markdown content
          const content = obj[key]
          // Match markdown images: ![alt](https://strapi.thunderbit.com/uploads/...)
          const markdownImageRegex = /!\[.*?\]\((https:\/\/strapi\.thunderbit\.com\/uploads\/[^)]+)\)/g
          let match
          while ((match = markdownImageRegex.exec(content)) !== null) {
            const fullUrl = match[1]
            const relativePath = fullUrl.replace('https://strapi.thunderbit.com', '')
            urls.add(relativePath)
          }
          // Also match direct URLs in content
          const directUrlRegex = /https:\/\/strapi\.thunderbit\.com(\/uploads\/[^\s"')]+)/g
          while ((match = directUrlRegex.exec(content)) !== null) {
            urls.add(match[1])
          }
        } else {
          traverse(obj[key])
        }
      })
    }
  }
  
  traverse(data)
  return Array.from(urls)
}

async function main() {
  console.log('📖 Reading JSON file...')
  const jsonData = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'))
  
  console.log(`📊 Found ${jsonData.templates?.length || 0} templates in JSON file`)
  
  console.log('🔍 Extracting image URLs from all templates...')
  const imageUrls = extractImageUrls(jsonData)
  console.log(`✅ Found ${imageUrls.length} unique images to download\n`)
  
  // Filter out already downloaded files
  const toDownload = []
  let skipped = 0
  
  for (const imagePath of imageUrls) {
    const filename = path.basename(imagePath)
    const outputPath = path.join(OUTPUT_DIR, filename)
    
    if (fs.existsSync(outputPath)) {
      skipped++
    } else {
      toDownload.push(imagePath)
    }
  }
  
  if (skipped > 0) {
    console.log(`⏭️  Skipped ${skipped} files (already exist)`)
  }
  
  console.log(`📥 Downloading ${toDownload.length} images in parallel (50 concurrent)...\n`)
  
  // Download in parallel batches of 50
  const CONCURRENT_DOWNLOADS = 50
  let downloaded = 0
  let failed = 0
  const errors = []
  
  // Process downloads in batches
  for (let i = 0; i < toDownload.length; i += CONCURRENT_DOWNLOADS) {
    const batch = toDownload.slice(i, i + CONCURRENT_DOWNLOADS)
    const batchNumber = Math.floor(i / CONCURRENT_DOWNLOADS) + 1
    const totalBatches = Math.ceil(toDownload.length / CONCURRENT_DOWNLOADS)
    
    console.log(`📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} images)...`)
    
    const downloadPromises = batch.map(async (imagePath) => {
      const fullUrl = `${STRAPI_BASE_URL}${imagePath}`
      const filename = path.basename(imagePath)
      const outputPath = path.join(OUTPUT_DIR, filename)
      
      try {
        await downloadFile(fullUrl, outputPath)
        downloaded++
        return { success: true, filename }
      } catch (error) {
        failed++
        errors.push({ url: fullUrl, error: error.message })
        return { success: false, filename, error: error.message }
      }
    })
    
    // Wait for all downloads in this batch to complete
    const results = await Promise.allSettled(downloadPromises)
    
    // Log results
    const batchDownloaded = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const batchFailed = results.filter(r => r.status === 'fulfilled' && !r.value.success).length
    
    const totalProcessed = downloaded + failed + skipped
    const progress = `[${totalProcessed}/${imageUrls.length}]`
    console.log(`   ✅ Batch ${batchNumber}: ${batchDownloaded} downloaded, ${batchFailed} failed ${progress}`)
    
    // Small delay between batches to avoid overwhelming the server
    if (i + CONCURRENT_DOWNLOADS < toDownload.length) {
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }
  
  // Log any failed downloads
  if (errors.length > 0 && errors.length <= 20) {
    console.log('\n❌ Failed downloads:')
    errors.forEach(({ url, error }) => {
      console.log(`   - ${path.basename(url)}: ${error}`)
    })
  } else if (errors.length > 20) {
    console.log(`\n❌ ${errors.length} downloads failed (too many to list individually)`)
  }
  
  console.log('\n📊 Summary:')
  console.log(`✅ Downloaded: ${downloaded}`)
  console.log(`⏭️  Skipped (already exists): ${skipped}`)
  console.log(`❌ Failed: ${failed}`)
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:')
    errors.forEach(({ url, error }) => {
      console.log(`  - ${url}: ${error}`)
    })
  }
  
  console.log('\n✨ Done! Images are now in public/uploads/')
  console.log('   They will be accessible at /uploads/filename.png')
  console.log('   The JSON file paths remain as /uploads/... which Next.js will serve from /public/uploads/')
}

main().catch(console.error)
