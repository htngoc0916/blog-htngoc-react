import { Label, Radio } from 'flowbite-react'
import { Control, useController } from 'react-hook-form'
import { useEffect } from 'react'

export interface RadioCustomProps {
  id: string
  name: string
  value: string
  control?: Control<any>
  defaultChecked?: boolean
  title: string
}

export default function RadioCustom({ id, title, name, value, control, defaultChecked = false }: RadioCustomProps) {
  const { field } = useController({
    control,
    name,
    defaultValue: value
  })

  useEffect(() => {
    if (defaultChecked !== undefined && field.value !== defaultChecked) {
      control.setValue(name, defaultChecked)
    }
  }, [defaultChecked, field.value, name, control])

  return (
    <div className='flex items-center justify-center gap-3'>
      <Radio id={id} {...field} value={value} defaultChecked={defaultChecked} />
      <Label htmlFor={id}>{title}</Label>
    </div>
  )
}
