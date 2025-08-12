import { createEnv } from '@t3-oss/env-nextjs'
import { keys as core } from '@thedaviddias/config-next/keys'
// Removed Supabase, rate-limiting, and caching for static export - not needed for boxing site
// import { keys as supabase } from '@thedaviddias/supabase/keys'
// import { keys as rateLimit } from '@thedaviddias/rate-limiting/keys'
// import { keys as caching } from '@thedaviddias/caching/keys'

export const env = createEnv({
  // Removed supabase(), rateLimit(), and caching() from extends for static export
  extends: [core()],
  server: {},
  client: {},
  runtimeEnv: {}
})
