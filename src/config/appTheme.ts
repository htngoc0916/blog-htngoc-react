import { CustomFlowbiteTheme } from 'flowbite-react'

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        'text-white bg-primary-600 border border-transparent enabled:hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:enabled:hover:bg-primary-700 dark:focus:ring-primary-900',
      secondary:
        'text-primary-900 bg-white border border-primary-300 enabled:hover:bg-primary-100 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:text-white dark:border-primary-600 dark:enabled:hover:bg-primary-700 dark:enabled:hover:border-primary-700 dark:focus:ring-primary-700'
    },

    gradientDuoTone: {
      primary:
        'bg-gradient-primary enabled:hover:bg-gradient-hover-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-200 text-white'
    }
  },
  textInput: {
    field: {
      input: {
        colors: {
          outline: 'border-none rounded-none',
          primary:
            'border-gray-200 bg-gray-50 placeholder-text5 dark:placeholder-text5 focus:border-primary-500 focus:ring-primary-500 dark:border-primary-400 dark:bg-gray-100 dark:focus:border-primary-500 dark:focus:ring-primary-500'
        }
      }
    }
  },

  checkbox: {
    root: {
      color: {
        primary: 'focus:ring-primary-600 dark:ring-offset-primary-600 dark:focus:ring-primary-600 text-primary-600'
      }
    }
  },
  avatar: {
    root: {
      color: {
        primary: 'ring-primary-300 dark:ring-primary-500'
      },
      size: {
        ct: 'w-16 h-16'
      }
    }
  },
  badge: {
    root: {
      color: {
        primary:
          'bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-900 group-hover:bg-primary-200 dark:group-hover:bg-primary-300'
      }
    }
  },
  textarea: {
    colors: {
      default:
        'rounded-none block w-full border-0 border-b-2 border-gray-300 bg-white text-gray-900 focus:border-primary-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500',
      primary:
        'border-gray-50 text-primary-900 placeholder-primary-700 focus:border-primary-500 focus:ring-primary-500 dark:border-primary-400 dark:bg-primary-100 dark:focus:border-primary-500 dark:focus:ring-primary-500'
    }
  }
}
