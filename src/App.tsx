import { RouterProvider } from 'react-router-dom'
import routers from './config/Router'
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

function App() {
  const theme = useSelector(themeDarkModeSelector)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
      <Suspense fallback={<Loader></Loader>}>
        <RouterProvider router={routers}></RouterProvider>
      </Suspense>

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
      />
    </>
  )
}

export default App
