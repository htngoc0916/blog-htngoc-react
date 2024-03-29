import { DashboardLeft } from '~/modules/dashboard'
import DashboardMain from '~/modules/dashboard/DashboardMain'

function DashboardLayout() {
  return (
    <div className='bg-gray-200/25 dark:bg-darkbg'>
      <div className='flex h-screen'>
        <DashboardLeft />
        <DashboardMain />
      </div>
    </div>
  )
}

export default DashboardLayout
