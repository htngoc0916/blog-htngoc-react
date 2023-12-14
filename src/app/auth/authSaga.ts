import { all, call, takeLatest } from 'redux-saga/effects'
import { authRefreshToken, login, logout, register } from './authSlice'
import { handleAuthLogOut, handleAuthLogin, handleAuthRegister, handleAuthRefreshToken } from './authHandlers'

export function* onLogin() {
  yield takeLatest(login.type, handleAuthLogin)
}

export function* onLogout() {
  yield takeLatest(logout.type, handleAuthLogOut)
}

export function* onRegister() {
  yield takeLatest(register.type, handleAuthRegister)
}

export function* onRefreshToken() {
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken)
}

export default function* authSaga() {
  yield all([call(onLogin), call(onLogout), call(onRegister), call(onRefreshToken)])
}
