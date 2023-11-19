import { twMerge } from 'tailwind-merge'

export interface TextTitleProps {
  className?: string
  size?: string
  font?: string
  children?: React.ReactNode
}
export default function TextTitle(props: TextTitleProps) {
  const { size = '2xl', className = '', font = 'medium', children } = props

  return (
    <div className={twMerge(`text-primary-700 dark:text-primary-500 font-${font} mb-2 text-${size}`, className)}>
      {children}
    </div>
  )
}
