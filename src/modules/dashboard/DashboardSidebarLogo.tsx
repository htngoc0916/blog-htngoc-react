import { NavLink } from 'react-router-dom'

export default function DashboardSidebarLogo() {
  return (
    <div className='flex'>
      <NavLink to='/'>
        <div className='inline-flex items-center justify-center w-10 h-10 rounded-lg'>
          <img src='/img/logo_htn.png' alt='Blog Logo' className='object-cover w-full rounded-lg' />
        </div>
      </NavLink>
      <span className='self-center hidden ml-3 text-xl font-semibold whitespace-nowrap dark:text-white md:block'>
        htngoc
      </span>
    </div>
  )
}
