import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const clasess = {
  base: 'flex items-center justify-center'
}

export interface HeaderLogoProps {
  className?: string
  href?: string
  children?: ReactNode
}

export default function HeaderLogo(props: HeaderLogoProps) {
  const { href = '', className, children } = props
  return (
    <NavLink to={href} className={twMerge(clasess.base, className)}>
      <div className='w-10 mr-1 overflow-hidden rounded-lg'>
        <img src='/img/logo_htn.png' alt='Flowbite React Logo' className='object-cover w-full' />
      </div>
      <span className='self-center hidden text-xl font-semibold whitespace-nowrap dark:text-white md:block '>
        htngoc
      </span>
      {children}
    </NavLink>
  )
}
