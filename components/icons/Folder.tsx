'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function FolderComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M14.4297 14.5508H9.42969"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
        stroke={props.stroke || 'currentColor'}
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const Folder = memo(FolderComponent)
Folder.displayName = 'Folder'
