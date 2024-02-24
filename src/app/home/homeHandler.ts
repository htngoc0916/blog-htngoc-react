import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, Category, FilterPramsDTO, ListResponseDTO, Post } from '~/types'
import postApi from '~/apis/postApi'
import {
  setAllPostListHome,
  setHotPostListHome,
  loadmoreAllPostListSuccess,
  loadmoreAllPostListFailed,
  setCategoryList
} from './homeSlice'
import categoryApi from '~/apis/categoryApi'

function* handleFetchAllPostList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getAllPosts, action.payload)
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

function* handleFetchAllCategoryList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Category[]>> = yield call(
      categoryApi.getAllCategories,
      action.payload
    )
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(setCategoryList(response?.data))
    }
  } catch (error: any) {
    console.log(error)
  }
}

function* handleLoadmoreAllPostList(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Post[]>> = yield call(postApi.getAllPosts, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(loadmoreAllPostListSuccess(response?.data))
    }
  } catch (error: any) {
    yield put(loadmoreAllPostListFailed())
    console.log(error)
  }
}

export { handleFetchAllPostList, handleFetchHotPostList, handleLoadmoreAllPostList, handleFetchAllCategoryList }
