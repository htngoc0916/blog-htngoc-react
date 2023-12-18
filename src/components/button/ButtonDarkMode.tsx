import { IconDark } from '../icons'
import { useDispatch, useSelector } from 'react-redux'
import { switchDarkMode, themeDarkModeSelector } from '~/app/darkMode/darkModeSlice'

interface ButtonDarkModeProps {
  className?: string
}

function ButtonDarkMode(props: ButtonDarkModeProps) {
  const { className } = props
  const dispatch = useDispatch()
  const themeDarkMode = useSelector(themeDarkModeSelector)

  const toggleDarkMode = () => {
    const newTheme = themeDarkMode === 'dark' ? 'light' : 'dark'
    dispatch(switchDarkMode(newTheme))
  }

  return (
    <button
      className={` rounded-lg transition-all frounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 ${className}`}
      onClick={toggleDarkMode}
    >
      <IconDark dark={themeDarkMode === 'dark'}></IconDark>
    </button>
  )
}

export default ButtonDarkMode
