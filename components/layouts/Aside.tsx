'use client'

import type { ReactNode } from 'react'
import { Button, ScrollShadow } from '@heroui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useCallback, useState } from 'react'
import { ArrowDown } from '~/components/icons/ArrowDown'
import { Folder } from '~/components/icons/Folder'
import { Home } from '~/components/icons/Home'

interface NavTypes {
  [key: string]: {
    label: string
    startIcon: ReactNode
    link?: string
    children?: { label: string, link: string }[]
  }
}

const navs: NavTypes[] = [
  {
    home: { label: 'Home', link: '/', startIcon: <Home /> },
    category: {
      label: 'Category',
      startIcon: <Folder />,
      children: [
        { label: 'Web', link: '/category/web' },
      ],
    },
  },
]

export const Aside = memo(() => {
  const pathname = usePathname()

  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => new Set())

  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)

      newSet.has(label) ? newSet.delete(label) : newSet.add(label)

      return newSet
    })
  }, [])

  const isActive = useCallback((link?: string) => {
    return !link ? false : pathname === link
  }, [pathname])

  const isChildActive = useCallback((children?: { label: string, link: string }[]) => {
    return !children ? false : children.some(child => pathname === child.link)
  }, [pathname])

  return (
    <aside
      className="w-[var(--layout-aside-width)] border-r border-default-200 p-5 h-[calc(100vh-var(--layout-header-height))] overflow-hidden"
    >
      <ScrollShadow className="overflow-y-auto h-full">
        {navs.map(nav => (
          Object.values(nav).map((child) => {
            const isExpanded = expandedItems.has(child.label)
            const hasActiveChild = isChildActive(child.children)
            const itemIsActive = isActive(child.link)

            return (
              <nav className="mb-2" key={child.label}>
                <Button
                  as={child.link ? Link : 'button'}
                  className="justify-start text-xs"
                  color="default"
                  endContent={
                    child.children
                      ? (
                          <ArrowDown
                            className={clsx('transition-all ml-auto', isExpanded ? 'rotate-180' : null)}
                            size={14}
                          />
                        )
                      : null
                  }
                  fullWidth
                  href={child.link}
                  onPress={child.children ? () => toggleExpanded(child.label) : undefined}
                  radius="sm"
                  startContent={child.startIcon}
                  variant={itemIsActive || hasActiveChild ? 'flat' : 'light'}
                >
                  {child.label}
                </Button>

                <AnimatePresence>
                  {child?.children && isExpanded && (
                    <motion.ul
                      animate="visible"
                      className="pl-4 overflow-hidden"
                      exit="hidden"
                      initial="hidden"
                      variants={{
                        hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
                        visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
                      }}
                    >
                      {child.children.map((subChild) => {
                        const subItemIsActive = isActive(subChild.link)

                        return (
                          <li
                            className="relative before:content-[''] before:absolute before:w-4 before:h-12 before:bottom-1/2 before:rounded-bl-lg before:border-l before:border-b before:border-default"
                            key={subChild.label}
                          >
                            <Button
                              as={Link}
                              className="justify-start ml-4 w-[calc(100%_-_16px)] text-xs"
                              fullWidth
                              href={subChild.link}
                              radius="sm"
                              variant={subItemIsActive ? 'flat' : 'light'}
                            >
                              {subChild.label}
                            </Button>
                          </li>
                        )
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </nav>
            )
          })
        ))}
      </ScrollShadow>
    </aside>
  )
})

Aside.displayName = 'Aside'
