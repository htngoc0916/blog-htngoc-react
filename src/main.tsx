import ReactDOM from 'react-dom/client'
import './assets/index.scss'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import React from 'react'
import App from './App.tsx'
import { Flowbite } from 'flowbite-react'
import { customTheme } from './config/appTheme.ts'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Flowbite theme={{ theme: customTheme }}>
        <App />

        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Flowbite>
    </Provider>
  </React.StrictMode>
)
