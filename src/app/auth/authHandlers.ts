import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { LoginRequestDTO, RegisterRequestDTO, User } from '~/types'
import { loginFailed, loginSuccess, logoutSuccess, registerSuccess, registerFailed } from './authSlice'
import { call, put } from 'redux-saga/effects'
import { removeToken, saveToken } from '~/utils/auth'
import authApi from '~/apis/authApi'
import { API_STATUS, ApiResponseDTO, AuthResponseDTO } from '~/types'
import globalRouter from '~/utils/globalRouter'

function* handleAuthRegister(action: PayloadAction<RegisterRequestDTO>) {
  try {
    const response: ApiResponseDTO<User> = yield call(authApi.authRegister, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(registerSuccess(response.data))
      return toast.success(response?.message)
    }
    return toast.error(response.message)
  } catch (error: any) {
    console.log(error?.response?.data.message)
    yield put(registerFailed())
    toast.error(error?.response?.data.message)
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
      return toast.success(response?.message)
    }
    return toast.error(response.message)
  } catch (error: any) {
    console.log(error?.response?.data.message)
    yield put(loginFailed())
    toast.error(error?.response?.data.message)
  }
}

function* handleAuthLogOut() {
  yield put(logoutSuccess())
  removeToken()
  if (globalRouter.navigate) {
    globalRouter.navigate('/login')
  }
}

export { handleAuthLogin, handleAuthRegister, handleAuthLogOut }
