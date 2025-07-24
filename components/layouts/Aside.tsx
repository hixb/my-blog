'use client'

import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { Button, Listbox, ListboxItem, ScrollShadow, Tooltip } from '@heroui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useCallback, useState } from 'react'
import { ArrowDown } from '~/components/icons/ArrowDown'
import { Folder } from '~/components/icons/Folder'
import { Home } from '~/components/icons/Home'
import { useCommonStore } from '~/stores/useCommon'

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
    home: { label: 'Home', link: '/', startIcon: <Home className="min-w-max" /> },
    category: {
      label: 'Category',
      startIcon: <Folder className="min-w-max" />,
      children: [
        { label: 'Web', link: '/category/web' },
      ],
    },
  },
]

const textVariants: Variants = {
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, delay: 0.1, ease: [0.4, 0.0, 0.2, 1] } },
  hidden: { opacity: 0, x: -10, transition: { duration: 0.2, ease: [0.4, 0.0, 1, 1] } },
}

export const Aside = memo(() => {
  const { isCollapseSidebar } = useCommonStore()
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
    <motion.aside
      animate={isCollapseSidebar ? 'expanded' : 'collapsed'}
      className="border-r border-default-200 p-5 h-[calc(100vh-var(--layout-header-height))] overflow-hidden"
      initial={false}
      variants={{
        expanded: { width: 'var(--layout-aside-width)', transition: { duration: 0.3, ease: 'easeInOut' } },
        collapsed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
      }}
    >
      <ScrollShadow className="overflow-y-auto h-full">
        {navs.map(nav => (
          Object.values(nav).map((child) => {
            const isExpanded = expandedItems.has(child.label)
            const hasActiveChild = isChildActive(child.children)
            const itemIsActive = isActive(child.link)

            return (
              <nav className="mb-2" key={child.label}>
                <Tooltip
                  content={
                    !isCollapseSidebar && child.children
                      ? (
                          <Listbox aria-label="Actions">
                            {child.children.map((subChild) => {
                              const subItemIsActive = isActive(subChild.link)

                              return (
                                <ListboxItem
                                  as={Link}
                                  className={clsx('min-w-[200px]', subItemIsActive ? 'text-primary-foreground bg-primary' : null)}
                                  color="primary"
                                  href={subChild.link}
                                  key={subChild.label}
                                >
                                  {subChild.label}
                                </ListboxItem>
                              )
                            })}
                          </Listbox>
                        )
                      : child.label
                  }
                  placement={child.children ? 'right-start' : 'right'}
                >
                  <Button
                    as={child.link ? Link : 'button'}
                    className={clsx(
                      'text-xs overflow-hidden transition-all duration-200',
                      isCollapseSidebar ? 'justify-start' : 'justify-center min-w-max px-2',
                    )}
                    color="default"
                    endContent={
                      child.children && isCollapseSidebar
                        ? (
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              className="ml-auto"
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowDown className="flex-shrink-0" size={14} />
                            </motion.div>
                          )
                        : null
                    }
                    fullWidth={isCollapseSidebar}
                    href={child.link}
                    onPress={child.children ? () => toggleExpanded(child.label) : undefined}
                    radius="sm"
                    startContent={<div className="flex-shrink-0">{child.startIcon}</div>}
                    variant={itemIsActive || hasActiveChild ? 'flat' : 'light'}
                  >
                    <AnimatePresence>
                      {isCollapseSidebar && (
                        <motion.span
                          animate="visible"
                          className="whitespace-nowrap"
                          exit="hidden"
                          initial="hidden"
                          variants={textVariants}
                        >
                          {child.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </Tooltip>

                <AnimatePresence>
                  {child?.children && isExpanded && isCollapseSidebar && (
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
                              className="justify-start ml-4 w-[calc(100%_-_16px)] text-xs overflow-hidden"
                              fullWidth
                              href={subChild.link}
                              radius="sm"
                              variant={subItemIsActive ? 'flat' : 'light'}
                            >
                              <AnimatePresence>
                                {isCollapseSidebar && (
                                  <motion.span
                                    animate="visible"
                                    className="whitespace-nowrap"
                                    exit="hidden"
                                    initial="hidden"
                                    variants={textVariants}
                                  >
                                    {subChild.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>
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
    </motion.aside>
  )
})

Aside.displayName = 'Aside'
