import { Avatar } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import AuthorName from '~/components/common/AuthorName'
import CardAuthor from '~/components/common/CardAuthor'
import CardTitle from '~/components/common/CardTitle'
import FeatureTitle from './FeatureTitle'
import CardPostTime from '~/components/common/CardPostTime'
import { CardPost, TagGroup } from '~/components/common'
import CardContent from '~/components/common/CardContent'
import truncateText from '~/utils/truncateText'
import CardBody from '~/components/common/CardBody'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/app/hooks'
import { homeHotPostSelector } from '~/app/home/homeSlice'
import { Tag } from '~/types'
import { convertToYYYYMMDD } from '~/utils/commonUtils'
import { Link } from 'react-router-dom'

export interface HomeTopPostProps {
  className?: string
}

export default function HomeTopPost(props: HomeTopPostProps) {
  const { t } = useTranslation('home')
  const hotPostList = useAppSelector(homeHotPostSelector)
  const hotPost = hotPostList && hotPostList.length > 0 ? hotPostList[0] : undefined
  const newPosts = hotPostList && hotPostList.length > 0 ? hotPostList.slice(1) : []

  return (
    <section className={twMerge('relative', props.className)}>
      <div className='absolute z-[-1] hidden w-full h-full md:block'>
        <img src='/img/home_banner.svg' alt='' />
      </div>
      <div className='relative z-30 container-page'>
        <FeatureTitle color='secondary'>{t('post.hot.title')}</FeatureTitle>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-5'>
          <div id='hot-post__main' className='xl:col-span-3'>
            {hotPost && (
              <CardPost
                key={hotPost?.id}
                className='lg:max-h-img-lg max-h-img-md'
                imgSrc={hotPost?.thumbnail}
                href={`/post/${hotPost?.slug}`}
              >
                {hotPost?.tags && <TagGroup data={hotPost?.tags as Tag[]}></TagGroup>}

                <CardBody href={`/post/${hotPost?.slug}`}>
                  <CardTitle className='mb-5 text-white md:text-2xl lg:text-3xl'>{hotPost?.title}</CardTitle>
                  <CardContent className='hidden mb-3 text-white lg:block lg:text-lg'>
                    {truncateText(hotPost?.description, 100)}
                  </CardContent>
                </CardBody>

                <CardAuthor>
                  <Avatar img={hotPost?.user?.avatar || ''} rounded>
                    <AuthorName className='text-base text-white lg:text-base ml-[-8px]'>
                      {hotPost?.user?.userName}
                    </AuthorName>
                  </Avatar>
                  <CardPostTime className='pl-10 text-base text-white'>
                    {convertToYYYYMMDD(hotPost?.regDt as Date)}
                  </CardPostTime>
                </CardAuthor>
              </CardPost>
            )}
          </div>

          <div className='xl:col-span-2'>
            <div id='hot-post__slide' className='flex flex-col gap-3'>
              {newPosts.map((post) => (
                <div
                  key={post.id}
                  className='flex flex-col h-auto overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md md:flex-row dark:border-gray-700 dark:bg-gray-800 group'
                >
                  <Link
                    to={`/post/${post?.slug}`}
                    className='h-[184px] lg:w-48 w-full overflow-hidden md:rounded-l-lg md:rouded-none rouded-none rouded-t-lg'
                  >
                    <img src={post?.thumbnail} className='object-cover w-full h-full' />
                  </Link>
                  <div className='flex flex-col justify-around flex-1 h-auto p-4 rounded-r-lg'>
                    {post?.tags && <TagGroup data={post?.tags as Tag[]}></TagGroup>}
                    <CardBody href={`/post/${post?.slug}`}>
                      <CardTitle>{truncateText(post?.title, 50)}</CardTitle>
                    </CardBody>
                    <CardAuthor className='flex justify-between flex-1'>
                      <AuthorName className='text-base lg:text-base'>{post?.user?.userName}</AuthorName>
                      <CardPostTime className='text-base'> {convertToYYYYMMDD(post?.regDt as Date)}</CardPostTime>
                    </CardAuthor>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
