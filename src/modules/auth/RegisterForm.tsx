import { Button, Label, TextInput } from 'flowbite-react'
import { Field } from '~/components/field'
import { HiMail } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import IconGoogle from '~/components/icons/IconGoogle'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import { isAuthenticatedSelector, loadingSelector, registerStart } from '~/app/auth/authSlice'
import { useEffect } from 'react'

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(loadingSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleRegister = () => {
    dispatch(
      registerStart({
        userName: 'hoang tuan ngoc',
        email: 'admin04@gmail.com',
        password: '123456'
      })
    )
  }

  return (
    <form className='w-full mx-auto md:max-w-md'>
      <Field>
        <Label value='Email' htmlFor='email' className='md:text-base'></Label>
        <TextInput type='email' color='primary' id='email' icon={HiMail} placeholder='Nhập email của bạn'></TextInput>
      </Field>

      <Button
        fullSized
        gradientDuoTone='primary'
        className='mt-8 font-bold h-11'
        onClick={handleRegister}
        processingSpinner={loading}
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
    </form>
  )
}
