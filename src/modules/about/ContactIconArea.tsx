import { Button } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { IconFacebook, IconTelephonePlus } from '~/components/icons'

export interface IContactIconAreaProps {
  className?: string
}

export default function ContactIconArea(props: IContactIconAreaProps) {
  return (
    <div className={twMerge('flex', props.className)}>
      <Button color='secondary' pill className='w-10 h-10'>
        <IconFacebook className='text-2xl text-text3'></IconFacebook>
      </Button>
      <Button color='secondary' pill className='w-10 h-10'>
        <IconTelephonePlus className='text-xl text-text3'></IconTelephonePlus>
      </Button>
    </div>
  )
}
