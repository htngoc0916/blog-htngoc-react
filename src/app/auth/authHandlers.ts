import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginRequest, RegisterRequest, User } from '~/types/user'
import { loginFailed, loginSuccess, logoutSuccess, registerSuccess, registerFailed } from './authSlice'
import { call, put } from 'redux-saga/effects'
import { removeToken, saveToken } from '~/utils/auth'
import authApi from '~/apis/authApi'
import { API_STATUS, ApiResponse, AuthResponse } from '~/types'

export default function* handleAuthRegister(action: PayloadAction<RegisterRequest>) {
  try {
    const response: ApiResponse<User> = yield call(authApi.authRegister, action.payload)
    if (response?.status && response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(registerSuccess(response.data))
      toast.success('Created new account successfully')
    }
  } catch (error) {
    console.log('🚀 ~ file: authHandlers.ts:18 ~ function*handleAuthRegister ~ error:', error)
    yield put(registerFailed())
    return
  }
}

function* handleAuthLogin(action: PayloadAction<LoginRequest>) {
  const { payload } = action
  try {
    const response: ApiResponse<AuthResponse> = yield call(authApi.login, payload)
    if (response?.status && response?.status.includes(API_STATUS.SUCCESS)) {
      const token = response.data?.accessToken
      const userInfoPayload = { email: payload.email, token }

      saveToken(token)
      const userInfo: ApiResponse<User> = yield call(authApi.authFetchMe, userInfoPayload)

      yield put(loginSuccess(userInfo.data))
    }
  } catch (error) {
    console.log('🚀 ~ file: authHandlers.ts:37 ~ function*handleAuthLogin ~ error:', error)
    yield put(loginFailed())
    return
  }
}

function* handleAuthLogOut() {
  yield put(logoutSuccess())
  removeToken()
}

export { handleAuthLogin, handleAuthRegister, handleAuthLogOut }
