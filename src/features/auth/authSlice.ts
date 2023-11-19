import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '~/app/store'
import { User } from '~/types/user'

export interface LoginPayload {
  userName: string
  password: string
}

export interface AuthState {
  logging?: boolean
  isLogged: boolean
  userInfo?: User
}

const initialState: AuthState = {
  logging: false,
  isLogged: false,
  userInfo: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      console.log(action)
      state.logging = true
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = true
      state.isLogged = true
      state.userInfo = action.payload
    },

    loginFailed(state, action: PayloadAction<string>) {
      console.log(action)
      state.logging = false
    },

    logout(state) {
      state.isLogged = false
      state.logging = false
      state.userInfo = undefined
    }
  }
})

export const { login, loginFailed, loginSuccess, logout } = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer
