import { Button, ButtonProps } from 'flowbite-react'
import { memo } from 'react'
import { HiPlus } from 'react-icons/hi2'

const ActionAdd = memo(function ActionAdd(props: ButtonProps) {
  return (
    <Button color='primary' {...props}>
      <HiPlus className='w-4 h-4 mr-2' />
      <span>Thêm mới</span>
    </Button>
  )
})

export default ActionAdd
