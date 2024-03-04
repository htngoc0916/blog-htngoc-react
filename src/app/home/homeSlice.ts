import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterPramsDTO, ListResponseDTO, Post, defaultPagination, defaultFilter, Category, PostList } from '~/types'
import { RootState } from '../store'

export interface HomeSate {
  loading: boolean
  filter: FilterPramsDTO
  hotPostList: Post[]
  allPostList: PostList
  categoryList: Category[]
}

const initialState: HomeSate = {
  loading: false,
  filter: { ...defaultFilter, usedYn: 'Y' },
  hotPostList: [],
  allPostList: {
    data: [],
    paginaton: { ...defaultPagination }
  },
  categoryList: []
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

    setCategoryList(state, action: PayloadAction<ListResponseDTO<Category[]>>) {
      const { data } = action.payload
      const categories: Category = {
        id: 0,
        categoryName: 'All'
      }
      state.categoryList = [categories, ...data]
    },
    setHotPostListHome(state, action: PayloadAction<Post[]>) {
      state.hotPostList = action.payload
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
      const mergeData = [...state.allPostList.data, ...data]

      state.allPostList = { data: mergeData, paginaton: { ...paginationWithoutData } }
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
  loadmoreAllPostListSuccess,
  setCategoryList
} = homeSlice.actions

export const homeLoadingSelector = (state: RootState) => state.home.loading
export const homeFilterSelector = (state: RootState) => state.home.filter
export const homeHotPostSelector = (state: RootState) => state.home.hotPostList
export const homeAllPostListSelector = (state: RootState) => state.home.allPostList
export const homeCategorySelector = (state: RootState) => state.home.categoryList

export default homeSlice.reducer
