'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function FolderComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M16.3655 20.9874C19.7213 20.9874 21.6984 19.0094 21.6984 15.6546L21.7246 10.9989C21.7246 7.57609 20.483 5.86421 17.1194 5.86421H14.4661C13.7928 5.86227 13.1594 5.54554 12.7542 5.00827L11.8983 3.86961C11.4941 3.33137 10.8607 3.01367 10.1874 3.01367H8.31229C4.95654 3.01367 3.72461 4.99079 3.72461 8.34168V15.6546C3.72461 19.0094 5.70561 20.9874 9.06913 20.9874H16.3655Z"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M16.4416 15.7207H12.498"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const Folder = memo(FolderComponent)
Folder.displayName = 'Folder'
