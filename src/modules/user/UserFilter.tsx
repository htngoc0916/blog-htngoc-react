import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ActionSearch } from '~/components/action'
import { DropdownCustom } from '~/components/dropdown'
import { Form } from '~/components/form'
import { InputCustom } from '~/components/input'
import { FilterPramsDTO } from '~/types'
import { activeOptions } from '~/utils/constant'

export interface UserFilter {
  search: string
  usedYn: string
}

export interface UserFilterProps {
  className?: string
  filter: FilterPramsDTO
  onSeach?: (filter: FilterPramsDTO) => void
  onSetFilter?: (filter: FilterPramsDTO) => void
}

const UserFilter = memo(function UserFilter(props: UserFilterProps) {
  const { className, filter, onSeach } = props
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      usedYn: ''
    }
  })

  const handleOnSearch = (value: UserFilter) => {
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
        ></InputCustom>
        <ActionSearch type='submit'></ActionSearch>
      </Form>
    </div>
  )
})

export default UserFilter
