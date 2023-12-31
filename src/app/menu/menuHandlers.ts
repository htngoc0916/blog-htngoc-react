import {
  getMenuFailed,
  getMenuSuccess,
  getPrivateMenuFailed,
  getPrivateMenuSuccess,
  getPublicMenuFailed,
  getPublicMenuSuccess
} from './menuSlice'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO } from '~/types'
import { MENU_CODE, Menu } from '~/types/menu'
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

function* handleGetPublicMenu() {
  try {
    const response: ApiResponseDTO<Menu[]> = yield call(menuApi.getAllMenuByCode, MENU_CODE.PUBLIC)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getPublicMenuSuccess(response.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getPublicMenuFailed())
  }
}

function* handleGetPrivateMenu() {
  try {
    const response: ApiResponseDTO<Menu[]> = yield call(menuApi.getAllMenuByCode, MENU_CODE.PRIVATE)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getPrivateMenuSuccess(response.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getPrivateMenuFailed())
  }
}

export { handleGetMemus, handleGetPrivateMenu, handleGetPublicMenu }
