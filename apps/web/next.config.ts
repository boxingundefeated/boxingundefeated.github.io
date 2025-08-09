import { env } from '@/env'
import withMDX from '@next/mdx'
import {
  baseConfig,
  withAnalyzer,
  withPlausibleProxyConfig,
  withVercelToolbarConfig
} from '@thedaviddias/config-next'
import { withSentry } from '@thedaviddias/observability/next-config'
import type { NextConfig } from 'next'

export const INTERNAL_PACKAGES = [
  '@thedaviddias/design-system',
  '@thedaviddias/analytics',
  '@thedaviddias/auth',
  '@thedaviddias/caching',
  '@thedaviddias/config-next',
  '@thedaviddias/config-typescript',
  '@thedaviddias/logging',
  '@thedaviddias/supabase',
  '@thedaviddias/utils',
  '@thedaviddias/content'
]

let nextConfig: NextConfig = {
  ...baseConfig,

  // Enable static export for GitHub Pages
  output: 'export',
  
  // GitHub Pages serves from subdirectory when using project pages
  // Comment out or modify if using custom domain
  basePath: process.env.NODE_ENV === 'production' ? '/boxing-directory' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/boxing-directory' : '',

  transpilePackages: INTERNAL_PACKAGES,

  pageExtensions: ['mdx', 'ts', 'tsx'],

  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**'
      },
      {
        protocol: 'https',
        hostname: 'boxrec.com',
        pathname: '/**'
      }
    ]
  },

  redirects: async () => {
    return [
      {
        source: '/website/:path*',
        destination: '/websites/:path*',
        permanent: true
      },
      {
        // Redirect old website URLs to new ones with -llms-txt suffix
        source: '/websites/:slug((?!.*-llms-txt).*)',
        destination: '/websites/:slug-llms-txt',
        permanent: true
      }
    ]
  }
}

// Apply other plugins first
nextConfig = withPlausibleProxyConfig(nextConfig)
nextConfig = withVercelToolbarConfig(nextConfig)
nextConfig = withSentry(nextConfig)
nextConfig = withMDX()(nextConfig)

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
