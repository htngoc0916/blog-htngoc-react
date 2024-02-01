import { Avatar, Button, Dropdown } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, logoutStart, userInfoSelector } from '~/app/auth/authSlice'
import { checkAdminRole } from '~/utils/checkAdmin'
import { useTranslation } from 'react-i18next'

export default function HeaderUserInfo(props: DefaultProps) {
  const { t } = useTranslation(['common'])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const isAdmin = checkAdminRole(userInfo)

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
                <Link to='/auth/dashboard'>{t('pages.admin')}</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='auth/user'>{t('common:pages.my-info')}</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}

          <Dropdown.Item onClick={handleLogout}>{t('acctions.logout')}</Dropdown.Item>
        </Dropdown>
      ) : (
        <Button size='sm' gradientDuoTone='primary' onClick={() => navigate('/login')} className='w-28'>
          {t('acctions.login')}
        </Button>
      )}
    </div>
  )
}
