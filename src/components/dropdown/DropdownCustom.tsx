import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import { Control, useController } from 'react-hook-form'

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

  return (
    <div className={className}>
      <Dropdown
        label={label}
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
