import { all } from 'redux-saga/effects'
import authSaga from '~/app/auth/authSaga'
import darkModeSaga from './darkMode/darkModeSaga'
export default function* rootSaga() {
  yield all([authSaga(), darkModeSaga()])
}
