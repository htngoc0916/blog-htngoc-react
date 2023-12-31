import { twMerge } from 'tailwind-merge'
import { ActionClose, ActionSave } from '~/components/action'
import { TextCustom } from '~/components/text'
import { API_STATUS, ApiResponseDTO, Tag, TagRequestDTO } from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'
import { useEffect, useState } from 'react'
import { Field, Form } from '~/components/form'
import { ButtonToggleSwitch } from '~/components/button'
import { toast } from 'react-toastify'
import TagApi from '~/apis/tagApi'
import { SAVED_SUCCESS } from '~/utils/message'
import { Label } from 'flowbite-react'
import { InputCustom } from '~/components/input'

export interface TagDetailProps {
  data: Tag | null
  className: string
  onCloseTag: () => void
  onSaveTag: () => void
}

const schema = yup.object({
  id: yup.number(),
  tagName: yup.string().required('Vui lòng nhập tên Tag'),
  color: yup.string(),
  usedYn: yup.string()
})

export default function TagDetail({ data, className, onCloseTag, onSaveTag }: TagDetailProps) {
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
      color: data?.color || '',
      tagName: data?.tagName || '',
      usedYn: data?.usedYn || 'Y'
    }
  })

  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const [loading, setLoading] = useState(false)
  const [isToggleChecked, setIsToggleChecked] = useState(data?.usedYn !== 'N')

  useEffect(() => {
    setValue('tagName', data?.tagName || '')
    setValue('color', data?.color || '')
    setValue('usedYn', data?.usedYn || 'Y')
    setValue('id', data?.id || 0)
    setIsToggleChecked(data?.usedYn !== 'N')
  }, [data, setValue, userInfo])

  const handleToggleChange = (value: boolean) => {
    setIsToggleChecked(value)
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = async (tag: Tag) => {
    console.log('🚀 ~ file: TagDetail.tsx:63 ~ TagDetail ~ tag:', tag)

    const tagRequest: TagRequestDTO = {
      ...tag,
      modId: data ? userInfo?.id : undefined,
      regId: data ? undefined : userInfo?.id,
      navigate
    }

    try {
      setLoading(true)
      if (data) {
        console.log('Editing Tag:', tag)
        const response: ApiResponseDTO<Tag> = await TagApi.editTag(tagRequest)
        if (response?.status.includes(API_STATUS.FAILED)) {
          return toast.error(response.message)
        }
      } else {
        console.log('Creating new Tag:', tag)
        const response: ApiResponseDTO<Tag> = await TagApi.addTag(tagRequest)
        if (response?.status.includes(API_STATUS.FAILED)) {
          return toast.error(response.message)
        }
      }
      setLoading(false)
      toast.success(SAVED_SUCCESS)
      onSaveTag()
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    }
  }

  return (
    <div className={twMerge(className, 'relative')}>
      <div className='absolute top-2 right-2'>
        <ActionClose onClick={onCloseTag}></ActionClose>
      </div>
      <div className='flex mb-10'>
        <TextCustom size='xs' className='text-text2 dark:text-text7'>
          {data ? 'Chỉnh sửa' : 'Tạo mới'} 🍬
        </TextCustom>
      </div>

      <Form onSubmit={handleSubmit(handleSave)}>
        <Field>
          <ButtonToggleSwitch name='usedYn' control={control} checked={isToggleChecked} onChange={handleToggleChange} />
        </Field>
        <Field>
          <Label htmlFor='tagName'>Tag</Label>
          <InputCustom
            name='tagName'
            control={control}
            message={errors?.tagName?.message}
            maxLength={100}
          ></InputCustom>
        </Field>
        <Field>
          <Label htmlFor='color'>Color</Label>
          <InputCustom name='color' control={control} message={errors?.color?.message} maxLength={20}></InputCustom>
        </Field>

        <div className='flex items-center justify-center'>
          <ActionSave isProcessing={loading} disabled={loading} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
