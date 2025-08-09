import { getRoute } from '@/lib/routes'
import Link from 'next/link'
import { ModeToggle } from '../mode-toggle'

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <h2 className="sr-only">Footer</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="space-y-3 md:col-span-2">
            <h3 className="font-semibold text-lg">🥊 Boxing Directory</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive database of professional boxers from around the world. 
              Browse statistics, records, and fight history for thousands of fighters.
            </p>
            <div className="flex space-x-4 my-6">
              <ModeToggle />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/boxers" className="text-muted-foreground hover:text-foreground">
                  All Boxers
                </Link>
              </li>
              <li>
                <Link href="/boxers?division=heavy" className="text-muted-foreground hover:text-foreground">
                  Heavyweight
                </Link>
              </li>
              <li>
                <Link href="/boxers?division=middle" className="text-muted-foreground hover:text-foreground">
                  Middleweight
                </Link>
              </li>
              <li>
                <Link href="/boxers?division=light" className="text-muted-foreground hover:text-foreground">
                  Lightweight
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={getRoute('about')} className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href={getRoute('search')} className="text-muted-foreground hover:text-foreground">
                  Search
                </Link>
              </li>
              <li>
                <Link href={getRoute('faq')} className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={getRoute('privacy')} className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={getRoute('terms')} className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Boxing Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}