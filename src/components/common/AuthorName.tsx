import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'

const classes = {
  base: 'inline-block text-text2 dark:text-text7 text-sm'
}
export interface IAuthorNameProps extends DefaultProps {}

export default function AuthorName(props: IAuthorNameProps) {
  const { children, className } = props
  return (
    <span id='auth-avatar' className={twMerge(classes.base, className)}>
      {children}
    </span>
  )
}
