import { twMerge } from 'tailwind-merge'

export interface TextDescriptProps {
  className?: string
  size?: string
  font?: string
  children?: React.ReactNode
}

export default function TextDescript(props: TextDescriptProps) {
  const { className = '', size = '3xl', font = 'semibold', children } = props

  return (
    <div className={twMerge(`md:text-5xl text-${size} font-${font} pb-5 text-text1 dark:text-text7`, className)}>
      {children}
    </div>
  )
}
