/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PrivateRoute } from './PrivateRouter'

const HomeLayout = lazy(() => import('~/layout/HomeLayout'))
const DashboardLayout = lazy(() => import('~/layout/DashboardLayout'))
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'))
const AboutPage = lazy(() => import('~/pages/AboutPage'))
const DashboardPage = lazy(() => import('~/pages/DashboardPage'))
const HomePage = lazy(() => import('~/pages/HomePage'))
const LoginPage = lazy(() => import('~/pages/LoginPage'))
const SignupPage = lazy(() => import('~/pages/RegisterPage'))
const PostDetailPage = lazy(() => import('~/pages/PostDetailPage'))
const CategoriesPage = lazy(() => import('~/pages/CategoriesPage'))
const PostsPage = lazy(() => import('~/pages/PostsPage'))
const UsersPage = lazy(() => import('~/pages/UsersPage'))
const TagsPage = lazy(() => import('~/pages/TagsPage'))
const ContactsPage = lazy(() => import('~/pages/ContactsPage'))
const SystemPage = lazy(() => import('~/pages/SystemPage'))

const routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        element={
          <Suspense>
            <HomeLayout></HomeLayout>
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense>
              <HomePage></HomePage>
            </Suspense>
          }
        ></Route>
        <Route
          path='/about'
          element={
            <Suspense>
              <AboutPage></AboutPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='/post/:slug'
          element={
            <Suspense>
              <PostDetailPage></PostDetailPage>
            </Suspense>
          }
        ></Route>
      </Route>

      <Route
        path='/login'
        element={
          <Suspense>
            <LoginPage></LoginPage>
          </Suspense>
        }
      ></Route>
      <Route
        path='/register'
        element={
          <Suspense>
            <SignupPage></SignupPage>
          </Suspense>
        }
      ></Route>
      <Route path='/404' element={<NotFoundPage></NotFoundPage>}></Route>
      <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>

      <Route
        path='/auth'
        element={
          <Suspense>
            <PrivateRoute component={DashboardLayout} />
          </Suspense>
        }
      >
        <Route
          path='dashboard'
          element={
            <Suspense>
              <DashboardPage></DashboardPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='categories'
          element={
            <Suspense>
              <CategoriesPage></CategoriesPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='posts'
          element={
            <Suspense>
              <PostsPage></PostsPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='tags'
          element={
            <Suspense>
              <TagsPage></TagsPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='users'
          element={
            <Suspense>
              <UsersPage></UsersPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='contacts'
          element={
            <Suspense>
              <ContactsPage></ContactsPage>
            </Suspense>
          }
        ></Route>
        <Route
          path='system'
          element={
            <Suspense>
              <SystemPage></SystemPage>
            </Suspense>
          }
        ></Route>
      </Route>
    </>
  )
)
export default routers
