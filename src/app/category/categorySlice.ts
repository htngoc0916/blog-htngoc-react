import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Category,
  defaultPagination,
  defaultFilter,
  FilterPramsDTO,
  PaginationResponseDTO,
  ListResponseDTO
} from '~/types'
import { RootState } from '../store'

export interface CategorySate {
  loading: boolean
  categoryList: Category[]
  pagination: PaginationResponseDTO
  filter: FilterPramsDTO
}

const initialState: CategorySate = {
  loading: false,
  categoryList: [],
  pagination: { ...defaultPagination },
  filter: { ...defaultFilter }
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategory(state, action: PayloadAction<FilterPramsDTO>) {
      state.loading = true
      state.categoryList = []
    },
    getCategorySuccess(state, action: PayloadAction<ListResponseDTO<Category[]>>) {
      const { data, ...paginationWithoutData } = action.payload
      state.loading = false
      state.categoryList = data
      state.pagination = paginationWithoutData
    },
    getCategoryFailed(state) {
      state.loading = false
      state.categoryList = []
    },

    setCategoryFilter(state, action: PayloadAction<FilterPramsDTO>) {
      state.filter = action.payload
    },
    setSearchWithDebounce(state, action: PayloadAction<FilterPramsDTO>) {
      console.log('🚀 ~ file: categorySlice.ts:39 ~ setSearchWithDebounce ~ action:', state, action)
    }
  }
})

export const { getCategory, getCategoryFailed, getCategorySuccess, setCategoryFilter, setSearchWithDebounce } =
  categorySlice.actions

export const categoryLoadingSelector = (state: RootState) => state.categories.loading
export const categoryListSelector = (state: RootState) => state.categories.categoryList
export const categoryFilterSelector = (state: RootState) => state.categories.filter
export const categoryPaginationSelector = (state: RootState) => state.categories.pagination

export default categorySlice.reducer
