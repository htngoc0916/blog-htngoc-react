import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'

const classes = {
  base: 'flex items-center justify-start gap-2'
}
export interface BadgeProps extends DefaultProps {}

export default function BadgeGroup(props: BadgeProps) {
  return <div className={twMerge(classes.base, props.className)}>{props.children}</div>
}
