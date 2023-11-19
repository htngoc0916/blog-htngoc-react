import DashboardTitle from '~/components/common/DashboardTitle'
import { Category } from '~/modules/category'

export interface ICategotyPageProps {}

export default function CategotyPage() {
  return (
    <div className='p-4 mx-auto max-w-screen-2xl'>
      <DashboardTitle title='Category'>Quản lý thông tin category của bạn 🌵</DashboardTitle>
      <Category></Category>
    </div>
  )
}
