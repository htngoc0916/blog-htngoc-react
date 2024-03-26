import { Field, Form } from '~/components/form'
import { TextCustom } from '~/components/text'
import {
  API_STATUS,
  ApiResponseDTO,
  Category,
  FileMaster,
  Post,
  PostMeta,
  Tag,
  UploadFileRequest,
  defaultFilter
} from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ButtonToggleSwitch } from '~/components/button'
import { ActionSave } from '~/components/action'
import { Label } from 'flowbite-react'
import { InputCustom, InputFile, InputSelectMulti } from '~/components/input'
import { TextareaCustom } from '~/components/textarea'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '~/app/hooks'
import { TagListSelector, getTag } from '~/app/tag/tagSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SelectOption } from '~/components/input/inputSelectOptions'
import { categoryListSelector, getCategory } from '~/app/category/categorySlice'
import { DropdownCustom } from '~/components/dropdown'
import { DropdownOptions } from '~/components/dropdown/DropdownCustom'
import { toast } from 'react-toastify'
import { userInfoSelector } from '~/app/auth/authSlice'
import fileUpload from '~/apis/fileUploadApi'
import postApi from '~/apis/postApi'
import slugify from 'slugify'
import { TinyMceCustom } from '~/components/editor'
import { HiMiniXMark } from 'react-icons/hi2'

const maxSize = 5 * 1024 * 1024
export interface PostDetailFormProps {
  isEdit: boolean
  data: Post | undefined
}

export default function PostDetailForm({ data, isEdit }: PostDetailFormProps) {
  const schema = yup.object({
    id: yup.number(),
    title: yup.string().required('Vui lòng nhập tiêu đề'),
    description: yup.string(),
    content: yup.string(),
    slug: yup.string(),
    thumbnail: yup.string(),
    thumbnailId: yup.number(),
    categoryId: yup
      .number()
      .required('Vui lòng chọn danh mục')
      .test('is-greater-than-zero', 'Vui lòng chọn danh mục', (value) => value > 0),
    tags: yup.array().of(yup.string()),
    usedYn: yup.string(),

    // images: yup.array().of(yup.number()),
    categoryName: yup.string()
  })

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
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
      thumbnailId: undefined,
      categoryId: undefined,
      tags: [],
      usedYn: 'Y',

      // images: [],
      categoryName: ''
    }
  })

  const dispatch = useDispatch()
  const userInfo = useAppSelector(userInfoSelector)
  const tagList = useAppSelector(TagListSelector)
  const categoryList = useAppSelector(categoryListSelector)
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [uploadLoading, setUploadLoading] = useState(false)
  const [addedPostMeta, setAddedPostMeta] = useState<PostMeta[]>([])

  const dropdownOptions: DropdownOptions[] = useMemo(() => {
    return categoryList.map((category) => ({
      key: category.id?.toString(),
      value: category.categoryName
    })) as DropdownOptions[]
  }, [categoryList])

  const selectOptions: SelectOption[] = useMemo(() => {
    return tagList.map((tag) => ({
      value: tag?.tagName,
      label: tag?.tagName,
      color: tag?.color,
      isDisabled: tag?.usedYn !== 'Y'
    })) as SelectOption[]
  }, [tagList])

  const handleContentChange = (content: string) => {
    setValue('content', content)
  }

  const handleToggleChange = async (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = async (post: any) => {
    try {
      const action = isEdit ? postApi.editPost : postApi.addPost

      if (!isEdit) {
        const titleResponse: ApiResponseDTO<boolean> = await postApi.postCheckTitle({ title: post?.title })
        if (titleResponse?.data) {
          setError('title', {
            type: 'manual',
            message: titleResponse?.message
          })
          return
        }
      }

      post.slug = slugify(post.title, { lower: true })
      const postRequest: Post = {
        ...post,
        postMetas: addedPostMeta,
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

  const handleTagChange = useCallback(
    (options: SelectOption[]) => {
      const tags: string[] = options.map((option) => option.value)
      setValue('tags', tags)
    },
    [setValue]
  )

  const handleOnFileUpload = useCallback(
    async (file: File) => {
      const postUploadRequest: UploadFileRequest = {
        id: userInfo?.id || 0,
        file
      }

      try {
        setUploadLoading(true)

        const response: ApiResponseDTO<FileMaster> = await fileUpload.uploadImage(postUploadRequest)

        if (response?.status.includes(API_STATUS.SUCCESS)) {
          setUploadedImage(response?.data?.fileUrl)
          setValue('thumbnail', response?.data?.fileUrl)
          setValue('thumbnailId', response?.data?.id)
          // setValue('images', [...(getValues('images') as number[]), response?.data?.id])
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        toast.error('Upload error')
        console.error(error)
      } finally {
        setUploadLoading(false)
      }
    },
    [userInfo?.id, setValue]
  )

  const handleOnFileDelete = async () => {
    const thumbnailId = getValues('thumbnailId')
    if (!thumbnailId || thumbnailId === 0) {
      return
    }

    try {
      const response: ApiResponseDTO<string> = await fileUpload.deleteImageById(thumbnailId)
      console.log('🚀 ~ handleOnFileDelete ~ response:', response)

      setUploadedImage('')
      setValue('thumbnail', '')
      setValue('thumbnailId', undefined)
      // setValue('images', [])
    } catch (error) {
      toast.error('Delete image error')
      console.log('🚀 ~ handleOnFileDelete ~ error:', error)
    }
  }

  const handleSelectedMeta = (meta: PostMeta) => {
    setAddedPostMeta((prevMeta) => {
      const currentMeta = prevMeta ?? []

      const isExists = currentMeta.some((_postMeta) => _postMeta.slug === meta.slug)
      if (isExists) {
        toast.warn('Mục lục đã thêm trước đó.')
        return [...currentMeta]
      }

      const updatedMeta = [...currentMeta, meta]
      return updatedMeta
    })
  }

  const handleDeletePostMeta = (postMeta: PostMeta) => () => {
    setAddedPostMeta((prevMeta) => prevMeta.filter((meta) => meta.slug !== postMeta.slug))
  }

  useEffect(() => {
    dispatch(getCategory({ ...defaultFilter, usedYn: 'Y' }))
    dispatch(getTag({ ...defaultFilter, usedYn: 'Y' }))
  }, [dispatch])

  useEffect(() => {
    setValue('id', data?.id)
    setValue('title', data?.title || '')
    setValue('description', data?.description)
    setValue('slug', data?.slug)
    setValue('usedYn', data?.usedYn || 'Y')
    setValue('categoryId', data?.categoryId || 0)
    setValue('thumbnail', data?.thumbnail || '')
    setValue('thumbnailId', data?.thumbnailId || undefined)
    setValue('content', data?.content)

    setAddedPostMeta(data?.postMetas as PostMeta[])
    setUploadedImage(data?.thumbnail || '')

    if (data?.tags) {
      const tags = (data.tags as Tag[]).map((tag: Tag) => {
        return tag.tagName
      })

      setValue('tags', tags)
    }

    const categories: Category = categoryList.filter((category: Category) => category.id === data?.categoryId)[0]
    setValue('categoryName', categories ? categories?.categoryName : 'Select category')
  }, [data, setValue, categoryList])

  return (
    <div className='grid grid-cols-6 gap-4'>
      <div id='post-detail_form' className='col-span-4'>
        <div className='p-10 bg-white rounded-lg dark:bg-darkbg2'>
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
                checked={getValues('usedYn') === 'Y'}
                onChange={handleToggleChange}
              />
            </Field>
            <Field>
              <Label htmlFor='title'>Title</Label>
              <InputCustom
                name='title'
                control={control}
                message={errors?.title?.message}
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
                maxLength={150}
                control={control}
                className='resize-none dark:bg-darkbg3'
              />
            </Field>
            <Field className='grid grid-cols-2 gap-6 mb-0'>
              <Field>
                <Label htmlFor='categoryId'>Category</Label>
                <DropdownCustom
                  name='categoryId'
                  data={dropdownOptions}
                  control={control}
                  message={errors?.categoryId?.message}
                  defaultValue={getValues('categoryName')}
                ></DropdownCustom>
              </Field>
              <Field>
                <Label htmlFor='tags'>Tags</Label>
                <InputSelectMulti
                  data={selectOptions}
                  name='tags'
                  value={getValues('tags') as string[]}
                  control={control}
                  onChange={handleTagChange}
                ></InputSelectMulti>
              </Field>
            </Field>

            <Field>
              <Label htmlFor='thumbnail'>Post Image</Label>
              <InputFile
                onFileUpload={handleOnFileUpload}
                uploadUrl={uploadedImage}
                onFileDelete={handleOnFileDelete}
                size='lg'
                loading={uploadLoading}
                maxSize={maxSize}
                className='max-w-2xl max-auto'
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
              <div className='content-editor'>
                <TinyMceCustom
                  value={getValues('content')}
                  onChange={handleContentChange}
                  selectedMeta={handleSelectedMeta}
                  placeholder='Nhập nội dung...'
                ></TinyMceCustom>
              </div>
            </Field>

            <div className='flex items-center justify-center gap-5 mb-4'>
              <ActionSave type='submit' isProcessing={isSubmitting} disabled={isSubmitting} className='w-24' />
            </div>
          </Form>
        </div>
      </div>
      <div id='post-detail_meta' className='relative col-span-2'>
        {addedPostMeta && (
          <div className='sticky p-6 bg-white rounded-lg top-36 dark:bg-darkbg2'>
            <div className='mb-3 text-lg font-bold text-text2 dark:text-white'>Mục lục bài viết ✍️</div>
            <div className='flex flex-col gap-2'>
              {addedPostMeta.map((postMeta) => (
                <div key={postMeta.slug}>
                  <div
                    id={postMeta.slug}
                    className='inline-flex items-center justify-between gap-2 p-2 pl-4 rounded-full bg-primary-50 text-primary-700'
                  >
                    <span>{postMeta.title}</span>
                    <span
                      className='p-1 rounded-full cursor-pointer bg-primary-200 hover:bg-primary-500'
                      onClick={handleDeletePostMeta(postMeta)}
                    >
                      <HiMiniXMark className='w-4 h-4 text-white' />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
