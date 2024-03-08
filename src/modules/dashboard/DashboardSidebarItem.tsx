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
        <SidebarCollapse title={data.menuName} icon={menuIcons[data.menuIcon]}>
          {data?.children?.map((children) => (
            <SidebarItem key={data.id} to={children.menuUrl} className='text-sm pl-9'>
              {children.menuName}
            </SidebarItem>
          ))}
        </SidebarCollapse>
      ) : (
        <SidebarItem to={data.menuUrl} icon={menuIcons[data.menuIcon]}>
          {data.menuName}
        </SidebarItem>
      )}
    </>
  )
}

export default DashboardSidebarItem
