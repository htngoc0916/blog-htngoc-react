import { Dropdown } from 'flowbite-react'
import { HiBellAlert } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function Notifications() {
  return (
    <div className='flex items-center justify-center text-gray-500'>
      <Dropdown arrowIcon={false} inline label={<HiBellAlert />} className='w-[300px]'>
        <Dropdown.Header className='py-0'>
          <div className='block text-sm font-bold text-center'>Notifications</div>
        </Dropdown.Header>

        <Link to='/'>
          <Dropdown.Item>aa</Dropdown.Item>
        </Link>

        <Dropdown.Divider />
        <Link to='login' className='flex items-center justify-center'>
          <Dropdown.Item>View all</Dropdown.Item>
        </Link>
      </Dropdown>
    </div>
  )
}
