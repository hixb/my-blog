'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function XComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M9.59954 4.802C9.41841 4.53493 9.11668 4.375 8.79398 4.375H5.14783C4.83544 4.375 4.65025 4.72438 4.8256 4.9829L14.4897 19.2312C14.6708 19.4983 14.9725 19.6582 15.2952 19.6582H18.9414C19.2538 19.6582 19.439 19.3088 19.2636 19.0503L9.59954 4.802Z"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M10.4499 13.4333L4.66895 20"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M18.7571 4L13.3203 10.1756"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const X = memo(XComponent)
X.displayName = 'X'
