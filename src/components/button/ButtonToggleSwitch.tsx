import { forwardRef } from 'react'
import { ToggleSwitch, ToggleSwitchProps } from 'flowbite-react'
import { Control, useController } from 'react-hook-form'

export interface ButtonToggleSwitchProps extends ToggleSwitchProps {
  name: string
  label?: string
  color?: string
  className?: string
  control?: Control<any>
  checked: boolean
  onChange: (value: boolean) => void
}

const ButtonToggleSwitch = forwardRef<HTMLButtonElement, ButtonToggleSwitchProps>((props, ref) => {
  const { className, control, name, checked, label = 'Active', onChange, color = 'primary' } = props

  const { field } = useController({
    control,
    name
  })

  return (
    <ToggleSwitch
      className={className}
      label={label}
      color={color}
      checked={checked}
      {...field}
      onChange={onChange}
      ref={ref}
    />
  )
})

export default ButtonToggleSwitch
