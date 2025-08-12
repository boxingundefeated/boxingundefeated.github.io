import { baseConfig, withAnalyzer, withVercelToolbarConfig } from '@boxingundefeated/config-next'
import withMDX from '@next/mdx'
import type { NextConfig } from 'next'
import { env } from '@/env'

export const INTERNAL_PACKAGES = [
  '@boxingundefeated/design-system',
  // '@boxingundefeated/auth', // Removed - contains server actions incompatible with static export
  // '@boxingundefeated/caching', // Removed - Redis/Upstash not needed for static site
  '@boxingundefeated/config-next',
  '@boxingundefeated/config-typescript',
  // '@boxingundefeated/supabase', // Removed - not needed for static boxing site
  '@boxingundefeated/utils',
  '@boxingundefeated/content'
]

let nextConfig: NextConfig = {
  ...baseConfig,

  // Always use static export to avoid serverless function size limits
  output: 'export',

  // No basePath needed for organization GitHub Pages (*.github.io)
  // basePath: process.env.NODE_ENV === 'production' ? '/boxing' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/boxing' : '',

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

  // Add headers for better caching
  async headers() {
    return [
      {
        source: '/images/boxers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/data/boxers/:path*.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
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
nextConfig = withVercelToolbarConfig(nextConfig)
nextConfig = withMDX()(nextConfig)

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig)
}

export default nextConfig
