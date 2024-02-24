// ~/components/input
import { TextInput, TextInputProps } from 'flowbite-react'
import { ChangeEvent, ReactNode } from 'react'
import { Control, useController } from 'react-hook-form'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorFallBack from '../error'

export interface InputCustomProps extends TextInputProps {
  name: string
  message?: ReactNode
  control?: Control<any>
  children?: ReactNode
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

function InputCustomComponent(props: InputCustomProps) {
  const { children, type = 'text', control, name, message, onChange, ...rest } = props

  const { field, fieldState } = useController({
    control,
    name
  })

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e)
    onChange?.(e)
  }

  return (
    <div className='relative'>
      <div className='relative'>
        <TextInput
          type={type}
          id={name}
          color={fieldState.invalid ? 'failure' : 'primary'}
          {...field}
          {...rest}
          onChange={handleOnChange}
        ></TextInput>
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

const InputCustom = withErrorBoundary(InputCustomComponent, {
  FallbackComponent: ErrorFallBack
})

export default InputCustom
