import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
const classes = {
  input: {
    default: {
      filled: {
        sm: 'peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-xs text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500',
        md: 'peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500'
      },
      outlined: {
        sm: 'border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-xs text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500',
        md: 'border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500'
      },
      standard: {
        sm: 'block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer',
        md: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer'
      }
    },
    success: {
      filled: {
        sm: 'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-xs text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-green-600 dark:border-green-500 appearance-none dark:text-white dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer',
        md: 'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-green-600 dark:border-green-500 appearance-none dark:text-white dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
      },
      outlined: {
        sm: 'block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer',
        md: 'block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
      },
      standard: {
        sm: 'block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer',
        md: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
      }
    },
    error: {
      filled: {
        sm: 'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-xs text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none dark:text-white dark:border-red-500 focus:outline-none focus:ring-0 border-red-600 focus:border-red-600 dark:focus-border-red-500 peer',
        md: 'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none dark:text-white dark:border-red-500 focus:outline-none focus:ring-0 border-red-600 focus:border-red-600 dark:focus-border-red-500 peer'
      },
      outlined: {
        sm: 'block px-2.5 pb-2.5 pt-4 w-full text-xs text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer',
        md: 'block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer'
      },
      standard: {
        sm: 'block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer',
        md: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer'
      }
    }
  },
  label: {
    default: {
      filled: {
        sm: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-xs text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500',
        md: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500'
      },
      outlined: {
        sm: 'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white text-xs text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-500',
        md: 'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-primary-500'
      },
      standard: {
        sm: 'absolute text-xs text-gray-500 dark:text-gray-400  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
        md: 'absolute text-sm text-gray-500 dark:text-gray-400  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
      }
    },
    success: {
      filled: {
        sm: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-sm text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500',
        md: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-sm text-green-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-green-500'
      },
      outlined: {
        sm: 'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-sm text-green-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-green-500',
        md: 'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-sm text-green-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-green-500'
      },
      standard: {
        sm: 'absolute text-xs text-green-600 dark:text-green-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
        md: 'absolute text-sm text-green-600 dark:text-green-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
      }
    },
    error: {
      filled: {
        sm: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-xs text-red-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-red-500',
        md: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transition-transform text-xs text-red-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-red-500'
      },
      outlined: {
        sm: 'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-xs text-red-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-red-500',
        md: 'absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transition-transform bg-white px-2 text-xs text-red-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-900 dark:text-red-500'
      },
      standard: {
        sm: 'absolute text-xs text-red-600 dark:text-red-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
        md: 'absolute text-sm text-red-600 dark:text-red-500  transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] duration-300 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
      }
    }
  },
  helperText: {
    default: 'mt-2 text-xs text-gray-600 dark:text-gray-400',
    success: 'mt-2 text-xs text-green-600 dark:text-green-400',
    error: 'mt-2 text-xs text-red-600 dark:text-red-400'
  }
}

type Color = 'default' | 'success' | 'error'
type Size = 'sm' | 'md'
type Variant = 'filled' | 'outlined' | 'standard'

export interface InputFloatingProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant
  sizing?: Size
  color?: Color
  label?: ReactNode
  helperText?: string
  className?: string
  children?: ReactNode
}

export default function InputFloating(props: InputFloatingProps) {
  const {
    variant = 'filled',
    sizing = 'sm',
    color = 'default',
    helperText,
    label,
    children,
    name,
    type = 'text',
    className = '',
    ...rest
  } = props

  return (
    <div>
      <div className='relative'>
        <input
          type={type}
          id={name}
          className={twMerge(classes.input[color][variant][sizing], className)}
          placeholder=' '
          {...rest}
        />
        <label htmlFor={name} className={twMerge(classes.label[color][variant][sizing])}>
          {label}
        </label>
      </div>
      {children}
    </div>
  )
}
