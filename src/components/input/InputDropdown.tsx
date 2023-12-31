import { ChangeEvent, ReactNode } from 'react'

export interface InputDropdownProps {
  className?: string
  message?: ReactNode
  children?: ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function InputDropdown(props: InputDropdownProps) {
  const { children, message, onChange, ...rest } = props
  return (
    <div>
      <input type='text' />
    </div>
  )
}
