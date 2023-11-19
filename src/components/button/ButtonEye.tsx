import { ButtonProps } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

export interface ButttonEyeProps extends ButtonProps {}

export default function ButtonEye(props: ButttonEyeProps) {
  const { ...rest } = props
  const [showEye, setShowEye] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowEye(!showEye)
  }
  return (
    <button className='inline-block' onClick={handleClick} {...rest}>
      {showEye ? (
        <HiOutlineEye className='w-5 h-5'></HiOutlineEye>
      ) : (
        <HiOutlineEyeSlash className='w-5 h-5'></HiOutlineEyeSlash>
      )}
    </button>
  )
}
