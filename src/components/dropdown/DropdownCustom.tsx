import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { HiChevronDown } from 'react-icons/hi2'

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
  onChangeOption?: (option: DropdownOptions) => void
}

export default function DropdownCustom(props: DropdownCustomProps) {
  const { name, control, data, className, defaultValue = 'All', onChangeOption } = props
  const [label, setLabel] = useState(defaultValue)
  const { field } = useController({
    control,
    name
  })

  const handleSortChange = (option: DropdownOptions) => {
    setLabel(option.value)
    field.onChange(option.key)
    if (onChangeOption) {
      onChangeOption?.(option)
    }
  }

  const handleRenderTrigger = () => {
    return (
      <button
        type='button'
        className='group p-0.5 focus:outline-none text-text1 bg-white dark:bg-darkbg3 border border-gray-300 dark:border-primary-400 enabled:hover:bg-gray-100 focus:ring-primary-300 dark:text-white  dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700 rounded-lg focus:ring-2 w-full flex justify-start items-center'
      >
        <span className='flex items-center justify-between w-full px-2 py-2 text-sm transition-all duration-200 rounded-md'>
          {label}
          <HiChevronDown className='w-4 h-4 group-focus:text-text1 text-text4 dark:text-text5'></HiChevronDown>
        </span>
      </button>
    )
  }

  return (
    <div className={className}>
      <Dropdown label={label} color='light' renderTrigger={handleRenderTrigger}>
        {data.map((option) => (
          <Dropdown.Item key={option.key} onClick={() => handleSortChange(option)}>
            {option?.value}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}
