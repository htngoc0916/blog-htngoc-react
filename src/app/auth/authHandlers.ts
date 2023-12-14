import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginRequestDTO, RefreshTokenDTO, RegisterRequestDTO, User } from '~/types'
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
      toast.success('Created new account successfully!')
    }
    console.log(response.message)
    toast.error('Created new account failed!')
  } catch (error) {
    yield put(registerFailed())
  }
}

function* handleAuthLogin(action: PayloadAction<LoginRequestDTO>) {
  const { payload } = action
  try {
    const response: ApiResponseDTO<AuthResponseDTO> = yield call(authApi.login, payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
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

function* handleAuthRefreshToken(action: PayloadAction<RefreshTokenDTO>) {
  const { payload } = action
  try {
    const response: ApiResponseDTO<AuthResponseDTO> = yield call(authApi.authRefreshToken, payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      const { accessToken, refreshToken } = response.data
      saveToken(accessToken, refreshToken)

      const userInfo: User = { ...response.data }
      yield put(loginSuccess(userInfo))
    }
  } catch (error) {
    console.log(error)
  }
}

function* handleAuthLogOut() {
  yield put(logoutSuccess())
  removeToken()
}

export { handleAuthLogin, handleAuthRegister, handleAuthLogOut, handleAuthRefreshToken }
