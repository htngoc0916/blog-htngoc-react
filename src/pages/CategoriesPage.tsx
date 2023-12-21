import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import PaginationCustom from '~/components/pagination/PaginationCustom'
import { CategoryList } from '~/modules/category'

export interface CategoriesPageProps {}

export default function CategoriesPage(props: CategoriesPageProps) {
  return (
    <div className='flex flex-col h-full p-4 mx-auto max-w-screen-2xl'>
      <DashboardTitle title='Category'>Quản lý thông tin category của bạn 🌵</DashboardTitle>
      <div className='flex-1 p-4 bg-white rounded-xl dark:bg-darkbg3'>
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
    </div>
  )
}
