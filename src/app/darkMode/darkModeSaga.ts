import { all, call, takeLatest } from 'redux-saga/effects'
import { switchDarkMode } from './darkModeSlice'
import { handleSwitchDarkMode } from './darkModeHandler'

export function* onSwitchDarkMode() {
  yield takeLatest(switchDarkMode.type, handleSwitchDarkMode)
}

export default function* darkModeSaga() {
  yield all([call(onSwitchDarkMode)])
}
