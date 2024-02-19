import { Field, Form } from '~/components/form'
import { TextCustom } from '~/components/text'
import {
  API_STATUS,
  ApiResponseDTO,
  DeleteFileByIdRequest,
  FileMaster,
  Post,
  UploadFileRequest,
  defaultFilter
} from '~/types'
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
import fileUpload from '~/apis/fileUploadApi'
import postApi from '~/apis/postApi'
import slugify from 'slugify'

const maxSize = 5 * 1024 * 1024
export interface PostDetailFormProps {
  isEdit: boolean
  data: Post | undefined
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
    usedYn: yup.string(),

    thumbnailId: yup.number()
  })

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
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
      usedYn: 'Y',
      thumbnailId: 0
    }
  })

  const dispatch = useDispatch()
  const userInfo = useAppSelector(userInfoSelector)
  const tagList = useAppSelector(TagListSelector)
  const categoryList = useAppSelector(categoryListSelector)
  const [uploadedImage, setUploadedImage] = useState<string>('')
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

  const handleToggleChange = async (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = async (post: any) => {
    console.log('🚀 ~ handleSave ~ post:', post)
    return
    try {
      const action = isEdit ? postApi.editPost : postApi.addPost
      if (!isEdit) {
        //check title
      }

      post.slug = slugify(post.slug || post.title, { lower: true })

      const postRequest: Post = {
        ...post,
        modId: isEdit ? userInfo?.id : undefined,
        regId: isEdit ? undefined : userInfo?.id,
        userId: userInfo?.id
      }

      const response: ApiResponseDTO<Post> = await action(postRequest)
      if (response?.status.includes(API_STATUS.FAILED)) {
        toast.error(response.message)
      } else {
        toast.success(response?.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlePostChange = (options: SelectOption[]) => {
    const tags: string[] = options.map((option) => option.value)
    setValue('tags', tags)
  }

  const handleOnFileUpload = useCallback(
    async (file: File) => {
      const postUploadRequest: UploadFileRequest = {
        id: userInfo?.id || 0,
        file
      }

      try {
        const response: ApiResponseDTO<FileMaster> = await fileUpload.uploadImage(postUploadRequest)

        if (response?.status.includes(API_STATUS.SUCCESS)) {
          console.log('🚀 ~ response:', response)
          setUploadedImage(response.data.fileUrl)
          setValue('thumbnail', response.data.fileUrl)
          setValue('thumbnailId', response.data.id)
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        toast.error('Upload error')
        console.error(error)
      }
    },
    [userInfo?.id, setValue]
  )

  const handleOnFileDelete = async () => {
    const fileId = getValues('thumbnailId')
    if (!fileId) return

    try {
      const deletePostImage: DeleteFileByIdRequest = {
        id: fileId
      }
      await fileUpload.deleteImage(deletePostImage)
      setUploadedImage('')
      setValue('thumbnailId', 0)
    } catch (error) {
      toast.error('Delete image error')
      console.log('🚀 ~ handleOnFileDelete ~ error:', error)
    }
  }

  useEffect(() => {
    dispatch(getTag({ ...defaultFilter, usedYn: 'Y' }))
  }, [])

  useEffect(() => {
    dispatch(getCategory({ ...defaultFilter, usedYn: 'Y' }))
  }, [])

  useEffect(() => {
    setValue('id', data?.id)
    setValue('title', data?.title || '')
    setValue('description', data?.description)
    setValue('slug', data?.slug)
    setValue('usedYn', data?.usedYn)
    setValue('categoryId', data?.categoryId)
    setValue('thumbnail', data?.thumbnail)
    setValue('tags', (data?.tags as string[]) || [])
    setValue('content', data?.content)

    setUploadedImage(data?.thumbnail || '')
    setPostContent(data?.content || 'Nhập nội dung...')
  }, [data, setValue])

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
              onChange={handlePostChange}
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
            maxSize={maxSize}
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
          <ActionSave isProcessing={isSubmitting} disabled={isSubmitting} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
