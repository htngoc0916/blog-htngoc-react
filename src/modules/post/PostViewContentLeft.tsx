import { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useAppSelector } from '~/app/hooks'
import { postViewMetaSelector } from '~/app/post/postViewSlice'

export interface PostContentLeftProps {
  contentRef: React.RefObject<HTMLDivElement>
}

const classes = {
  base: 'block mb-1 duration-100 cursor-pointer hover:text-primary-700',
  actived: {
    on: 'text-primary-800 font-bold',
    off: 'text-text1'
  }
}

const PostViewContentLeft = memo(function PostViewContentLeft({ contentRef }: PostContentLeftProps) {
  const postMetaList = useAppSelector(postViewMetaSelector)
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleNavLinkClick = (slug: string) => {
    const targetElement = document.getElementById(slug)
    if (targetElement && contentRef.current) {
      const offset = 100
      const scrollToPosition = targetElement.offsetTop - offset

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const contentElement = contentRef.current
      if (contentElement) {
        const headings = contentElement.querySelectorAll('h3[class="post-meta"]')
        headings.forEach((heading) => {
          const rect = heading.getBoundingClientRect()
          if (rect.top <= 300 && rect.bottom >= 0) {
            setActiveId(heading.id)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [contentRef])

  return (
    <div id='category' className='sticky flex flex-col p-4 mr-4 rounded-lg top-20 bg-gray-50 dark:bg-gray-800 gap-y-4'>
      <h4 className='text-lg'>Mục lục</h4>
      <div>
        {postMetaList &&
          postMetaList.map((meta) => {
            console.log('🚀 ~ PostViewContentLeft ~ meta:', meta)
            return (
              <NavLink
                to={`#${meta?.slug}`}
                key={meta?.slug}
                className={twMerge(classes.base, classes.actived[activeId === meta?.slug ? 'on' : 'off'])}
                onClick={() => handleNavLinkClick(meta?.slug)}
              >
                🏋🏽 {meta?.title}
              </NavLink>
            )
          })}
      </div>
    </div>
  )
})

export default PostViewContentLeft
