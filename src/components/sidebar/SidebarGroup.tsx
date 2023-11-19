import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface SidebarGroupProps {
  className?: string
  children?: ReactNode
}

export default function SidebarGroup(props: SidebarGroupProps) {
  return (
    <div className={twMerge('pt-4 space-y-2 dark:border-gray-700 block sidebar-group', props.className)}>
      {props.children}
    </div>
  )
}
