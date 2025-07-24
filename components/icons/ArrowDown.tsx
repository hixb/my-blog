'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function ArrowDownComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M19 8.5C19 8.5 14.856 15.5 12 15.5C9.145 15.5 5 8.5 5 8.5"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const ArrowDown = memo(ArrowDownComponent)
ArrowDown.displayName = 'ArrowDown'
