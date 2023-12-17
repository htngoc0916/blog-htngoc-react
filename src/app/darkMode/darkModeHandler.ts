import { PayloadAction } from '@reduxjs/toolkit'
import { put } from 'redux-saga/effects'
import { switchDarkModeSuccess } from './darkModeSlice'

function* handleSwitchDarkMode(action: PayloadAction<string>) {
  const { payload } = action
  try {
    if (payload === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('app_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('app_theme')
    }
    yield put(switchDarkModeSuccess(payload))
  } catch (error) {
    console.log(error)
  }
}
export { handleSwitchDarkMode }
