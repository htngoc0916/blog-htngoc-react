import ContactIconArea from './ContactIconArea'
import TextFooter from './TextFooter'

export interface IAboutFooterProps {
  className?: string
}

export default function AboutFooter(props: IAboutFooterProps) {
  const { className } = props
  return (
    <div className={className}>
      <div className='container px-4 mx-auto lg:px-0'>
        <div className='grid grid-cols-1 gap-2 pb-6 text-white lg:grid-cols-4'>
          <div>
            <TextFooter className='pb-5 text-4xl font-bold'>Let's Talk!</TextFooter>
            <TextFooter size='xl'>Thông tin liên hệ</TextFooter>
            <TextFooter>htngoc0916@gmail.com</TextFooter>
            <TextFooter>DongDeaMun, Seoul, Korea</TextFooter>
          </div>

          <div>
            <TextFooter size='xl'>What I do?</TextFooter>
            <TextFooter>Blog lập trình</TextFooter>
            <TextFooter>Chia sẽ kiến thực lập trình</TextFooter>
          </div>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25294.23143477839!2d127.03007042936508!3d37.583823069266764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb5cd4298ec1%3A0xe040c8bbb76d2b24!2sDongdaemun-gu%2C%20Seoul!5e0!3m2!1svi!2skr!4v1686927062554!5m2!1svi!2skr'
            style={{ width: '100%', height: '300px', border: 'none' }}
            loading='lazy'
            className='md:col-span-2'
          ></iframe>
        </div>

        <div className='flex flex-col items-center justify-center border-t border-text3'>
          <TextFooter className='pt-5'>All rights reserved by htngoc</TextFooter>
          <ContactIconArea className='gap-4 pt-2'></ContactIconArea>
        </div>
      </div>
    </div>
  )
}
