import { forwardRef, useEffect, useState } from 'react'
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
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    setToggle(checked)
  }, [checked])

  const handleOnchage = (value: boolean) => {
    setToggle(value)
    onChange?.(value)
  }

  return (
    <ToggleSwitch
      className={className}
      label={label}
      color={color}
      checked={toggle}
      {...field}
      onChange={handleOnchage}
      ref={ref}
      name={name}
    />
  )
})

export default ButtonToggleSwitch
