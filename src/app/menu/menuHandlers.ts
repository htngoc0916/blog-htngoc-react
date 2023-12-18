import { getMenuFailed, getMenuSuccess } from './menuSlice'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO } from '~/types'
import { Menu } from '~/types/menu'
import menuApi from '~/apis/menuApi'

function* handleGetMemus() {
  try {
    const response: ApiResponseDTO<Menu[]> = yield call(menuApi.getAllMenus)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getMenuSuccess(response.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getMenuFailed())
  }
}

export { handleGetMemus }
