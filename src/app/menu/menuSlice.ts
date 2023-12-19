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
export const menuSelector = (state: RootState) => state.menu
export const menuListSelector = (state: RootState) => state.menu.menuList
export const pulicMenuSelector = (state: RootState) => state.menu.pulicMenus
export const privateMenuSelector = (state: RootState) => state.menu.privateMenus
export default menuSlice.reducer
