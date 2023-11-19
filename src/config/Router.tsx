/* eslint-disable */
import { lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// const HomeLayout = lazy(() => import('~/layout/HomeLayout'))
// const DashboardLayout = lazy(() => import('~/layout/DashboardLayout'))
// const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'))
// const AboutPage = lazy(() => import('~/pages/AboutPage'))
// const DashboardPage = lazy(() => import('~/pages/DashboardPage'))
// const HomePage = lazy(() => import('~/pages/HomePage'))
// const LoginPage = lazy(() => import('~/pages/LoginPage'))
// const SignupPage = lazy(() => import('~/pages/SignUpPage'))
// const PostDetailPage = lazy(() => import('~/pages/PostDetailPage'))
// const CategotyPage = lazy(() => import('~/pages/CategoryPage'))
// const PostListPage = lazy(() => import('~/pages/PostListPage'))
// const SystemPage = lazy(() => import('~/pages/SystemPage'))
// const UserPage = lazy(() => import('~/pages/UserPage'))

const routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<p>Test</p>}></Route>
      {/* <Route path='/' element={<HomeLayout></HomeLayout>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path='/about' element={<AboutPage></AboutPage>}></Route>
        <Route path='/post/:slug' element={<PostDetailPage></PostDetailPage>}></Route>
        <Route path='/category/:slug' element={<CategotyPage></CategotyPage>}></Route>
      </Route>

      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      <Route path='/sign-up' element={<SignupPage></SignupPage>}></Route>
      <Route path='/404' element={<NotFoundPage></NotFoundPage>}></Route>
      <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>

      <Route path='/auth' element={<DashboardLayout></DashboardLayout>}>
        <Route path='dashboard' element={<DashboardPage></DashboardPage>}></Route>
        <Route path='category' element={<CategotyPage></CategotyPage>}></Route>
        <Route path='user' element={<UserPage></UserPage>}></Route>
        <Route path='post' element={<PostListPage></PostListPage>}></Route>
        <Route path='system' element={<SystemPage></SystemPage>}></Route>
      </Route> */}
    </>
  )
)
export default routers
