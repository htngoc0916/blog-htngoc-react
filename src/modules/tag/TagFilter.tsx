import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionSearch } from '~/components/action'
import { Form } from '~/components/form'
import { InputCustom } from '~/components/input'
import { useForm } from 'react-hook-form'
import { FilterPramsDTO } from '~/types'
import { activeOptions } from '~/utils/constant'
import { DropdownCustom } from '~/components/dropdown'

export interface TagFilter {
  search: string
  usedYn: string
}

export interface TagFilterProps {
  className?: string
  filter: FilterPramsDTO
  onSeach?: (filter: FilterPramsDTO) => void
  onSetFilter?: (filter: FilterPramsDTO) => void
}

const TagFilter = memo(function TagFilter(props: TagFilterProps) {
  const { className, filter, onSeach } = props

  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      usedYn: ''
    }
  })

  // const handleSortChange = (value: TagFilter) => {
  //   setSelectedValue(value.search)

  //   if (onSeach) {
  //     const newFilter: FilterPramsDTO = {
  //       ...filter,
  //       usedYn: value.search
  //     }
  //     onSetFilter?.(newFilter)
  //   }
  // }

  const handleOnSearch = (value: TagFilter) => {
    const newFilter: FilterPramsDTO = {
      ...filter,
      tagName: value.search,
      usedYn: value.usedYn
    }
    onSeach?.(newFilter)
  }

  return (
    <div className={twMerge('flex gap-2 items-center', className)}>
      <Form onSubmit={handleSubmit(handleOnSearch)} className='flex w-full gap-2'>
        <DropdownCustom
          name='usedYn'
          className='w-28'
          data={activeOptions}
          control={control}
          // onChangeOption={handleOnSearch}
        ></DropdownCustom>
        <InputCustom
          type='text'
          placeholder='Nhâp từ khoá'
          control={control}
          className='w-72'
          name='search'
          autoComplete='off'
        ></InputCustom>
        <ActionSearch type='submit'></ActionSearch>
      </Form>
    </div>
  )
})

export default TagFilter
