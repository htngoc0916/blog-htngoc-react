import { ReactNode, FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

const classes = {
  base: 'w-full mx-auto'
}

export interface FormProps {
  className?: string
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function Form(props: FormProps) {
  const { className, children, onSubmit } = props
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(classes.base, className)}
      encType='multipart/form-data'
      autoComplete='off'
    >
      {children}
    </form>
  )
}
