'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getRoute } from '@/lib/routes'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  exact?: boolean
}

function NavLink({ href, children, exact = false }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`text-sm transition-colors ${
        isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </Link>
  )
}

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={getRoute('home')} className="font-bold text-xl">
            🥊 Boxing Directory
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <NavLink href={getRoute('website.list')}>Boxers</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href={getRoute('about')}>About</NavLink>
            <NavLink href={getRoute('search')}>Search</NavLink>
            <Link
              href={getRoute('submit')}
              className="ml-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit Boxer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
