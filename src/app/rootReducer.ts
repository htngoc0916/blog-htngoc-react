import { combineReducers } from '@reduxjs/toolkit'
import authSlice from '~/features/auth/authSlice'

export const reducer = combineReducers({
  auth: authSlice
})
