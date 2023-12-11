import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { Field } from '~/components/field'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import InputPassword from '~/components/input/InputPassword'
import { Link, useNavigate } from 'react-router-dom'
import IconGoogle from '~/components/icons/IconGoogle'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, loadingSelector, login } from '~/features/auth/authSlice'
import { useEffect } from 'react'

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(loadingSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = () => {
    dispatch(
      login({
        email: '',
        password: ''
      })
    )
  }

  return (
    <form className='w-full mx-auto md:max-w-md'>
      <Field>
        <Label value='Email' htmlFor='email' className='md:text-base'></Label>
        <TextInput type='email' color='primary' id='email' icon={HiMail} placeholder='Nhập email của bạn'></TextInput>
      </Field>

      <Field>
        <Label value='Password' htmlFor='password' className='md:text-base'></Label>
        <InputPassword
          id='password'
          icon={HiLockClosed}
          color='primary'
          placeholder='Nhập password của bạn'
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
        fullSized
        gradientDuoTone='primary'
        className='mt-8 font-bold h-11'
        onClick={handleLogin}
        isProcessing={loading}
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
        <Link to='/sign-up' className='font-semibold text-primary-800 dark:text-primary-600'>
          Đăng ký
        </Link>
      </div>
    </form>
  )
}