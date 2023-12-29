import { Button, Checkbox, Label } from 'flowbite-react'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import InputPassword from '~/components/input/InputPassword'
import { Link, useNavigate } from 'react-router-dom'
import IconGoogle from '~/components/icons/IconGoogle'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, loadingSelector, loginStart } from '~/app/auth/authSlice'
import { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { LoginRequestDTO } from '~/types'
import { InputCustom } from '~/components/input'
import { Form, Field } from '~/components/form'

const schema = yup.object({
  email: yup.string().email('Kiểm tra lại định dạng email').required('Vui lòng nhập email của bạn'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải ít nhất 6 ký tự')
})

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(loadingSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = (values: LoginRequestDTO) => {
    dispatch(
      loginStart({
        ...values
      })
    )
  }

  return (
    <Form onSubmit={handleSubmit(handleLogin)} className='md:max-w-md'>
      <Field>
        <InputCustom
          name='email'
          type='email'
          icon={HiMail}
          placeholder='Nhập email của bạn'
          control={control}
          message={errors?.email?.message}
        ></InputCustom>
      </Field>

      <Field>
        <InputPassword
          name='password'
          icon={HiLockClosed}
          placeholder='Nhập mật khẩu của bạn'
          control={control}
          message={errors?.password?.message}
        ></InputPassword>
      </Field>

      <div className='flex items-center justify-between'>
        <Field horizontally className='mb-0'>
          <Checkbox id='remember' color='primary' />
          <Label htmlFor='remember'>Nhớ tài khoản</Label>
        </Field>
        <Link to='forgot-password' className='text-sm font-bold text-primary-800 dark:text-primary-600'>
          Quên mật khẩu
        </Link>
      </div>

      <Button
        type='submit'
        fullSized
        gradientDuoTone='primary'
        className='mt-8 font-bold h-11'
        isProcessing={loading}
        disabled={loading}
      >
        Đăng nhập
      </Button>

      <Button
        fullSized
        className='mt-4 font-bold enabled:hover:text-primary-700 focus:ring-primary-300 focus:text-primary-700 h-11'
        color='gray'
      >
        <IconGoogle className='mr-2 w-7 h-7'></IconGoogle>
        Đăng nhập với Google
      </Button>

      <div className='flex gap-3 text-sm pt-7 md:text-base'>
        Bạn chưa có tài khoản?
        <Link to='/register' className='font-semibold text-primary-800 dark:text-primary-600'>
          Đăng ký
        </Link>
      </div>
    </Form>
  )
}
