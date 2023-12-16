import { all, call, takeLatest } from 'redux-saga/effects'
import { loginStart, logoutStart, registerStart } from './authSlice'
import { handleAuthLogOut, handleAuthLogin, handleAuthRegister } from './authHandlers'

export function* onLogin() {
  yield takeLatest(loginStart.type, handleAuthLogin)
}

export function* onLogout() {
  yield takeLatest(logoutStart.type, handleAuthLogOut)
}

export function* onRegister() {
  yield takeLatest(registerStart.type, handleAuthRegister)
}

export default function* authSaga() {
  yield all([call(onLogin), call(onLogout), call(onRegister)])
}
