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
    <div className='flex items-center justify-center p-2 mr-3 rounded-lg cursor-pointer'>
      <button className={`inline-block cursor-pointer transition-all ${className}`} onClick={toggleDarkMode}>
        <IconDark dark={themeDarkMode === 'dark'}></IconDark>
      </button>
    </div>
  )
}

export default ButtonDarkMode
