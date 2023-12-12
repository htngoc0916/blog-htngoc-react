import { Navigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, userInfoSelector } from '~/app/auth/authSlice'
import AccessDenied from '~/pages/AccessDenied'
import { ROLE } from '~/types/user'

interface Props {
  component: React.ComponentType
  path?: string
  roles: Array<ROLE>
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, roles }) => {
  const userInfo = useAppSelector(userInfoSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const userHasRequiredRole = userInfo && roles.includes(userInfo.role) ? true : false

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />
  }

  return <Navigate to='/' />
}
