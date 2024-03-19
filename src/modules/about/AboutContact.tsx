import { Button } from 'flowbite-react'
import { TextDescript, TextMark, TextTitle } from '.'
import { InputFloating } from '~/components/input'
import { Form } from '~/components/form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { TextareaCustom } from '~/components/textarea'

export interface IAboutContactProps {
  className?: string
}

export default function AboutContact(props: IAboutContactProps) {
  const schema = yup.object().shape({
    email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
    fullname: yup.string().required('Vui lòng nhập tên'),
    content: yup.string()
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      fullname: '',
      content: ''
    }
  })

  const handleSendEmail = (value: any) => {
    console.log('🚀 ~ handleSendEmail ~ value:', value)
  }

  return (
    <div id='contact-to-me' className={props.className}>
      <div className='container p-4 py-32 mx-auto md:px-0'>
        <div className='flex flex-col items-center justify-center pb-14'>
          <TextTitle>Liên hệ với tôi 📟</TextTitle>
          <TextDescript>Gửi Đến Tôi</TextDescript>
          <TextMark className='text-center'>
            Bất kỳ câu hỏi hoặc lời đánh giá từ bạn đều là động lực để mình tiếp tục phát triển và cải thiện hơn. 📬
          </TextMark>
        </div>

        <Form onSubmit={handleSubmit(handleSendEmail)}>
          <div className='grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 md:w-2/3'>
            <InputFloating
              type='text'
              name='fullname'
              label='Tên'
              sizing='md'
              className='bg-white rounded-none'
              control={control}
              message={errors?.fullname?.message}
            ></InputFloating>

            <InputFloating
              type='email'
              name='email'
              label='Email'
              sizing='md'
              className='bg-white rounded-none'
              control={control}
              message={errors?.email?.message}
            ></InputFloating>

            <div className='md:col-span-2'>
              <TextareaCustom
                name='content'
                placeholder='Nhập nội dung câu hỏi hoặc một vài lời đánh giá...'
                color='default'
                rows={10}
                control={control}
              ></TextareaCustom>
            </div>
          </div>
          <div className='flex items-center justify-center pt-10'>
            <Button type='submit' gradientDuoTone='primary' className='font-bold w-28'>
              Gửi
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
