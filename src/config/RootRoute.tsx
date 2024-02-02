import { Outlet, useNavigate } from 'react-router-dom'
import globalRouter from '~/utils/globalRouter'

export const RootRoute = () => {
  const navigate = useNavigate()
  globalRouter.navigate = navigate

  return <Outlet></Outlet>
}
