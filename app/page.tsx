'use client'

import { Button } from '@heroui/react'
import { PublicLayout } from '~/components/layouts/PublicLayout'

export default function Home() {
  return (
    <PublicLayout>
      <div>
        <Button color="primary">hello</Button>
      </div>
    </PublicLayout>
  )
}
