import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'
import { LoginRequestDTO, LogoutRequestDTO, RefreshTokenDTO, RegisterRequestDTO, User } from '~/types'

export interface AuthState {
  loading: boolean
  isAuthenticated: boolean
  userInfo?: User
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  userInfo: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action: PayloadAction<LoginRequestDTO>) {
      console.log('🚀 ~ loginStart ~ action:', action.type)
      state.loading = true
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false
      state.isAuthenticated = true
      state.userInfo = action.payload
    },
    loginFailed(state) {
      state.loading = false
    },
    logoutStart(state, action: PayloadAction<LogoutRequestDTO>) {
      console.log('🚀 ~ logoutStart ~ action:', action.type)
      state.loading = true
    },
    logoutSuccess(state) {
      state.isAuthenticated = false
      state.userInfo = undefined
      state.loading = false
    },
    registerStart(state, action: PayloadAction<RegisterRequestDTO>) {
      console.log(action)
      state.loading = true
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true
      state.loading = false
      state.userInfo = action.payload
    },
    registerFailed(state) {
      state.isAuthenticated = false
      state.loading = false
      state.userInfo = undefined
    },
    refreshTokenStart(state, action: PayloadAction<RefreshTokenDTO>) {
      console.log(action)
      state.loading = true
    },
    refreshTokenSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true
      state.loading = false
      state.userInfo = action.payload
    },
    refreshTokenFailed(state) {
      state.isAuthenticated = false
      state.loading = false
      state.userInfo = undefined
    }
  }
})

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailed
} = authSlice.actions
export const authSelector = (state: RootState) => state.auth

export const userInfoSelector = (state: RootState) => state.auth.userInfo
export const loadingSelector = (state: RootState) => state.auth.loading
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated
export default authSlice.reducer
