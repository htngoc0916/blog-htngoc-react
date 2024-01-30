import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  defaultPagination,
  defaultFilter,
  FilterPramsDTO,
  PaginationResponseDTO,
  ListResponseDTO,
  User,
  FetchUserDTO
} from '~/types'
import { RootState } from '../store'

export interface UserSate {
  loading: boolean
  userList: User[]
  pagination: PaginationResponseDTO
  filter: FilterPramsDTO
}

const initialState: UserSate = {
  loading: false,
  userList: [],
  pagination: { ...defaultPagination },
  filter: { ...defaultFilter, sortDir: 'ASC' }
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<FetchUserDTO>) {
      console.log('🚀 ~ getUser ~ action:', action.type)
      state.loading = true
      // state.userList = []
    },
    getUserSuccess(state, action: PayloadAction<ListResponseDTO<User[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.loading = false
      state.userList = data
      state.pagination = paginationWithoutData
    },
    getUserFailed(state) {
      state.loading = false
      state.userList = []
    },

    setUserFilter(state, action: PayloadAction<FilterPramsDTO>) {
      state.filter = action.payload
    }
  }
})

export const { getUser, getUserFailed, getUserSuccess, setUserFilter } = userSlice.actions

export const UserLoadingSelector = (state: RootState) => state.users.loading
export const UserListSelector = (state: RootState) => state.users.userList
export const UserFilterSelector = (state: RootState) => state.users.filter
export const UserPaginationSelector = (state: RootState) => state.users.pagination

export default userSlice.reducer
