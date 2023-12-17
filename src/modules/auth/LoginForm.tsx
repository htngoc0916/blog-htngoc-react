import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { Field } from '~/components/field'
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

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Please enter your email'),
  password: yup.string().required('Please enter your password').min(6, 'Password must be 6 character')
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
    mode: 'onSubmit'
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
    <form autoComplete='off' onSubmit={handleSubmit(handleLogin)} className='w-full mx-auto md:max-w-md'>
      <Field>
        <Label value='Email' htmlFor='email' className='md:text-base'></Label>
        <InputCustom
          name='email'
          type='email'
          icon={HiMail}
          placeholder='Nhập email của bạn'
          control={control}
        ></InputCustom>
      </Field>

      <Field>
        <Label value='Password' htmlFor='password' className='md:text-base'></Label>
        <InputPassword
          name='password'
          icon={HiLockClosed}
          placeholder='Nhập password của bạn'
          control={control}
          message={errors.password?.message}
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

      <Button type='submit' fullSized gradientDuoTone='primary' className='mt-8 font-bold h-11' isProcessing={loading}>
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
    </form>
  )
}
