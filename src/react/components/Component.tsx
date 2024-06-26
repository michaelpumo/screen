import type { ElementType, FC, HTMLAttributes, ReactNode } from 'react'
import React from 'react'

interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: ReactNode
  as?: ElementType
}

const Component: FC<ComponentProps> = ({
  children,
  as: Tag = 'div',
  ...rest
}) => {
  return <Tag {...rest}>{children}</Tag>
}

export default Component
