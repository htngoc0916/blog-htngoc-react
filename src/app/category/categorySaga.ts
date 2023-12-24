import { call, all, takeLatest } from 'redux-saga/effects'
import { getCategory } from './categorySlice'
import { handleGetCategories } from './categoryHandlers'

export function* onGetCategories() {
  yield takeLatest(getCategory.type, handleGetCategories)
}

export default function* categorySaga() {
  yield all([call(onGetCategories)])
}
