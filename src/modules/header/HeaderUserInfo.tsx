import { Avatar, Dropdown } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import { dataMenu } from './dataMenu'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, logoutStart, userInfoSelector } from '~/app/auth/authSlice'

export default function HeaderUserInfo(props: DefaultProps) {
  const data = dataMenu().filter((item) => item.type === 'private')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)

  const handleLogout = () => {
    dispatch(logoutStart({ navigate }))
  }

  return (
    <div className={twMerge(props.className)}>
      {isAuthenticated && userInfo ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt='User avatar' rounded img={'https://flowbite.com/docs/images/people/profile-picture-5.jpg'} />
          }
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
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      ) : (
        <Link to='/login'>
          <Avatar alt='User avatar' rounded />
        </Link>
      )}
    </div>
  )
}
