import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchDataPostView, fetchDataPostViewFailed, fetchDataPostViewSuccess } from './postViewSlice'
import { handleFetchDataPostView, handleFetchPostComments, handleFetchRelatedPosts } from './postViewHandler'

function* onFetchDataPostView(action: PayloadAction<string>) {
  try {
    yield all([
      call(handleFetchDataPostView, action),
      call(handleFetchPostComments, action),
      call(handleFetchRelatedPosts, action)
    ])

    yield put(fetchDataPostViewSuccess())
  } catch (error) {
    console.log('Failed to fetch postview data', error)
    yield put(fetchDataPostViewFailed())
  }
}

export default function* postViewSaga() {
  yield takeLatest(fetchDataPostView, onFetchDataPostView)
}
