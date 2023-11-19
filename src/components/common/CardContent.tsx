import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const classes = {
  base: 'text-base font-normal text-text2 dark:text-text7'
}
export interface ICardContentProps {
  className?: string
  children?: ReactNode
}

export default function CardContent(props: ICardContentProps) {
  return <div className={twMerge(classes.base, props.className)}>{props.children}</div>
}
