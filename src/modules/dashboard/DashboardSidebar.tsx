import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { getPrivateMenu, privateMenuSelector } from '~/app/menu/menuSlice'
import { HiOutlineBars3BottomLeft, HiBars3CenterLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'
import { logoutStart } from '~/app/auth/authSlice'
import { SidebarCustom, SidebarLogo, SidebarGroup, SidebarItem } from '~/components/sidebar'
import { useSidebar } from '~/components/sidebar/sidebar.context'
import DashboardSidebarItem from './DashboardSidebarItem'

interface DashboardsidebarProps {}

const DashboardSidebar: React.FC<DashboardsidebarProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const privateMenus = useAppSelector(privateMenuSelector)

  const { isOpen, toggleSidebar } = useSidebar()

  useEffect(() => {
    dispatch(getPrivateMenu())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutStart({ navigate }))
  }

  return (
    <aside className='relative z-[999]'>
      <button
        className='absolute top-3 right-0 translate-x-full z-[100] inline-block cursor-pointer bg-white transition-transform duration-300 dark:bg-gray-800 pr-1 py-1 rounded-r-lg'
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <HiBars3CenterLeft className='w-8 h-8'></HiBars3CenterLeft>
        ) : (
          <HiOutlineBars3BottomLeft className='w-8 h-8'></HiOutlineBars3BottomLeft>
        )}
      </button>
      <SidebarCustom className='flex flex-col bg-white'>
        <SidebarLogo to='/' img='/img/logo_htn.png' title='htngoc'></SidebarLogo>
        <SidebarGroup className='flex-1 mt-4'>
          {privateMenus &&
            privateMenus.map((item) => <DashboardSidebarItem key={item.id} data={item}></DashboardSidebarItem>)}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem icon={HiLogout} onClick={handleLogout}>
            Logout
          </SidebarItem>
        </SidebarGroup>
      </SidebarCustom>
    </aside>
  )
}

export default DashboardSidebar
