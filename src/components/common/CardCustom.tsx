import { Card, CardProps } from 'flowbite-react'
import { Link } from 'react-router-dom'
import slugify from 'slugify'

export default function CardCustom(props: CardProps) {
  const { href = '', children, ...rest } = props

  if (href.length > 0) {
    return (
      <Link to={slugify(href)}>
        <Card {...rest}> {children} </Card>
      </Link>
    )
  }

  return <Card {...rest}> {children} </Card>
}
