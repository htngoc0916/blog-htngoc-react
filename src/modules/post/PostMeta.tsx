import { Badge } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { BadgeGroup } from '~/components/badge'
import { AuthorAvatar, AuthorName, CardPostTime } from '~/components/common'
import useWindowSize from '~/hooks/useWindowSize'
import { pageSize } from '~/utils/constant'
import { DefaultProps } from '~/utils/defautProp'
import { TruncateText } from '~/utils/truncateText'
import { HiOutlineEye } from 'react-icons/hi2'

export default function PostMeta(props: DefaultProps) {
  const { width } = useWindowSize()
  return (
    <div className={twMerge('flex flex-col items-start justify-center', props.className)}>
      <BadgeGroup className='mb-3'>
        <Badge size='sm'>Frontend</Badge>
        <Badge size='sm' color='warning'>
          Java
        </Badge>
      </BadgeGroup>

      <h3 className='text-2xl font-bold md:mb-5 md:text-5xl'>How collaboration makes us better designers</h3>
      <p className='text-lg lg:text-xl md:via-primary-100 xl:pr-10'>
        {TruncateText(
          `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius quidem delectus exercitationem animi illo
    magni doloribus distinctio vitae possimus! Corporis mollitia perspiciatis molestias soluta impedit et
    consequatur repellendus fugit culpa?`,
          150
        )}
      </p>

      <AuthorAvatar
        rounded
        img='/img/avatar_people.jpg'
        size={width && width > pageSize.SIZE_MD ? 'ct' : 'md'}
        bordered
        className='mt-8'
      >
        <AuthorName className='text-base font-bold md:text-lg'>htngoc</AuthorName>
        <CardPostTime className='text-base'>
          <div className='flex items-center justify-center gap-10'>
            <div>
              Published <span>14 Jan 2024</span>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <HiOutlineEye className='inline-block w-6 h-6'></HiOutlineEye>
              <span>1,234</span>
            </div>
          </div>
        </CardPostTime>
      </AuthorAvatar>
    </div>
  )
}
