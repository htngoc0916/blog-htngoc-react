import { Outlet } from 'react-router-dom'
import { DashboardHeader } from '.'

export default function DashboardMain() {
  return (
    <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
      <DashboardHeader className='sticky top-0 left-0 w-full z-[90] bg-white border-b shadow-sm border-text7 dark:border-text3 dark:bg-darkbg3 transition-all'></DashboardHeader>
      <main className='flex-1 w-full'>
        <Outlet></Outlet>
      </main>
    </div>
  )
}
