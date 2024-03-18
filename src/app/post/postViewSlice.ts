import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, Comment, PostList, defaultPagination, ListResponseDTO, PostMeta } from '~/types'
import { RootState } from '../store'

export interface PostViewSate {
  loading: boolean
  postViewDetail?: Post
  postMetaList?: PostMeta[]
  postViewRelates?: PostList
  postViewComments?: Comment[]
}

const initialState: PostViewSate = {
  loading: false,
  postViewDetail: undefined,
  postMetaList: [],
  postViewComments: [],
  postViewRelates: {
    data: [],
    paginaton: { ...defaultPagination }
  }
}

const postViewSlice = createSlice({
  name: 'postView',
  initialState,
  reducers: {
    fetchDataPostView(state, _action: PayloadAction<string>) {
      state.loading = true
      state.postMetaList = []
      state.postViewDetail = undefined
    },
    fetchDataPostViewSuccess(state) {
      state.loading = false
    },
    fetchDataPostViewFailed(state) {
      state.loading = false
    },
    setPostViewDetail(state, action: PayloadAction<Post>) {
      state.postViewDetail = action.payload
      state.postMetaList = action.payload.postMetas
    },
    setPostRelates(state, action: PayloadAction<ListResponseDTO<Post[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.postViewRelates = { data, paginaton: { ...paginationWithoutData } }
    },
    setPostViewComments(state, action: PayloadAction<Comment[]>) {
      state.postViewComments = action.payload
    }
  }
})

export const {
  fetchDataPostView,
  fetchDataPostViewFailed,
  fetchDataPostViewSuccess,
  setPostViewDetail,
  setPostViewComments,
  setPostRelates
} = postViewSlice.actions

export const postViewLoadingSelector = (state: RootState) => state.postView.loading
export const postViewMetaSelector = (state: RootState) => state.postView.postMetaList
export const postViewDetailSelector = (state: RootState) => state.postView.postViewDetail
export const postViewCommentSelector = (state: RootState) => state.postView.postViewComments
export const postViewRelateSelector = (state: RootState) => state.postView.postViewRelates

export default postViewSlice.reducer
