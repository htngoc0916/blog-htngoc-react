import { Label, Radio } from 'flowbite-react'
import { Control, useController } from 'react-hook-form'

export interface RadioCustomProps {
  id: string
  name: string
  value: string
  control?: Control<any>
  defaultChecked?: boolean
  title: string
}

export default function RadioCustom({ id, title, name, value, control, defaultChecked }: RadioCustomProps) {
  const { field } = useController({
    control,
    name,
    defaultValue: value
  })
  return (
    <div className='flex items-center justify-center gap-3'>
      <Radio id={id} defaultChecked={defaultChecked} {...field} value={value} />
      <Label htmlFor={id}>{title}</Label>
    </div>
  )
}
