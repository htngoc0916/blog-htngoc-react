import {
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineChartPie,
  HiOutlineTableCells,
  HiOutlineNewspaper
} from 'react-icons/hi2'
import { v4 as uuidv4 } from 'uuid'

export default function sidebarDt() {
  return [
    {
      id: uuidv4(),
      path: '/auth/dashboard',
      title: 'Dashboard',
      icon: HiOutlineChartPie
    },
    {
      id: uuidv4(),
      path: '/auth/category',
      title: 'Category',
      icon: HiOutlineNewspaper
    },
    {
      id: uuidv4(),
      path: '/auth/post',
      title: 'Post',
      icon: HiOutlineTableCells
    },
    {
      id: uuidv4(),
      path: '/auth/user',
      title: 'User',
      icon: HiOutlineUser
    },
    {
      id: uuidv4(),
      path: '/auth/system',
      title: 'System',
      icon: HiOutlineCog6Tooth
    }
  ]
}
