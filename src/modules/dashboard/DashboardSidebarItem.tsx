// import { Menu } from '~/types'
// import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi'
// import { twMerge } from 'tailwind-merge'
// import { Sidebar } from 'flowbite-react'
// import DynamicIcon from '~/components/icons/menu/DynamicIcon'
// import * as icons from '~/components/icons/menu'

// export interface DashboardSidebarItemProps {
//   menu: Menu
//   isOpenSideBar: boolean
// }

// const DashboardSidebarItem = ({ menu, isOpenSideBar }: DashboardSidebarItemProps) => {
//   const hasChildren = menu.children && menu.children.length > 0

//   return (
//     <>
//       {hasChildren ? (
//         <Sidebar.Collapse
//           icon={<DynamicIcon iconName={menu.menuIcon as icons.IconName} className='w-6 h-6' />}
//           label='E-commerce'
//           renderChevronIcon={(theme, open) => {
//             const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm
//             return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
//           }}
//         >
//           {menu &&
//             menu.children.map((child) => <DashboardSidebarItem key={child.id} menu={child} isOpenSideBar={false} />)}
//         </Sidebar.Collapse>
//       ) : (
//         <Sidebar.Item to={menu.menuUrl} icon={/* Icon của menu */}>
//           {isOpenSideBar && menu.menuName}
//         </Sidebar.Item>
//       )}
//     </>
//   )
// }

// export default DashboardSidebarItem
