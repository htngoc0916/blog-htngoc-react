import React, { useState } from 'react'
import SkillItem from './SkillItem'
import { skillData } from './data.skills'
import { Button } from 'flowbite-react'
import useWindowSize from '~/hooks/useWindowSize'
import { pageSize } from '~/utils/constant'

interface ISkillGroupProps {
  className?: string
}

const skillType = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Backend' },
  { id: 3, name: 'Frontend' },
  { id: 4, name: 'Other' }
]

export function SkillGroup(props: ISkillGroupProps) {
  const [activeName, setActiveName] = useState('All')
  const [skills, setSkills] = useState(skillData)
  const { width } = useWindowSize()

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const button = e.currentTarget
    const skillType = button.name
    const data = skillType === 'All' ? skillData : skillData.filter((item) => item.job === skillType)

    setActiveName(skillType)
    setSkills(data)
  }

  return (
    <div className={props.className}>
      <div className='flex flex-wrap items-end justify-center gap-2 pt-16'>
        {skillType.map((item) => (
          <Button
            key={item.id}
            name={item.name}
            pill
            gradientDuoTone='primary'
            size={width && width > pageSize.SIZE_MD ? 'lg' : 'sm'}
            className='w-28'
            outline={activeName !== item.name}
            onClick={handleOnClick}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <SkillItem data={skills} />
    </div>
  )
}
