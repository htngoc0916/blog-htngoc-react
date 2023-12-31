import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { API_STATUS, ApiResponseDTO, FilterPramsDTO, ListResponseDTO, Tag } from '~/types'
import { getTagFailed, getTagSuccess } from './tagSlice'
import TagApi from '~/apis/tagApi'

function* handleGetTags(action: PayloadAction<FilterPramsDTO>) {
  try {
    const response: ApiResponseDTO<ListResponseDTO<Tag[]>> = yield call(TagApi.getAllTags, action.payload)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      yield put(getTagSuccess(response?.data))
    }
  } catch (error: any) {
    console.log(error)
    yield put(getTagFailed())
  }
}

export { handleGetTags }
