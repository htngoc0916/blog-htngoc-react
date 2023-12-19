import { all, call, takeLatest } from 'redux-saga/effects'
import { getMenu, getPublicMenu, getPrivateMenu } from './menuSlice'
import { handleGetMemus, handleGetPublicMenu, handleGetPrivateMenu } from './menuHandlers'

export function* onGetMenu() {
  yield takeLatest(getMenu.type, handleGetMemus)
}
export function* onGetPublicMenu() {
  yield takeLatest(getPublicMenu.type, handleGetPublicMenu)
}
export function* onGetPrivateMenu() {
  yield takeLatest(getPrivateMenu.type, handleGetPrivateMenu)
}

export default function* menuSaga() {
  yield all([call(onGetMenu), call(onGetPublicMenu), call(onGetPrivateMenu)])
}
