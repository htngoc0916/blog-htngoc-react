import { all, call, takeLatest } from 'redux-saga/effects'
import { login, logout, register } from './authSlice'
import { handleAuthLogOut, handleAuthLogin, handleAuthRegister } from './authHandlers'

export function* onLogin() {
  yield takeLatest(login.type, handleAuthLogin)
}

export function* onLogout() {
  yield takeLatest(logout.type, handleAuthLogOut)
}

export function* onRegister() {
  yield takeLatest(register.type, handleAuthRegister)
}

export default function* authSaga() {
  yield all([call(onLogin), call(onLogout), call(onRegister)])
}
