import { PayloadAction } from '@reduxjs/toolkit'
import { login, loginSuccess, logout } from './authSlice'
import { call, fork, put, take } from 'redux-saga/effects'
import { LoginRequest, ROLE } from '~/types/user'
import { redirect } from 'react-router-dom'

function* handleLogin(payload: LoginRequest) {
  console.log(payload)
  try {
    localStorage.setItem('access_token', 'fake_value')
    yield put(loginSuccess({ id: 1, userName: 'htngoc', email: 'admin01@gmail.com', role: ROLE.ROLE_ADMIN }))

    // redirect to home page
    console.log('login successfully!')
    redirect('/')
  } catch (error) {
    console.log(error)
  }
}
function* handleLogout(): Generator {
  localStorage.removeItem('access_token')
  yield console.log('handleLogout')

  //redirect to login page
  //redirect('/login')
}

function* watchAuthFlow() {
  while (true) {
    const isAuthenticated = Boolean(localStorage.getItem('access_token'))
    if (!isAuthenticated) {
      const action: PayloadAction<LoginRequest> = yield take(login.type)
      yield fork(handleLogin, action.payload)
    }

    yield take(logout.type)
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(watchAuthFlow)
}
