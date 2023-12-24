import { Badge } from 'flowbite-react'
import { BadgeGroup } from '../badge'
import { HiCheck } from 'react-icons/hi2'

export interface ActiveProps {
  active: boolean
}

export default function Active({ active }: ActiveProps) {
  return (
    <BadgeGroup>
      <Badge icon={HiCheck} color={active ? 'info' : 'gray'} className='px-2'>
        {active ? 'active' : 'disable'}
      </Badge>
    </BadgeGroup>
  )
}
