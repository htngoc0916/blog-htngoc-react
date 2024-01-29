import { all } from 'redux-saga/effects'
import authSaga from '~/app/auth/authSaga'
import darkModeSaga from './darkMode/darkModeSaga'
import menuSaga from './menu/menuSaga'
import categorySaga from './category/categorySaga'
import tagSaga from './tag/tagSaga'
import userSaga from './user/userSaga'
import postSaga from './post/postSaga'

export default function* rootSaga() {
  yield all([authSaga(), darkModeSaga(), menuSaga(), categorySaga(), tagSaga(), userSaga(), postSaga()])
}
