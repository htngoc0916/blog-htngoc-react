import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'
import { RefreshTokenDTO } from '~/types'
import { LoginRequestDTO, RegisterRequestDTO, User } from '~/types'

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
    login(state, action: PayloadAction<LoginRequestDTO>) {
      console.log(action)
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

    logout(state) {
      state.loading = true
    },

    logoutSuccess(state) {
      state.isAuthenticated = false
      state.userInfo = undefined
      state.loading = false
    },

    register(state, action: PayloadAction<RegisterRequestDTO>) {
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
    authRefreshToken(state, payload: PayloadAction<RefreshTokenDTO>) {
      console.log(state, payload)
    }
  }
})

export const {
  login,
  loginFailed,
  loginSuccess,
  logout,
  logoutSuccess,
  register,
  registerSuccess,
  registerFailed,
  authRefreshToken
} = authSlice.actions
export const authSelector = (state: RootState) => state.auth

export const userInfoSelector = (state: RootState) => state.auth.userInfo
export const loadingSelector = (state: RootState) => state.auth.loading
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated
export default authSlice.reducer
