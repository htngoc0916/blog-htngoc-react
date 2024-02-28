import { Badge } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { BadgeGroup } from '~/components/badge'
import { AuthorAvatar, AuthorName, CardAuthor, CardPostTime } from '~/components/common'
import { DefaultProps } from '~/utils/defautProp'
import truncateText from '~/utils/truncateText'
import { HiOutlineEye } from 'react-icons/hi2'
import { useAppSelector } from '~/app/hooks'
import { postViewDetailSelector } from '~/app/post/postViewSlice'
import { memo } from 'react'
import { convertToYYYYMMDD } from '~/utils/commonUtils'
import { numberWithCommas } from '~/utils/numberWithCommas'
import { Tag } from '~/types'

const PostViewMeta = memo(function PostViewMeta(props: DefaultProps) {
  const postViewDetail = useAppSelector(postViewDetailSelector)

  return (
    <div className={props.className} id='post-detail__meta'>
      <div className={twMerge('flex flex-col items-start justify-center')}>
        <BadgeGroup className='mb-3'>
          {postViewDetail?.tags &&
            postViewDetail.tags.map((tag: Tag) => (
              <Badge key={tag?.id} size='sm' color={tag.color}>
                {tag?.tagName}
              </Badge>
            ))}
        </BadgeGroup>

        <h3 className='mb-2 text-2xl font-bold md:mb-5 md:text-4xl'>{postViewDetail?.title}</h3>
        <p className='text-lg md:via-primary-100 xl:pr-10'>
          {truncateText(postViewDetail?.description as string, 150)}
        </p>

        <CardAuthor className='mt-6'>
          <AuthorAvatar rounded img='/img/avatar_people.jpg' className='w-10 h-10 rounded-full lg:w-14 lg:h-14'>
            <AuthorName className='text-sm font-bold md:text-lg'>{postViewDetail?.user?.userName}</AuthorName>
            <CardPostTime className='flex items-center justify-between w-full gap-20 text-sm lg:text-base'>
              <span>{convertToYYYYMMDD(postViewDetail?.regDt as Date)}</span>
              <div className='flex items-center justify-center gap-1'>
                <HiOutlineEye className='inline-block w-5 h-5' />
                <span>{numberWithCommas(postViewDetail?.viewCnt as number)}</span>
              </div>
            </CardPostTime>
          </AuthorAvatar>
        </CardAuthor>
      </div>

      <div className='rounded-lg md:max-h-img-lg max-h-img-md md:rounded-xl'>
        <img
          src={postViewDetail?.thumbnail}
          alt='post banner'
          className='object-cover w-full h-full rounded-lg md:rounded-xl'
        />
      </div>
    </div>
  )
})

export default PostViewMeta
