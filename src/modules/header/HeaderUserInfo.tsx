import { Avatar, Button, Dropdown } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, logoutStart, userInfoSelector } from '~/app/auth/authSlice'
import checkAdmin from '~/utils/checkAdmin'

export default function HeaderUserInfo(props: DefaultProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const isAdmin = checkAdmin(userInfo?.roles)

  const handleLogout = () => {
    dispatch(logoutStart({ navigate }))
  }

  return (
    <div className={twMerge(props.className)}>
      {isAuthenticated && userInfo ? (
        <Dropdown arrowIcon={false} inline label={<Avatar alt='User avatar' rounded img={userInfo.avatar} />}>
          <Dropdown.Header>
            <span className='block text-sm font-bold'>{userInfo.userName}</span>
            <span className='block text-sm font-medium truncate'>{userInfo.email}</span>
          </Dropdown.Header>

          {isAdmin && (
            <>
              <Dropdown.Item>
                <Link to='/auth/dashboard'>Trang Admin</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='auth/user'>Thông tin của tôi</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}

          <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
        </Dropdown>
      ) : (
        <Button size='sm' gradientDuoTone='primary' onClick={() => navigate('/login')}>
          Đăng nhập
        </Button>
      )}
    </div>
  )
}
