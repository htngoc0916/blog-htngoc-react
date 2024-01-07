import { TextInput, TextInputProps } from 'flowbite-react'
import { ReactNode, useState, MouseEvent } from 'react'
import { Control, useController } from 'react-hook-form'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

export interface InputPasswordProps extends TextInputProps {
  name: string
  message: ReactNode
  control: Control<any>
  children?: ReactNode
  disabled?: boolean
}

export default function InputPassword(props: InputPasswordProps) {
  const { children, onClick, control, name, message, disabled, ...rest } = props

  const { field, fieldState } = useController({
    control,
    name
  })

  const [showEye, setShowEye] = useState(false)

  const handleOnclick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowEye(!showEye)
  }

  return (
    <div>
      <div className='relative'>
        <TextInput
          color={fieldState.invalid ? 'failure' : 'primary'}
          id={name}
          type={showEye ? 'text' : 'password'}
          {...field}
          {...rest}
          disabled={disabled}
        ></TextInput>
        <button
          className='absolute right-0 inline-block h-full px-2 -translate-y-1/2 top-1/2'
          onClick={handleOnclick}
          disabled={disabled}
        >
          {showEye ? (
            <HiOutlineEye className={twMerge('w-5 h-5 dark:text-text5', disabled ? 'text-text5' : '')}></HiOutlineEye>
          ) : (
            <HiOutlineEyeOff
              className={twMerge('w-5 h-5 dark:text-text5', disabled ? 'text-text5' : '')}
            ></HiOutlineEyeOff>
          )}
        </button>
      </div>
      {message && <span className='text-sm text-red-600'>{message}</span>}
    </div>
  )
}
