import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Button, Card } from 'flowbite-react'
import CardTitle from '~/components/common/CardTitle'
import CardTag from '~/components/common/CardTag'
import { PostList } from '../home/data.post'
import { Link } from 'react-router-dom'
import CardImage from '~/components/common/CardImage'
import slugify from 'slugify'
import CardBody from '~/components/common/CardBody'
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2'

export interface IPostRelatedProps {}

export default function PostViewRelated() {
  const dataNew = PostList().filter((item) => item.type === 'new')

  return (
    <div className='py-28'>
      <div className='post-related__heading'>
        <h3 className='mb-2 text-2xl font-bold text-primary-700'>Bài viết nổi bật khác</h3>
        <p className='mb-6 text-lg'>Bạn có thể xem thêm một số bài viết liên quan dưới đây</p>
      </div>

      <div className='py-2 post-related'>
        <Swiper
          grabCursor={true}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={'auto'}
          navigation={{ nextEl: '.arrow-next', prevEl: '.arrow-prev' }}
          pagination={{ clickable: true, dynamicBullets: true }}
        >
          {dataNew.length > 0 &&
            dataNew.map((item) => (
              <SwiperSlide key={item.id}>
                <Card
                  key={item.id}
                  className='overflow-hidden md:max-w-lg group'
                  renderImage={() => (
                    <Link to={`/post/${slugify(item.title)}`} className='w-full h-full overflow-hidden'>
                      <CardImage src={item.imgSrc} className='rounded-b-none max-h-img-sm group-hover:scale-105' />
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
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>

        <div className='flex gap-3 pt-3'>
          <Button color='primary' outline pill size='sm' className='arrow-prev'>
            <div className='flex items-center justify-end gap-1'>
              <HiArrowLongLeft className='w-6 h-6' />
              <span>Prev</span>
            </div>
          </Button>

          <Button color='primary' outline pill size='sm' className='arrow-next'>
            <div className='flex items-center justify-end gap-1'>
              <span>Next</span>
              <HiArrowLongRight className='w-6 h-6' />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
