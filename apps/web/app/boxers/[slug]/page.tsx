import fs from 'node:fs'
import path from 'node:path'
import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FightHistory } from '@/components/fight-history'
import { OptimizedImage } from '@/components/optimized-image'
import { type BoxerMetadata, getBoxerBouts, getBoxerStats } from '@/lib/boxers-loader'
import { getOpponentLinksForBouts } from '@/lib/opponent-mapper'

// Load individual boxer data from split JSON files
function getBoxerBySlugOptimized(slug: string): BoxerMetadata | null {
  try {
    // In Vercel, process.cwd() is the monorepo root, so we need apps/web prefix
    // Locally, process.cwd() is already apps/web
    const isVercel = process.env.VERCEL === '1'
    const basePath = isVercel ? 'apps/web/public/data/boxers' : 'public/data/boxers'
    const filePath = path.join(process.cwd(), basePath, `${slug}.json`)
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

// Load index for generating static params
function getBoxerSlugs(): string[] {
  try {
    // In Vercel, process.cwd() is the monorepo root, so we need apps/web prefix
    // Locally, process.cwd() is already apps/web
    const isVercel = process.env.VERCEL === '1'
    const basePath = isVercel ? 'apps/web/public/data/boxers' : 'public/data/boxers'
    const indexPath = path.join(process.cwd(), basePath, 'index.json')
    const data = fs.readFileSync(indexPath, 'utf-8')
    const index = JSON.parse(data)
    return index.map((boxer: any) => boxer.slug)
  } catch {
    console.error('Failed to load boxer index')
    return []
  }
}

export async function generateStaticParams() {
  const slugs = getBoxerSlugs()
  return slugs.map(slug => ({
    slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = await params
  const boxer = getBoxerBySlugOptimized(slug)
  const baseUrl = getBaseUrl()

  if (!boxer) {
    return {
      title: 'Boxer Not Found'
    }
  }

  return {
    title: `${boxer.name} - Professional Boxer`,
    description: `Professional boxing record and statistics for ${boxer.name}. ${boxer.bio ? boxer.bio.substring(0, 160) : ''}`,
    alternates: {
      canonical: `${baseUrl}/boxers/${slug}`
    }
  }
}

export default async function BoxerPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const boxer = getBoxerBySlugOptimized(slug)

  if (!boxer) {
    notFound()
  }

  const baseUrl = getBaseUrl()
  const stats = getBoxerStats(boxer)
  const bouts = getBoxerBouts(boxer)
  const opponentLinks = getOpponentLinksForBouts(bouts)
  const breadcrumbItems = [
    { name: 'Boxers', href: '/boxers' },
    { name: boxer.name, href: `/boxers/${slug}` }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />

      <div className="space-y-6 mt-6">
        <div className="flex items-start gap-6">
          {boxer.avatarImage && (
            <OptimizedImage
              src={boxer.avatarImage}
              alt={boxer.name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover"
              priority={true}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {boxer.name}
              {boxer.nicknames && (
                <span className="ml-3 text-2xl text-muted-foreground">"{boxer.nicknames}"</span>
              )}
            </h1>
            {boxer.residence && <p className="text-muted-foreground">{boxer.residence}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.record}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {boxer.proWinsByKnockout || 0} KOs
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.winRate}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {boxer.proWins || 0} victories
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">KO Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.koRate}</div>
              <div className="text-sm text-muted-foreground mt-1">of victories</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fighter Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boxer.nationality && (
                <>
                  <dt className="text-sm text-muted-foreground">Nationality</dt>
                  <dd className="font-medium">{boxer.nationality}</dd>
                </>
              )}
              {boxer.proDivision && (
                <>
                  <dt className="text-sm text-muted-foreground">Division</dt>
                  <dd className="font-medium capitalize">{boxer.proDivision}</dd>
                </>
              )}
              {boxer.stance && (
                <>
                  <dt className="text-sm text-muted-foreground">Stance</dt>
                  <dd className="font-medium capitalize">{boxer.stance}</dd>
                </>
              )}
              {boxer.height && (
                <>
                  <dt className="text-sm text-muted-foreground">Height</dt>
                  <dd className="font-medium">{boxer.height} cm</dd>
                </>
              )}
              {boxer.reach && (
                <>
                  <dt className="text-sm text-muted-foreground">Reach</dt>
                  <dd className="font-medium">{boxer.reach}"</dd>
                </>
              )}
              {boxer.proStatus && (
                <>
                  <dt className="text-sm text-muted-foreground">Status</dt>
                  <dd className="font-medium capitalize">{boxer.proStatus}</dd>
                </>
              )}
              {boxer.proTotalBouts && (
                <>
                  <dt className="text-sm text-muted-foreground">Total Bouts</dt>
                  <dd className="font-medium">{boxer.proTotalBouts}</dd>
                </>
              )}
              {boxer.proTotalRounds && (
                <>
                  <dt className="text-sm text-muted-foreground">Total Rounds</dt>
                  <dd className="font-medium">{boxer.proTotalRounds}</dd>
                </>
              )}
              {boxer.birthPlace && (
                <>
                  <dt className="text-sm text-muted-foreground">Birth Place</dt>
                  <dd className="font-medium">{boxer.birthPlace}</dd>
                </>
              )}
              {boxer.dateOfBirth && (
                <>
                  <dt className="text-sm text-muted-foreground">Date of Birth</dt>
                  <dd className="font-medium">{boxer.dateOfBirth}</dd>
                </>
              )}
              {boxer.birthName && boxer.birthName !== boxer.name && (
                <>
                  <dt className="text-sm text-muted-foreground">Birth Name</dt>
                  <dd className="font-medium">{boxer.birthName}</dd>
                </>
              )}
              {boxer.proDebutDate && (
                <>
                  <dt className="text-sm text-muted-foreground">Pro Debut</dt>
                  <dd className="font-medium">{boxer.proDebutDate}</dd>
                </>
              )}
              {boxer.gym && (
                <>
                  <dt className="text-sm text-muted-foreground">Gym</dt>
                  <dd className="font-medium">{boxer.gym}</dd>
                </>
              )}
              {boxer.trainers && (
                <>
                  <dt className="text-sm text-muted-foreground">Trainers</dt>
                  <dd className="font-medium">{boxer.trainers}</dd>
                </>
              )}
              {boxer.managers && (
                <>
                  <dt className="text-sm text-muted-foreground">Managers</dt>
                  <dd className="font-medium">{boxer.managers}</dd>
                </>
              )}
              {boxer.promoters && (
                <>
                  <dt className="text-sm text-muted-foreground">Promoters</dt>
                  <dd className="font-medium">{boxer.promoters}</dd>
                </>
              )}
            </dl>
          </CardContent>
        </Card>

        {boxer.bio && (
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Bio content is from trusted source */}
              <div
                className="space-y-4 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: boxer.bio }}
              />
            </CardContent>
          </Card>
        )}

        <FightHistory bouts={bouts} opponentLinks={opponentLinks} />
      </div>
    </div>
  )
}
