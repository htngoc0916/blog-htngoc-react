import { Button } from 'flowbite-react'
import { HiMail, HiUser, HiLockClosed } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import IconGoogle from '~/components/icons/IconGoogle'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, loadingSelector, registerStart } from '~/app/auth/authSlice'
import { useEffect } from 'react'
import * as yup from 'yup'
import { InputCustom } from '~/components/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Field } from '~/components/form'
import { ApiResponseDTO, RegisterRequestDTO } from '~/types'
import userApi from '~/apis/userApi'
import { EMAIL_EXISTS } from '~/utils/message'

const schema = yup.object({
  email: yup.string().email('Kiểm tra lại định dạng email').required('Vui lòng nhập email của bạn'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
  userName: yup.string().required('Vui lòng nhập tên của bạn').min(3, 'Tên phải ít nhất 3 ký tự')
})

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(loadingSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit'
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleRegister = async (values: RegisterRequestDTO) => {
    try {
      const response: ApiResponseDTO<boolean> = await userApi.userCheckEmail(values.email)
      console.log('register form: ', response)
      if (response?.data) {
        setError('email', {
          type: 'manual',
          message: EMAIL_EXISTS
        })
        return
      }

      dispatch(
        registerStart({
          ...values
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit(handleRegister)} className='md:max-w-md'>
      <Field>
        <InputCustom
          type='text'
          name='userName'
          icon={HiUser}
          placeholder='Nhập tên của bạn'
          control={control}
          message={errors?.userName?.message}
        ></InputCustom>
      </Field>

      <Field>
        <InputCustom
          type='email'
          name='email'
          icon={HiMail}
          control={control}
          message={errors?.email?.message}
          placeholder='Nhập email của bạn'
        ></InputCustom>
      </Field>

      <Field>
        <InputCustom
          type='password'
          name='password'
          icon={HiLockClosed}
          control={control}
          message={errors?.password?.message}
          placeholder='Nhập mật khẩu của bạn'
        ></InputCustom>
      </Field>

      <Field>
        <InputCustom
          type='password'
          name='passwordConfirm'
          icon={HiLockClosed}
          control={control}
          message={errors?.passwordConfirm?.message}
          placeholder='Xác nhận lại mật khẩu'
        ></InputCustom>
      </Field>

      <Button
        type='submit'
        fullSized
        gradientDuoTone='primary'
        className='mt-8 font-bold h-11'
        isProcessing={loading}
        disabled={loading}
      >
        Tạo mới
      </Button>

      <Button
        fullSized
        className='mt-4 font-bold enabled:hover:text-primary-700 focus:ring-primary-300 focus:text-primary-700 h-11'
        color='gray'
      >
        <IconGoogle className='mr-2 w-7 h-7'></IconGoogle>
        Tạo mới bằng Google
      </Button>

      <div className='flex gap-3 text-sm pt-7 md:text-base'>
        Bạn đã có tài khoản?
        <Link to='/login' className='font-semibold text-primary-800 dark:text-primary-600'>
          Đăng nhập
        </Link>
      </div>
    </Form>
  )
}
