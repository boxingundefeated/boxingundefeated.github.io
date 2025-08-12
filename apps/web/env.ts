import { keys as core } from '@boxingundefeated/config-next/keys'
import { createEnv } from '@t3-oss/env-nextjs'
// Removed Supabase, rate-limiting, and caching for static export - not needed for boxing site
// import { keys as supabase } from '@boxingundefeated/supabase/keys'
// import { keys as rateLimit } from '@boxingundefeated/rate-limiting/keys'
// import { keys as caching } from '@boxingundefeated/caching/keys'

export const env = createEnv({
  // Removed supabase(), rateLimit(), and caching() from extends for static export
  extends: [core()],
  server: {},
  client: {},
  runtimeEnv: {}
})
