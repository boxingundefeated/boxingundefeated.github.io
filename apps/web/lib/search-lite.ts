// Lightweight search implementation without heavy dependencies
export interface SearchResult {
  slug: string
  name: string
  division?: string
  nationality?: string
  score: number
}

export class LightweightSearch {
  private index: SearchResult[] = []

  constructor(data: any[]) {
    this.index = data.map(boxer => ({
      slug: boxer.slug,
      name: boxer.name.toLowerCase(),
      division: boxer.proDivision?.toLowerCase(),
      nationality: boxer.nationality?.toLowerCase(),
      score: 0
    }))
  }

  search(query: string, limit = 20): SearchResult[] {
    if (!query || query.length < 2) return []

    const searchTerm = query.toLowerCase().trim()
    const results: SearchResult[] = []

    for (const item of this.index) {
      let score = 0

      // Exact match
      if (item.name === searchTerm) {
        score = 100
      }
      // Starts with
      else if (item.name.startsWith(searchTerm)) {
        score = 80
      }
      // Contains
      else if (item.name.includes(searchTerm)) {
        score = 60
      }
      // Check division
      else if (item.division?.includes(searchTerm)) {
        score = 40
      }
      // Check nationality
      else if (item.nationality?.includes(searchTerm)) {
        score = 30
      }

      if (score > 0) {
        results.push({ ...item, score })
      }
    }

    // Sort by score and return top results
    return results.sort((a, b) => b.score - a.score).slice(0, limit)
  }
}
