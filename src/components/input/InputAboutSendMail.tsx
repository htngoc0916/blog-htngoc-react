import { Button } from 'flowbite-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { HiEnvelope } from 'react-icons/hi2'

const classes = {
  root: { base: 'md:max-w-3xl w-full h-full relative mt-5' },
  input: {
    base: 'w-full md:h-16 bg-white rounded-full text-text1 backdrop-filter backdrop-blur-lg bg-opacity-60 md:px-20 pl-12',
    focus: 'focus:border-primary-500 focus:ring-primary-500 focus:ring-4 '
  }
}
export interface InputAboutSendMailProps {
  className?: string
  children?: ReactNode
}

export default function InputAboutSendMail(props: InputAboutSendMailProps) {
  const { className } = props
  return (
    <div className={twMerge(classes.root.base, className)}>
      <div className='relative'>
        <input
          type='text'
          className={twMerge(classes.input.base, classes.input.focus)}
          placeholder='Nhập email của bạn'
        />
        <div className='absolute -translate-y-1/2 top-1/2 md:left-6 left-3'>
          <HiEnvelope className='w-6 h-6 md:w-8 md:h-8 text-text2'></HiEnvelope>
        </div>
      </div>
      <div className='pt-2 md:absolute md:-translate-y-1/2 md:top-1/2 md:right-3 md:pt-0'>
        <Button color='secondary' pill className='w-full font-bold bg-white text-primary md:bg-primary'>
          send mail
        </Button>
      </div>
    </div>
  )
}
