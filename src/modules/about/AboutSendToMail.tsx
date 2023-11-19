import InputAboutSendMail from '~/components/input/InputAboutSendMail'
import { TextDescript, TextMark } from '.'

export interface AboutSendToMailProps {
  className?: string
}

export default function AboutSendToMail(props: AboutSendToMailProps) {
  return (
    <div className={props.className}>
      <div className='relative z-10 pt-20 h-96'>
        <div className='flex flex-col items-center justify-center px-2 pb-10'>
          <TextDescript size='2xl' font='medium' className='text-text7'>
            Cùng lên ý tưởng nào 💡
          </TextDescript>
          <TextMark className='text-center text-text6'>
            Không có việc gì khó chỉ sợ lòng không bền, đào núi và lập biển, quyết chí ắt làm nên.
          </TextMark>
        </div>

        <div className='w-full md:-translate-x-1/2 md:absolute md:max-w-screen-2xl md:left-1/2 md:px-20'>
          <div className='flex flex-col items-center justify-center px-2 py-20 mx-auto rounded-lg bg-primary-600 dark:bg-dark-3'>
            <TextMark size={{ df: 'lg', md: '2xl' }} className='px-2 text-center text-white'>
              Bạn có ý tưởng hay? Hãy cùng nhau bắt tay và thực hiến nó 💪
            </TextMark>
            <InputAboutSendMail></InputAboutSendMail>
          </div>
        </div>
      </div>
    </div>
  )
}
