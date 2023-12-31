import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultPagination, defaultFilter, FilterPramsDTO, PaginationResponseDTO, ListResponseDTO, Tag } from '~/types'
import { RootState } from '../store'

export interface TagSate {
  loading: boolean
  tagList: Tag[]
  pagination: PaginationResponseDTO
  filter: FilterPramsDTO
}
const initialState: TagSate = {
  loading: false,
  tagList: [],
  pagination: { ...defaultPagination },
  filter: { ...defaultFilter }
}

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    getTag(state, action: PayloadAction<FilterPramsDTO>) {
      console.log('🚀 ~ file: tagSlice.ts:23 ~ getTag ~ action:', action)
      state.loading = true
      state.tagList = []
    },
    getTagSuccess(state, action: PayloadAction<ListResponseDTO<Tag[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.loading = false
      state.tagList = data
      state.pagination = paginationWithoutData
    },
    getTagFailed(state) {
      state.loading = false
      state.tagList = []
    },

    setTagFilter(state, action: PayloadAction<FilterPramsDTO>) {
      state.filter = action.payload
    },
    setSearchWithDebounce(state, action: PayloadAction<FilterPramsDTO>) {
      console.log('🚀 ~ file: tagSlice.ts:42 ~ state:', state, action)
    }
  }
})

export const { getTag, getTagFailed, getTagSuccess, setTagFilter, setSearchWithDebounce } = tagSlice.actions

export const TagLoadingSelector = (state: RootState) => state.tags.loading
export const TagListSelector = (state: RootState) => state.tags.tagList
export const TagFilterSelector = (state: RootState) => state.tags.filter
export const TagPaginationSelector = (state: RootState) => state.tags.pagination

export default tagSlice.reducer
