import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionSearch } from '~/components/action'
import { Form } from '~/components/form'
import { InputCustom } from '~/components/input'
import { useForm } from 'react-hook-form'
import { FilterPramsDTO } from '~/types'
import { activeOptions } from '~/utils/constant'
import { DropdownCustom } from '~/components/dropdown'

export interface CategoryFilterProps {
  className?: string
  filter: FilterPramsDTO
  onSeach?: (filter: FilterPramsDTO) => void
  onSetFilter?: (filter: FilterPramsDTO) => void
}

const CategoryFilter = memo(function CategoryFilter(props: CategoryFilterProps) {
  const { className, filter, onSeach } = props
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      usedYn: ''
    }
  })

  const handleOnSearch = (value: { search: string; usedYn: string }) => {
    const newFilter: FilterPramsDTO = {
      ...filter,
      categoryName: value.search,
      usedYn: value.usedYn
    }
    onSeach?.(newFilter)
  }

  return (
    <div className={twMerge(className)}>
      <Form onSubmit={handleSubmit(handleOnSearch)} className='flex w-full gap-2'>
        <DropdownCustom name='usedYn' className='w-28' data={activeOptions} control={control}></DropdownCustom>
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
