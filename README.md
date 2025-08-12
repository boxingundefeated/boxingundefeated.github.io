# Boxing Undefeated

A comprehensive boxing database and directory featuring 4,500+ professional boxers with detailed statistics and fight histories.

## Tech Stack

- **Framework**: Next.js 15 (Static Export)
- **Styling**: Tailwind CSS 4
- **Monorepo**: Turbo
- **Deployment**: Vercel / GitHub Pages

## Project Structure

```
├── apps/
│   └── web/                      # Main Next.js application
│       ├── app/                  # App router pages
│       ├── components/           # React components
│       ├── content/              # MDX content (blog, legal)
│       ├── data/                 # Source data
│       │   └── boxers.json       # Main boxer database (72MB)
│       ├── lib/                  # Application utilities
│       │   ├── blog-loader.ts   # Blog content loading
│       │   ├── boxers-loader.ts # Boxer data loading
│       │   ├── routes.ts        # Route definitions
│       │   └── utils.ts         # Shared utilities
│       ├── public/
│       │   ├── data/boxers/     # Individual boxer JSON files (4,500+)
│       │   └── images/boxers/   # Boxer profile images
│       └── scripts/              # Web-specific build scripts
│           ├── generate-boxer-search.ts
│           └── generate-search.ts
│
├── packages/                     # Shared packages
│   ├── design-system/           # UI components library
│   │   └── lib/                 # Component utilities
│   ├── utils/                   # Shared utility functions
│   ├── flags/                   # Feature flags system
│   │   └── lib/                 # Flag utilities
│   └── hooks/                   # Shared React hooks
│
├── configs/                      # Shared configurations
│   ├── next/                    # Next.js config
│   └── typescript/              # TypeScript config
│
└── scripts/                      # Root-level build & data scripts
    ├── split-boxer-data.js      # Splits main JSON into individual files
    ├── download-and-update-boxer-images.js  # Image processing
    ├── check-frontmatter.ts     # MDX validation
    ├── generate-websites.ts     # Static generation
    └── search-index-generator.cjs  # Search index builder
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Build Process

The build automatically:
1. Generates static HTML for all boxer pages
2. Creates search indexes
3. Exports to `apps/web/out/` for deployment

## Data Structure

- **Source**: Single `boxers.json` (72MB) with all boxer data
- **Build Output**: Individual JSON files per boxer for optimal loading
- **Search**: Pre-built search indexes for fast client-side search
- **Images**: Boxer profile images served from `/images/boxers/`

## Folder Organization

### Data Folders
- `apps/web/data/` - Source data files (main boxers.json)
- `apps/web/public/data/` - Individual boxer JSON files for web serving
- `apps/web/out/data/` - Build output (gitignored)

### Script Folders
- `/scripts/` - Root-level build and data processing scripts
- `apps/web/scripts/` - Web application-specific generation scripts
- `apps/web/lib/` - Application runtime utilities and loaders

### Package Libraries
- `packages/*/lib/` - Package-specific utility functions

## Recent Cleanup (Issue #15)

Removed redundancies from template conversion:
- Consolidated all images to `apps/web/public/images/`
- Removed empty `.codersinflow` template folder
- Removed duplicate root `/images` folder
- Cleaned up unused scripts
- Added `.swc` cache to gitignore