import { twMerge } from 'tailwind-merge'

export interface LoaderProps {
  className?: string
}

export default function Loader(props: LoaderProps) {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div
        className={twMerge(
          'w-16 h-16 border-4 border-solid rounded-full animate-spin border-primary-700 border-t-transparen bg-transparent',
          props.className
        )}
      ></div>
    </div>
  )
}
