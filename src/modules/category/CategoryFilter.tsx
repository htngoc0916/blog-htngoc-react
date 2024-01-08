import { Dropdown } from 'flowbite-react'
import { memo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionSearch } from '~/components/action'
import { Form } from '~/components/form'
import { InputCustom } from '~/components/input'
import { useForm } from 'react-hook-form'
import { FilterPramsDTO } from '~/types'
import { activeOptions } from '~/utils/constant'

export interface CategoryFilterProps {
  className?: string
  filter: FilterPramsDTO
  onSeach?: (filter: FilterPramsDTO) => void
  onSetFilter?: (filter: FilterPramsDTO) => void
}

const CategoryFilter = memo(function CategoryFilter(props: CategoryFilterProps) {
  console.log('🚀 ~ file: CategoryFilter.tsx:19 ~ CategoryFilter ~ props:', props)
  const { className, filter, onSeach, onSetFilter } = props
  const [selectedValue, setSelectedValue] = useState('All')
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      usedYn: ''
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

  // const hanleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (!onSeach) return
  //   handleOnSearch(event.target.value)
  // }

  const handleOnSearch = (value: { search: string }) => {
    console.log('🚀 ~ file: CategoryFilter.tsx:48 ~ handleOnSearch ~ value:', value)
    const newFilter: FilterPramsDTO = {
      ...filter,
      categoryName: value.search
    }
    onSeach?.(newFilter)
  }

  return (
    <div className={twMerge(className)}>
      <Form onSubmit={handleSubmit(handleOnSearch)} className='flex w-full gap-2'>
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
  )
})

export default CategoryFilter
