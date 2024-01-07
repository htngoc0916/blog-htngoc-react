import { API_STATUS, ApiResponseDTO, ROLE, User, UserRequestDTO } from '~/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ActionClose, ActionSave } from '~/components/action'
import { TextCustom } from '~/components/text'
import userApi from '~/apis/userApi'
import { toast } from 'react-toastify'
import { EMAIL_EXISTS, SAVED_SUCCESS } from '~/utils/message'
import { Field, Form } from '~/components/form'
import { ButtonToggleSwitch } from '~/components/button'
import { Avatar, Label } from 'flowbite-react'
import { InputCustom, InputFile, InputPassword } from '~/components/input'
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2'
import { RadioCustom } from '~/components/radio'
import { checkAdminRole } from '~/utils/checkAdmin'
import { HiXMark } from 'react-icons/hi2'

export interface UserDetailProps {
  data: User | undefined
  className: string
  onCloseUser: () => void
  onSaveUser: () => void
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

export default function UserDetail({ data, className, onCloseUser, onSaveUser }: UserDetailProps) {
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      id: data?.id || 0,
      userName: data?.userName || '',
      email: data?.email || '',
      avatar: data?.avatar || '',
      password: '',
      usedYn: data?.usedYn || 'Y',
      role: checkAdminRole(data) ? ROLE.ROLE_ADMIN : ROLE.ROLE_USER
    }
  })

  const navigate = useNavigate()
  const userInfo = useAppSelector(userInfoSelector)
  const [loading, setLoading] = useState(false)
  const [isToggleChecked, setIsToggleChecked] = useState(data?.usedYn !== 'N')
  const isEdit = data ? true : false

  useEffect(() => {
    setValue('id', data?.id || 0)
    setValue('userName', data?.userName || '')
    setValue('email', data?.email || '')
    setValue('avatar', data?.avatar || '')
    setValue('usedYn', data?.usedYn || 'Y')
    setValue('password', '')
    setIsToggleChecked(data?.usedYn !== 'N')
  }, [data, setValue, userInfo])

  const handleToggleChange = (value: boolean) => {
    setIsToggleChecked(value)
    setValue('usedYn', value ? 'Y' : 'N')
  }

  const handleSave = async (user: User) => {
    console.log('🚀 ~ file: UserDetail.tsx:85 ~ handleSave ~ user:', user)
    const userRequest: UserRequestDTO = {
      ...user,
      modId: data ? userInfo?.id : undefined,
      regId: data ? undefined : userInfo?.id,
      navigate
    }

    try {
      setLoading(true)
      if (data) {
        console.log('Editing User:', user)
        const response: ApiResponseDTO<User> = await userApi.editUser(userRequest)
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
      onSaveUser()
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
          {data ? 'Chỉnh sửa' : 'Tạo mới'} 🦑
        </TextCustom>
      </div>

      <Form onSubmit={handleSubmit(handleSave)}>
        <Field>
          <ButtonToggleSwitch name='usedYn' control={control} checked={isToggleChecked} onChange={handleToggleChange} />
        </Field>
        <Field horizontally className='gap-4'>
          <div className='flex flex-wrap items-center justify-center w-20 h-20 p-2'>
            <Avatar size='ct' img={data?.avatar} rounded bordered></Avatar>
          </div>

          <Field className='flex-1 mb-0'>
            <Label htmlFor='userName'>Name</Label>
            <InputCustom
              type='text'
              name='userName'
              rightIcon={HiOutlineUser}
              control={control}
              message={errors?.userName?.message}
              maxLength={100}
            ></InputCustom>
          </Field>
        </Field>
        <Field>
          <InputFile></InputFile>
        </Field>
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
            <RadioCustom id='admin' name='role' value={ROLE.ROLE_ADMIN} title='Admin' control={control}></RadioCustom>
            <RadioCustom
              id='user'
              name='role'
              value={ROLE.ROLE_USER}
              title='User'
              defaultChecked
              control={control}
            ></RadioCustom>
          </div>
        </Field>

        <div className='flex items-center justify-center'>
          <ActionSave isProcessing={loading} disabled={loading} className='w-24' />
        </div>
      </Form>
    </div>
  )
}
