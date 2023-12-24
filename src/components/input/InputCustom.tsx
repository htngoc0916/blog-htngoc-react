// ~/components/input
import { TextInput, TextInputProps } from 'flowbite-react'
import { ReactNode } from 'react'
import { Control, useController } from 'react-hook-form'

export interface InputCustomProps extends TextInputProps {
  name: string
  message?: ReactNode
  control?: Control<any>
  children?: ReactNode
}

export default function InputCustom(props: InputCustomProps) {
  const { children, control, name, message, ...rest } = props

  const { field, fieldState } = useController({
    control,
    name
  })

  return (
    <div className='relative mb-1'>
      <div className='relative'>
        <TextInput id={name} color={fieldState.invalid ? 'failure' : 'primary'} {...field} {...rest}></TextInput>
        {children && (
          <div className='absolute right-0 inline-block h-full px-2 -translate-y-1/2 top-1/2'>{children}</div>
        )}
      </div>
      <div className='absolute left-0 top-full'>
        <span className='mt-2 text-sm text-red-600 dark:text-red-500'>{message}</span>
      </div>
    </div>
  )
}
