import { useNavigate } from 'react-router-dom'
import globalRouter from '~/utils/globalRouter'

interface Props {
  component: React.ComponentType
}

export const RouteRoot: React.FC<Props> = ({ component: RouteComponent }) => {
  return <RouteComponent />
}
