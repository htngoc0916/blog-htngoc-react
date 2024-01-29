import { all, call, takeLatest } from 'redux-saga/effects'
import { getPost } from './postSlice'
import { handleGetPosts } from './postHandler'

export function* onGetPosts() {
  yield takeLatest(getPost.type, handleGetPosts)
}

export default function* PostSaga() {
  yield all([call(onGetPosts)])
}
