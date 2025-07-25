'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function FolderOpenComponent({ size = 24, width, height, ...props }: IconProps) {
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
        d="M21.6707 14.3L21.2707 19.3C21.1207 20.83 21.0007 22 18.2907 22H5.71074C3.00074 22 2.88074 20.83 2.73074 19.3L2.33074 14.3C2.25074 13.47 2.51074 12.7 2.98074 12.11C2.99074 12.1 2.99074 12.1 3.00074 12.09C3.55074 11.42 4.38074 11 5.31074 11H18.6907C19.6207 11 20.4407 11.42 20.9807 12.07C20.9907 12.08 21.0007 12.09 21.0007 12.1C21.4907 12.69 21.7607 13.46 21.6707 14.3Z"
        stroke={props.stroke || 'currentColor'}
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M3.5 11.4313V6.28125C3.5 2.88125 4.35 2.03125 7.75 2.03125H9.02C10.29 2.03125 10.58 2.41125 11.06 3.05125L12.33 4.75125C12.65 5.17125 12.84 5.43125 13.69 5.43125H16.24C19.64 5.43125 20.49 6.28125 20.49 9.68125V11.4713"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M9.42969 17H14.5697"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const FolderOpen = memo(FolderOpenComponent)
FolderOpen.displayName = 'FolderOpen'
