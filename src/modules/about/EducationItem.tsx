import { twMerge } from 'tailwind-merge'
import { educationData } from './data.education'

const classes = {
  parent: {
    base: 'relative w-full md:w-1/2 pr-9 pl-14',
    left: 'text-left md:pr-14 md:pl-9 md:translate-x-full',
    right: 'md:text-right'
  },
  children: {
    base: 'absolute top-0 inline-block w-4 h-4 transform -translate-x-1/2 bg-white border-4 border-primary-500 rounded-full left-8',
    left: 'md:left-0',
    right: 'md:left-full'
  }
}

export interface IEducationItemProps {
  className?: string
}

export default function EducationItem(props: IEducationItemProps) {
  const data = educationData()
  return (
    <>
      <span className='w-[1px] absolute bg-text6 md:left-1/2 left-8 h-full'></span>
      <div className={twMerge(`flex flex-col w-full`, props.className)}>
        {data.map((item, index) => (
          <div
            key={item.id}
            className={twMerge(classes.parent.base, `${index % 2 ? classes.parent['right'] : classes.parent['left']}`)}
          >
            <span
              className={twMerge(
                classes.children.base,
                `${index % 2 ? classes.children['right'] : classes.children['left']}`
              )}
            ></span>
            <div>
              <div className='mb-1 text-xl font-medium'>{item.university}</div>
              <div className='mb-3 font-medium text-text2 dark:text-text6'>{item.speciality + ' | ' + item.area}</div>
              <button className='px-4 py-2 rounded-full tracking-wide text-sm bg-primary-700 text-white min-w-[110px]'>
                {item.year}
              </button>
              <div className='mt-5 mb-12 text-text2 dark:text-text6'>{item.descript}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
