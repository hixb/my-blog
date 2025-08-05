'use client'

import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from '@heroui/link'
import { Button, Listbox, ListboxItem, Tooltip } from '@heroui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useCallback, useState } from 'react'
import { ArrowDown } from '~/components/icons/ArrowDown'
import { Folder } from '~/components/icons/Folder'
import { FolderOpen } from '~/components/icons/FolderOpen'
import { Github } from '~/components/icons/Github'
import { Home } from '~/components/icons/Home'
import { Plus } from '~/components/icons/Plus'
import { X } from '~/components/icons/X'
import {useIsMobile} from '~/hooks/useMobile'
import { useCommonStore } from '~/stores/useCommon'

interface NavTypes {
  [key: string]: {
    label: string
    startIcon: ReactNode
    startOpenIcon?: ReactNode
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
      startOpenIcon: <FolderOpen className="min-w-max" />,
      children: [
        { label: 'Web', link: '/category/web' },
      ],
    },
  },
]

const textVariants: Variants = {
  expanded: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
}

export const Aside = memo(() => {
  const { isCollapseSidebar, setIsCollapseSidebar } = useCommonStore()
  const {isMobile} = useIsMobile()
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
      className={clsx('border-r flex flex-col border-divider h-[calc(100vh-var(--layout-header-height))] overflow-hidden', isMobile ? 'hidden' : null)}
      initial={false}
      variants={{
        expanded: { width: 'var(--layout-aside-width)', transition: { duration: 0.3, ease: 'easeInOut' } },
        collapsed: { width: '80px', transition: { duration: 0.3, ease: 'easeInOut' } },
      }}
    >
      <nav
        aria-label="Main site navigation"
        className="overflow-y-auto overflow-x-hidden h-full flex-1 p-5"
        role="navigation"
      >
        {navs.map(nav => (
          Object.values(nav).map((child) => {
            const isExpanded = expandedItems.has(child.label)
            const hasActiveChild = isChildActive(child.children)
            const itemIsActive = isActive(child.link)

            return (
              <article className="mb-2" key={child.label}>
                <Tooltip
                  content={
                    !isCollapseSidebar && child.children
                      ? (
                          <Listbox
                            aria-label="Actions"
                            topContent={<p className="text-foreground text-xs">{child.label}</p>}
                          >
                            {child.children.map((subChild) => {
                              const subItemIsActive = isActive(subChild.link)

                              return (
                                <ListboxItem
                                  as={NextLink}
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
                  placement={child.children && !isCollapseSidebar ? 'right-start' : 'right'}
                >
                  <Button
                    as={child.link ? NextLink : 'button'}
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
                    startContent={(
                      <div className="flex-shrink-0">
                        {isExpanded && child.startOpenIcon ? child.startOpenIcon : child.startIcon}
                      </div>
                    )}
                    variant={itemIsActive || hasActiveChild ? 'flat' : 'light'}
                  >
                    {
                      isCollapseSidebar
                        ? (
                            <motion.span
                              animate={isCollapseSidebar ? 'expanded' : 'collapsed'}
                              className="ml-2 whitespace-nowrap"
                              variants={textVariants}
                            >
                              {child.label}
                            </motion.span>
                          )
                        : null
                    }
                  </Button>
                </Tooltip>

                <AnimatePresence>
                  {child?.children && isExpanded && isCollapseSidebar && (
                    <motion.section
                      animate="visible"
                      aria-label={`${child.label} submenu`}
                      className="pl-4 overflow-hidden"
                      exit="hidden"
                      initial="hidden"
                      role="menu"
                      variants={{
                        hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
                        visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
                      }}
                    >
                      {child.children.map((subChild) => {
                        const subItemIsActive = isActive(subChild.link)

                        return (
                          <div
                            className="relative before:content-[''] before:absolute before:w-4 before:h-12 before:bottom-1/2 before:rounded-bl-lg before:border-l before:border-b before:border-divider"
                            key={subChild.label}
                            role="menuitem"
                          >
                            <Button
                              as={NextLink}
                              className="justify-start ml-4 w-[calc(100%_-_16px)] text-xs overflow-hidden"
                              fullWidth
                              href={subChild.link}
                              radius="sm"
                              variant={subItemIsActive ? 'flat' : 'light'}
                            >
                              {
                                isCollapseSidebar
                                  ? (
                                      <motion.span
                                        animate={isCollapseSidebar ? 'expanded' : 'collapsed'}
                                        className="whitespace-nowrap"
                                        variants={textVariants}
                                      >
                                        {subChild.label}
                                      </motion.span>
                                    )
                                  : null
                              }
                            </Button>
                          </div>
                        )
                      })}
                    </motion.section>
                  )}
                </AnimatePresence>
              </article>
            )
          })
        ))}
      </nav>

      <footer
        className="border-t bg-background space-y-1 border-divider py-2 w-full flex flex-col items-center"
        role="contentinfo"
      >
        {
          !isCollapseSidebar
            ? (
                <Button
                  isIconOnly
                  onPress={() => setIsCollapseSidebar(!isCollapseSidebar)}
                  radius="full"
                  size="sm"
                  variant="light"
                >
                  <Plus size={20} />
                </Button>
              )
            : (
                <>
                  <Link
                    as={NextLink}
                    className="text-center"
                    color="foreground"
                    href="/"
                    isExternal
                    showAnchorIcon
                    size="sm"
                    underline="hover"
                  >
                    Sitemap
                  </Link>
                  <div className="flex items-center">
                    <Button isIconOnly radius="full" size="sm" variant="light">
                      <X size={20} />
                    </Button>
                    <Button isIconOnly radius="full" size="sm" variant="light">
                      <Github size={20} />
                    </Button>
                  </div>
                </>
              )
        }
      </footer>
    </motion.aside>
  )
})

Aside.displayName = 'Aside'
