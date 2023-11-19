import { useState, useEffect } from 'react'

interface ScrollPosition {
  scrollX: number
  scrollY: number
}

const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollX: window.scrollX,
    scrollY: window.scrollY
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        scrollX: window.scrollX,
        scrollY: window.scrollY
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}

export default useScrollPosition
