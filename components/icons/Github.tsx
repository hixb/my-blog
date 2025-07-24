'use client'

import { memo } from 'react'
import { IntegrationProp } from '~/components/icons/IntegrationProp'

function GithubComponent({ size = 24, width, height, ...props }: IconProps) {
  return (
    <svg {...IntegrationProp({ size, width, height, ...props })}>
      <path
        d="M15.0549 16.9557C17.9534 16.6327 20.9998 15.5342 20.9998 10.4942C20.9998 9.20504 20.5036 7.96548 19.6153 7.03239C20.0356 5.90472 20.0064 4.65834 19.5316 3.55207C19.5316 3.55207 18.4428 3.22904 15.9228 4.91812C13.8076 4.34504 11.5766 4.34504 9.46132 4.91812C6.94132 3.22904 5.85159 3.55207 5.85159 3.55207C5.37775 4.65834 5.34856 5.90472 5.76889 7.03239C4.87375 7.97326 4.37754 9.22353 4.38435 10.5215C4.38435 15.5245 7.43072 16.623 10.3292 16.983"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M10.3294 16.9843C9.71546 17.6196 9.39924 18.4846 9.46151 19.3661V20.1688C4.84573 21.5533 4.84573 17.8609 3 17.3997"
        stroke="hsl(var(--heroui-primary) / 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
      <path
        d="M15.9226 20.1464V19.3661C15.9926 18.4758 15.6764 17.5982 15.0547 16.957"
        stroke={props.stroke || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
      </path>
    </svg>
  )
}

export const Github = memo(GithubComponent)
Github.displayName = 'Github'
