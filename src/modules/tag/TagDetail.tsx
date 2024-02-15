import { twMerge } from 'tailwind-merge'
import { ActionClose, ActionSave } from '~/components/action'
import { TextCustom } from '~/components/text'
import { API_STATUS, ApiResponseDTO, Tag } from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'
import { useEffect, useState } from 'react'
import { Field, Form } from '~/components/form'
import { ButtonToggleSwitch } from '~/components/button'
import { toast } from 'react-toastify'
import TagApi from '~/apis/tagApi'
import { Label } from 'flowbite-react'
import { InputCustom, InputSelect } from '~/components/input'
import { SelectOption, colourOptions } from '~/components/input/inputSelectOptions'
import { useTranslation } from 'react-i18next'
import TestInput from '~/components/input/InputCreatableSelect'

export interface TagDetailProps {
  data: Tag | null
  className: string
  onCloseTag: () => void
  onSaveTag: () => void
}

export default function TagDetail({ data, className, onCloseTag, onSaveTag }: TagDetailProps) {
  const { t } = useTranslation('tag')

  const schema = yup.object({
    id: yup.number(),
    tagName: yup.string().required(t('form.validation.tag-required')),
    color: yup.string(),
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
      color: data?.color || '',
      tagName: data?.tagName || '',
      usedYn: data?.usedYn || 'Y'
    }
  })

  const userInfo = useAppSelector(userInfoSelector)
  const [loading, setLoading] = useState(false)
  const isEdit = !!data

  useEffect(() => {
    setValue('tagName', data?.tagName || '')
    setValue('color', data?.color || '')
    setValue('usedYn', data?.usedYn || 'Y')
    setValue('id', data?.id || 0)
  }, [data, setValue, userInfo])

  const handleToggleChange = (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleColorChange = (selectedOption: SelectOption) => {
    console.log('🚀 ~ handleColorChange ~ selectedOption:', selectedOption)
    setValue('color', selectedOption ? selectedOption.value : '')
  }

  const handleSave = async (tag: Tag) => {
    const tagRequest: Tag = {
      ...tag,
      modId: isEdit ? userInfo?.id : undefined,
      regId: isEdit ? undefined : userInfo?.id
    }

    try {
      setLoading(true)

      const action = data ? TagApi.editTag : TagApi.addTag
      const actionType = data ? 'Editing' : 'Creating new'
      console.log(`${actionType} Tag:`, tag)

      const response: ApiResponseDTO<Tag> = await action(tagRequest)

      if (response?.status.includes(API_STATUS.FAILED)) {
        toast.error(response.message)
      } else {
        toast.success(response?.message)
        onSaveTag()
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
        <ActionClose onClick={onCloseTag}></ActionClose>
      </div>
      <div className='flex mb-10'>
        <TextCustom size='xs' className='text-text2 dark:text-text7'>
          {isEdit ? 'Chỉnh sửa' : 'Tạo mới'} 🍬
        </TextCustom>
      </div>

      <Form onSubmit={handleSubmit(handleSave)}>
        <Field>
          <ButtonToggleSwitch
            name='usedYn'
            control={control}
            checked={data?.usedYn === 'Y'}
            onChange={handleToggleChange}
          />
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
          <InputSelect data={colourOptions} name='color' control={control} onChange={handleColorChange}></InputSelect>
        </Field>

        <div className='flex items-center justify-center'>
          <ActionSave isProcessing={loading} disabled={loading} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
