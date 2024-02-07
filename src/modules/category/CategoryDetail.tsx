import { Form, Field } from '~/components/form'
import { TextCustom } from '~/components/text'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { API_STATUS, ApiResponseDTO, Category } from '~/types'
import { InputCustom } from '~/components/input'
import { Label } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { TextareaCustom } from '~/components/textarea'
import { twMerge } from 'tailwind-merge'
import { ActionClose, ActionSave } from '~/components/action'
import { ButtonToggleSwitch } from '~/components/button'
import categoryApi from '~/apis/categoryApi'
import { toast } from 'react-toastify'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'
import { useTranslation } from 'react-i18next'

export interface CategoryDetailProps {
  data: Category | null
  className: string
  onCloseCategory: () => void
  onSaveCategory: () => void
}

export default function CategoryDetail({ data, className, onCloseCategory, onSaveCategory }: CategoryDetailProps) {
  const { t } = useTranslation('category')
  const schema = yup.object({
    id: yup.number(),
    categoryName: yup.string().required(t('form.category-required')),
    description: yup.string(),
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
      id: data?.id || 0,
      categoryName: data?.categoryName || '',
      description: data?.description || '',
      usedYn: data?.usedYn || 'Y'
    }
  })
  const userInfo = useAppSelector(userInfoSelector)
  const [loading, setLoading] = useState(false)
  const isEdit = Boolean(data)

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
    const categoryRequest: Category = {
      ...category,
      modId: isEdit ? userInfo?.id : undefined,
      regId: isEdit ? undefined : userInfo?.id
    }

    try {
      setLoading(true)

      const action = isEdit ? categoryApi.editCategory : categoryApi.addCategory
      const actionType = isEdit ? 'Editing' : 'Creating new'
      console.log(`${actionType} category:`, category)

      const response: ApiResponseDTO<Category> = await action(categoryRequest)

      if (response?.status.includes(API_STATUS.FAILED)) {
        toast.error(response.message)
      } else {
        toast.success(response?.message)
        onSaveCategory()
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
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
