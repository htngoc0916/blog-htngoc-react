import { PayloadAction } from '@reduxjs/toolkit'
import { LoginPayload, login, loginSuccess, logout } from './authSlice'
import { call, fork, put, take } from 'redux-saga/effects'

function* handleLogin(payload: LoginPayload) {
  console.log(payload)
  try {
    localStorage.setItem('access_token', 'fake_value')
    yield put(loginSuccess({ id: 1, name: 'htngoc' }))

    // redirect to admin page
    // redirect('/login')
  } catch (error) {
    console.log(error)
  }
}
function* handleLogout(): Generator {
  localStorage.removeItem('access_token')
  yield console.log('handleLogout')
  // yield call(redirect('/login'))
}

function* watchAuthFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type)
      yield fork(handleLogin, action.payload)
    }

    yield take(logout.type)
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(watchAuthFlow)
}
