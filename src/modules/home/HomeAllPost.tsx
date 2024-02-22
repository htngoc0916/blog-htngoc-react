import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import FeatureTitle from './FeatureTitle'
import { Button, Card } from 'flowbite-react'
import { CardTag, CardTitle, CardAuthor, AuthorName, CardPostTime, AuthorAvatar } from '~/components/common'
import CardImage from '~/components/common/CardImage'
import { Link } from 'react-router-dom'
import CardBody from '~/components/common/CardBody'
import slugify from 'slugify'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/app/hooks'
import { homeAllPostListSelector, homeFilterSelector, loadmoreAllPostList } from '~/app/home/homeSlice'
import { Tag } from '~/types'
import { convertToYYYYMMDD } from '~/utils/commonUtils'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const renderTags = (tags: Tag[]) => {
  return (
    <div id='tags' className='flex gap-2'>
      {tags.map((tag: Tag) => (
        <CardTag color={tag?.color} key={tag?.tagName} href={`/category/${slugify(tag?.tagName || '')}`}>
          {tag?.tagName}
        </CardTag>
      ))}
    </div>
  )
}

export default function HomeAllPost(props: DefaultProps) {
  const { t } = useTranslation(['home', 'common'])

  const dispatch = useDispatch()
  const filter = useAppSelector(homeFilterSelector)
  const postList = useAppSelector(homeAllPostListSelector)
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {
    const { paginaton } = postList
    setLastPage(paginaton.last)
  }, [postList])

  const handleLoadMore = async () => {
    const { paginaton } = postList
    console.log('🚀 ~ handleLoadMore ~ paginaton:', paginaton.pageNo + 1)
    dispatch(loadmoreAllPostList({ ...filter, pageNo: paginaton.pageNo + 1 }))
  }

  return (
    <section className={twMerge(props.className)}>
      <div className='pt-20 pb-10 container-page'>
        <div className='flex flex-col items-center justify-start mb-10'>
          <FeatureTitle color='secondary' className='text-2xl md:text-5xl md:font-bold'>
            {t('post.all.title')}
          </FeatureTitle>
          <h3 className='text-lg md:text-xl text-text1 dark:text-text7'>{t('post.all.description')} 🤓</h3>
          <div className='flex flex-row flex-wrap items-end justify-center gap-2 pt-6 md:gap-4'>
            <Button gradientDuoTone='primary'>All</Button>
            <Button gradientDuoTone='primary' outline>
              Technology
            </Button>
            <Button gradientDuoTone='primary' outline>
              Lifestyle
            </Button>
            <Button gradientDuoTone='primary' outline>
              Travel
            </Button>
            <Button gradientDuoTone='primary' outline>
              Health
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-screen-2xl'>
          {postList?.data?.map((post) => (
            <Card
              key={post?.id}
              className='overflow-hidden md:max-w-lg group'
              renderImage={() => (
                <Link to={`/post/${slugify(post?.title)}`} className='w-full h-full overflow-hidden'>
                  <CardImage src={post?.thumbnail} className='rounded-b-none max-h-img-md group-hover:scale-105' />
                </Link>
              )}
            >
              {post?.tags && renderTags(post?.tags as Tag[])}

              <CardBody href={`/post/${slugify(post?.title)}`}>
                <CardTitle className='block' animation>
                  {post?.title}
                </CardTitle>
              </CardBody>

              <CardAuthor className='flex justify-between'>
                <AuthorAvatar img={post?.user?.avatar || ''} rounded size='sm'>
                  <AuthorName className='text-base lg:text-base'>{post?.user?.userName}</AuthorName>
                </AuthorAvatar>
                <CardPostTime className='text-base'>{convertToYYYYMMDD(post?.regDt as Date)}</CardPostTime>
              </CardAuthor>
            </Card>
          ))}
        </div>

        <div className='flex items-center justify-center pt-10'>
          <Button size='sm' gradientDuoTone='primary' isProcessing={false} onClick={handleLoadMore} disabled={lastPage}>
            {t('common:acctions.load-more')}
          </Button>
        </div>
      </div>
    </section>
  )
}
