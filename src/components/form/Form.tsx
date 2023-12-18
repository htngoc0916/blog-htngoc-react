import { ReactNode, FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

const classes = {
  base: 'w-full mx-auto md:max-w-md'
}

export interface FormProps {
  className?: string
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function Form(props: FormProps) {
  const { className, children, onSubmit } = props
  return (
    <form autoComplete='off' onSubmit={onSubmit} className={twMerge(classes.base, className)}>
      {children}
    </form>
  )
}
