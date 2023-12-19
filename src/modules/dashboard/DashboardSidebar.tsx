import React, { useEffect } from 'react'
import HeaderLogo from '../header/HeaderLogo'
import { SidebarGroup, SidebarItem } from '~/components/sidebar'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { getPrivateMenu, privateMenuSelector } from '~/app/menu/menuSlice'
import DynamicIcon from '~/components/icons/menu/DynamicIcon'
import * as icons from '~/components/icons/menu'

interface DashboardsidebarProps {}

const Dashboardsidebar: React.FC<DashboardsidebarProps> = () => {
  const dishpatch = useAppDispatch()
  const privateMenus = useAppSelector(privateMenuSelector)

  useEffect(() => {
    dishpatch(getPrivateMenu())
  }, [dishpatch])

  return (
    <div className='w-full h-full px-3 py-2 overflow-y-auto bg-white border-r shadow-sm border-r-gray-100 dark:border-r-gray-600 dark:bg-darkbg3'>
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex'>
          <HeaderLogo href='/'></HeaderLogo>
        </div>
        <SidebarGroup className='flex-1 mt-6'>
          {privateMenus &&
            privateMenus.map((item) => (
              <SidebarItem
                key={item.id}
                to={item.menuUrl}
                icon={<DynamicIcon iconName={item.menuIcon as icons.IconName} className='w-6 h-6' />}
              >
                {item.menuName}
              </SidebarItem>
            ))}
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

export default Dashboardsidebar
