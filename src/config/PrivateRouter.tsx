import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, userInfoSelector } from '~/app/auth/authSlice'
import AccessDenied from '~/pages/AccessDenied'
import checkAdmin from '~/utils/checkAdmin'

interface Props {
  component: React.ComponentType
  path?: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const userInfo = useAppSelector(userInfoSelector)

  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  const userHasRequiredRole = checkAdmin(userInfo?.roles)
  if (userHasRequiredRole) {
    return <RouteComponent />
  } else {
    return <AccessDenied />
  }
}
