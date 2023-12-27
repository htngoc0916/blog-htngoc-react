import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { getPrivateMenu, privateMenuSelector } from '~/app/menu/menuSlice'
import { menuIcons } from '~/components/icons/menu'
import { HiOutlineBars3BottomLeft, HiBars3CenterLeft } from 'react-icons/hi2'
import { NavLink, useNavigate } from 'react-router-dom'
import { Sidebar, useTheme } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { HiLogout } from 'react-icons/hi'
import { logoutStart } from '~/app/auth/authSlice'
import DashboardSidebarLogo from './DashboardSidebarLogo'

interface DashboardsidebarProps {}

const Dashboardsidebar: React.FC<DashboardsidebarProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme().theme.sidebar.item
  const privateMenus = useAppSelector(privateMenuSelector)

  const [openSideBar, setOpenSideBar] = useState(true)

  useEffect(() => {
    dispatch(getPrivateMenu())
  }, [dispatch])

  const handleSideBar = () => {
    setOpenSideBar(!openSideBar)
  }

  const handleLogout = () => {
    dispatch(logoutStart({ navigate }))
  }

  return (
    <aside className='relative'>
      <button
        className='absolute top-3 right-1 translate-x-full z-[100] inline-block cursor-pointer bg-white transition-transform duration-300 dark:bg-gray-800 pr-1 py-1 rounded-r-lg'
        onClick={handleSideBar}
      >
        {openSideBar ? (
          <HiBars3CenterLeft className='w-8 h-8'></HiBars3CenterLeft>
        ) : (
          <HiOutlineBars3BottomLeft className='w-8 h-8'></HiOutlineBars3BottomLeft>
        )}
      </button>
      <Sidebar collapsed={!openSideBar} className='hidden h-full xl:flex-col xl:flex'>
        <DashboardSidebarLogo />
        <Sidebar.Items className='flex flex-col flex-1 mt-6'>
          <Sidebar.ItemGroup className='flex-1'>
            {privateMenus &&
              privateMenus.map((item) => (
                <Sidebar.Item
                  key={item.id}
                  to={item.menuUrl}
                  as={NavLink}
                  icon={menuIcons[item.menuIcon]}
                  className={({ isActive }: { isActive: boolean }) => {
                    console.log('asdsad', isActive)
                  }}
                >
                  {item.menuName}
                </Sidebar.Item>
              ))}
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup className='mb-5'>
            <Sidebar.Item icon={HiLogout} onClick={handleLogout} className='cursor-pointer'>
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </aside>
  )
}

export default Dashboardsidebar
