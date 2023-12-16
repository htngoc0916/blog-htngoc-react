import { createSlice } from '@reduxjs/toolkit'
import { Category } from '~/types'

export interface CategorySate {
  loading: boolean
  list: Category[]
}

const initialState: CategorySate = {
  loading: false,
  list: []
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {}
})
