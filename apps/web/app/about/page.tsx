import { Card, CardContent, CardHeader, CardTitle } from '@boxingundefeated/design-system/card'
import { Target, TrendingUp, Trophy, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Boxing Directory',
  description: 'Learn about the comprehensive boxing directory and database.'
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Boxing Directory</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Boxing Directory is a comprehensive database dedicated to preserving and presenting
              the rich history of professional boxing. We maintain detailed records for thousands of
              professional boxers from around the world, making this information easily accessible
              to fans, researchers, and boxing enthusiasts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Complete professional boxing records</li>
              <li>• Detailed fighter statistics and analytics</li>
              <li>• Historical fight data and results</li>
              <li>• Fighter biographies and career highlights</li>
              <li>• Division and weight class information</li>
              <li>• Nationality and regional data</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Our Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our database currently contains records for over 4,400 professional boxers, spanning
              multiple decades of boxing history. Each fighter's profile includes:
            </p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Win/Loss/Draw records</li>
              <li>• Knockout statistics</li>
              <li>• Total number of professional bouts</li>
              <li>• Weight division history</li>
              <li>• Biographical information</li>
              <li>• Career status (active/inactive)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Data Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We strive to maintain accurate and up-to-date information for all fighters in our
              database. Our data is compiled from various reliable sources and is regularly reviewed
              for accuracy. If you notice any discrepancies or have additional information about a
              fighter, please contact us.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Have questions or suggestions? We'd love to hear from you! This directory is
              maintained as a resource for the boxing community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
