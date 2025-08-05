'use client'

import type { Variants } from 'framer-motion'
import { Button, Image, Input, Spinner } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import NextImage from 'next/image'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { MenuCloseLeft } from '~/components/icons/MenuCloseLeft'
import { MenuCloseRight } from '~/components/icons/MenuCloseRight'
import { Moon } from '~/components/icons/Moon'
import { Search } from '~/components/icons/Search'
import { Sun } from '~/components/icons/Sun'
import { User } from '~/components/icons/User'
import { useCommonStore } from '~/stores/useCommon'

const iconVariants: Variants = {
  enter: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, x: -5, transition: { duration: 0.15, ease: 'easeIn' } },
}

const ThemeSwitcher = memo(() => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleMount = useCallback(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    handleMount()
  }, [handleMount])

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme])

  const iconElement = useMemo(() => {
    if (!mounted) {
      return <Spinner aria-label="Loading theme switcher" color="default" size="sm" variant="gradient" />
    }

    return theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />
  }, [mounted, theme])

  return (
    <Button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      isIconOnly
      onPress={toggleTheme}
      radius="full"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      variant="light"
    >
      {iconElement}
    </Button>
  )
})
ThemeSwitcher.displayName = 'ThemeSwitcher'

const AsideSwitcher = memo(({ isCollapseSidebar }: { isCollapseSidebar: boolean }) => {
  return (
    <AnimatePresence mode="wait">
      {
        isCollapseSidebar
          ? (
              <motion.div animate="enter" exit="exit" initial="exit" key="collapse-left" variants={iconVariants}>
                <MenuCloseLeft className="text-foreground-500" size={20} />
              </motion.div>
            )
          : (
              <motion.div animate="enter" exit="exit" initial="exit" key="collapse-right" variants={iconVariants}>
                <MenuCloseRight className="text-foreground-500" size={20} />
              </motion.div>
            )
      }
    </AnimatePresence>
  )
})
AsideSwitcher.displayName = 'AsideSwitcher'

export const Header = memo(() => {
  const { isCollapseSidebar, setIsCollapseSidebar } = useCommonStore()

  return (
    <header
      className="h-[var(--layout-header-height)] px-5 flex items-center border-b border-divider space-x-2"
      role="banner"
    >
      <div className="flex items-center space-x-0.5 w-48">
        <Button
          aria-label="Toggle sidebar navigation"
          isIconOnly
          onPress={() => setIsCollapseSidebar(!isCollapseSidebar)}
          radius="full"
          title="Toggle sidebar"
          variant="light"
        >
          <AsideSwitcher isCollapseSidebar={isCollapseSidebar} />
        </Button>
        <div className="flex items-center">
          <Image
            alt="Website logo"
            as={NextImage}
            className="w-10 h-10"
            height={40}
            loading="eager"
            removeWrapper
            src="https://www.fineshopdesign.com/fineshop-logo-square.svg"
            width={40}
          />
          <span aria-hidden="true" className="m-2 inline-block truncate">Xiaobing Zhu</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end md:justify-between h-full">
        <search className="search-container">
          <Input
            aria-label="Search site content"
            className="max-w-2xs hidden md:block"
            placeholder="Search articles and posts..."
            radius="full"
            role="searchbox"
            startContent={<Search aria-hidden="true" className="text-default-400" />}
            variant="bordered"
          />
        </search>

        <div aria-label="User menu" className="flex items-center" role="navigation">
          <Button
            aria-label="Open search"
            className="md:hidden"
            isIconOnly
            radius="full"
            title="Search"
            variant="light"
          >
            <Search aria-hidden="true" />
          </Button>
          <ThemeSwitcher />
          <Button
            aria-label="User account menu"
            isIconOnly
            radius="full"
            title="Account"
            variant="light"
          >
            <User aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  )
})
Header.displayName = 'Header'
