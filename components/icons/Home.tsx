'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function HomeComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M15.0003 3.89485L20.0522 8.02962C21.1727 8.94684 21.7019 10.4049 21.4295 11.8269L20.2867 17.7912C19.9307 19.6509 18.3034 20.9961 16.4096 20.9961H8.58947C6.6957 20.9961 5.06942 19.6509 4.71245 17.7912L3.57055 11.8269C3.29821 10.4049 3.82636 8.94684 4.94686 8.02962L9.99982 3.89485C11.4539 2.70432 13.5461 2.70432 15.0003 3.89485Z"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M9.89648 20.9966V17.6517C9.89648 16.2131 11.0627 15.0469 12.5013 15.0469C13.9398 15.0469 15.106 16.2131 15.106 17.6517V20.9966"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const Home = memo(HomeComponent)
Home.displayName = 'Home'
