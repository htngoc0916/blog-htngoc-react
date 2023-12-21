import React, { useEffect, useState } from 'react'
import { SidebarGroup, SidebarItem } from '~/components/sidebar'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { getPrivateMenu, privateMenuSelector } from '~/app/menu/menuSlice'
import DynamicIcon from '~/components/icons/menu/DynamicIcon'
import * as icons from '~/components/icons/menu'
import { HiOutlineBars3BottomLeft, HiOutlineBars3BottomRight } from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

interface DashboardsidebarProps {}

const Dashboardsidebar: React.FC<DashboardsidebarProps> = () => {
  const dishpatch = useAppDispatch()
  const privateMenus = useAppSelector(privateMenuSelector)

  const [openSideBar, setOpenSideBar] = useState(true)

  useEffect(() => {
    dishpatch(getPrivateMenu())
  }, [dishpatch])

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar)
  }
  return (
    <aside className='relative'>
      <button
        className='absolute top-2 right-0 translate-x-1/2 z-[9999] inline-block cursor-pointer bg-white p-1 transition-all duration-300'
        onClick={handleSideBar}
      >
        {openSideBar ? (
          <HiOutlineBars3BottomLeft className='w-8 h-8'></HiOutlineBars3BottomLeft>
        ) : (
          <HiOutlineBars3BottomRight className='w-8 h-8'></HiOutlineBars3BottomRight>
        )}
      </button>
      <div
        className={`absolute top-0 left-0 h-screen overflow-hidden duration-300 ease-linear -translate-x-full z-9999 dark:bg-darkbg lg:static lg:translate-x-0 ${
          openSideBar ? 'w-60' : 'w-16'
        }`}
      >
        <div className='w-full h-full px-3 py-2 bg-white border-r shadow-sm border-r-gray-100 dark:border-r-gray-600 dark:bg-darkbg3'>
          <div className='flex flex-col justify-between w-full h-full'>
            <div className='flex mt-14'>
              <NavLink to='/'>
                <div className='inline-flex items-center justify-center w-10 h-10 rounded-lg'>
                  <img src='/img/logo_htn.png' alt='Blog Logo' className='object-cover w-full rounded-lg' />
                </div>
              </NavLink>
              {openSideBar && (
                <span className='self-center hidden ml-3 text-xl font-semibold whitespace-nowrap dark:text-white md:block'>
                  htngoc
                </span>
              )}
            </div>

            <SidebarGroup className='flex-1 mt-4'>
              {privateMenus &&
                privateMenus.map((item) => (
                  <SidebarItem
                    key={item.id}
                    to={item.menuUrl}
                    icon={<DynamicIcon iconName={item.menuIcon as icons.IconName} className='w-6 h-6' />}
                  >
                    {openSideBar && item.menuName}
                  </SidebarItem>
                ))}
            </SidebarGroup>
            <SidebarGroup>
              <SidebarItem to='/logout' icon={<HiArrowRightOnRectangle />}>
                {openSideBar && 'Logout'}
              </SidebarItem>
            </SidebarGroup>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Dashboardsidebar
