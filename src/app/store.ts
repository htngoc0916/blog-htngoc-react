// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './rootReducer'
import createSagaMiddleware from '@redux-saga/core'
import { logger } from 'redux-logger'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
