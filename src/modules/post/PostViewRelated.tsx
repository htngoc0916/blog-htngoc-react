import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper/modules'
import { Button, Card } from 'flowbite-react'
import CardTitle from '~/components/common/CardTitle'
import CardImage from '~/components/common/CardImage'
import CardBody from '~/components/common/CardBody'
import { HiArrowLongRight, HiArrowLongLeft } from 'react-icons/hi2'
import { useAppSelector } from '~/app/hooks'
import { postViewRelateSelector } from '~/app/post/postViewSlice'
import { TagGroup } from '~/components/common'
import { Tag } from '~/types'
import { useState } from 'react'

export default function PostViewRelated() {
  const relatedPost = useAppSelector(postViewRelateSelector)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isBeginning, setIsBeginning] = useState(true)

  const handleSwiper = (swiper: any) => {
    swiper.on('slideChange', () => {
      setIsLastSlide(swiper.isEnd)
      setIsBeginning(swiper.isBeginning)
    })
  }
  return (
    <div className='py-28'>
      <div className='post-related__heading'>
        <h3 className='mb-2 text-2xl font-bold text-primary-700'>Bài viết nổi bật khác</h3>
        <p className='mb-6 text-lg'>Bạn có thể xem thêm một số bài viết liên quan dưới đây</p>
      </div>

      <div className='py-2 post-related'>
        <Swiper
          grabCursor={true}
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
          spaceBetween={30}
          slidesPerView={'auto'}
          navigation={{ nextEl: '.arrow-next', prevEl: '.arrow-prev' }}
          pagination={{ clickable: true, dynamicBullets: true }}
          onSwiper={(swiper) => handleSwiper(swiper)}
        >
          {relatedPost?.data &&
            relatedPost?.data.map((post) => (
              <SwiperSlide key={post?.id}>
                <Card
                  key={post?.id}
                  className='h-full overflow-hidden shadow-sm md:max-w-lg group'
                  renderImage={() => (
                    <CardImage
                      to={`/post/${post?.slug}`}
                      src={post?.thumbnail}
                      className='w-full h-48 rounded-b-none'
                    />
                  )}
                >
                  {post?.tags && <TagGroup data={post?.tags as Tag[]}></TagGroup>}
                  <CardBody href={`/post/${post?.slug}`}>
                    <CardTitle className='block' animation>
                      {post?.title}
                    </CardTitle>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className='flex gap-3 pt-3'>
        <Button color='primary' outline pill size='sm' className='arrow-prev' disabled={isBeginning}>
          <div className='flex items-center justify-end gap-1'>
            <HiArrowLongLeft className='w-6 h-6' />
            <span>Prev</span>
          </div>
        </Button>

        <Button color='primary' outline pill size='sm' className='arrow-next' disabled={isLastSlide}>
          <div className='flex items-center justify-end gap-1'>
            <span>Next</span>
            <HiArrowLongRight className='w-6 h-6' />
          </div>
        </Button>
      </div>
    </div>
  )
}
