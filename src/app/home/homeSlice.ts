import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterPramsDTO, ListResponseDTO, PaginationResponseDTO, Post, defaultPagination, defaultFilter } from '~/types'
import { RootState } from '../store'

export interface HomeSate {
  loading: boolean
  filter: FilterPramsDTO
  hotPostList: PostList
  allPostList: PostList
}

export interface PostList {
  data: Post[]
  paginaton: PaginationResponseDTO
}

const initialState: HomeSate = {
  loading: false,
  filter: { ...defaultFilter },
  hotPostList: {
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
    fetchDataHome(state, _action: PayloadAction<FilterPramsDTO>) {
      state.loading = true
    },
    fetchDataHomeSuccess(state) {
      state.loading = false
    },
    fetchDataHomeFailed(state) {
      state.loading = false
    },

    setHotPostListHome(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.hotPostList = { data, paginaton: { ...paginationWithoutData } }
    },
    setAllPostListHome(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.allPostList = { data, paginaton: { ...paginationWithoutData } }
    },

    loadmoreAllPostList(state, _action: PayloadAction<FilterPramsDTO>) {
      state.loading = true
    },
    loadmoreAllPostListSuccess(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.allPostList = { data, paginaton: { ...paginationWithoutData } }
      state.loading = false
    },
    loadmoreAllPostListFailed(state) {
      state.loading = false
    }
  }
})

export const {
  fetchDataHome,
  fetchDataHomeSuccess,
  fetchDataHomeFailed,
  setHotPostListHome,
  setAllPostListHome,
  loadmoreAllPostList,
  loadmoreAllPostListFailed,
  loadmoreAllPostListSuccess
} = homeSlice.actions

export const homeLoadingSelector = (state: RootState) => state.home.loading
export const homeHotPostSelector = (state: RootState) => state.home.hotPostList
export const homeAllPostListSelector = (state: RootState) => state.home.allPostList
export const homeFilterSelector = (state: RootState) => state.home.filter

export default homeSlice.reducer
