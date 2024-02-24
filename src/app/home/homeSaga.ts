import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchDataHome, fetchDataHomeFailed, fetchDataHomeSuccess, loadmoreAllPostList } from './homeSlice'
import { FilterPramsDTO } from '~/types'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  handleFetchAllPostList,
  handleFetchHotPostList,
  handleLoadmoreAllPostList,
  handleFetchAllCategoryList
} from './homeHandler'

function* onFetchHomeData(action: PayloadAction<FilterPramsDTO>) {
  try {
    yield all([
      call(handleFetchHotPostList, action),
      call(handleFetchAllPostList, action),
      call(handleFetchAllCategoryList, action)
    ])

    yield put(fetchDataHomeSuccess())
  } catch (error) {
    console.log('Failed to fetch dashboard data', error)
    yield put(fetchDataHomeFailed())
  }
}

function* runFetchDataHome() {
  yield takeLatest(fetchDataHome, onFetchHomeData)
}

function* runLoadmoreAllPost() {
  yield takeLatest(loadmoreAllPostList, handleLoadmoreAllPostList)
}

export default function* homeSaga() {
  yield all([call(runFetchDataHome), call(runLoadmoreAllPost)])
}
