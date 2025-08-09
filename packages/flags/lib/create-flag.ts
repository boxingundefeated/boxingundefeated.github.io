// import { currentUser } from '@thedaviddias/auth' // Removed for static export
import { flag } from '@vercel/flags/next'

export const createFlag = (key: string) =>
  flag({
    key,
    defaultValue: false,
    async decide() {
      // const user = await currentUser() // Removed for static export
      // Static export - no auth, always return default value
      return this.defaultValue as boolean

      // When you implement a real feature flag system, uncomment and adapt:
      // const isEnabled = await yourFeatureFlagSystem.isFeatureEnabled(key, user.id)
      // return isEnabled ?? (this.defaultValue as boolean)
    }
  })
