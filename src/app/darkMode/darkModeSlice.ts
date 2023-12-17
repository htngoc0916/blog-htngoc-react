import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface DarkModeState {
  themeDarkMode: string
}
const initialState: DarkModeState = {
  themeDarkMode: localStorage.getItem('app_theme') || 'light'
}

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    switchDarkMode(state, action: PayloadAction<string>) {
      console.log(state, action)
    },
    switchDarkModeSuccess(state, action: PayloadAction<string>) {
      state.themeDarkMode = action.payload
    }
  }
})

export const { switchDarkMode, switchDarkModeSuccess } = darkModeSlice.actions

export const darkModeSlector = (state: RootState) => state.darkMode
export const themeDarkModeSelector = (state: RootState) => state.darkMode.themeDarkMode
export default darkModeSlice.reducer
