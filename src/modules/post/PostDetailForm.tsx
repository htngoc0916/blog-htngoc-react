import { Field, Form } from '~/components/form'
import { TextCustom } from '~/components/text'
import { Post, defaultFilter } from '~/types'
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
export interface PostDetailFormProps {
  isEdit: boolean
  data: Post | null
  className?: string
}

const myColors = ['purple', '#785412', '#452632', '#856325', '#963254', '#254563', 'white']
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: ['right', 'center', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ color: myColors }],
    [{ background: myColors }]
  ]
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'color',
  'image',
  'background',
  'align'
]

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

  const dispatch = useDispatch()
  const tagList = useAppSelector(TagListSelector)
  const categoryList = useAppSelector(categoryListSelector)

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

  const [code, setCode] = useState('hello guys you can also add fonts and another features to this editor.')
  const handleProcedureContentChange = (content: any) => {
    setCode(content)
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

  const handleSave = () => {}

  const handleTagChange = () => {}

  const handleOnFileUpload = useCallback(async (file: File) => {}, [])

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
            <Label htmlFor='category'>Category</Label>
            <DropdownCustom name='category' data={dropdownOptions} control={control}></DropdownCustom>
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
          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
          />
        </Field>

        <div className='flex items-center justify-center mb-5'>
          <ActionSave isProcessing={false} disabled={false} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
