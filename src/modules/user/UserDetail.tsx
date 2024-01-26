import { API_STATUS, ApiResponseDTO, FileMaster, ROLE, UploadRequest, User, UserRequestDTO } from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'
import { memo, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionClose, ActionSave } from '~/components/action'
import { TextCustom } from '~/components/text'
import userApi from '~/apis/userApi'
import { toast } from 'react-toastify'
import { EMAIL_EXISTS, SAVED_SUCCESS } from '~/utils/message'
import { Field, Form } from '~/components/form'
import { ButtonToggleSwitch } from '~/components/button'
import { Label } from 'flowbite-react'
import { InputCustom, InputFile, InputPassword } from '~/components/input'
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2'
import { RadioCustom } from '~/components/radio'
import { checkAdminRole } from '~/utils/checkAdmin'
import fileUpload from '~/apis/fileUploadApi'

export interface UserDetailProps {
  data: User | undefined
  className: string
  onCloseUser: () => void
  onSaveUser: () => void
}

export interface UploadedImage {
  imageId: number
  imageType: 'new' | 'edit' | ''
  imageUrl: string
}

export interface DelelteImage {
  imageUrl: string
}

const schema = yup.object({
  id: yup.number(),
  userName: yup.string().required('Vui lòng nhập tên'),
  email: yup.string().required('Vui lòng nhập email'),
  avatar: yup.string(),
  usedYn: yup.string(),
  password: yup.string(),
  role: yup.string()
})

const UserDetail = memo(function UserDetail({ data, className, onCloseUser, onSaveUser }: UserDetailProps) {
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      id: 0,
      userName: '',
      email: '',
      avatar: '',
      password: '',
      usedYn: 'Y',
      role: ROLE.ROLE_USER
    }
  })

  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const [loading, setLoading] = useState(false)
  const isEdit = Boolean(data)

  const watchRole = watch('role')

  const handleToggleChange = (value: boolean) => {
    setValue('usedYn', value ? 'Y' : 'N')
  }

  useEffect(() => {
    if (data && Boolean(data)) {
      setValue('id', data?.id || 0)
      setValue('userName', data?.userName || '')
      setValue('email', data?.email || '')
      setValue('avatar', data?.avatar || '')
      setValue('usedYn', data?.usedYn || 'Y')
      setValue('password', '')
      setValue('role', checkAdminRole(data) ? ROLE.ROLE_ADMIN : ROLE.ROLE_USER)
    }
  }, [data, setValue])

  const [uploadedImage, setUploadedImage] = useState<UploadedImage>({
    imageId: 0,
    imageType: '',
    imageUrl: ''
  })

  // const prevImageUrlRef = useRef(uploadedImage.imageUrl)
  // useEffect(() => {
  //   const cleanupFunction = async () => {
  //     if (prevImageUrlRef.current !== uploadedImage.imageUrl && uploadedImage.imageType === 'new') {
  //       const deleteUploadRequest: DeleteUploadRequest = {
  //         url: uploadedImage.imageUrl,
  //         navigate
  //       }
  //       console.log('🚀 ~ cleanupFunction ~ deleteUploadRequest:', deleteUploadRequest)

  //       // delete image not saved
  //       // try {
  //       //   const response: ApiResponseDTO<string> = await fileUpload.deleteAvatar(deleteUploadRequest)
  //       //   console.log('cleanup function', response)
  //       // } catch (error) {
  //       //   console.error('Error during cleanup:', error)
  //       // }
  //     }
  //   }

  //   cleanupFunction()
  // }, [uploadedImage, navigate])

  useEffect(() => {
    if (data?.avatar) {
      setUploadedImage(() => ({
        imageId: 0,
        imageType: '',
        imageUrl: data.avatar || ''
      }))
    }
  }, [data?.avatar])

  const handleOnFileDelete = () => {
    console.log('delete')
  }

  //upload file
  const handleOnFileUpload = useCallback(async (file: File) => {
    const uploadRequest: UploadRequest = {
      id: userInfo?.id || 0,
      file,
      navigate
    }

    const response: ApiResponseDTO<FileMaster> = await fileUpload.uploadAvatar(uploadRequest)
    if (response?.status.includes(API_STATUS.SUCCESS)) {
      setUploadedImage({
        imageId: response.data.id,
        imageUrl: response.data.fileUrl,
        imageType: 'new'
      })
      setValue('avatar', response.data.fileUrl)
    }
  }, [])

  const handleSave = async (user: User) => {
    const userRequest: UserRequestDTO = {
      ...user,
      modId: isEdit ? userInfo?.id : undefined,
      regId: isEdit ? undefined : userInfo?.id,
      imageId: uploadedImage?.imageId || 0,
      navigate
    }

    console.log('Editing User:', user)
    return

    try {
      setLoading(true)
      if (isEdit) {
        console.log('Editing User:', user)
        const response: ApiResponseDTO<User> = await userApi.editUser(userRequest)
        console.log('🚀 ~ handleSave ~ response:', response.message)
        if (response?.status.includes(API_STATUS.FAILED)) {
          return toast.error(response.message)
        }
      } else {
        console.log('Creating new User:', user)
        const emailResponse: ApiResponseDTO<boolean> = await userApi.userCheckEmail(user?.email || '')
        if (emailResponse?.data) {
          setError('email', {
            type: 'manual',
            message: EMAIL_EXISTS
          })
          return
        }

        const response: ApiResponseDTO<User> = await userApi.addUser(userRequest)
        if (response?.status.includes(API_STATUS.FAILED)) {
          return toast.error(response.message)
        }
      }
      toast.success(SAVED_SUCCESS)
      onSaveUser?.()
    } catch (error: any) {
      console.log(error)
      return toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={twMerge(className, 'relative')}>
      <div className='absolute top-2 right-2'>
        <ActionClose onClick={onCloseUser}></ActionClose>
      </div>
      <div className='flex mb-10'>
        <TextCustom size='xs' className='text-text2 dark:text-text7'>
          {isEdit ? 'Chỉnh sửa' : 'Tạo mới'} 🦑
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
        <div className='flex items-center justify-center gap-4 mb-8'>
          <div className='w-32 mx-auto'>
            <InputFile
              onFileUpload={handleOnFileUpload}
              uploadUrl={uploadedImage.imageUrl}
              onFileDelete={handleOnFileDelete}
            ></InputFile>
          </div>
          <div className='flex-1 text-sm'>
            <p>
              <span className='text-primary-700 dark:text-primary-400'>Click to upload</span> or drag and drop
            </p>
            <p className='text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          {/* <div className='flex flex-wrap items-center justify-center p-2 mx-auto'>
            <Avatar size='lg' img={uploadedImage.imageUrl} rounded bordered></Avatar>
          </div> */}
        </div>

        <Field>
          <Label htmlFor='userName'>Name</Label>
          <InputCustom
            type='text'
            name='userName'
            icon={HiOutlineUser}
            control={control}
            message={errors?.userName?.message}
            maxLength={100}
          ></InputCustom>
        </Field>

        {/* <Field>
          <InputFile content='SVG, PNG, JPG or GIF (MAX. 800x400px)' onFileUpload={handleOnFileUpload}></InputFile>
        </Field> */}

        <Field>
          <Label htmlFor='email'>Email</Label>
          <InputCustom
            type='email'
            name='email'
            autoComplete='off'
            icon={HiOutlineEnvelope}
            control={control}
            message={errors?.email?.message}
            maxLength={100}
            disabled={isEdit}
          ></InputCustom>
        </Field>

        <Field>
          <Label htmlFor='password'>Password</Label>
          <InputPassword
            name='password'
            autoComplete='off'
            icon={HiOutlineLockClosed}
            control={control}
            message={errors?.password?.message}
            disabled={isEdit}
          ></InputPassword>
        </Field>

        <Field>
          <Label>Roles</Label>
          <div className='flex items-center gap-10'>
            <RadioCustom
              id='admin'
              name='role'
              value={ROLE.ROLE_ADMIN}
              title='Admin'
              control={control}
              checked={watchRole === ROLE.ROLE_ADMIN}
            />
            <RadioCustom
              id='user'
              name='role'
              value={ROLE.ROLE_USER}
              title='User'
              control={control}
              checked={watchRole === ROLE.ROLE_USER}
            />
          </div>
        </Field>

        <div className='flex items-center justify-center'>
          <ActionSave isProcessing={loading} disabled={loading} className='w-24' />
        </div>
      </Form>
    </div>
  )
})

export default UserDetail
