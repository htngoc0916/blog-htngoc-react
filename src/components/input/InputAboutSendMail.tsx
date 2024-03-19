import { ChangeEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { HiEnvelope } from 'react-icons/hi2'
import { Control, useController } from 'react-hook-form'

const classes = {
  root: { base: 'md:max-w-3xl w-full h-full relative mt-5 mx-auto' },
  input: {
    base: 'w-full md:h-16 bg-white rounded-full text-text1 backdrop-filter backdrop-blur-lg bg-opacity-60 md:px-20 pl-12',
    focus: 'focus:border-primary-500 focus:ring-primary-500 focus:ring-4 '
  }
}
export interface InputAboutSendMailProps {
  className?: string
  children?: ReactNode
  name: string
  control: Control<any>
}

export default function InputAboutSendMail(props: InputAboutSendMailProps) {
  const { className, name, control, children } = props
  const { field } = useController({ control, name })
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e)
  }
  return (
    <div className={twMerge(classes.root.base, className)}>
      <div className='relative'>
        <input
          type='text'
          className={twMerge(classes.input.base, classes.input.focus)}
          {...field}
          name={name}
          onChange={handleOnChange}
          placeholder='Nhập email của bạn'
        />
        <div className='absolute -translate-y-1/2 top-1/2 md:left-6 left-3'>
          <HiEnvelope className='w-6 h-6 md:w-8 md:h-8 text-text2'></HiEnvelope>
        </div>
      </div>
      {children}
    </div>
  )
}
