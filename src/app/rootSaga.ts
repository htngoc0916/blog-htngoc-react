import { all } from 'redux-saga/effects'
import authSaga from '~/app/auth/authSaga'
import darkModeSaga from './darkMode/darkModeSaga'
import menuSaga from './menu/menuSaga'
import categorySaga from './category/categorySaga'
import tagSaga from './tag/tagSaga'
import UserSaga from './user/userSaga'
export default function* rootSaga() {
  yield all([authSaga(), darkModeSaga(), menuSaga(), categorySaga(), tagSaga(), UserSaga()])
}
