import { call, put } from 'redux-saga/effects'
import { getCategoryFailed, getCategorySuccess } from './categorySlice'
import { API_STATUS, ApiResponseDTO, Category } from '~/types'
import categoryApi from '~/apis/categoryApi'

function* handleGetCategories() {
  try {
    const response: ApiResponseDTO<Category[]> = yield call(categoryApi.getAllCategories)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getCategorySuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getCategoryFailed())
  }
}

export { handleGetCategories }
