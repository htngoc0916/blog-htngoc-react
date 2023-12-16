import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'
import FeatureTitle from './FeatureTitle'
import { PostList } from './data.post'
import { Button, Card } from 'flowbite-react'
import { CardTag, CardTitle, CardAuthor, AuthorName, CardPostTime, AuthorAvatar } from '~/components/common'
import CardImage from '~/components/common/CardImage'
import { Link, useNavigate } from 'react-router-dom'
import CardBody from '~/components/common/CardBody'
import slugify from 'slugify'
import categoryApi from '~/apis/categoryApi'
import { Category } from '~/types'

export interface IHomeAllPostProps extends DefaultProps {}

export default function HomeAllPost(props: IHomeAllPostProps) {
  const data = PostList()
  const navigate = useNavigate()

  const handleLoadMore = async () => {
    const category: Category = await categoryApi.addTag({
      categoryName: 'Test category',
      description: 'test api',
      regId: 1,
      navigate
    })

    console.log(category)
  }

  return (
    <section className={twMerge(props.className)}>
      <div className='pt-20 pb-10 container-page'>
        <div className='flex flex-col items-center justify-start mb-10'>
          <FeatureTitle color='secondary' className='text-2xl md:text-5xl md:font-bold'>
            Tất cả bài viết
          </FeatureTitle>
          <h3 className='text-lg md:text-xl text-text1 dark:text-text7'>Tìm kiếm bài viết để xem nào bro 🤓</h3>
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
          {data.map((item) => (
            <Card
              key={item.id}
              className='overflow-hidden md:max-w-lg group'
              renderImage={() => (
                <Link to={`/post/${slugify(item.title)}`} className='w-full h-full overflow-hidden'>
                  <CardImage src={item.imgSrc} className='rounded-b-none max-h-img-md group-hover:scale-105' />
                </Link>
              )}
            >
              <CardTag color={item.tags.color || 'infor'} href={`/category/${slugify(item.tags.name)}`}>
                {item.tags.name}
              </CardTag>

              <CardBody href={`/post/${slugify(item.title)}`}>
                <CardTitle className='block' animation>
                  {item.title}
                </CardTitle>
              </CardBody>

              <CardAuthor className='flex justify-between'>
                <AuthorAvatar img={item.avartaSrc || ''} rounded size='sm'>
                  <AuthorName className='text-base lg:text-base'>{item.author}</AuthorName>
                </AuthorAvatar>
                <CardPostTime className='text-base'>{item.postTime}</CardPostTime>
              </CardAuthor>
            </Card>
          ))}
        </div>

        <div className='flex items-center justify-center pt-10'>
          <Button size='sm' gradientDuoTone='primary' isProcessing onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      </div>
    </section>
  )
}
