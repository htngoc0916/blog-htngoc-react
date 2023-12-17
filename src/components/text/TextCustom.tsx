import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'

const classes = {
  base: 'inline-block font-bold ',
  color: {
    primary: 'text-primary-800 dark:text-primary-600',
    secondary: 'text-gray-800 dark:text-white'
  },
  gradient: {
    primary: 'bg-gradient-primary text-transparent bg-clip-text py-4',
    secondary: 'bg-gradient-secondary text-transparent bg-clip-text py-4'
  },
  size: {
    sm: 'md:text-2xl text-lg',
    md: 'md:text-3xl text-xl',
    lg: 'md:text-4xl text-2xl',
    xl: 'md:text-5xl text-3xl'
  }
}

export interface TextCustomProps extends DefaultProps {
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: 'primary' | 'secondary'
}

export default function TextCustom(props: TextCustomProps) {
  const { color, size = 'md', gradient } = props
  return (
    <div
      className={twMerge(
        classes.base,
        classes.size[size],
        color && classes.color[color],
        gradient && classes.gradient[gradient],
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
