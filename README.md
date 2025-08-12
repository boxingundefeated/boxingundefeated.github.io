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
│   └── web/                 # Main Next.js application
│       ├── app/             # App router pages
│       ├── content/         # MDX content (blog, legal)
│       ├── data/            # Source data (boxers.json - 72MB)
│       └── public/
│           └── data/boxers/ # Split boxer JSON files (4,500+ files)
│
├── packages/               # Shared packages
│   ├── design-system/     # UI components
│   ├── utils/             # Utility functions
│   ├── flags/             # Feature flags
│   └── hooks/             # React hooks
│
├── configs/               # Shared configurations
│   ├── next/
│   └── typescript/
│
└── scripts/               # Build and data processing scripts
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