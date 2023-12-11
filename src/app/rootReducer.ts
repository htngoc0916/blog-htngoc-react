import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '~/features/auth/authSlice'

export const reducer = combineReducers({
  auth: authReducer
})
