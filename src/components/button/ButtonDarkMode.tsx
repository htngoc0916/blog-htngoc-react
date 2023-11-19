import { useEffect, useState } from 'react'
import { IconDark } from '../icons'
interface ButtonDarkModeProps {
  className?: string
}

function ButtonDarkMode(props: ButtonDarkModeProps) {
  const { className } = props

  const [theme, setTheme] = useState('light')
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleThemSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button className={`inline-block cursor-pointer transition-all ${className}`} onClick={handleThemSwitch}>
      <IconDark dark={theme === 'dark' ? true : false}></IconDark>
    </button>
  )
}

export default ButtonDarkMode
