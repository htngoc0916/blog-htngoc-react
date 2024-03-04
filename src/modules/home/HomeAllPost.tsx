import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import FeatureTitle from './FeatureTitle'
import { Avatar, Button, Card } from 'flowbite-react'
import { CardTitle, CardAuthor, AuthorName, CardPostTime, TagGroup } from '~/components/common'
import CardImage from '~/components/common/CardImage'
import CardBody from '~/components/common/CardBody'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/app/hooks'
import {
  homeAllPostListSelector,
  homeCategorySelector,
  homeFilterSelector,
  loadmoreAllPostList,
  setAllPostListHome
} from '~/app/home/homeSlice'
import { ApiResponseDTO, ListResponseDTO, Post, Tag } from '~/types'
import { convertToYYYYMMDD } from '~/utils/commonUtils'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import truncateText from '~/utils/truncateText'
import postApi from '~/apis/postApi'

export default function HomeAllPost(props: DefaultProps) {
  const { t } = useTranslation(['home', 'common'])

  const dispatch = useDispatch()
  const filter = useAppSelector(homeFilterSelector)
  const categoryList = useAppSelector(homeCategorySelector)
  const postList = useAppSelector(homeAllPostListSelector)
  const [lastPage, setLastPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number>(0)

  useEffect(() => {
    const { paginaton } = postList
    setLastPage(paginaton.last)
  }, [postList])

  const handleLoadMore = async () => {
    const { paginaton } = postList
    dispatch(loadmoreAllPostList({ ...filter, pageNo: paginaton.pageNo + 1 }))
  }

  const handleCategoryClick = async (id: number) => {
    try {
      setLoading(true)
      const action = id > 0 ? postApi.getPostByCategory(filter, id) : await postApi.getAllPosts(filter)
      const response: ApiResponseDTO<ListResponseDTO<Post[]>> = await action
      dispatch(setAllPostListHome(response?.data))
    } catch (error: any) {
      console.error(error)
    } finally {
      setActiveCategory(id)
      setLoading(false)
    }
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
            {categoryList &&
              categoryList.map((category) => (
                <Button
                  type='button'
                  key={category?.id}
                  disabled={loading}
                  outline={category?.id !== activeCategory}
                  gradientDuoTone='primary'
                  onClick={() => handleCategoryClick(category?.id as number)}
                >
                  {category?.categoryName}
                </Button>
              ))}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-screen-2xl'>
          {postList?.data?.map((post) => (
            <Card
              key={post?.id}
              className='max-w-md overflow-hidden group'
              renderImage={() => (
                <CardImage to={`/post/${post?.slug}`} src={post?.thumbnail} className='w-full h-48 rounded-b-none' />
              )}
            >
              {post?.tags && <TagGroup data={post?.tags as Tag[]}></TagGroup>}

              <CardBody href={`/post/${post?.slug}`}>
                <CardTitle className='block' animation>
                  {truncateText(post?.title, 50)}
                </CardTitle>
              </CardBody>

              <CardAuthor className='flex items-center justify-between'>
                <Avatar img={post?.user?.avatar || ''} rounded size='sm' className='flex items-center justify-center'>
                  <AuthorName className='text-base lg:text-base ml-[-8px]'>{post?.user?.userName}</AuthorName>
                </Avatar>

                <CardPostTime className='text-base'>{convertToYYYYMMDD(post?.regDt as Date)}</CardPostTime>
              </CardAuthor>
            </Card>
          ))}
        </div>

        <div className='flex items-center justify-center pt-10'>
          <Button
            type='button'
            size='sm'
            gradientDuoTone='primary'
            isProcessing={false}
            onClick={handleLoadMore}
            disabled={lastPage}
          >
            {t('common:acctions.load-more')}
          </Button>
        </div>
      </div>
    </section>
  )
}
