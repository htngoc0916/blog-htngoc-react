import { RouterProvider } from 'react-router-dom'
import routers from './config/Router'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'
// import 'swiper/css/scrollbar'
import { Suspense } from 'react'
// import Loader from './components/loader'

function App() {
  return (
    <Suspense fallback={<p></p>}>
      <RouterProvider router={routers}></RouterProvider>
    </Suspense>
  )
}

export default App
