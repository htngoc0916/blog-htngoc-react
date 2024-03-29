import { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useAppSelector } from '~/app/hooks'
import { postViewMetaSelector } from '~/app/post/postViewSlice'

export interface PostContentRightProps {
  contentRef: React.RefObject<HTMLDivElement>
}

const classes = {
  base: 'sticky flex flex-col w-full py-4 px-6 ml-4 rounded-lg top-20 bg-gray-50 dark:bg-gray-800 gap-y-4',
  navlink: {
    base: 'block mb-3 duration-100 cursor-pointer hover:text-primary-700',
    actived: {
      on: 'text-primary-800 font-bold',
      off: 'text-text1'
    }
  }
}

const PostViewContentRight = memo(function PostViewContentLeft({ contentRef }: PostContentRightProps) {
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
    <div id='category' className={classes.base}>
      <h4 className='text-lg'>Mục lục</h4>
      <div>
        {postMetaList &&
          postMetaList.map((meta) => {
            return (
              <NavLink
                to={`#${meta?.slug}`}
                key={meta?.slug}
                className={twMerge(
                  classes.navlink.base,
                  classes.navlink.actived[activeId === meta?.slug ? 'on' : 'off']
                )}
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

export default PostViewContentRight
