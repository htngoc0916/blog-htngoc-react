import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const classes = {
  base: `text-text7`,
  size: {
    sm: 'text-base pb-1',
    lg: 'text-lg font-medium pb-3',
    xl: 'text-xl font-semibold pb-4'
  }
}

export interface ITextFooterProps {
  className?: string
  size?: 'sm' | 'lg' | 'xl'
  children: ReactNode
}

export default function TextFooter(props: ITextFooterProps) {
  const { className, size = 'sm', children } = props
  return <div className={twMerge(`${classes.base}`, `${size && classes.size[size]}`, className)}>{children}</div>
}
