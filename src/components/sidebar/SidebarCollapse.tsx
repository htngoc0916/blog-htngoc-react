import { ReactNode, SVGProps, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useSidebar } from './sidebar.context'
import { RenderIcon } from '../icons/menu'
import { Tooltip } from 'flowbite-react'
import { HiPlus, HiMinus } from 'react-icons/hi2'
const classes = {
  base: 'flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
  actived: 'bg-gray-100 dark:bg-gray-700',
  icon: 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ml-1',
  children: {
    base: 'flex-1 inline-block px-3 text-left rtl:text-rightwhitespace-nowrap text-text1 dark:text-white',
    icon: 'flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
  }
}

export interface SidebarProps {
  title?: string
  className?: string
  icon?: React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null
  children?: ReactNode
}

export default function SidebarCollapse(props: SidebarProps) {
  const { isOpen } = useSidebar()
  const { className = '', title, icon: Icon, children } = props
  const renderIcon = RenderIcon(
    Icon as React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null,
    classes.icon
  )

  const [show, setShow] = useState(false)

  const handleOnclick = () => {
    setShow(!show)
  }

  return (
    <div>
      <button type='button' className={twMerge(classes.base, className)} onClick={handleOnclick}>
        {isOpen ? (
          <>
            {renderIcon}
            <span className={twMerge(classes.children.base)}>{title}</span>
            {show ? (
              <HiMinus className={classes.children.icon}></HiMinus>
            ) : (
              <HiPlus className={classes.children.icon}></HiPlus>
            )}
          </>
        ) : (
          <Tooltip content={title} placement='right' className='w-28 z-[999]'>
            {renderIcon}
          </Tooltip>
        )}
      </button>
      <div
        className={twMerge(
          'transition-all duration-300 overflow-hidden',
          show ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        {children}
      </div>
    </div>
  )
}
