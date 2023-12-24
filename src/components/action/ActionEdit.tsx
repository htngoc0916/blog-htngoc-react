import { HiPencilSquare } from 'react-icons/hi2'

export interface ActionEditProps {
  onClick?: () => void
}

export default function ActionEdit({ onClick }: ActionEditProps) {
  return (
    <button className='p-2 transition-all rounded-full group hover:bg-primary-200' onClick={onClick}>
      <HiPencilSquare className='w-5 h-5 transition-all text-primary-600 group-hover:text-primary-700'></HiPencilSquare>
    </button>
  )
}
