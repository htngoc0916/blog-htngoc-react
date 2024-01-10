import { Form, Field } from '~/components/form'
import { TextCustom } from '~/components/text'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { API_STATUS, ApiResponseDTO, Category, CategoryRequestDTO } from '~/types'
import { InputCustom } from '~/components/input'
import { Label } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { TextareaCustom } from '~/components/textarea'
import { twMerge } from 'tailwind-merge'
import { ActionClose, ActionSave } from '~/components/action'
import { ButtonToggleSwitch } from '~/components/button'
import categoryApi from '~/apis/categoryApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SAVED_SUCCESS } from '~/utils/message'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'

export interface CategoryDetailProps {
  data: Category | null
  className: string
  onCloseCategory: () => void
  onSaveCategory: () => void
}

const schema = yup.object({
  id: yup.number(),
  categoryName: yup.string().required('Vui lòng nhập tên category'),
  description: yup.string(),
  usedYn: yup.string()
})

export default function CategoryDetail({ data, className, onCloseCategory, onSaveCategory }: CategoryDetailProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      id: data?.id || 0,
      categoryName: data?.categoryName || '',
      description: data?.description || '',
      usedYn: data?.usedYn || 'Y'
    }
  })
  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const [loading, setLoading] = useState(false)
  const isEdit = !!data

  useEffect(() => {
    setValue('categoryName', data?.categoryName || '')
    setValue('description', data?.description || '')
    setValue('usedYn', data?.usedYn || 'Y')
    setValue('id', data?.id || 0)
  }, [data, setValue, userInfo])

  const handleToggleChange = (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = async (category: Category) => {
    const categoryRequest: CategoryRequestDTO = {
      ...category,
      modId: isEdit ? userInfo?.id : undefined,
      regId: isEdit ? undefined : userInfo?.id,
      navigate
    }

    try {
      setLoading(true)
      if (data) {
        console.log('Editing category:', category)
        const response: ApiResponseDTO<Category> = await categoryApi.editCategory(categoryRequest)
        if (response?.status.includes(API_STATUS.FAILED)) {
          return toast.error(response.message)
        }
      } else {
        console.log('Creating new category:', category)
        const response: ApiResponseDTO<Category> = await categoryApi.addCategory(categoryRequest)
        if (response?.status.includes(API_STATUS.FAILED)) {
          return toast.error(response.message)
        }
      }
      setLoading(false)
      toast.success(SAVED_SUCCESS)
      onSaveCategory()
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }

  return (
    <div className={twMerge(className, 'relative')}>
      <div className='absolute top-2 right-2'>
        <ActionClose onClick={onCloseCategory}></ActionClose>
      </div>
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
          <Label htmlFor='categoryName'>Category</Label>
          <InputCustom
            name='categoryName'
            control={control}
            message={errors?.categoryName?.message}
            maxLength={100}
          ></InputCustom>
        </Field>
        <Field>
          <Label htmlFor='description'>Description</Label>
          <TextareaCustom
            id='description'
            name='description'
            color='primary'
            rows={6}
            control={control}
            className='resize-none dark:bg-darkbg3'
          />
        </Field>
        <div className='flex items-center justify-center'>
          <ActionSave isProcessing={loading} disabled={loading} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
