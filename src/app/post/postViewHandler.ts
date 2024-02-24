import { PayloadAction } from '@reduxjs/toolkit'
import { setPostRelates, setPostViewComments, setPostViewDetail } from './postViewSlice'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, ListResponseDTO, Post } from '~/types'
import postApi from '~/apis/postApi'

function* handleFetchDataPostView(action: PayloadAction<string>) {
  try {
    const response: ApiResponseDTO<Post> = yield call(postApi.getPostBySlug, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(setPostViewDetail(response?.data))
    }
  } catch (error: any) {
    console.log(error)
  }
}

function* handleFetchRelatedPosts(action: PayloadAction<string>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getRelatedPostBySlug, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(setPostRelates(response?.data))
    }
  } catch (error: any) {
    console.log(error)
  }
}

function* handleFetchPostComments(action: PayloadAction<string>) {
  try {
    yield put(setPostViewComments([]))

    // const response: ApiResponseDTO<Post> = yield call(postApi.getPostBySlug, action.payload)
    // console.log('🚀 ~ function*handleFetchPostComments ~ response:', response)
    // if (response?.status.includes(API_STATUS.SUCCESS)) {
    //   yield put(setPostViewDetail(response?.data))
    // }
  } catch (error: any) {
    console.log(error)
  }
}

export { handleFetchDataPostView, handleFetchRelatedPosts, handleFetchPostComments }
