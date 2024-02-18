import { RouterProvider } from 'react-router-dom'
import routes from './config/routes'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Suspense, useEffect } from 'react'
import Loader from './components/loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { themeDarkModeSelector } from './app/darkMode/darkModeSlice'
import { useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallBack from './components/error'
import './i18n/i18n'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'

function App() {
  const theme = useSelector(themeDarkModeSelector)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {}}>
        <Suspense fallback={<Loader></Loader>}>
          <RouterProvider router={routes}></RouterProvider>
        </Suspense>
      </ErrorBoundary>

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
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='mt-24'
      />
    </>
  )
}

export default App
