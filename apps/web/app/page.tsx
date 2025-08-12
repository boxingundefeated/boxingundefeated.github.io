import { Button } from '@boxingundefeated/design-system/button'
import { Card, CardContent, CardHeader, CardTitle } from '@boxingundefeated/design-system/card'
import { getBaseUrl } from '@boxingundefeated/utils/get-base-url'
import { Target, TrendingUp, Trophy, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { getBoxersWithoutBouts } from '@/lib/boxers-loader'

export const metadata: Metadata = {
  title: 'Boxing Undefeated - Professional Boxers Database',
  description:
    'Explore our comprehensive database of professional boxers. Find boxer statistics, records, and fight history.',
  openGraph: {
    title: 'Boxing Undefeated - Professional Boxers Database',
    description:
      'Explore our comprehensive database of professional boxers. Find boxer statistics, records, and fight history.',
    url: getBaseUrl(),
    siteName: 'Boxing Undefeated',
    images: [
      {
        url: `${getBaseUrl()}/opengraph-image.png`,
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
}

export default async function Home() {
  const boxers = await getBoxersWithoutBouts()
  const totalBoxers = boxers.length

  // Calculate stats
  const activeBoxers = boxers.filter(b => !b.proStatus || b.proStatus !== 'inactive').length
  const totalBouts = boxers.reduce((sum, b) => sum + (b.proTotalBouts || 0), 0)
  const eliteBoxers = boxers.filter(
    b => b.proWins && b.proWins > 30 && (!b.proLosses || b.proLosses < 5)
  ).length

  // Get featured boxers (highest win counts)
  const featuredBoxers = boxers
    .filter(b => b.proWins && b.proTotalBouts)
    .sort((a, b) => (b.proWins || 0) - (a.proWins || 0))
    .slice(0, 6)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Boxing Undefeated',
          url: getBaseUrl(),
          description:
            'Comprehensive database of professional boxers with statistics, records, and fight history.'
        }}
      />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">Boxing Undefeated</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore comprehensive records and statistics for {totalBoxers.toLocaleString()}{' '}
            professional boxers from around the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/boxers">
              <Button size="lg">Browse All Boxers</Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline">
                Search Database
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Boxers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBoxers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Fighters</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBoxers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bouts</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBouts.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Elite Fighters</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eliteBoxers.toLocaleString()}</div>
            </CardContent>
          </Card>
        </section>

        {/* Featured Boxers */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Top Fighters</h2>
            <p className="text-muted-foreground">Boxers with the most professional wins</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredBoxers.map(boxer => (
              <Card key={boxer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {boxer.avatarImage && (
                      <img
                        src={boxer.avatarImage}
                        alt={boxer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <CardTitle>
                      <Link href={`/boxers/${boxer.slug}`} className="hover:underline">
                        {boxer.name}
                      </Link>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-muted-foreground">Record</dt>
                      <dd className="font-semibold">
                        {boxer.proWins}-{boxer.proLosses}-{boxer.proDraws || 0}
                      </dd>
                    </div>
                    {boxer.proDivision && (
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Division</dt>
                        <dd className="capitalize">{boxer.proDivision}</dd>
                      </div>
                    )}
                    {boxer.nationality && (
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Country</dt>
                        <dd>{boxer.nationality}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/boxers">
              <Button variant="outline" size="lg">
                View All Boxers →
              </Button>
            </Link>
          </div>
        </section>

        {/* Browse by Division */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Browse by Weight Division</h2>
            <p className="text-muted-foreground">Find boxers in specific weight classes</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { slug: 'heavy', name: 'Heavyweight', division: 'heavy' },
              { slug: 'light-heavy', name: 'Light Heavyweight', division: 'light heavy' },
              { slug: 'middle', name: 'Middleweight', division: 'middle' },
              { slug: 'welter', name: 'Welterweight', division: 'welter' },
              { slug: 'light', name: 'Lightweight', division: 'light' },
              { slug: 'feather', name: 'Featherweight', division: 'feather' },
              { slug: 'bantam', name: 'Bantamweight', division: 'bantam' },
              { slug: 'fly', name: 'Flyweight', division: 'fly' }
            ].map(item => {
              const divisionBoxers = boxers.filter(b => b.proDivision === item.division)
              return (
                <Link key={item.slug} href={`/boxers?division=${item.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-2xl font-bold mt-1">{divisionBoxers.length}</div>
                        <div className="text-xs text-muted-foreground">boxers</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
