import { HiPencilSquare } from 'react-icons/hi2'

export interface ActionEditProps {}

export default function ActionEdit() {
  return (
    <button className='p-2 transition-all rounded-full group hover:bg-primary-200'>
      <HiPencilSquare className='w-5 h-5 transition-all text-primary-600 group-hover:text-primary-700'></HiPencilSquare>
    </button>
  )
}
