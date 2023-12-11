import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'
import { LoginRequest, User } from '~/types/user'

export interface AuthState {
  isLogging?: boolean
  isAuthenticated: boolean
  userInfo?: User
}

const initialState: AuthState = {
  isLogging: false,
  isAuthenticated: false,
  userInfo: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginRequest>) {
      console.log(action)
      state.isLogging = true
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.isLogging = true
      state.isAuthenticated = true
      state.userInfo = action.payload
    },

    loginFailed(state, action: PayloadAction<string>) {
      console.log(action)
      state.isLogging = false
    },

    logout(state) {
      state.isAuthenticated = false
      state.isLogging = false
      state.userInfo = undefined
    }
  }
})

export const { login, loginFailed, loginSuccess, logout } = authSlice.actions
export const authSelector = (state: RootState) => state.auth

export const userInfoSelector = (state: RootState) => state.auth.userInfo
export const isLoggingSelector = (state: RootState) => state.auth.isLogging
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated
export default authSlice.reducer
