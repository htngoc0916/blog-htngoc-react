import { Avatar, Dropdown } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import { dataMenu } from './dataMenu'
import { Link } from 'react-router-dom'

export default function HeaderUserInfo(props: DefaultProps) {
  const data = dataMenu().filter((item) => item.type === 'private')

  return (
    <div className={twMerge(props.className)}>
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt='User avatar' img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded />}
      >
        <Dropdown.Header>
          <span className='block text-sm font-bold'>Tuan Ngoc</span>
          <span className='block text-sm font-medium truncate'>htngoc0916.dev@gmail.com</span>
        </Dropdown.Header>

        {data.map((item) => (
          <Dropdown.Item key={item.id}>
            <Link to={item.path}>{item.title}</Link>
          </Dropdown.Item>
        ))}

        <Dropdown.Divider />
        <Link to='login' className='block'>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Link>
      </Dropdown>
    </div>
  )
}
