import { TextDescript, TextMark, TextTitle } from '.'
import ContactIconArea from './ContactIconArea'

export interface AboutIntroductionProps {
  className?: string
  children?: React.ReactNode
}

const myInfo = [
  {
    id: 1,
    info: ` Mình từng theo học ngành Công Nghệ Thông Tin và Truyền Thông tại trường Đại Học Tongmyong Busan, Hàn
  Quốc. ✍🏼 Mình đã có một thời gian làm việc ở một công ty lập trình chuyên về mảng
  Logistics tại Busan. 😙`
  },
  {
    id: 2,
    info: `Hiện tại, mình đang sinh sống và làm việc tại thủ đô Seoul, Hàn Quốc 🌴, chủ yếu làm về Backend Java. `
  }
]

export default function AboutIntroduction(props: AboutIntroductionProps) {
  const { className } = props
  return (
    <div className={className}>
      <div className='py-10 border-b container-page border-text6 dark:border-text3'>
        <div className='grid grid-cols-1 md:gap-28 md:grid-cols-2'>
          <div>
            <TextTitle size='2xl' font='bold'>
              ABOUT ME
            </TextTitle>
            <TextDescript size='2xl' className='md:text-4xl'>
              Một chút về bản thân
            </TextDescript>
            <TextMark>
              {myInfo.map((item) => (
                <span key={item.id} className='pb-3 text-left'>
                  {item.info}
                </span>
              ))}
            </TextMark>
          </div>

          <div className='flex flex-col justify-center'>
            <TextDescript size='2xl' className='md:text-3xl'>
              Kết nối với mình
            </TextDescript>
            <TextMark>
              Mục đích của trang web này là để chia sẻ những kiến thức thú vị, tạo ra một nơi để giao lưu, kết nối với
              những người có cùng đam mê, quan tâm đến lĩnh vực này.🤝
            </TextMark>

            <ContactIconArea className='gap-4 pt-6'></ContactIconArea>
          </div>
        </div>
      </div>
    </div>
  )
}
