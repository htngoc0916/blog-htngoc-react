import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'

const classes = {
  base: 'flex gap-2 items-center justify-start'
}
export interface ICardAuthorProps extends DefaultProps {}

export default function CardAuthor(props: ICardAuthorProps) {
  const { className, children } = props
  return <div className={twMerge(classes.base, className)}>{children}</div>
}
