import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginRequest, RegisterRequest, User } from '~/types/user'
import { loginFailed, loginSuccess, logoutSuccess } from './authSlice'
import { call, put } from 'redux-saga/effects'
import { removeToken, saveToken } from '~/utils/auth'
import authApi from '~/apis/authApi'
import { API_STATUS, ApiResponse, AuthResponse } from '~/types'

export default function* handleAuthRegister(payload: PayloadAction<RegisterRequest>) {
  //   try {
  //     const response = yield call(requestAuthRegister, payload)
  //     if (response.status === 201) {
  //       toast.success('Created new account successfully')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
}

function* handleAuthLogin(action: PayloadAction<LoginRequest>) {
  const { payload } = action
  try {
    const response: ApiResponse<AuthResponse> = yield call(authApi.login, payload)
    console.log(response)
    if (response?.status && response?.status.includes(API_STATUS.SUCCESS)) {
      const token = response.data?.accessToken
      const userInfoPayload = { email: payload.email, token }
      saveToken(token)
      const userInfo: ApiResponse<User> = yield call(authApi.authFetchMe, userInfoPayload)
      console.log(userInfo)
      //   yield put(loginSuccess(response.user))
    }
  } catch (error) {
    console.log(error)
    yield put(loginFailed('Login failed!'))
    // toast.error(error)
    return
  }
}

function* handleAuthLogOut() {
  yield put(logoutSuccess())
  removeToken()
}

export { handleAuthLogin, handleAuthRegister, handleAuthLogOut }
