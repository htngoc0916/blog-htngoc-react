import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Form } from '~/components/form'
import { InputCustom } from '../input'
import { TextInputProps } from 'flowbite-react'
import { useRef } from 'react'

export interface ActionSearch extends TextInputProps {
  onClick?: () => void
  onChange?: () => void
}

const schema = yup.object({
  search: yup.string()
})

export default function ActionSearch(props: ActionSearch) {
  const { onClick, onChange, ...rest } = props
  const searchRef = useRef<HTMLInputElement>()

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      search: ''
    }
  })

  const handleSearch = (values: any) => {
    console.log(values)
  }

  return (
    <div id='search' className='w-full h-10 max-w-md'>
      <Form onSubmit={handleSubmit(handleSearch)}>
        <InputCustom
          name='search'
          type='text'
          placeholder='Tìm kiếm'
          control={control}
          onClick={onClick}
          //   onChange={onChange}
        ></InputCustom>
      </Form>
    </div>
  )
}
