import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
const classes = {
  base: 'object-cover max-w-full max-h-full transition-all cursor-pointer group-hover:scale-105'
}

export interface ICardImageProps extends React.ComponentPropsWithoutRef<'img'> {
  to: string
  className: string
}

export default function CardImage(props: ICardImageProps) {
  const { className, to, ...rest } = props
  return (
    <Link to={to} className={twMerge('h-full overflow-hidden')}>
      <img {...rest} className={twMerge(classes.base, className)} />
    </Link>
  )
}
