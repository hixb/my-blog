'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function MenuCloseRightComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M12 5H3M12 19H3M17 16L21 11.9994M21 11.9994L17 8M21 11.9994L3 12"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const MenuCloseRight = memo(MenuCloseRightComponent)
MenuCloseRight.displayName = 'MenuCloseRight'
