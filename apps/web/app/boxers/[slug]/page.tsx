import { getBoxerBySlug, getBoxers, getBoxerStats } from '@/lib/boxers-loader'
import { Breadcrumb } from '@thedaviddias/design-system/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@thedaviddias/design-system/card'
import { getBaseUrl } from '@thedaviddias/utils/get-base-url'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@thedaviddias/design-system/button'

export async function generateStaticParams() {
  const boxers = await getBoxers()
  return boxers.map((boxer) => ({
    slug: boxer.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params
  const boxer = await getBoxerBySlug(slug)
  const baseUrl = getBaseUrl()

  if (!boxer) {
    return {
      title: 'Boxer Not Found',
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
  const boxer = await getBoxerBySlug(slug)
  
  if (!boxer) {
    notFound()
  }

  const baseUrl = getBaseUrl()
  const stats = getBoxerStats(boxer)
  const breadcrumbItems = [
    { name: 'Boxers', href: '/boxers' },
    { name: boxer.name, href: `/boxers/${slug}` }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
      
      <Link href="/boxers">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Boxers
        </Button>
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {boxer.name}
            {boxer.nicknames && (
              <span className="ml-3 text-2xl text-muted-foreground">"{boxer.nicknames}"</span>
            )}
          </h1>
          {boxer.residence && (
            <p className="text-muted-foreground">{boxer.residence}</p>
          )}
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
              <div className="text-sm text-muted-foreground mt-1">
                of victories
              </div>
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
              {boxer.birthPlace && (
                <>
                  <dt className="text-sm text-muted-foreground">Birth Place</dt>
                  <dd className="font-medium">{boxer.birthPlace}</dd>
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
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: boxer.bio }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}