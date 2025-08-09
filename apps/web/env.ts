import { createEnv } from '@t3-oss/env-nextjs'
import { keys as core } from '@thedaviddias/config-next/keys'
import { keys as logging } from '@thedaviddias/logging/keys'
import { keys as observability } from '@thedaviddias/observability/keys'
import { keys as rateLimit } from '@thedaviddias/rate-limiting/keys'
// Removed Supabase for static export - using JSON data instead
// import { keys as supabase } from '@thedaviddias/supabase/keys'
import { keys as caching } from '@thedaviddias/caching/keys'

export const env = createEnv({
  // Removed supabase() from extends for static export
  extends: [core(), observability(), logging(), rateLimit(), caching()],
  server: {},
  client: {},
  runtimeEnv: {}
})
