import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const classes = {
  root: {
    base: 'group flex flex-col md:flex-row rounded-lg md:rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 h-full w-full transition-all overflow-hidden cursor-pointer relative z-10',
    children: 'absolute bottom-0 left-0 z-30 max-w-2xl p-4 text-white'
  },
  blur: 'absolute z-20 w-full h-full transition-all backdrop-blur-sm bg-white/5 group-hover:backdrop-blur-0',
  img: {
    base: 'rounded-lg object-cover h-full w-full transition-all group-hover:scale-105'
  }
}
export interface CardPostProps {
  className?: string
  imgSrc?: string
  href?: string
  children?: ReactNode
}

export default function CardPost(props: CardPostProps) {
  const { className, imgSrc = '', href = '', children } = props

  return (
    <div className={twMerge(classes.root.base, className)}>
      <Link to={href}>
        <div className={classes.blur}></div>
      </Link>
      <img srcSet={imgSrc} alt='card photo' className={twMerge(classes.img.base)} />
      <div className={classes.root.children}>{children}</div>
    </div>
  )
}
