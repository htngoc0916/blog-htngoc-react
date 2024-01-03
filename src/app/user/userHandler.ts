import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, FetchUserDTO, ListResponseDTO, User } from '~/types'
import { getUserFailed, getUserSuccess } from './userSlice'
import userApi from '~/apis/userApi'

function* handleGetUsers(action: PayloadAction<FetchUserDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<User[]>> = yield call(userApi.getAllUsers, action.payload)
    console.log('🚀 ~ file: userHandler.ts:11 ~ function*handleGetUsers ~ response:', response)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getUserSuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getUserFailed())
  }
}

export { handleGetUsers }
