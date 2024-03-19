import InputAboutSendMail from '~/components/input/InputAboutSendMail'
import { TextDescript, TextMark } from '.'
import { Form } from '~/components/form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { API_STATUS, ApiResponseDTO, Contact } from '~/types'
import contactApi from '~/apis/apiContact'
import { Button } from 'flowbite-react'
import { HiOutlinePaperAirplane } from 'react-icons/hi2'

export interface AboutSendToMailProps {
  className?: string
}

export default function AboutSendToMail(props: AboutSendToMailProps) {
  const { t } = useTranslation(['common', 'auth'])

  const schema = yup.object().shape({
    email: yup.string().email(t('auth:form.invalid-email')).required(t('auth:form.email-required'))
  })

  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: ''
    }
  })

  useEffect(() => {
    if (errors?.email) {
      toast.error(errors?.email.message)
    }
  }, [errors?.email])

  const handleSendEmail = async (data: { email: string }) => {
    console.log('🚀 ~ handleSendEmail ~ email:', data.email)
    try {
      setLoading(true)
      const response: ApiResponseDTO<Contact> = await contactApi.sendIdea({ email: data.email })

      if (response?.status.includes(API_STATUS.SUCCESS)) {
        toast.success(response?.message)
      } else {
        toast.error(response.message)
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={props.className}>
      <div className='relative z-10 pt-20 h-96'>
        <div className='flex flex-col items-center justify-center px-2 pb-10'>
          <TextDescript size='2xl' font='medium' className='text-text7'>
            Cùng lên ý tưởng nào 💡
          </TextDescript>
          <TextMark className='text-center text-text6'>
            Nếu bạn có ý tưởng hay đang muốn thực hiện. Hãy để lại email mình sẽ tự động liên hệ để cùng nhau hợp tác.
          </TextMark>
        </div>

        <div className='w-full md:-translate-x-1/2 md:absolute md:max-w-screen-2xl md:left-1/2 md:px-20'>
          <div className='flex flex-col items-center justify-center px-2 py-20 mx-auto rounded-lg bg-primary-600 dark:bg-dark-3'>
            <TextMark size={{ df: 'lg', md: '2xl' }} className='px-2 text-center text-white'>
              Bạn có ý tưởng hay? Hãy cùng nhau bắt tay và thực hiến nó 💪
            </TextMark>
            <Form onSubmit={handleSubmit(handleSendEmail)}>
              <InputAboutSendMail name='email' control={control}>
                <div className='pt-2 md:absolute md:-translate-y-1/2 md:top-1/2 md:right-3 md:pt-0'>
                  <Button
                    type='submit'
                    color='secondary'
                    pill
                    className='w-full font-bold bg-white text-primary md:bg-primary'
                    disabled={loading}
                  >
                    {'Gửi '} <HiOutlinePaperAirplane className='w-4 h-4 ml-2' />
                  </Button>
                </div>
              </InputAboutSendMail>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
