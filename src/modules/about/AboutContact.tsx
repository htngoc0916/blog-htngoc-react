import { Button, Textarea } from 'flowbite-react'
import { TextDescript, TextMark, TextTitle } from '.'
import { InputFloating } from '~/components/input'

export interface IAboutContactProps {
  className?: string
}

export default function AboutContact(props: IAboutContactProps) {
  return (
    <div className={props.className}>
      <div className='container p-4 py-32 mx-auto md:px-0'>
        <div className='flex flex-col items-center justify-center pb-14'>
          <TextTitle>Liên hệ với tôi 📟</TextTitle>
          <TextDescript>Gửi Đến Tôi</TextDescript>
          <TextMark className='text-center'>
            Bất kỳ câu hỏi hoặc lời đánh giá từ bạn đều là động lực để mình tiếp tục phát triển và cải thiện hơn. 📬
          </TextMark>
        </div>

        <form className='w-full'>
          <div className='grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 md:w-2/3'>
            <InputFloating
              type='text'
              name='email'
              label='Tên'
              sizing='md'
              className='bg-white rounded-none'
            ></InputFloating>
            <InputFloating
              type='email'
              name='email'
              label='Email'
              sizing='md'
              className='bg-white rounded-none'
            ></InputFloating>

            <Textarea
              name='comment'
              placeholder='Nhập nội dung câu hỏi hoặc một vài lời đánh giá...'
              color='default'
              rows={10}
              className='md:col-span-2'
            />
          </div>
          <div className='flex items-center justify-center pt-10'>
            <Button gradientDuoTone='primary' className='font-bold w-28'>
              Gửi
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
