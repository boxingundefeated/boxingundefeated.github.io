import type { Metadata } from 'next'
import type React from 'react'
import '../../../packages/design-system/styles/globals.css'
import { fontVariable } from '@boxingundefeated/design-system/lib/fonts'
import { cn } from '@boxingundefeated/design-system/lib/utils'
import { DesignSystemProvider } from '@boxingundefeated/design-system/theme-provider'
import { getBaseUrl } from '@boxingundefeated/utils/get-base-url'
import { GoogleTagManager, GTMNoscript } from '@/components/gtm'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { ProgressBar } from '@/components/progress-bar'

export const metadata: Metadata = {
  title: 'Boxing Directory',
  description:
    'Comprehensive database of professional boxers with statistics, records, and fight history',
  metadataBase: new URL(getBaseUrl())
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // TODO: Replace with your actual GTM ID
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

  return (
    <html lang="en" suppressHydrationWarning className={fontVariable}>
      <head>
        <GoogleTagManager gtmId={GTM_ID} />
      </head>
      <body className={cn('touch-manipulation font-sans antialiased')}>
        <GTMNoscript gtmId={GTM_ID} />
        <DesignSystemProvider>
          <ProgressBar />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </DesignSystemProvider>
      </body>
    </html>
  )
}
