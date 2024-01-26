import { HiXMark } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'

export interface ActionCloseProps {
  className?: string
  onClick?: () => void
}

export default function ActionClose({ onClick, className }: ActionCloseProps) {
  return (
    <button
      type='button'
      className={twMerge('p-2 transition-all rounded-lg group hover:bg-gray-200', className)}
      onClick={onClick}
    >
      <HiXMark className='w-5 h-5 text-gray-600 transition-all group-hover:text-gray-700'></HiXMark>
    </button>
  )
}
