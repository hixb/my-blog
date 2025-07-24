'use client'

export function IntegrationProp({ size = 24, width, height, ...props }: IconProps) {
  return {
    ...props,
    width: size || width,
    height: size || height,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }
}
