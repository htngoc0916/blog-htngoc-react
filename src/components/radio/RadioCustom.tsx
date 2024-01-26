import { Label, Radio, RadioProps } from 'flowbite-react'
import { Control, useController } from 'react-hook-form'

export interface RadioCustomProps extends RadioProps {
  id: string
  name: string
  value: string
  control?: Control<any>
  title: string
  checked: boolean
}

export default function RadioCustom({ id, title, name, value, control, checked }: RadioCustomProps) {
  const { field } = useController({
    control,
    name
  })

  return (
    <div className='flex items-center justify-center gap-3'>
      <Radio id={id} {...field} value={value} checked={checked} />
      <Label htmlFor={id}>{title}</Label>
    </div>
  )
}
