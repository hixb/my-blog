'use client'

import type { ReactNode } from 'react'
import { ScrollShadow } from '@heroui/react'
import { memo } from 'react'
import { Providers } from '~/app/providers'
import { Aside } from '~/components/layouts/Aside'
import { Header } from '~/components/layouts/Header'

export const PublicLayout = memo(({ children }: { children: ReactNode }) => {
  return (
    <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
      <Header />
      <main className="flex h-full">
        <Aside />
        <div className="flex-1 overflow-hidden">
          <ScrollShadow className="overflow-auto h-[calc(100vh-var(--layout-header-height))]">
            <div className="max-w-7xl mx-auto px-6">
              {children}
            </div>
          </ScrollShadow>
        </div>
      </main>
    </Providers>
  )
})
PublicLayout.displayName = 'PublicLayout'
