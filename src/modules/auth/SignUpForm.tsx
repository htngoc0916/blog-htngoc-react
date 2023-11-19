import { Button, Label, TextInput } from 'flowbite-react'
import { Field } from '~/components/field'
import { HiMail } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import IconGoogle from '~/components/icons/IconGoogle'
export interface ISignUpFormProps {}

export default function SignUpForm() {
  return (
    <form className='w-full mx-auto md:max-w-md'>
      <Field>
        <Label value='Email' htmlFor='email' className='md:text-base'></Label>
        <TextInput type='email' color='primary' id='email' icon={HiMail} placeholder='Nhập email của bạn'></TextInput>
      </Field>

      <Button fullSized gradientDuoTone='primary' className='mt-8 font-bold h-11'>
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
