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
    name,
    defaultValue: ''
  })

  return (
    <div>
      <div className='relative'>
        <TextInput color={fieldState.invalid ? 'failure' : 'primary'} id={name} {...rest} {...field}></TextInput>
        {children && (
          <div className='absolute right-0 inline-block h-full px-2 -translate-y-1/2 top-1/2'>{children}</div>
        )}
      </div>
      {message && <span className='text-sm text-red-600'>{message}</span>}
    </div>
  )
}
