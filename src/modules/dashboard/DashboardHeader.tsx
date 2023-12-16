import { DarkThemeToggle, Navbar } from 'flowbite-react'
import { Notifications } from '~/components/common'
import HeaderUserInfo from '../header/HeaderUserInfo'
import { twMerge } from 'tailwind-merge'

export interface DashboardHeaderProps {
  className?: string
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <Navbar className={twMerge(props.className)}>
      <div className='flex-1'>search</div>
      <div className='flex gap-3 avatar'>
        <Notifications />
        <DarkThemeToggle></DarkThemeToggle>
        <HeaderUserInfo />
      </div>
    </Navbar>
  )
}
