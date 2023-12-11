import { Outlet } from 'react-router-dom'
import { DashboardHeader, DashboardSidebar } from '~/modules/dashboard'

function DashboardLayout() {
  return (
    <div className='bg-gray-100 dark:bg-darkbg'>
      <div className='flex h-screen'>
        <aside className='absolute top-0 left-0 flex flex-col items-center justify-start h-screen overflow-y-hidden duration-300 ease-linear -translate-x-full w-60 z-9999 dark:bg-darkbg lg:static lg:translate-x-0'>
          <DashboardSidebar></DashboardSidebar>
        </aside>
        <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
          <DashboardHeader className='sticky top-0 left-0 w-full z-[999] bg-white border-b shadow-sm border-text7 dark:border-text3 dark:bg-darkbg3 transition-all'></DashboardHeader>
          {/* <header className='sticky top-0 flex w-full bg-white z-999 dark:bg-boxdark dark:drop-shadow-none'></header> */}
          <main className='w-full'>
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
