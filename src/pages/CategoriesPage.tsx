import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import PaginationCustom from '~/components/pagination/PaginationCustom'
import { CategoryList } from '~/modules/category'

export interface CategoriesPageProps {}

export default function CategoriesPage(props: CategoriesPageProps) {
  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Categories'>Quản lý thông tin category của bạn 🌵</DashboardTitle>
      <div className='grid flex-1 grid-cols-1 gap-4 lg:grid-cols-7'>
        <div id='categories-list' className='px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 lg:col-span-4'>
          <div className='flex items-center justify-end mb-6'>
            <ActionAdd></ActionAdd>
          </div>
          <div>
            <CategoryList></CategoryList>
          </div>
          <div className='mt-10'>
            <PaginationCustom></PaginationCustom>
          </div>
        </div>
        <div id='categories-details' className='bg-white rounded-xl dark:bg-darkbg3 lg:col-span-3'>
          <div>Category Details</div>
        </div>
      </div>
    </div>
  )
}
