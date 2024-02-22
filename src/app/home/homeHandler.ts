import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, FilterPramsDTO, ListResponseDTO, Post } from '~/types'
import postApi from '~/apis/postApi'
import { setAllPostListHome, setHotPostListHome } from './homeSlice'

function* handleFetchAllPostList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getAllPosts, action.payload)
    console.log('🚀 ~ function*handleFetchAllPostList ~ response:', response)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(setAllPostListHome(response?.data))
    }
  } catch (error: any) {
    console.log(error)
  }
}

function* handleFetchHotPostList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getHotPost, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(setHotPostListHome(response?.data))
    }
  } catch (error: any) {
    console.log(error)
  }
}

export { handleFetchAllPostList, handleFetchHotPostList }
