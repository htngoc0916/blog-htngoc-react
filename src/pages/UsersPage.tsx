import { Pagination } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userApi from '~/apis/userApi'
import { useAppSelector } from '~/app/hooks'
import { UserFilterSelector, UserListSelector, UserPaginationSelector, getUser } from '~/app/user/userSlice'
import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import { UserList } from '~/modules/user'
import UserDetail from '~/modules/user/UserDetail'
import UserFilter from '~/modules/user/UserFilter'
import { API_STATUS, ApiResponseDTO, FilterPramsDTO, User } from '~/types'
import { REMOVE_SUCCESS } from '~/utils/message'

export interface UsersPageProps {}

export default function UsersPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filter = useAppSelector(UserFilterSelector)
  const userList = useAppSelector(UserListSelector)
  const pagination = useAppSelector(UserPaginationSelector)

  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

  const onPageChange = (page: number) => {
    dispatch(
      getUser({
        filter: { ...filter, pageNo: page },
        navigate
      })
    )
  }

  const handleAddUser = () => {
    setSelectedUser(undefined)
    setIsUserDetailOpen(true)
  }

  const handleEditUser = useCallback(async (user: User) => {
    setIsUserDetailOpen(true)
    try {
      const response: ApiResponseDTO<User> = await userApi.getUserInfo(user?.id || 0, navigate)
      if (response?.status.includes(API_STATUS.SUCCESS)) {
        setSelectedUser(response.data)
      }
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }, [])

  const handleSearchUser = useCallback(
    (filter: FilterPramsDTO) => {
      dispatch(getUser({ filter, navigate }))
    },
    [dispatch, navigate]
  )

  const hanldeCloseUserDetail = useCallback(() => {
    setIsUserDetailOpen(false)
  }, [])

  const handleSaveUser = useCallback(() => {
    dispatch(getUser({ filter, navigate }))
  }, [])

  const handleRemoveUser = useCallback(async (user: User) => {
    try {
      const response: ApiResponseDTO<null> = await userApi.removeUser(user?.id || 0, navigate)
      if (response?.status.includes(API_STATUS.FAILED)) {
        return toast.error(response.message)
      }
      toast.success(REMOVE_SUCCESS)
      dispatch(getUser({ filter, navigate }))
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }, [])

  useEffect(() => {
    dispatch(getUser({ filter, navigate }))
  }, [])

  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Users'>Quản lý thông tin user của bạn 🎭</DashboardTitle>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'>
          <div id='Users-list' className='flex flex-wrap items-center justify-start gap-3 mb-6'>
            <UserFilter filter={filter} onSeach={handleSearchUser}></UserFilter>
            <ActionAdd onClick={handleAddUser}></ActionAdd>
          </div>
          <div className='flex-1 overflow-x-auto'>
            <UserList data={userList} onEditUser={handleEditUser} onRemoveUser={handleRemoveUser}></UserList>
          </div>
          <div className='flex items-center justify-center mt-10'>
            <Pagination
              layout='pagination'
              currentPage={pagination.pageNo}
              totalPages={pagination.totalPage}
              onPageChange={onPageChange}
              previousLabel='Prev'
              nextLabel='Next'
              showIcons
            />
          </div>
        </div>

        {isUserDetailOpen && (
          <UserDetail
            data={selectedUser}
            onCloseUser={hanldeCloseUserDetail}
            onSaveUser={handleSaveUser}
            className='relative order-1 bg-white xl:w-[550px] rounded-xl dark:bg-darkbg3 xl:order-2 w-full px-4 py-6'
          ></UserDetail>
        )}
      </div>
    </div>
  )
}
