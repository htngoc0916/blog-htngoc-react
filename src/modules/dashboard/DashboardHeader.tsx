import { DarkThemeToggle, Navbar } from 'flowbite-react'
import { Internationalization, Notifications } from '~/components/common'
import HeaderUserInfo from '../header/HeaderUserInfo'
import { twMerge } from 'tailwind-merge'

export interface DashboardHeaderProps {
  className?: string
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <Navbar className={twMerge(props.className)}>
      <div className='flex-1'></div>
      <div className='flex gap-3 avatar'>
        <Internationalization />
        <Notifications />
        <DarkThemeToggle />
        <HeaderUserInfo />
      </div>
    </Navbar>
  )
}
