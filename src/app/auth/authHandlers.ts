import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginRequestDTO, LogoutRequestDTO, RegisterRequestDTO, User } from '~/types'
import { loginFailed, loginSuccess, logoutSuccess, registerSuccess, registerFailed } from './authSlice'
import { call, put } from 'redux-saga/effects'
import { removeToken, saveToken } from '~/utils/auth'
import authApi from '~/apis/authApi'
import { API_STATUS, ApiResponseDTO, AuthResponseDTO } from '~/types'

function* handleAuthRegister(action: PayloadAction<RegisterRequestDTO>) {
  try {
    const response: ApiResponseDTO<User> = yield call(authApi.authRegister, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(registerSuccess(response.data))
      return toast.success('Created new account successfully!')
    }
    toast.error(response.message)
  } catch (error) {
    yield put(registerFailed())
    toast.success('Created new account failed!')
  }
}

function* handleAuthLogin(action: PayloadAction<LoginRequestDTO>) {
  const { payload } = action
  try {
    const response: ApiResponseDTO<AuthResponseDTO> = yield call(authApi.authLogin, payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      const { accessToken, refreshToken } = response.data
      saveToken(accessToken, refreshToken)
      const userInfo: User = { ...response.data }
      yield put(loginSuccess(userInfo))
      return toast.success('login successfully!')
    }
    toast.error(response.message)
  } catch (error) {
    yield put(loginFailed())
    toast.error('login faild!')
  }
}

function* handleAuthLogOut(action: PayloadAction<LogoutRequestDTO>) {
  const { payload } = action
  yield put(logoutSuccess())
  removeToken()
  payload.navigate('/login')
}

export { handleAuthLogin, handleAuthRegister, handleAuthLogOut }
