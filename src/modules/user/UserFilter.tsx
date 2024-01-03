import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ActionSearch } from '~/components/action'
import { Form } from '~/components/form'
import { InputCustom } from '~/components/input'
import { FilterPramsDTO } from '~/types'
import { activeOptions } from '~/utils/constant'

export interface UserFilterProps {
  className?: string
  filter: FilterPramsDTO
  onSeach?: (filter: FilterPramsDTO) => void
  onSetFilter?: (filter: FilterPramsDTO) => void
}

export default function UserFilter(props: UserFilterProps) {
  const { className, filter, onSeach, onSetFilter } = props
  const [selectedValue, setSelectedValue] = useState('All')
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      search: ''
    }
  })

  const handleSortChange = (value: { key: string; value: string }) => {
    setSelectedValue(value.value)

    if (onSeach) {
      const newFilter: FilterPramsDTO = {
        ...filter,
        usedYn: value.key
      }
      onSetFilter?.(newFilter)
    }
  }

  const handleOnSearch = (value: { search: string }) => {
    const newFilter: FilterPramsDTO = {
      ...filter,
      tagName: value.search
    }
    onSeach?.(newFilter)
  }

  return (
    <div className={twMerge('flex gap-2 items-center', className)}>
      <div className='w-28'>
        <Dropdown
          label={selectedValue}
          color='light'
          theme={{
            floating: { target: 'w-full flex justify-end items-center' }
          }}
        >
          {activeOptions.map((option) => (
            <Dropdown.Item key={option.key} onClick={() => handleSortChange(option)}>
              {option?.value}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <div>
        <Form onSubmit={handleSubmit(handleOnSearch)} className='flex gap-2'>
          <InputCustom
            type='text'
            placeholder='Nhâp từ khoá'
            control={control}
            className='w-72'
            name='search'
          ></InputCustom>
          <ActionSearch type='submit'></ActionSearch>
        </Form>
      </div>
    </div>
  )
}
