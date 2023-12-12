import { all } from 'redux-saga/effects'
import authSaga from '~/app/auth/authSaga'
export default function* rootSaga() {
  yield all([authSaga()])
}
