import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '~/app/auth/authSlice'

export const reducer = combineReducers({
  auth: authReducer
})
