import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const clasess = {
  base: 'flex items-center'
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
      <img src='https://flowbite.com/docs/images/logo.svg' className='mr-3 h-7 sm:h-9' alt='Flowbite React Logo' />
      <span className='self-center hidden text-xl font-semibold whitespace-nowrap dark:text-white md:block'>
        htngoc
      </span>
      {children}
    </NavLink>
  )
}
