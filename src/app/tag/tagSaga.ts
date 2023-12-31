import { all, call, takeLatest } from 'redux-saga/effects'
import { getTag } from './tagSlice'
import { handleGetTags } from './tagHandlers'

export function* onGetTags() {
  yield takeLatest(getTag.type, handleGetTags)
}

export default function* tagSaga() {
  yield all([call(onGetTags)])
}
