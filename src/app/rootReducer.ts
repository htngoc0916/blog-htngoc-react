// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import authSlice from './auth/authSlice'
import darkModeSlice from './darkMode/darkModeSlice'
import menuSlice from './menu/menuSlice'
import categorySlice from './category/categorySlice'
import tagSlice from './tag/tagSlice'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  darkMode: darkModeSlice,
  menus: menuSlice,
  categories: categorySlice,
  tags: tagSlice
})

export default rootReducer
