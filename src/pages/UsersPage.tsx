import DashboardTitle from '~/components/common/DashboardTitle'
import { UserList } from '~/modules/user'

export interface UsersPageProps {}

export default function UsersPage() {
  return (
    <div className='p-4 mx-auto max-w-screen-2xl'>
      <DashboardTitle title='User'>Quản lý thông tin user của bạn 🎭</DashboardTitle>
      <UserList></UserList>
    </div>
  )
}
