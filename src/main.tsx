import ReactDOM from 'react-dom/client'
import './assets/index.scss'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import React from 'react'
import App from './App.tsx'
import { Flowbite } from 'flowbite-react'
import { customTheme } from './config/appTheme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Flowbite theme={{ theme: customTheme }}>
        <App />
      </Flowbite>
    </Provider>
  </React.StrictMode>
)
