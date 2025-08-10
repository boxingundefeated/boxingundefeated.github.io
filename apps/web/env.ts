import { createEnv } from '@t3-oss/env-nextjs'
import { keys as core } from '@thedaviddias/config-next/keys'
import { keys as logging } from '@thedaviddias/logging/keys'
import { keys as observability } from '@thedaviddias/observability/keys'
// Removed Supabase, rate-limiting, and caching for static export - not needed for boxing site
// import { keys as supabase } from '@thedaviddias/supabase/keys'
// import { keys as rateLimit } from '@thedaviddias/rate-limiting/keys'
// import { keys as caching } from '@thedaviddias/caching/keys'

export const env = createEnv({
  // Removed supabase(), rateLimit(), and caching() from extends for static export
  extends: [core(), observability(), logging()],
  server: {},
  client: {},
  runtimeEnv: {}
})
