import { Textarea, TextareaProps } from 'flowbite-react'
import { ReactNode } from 'react'
import { Control, useController } from 'react-hook-form'

export interface TextareaCustomProps extends TextareaProps {
  name: string
  message?: ReactNode
  control?: Control<any>
  color?: string
}

export default function TextareaCustom(props: TextareaCustomProps) {
  const { control, name, message, color = 'primary', ...rest } = props

  const { field, fieldState } = useController({
    control,
    name
  })

  return (
    <div className='relative mb-1'>
      <div className='relative'>
        <Textarea id={name} color={fieldState.invalid ? 'failure' : color} {...field} {...rest}></Textarea>
      </div>
      <div className='absolute left-0 top-full'>
        <span className='mt-2 text-sm text-red-600 dark:text-red-500'>{message}</span>
      </div>
    </div>
  )
}
