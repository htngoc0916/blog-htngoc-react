import { NavLink } from 'react-router-dom'
import { useSidebar } from './sidebar.context'

export interface SidebarLogoProps {
  title?: string
  img?: string
  to?: string
}

export default function SidebarLogo({ title, img, to = '/' }: SidebarLogoProps) {
  const { isOpen } = useSidebar()
  return (
    <div className='flex'>
      <NavLink to={to}>
        <div className='inline-flex items-center justify-center w-10 h-10 rounded-lg'>
          <img src={img} alt='Blog Logo' className='object-cover w-full rounded-lg' />
        </div>
      </NavLink>
      {isOpen && (
        <span className='self-center hidden ml-3 text-xl font-semibold whitespace-nowrap dark:text-white md:block'>
          {title}
        </span>
      )}
    </div>
  )
}
