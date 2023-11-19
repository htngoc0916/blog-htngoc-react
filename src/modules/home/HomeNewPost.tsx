import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { DefaultProps } from '~/utils/defautProp'
import { PostList } from './data.post'
import { Card } from 'flowbite-react'
import CardTitle from '~/components/common/CardTitle'
import CardAuthor from '~/components/common/CardAuthor'
import AuthorName from '~/components/common/AuthorName'
import CardTag from '~/components/common/CardTag'
import { twMerge } from 'tailwind-merge'
import FeatureTitle from './FeatureTitle'
import CardPostTime from '~/components/common/CardPostTime'

export interface HomeNewPost extends DefaultProps {}

export default function HomeNewPost(props: HomeNewPost) {
  const dataNew = PostList().filter((item) => item.type === 'new')
  return (
    <section className={twMerge(props.className)}>
      <div className='w-full post-banner'>
        <FeatureTitle color='secondary'>Bài viết mới nhất</FeatureTitle>
        <Swiper
          grabCursor={true}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={'auto'}
          navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left' }}
          pagination={{ clickable: true, dynamicBullets: true }}
        >
          {dataNew.length > 0 &&
            dataNew.map((item) => (
              <SwiperSlide key={item.id}>
                <Card className='w-full md:max-w-lg' imgSrc={item.imgSrc} horizontal>
                  <CardTag color={item.tags.color || 'infor'} href={`/category/${item.tags.name}`}>
                    {item.tags.name}
                  </CardTag>
                  <CardTitle>{item.title}</CardTitle>
                  <CardAuthor className='flex justify-between'>
                    <AuthorName>{item.author}</AuthorName>
                    <CardPostTime>{item.postTime}</CardPostTime>
                  </CardAuthor>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  )
}
