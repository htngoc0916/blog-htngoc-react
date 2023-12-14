// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '~/app/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer)
})

export default rootReducer
