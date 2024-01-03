import { all, call, takeLatest } from 'redux-saga/effects'
import { getUser } from './userSlice'
import { handleGetUsers } from './userHandler'

export function* onGetUsers() {
  yield takeLatest(getUser.type, handleGetUsers)
}

export default function* UserSaga() {
  yield all([call(onGetUsers)])
}
