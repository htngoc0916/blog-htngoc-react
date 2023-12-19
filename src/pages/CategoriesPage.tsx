import DashboardTitle from '~/components/common/DashboardTitle'
import { CategoryList } from '~/modules/category'

export interface CategoriesPageProps {}

export default function CategoriesPage(props: CategoriesPageProps) {
  return (
    <div className='p-4 mx-auto max-w-screen-2xl'>
      <DashboardTitle title='Category'>Quản lý thông tin category của bạn 🌵</DashboardTitle>
      <CategoryList></CategoryList>
    </div>
  )
}
