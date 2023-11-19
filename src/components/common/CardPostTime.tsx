import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
const classes = {
  base: 'text-text2 text-sm dark:text-text7'
}

export interface ICardPostTimeProps extends DefaultProps {
  value?: string | number
}

export default function CardPostTime(props: ICardPostTimeProps) {
  return (
    <div className={twMerge(classes.base, props.className)}>
      {props.value && <span className='inline-block pr-2'>{props.value}</span>}
      {props.children}
    </div>
  )
}
