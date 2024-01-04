//sidebarItem.tsx

import React, { ReactNode, SVGProps } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useSidebar } from './sidebar.context'
import { RenderIcon } from '../icons/menu'
import { Tooltip } from 'flowbite-react'

const classes = {
  base: 'flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
  actived: 'bg-gray-100 dark:bg-gray-700',
  icon: 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ml-1',
  children: 'flex-1 inline-block px-3 text-left rtl:text-rightwhitespace-nowrap text-text1 dark:text-white'
}

export interface SidebarItemProps extends Omit<NavLinkProps, 'to'> {
  to?: string
  className?: string
  children?: ReactNode
  icon?: React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null
  onClick?: () => void
}

export default function SidebarItem(props: SidebarItemProps) {
  const { isOpen } = useSidebar()
  const { to, className = '', children, icon: Icon, onClick } = props

  const renderIcon = RenderIcon(
    Icon as React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null,
    classes.icon
  )

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => `${twMerge(classes.base, className, isActive ? classes.actived : '')}`}
      >
        {isOpen ? (
          <>
            {renderIcon}
            <span className={classes.children}>{children}</span>
          </>
        ) : (
          <Tooltip content={children} placement='right' className='text-center w-28'>
            {renderIcon}
          </Tooltip>
        )}
      </NavLink>
    )
  } else {
    return (
      <div className={`${twMerge(classes.base, className)}`} onClick={onClick}>
        {isOpen ? (
          <>
            {renderIcon}
            <span className={classes.children}>{children}</span>
          </>
        ) : (
          <Tooltip content={children} placement='right' className='w-28 z-[999] aaa'>
            {renderIcon}
          </Tooltip>
        )}
      </div>
    )
  }
}
