import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ICardTitleProps {
  className?: string
  animation?: boolean
  children?: ReactNode
}

const classes = {
  base: 'text-xl font-bold tracking-tight text-text1 dark:text-white break-all',
  animation: {
    on: 'bg-gradient-to-r from-primary-700/50 to-primary-700/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]',
    off: ''
  }
}

export default function CardTitle(props: ICardTitleProps) {
  const { className = '', children, animation = false, ...rest } = props
  return (
    <div className={twMerge(classes.base, className)} {...rest}>
      <span className={animation ? classes.animation.on : classes.animation.off}>{children}</span>
    </div>
  )
}
