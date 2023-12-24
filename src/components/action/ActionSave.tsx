import { Button, ButtonProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface ActionSaveProps extends ButtonProps {
  className?: string
  children?: ReactNode
}

export default function ActionSave(props: ActionSaveProps) {
  const { className, children, ...rest } = props
  return (
    <Button type='submit' color='primary' className={className} {...rest}>
      {children || 'Lưu'}
    </Button>
  )
}
