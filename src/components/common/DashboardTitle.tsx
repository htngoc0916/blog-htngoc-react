import { ReactNode, memo } from 'react'
import { twMerge } from 'tailwind-merge'

export interface DashboardTitleProps {
  title: string
  className?: string
  children?: ReactNode
}

// Give your memoized component a name
const DashboardTitle = memo(function MemoDashboardTitle(props: DashboardTitleProps) {
  return (
    <div className={twMerge('mb-4', props.className)}>
      <h3 className='pt-2 text-2xl font-semibold text-primary-800 dark:text-primary-500'>{props.title}</h3>
      <p className='pt-1 text-lg'>{props.children}</p>
    </div>
  )
})

export default DashboardTitle
