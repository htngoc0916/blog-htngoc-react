import { Badge, BadgeProps } from 'flowbite-react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
const classes = {
  base: 'inline-flex justify-center items-center'
}

export interface ICardTagProps extends BadgeProps {
  className?: string
  href?: string
  children: ReactNode
}

export default function CardTag(props: ICardTagProps) {
  const { className = '', href = '', children, ...rest } = props
  return (
    <Link to={href}>
      <Badge className={twMerge(classes.base, className)} {...rest}>
        {children}
      </Badge>
    </Link>
  )
}
