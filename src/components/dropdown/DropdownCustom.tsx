import { Dropdown } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { HiChevronDown } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'

export interface DropdownOptions {
  key: string
  value: string
}

export interface DropdownCustomProps {
  name: string
  data: DropdownOptions[]
  control: Control<any>
  className?: string
  defaultValue?: string
  message?: string
  onChangeOption?: (option: DropdownOptions) => void
}

const classes = {
  base: 'group p-0.5 focus:outline-none text-text1 bg-white dark:bg-darkbg3 dark:text-white rounded-lg focus:ring-2 w-full flex justify-start items-center enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-700',
  border: {
    off: 'border border-gray-300 dark:border-primary-400 dark:enabled:hover:border-gray-700 focus:ring-primary-300 dark:focus:ring-gray-700',
    on: 'border border-red-300 dark:border-red-400 dark:enabled:hover:border-red-700 focus:ring-red-300 dark:focus:ring-red-700'
  }
}

export default function DropdownCustom(props: DropdownCustomProps) {
  const { name, control, data, className, defaultValue = 'All', message, onChangeOption } = props
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    setSelectedValue(defaultValue)
  }, [defaultValue])

  const { field } = useController({
    control,
    name
  })

  const handleSortChange = (option: DropdownOptions) => {
    setSelectedValue(option.value)
    field.onChange(option.key)
    if (onChangeOption) {
      onChangeOption?.(option)
    }
  }

  const handleRenderTrigger = () => {
    return (
      <button type='button' className={twMerge(classes.base, classes.border[message ? 'on' : 'off'])}>
        <span className='flex items-center justify-between w-full px-2 py-2 text-sm transition-all duration-200 rounded-md'>
          {selectedValue}
          <HiChevronDown className='w-4 h-4 group-focus:text-text1 text-text4 dark:text-text5'></HiChevronDown>
        </span>
      </button>
    )
  }

  return (
    <div className={twMerge('relative', className)}>
      <Dropdown label={selectedValue} color='light' renderTrigger={handleRenderTrigger}>
        {data.map((option) => (
          <Dropdown.Item key={option.key} onClick={() => handleSortChange(option)}>
            {option?.value}
          </Dropdown.Item>
        ))}
      </Dropdown>

      {message && (
        <div className='absolute left-0 top-full'>
          <span className='mt-2 text-sm text-red-600 dark:text-red-500'>{message}</span>
        </div>
      )}
    </div>
  )
}
