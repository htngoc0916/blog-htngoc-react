import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface ICardBodyProps {
  href: string
  children?: ReactNode
  className?: string
}

export default function CardBody(props: ICardBodyProps) {
  return (
    <Link to={props.href} className={props.className}>
      {props.children}
    </Link>
  )
}
