import { twMerge } from 'tailwind-merge'

export interface size {
  df: string
  md: string
}
export interface TextMarkProps {
  className?: string
  children?: React.ReactNode
  size?: Partial<size>
  font?: string
}

export default function TextMark(props: TextMarkProps) {
  const { className = '', size = { df: 'base', md: 'lg' }, font = 'medium', children } = props

  return (
    <div
      className={twMerge(`text-text2 dark:text-text6 text-${size.df} md:text-${size.md} font-${font}`, `${className}`)}
    >
      {children}
    </div>
  )
}
