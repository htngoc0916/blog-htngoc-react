import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { ActionSearch } from '~/components/action'
import { DropdownCustom } from '~/components/dropdown'
import { Form } from '~/components/form'
import { InputCustom } from '~/components/input'
import { FilterPramsDTO } from '~/types'
import { activeOptions } from '~/utils/constant'

export interface PostFilter {
  search: string
  usedYn: string
}

export interface PostFilterProps {
  className?: string
  filter: FilterPramsDTO
  onSeach?: (filter: FilterPramsDTO) => void
  onSetFilter?: (filter: FilterPramsDTO) => void
}

const PostFilter = memo(function PostFilter(props: PostFilterProps) {
  const { className, filter, onSeach } = props
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      search: '',
      usedYn: ''
    }
  })

  const handleOnSearch = (value: PostFilter) => {
    const postFilter: FilterPramsDTO = {
      ...filter,
      postTitle: value.search,
      usedYn: value.usedYn
    }
    onSeach?.(postFilter)
  }

  return (
    <div className={className}>
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

export default PostFilter
