import { Field, Form } from '~/components/form'
import { TextCustom } from '~/components/text'
import { Post } from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ButtonToggleSwitch } from '~/components/button'
import { ActionSave } from '~/components/action'
import { Label } from 'flowbite-react'
import { InputCustom, InputSelect } from '~/components/input'
import { TextareaCustom } from '~/components/textarea'

export interface PostDetailFormProps {
  isEdit: boolean
  data: Post | null
  className?: string
}

export default function PostDetailForm({ data, isEdit, className }: PostDetailFormProps) {
  const schema = yup.object({
    id: yup.number(),
    title: yup.string().required('Vui long nhap title'),
    description: yup.string(),
    content: yup.string(),
    slug: yup.string(),
    thumbnail: yup.string(),
    categoryId: yup.number(),
    tags: yup.string(),
    usedYn: yup.string()
  })

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      id: 0,
      title: '',
      description: '',
      content: '',
      slug: '',
      thumbnail: '',
      categoryId: 0,
      tags: '',
      usedYn: 'Y'
    }
  })

  const handleToggleChange = async (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = () => {}

  const handleTagChange = () => {}

  return (
    <div id='post-add__form' className={className}>
      <div className='flex mb-10'>
        <TextCustom size='xs' className='text-text2 dark:text-text7'>
          {isEdit ? 'Chỉnh sửa' : 'Tạo mới'} 🤖
        </TextCustom>
      </div>

      <Form onSubmit={handleSubmit(handleSave)}>
        <Field>
          <ButtonToggleSwitch
            name='usedYn'
            label='Active'
            control={control}
            checked={data?.usedYn === 'Y'}
            onChange={handleToggleChange}
          />
        </Field>
        <Field>
          <Label htmlFor='title'>Title</Label>
          <InputCustom name='title' control={control} message={errors?.title?.message} maxLength={100}></InputCustom>
        </Field>
        <Field>
          <Label htmlFor='description'>Description</Label>
          <TextareaCustom
            id='description'
            name='description'
            color='primary'
            rows={6}
            maxLength={150}
            control={control}
            className='resize-none dark:bg-darkbg3'
          />
        </Field>
        <Field>
          <Label htmlFor='slug'>Slug</Label>
          <InputCustom id='slug' name='slug' color='primary' control={control} />
        </Field>

        <Field>
          <Label htmlFor='tags'>Tags</Label>
          <InputSelect name='tags' control={control} onChange={handleTagChange}></InputSelect>
        </Field>

        <div className='flex items-center justify-center mb-5'>
          <ActionSave isProcessing={false} disabled={false} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
