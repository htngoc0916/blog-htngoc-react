import { Button, ButtonProps } from 'flowbite-react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export default function ActionSearch(props: ButtonProps) {
  return (
    <Button color='blue' {...props}>
      <HiMagnifyingGlass className='w-4 h-4 mr-2' />
      <span>Tìm kiếm</span>
    </Button>
  )
}
