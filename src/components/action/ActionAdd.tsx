import { Button, ButtonProps } from 'flowbite-react'
import { HiPlus } from 'react-icons/hi2'

export default function ActionAdd(props: ButtonProps) {
  return (
    <Button color='primary' {...props}>
      <HiPlus className='w-4 h-4 mr-2' />
      <span>Thêm mới</span>
    </Button>
  )
}
