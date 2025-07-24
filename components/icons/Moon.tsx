'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function MoonComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        clipRule="evenodd"
        d="M21.0262 14.276C21.072 14.2516 21.1264 14.2935 21.1118 14.3441C20.0134 18.1872 16.4728 21 12.2911 21C7.21912 21 3.11426 16.8854 3.11426 11.8232C3.11426 7.6317 5.91732 4.0999 9.76144 3.00241C9.81106 2.98782 9.85289 3.0423 9.82857 3.08803C8.16969 6.20925 8.66492 10.1867 11.2958 12.8185C13.9276 15.4493 17.905 15.9446 21.0262 14.276Z"
        fillRule="evenodd"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const Moon = memo(MoonComponent)
Moon.displayName = 'Moon'
