# Making a Flexible Directory System

This guide documents how we converted the llms.txt hub website into a flexible directory system that can display different types of entities (boxers, products, restaurants, etc.) from JSON data instead of a database.

## Steps Taken to Convert to Boxers Directory

### 1. Data Preparation
- Created a JSON file with boxer data (`data/boxers-sample.json`)
- Ensured the data structure includes necessary fields (id, name, slug, etc.)

### 2. Created Entity-Specific Data Loader
- **File:** `apps/web/lib/boxers-loader.ts`
- Defined TypeScript interface for the entity (`BoxerMetadata`)
- Created functions to:
  - Load all entities (`getBoxers()`)
  - Get single entity by slug (`getBoxerBySlug()`)
  - Get categories/filters (`getBoxerCategories()`)
  - Calculate entity-specific stats (`getBoxerStats()`)

### 3. Created List Page Component
- **File:** `apps/web/components/boxers-list.tsx`
- Client-side component with:
  - Grid and list view modes
  - Category/division filtering
  - Sorting options (by wins, experience, name)
  - Entity-specific card display
  - Statistics display

### 4. Created Main Directory Page
- **File:** `apps/web/app/boxers/page.tsx`
- Server component that:
  - Loads data using the loader
  - Passes to client component
  - Sets up metadata and breadcrumbs

### 5. Created Individual Entity Page
- **File:** `apps/web/app/boxers/[slug]/page.tsx`
- Dynamic route for individual entities
- Displays detailed information
- Shows entity-specific statistics
- Includes navigation between entities

## How to Adapt for Other Entity Types

### Step 1: Prepare Your Data
Create a JSON file with your entity data. Structure should include:
```json
[
  {
    "id": "unique-id",
    "slug": "url-friendly-slug",
    "name": "Display Name",
    // ... other entity-specific fields
  }
]
```

### Step 2: Create Entity Loader
Copy `boxers-loader.ts` and modify:
1. Update the import path to your JSON file
2. Define your entity interface
3. Adjust sorting logic for your entity type
4. Create entity-specific categories/filters
5. Add entity-specific calculations

### Step 3: Create List Component
Copy `boxers-list.tsx` and modify:
1. Update import from your entity loader
2. Adjust filter categories
3. Modify card/list item display for your fields
4. Update sorting options
5. Customize statistics display

### Step 4: Create Pages
Copy the boxers page structure and update:
1. Import from your entity loader and components
2. Update metadata and titles
3. Adjust breadcrumb labels
4. Modify detail page layout for your entity fields

### Step 5: Add Navigation
Add a link to your new directory in the main navigation or homepage.

## Key Patterns for Flexibility

### 1. Data Loading Pattern
```typescript
import entityData from '../path/to/data.json'

export function getEntities() {
  return entityData.map(transformIfNeeded)
    .sort(customSortLogic)
}
```

### 2. Filtering Pattern
```typescript
const categories = getEntityCategories()
const filtered = entities.filter(e => 
  categoryFilter === 'all' || e.category === categoryFilter
)
```

### 3. Display Pattern
- Use card components for grid view
- Use list items for list view
- Make statistics/metrics entity-specific

### 4. Routing Pattern
- `/[entity-type]` - List page
- `/[entity-type]/[slug]` - Detail page

## Benefits of This Approach

1. **No Database Required** - Works with static JSON files
2. **Fast Performance** - Data is bundled at build time
3. **Easy to Update** - Just modify JSON and rebuild
4. **Type Safe** - TypeScript interfaces ensure consistency
5. **SEO Friendly** - Static generation for all pages
6. **Flexible** - Easy to add new entity types

## Example Entity Types

This pattern works well for:
- Product catalogs
- Team member directories
- Restaurant/venue listings
- Portfolio projects
- Course catalogs
- Event listings
- Recipe collections
- Book libraries
- Movie databases
- Any structured data collection

## Next Steps

To add a new entity type:
1. Prepare your JSON data
2. Copy and modify the boxer implementation
3. Update imports and entity-specific logic
4. Test locally with `pnpm build && pnpm start`
5. Deploy when ready