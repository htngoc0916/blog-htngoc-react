import { all, call, put, takeLatest } from 'redux-saga/effects'
import { homeActions } from './homeSlice'

export function* fetchHomeData() {
  try {
    yield all([call(fetchNewPostList), call(fetchAllPostList)])

    yield put(homeActions.fetchDataSuccess())
  } catch (error) {
    console.log('Failed to fetch dashboard data', error)
    yield put(homeActions.fetchDataFailed())
  }
}

export default function* homeSage() {
  yield takeLatest(homeActions.fetchData.type, fetchHomeData)
}
