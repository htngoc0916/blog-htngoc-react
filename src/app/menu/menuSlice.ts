import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Menu } from '~/types/menu'
import { RootState } from '../store'

export interface MenuState {
  loading: boolean
  menuList: Menu[]
  pulicMenus: Menu[]
  privateMenus: Menu[]
}

const initialState: MenuState = {
  loading: false,
  menuList: [],
  pulicMenus: [],
  privateMenus: []
}

const menuSlice = createSlice({
  name: 'menus',
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
      state.menuList = []
    },

    getPublicMenu(state) {
      state.loading = false
    },
    getPublicMenuSuccess(state, action: PayloadAction<Menu[]>) {
      state.loading = false
      state.pulicMenus = action.payload
    },
    getPublicMenuFailed(state) {
      state.loading = false
      state.pulicMenus = []
    },

    getPrivateMenu(state) {
      state.loading = false
    },
    getPrivateMenuSuccess(state, action: PayloadAction<Menu[]>) {
      state.loading = false
      state.privateMenus = action.payload
    },
    getPrivateMenuFailed(state) {
      state.loading = false
      state.privateMenus = []
    }
  }
})

export const {
  getMenu,
  getMenuFailed,
  getMenuSuccess,
  getPublicMenu,
  getPublicMenuFailed,
  getPublicMenuSuccess,
  getPrivateMenu,
  getPrivateMenuFailed,
  getPrivateMenuSuccess
} = menuSlice.actions
export const menuSelector = (state: RootState) => state.menus
export const menuListSelector = (state: RootState) => state.menus.menuList
export const pulicMenuSelector = (state: RootState) => state.menus.pulicMenus
export const privateMenuSelector = (state: RootState) => state.menus.privateMenus
export default menuSlice.reducer
