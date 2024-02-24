import { Avatar, Card } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import AuthorName from '~/components/common/AuthorName'
import CardAuthor from '~/components/common/CardAuthor'
import CardTitle from '~/components/common/CardTitle'
import FeatureTitle from './FeatureTitle'
import CardPostTime from '~/components/common/CardPostTime'
import CardImage from '~/components/common/CardImage'
import { CardPost, TagGroup } from '~/components/common'
import CardContent from '~/components/common/CardContent'
import truncateText from '~/utils/truncateText'
import slugify from 'slugify'
import { useNavigate } from 'react-router-dom'
import CardBody from '~/components/common/CardBody'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/app/hooks'
import { homeHotPostSelector } from '~/app/home/homeSlice'
import { Tag } from '~/types'
import { convertToYYYYMMDD } from '~/utils/commonUtils'

export interface HomeTopPostProps {
  className?: string
}

export default function HomeTopPost(props: HomeTopPostProps) {
  const { t } = useTranslation('home')
  const hotPostList = useAppSelector(homeHotPostSelector)
  const hotPost = hotPostList?.data && hotPostList.data.length > 0 ? hotPostList.data[0] : undefined
  const newPosts = hotPostList?.data ? hotPostList.data.slice(1) : []

  const navigate = useNavigate()

  return (
    <section className={twMerge('relative', props.className)}>
      <div className='absolute z-[-1] hidden w-full h-full md:block'>
        <img src='/img/home_banner.svg' alt='' />
      </div>
      <div className='relative z-30 container-page'>
        <FeatureTitle color='secondary'>{t('post.hot.title')}</FeatureTitle>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-5'>
          <div className='xl:col-span-3'>
            {hotPost && (
              <CardPost
                key={hotPost?.id}
                className='lg:max-h-img-lg max-h-img-md'
                imgSrc={hotPost?.thumbnail}
                href={`/post/${slugify(hotPost?.slug)}`}
              >
                {hotPost?.tags && <TagGroup data={hotPost?.tags as Tag[]}></TagGroup>}

                <CardBody href={`/post/${slugify(hotPost?.title)}`}>
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

          <div className='grid w-full grid-flow-row gap-y-3 xl:col-span-2'>
            {newPosts.map((post) => (
              <Card
                key={post?.id}
                horizontal
                renderImage={() => (
                  <CardImage
                    src={post?.thumbnail}
                    className='rounded-none rounded-t-lg md:max-w-[200px] md:rounded-none md:rounded-l-lg max-h-img-sm'
                    onClick={() => navigate(`/post/${post?.slug}`)}
                  ></CardImage>
                )}
              >
                {post?.tags && <TagGroup data={post?.tags as Tag[]}></TagGroup>}

                <CardBody href={`/post/${post?.slug}`}>
                  <CardTitle>{truncateText(post?.title, 50)}</CardTitle>
                </CardBody>

                <CardAuthor className='flex justify-between'>
                  <AuthorName className='text-base lg:text-base'>{post?.user?.userName}</AuthorName>
                  <CardPostTime className='text-base'> {convertToYYYYMMDD(post?.regDt as Date)}</CardPostTime>
                </CardAuthor>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
