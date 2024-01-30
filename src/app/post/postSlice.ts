import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultPagination, defaultFilter, FilterPramsDTO, PaginationResponseDTO, ListResponseDTO, Post } from '~/types'
import { RootState } from '../store'

export interface PostState {
  loading: boolean
  postList: Post[]
  pagination: PaginationResponseDTO
  filter: FilterPramsDTO
}

const initialState: PostState = {
  loading: false,
  postList: [],
  pagination: { ...defaultPagination },
  filter: { ...defaultFilter }
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPost(state, action: PayloadAction<FilterPramsDTO>) {
      console.log('🚀 ~ getPost ~ action:', action.type)
      state.loading = true
    },
    getPostSuccess(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.loading = false
      state.postList = data
      state.pagination = paginationWithoutData
    },
    getPostFailed(state) {
      state.loading = false
      state.postList = []
    },
    setPostFilter(state, action: PayloadAction<FilterPramsDTO>) {
      state.filter = action.payload
    }
  }
})

export const { getPost, getPostFailed, getPostSuccess, setPostFilter } = postSlice.actions

export const postLoadingSelector = (state: RootState) => state.posts.loading
export const postListSelector = (state: RootState) => state.posts.postList
export const postFilterSelector = (state: RootState) => state.posts.filter
export const postPaginationSelector = (state: RootState) => state.posts.pagination

export default postSlice.reducer
