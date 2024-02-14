/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { RootRoute } from './RootRoute'

const HomeLayout = lazy(() => import('~/layout/HomeLayout'))
const DashboardLayout = lazy(() => import('~/layout/DashboardLayout'))
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'))
const AboutPage = lazy(() => import('~/pages/AboutPage'))
const DashboardPage = lazy(() => import('~/pages/DashboardPage'))
const HomePage = lazy(() => import('~/pages/HomePage'))
const LoginPage = lazy(() => import('~/pages/LoginPage'))
const SignupPage = lazy(() => import('~/pages/RegisterPage'))
const CategoriesPage = lazy(() => import('~/pages/CategoriesPage'))

const PostsPage = lazy(() => import('~/pages/PostsPage'))
const PostViewLayout = lazy(() => import('~/layout/PostViewLayout'))
const PostDetail = lazy(() => import('~/modules/post/PostDetail'))

const UsersPage = lazy(() => import('~/pages/UsersPage'))
const TagsPage = lazy(() => import('~/pages/TagsPage'))
const ContactsPage = lazy(() => import('~/pages/ContactsPage'))
const SystemPage = lazy(() => import('~/pages/SystemPage'))

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootRoute></RootRoute>}>
      <Route path='/' element={<HomeLayout></HomeLayout>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path='about' element={<AboutPage></AboutPage>}></Route>
        <Route path='post/:slug' element={<PostViewLayout></PostViewLayout>}></Route>
      </Route>

      <Route path='/auth' element={<PrivateRoute component={DashboardLayout} />}>
        <Route path='dashboard' element={<DashboardPage></DashboardPage>}></Route>
        <Route path='categories' element={<CategoriesPage></CategoriesPage>}></Route>
        <Route path='posts'>
          <Route index element={<PostsPage></PostsPage>}></Route>
          <Route path=':postId' element={<PostDetail></PostDetail>}></Route>
        </Route>
        <Route path='tags' element={<TagsPage></TagsPage>}></Route>
        <Route path='users' element={<UsersPage></UsersPage>}></Route>
        <Route path='contacts' element={<ContactsPage></ContactsPage>}></Route>
        <Route path='system' element={<SystemPage></SystemPage>}></Route>
      </Route>

      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      <Route path='/register' element={<SignupPage></SignupPage>}></Route>
      <Route path='/404' element={<NotFoundPage></NotFoundPage>}></Route>
      <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
    </Route>
  )
)
export default routes
