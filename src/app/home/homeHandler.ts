import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, FilterPramsDTO, ListResponseDTO, Post } from '~/types'
import postApi from '~/apis/postApi'

function* handleGetAllPostList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getAllPosts, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getPostSuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getPostFailed())
  }
}

function* handleGetNewPostList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getAllPosts, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getPostSuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getPostFailed())
  }
}

export { handleGetPosts }
