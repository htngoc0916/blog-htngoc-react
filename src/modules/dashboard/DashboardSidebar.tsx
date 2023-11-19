import HeaderLogo from '../header/HeaderLogo'
import { SidebarGroup, SidebarItem } from '~/components/sidebar'
import sidebarDt from '~/modules/dashboard/data.sidebar'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
export interface DashboardsidebarProps {}

export default function Dashboardsidebar() {
  const data = sidebarDt()
  return (
    <div className='w-full h-full px-3 py-4 overflow-y-auto bg-white border-r shadow-sm border-r-gray-100 dark:border-r-gray-600 dark:bg-darkbg3'>
      <div className='flex flex-col justify-between w-full h-full'>
        <HeaderLogo href='/'></HeaderLogo>
        <SidebarGroup className='flex-1 mt-5'>
          {data.map((item) => {
            const { icon: SVGElement } = item
            return (
              <SidebarItem key={item.id} to={item.path} icon={<SVGElement />}>
                {item.title}
              </SidebarItem>
            )
          })}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarItem to='logout' icon={<HiArrowRightOnRectangle />}>
            Logout
          </SidebarItem>
        </SidebarGroup>
      </div>
    </div>
  )
}
