import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import { Skill } from './data.skills'
import { Button } from 'flowbite-react'

export interface SkillItemProps {
  data: Array<Skill>
}

export default function SkillItem(props: SkillItemProps) {
  const { data } = props
  const nodeRef = useRef(null)

  return (
    <div className='grid items-start justify-center grid-cols-3 mx-auto mt-10 lg:grid-cols-5 min-h-[300px] max-w-screen-lg gap-4'>
      <TransitionGroup component={null}>
        {data &&
          data.map((item) => (
            <CSSTransition key={item.id} timeout={100} classNames='skill-item' unmountOnExit nodeRef={nodeRef}>
              <div className='flex flex-col items-center justify-center'>
                <Button pill className='md:w-20 md:h-20 w-14 h-14' color='secondary'>
                  <span className='text-2xl text-text2 md:text-4xl dark:text-white'>{item.icon}</span>
                </Button>
                <p className='mt-2 text-sm text-text2 md:text-base dark:text-white'>{item.title}</p>
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  )
}
