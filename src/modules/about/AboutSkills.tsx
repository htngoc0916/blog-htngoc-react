import { TextDescript, TextMark, TextTitle } from '.'
import { SkillGroup } from './SkillGroup'

export interface IAboutSkillsProps {
  className?: string
}

export function AboutSkills(props: IAboutSkillsProps) {
  return (
    <div className={props.className}>
      <div className='container p-1 py-20 mx-auto'>
        <TextTitle className='text-center'>Kỷ năng của bản thân 🏝️</TextTitle>
        <TextDescript className='text-center'>Kỷ năng</TextDescript>
        <TextMark className='mx-auto text-center md:w-2/3'>
          Một vài kỹ năng mà mình học được cũng như tích lũy được từ quá trình đi làm. 🙆‍♀️
        </TextMark>

        <SkillGroup />
      </div>
    </div>
  )
}
export default AboutSkills
