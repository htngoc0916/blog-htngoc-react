import { TextDescript, TextMark, TextTitle } from '.'
import EducationItem from './EducationItem'

export interface IAboutEducationProps {
  className?: string
}

export default function AboutEducation(props: IAboutEducationProps) {
  return (
    <div className={props.className}>
      <div className='container px-2 pb-20 mx-auto dark:border-text4 pt-72 md:px-0'>
        <div className='flex flex-col items-center justify-center'>
          <TextTitle>Học vấn và Kinh nghiệm ☘️</TextTitle>
          <TextDescript>Bản tóm tắt</TextDescript>
          <TextMark className='text-center md:w-3/4'>
            Trong quá trình học tập mình có làm một vài dự án cá nhân. May mắn là mình nhận được sự quan tâm và hỗ trợ
            tận tình từ giáo sư. 👨‍🏫 Nên mình vừa học vừa xin thực tập tại công ty và ra trường thì làm tại công ty đó
            luôn.🌵
          </TextMark>

          <div className='relative mt-16'>
            <EducationItem></EducationItem>
          </div>
        </div>
      </div>
    </div>
  )
}
