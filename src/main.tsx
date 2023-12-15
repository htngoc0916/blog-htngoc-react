import ReactDOM from 'react-dom/client'
import './assets/index.scss'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.ts'
import React from 'react'
import App from './App.tsx'
import { Flowbite } from 'flowbite-react'
import { customTheme } from './config/appTheme.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Flowbite theme={{ theme: customTheme }}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Flowbite>
    </Provider>
  </React.StrictMode>
)
