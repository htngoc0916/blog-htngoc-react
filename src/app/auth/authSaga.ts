// import { PayloadAction } from '@reduxjs/toolkit'
// import { login, loginSuccess, logout, logoutSuccess } from './authSlice'
// import { call, fork, put, take } from 'redux-saga/effects'
// import { LoginRequest, ROLE } from '~/types/user'
// function* handleLogin(payload: LoginRequest) {
//   console.log('handleLogin', payload)
//   try {
//     //goi api
//     localStorage.setItem('access_token', 'fake_value')
//     yield put(loginSuccess({ id: 1, userName: 'htngoc', email: 'admin01@gmail.com', role: ROLE.ROLE_ADMIN }))
//   } catch (error) {
//     console.log(error)
//   }
// }
// function* handleLogout() {
//   localStorage.removeItem('access_token')
//   yield put(logoutSuccess())
// }

// function* watchAuthFlow() {
//   while (true) {
//     const isAuthenticated = Boolean(localStorage.getItem('access_token'))
//     if (!isAuthenticated) {
//       const action: PayloadAction<LoginRequest> = yield take(login.type)
//       yield fork(handleLogin, action.payload)
//     }

//     yield take(logout.type)
//     yield call(handleLogout)
//   }
// }

// export default function* authSaga() {
//   yield fork(watchAuthFlow)
// }

import { all, call, takeLatest } from 'redux-saga/effects'
import { login, logout } from './authSlice'
import { handleAuthLogOut, handleAuthLogin, handleAuthRegister } from './authHandlers'

export function* onLogin() {
  yield takeLatest(login.type, handleAuthLogin)
}

export function* onLogout() {
  yield takeLatest(logout.type, handleAuthLogOut)
}

export function* onRegister() {
  yield takeLatest(logout.type, handleAuthRegister)
}

export default function* authSaga() {
  yield all([call(onLogin), call(onLogout), call(onRegister)])
}
