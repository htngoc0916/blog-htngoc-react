import { Menu } from '~/types'
import { SidebarCollapse, SidebarItem } from '~/components/sidebar'
import { menuIcons } from '~/components/icons/menu'

export interface DashboardSidebarItemProps {
  data: Menu
}
const DashboardSidebarItem = ({ data }: DashboardSidebarItemProps) => {
  const hasChildren = data.children && data.children.length > 0
  return (
    <>
      {hasChildren ? (
        <SidebarCollapse data={data} icon={menuIcons[data.menuIcon]}></SidebarCollapse>
      ) : (
        // <Sidebar.Collapse
        //   icon={<DynamicIcon iconName={menu.menuIcon as icons.IconName} className='w-6 h-6' />}
        //   label='E-commerce'
        //   renderChevronIcon={(theme, open) => {
        //     const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm
        //     return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
        //   }}
        // >
        //   {menu &&
        //     menu.children.map((child) => <DashboardSidebarItem key={child.id} menu={child} isOpenSideBar={false} />)}
        // </Sidebar.Collapse>
        <SidebarItem to={data.menuUrl} icon={menuIcons[data.menuIcon]}>
          {data.menuName}
        </SidebarItem>
      )}
    </>
  )
}

export default DashboardSidebarItem
