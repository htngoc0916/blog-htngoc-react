import { TextInput, TextInputProps } from 'flowbite-react'
import { ReactNode, useState, MouseEvent } from 'react'
import { Control, useController } from 'react-hook-form'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

export interface InputPasswordProps extends TextInputProps {
  name: string
  message: ReactNode
  control: Control<any>
  children?: ReactNode
}

export default function InputPassword(props: InputPasswordProps) {
  const { children, onClick, control, name, message, ...rest } = props

  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: ''
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
          {...rest}
          {...field}
        ></TextInput>
        <button className='absolute right-0 inline-block h-full px-2 -translate-y-1/2 top-1/2' onClick={handleOnclick}>
          {showEye ? (
            <HiOutlineEye className='w-5 h-5 dark:text-text2'></HiOutlineEye>
          ) : (
            <HiOutlineEyeOff className='w-5 h-5 dark:text-text2'></HiOutlineEyeOff>
          )}
        </button>
      </div>
      {message && <span className='text-sm text-red-600'>{message}</span>}
    </div>
  )
}
