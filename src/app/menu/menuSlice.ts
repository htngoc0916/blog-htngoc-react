import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Menu } from '~/types/menu'
import { RootState } from '../store'

export interface MenuState {
  loading: boolean
  menuList: Menu[]
}

const initialState: MenuState = {
  loading: false,
  menuList: []
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getMenu(state) {
      state.loading = true
    },
    getMenuSuccess(state, action: PayloadAction<Menu[]>) {
      state.loading = false
      state.menuList = action.payload
    },
    getMenuFailed(state) {
      state.loading = false
    }
  }
})

export const { getMenu, getMenuFailed, getMenuSuccess } = menuSlice.actions
export const menuSelector = (state: RootState) => state.menu
export const menuListSeclector = (state: RootState) => state.menu.menuList
export default menuSlice.reducer
