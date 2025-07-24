'use client'

import { Button, Image, Input, Spinner } from '@heroui/react'
import { useTheme } from 'next-themes'
import NextImage from 'next/image'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { MenuCloseLeft } from '~/components/icons/MenuCloseLeft'
import { Moon } from '~/components/icons/Moon'
import { Search } from '~/components/icons/Search'
import { Sun } from '~/components/icons/Sun'
import { User } from '~/components/icons/User'

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
      return <Spinner color="default" size="sm" variant="gradient" />
    }

    return theme === 'dark' ? <Sun /> : <Moon />
  }, [mounted, theme])

  return (
    <Button
      isIconOnly
      onPress={toggleTheme}
      radius="full"
      variant="light"
    >
      {iconElement}
    </Button>
  )
})
ThemeSwitcher.displayName = 'ThemeSwitcher'

export const Header = memo(() => {
  return (
    <header className="h-[var(--layout-header-height)] px-5 flex items-center border-b border-default-200 space-x-2">
      <div className="flex items-center space-x-0.5 w-48">
        <Button isIconOnly radius="full" variant="light">
          <MenuCloseLeft className="text-foreground-500" size={20} />
        </Button>
        <div className="flex items-center">
          <Image
            alt=""
            as={NextImage}
            className="w-10 h-10"
            height={40}
            loading="eager"
            removeWrapper
            src="https://www.fineshopdesign.com/fineshop-logo-square.svg"
            width={40}
          />
          <span className="m-2 inline-block">Hello</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end md:justify-between h-full">
        <Input
          className="max-w-2xs hidden md:block"
          placeholder="Looking for something?"
          radius="full"
          startContent={<Search className="text-default-400" />}
          variant="bordered"
        />
        <div className="flex items-center">
          <Button className="md:hidden" isIconOnly radius="full" variant="light">
            <Search />
          </Button>
          <ThemeSwitcher />
          <Button isIconOnly radius="full" variant="light">
            <User />
          </Button>
        </div>
      </div>
    </header>
  )
})
Header.displayName = 'Header'
