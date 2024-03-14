import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { getPublicMenu, pulicMenuSelector } from '~/app/menu/menuSlice'

const classes = {
  base: 'block p-2.5 text-lg font-medium text-text1 hover:text-primary-700 dark:text-text3 dark:hover:text-primary-500 transition-all dark:text-text7'
}

export interface HeaderItemsProps {
  className?: string
}

export default function HeaderItems(props: HeaderItemsProps) {
  const { className } = props
  const dispatch = useAppDispatch()
  const pubListMenus = useAppSelector(pulicMenuSelector)

  useEffect(() => {
    dispatch(getPublicMenu())
  }, [dispatch])

  const handleOnClick = () => {
    console.log('🚀 ~ handleOnClick ~ handleOnClick:')
    const navbarToggleButton = document.querySelector("[data-testid='flowbite-navbar-toggle']") as HTMLButtonElement
    if (navbarToggleButton) {
      navbarToggleButton.click()
    }
  }

  return (
    <>
      {pubListMenus &&
        pubListMenus.map((item) => (
          <NavLink
            key={item.id}
            to={item.menuUrl}
            className={({ isActive }) =>
              twMerge(classes.base, isActive ? ` text-primary-800 dark:text-primary-500` : '', className)
            }
            onClick={handleOnClick}
          >
            <div className='flex items-center justify-center gap-2'>{item.menuName}</div>
          </NavLink>
        ))}
    </>
  )
}
