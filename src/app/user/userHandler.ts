import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, FilterPramsDTO, ListResponseDTO, User } from '~/types'
import { getUserFailed, getUserSuccess } from './userSlice'
import userApi from '~/apis/userApi'

function* handleGetUsers(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<User[]>> = yield call(userApi.getAllUsers, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getUserSuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getUserFailed())
  }
}

export { handleGetUsers }
