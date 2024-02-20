import IconCode from '~/components/icons/IconCode'
import { projecData } from './data.projects'
import { TextDescript, TextMark } from '.'
import { Button, Card } from 'flowbite-react'
import { HiOutlineArrowTrendingUp } from 'react-icons/hi2'

export interface ProjectItemsProps {
  className?: string
}

export function ProjectItem(props: ProjectItemsProps) {
  const projectDt = projecData()

  return (
    <div {...props} className='grid grid-cols-1 row-auto gap-8 pt-20 m-auto text-text1 xl:grid-cols-4 md:grid-cols-2'>
      {projectDt.map((item) => (
        <div key={item.id} className='flex items-center justify-center'>
          <Card className='h-full max-w-sm'>
            <TextDescript className='pb-3 text-xl md:text-2xl'>{item.title}</TextDescript>
            <TextMark size={{ df: 'base', md: 'md' }} className='flex-1 group-hover:text-white'>
              {item.descript}
            </TextMark>
            <div className='flex items-center gap-2 pt-1 text-text2 dark:text-text7'>
              <IconCode className='text-xl'></IconCode>
              <span>{item.languages}</span>
            </div>

            <Button outline gradientDuoTone='primary' className='w-[180px] group mx-auto'>
              <span>Xem thêm</span>
              <HiOutlineArrowTrendingUp className='w-5 h-5 ml-2 transition-all text-primary-600 group-hover:text-white' />
            </Button>
          </Card>
        </div>
      ))}
    </div>
  )
}
