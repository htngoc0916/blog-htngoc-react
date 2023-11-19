import { Card } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import AuthorName from '~/components/common/AuthorName'
import CardAuthor from '~/components/common/CardAuthor'
import CardTag from '~/components/common/CardTag'
import CardTitle from '~/components/common/CardTitle'
import { PostList } from './data.post'
import FeatureTitle from './FeatureTitle'
import CardPostTime from '~/components/common/CardPostTime'
import CardImage from '~/components/common/CardImage'
import { AuthorAvatar, CardPost } from '~/components/common'
import CardContent from '~/components/common/CardContent'
import { TruncateText } from '~/utils/truncateText'
import slugify from 'slugify'
import { useNavigate } from 'react-router-dom'
import CardBody from '~/components/common/CardBody'

export interface HomeTopPostProps {
  className?: string
}

export default function HomeTopPost(props: HomeTopPostProps) {
  const dataHot = PostList().filter((item) => item.type === 'hot')
  const resutlDt = PostList().filter((item) => item.type === 'new')
  const dataNew = resutlDt.length > 2 ? resutlDt.slice(0, 2) : resutlDt
  const navigate = useNavigate()

  return (
    <section className={twMerge('relative', props.className)}>
      <div className='absolute z-[-1] hidden w-full h-full md:block'>
        <img src='/img/home_banner.svg' alt='' />
      </div>
      <div className='relative z-30 container-page'>
        <FeatureTitle color='secondary'>Bài viết nổi bật</FeatureTitle>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
          <div className='xl:col-span-2'>
            {dataHot.length > 0 &&
              dataHot.map((item) => (
                <CardPost
                  key={item.id}
                  className='lg:max-h-img-lg max-h-img-md'
                  imgSrc={item.imgSrc}
                  href={`/post/${slugify(item.title)}`}
                >
                  <CardTag
                    color={item.tags.color || 'infor'}
                    className='mb-3'
                    href={`/category/${slugify(item.tags.name)}`}
                  >
                    {item.tags.name}
                  </CardTag>

                  <CardBody href={`/post/${slugify(item.title)}`}>
                    <CardTitle className='mb-5 text-white md:text-2xl lg:text-3xl'>{item.title}</CardTitle>
                    <CardContent className='mb-3 text-white lg:text-lg'>
                      {TruncateText(item.content, 120) + '...'}
                    </CardContent>
                  </CardBody>

                  <CardAuthor>
                    <AuthorAvatar
                      img={item.avartaSrc || ''}
                      rounded
                      size='md'
                      className='hidden lg:inline-flex'
                    ></AuthorAvatar>
                    <AuthorName className='text-base text-white lg:text-base'>{item.author}</AuthorName>
                    <CardPostTime className='pl-10 text-base text-white'>{item.postTime}</CardPostTime>
                  </CardAuthor>
                </CardPost>
              ))}
          </div>

          <div className='grid w-full grid-flow-row gap-y-3'>
            {dataNew.length > 0 &&
              dataNew.map((item) => (
                <Card
                  key={item.id}
                  className='w-full h-full'
                  horizontal
                  renderImage={() => (
                    <CardImage
                      src={item.imgSrc}
                      className='rounded-none rounded-t-lg md:w-1/2 md:rounded-none md:rounded-l-lg md:max-h-img-sm max-h-img-md'
                      onClick={() => navigate(`/post/${slugify(item.title)}`)}
                    ></CardImage>
                  )}
                >
                  <CardTag color={item.tags.color || 'infor'} href={`/category/${item.tags.name}`}>
                    {item.tags.name}
                  </CardTag>

                  <CardBody href={`/post/${slugify(item.title)}`}>
                    <CardTitle>{item.title}</CardTitle>
                  </CardBody>

                  <CardAuthor className='flex justify-between'>
                    <AuthorName className='text-base lg:text-base'>{item.author}</AuthorName>
                    <CardPostTime className='text-base'>{item.postTime}</CardPostTime>
                  </CardAuthor>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
