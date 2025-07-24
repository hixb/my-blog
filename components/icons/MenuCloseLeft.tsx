'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function MenuCloseLeftComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M12 5H21M12 19H21M7 16L3 11.9994M3 11.9994L7 8M3 11.9994L21 12"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const MenuCloseLeft = memo(MenuCloseLeftComponent)
MenuCloseLeft.displayName = 'MenuCloseLeft'
