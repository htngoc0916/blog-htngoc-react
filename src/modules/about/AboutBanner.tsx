import TextMark from './TextMark'
import { Badge, Button } from 'flowbite-react'
import { BadgeGroup } from '~/components/badge'
import { TextCustom } from '~/components/text'

export interface AboutIntroProps {
  className?: string
}

export default function AboutBanner(props: AboutIntroProps) {
  return (
    <div className={props.className}>
      <div className='container-page pt-page max-w-screen-2xl'>
        <div className='grid items-center justify-center h-full grid-cols-1 mx-auto md:grid-cols-2'>
          <div className='flex flex-col items-start justify-center'>
            <TextCustom color='primary'>Hey There 👋 I am</TextCustom>
            <TextCustom size='xl' gradient='primary'>
              Tuấn Ngọc
            </TextCustom>

            <TextMark>
              <span className='mr-2'>Xin chào, mình là Ngọc. Hiện đang là một</span>
              <BadgeGroup className='inline-block'>
                <Badge color='primary' size='sm'>
                  Java Web Developer
                </Badge>
              </BadgeGroup>
              <p>Chào mừng bạn đến với Website của mình. 😚</p>
            </TextMark>

            <div className='flex gap-4 py-5'>
              <Button gradientDuoTone='primary' pill className='font-bold w-28'>
                Liên hệ
              </Button>
              <Button gradientDuoTone='primary' pill className='font-bold w-28' outline>
                Blogs
              </Button>
            </div>
          </div>

          <div className='relative overflow-hidden max-h-[500px]'>
            <img
              srcSet='/img/about_banner.svg'
              alt='banner'
              className='absolute top-0 right-0 z-0 translate-y-1 w-100'
            />
            {/* <img srcSet='/img/about_banner2.png' alt='logo' className='relative z-10 object-cover' /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
