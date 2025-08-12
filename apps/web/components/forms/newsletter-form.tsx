'use client'

import { Button } from '@boxingundefeated/design-system/button'
import Link from 'next/link'
import type React from 'react'

/**
 * Newsletter subscription form component
 *
 * @returns React component that renders a newsletter subscription form
 */
export function NewsletterForm() {
  return (
    <Button asChild>
      <Link href="https://thedaviddias.substack.com/">Subscribe</Link>
    </Button>
  )
}
