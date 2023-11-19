import { TextInput, TextInputProps } from 'flowbite-react'
import { ReactNode, useState, MouseEvent } from 'react'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

export interface InputPasswordProps extends TextInputProps {
  children?: ReactNode
}

export default function InputPassword(props: InputPasswordProps) {
  const { children, onClick, ...rest } = props
  const [showEye, setShowEye] = useState(false)

  const handleOnclick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowEye(!showEye)
  }

  return (
    <div className='relative'>
      <TextInput type={showEye ? 'text' : 'password'} {...rest}></TextInput>
      <button className='absolute right-0 inline-block h-full px-2 -translate-y-1/2 top-1/2' onClick={handleOnclick}>
        {showEye ? (
          <HiOutlineEye className='w-5 h-5 dark:text-text2'></HiOutlineEye>
        ) : (
          <HiOutlineEyeOff className='w-5 h-5 dark:text-text2'></HiOutlineEyeOff>
        )}
      </button>
    </div>
  )
}
