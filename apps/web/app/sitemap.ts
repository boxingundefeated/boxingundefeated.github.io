import type { MetadataRoute } from 'next'
import { getBoxerCategories, getBoxersWithoutBouts } from '@/lib/boxers-loader'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://devinschumacher.github.io/boxing'
      : 'http://localhost:3000')

  const boxers = await getBoxersWithoutBouts()
  const categories = getBoxerCategories()

  // Since we're using static export, we'll create a single sitemap
  // If it grows too large, you can split it manually
  const urls: MetadataRoute.Sitemap = []

  // Main pages
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  })

  urls.push({
    url: `${baseUrl}/boxers`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9
  })

  urls.push({
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  })

  urls.push({
    url: `${baseUrl}/search`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  })

  // Category pages
  categories.forEach(category => {
    urls.push({
      url: `${baseUrl}/boxers?division=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    })
  })

  // Boxer pages - Next.js will automatically handle large sitemaps
  boxers.forEach(boxer => {
    urls.push({
      url: `${baseUrl}/boxers/${boxer.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    })
  })

  return urls
}
