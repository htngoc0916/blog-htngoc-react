import React from 'react'
import { ToggleSwitch, ToggleSwitchProps } from 'flowbite-react'
import { Control, useController } from 'react-hook-form'

export interface ButtonToggleSwitchProps extends ToggleSwitchProps {
  name: string
  className?: string
  control?: Control<any>
  checked: boolean
  onChange: (value: boolean) => void
}

const ButtonToggleSwitch = React.forwardRef<HTMLButtonElement | null, ButtonToggleSwitchProps>((props, ref) => {
  const { className, control, name, checked, onChange, ...rest } = props

  const { field } = useController({
    control,
    name
  })

  return (
    <ToggleSwitch
      className={className}
      label='Active'
      color={rest.color || 'primary'}
      checked={checked}
      {...field}
      {...rest}
      onChange={onChange}
      ref={ref as React.RefObject<HTMLButtonElement>}
    />
  )
})

export default ButtonToggleSwitch
