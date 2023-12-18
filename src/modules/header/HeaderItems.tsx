import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '~/app/hooks'
import { getMenu, menuListSeclector } from '~/app/menu/menuSlice'
import { useEffect } from 'react'

const classes = {
  base: 'block p-2.5 text-lg font-medium text-text1 hover:text-primary-700 dark:text-text3 dark:hover:text-primary-500 transition-all dark:text-text7'
}
export interface HeaderItemsProps {
  className?: string
}

export default function HeaderItems(props: HeaderItemsProps) {
  const { className } = props
  const dispatch = useDispatch()
  const menuList = useAppSelector(menuListSeclector)
  console.log(menuList)
  // const menuList = dataMenu().filter((item) => item.type === 'public')
  useEffect(() => {
    dispatch(getMenu())
  }, [dispatch])
  return (
    <>
      {menuList.length > 0 &&
        menuList.map((item) => (
          <NavLink
            key={item.id}
            to={item.menuUrl}
            className={({ isActive }) =>
              twMerge(classes.base, isActive ? ` text-primary-800 dark:text-primary-500` : '', className)
            }
          >
            <div className='flex items-center justify-center gap-2'>{item.menuName}</div>
          </NavLink>
        ))}
    </>
  )
}
