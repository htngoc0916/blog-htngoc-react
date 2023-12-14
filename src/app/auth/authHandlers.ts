import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginRequest, RegisterRequest, User } from '~/types/user'
import { loginFailed, loginSuccess, logoutSuccess, registerSuccess, registerFailed } from './authSlice'
import { call, put } from 'redux-saga/effects'
import { removeToken, saveToken } from '~/utils/auth'
import authApi from '~/apis/authApi'
import { API_STATUS, ApiResponseDTO, AuthResponseDTO } from '~/types'

export default function* handleAuthRegister(action: PayloadAction<RegisterRequest>) {
  try {
    const response: ApiResponseDTO<User> = yield call(authApi.authRegister, action.payload)
    if (response?.status && response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(registerSuccess(response.data))
      toast.success('Created new account successfully!')
    }
    console.log(response.message)
    toast.error('Created new account failed!')
  } catch (error) {
    yield put(registerFailed())
  }
}

function* handleAuthLogin(action: PayloadAction<LoginRequest>) {
  const { payload } = action
  try {
    const response: ApiResponseDTO<AuthResponseDTO> = yield call(authApi.login, payload)
    if (response?.status && response?.status.includes(API_STATUS.SUCCESS)) {
      const { accessToken, refreshToken } = response.data
      saveToken(accessToken, refreshToken)
      const userInfo: User = { ...response.data }

      yield put(loginSuccess(userInfo))

      toast.success('login successfully!')
    }
  } catch (error) {
    yield put(loginFailed())
  }
}

function* handleAuthLogOut() {
  yield put(logoutSuccess())
  removeToken()
}

export { handleAuthLogin, handleAuthRegister, handleAuthLogOut }
