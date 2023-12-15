import { all, call, takeLatest, takeLeading } from 'redux-saga/effects'
import { login, logout, refreshTokenJob, register } from './authSlice'
import { handleAuthLogOut, handleAuthLogin, handleAuthRegister, handleRefreshToken } from './authHandlers'

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
  yield takeLatest(refreshTokenJob.type, handleRefreshToken)
}

export default function* authSaga() {
  yield all([call(onLogin), call(onLogout), call(onRegister), call(onRefreshToken)])
}
