import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { useSidebar } from './sidebar.context'

const classes = {
  base: 'absolute top-0 left-0 h-screen duration-300 ease-linear -translate-x-full z-9999 dark:bg-gray-800 lg:static lg:translate-x-0 px-2 py-3',
  open: {
    on: 'w-64',
    off: 'w-16'
  }
}
export interface SidebarCustom {
  className?: string
  children?: ReactNode
}

export default function DashboardSidebar({ className, children }: SidebarCustom) {
  const { isOpen } = useSidebar()
  return <div className={twMerge(classes.base, classes.open[isOpen ? 'on' : 'off'], className)}>{children}</div>
}
