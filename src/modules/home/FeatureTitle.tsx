import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'

const classes = {
  base: 'inline-block md:text-3xl text-xl font-bold text-transparent bg-clip-text my-4',
  color: {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary'
  }
}

export interface IFeatureTitleProps extends DefaultProps {
  color?: 'primary' | 'secondary'
}

export default function FeatureTitle(props: IFeatureTitleProps) {
  const { color = 'primary' } = props
  return <div className={twMerge(classes.base, classes.color[color], props.className)}>{props.children}</div>
}
