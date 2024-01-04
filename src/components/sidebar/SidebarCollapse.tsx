import { ReactNode, SVGProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Menu } from '~/types'
import { useSidebar } from './sidebar.context'
import { RenderIcon } from '../icons/menu'
import { Tooltip } from 'flowbite-react'

const classes = {
  button:
    'flex items-center justify-start p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
  actived: 'bg-gray-100 dark:bg-gray-700',
  icon: 'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ml-1',
  children: 'flex-1 inline-block px-3 whitespace-nowrap text-text1 dark:text-white'
}

export interface SidebarProps {
  data?: Menu
  className?: string
  icon?: React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null
}

export default function SidebarCollapse(props: SidebarProps) {
  const { isOpen } = useSidebar()
  const { className = '', data, icon: Icon } = props
  const renderIcon = RenderIcon(
    Icon as React.ReactElement<SVGProps<SVGSVGElement>> | React.ComponentType<SVGProps<SVGSVGElement>> | null,
    classes.icon
  )

  const handleOnclick = () => {
    console.log('asd')
  }

  return (
    <div>
      <button className={`${twMerge(classes.button, className)}`} onClick={handleOnclick}>
        {isOpen ? (
          <>
            {renderIcon}
            <span className={classes.children}>{data?.menuName}</span>
          </>
        ) : (
          <Tooltip content={data?.menuName} placement='right' className='w-28 z-[999] aaa'>
            {renderIcon}
          </Tooltip>
        )}
      </button>
      <ul id='dropdown-example' className='hidden py-2 space-y-2'>
        <li>
          <a
            href='#'
            className='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
          >
            Products
          </a>
        </li>
      </ul>
    </div>
  )
}
