import { twMerge } from 'tailwind-merge'
const classes = {
  base: 'object-cover w-full h-full rounded-lg transition-all cursor-pointer'
}

export interface ICardImageProps extends React.ComponentPropsWithoutRef<'img'> {
  href?: string
}

export default function CardImage(props: ICardImageProps) {
  const { className, href = '', ...rest } = props
  return <img className={twMerge(classes.base, className)} {...rest} />
}
