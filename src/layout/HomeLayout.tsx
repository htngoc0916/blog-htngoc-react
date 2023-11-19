import HeaderLayout from './HeaderLayout'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <>
      <HeaderLayout></HeaderLayout>
      <Outlet></Outlet>
    </>
  )
}

export default HomeLayout
