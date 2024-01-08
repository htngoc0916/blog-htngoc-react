import { Dropdown } from 'flowbite-react'
import { useState } from 'react'

export interface DropdownOptions {
  key: string
  value: string
}

export interface DropdownCustomProps {
  className: string
  data: DropdownOptions[]
  onChangeOption: (data: DropdownOptions) => void
}

export default function DropdownCustom({ data, className, onChangeOption }: DropdownCustomProps) {
  const [selectedValue, setSelectedValue] = useState('All')

  const handleSortChange = (data: { key: string; value: string }) => {
    setSelectedValue(data.value)
    onChangeOption?.(data)

    // if (onSeach) {
    //   const newFilter:  FilterPramsDTO = {
    //     ...filter,
    //     usedYn: value.key
    //   }
    //   onSetFilter?.(newFilter)
    // }
  }

  return (
    <div className={className}>
      <Dropdown
        label={selectedValue}
        color='light'
        theme={{
          floating: { target: 'w-full flex justify-end items-center' }
        }}
      >
        {data.map((option) => (
          <Dropdown.Item key={option.key} onClick={() => handleSortChange(option)}>
            {option?.value}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}
