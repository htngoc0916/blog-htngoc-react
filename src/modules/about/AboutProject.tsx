import { TextDescript, TextMark, TextTitle } from '.'
import { ProjectItem } from './ProjectItem'
import { Badge } from 'flowbite-react'

export interface IAboutProjectProps {
  className?: string
}

export function AboutProject(props: IAboutProjectProps) {
  return (
    <div {...props}>
      <div className='container px-2 py-32 mx-auto lg:px-0'>
        <TextTitle className='text-center'>Dự án từng tham gia 🐳</TextTitle>
        <TextDescript className='text-center'>Kinh nghiệm làm việc</TextDescript>
        <TextMark className='mx-auto text-center md:w-2/3'>
          Trước đây mình từng tham gia một số dự án
          <Badge color='purple' className='inline-block m-2'>
            C# + Asp.net
          </Badge>
          và hiện tại mình làm về
          <Badge color='pink' className='inline-block m-2'>
            Java + React
          </Badge>
          🫠
        </TextMark>

        <ProjectItem></ProjectItem>
      </div>
    </div>
  )
}
export default AboutProject
