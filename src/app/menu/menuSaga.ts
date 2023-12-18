import { all, call, takeLatest } from 'redux-saga/effects'
import { getMenu } from './menuSlice'
import { handleGetMemus } from './menuHandlers'

export function* onGetMenu() {
  yield takeLatest(getMenu.type, handleGetMemus)
}

export default function* menuSaga() {
  yield all([call(onGetMenu)])
}
