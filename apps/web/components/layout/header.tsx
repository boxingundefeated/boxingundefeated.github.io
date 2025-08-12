import Link from 'next/link'
import { getRoute } from '@/lib/routes'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={getRoute('home')} className="font-bold text-xl">
            🥊 Boxing Directory
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href={getRoute('website.list')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Boxers
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href={getRoute('about')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href={getRoute('search')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Search
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={getRoute('submit')}
            className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Submit Boxer
          </Link>
        </div>
      </div>
    </header>
  )
}
