// import { AuthProviderComponent } from '@thedaviddias/auth' // Removed for static export
import { IS_DEVELOPMENT } from '@thedaviddias/utils/environment'
import { VercelToolbar } from '@vercel/toolbar/next'
import type { ThemeProviderProps } from 'next-themes'
import { Toaster } from './components/shadcn/sonner'
import { TooltipProvider } from './components/shadcn/tooltip'
import { ThemeProvider } from './providers/theme'

interface DesignSystemProviderProperties extends ThemeProviderProps {}

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => {
  const content = (
    <>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      {IS_DEVELOPMENT && <VercelToolbar />}
    </>
  )

  return <ThemeProvider {...properties}>{content}</ThemeProvider>
}
