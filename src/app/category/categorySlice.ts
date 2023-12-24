import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '~/types'
import { RootState } from '../store'

export interface CategorySate {
  loading: boolean
  categoryList?: Category[]
}

const initialState: CategorySate = {
  loading: false,
  categoryList: []
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategory(state) {
      state.loading = true
      state.categoryList = []
    },
    getCategorySuccess(state, action: PayloadAction<Category[]>) {
      state.loading = false
      state.categoryList = action.payload
    },
    getCategoryFailed(state) {
      state.loading = false
      state.categoryList = []
    }
  }
})

export const { getCategory, getCategoryFailed, getCategorySuccess } = categorySlice.actions

export const categorySelector = (state: RootState) => state.categories
export const categoryLoadingSelector = (state: RootState) => state.categories.loading
export const categoryListSelector = (state: RootState) => state.categories.categoryList

export default categorySlice.reducer
