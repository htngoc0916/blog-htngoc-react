import React, { ReactNode, SVGProps } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const classes = {
  base: 'flex items-center justify-start p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
  actived: 'bg-gray-100 dark:bg-gray-700',
  icon: 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
}

export interface SidebarItemProps extends NavLinkProps {
  to: string
  className?: string
  children?: ReactNode
  icon?: React.ReactElement<SVGProps<SVGSVGElement>> | null
}

export default function SidebarItem(props: SidebarItemProps) {
  const { to = '', className = '', children, icon, ...rest } = props
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${twMerge(classes.base, className, isActive ? classes.actived : '')}`}
      {...rest}
    >
      {icon &&
        React.cloneElement(icon, {
          className: classes.icon
        })}
      <span className='flex-1 inline-block px-3 whitespace-nowrap text-text1 dark:text-white'>{children}</span>
    </NavLink>
  )
}
