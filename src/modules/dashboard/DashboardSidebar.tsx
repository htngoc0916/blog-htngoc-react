import HeaderLogo from '../header/HeaderLogo'
import { SidebarGroup, SidebarItem } from '~/components/sidebar'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useAppSelector } from '~/app/hooks'
import { menuListSeclector } from '~/app/menu/menuSlice'

export interface DashboardsidebarProps {}

export default function Dashboardsidebar() {
  const menuList = useAppSelector(menuListSeclector)
  const privateMenus = menuList.filter((item) => item.menuCode === 'PRIVATE')
  return (
    <div className='w-full h-full px-3 py-2 overflow-y-auto bg-white border-r shadow-sm border-r-gray-100 dark:border-r-gray-600 dark:bg-darkbg3'>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex'>
          <HeaderLogo href='/'></HeaderLogo>
        </div>
        <SidebarGroup className='flex-1 mt-6'>
          {privateMenus.length > 0 &&
            privateMenus.map((item) => {
              return (
                <SidebarItem key={item.id} to={item.menuUrl}>
                  {item.menuName}
                </SidebarItem>
              )
            })}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem to='/logout' icon={<HiArrowRightOnRectangle />}>
            Logout
          </SidebarItem>
        </SidebarGroup>
      </div>
    </div>
  )
}
