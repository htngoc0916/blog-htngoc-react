import { call, put } from 'redux-saga/effects'
import { getCategoryFailed, getCategorySuccess } from './categorySlice'
import { API_STATUS, ApiResponseDTO, Category, FilterPramsDTO, ListResponseDTO } from '~/types'
import categoryApi from '~/apis/categoryApi'
import { PayloadAction } from '@reduxjs/toolkit'

function* handleGetCategories(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Category[]>> = yield call(
      categoryApi.getAllCategories,
      action.payload
    )
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getCategorySuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getCategoryFailed())
  }
}

export { handleGetCategories }
