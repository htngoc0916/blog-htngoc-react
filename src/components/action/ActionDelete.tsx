import { HiTrash } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'

export interface ActionDeleteProps {
  className?: string
}

export default function ActionDelete(props: ActionDeleteProps) {
  return (
    <button className={twMerge('p-2 transition-all rounded-full group hover:bg-red-200', props.className)}>
      <HiTrash className='w-5 h-5 text-red-600 transition-all group-hover:text-red-700'></HiTrash>
    </button>
  )
}
