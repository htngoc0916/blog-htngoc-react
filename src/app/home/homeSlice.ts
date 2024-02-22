import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterPramsDTO, ListResponseDTO, PaginationResponseDTO, Post, defaultPagination, defaultFilter } from '~/types'
import { RootState } from '../store'

export interface HomeSate {
  loading: boolean
  filter: FilterPramsDTO
  newPostList: PostList
  allPostList: PostList
}

export interface PostList {
  data: Post[]
  paginaton: PaginationResponseDTO
}

const initialState: HomeSate = {
  loading: false,
  filter: { ...defaultFilter },
  newPostList: {
    data: [],
    paginaton: { ...defaultPagination }
  },
  allPostList: {
    data: [],
    paginaton: { ...defaultPagination }
  }
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchDataHome(state) {
      state.loading = true
    },
    fetchDataHomeSuccess(state) {
      state.loading = false
    },
    fetchDataHomeFailed(state) {
      state.loading = false
    },

    setNewPostListHome(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.newPostList = { data, paginaton: { ...paginationWithoutData } }
    },
    setAllPostListHome(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.allPostList = { data, paginaton: { ...paginationWithoutData } }
    }
  }
})

export const { fetchDataHome, fetchDataHomeSuccess, fetchDataHomeFailed, setNewPostListHome, setAllPostListHome } =
  homeSlice.actions

export const homeLoadingSelector = (satete: RootState) => state.home.loading
export const newPostListSelector = (state: RootState) => state.home.newPostList
export const allPostListSelector = (state: RootState) => state.home.allPostList

export default homeSlice.reducer
