import { Field, Form } from '~/components/form'
import { TextCustom } from '~/components/text'
import { Post, UploadRequest, defaultFilter } from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ButtonToggleSwitch } from '~/components/button'
import { ActionSave } from '~/components/action'
import { Label } from 'flowbite-react'
import { InputCustom, InputFile, InputSelect } from '~/components/input'
import { TextareaCustom } from '~/components/textarea'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '~/app/hooks'
import { TagListSelector, getTag } from '~/app/tag/tagSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SelectOption } from '~/components/input/inputSelectOptions'
import { categoryListSelector, getCategory } from '~/app/category/categorySlice'
import { DropdownCustom } from '~/components/dropdown'
import { DropdownOptions } from '~/components/dropdown/DropdownCustom'
import ReactQuill from 'react-quill'
import { useQuillUploadImage } from '~/hooks/useQuillUploadImage'
import { toast } from 'react-toastify'
import { userInfoSelector } from '~/app/auth/authSlice'

export interface PostDetailFormProps {
  isEdit: boolean
  data: Post | null
  className?: string
}

export default function PostDetailForm({ data, isEdit, className }: PostDetailFormProps) {
  const schema = yup.object({
    id: yup.number(),
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    description: yup.string(),
    content: yup.string(),
    slug: yup.string(),
    thumbnail: yup.string(),
    categoryId: yup.number(),
    tags: yup.array().of(yup.string()),
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
      tags: [],
      usedYn: 'Y'
    }
  })

  const dispatch = useDispatch()
  const userInfo = useAppSelector(userInfoSelector)
  const tagList = useAppSelector(TagListSelector)
  const categoryList = useAppSelector(categoryListSelector)

  const { modules, formats } = useQuillUploadImage()

  const dropdownOptions: DropdownOptions[] = useMemo(() => {
    return categoryList.map((category) => ({
      key: category.id?.toString(),
      value: category.categoryName
    })) as DropdownOptions[]
  }, [])

  const selectOptions: SelectOption[] = useMemo(() => {
    return tagList.map((tag) => ({
      value: tag?.tagName,
      label: tag?.tagName,
      color: tag?.color,
      isDisabled: tag?.usedYn !== 'Y'
    })) as SelectOption[]
  }, [])

  const [postContent, setPostContent] = useState('')
  const handleContentChange = (content: any) => {
    setPostContent(content)
    setValue('content', content)
  }

  useEffect(() => {
    dispatch(getTag({ ...defaultFilter, usedYn: 'Y' }))
  }, [])

  useEffect(() => {
    dispatch(getCategory({ ...defaultFilter, usedYn: 'Y' }))
  }, [])

  const handleToggleChange = async (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = (value: any) => {
    const postSave: Post = { ...value }

    console.log('🚀 ~ handleSave ~ post:', postSave)
  }

  const handleTagChange = (options: SelectOption[]) => {
    const tags: string[] = options.map((option) => option.value)
    setValue('tags', tags)
  }

  const handleOnFileUpload = useCallback(
    async (file: File) => {
      const postUploadImage: UploadRequest = {
        id: userInfo?.id || 0,
        file
      }

      const response: ApiResponseDTO<FileMaster> = await userApi.uploadAvatar(uploadAvatar)
      if (response?.status.includes(API_STATUS.SUCCESS)) {
        setUploadedImage(response.data.fileUrl)
        setValue('avatar', response.data.fileUrl)
      }
    },
    [navigate, setValue, data?.email, isEdit]
  )

  const [uploadedImage, setUploadedImage] = useState<string>('')

  const handleOnFileDelete = async () => {}

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
          <Label htmlFor='slug'>Slug</Label>
          <InputCustom id='slug' name='slug' color='primary' control={control} />
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
        <Field className='grid grid-cols-2 gap-6 mb-0'>
          <Field>
            <Label htmlFor='categoryId'>Category</Label>
            <DropdownCustom name='categoryId' data={dropdownOptions} control={control}></DropdownCustom>
          </Field>
          <Field>
            <Label htmlFor='tags'>Tags</Label>
            <InputSelect
              data={selectOptions}
              name='tags'
              isMulti
              control={control}
              onChange={handleTagChange}
            ></InputSelect>
          </Field>
        </Field>

        <Field>
          <Label htmlFor='thumbnail'>Post Image</Label>
          <InputFile
            onFileUpload={handleOnFileUpload}
            uploadUrl={uploadedImage}
            onFileDelete={handleOnFileDelete}
            size='md'
          >
            <div>
              <p>
                <span className='text-primary-700 dark:text-primary-400'>Click to upload</span> or drag and drop
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          </InputFile>
        </Field>

        <Field>
          <Label htmlFor='content'>Contents</Label>
          <div className='entry-content'>
            <ReactQuill
              theme='snow'
              modules={modules}
              formats={formats}
              value={postContent}
              onChange={handleContentChange}
              placeholder='Nhập nội dung...'
            />
          </div>
        </Field>

        <div className='flex items-center justify-center mb-5'>
          <ActionSave isProcessing={false} disabled={false} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
